import type { UserProfile, NutritionInfo, MealEntry } from '../types';

/** Returns today's date as YYYY-MM-DD in the user's local timezone (not UTC). */
export function localToday(): string {
  return new Date().toLocaleDateString('en-CA'); // en-CA locale formats as YYYY-MM-DD
}

// Convert imperial to metric for calculations
export function lbsToKg(lbs: number) { return lbs / 2.205; }
export function feetInchesToCm(ft: number, inches: number) { return (ft * 12 + inches) * 2.54; }
export function kgToLbs(kg: number) { return kg * 2.205; }

export function calculateBMR(profile: UserProfile): number {
  const weightKg = lbsToKg(profile.currentWeight);
  const heightCm = feetInchesToCm(profile.heightFt, profile.heightIn);
  const { age, gender } = profile;
  // Mifflin-St Jeor
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    lightly: 1.375,
    moderately: 1.55,
    very: 1.725,
    extra: 1.9
  };
  return bmr * multipliers[profile.activityLevel];
}

export function calculateCalorieGoal(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  if (profile.weightGoal === 'maintain') return Math.round(tdee);
  // 1 lb/week = 500 cal/day deficit
  const dailyDelta = profile.goalRateLbs * 500;
  const goal = profile.weightGoal === 'lose' ? tdee - dailyDelta : tdee + dailyDelta;
  return Math.max(1200, Math.round(goal)); // never below 1200
}

export function calculateDefaultMacros(calorieGoal: number) {
  return {
    protein: Math.round((calorieGoal * 0.30) / 4),
    carbs: Math.round((calorieGoal * 0.40) / 4),
    fat: Math.round((calorieGoal * 0.30) / 9),
  };
}

export function sumNutrition(entries: MealEntry[]): NutritionInfo {
  const zero: NutritionInfo = {
    calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0,
    sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0,
    vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0,
    caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0,
    magnesium: 0, zinc: 0, omega3: 0, folate: 0,
  };
  return entries.reduce((acc, entry) => {
    const n = entry.food.nutrition;
    const s = entry.servings;
    return {
      calories: acc.calories + n.calories * s,
      protein: acc.protein + n.protein * s,
      carbs: acc.carbs + n.carbs * s,
      fat: acc.fat + n.fat * s,
      sugar: acc.sugar + n.sugar * s,
      fiber: acc.fiber + n.fiber * s,
      sodium: acc.sodium + n.sodium * s,
      cholesterol: acc.cholesterol + n.cholesterol * s,
      saturatedFat: acc.saturatedFat + n.saturatedFat * s,
      vitaminA: acc.vitaminA + n.vitaminA * s,
      vitaminC: acc.vitaminC + n.vitaminC * s,
      vitaminD: acc.vitaminD + n.vitaminD * s,
      vitaminB12: acc.vitaminB12 + n.vitaminB12 * s,
      iron: acc.iron + n.iron * s,
      calcium: acc.calcium + n.calcium * s,
      potassium: acc.potassium + n.potassium * s,
      caffeine: acc.caffeine + n.caffeine * s,
      alcohol: acc.alcohol + n.alcohol * s,
      addedSugar: acc.addedSugar + n.addedSugar * s,
      transFat: acc.transFat + n.transFat * s,
      magnesium: acc.magnesium + n.magnesium * s,
      zinc: acc.zinc + n.zinc * s,
      omega3: acc.omega3 + n.omega3 * s,
      folate: acc.folate + n.folate * s,
    };
  }, zero);
}

export const DV: Record<string, number> = {
  vitaminA: 900,
  vitaminC: 90,
  vitaminD: 20,
  vitaminB12: 2.4,
  iron: 18,
  calcium: 1300,
  potassium: 4700,
  sodium: 2300,
  fiber: 28,
  sugar: 50,          // FDA added-sugars limit (used as reference for total sugar)
  cholesterol: 300,
  saturatedFat: 20,
  magnesium: 420,
  zinc: 11,
  folate: 400,
  caffeine: 400,
};

export function getCalorieColor(calories: number, goal: number): string {
  if (calories === 0) return 'text-gray-500';
  const pct = calories / goal;
  if (pct <= 1.0) return 'text-emerald-400';
  if (pct <= 1.1) return 'text-yellow-400';
  return 'text-red-400';
}
