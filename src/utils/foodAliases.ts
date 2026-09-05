// Curated search aliases for the highest-value ambiguous/common cases.
// This is intentionally NOT exhaustive across the whole seed database —
// the generic scorer in foodSearch.ts (normalization, multi-token match,
// fuzzy typo tolerance, brand-prefix boost) already covers most natural
// phrasing without needing a hand-written alias for every item.

/** Extra search terms for specific food ids, on top of name/brand. */
export const FOOD_ALIASES: Record<string, string[]> = {
  'seed-jj-turkeytom-8in': ['turkey sandwich', 'turkey sub', 'jj turkey', 'turkey tom sandwich'],
  'seed-jj-turkeytom-slim': ['turkey sandwich', 'turkey sub', 'jj turkey'],
  'seed-jj-jjblt-8in': ['jjblt', 'jj blt', 'blt sandwich'],
  'seed-pe-orange-chicken': ['panda orange chicken', 'panda express orange', 'orange chicken panda', 'orange chicken from panda'],
  'seed-diet-coke-12oz': ['coke diet', 'coca cola diet', 'coca-cola diet', 'diet soda'],
  'seed-diet-coke-20oz': ['coke diet', 'coca cola diet', 'coca-cola diet', 'diet soda'],
  'seed-coke-zero-12oz': ['coke zero', 'coca cola zero sugar', 'zero sugar coke'],
  'seed-coke-zero-20oz': ['coke zero', 'coca cola zero sugar', 'zero sugar coke'],
};

/** Extra search terms applied to every food of a given brand (e.g. any Built Bar
 *  item should also surface for a generic "protein bar" search). */
export const BRAND_ALIASES: Record<string, string[]> = {
  'Built Bar': ['protein bar'],
  'Oikos': ['greek yogurt', 'protein yogurt'],
  'Chomps': ['beef stick', 'meat stick', 'protein snack'],
};

/** Short-hand that should resolve to a full brand name for the brand-match tiers. */
export const BRAND_ABBREVIATIONS: Record<string, string[]> = {
  'jj': ["Jimmy John's"],
  'mcd': ["McDonald's"],
  'mickey ds': ["McDonald's"],
  'bk': ['Burger King'],
  'cfa': ['Chick-fil-A'],
  'qt': ['QuikTrip'],
  'kt': ['Kwik Trip / Kwik Star'],
};
