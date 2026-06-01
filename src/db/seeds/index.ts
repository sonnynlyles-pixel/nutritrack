import type { FoodItem } from '../../types';
import { SEEDS as fastfoodSeeds } from './fastfood';
import { SEEDS as texmexPizzaSeeds } from './texmex-pizza';
import { SEEDS as breakfastCafeSeeds } from './breakfast-cafe';
import { SEEDS as convenienceSeeds } from './convenience';
import { SEEDS as beveragesSeeds } from './beverages';
import { SEEDS as grocerySeeds } from './grocery';

export const SEEDED_FOODS: FoodItem[] = [
  ...fastfoodSeeds,
  ...texmexPizzaSeeds,
  ...breakfastCafeSeeds,
  ...convenienceSeeds,
  ...beveragesSeeds,
  ...grocerySeeds,
];
