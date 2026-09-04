// Approximate US-state footprint for restaurant/convenience-store brands,
// used to filter Smart Suggestions down to chains actually near the user.
// Packaged retail products (energy drinks, soda, snack brands, etc.) are
// sold nationwide regardless of state, so they're left unlisted (treated
// as available everywhere) — this only matters for dine-in/pickup chains.
//
// Best-effort real-world approximation, not an official footprint dataset.
// Regional/local brands may drift as chains expand — update as needed.

export const NATIONWIDE = 'nationwide' as const;

export const BRAND_AVAILABILITY: Record<string, typeof NATIONWIDE | string[]> = {
  // ── Fast Food ────────────────────────────────────────────────────
  "McDonald's": NATIONWIDE,
  "Burger King": NATIONWIDE,
  "Wendy's": NATIONWIDE,
  "Chick-fil-A": NATIONWIDE,
  "Culver's": ['WI','IL','MN','IA','IN','MI','OH','MO','NE','SD','ND','KS','CO','AZ','TX','FL','KY','TN','GA','PA','NC','SC','AL','MS','OK','AR'],
  "Sonic": ['AL','AK','AZ','AR','CA','CO','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','MD','MI','MN','MS','MO','MT','NE','NV','NM','NC','ND','OH','OK','OR','PA','SC','SD','TN','TX','UT','VA','WA','WV','WI','WY'],
  "Arby's": NATIONWIDE,
  "Dairy Queen": NATIONWIDE,
  "Jack in the Box": ['CA','TX','AZ','OR','WA','NV','NM','OK','LA','CO','UT','HI','ID','MO','KS','AR','MS','AL','GA','SC','NC','TN'],
  "Five Guys": NATIONWIDE,
  "Shake Shack": NATIONWIDE,
  "Whataburger": ['TX','OK','NM','AZ','LA','AR','MS','AL','GA','FL','TN','KS','CO','MO','SC','NC'],
  "Hardee's / Carl's Jr.": NATIONWIDE,
  "Raising Cane's": NATIONWIDE,
  "Wingstop": NATIONWIDE,
  "Popeyes": NATIONWIDE,
  "KFC": NATIONWIDE,
  "Jersey Mike's": NATIONWIDE,
  "Jimmy John's": NATIONWIDE,
  "Subway": NATIONWIDE,
  "Panera Bread": NATIONWIDE,

  // ── Tex-Mex & Pizza ──────────────────────────────────────────────
  "Chipotle": NATIONWIDE,
  "Taco Bell": NATIONWIDE,
  "Pancheros": ['IA','IL','MN','WI','MO','KS','NE','CO','TX','FL','NC','VA','MD','PA','OH','IN','GA','SC'],
  "Domino's": NATIONWIDE,
  "Pizza Hut": NATIONWIDE,
  "Little Caesars": NATIONWIDE,
  "Papa John's": NATIONWIDE,
  "Pizza Ranch": ['IA','MN','SD','ND','NE','WI','IL','MO','KS','CO','MT','WY','ID','OK','IN'],
  "Panda Express": NATIONWIDE,

  // ── Coffee & Breakfast ───────────────────────────────────────────
  "Starbucks": NATIONWIDE,
  "Dunkin'": NATIONWIDE,
  "Denny's": NATIONWIDE,
  "Waffle House": ['AL','AR','AZ','DE','FL','GA','IL','IN','KS','KY','LA','MD','MS','MO','NC','NM','OH','OK','PA','SC','TN','TX','VA','WV'],
  "IHOP": NATIONWIDE,

  // ── Local & Regional (Iowa-based chains) ────────────────────────
  "Charlotte's Kitchen": ['IA'],
  "B-Bop's": ['IA'],
  "Maid-Rite": ['IA','IL','MO','NE'],
  "Tasty Tacos": ['IA'],
  "Abelardo's": ['IA'],

  // ── Convenience Stores ───────────────────────────────────────────
  "7-Eleven": NATIONWIDE,
  "Wawa": ['PA','NJ','DE','MD','VA','FL','DC','GA','NC'],
  "Sheetz": ['PA','VA','WV','MD','NC','OH','IN','MI'],
  "QuikTrip": ['OK','TX','KS','MO','IA','IL','GA','NC','SC','AZ','CO','NM','TN','MN','WI','NE'],
  "Kwik Trip / Kwik Star": ['WI','MN','IA','IL','MI','SD'],
  "Casey's General Store": ['IA','IL','IN','KS','KY','MN','MO','NE','ND','SD','OH','OK','TN','WI','AR','AL','CO','GA','MS','TX'],
};

/**
 * Returns true if a food's brand should be shown for the given state.
 * Unknown/unlisted brands (custom foods, packaged retail products like
 * energy drinks/soda, USDA/OFF search results) are always available —
 * this only filters brands we actually have footprint data for. If the
 * user hasn't set a state yet, nothing is filtered.
 */
export function isBrandAvailable(brand: string | undefined, state: string | undefined): boolean {
  if (!brand || !state) return true;
  const avail = BRAND_AVAILABILITY[brand];
  if (!avail) return true;
  if (avail === NATIONWIDE) return true;
  return avail.includes(state);
}
