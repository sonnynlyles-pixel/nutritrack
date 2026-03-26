import type { FoodItem } from '../types';

export interface MacroTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recommendation {
  food: FoodItem;
  servings: number;
  score: number;
}

export function getMealContext(): { label: string; meal: 'breakfast' | 'lunch' | 'dinner' | 'snacks' } {
  const hour = new Date().getHours();
  if (hour < 10) return { label: 'Breakfast Suggestions', meal: 'breakfast' };
  if (hour < 14) return { label: 'Lunch Suggestions', meal: 'lunch' };
  if (hour < 17) return { label: 'Afternoon Snack Suggestions', meal: 'snacks' };
  if (hour < 21) return { label: 'Dinner Suggestions', meal: 'dinner' };
  return { label: 'Evening Snack Suggestions', meal: 'snacks' };
}

export function getRecommendations(
  remaining: MacroTarget,
  foods: FoodItem[],
  limit = 6
): Recommendation[] {
  if (remaining.calories <= 50) return [];

  const remProtCal  = Math.max(remaining.protein, 0) * 4;
  const remCarbCal  = Math.max(remaining.carbs,   0) * 4;
  const remFatCal   = Math.max(remaining.fat,     0) * 9;
  const remMacroCal = remProtCal + remCarbCal + remFatCal;

  const scored: Recommendation[] = [];

  for (const food of foods) {
    const cal = food.nutrition.calories;
    if (cal <= 0) continue;

    // Find optimal servings: aim for ~60% of remaining calories, clamped 0.5–3
    const rawServings = (remaining.calories * 0.6) / cal;
    const servings    = Math.max(0.5, Math.min(3, Math.round(rawServings * 2) / 2));

    const sCal  = cal                          * servings;
    const sProt = food.nutrition.protein       * servings;
    const sCarb = food.nutrition.carbs         * servings;
    const sFat  = food.nutrition.fat           * servings;

    // Disqualify if this single item overshoots remaining calories by >15%
    if (sCal > remaining.calories * 1.15) continue;

    let score = 0;

    // 1. Calorie fill (0–30 pts): reward foods that use 30–90% of what's left
    const calFill = sCal / remaining.calories;
    score += (Math.min(calFill, 0.9) / 0.9) * 30;

    // 2. Macro ratio similarity (0–50 pts)
    if (remMacroCal > 0) {
      const remPR = remProtCal / remMacroCal;
      const remCR = remCarbCal / remMacroCal;
      const remFR = remFatCal  / remMacroCal;

      const foodMacroCal = sProt * 4 + sCarb * 4 + sFat * 9;
      if (foodMacroCal > 0) {
        const fPR = (sProt * 4) / foodMacroCal;
        const fCR = (sCarb * 4) / foodMacroCal;
        const fFR = (sFat  * 9) / foodMacroCal;

        const similarity =
          1 - (Math.abs(fPR - remPR) + Math.abs(fCR - remCR) + Math.abs(fFR - remFR)) / 2;
        score += Math.max(0, similarity) * 50;
      }
    }

    // 3. Penalise foods that add to already-over macros
    if (remaining.protein < 0 && sProt > 5)  score -= 25;
    if (remaining.carbs   < 0 && sCarb > 10) score -= 20;
    if (remaining.fat     < 0 && sFat  > 5)  score -= 25;

    scored.push({ food, servings, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
