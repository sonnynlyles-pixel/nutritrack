import type { FoodItem } from '../../types';
import { SEEDS as fastfoodSeeds } from './fastfood';
import { SEEDS as texmexPizzaSeeds } from './texmex-pizza';
import { SEEDS as breakfastCafeSeeds } from './breakfast-cafe';
import { SEEDS as convenienceSeeds } from './convenience';
import { SEEDS as beveragesSeeds } from './beverages';
import { SEEDS as grocerySeeds } from './grocery';
import { SEEDS as genericFoodsSeeds } from './generic-foods';

// Applies a default category to every food in a file's seed set, unless the
// item already declares its own (e.g. generic-foods.ts items are pre-tagged
// Fruits/Vegetables/Meat/etc). Keeps categorization out of the ~1045
// hand-written restaurant/beverage entries — those are already well served
// by the Brands browse tab.
function withDefaultCategory(seeds: FoodItem[], category: string): FoodItem[] {
  return seeds.map(f => (f.category ? f : { ...f, category }));
}

// A few brands sit inside a file that's mostly a different category (e.g. the
// convenience-store file also carries a Bang Energy drink lineup) — override
// by brand after the file-level default is applied.
const BRAND_CATEGORY_OVERRIDES: Record<string, string> = {
  'Bang Energy': 'Drinks',
};

function withBrandOverrides(seeds: FoodItem[]): FoodItem[] {
  return seeds.map(f => {
    const override = f.brand ? BRAND_CATEGORY_OVERRIDES[f.brand] : undefined;
    return override ? { ...f, category: override } : f;
  });
}

export const SEEDED_FOODS: FoodItem[] = withBrandOverrides([
  ...withDefaultCategory(fastfoodSeeds, 'Restaurants'),
  ...withDefaultCategory(texmexPizzaSeeds, 'Restaurants'),
  ...withDefaultCategory(breakfastCafeSeeds, 'Restaurants'),
  ...withDefaultCategory(convenienceSeeds, 'Restaurants'),
  ...withDefaultCategory(beveragesSeeds, 'Drinks'),
  ...withDefaultCategory(grocerySeeds, 'Snacks'),
  ...genericFoodsSeeds,
]);
