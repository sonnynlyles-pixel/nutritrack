import type { FoodItem } from '../types';
import { FOOD_ALIASES, BRAND_ALIASES, BRAND_ABBREVIATIONS } from './foodAliases';

// ── Text normalization ──────────────────────────────────────────────

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[''`]/g, '')          // "jimmy john's" -> "jimmy johns"
    .replace(/[^a-z0-9\s]/g, ' ')    // punctuation -> space
    .replace(/\s+/g, ' ')
    .trim();
}

// Strip a leading bare quantity so "2 eggs" matches like "eggs"
function stripLeadingQuantity(text: string): string {
  return text.replace(/^\d+(\.\d+)?\s+/, '');
}

function tokenize(text: string): string[] {
  const n = stripLeadingQuantity(normalize(text));
  return n.split(' ').filter(Boolean);
}

// crude singular/plural fold for token comparison only (not exact-match tiers)
function stem(word: string): string {
  if (word.length > 4 && word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.length > 3 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function stemPhrase(text: string): string {
  return text.split(' ').map(stem).join(' ');
}

// ── Fuzzy word matching (typo tolerance) ────────────────────────────

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

// Tolerance scales with word length so short words aren't matched too loosely
function fuzzyWordMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 4) return false; // too short to safely fuzzy-match
  const tolerance = maxLen <= 6 ? 1 : 2;
  return levenshtein(a, b) <= tolerance;
}

// ── Brand resolution ─────────────────────────────────────────────────

/** Expands known abbreviations (e.g. "jj" -> "jimmy john's") into brand names to check against. */
function resolveBrandQueries(normalizedQuery: string): string[] {
  const direct = BRAND_ABBREVIATIONS[normalizedQuery];
  return direct ? direct.map(normalize) : [];
}

// ── Scoring ───────────────────────────────────────────────────────────

function haystack(food: FoodItem): { name: string; brand: string; aliases: string[] } {
  const curated = FOOD_ALIASES[food.id] ?? [];
  const brandAliases = food.brand ? (BRAND_ALIASES[food.brand] ?? []) : [];
  return {
    name: normalize(food.name),
    brand: food.brand ? normalize(food.brand) : '',
    aliases: [...(food.aliases ?? []), ...curated, ...brandAliases].map(normalize),
  };
}

export function scoreFood(rawQuery: string, food: FoodItem): number {
  const query = stripLeadingQuantity(normalize(rawQuery));
  if (!query) return 0;

  const { name, brand, aliases } = haystack(food);
  const queryTokens = tokenize(rawQuery);
  const brandQueryMatches = resolveBrandQueries(query);

  // 1. Exact canonical name match
  if (name === query) return 1000;

  // 2. Exact alias match
  if (aliases.includes(query)) return 950;

  // 2b. Singular/plural-folded exact match (e.g. "eggs" -> "Egg")
  if (stemPhrase(name) === stemPhrase(query)) return 900;

  // 3. Name starts-with query
  if (query.length >= 3 && name.startsWith(query)) return 800;

  // 4. Brand exact match (incl. resolved abbreviations like "jj" -> "jimmy john's")
  if (brand && (brand === query || brandQueryMatches.includes(brand))) return 750;

  // 5. Brand starts-with query (e.g. "panda" -> "panda express")
  if (brand && query.length >= 3 && brand.startsWith(query)) return 700;

  // 6. Alias starts-with / substring
  if (aliases.some(a => a.startsWith(query))) return 650;
  if (aliases.some(a => a.includes(query))) return 600;

  // 7. All query tokens present (as substrings) somewhere in name/brand/aliases.
  // Bonus for how fully the query "covers" the food's own name — so "Orange
  // Chicken" outranks "Beyond Orange Chicken" for a query naming both words
  // exactly, rather than tying and falling back to arbitrary insertion order.
  if (queryTokens.length > 1) {
    const fields = [name, brand, ...aliases];
    const allPresent = queryTokens.every(t => fields.some(f => f.includes(t)));
    if (allPresent) {
      const nameWords = name.split(' ').filter(Boolean);
      const coveredNameWords = nameWords.filter(w => queryTokens.some(t => w.includes(t) || t.includes(w))).length;
      const coverage = nameWords.length > 0 ? coveredNameWords / nameWords.length : 0;
      return 550 + Math.round(coverage * 40);
    }
  }

  // 8. Substring match on name/brand
  if (query.length >= 3 && (name.includes(query) || brand.includes(query))) return 400;

  // 9. Fuzzy token match (typo tolerance) — require most tokens to fuzzy-match
  const nameTokens = [...name.split(' '), ...brand.split(' '), ...aliases.flatMap(a => a.split(' '))]
    .filter(Boolean)
    .map(stem);
  const matchedTokens = queryTokens.filter(qt => {
    const stemmed = stem(qt);
    return nameTokens.some(nt => fuzzyWordMatch(stemmed, nt));
  });
  if (queryTokens.length > 0 && matchedTokens.length === queryTokens.length) {
    return 250;
  }
  if (queryTokens.length > 1 && matchedTokens.length >= Math.ceil(queryTokens.length * 0.6)) {
    return 150;
  }

  return 0;
}

export interface RankedFood {
  food: FoodItem;
  score: number;
}

/** Ranks foods by relevance to the query. Zero-score (non-matching) foods are excluded. */
export function rankFoods(query: string, foods: FoodItem[]): FoodItem[] {
  if (!query.trim()) return [];
  const scored: RankedFood[] = foods
    .map(food => ({ food, score: scoreFood(query, food) }))
    .filter(r => r.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.map(r => r.food);
}

/** Loose, lower-confidence suggestions for a query that returned no strong matches —
 *  used to power the "try searching for" fallback. */
export function suggestRelatedTerms(query: string, foods: FoodItem[], limit = 3): string[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];
  const candidates = new Set<string>();
  for (const food of foods) {
    const { name } = haystack(food);
    const nameTokens = name.split(' ');
    const hasLooseMatch = queryTokens.some(qt =>
      nameTokens.some(nt => nt.length >= 4 && (nt.startsWith(qt.slice(0, 3)) || fuzzyWordMatch(stem(qt), stem(nt))))
    );
    if (hasLooseMatch) {
      // Suggest the food's primary category word (first name token, or brand) as a broader term
      candidates.add(food.brand || food.name.split(' ')[0]);
    }
    if (candidates.size >= limit * 3) break;
  }
  return Array.from(candidates).slice(0, limit);
}
