import Dexie, { type Table } from 'dexie';
import type { DailyLog, WeightEntry, FoodItem, QuickMeal, Recipe } from '../types';

export class NutriTrackDB extends Dexie {
  dailyLogs!: Table<DailyLog>;
  weightEntries!: Table<WeightEntry>;
  customFoods!: Table<FoodItem>;
  quickMeals!: Table<QuickMeal>;
  recipes!: Table<Recipe>;
  recentFoods!: Table<FoodItem & { usedAt: string }>;

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
  }
}

export const db = new NutriTrackDB();

// Prune logs older than 1 year
export async function pruneOldData() {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  await db.dailyLogs.where('date').below(cutoffStr).delete();
  await db.weightEntries.where('date').below(cutoffStr).delete();
}

// Seed well-known restaurant items that aren't in public APIs
const SEEDED_FOODS: FoodItem[] = [
  {
    id: 'custom-jersey-mikes-chipotle-cheesesteak-regular',
    name: "Chipotle Cheese Steak (Regular)",
    brand: "Jersey Mike's",
    servingSizeG: 1,
    servingLabel: '1 sandwich',
    source: 'custom',
    nutrition: {
      calories: 980,
      protein: 45,
      carbs: 63,
      fat: 60,
      saturatedFat: 19,
      cholesterol: 147,
      sodium: 2381,
      fiber: 3,
      sugar: 9,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminB12: 0,
      iron: 0,
      calcium: 0,
      potassium: 0,
    }
  }
];

export async function seedFoods() {
  for (const food of SEEDED_FOODS) {
    const existing = await db.customFoods.get(food.id);
    if (!existing) await db.customFoods.put(food);
  }
}
