import Dexie, { type Table } from 'dexie';
import type { DailyLog, WeightEntry, FoodItem, QuickMeal, Recipe, Favorite } from '../types';
import { SEEDED_FOODS } from './seeds';

export class NutriTrackDB extends Dexie {
  dailyLogs!: Table<DailyLog>;
  weightEntries!: Table<WeightEntry>;
  customFoods!: Table<FoodItem>;
  quickMeals!: Table<QuickMeal>;
  recipes!: Table<Recipe>;
  recentFoods!: Table<FoodItem & { usedAt: string }>;
  favorites!: Table<Favorite>;

  constructor() {
    super('NutriTrackDB');
    this.version(1).stores({
      dailyLogs: 'date',
      weightEntries: 'id, date',
      customFoods: 'id, name',
      quickMeals: 'id, name',
      recipes: 'id, name',
      recentFoods: 'id, usedAt'
    });
    this.version(2).stores({
      customFoods: 'id, name, brand'
    });
    this.version(3).stores({
      customFoods: 'id, name, brand'
    });
    this.version(4).stores({
      favorites: 'id'
    });
  }
}

export const db = new NutriTrackDB();

// Prune logs older than 1 year
export async function pruneOldData() {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  const cutoffStr = cutoff.toLocaleDateString('en-CA');
  await db.dailyLogs.where('date').below(cutoffStr).delete();
  await db.weightEntries.where('date').below(cutoffStr).delete();
}

// Removes stale seed-managed foods left behind when an item is renamed or
// dropped from the seed database. Only touches ids with the 'seed-' prefix —
// user-created custom foods use 'custom-'/'recipe-food-' prefixes and are
// never affected.
export async function pruneStaleSeeds() {
  const currentIds = new Set(SEEDED_FOODS.map(f => f.id));
  const existingSeedIds = await db.customFoods.where('id').startsWith('seed-').primaryKeys();
  const staleIds = existingSeedIds.filter(id => !currentIds.has(id as string));
  if (staleIds.length > 0) {
    await db.customFoods.bulkDelete(staleIds);
  }
}

export async function seedFoods() {
  await db.customFoods.bulkPut(SEEDED_FOODS);
  await pruneStaleSeeds();
}
