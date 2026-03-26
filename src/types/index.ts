export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  heightFt: number;
  heightIn: number;
  currentWeight: number; // lbs
  goalWeight: number; // lbs
  activityLevel: 'sedentary' | 'lightly' | 'moderately' | 'very' | 'extra';
  weightGoal: 'lose' | 'maintain' | 'gain';
  goalRateLbs: number; // lbs per week: 0.5, 1, 1.5, 2
  calorieGoal: number; // auto-calculated TDEE +/- deficit
  macroTargets: { protein: number; carbs: number; fat: number }; // grams
  waterGoalOz: number;
  setupComplete: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;    // g
  carbs: number;      // g
  fat: number;        // g
  sugar: number;      // g
  fiber: number;      // g
  sodium: number;     // mg
  cholesterol: number; // mg
  saturatedFat: number; // g
  vitaminA: number;   // mcg RAE
  vitaminC: number;   // mg
  vitaminD: number;   // mcg
  vitaminB12: number; // mcg
  iron: number;       // mg
  calcium: number;    // mg
  potassium: number;  // mg
  caffeine: number;   // mg
  alcohol: number;    // g
  addedSugar: number; // g
  transFat: number;   // g
  magnesium: number;  // mg
  zinc: number;       // mg
  omega3: number;     // g
  folate: number;     // mcg
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSizeG: number;    // grams (canonical)
  servingLabel: string;    // e.g. "1 cup (240g)"
  nutrition: NutritionInfo; // per serving
  source: 'off' | 'usda' | 'custom';
  barcode?: string;
}

export interface MealEntry {
  id: string;
  food: FoodItem;
  servings: number;
  timeAdded: string; // ISO
}

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: Record<MealCategory, MealEntry[]>;
  waterOz: number;
  notes: string;
}

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightLbs: number;
  notes?: string;
}

export interface QuickMeal {
  id: string;
  name: string;
  entries: { food: FoodItem; servings: number }[];
  totalCalories: number;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number; // how many servings the recipe makes
  ingredients: { food: FoodItem; servings: number }[];
  notes?: string;
}
