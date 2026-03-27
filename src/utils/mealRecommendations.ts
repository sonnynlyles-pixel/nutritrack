import type { FoodItem, MealCategory } from '../types';

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

// Keywords that strongly indicate a food belongs to a particular meal category.
// A food matching a keyword for the WRONG meal gets penalised; matching the RIGHT
// meal gets a bonus. Neutral foods (no keywords) are always eligible.

const BREAKFAST_KEYWORDS = [
  'egg', 'oat', 'oatmeal', 'pancake', 'waffle', 'muffin', 'cereal', 'granola',
  'yogurt', 'yoghurt', 'bagel', 'toast', 'bacon', 'hashbrown', 'hash brown',
  'croissant', 'breakfast', 'mcmuffin', 'mcgriddle', 'hotcake', 'french toast',
  'crepe', 'parfait', 'scone', 'biscuit gravy', 'frittata', 'omelet', 'omelette',
  'quiche', 'smoothie bowl', 'acai bowl',
];

const LUNCH_DINNER_KEYWORDS = [
  'burger', 'burrito', 'taco', 'pizza', 'pasta', 'noodle', 'ramen', 'pho',
  'sandwich', 'sub', 'hoagie', 'wrap', 'gyro', 'falafel', 'shawarma',
  'steak', 'ribs', 'brisket', 'meatball', 'meatloaf', 'pot roast',
  'enchilada', 'quesadilla', 'nachos', 'fajita',
  'sushi', 'sashimi', 'teriyaki', 'fried rice', 'stir fry', 'stir-fry',
  'curry', 'tikka', 'biryani', 'pad thai',
  'fish and chips', 'lobster', 'crab cake', 'shrimp scampi',
  'chicken alfredo', 'chicken parmesan', 'chicken marsala',
  'soup', 'chili', 'chowder', 'stew', 'bisque',
  'caesar salad', 'cobb salad', 'greek salad', 'chef salad',
  'mac and cheese', 'macaroni',
  'mcrib', 'big mac', 'quarter pounder', 'whopper', 'baconator',
  'chipotle bowl', 'chipotle burrito',
];

const SNACK_KEYWORDS = [
  'protein bar', 'granola bar', 'energy bar', 'clif bar', 'rxbar', 'kind bar',
  'quest bar', 'built bar', 'built puff', 'puff bar',
  'chips', 'crackers', 'pretzels', 'popcorn', 'rice cake',
  'trail mix', 'mixed nuts', 'almonds', 'cashews', 'pistachios', 'peanuts',
  'fruit snack', 'gummies', 'candy', 'chocolate bar', 'kit kat', 'snickers',
  'cookie', 'brownie', 'pudding cup', 'jell-o',
  'string cheese', 'cheese stick', 'babybel',
  'applesauce', 'fruit cup', 'apple slices',
  'hummus', 'guacamole', 'salsa',
  'edamame', 'jerky',
];

// Foods that are clearly treats/indulgences — deprioritised in suggestions
// but not fully blocked (user may still log them manually).
const TREAT_KEYWORDS = [
  'candy', 'gummies', 'gummy bear', 'skittles', 'starburst', 'jolly rancher',
  'chocolate bar', 'kit kat', 'snickers', 'twix', 'reeses', 'hershey',
  'donut', 'doughnut', 'churro', 'funnel cake',
  'cake', 'cupcake', 'brownie', 'cheesecake',
  'ice cream', 'gelato', 'soft serve', 'sundae', 'mcflurry',
  'milkshake', 'milk shake', 'frappe', 'frappé', 'frappuccino',
  'soda', 'cola', 'pepsi', 'sprite', 'mountain dew', 'dr pepper',
  'energy drink', 'red bull', 'monster energy',
  'sweet tea', 'lemonade',
  'hot chocolate',
  'caramel latte', 'caramel macchiato', 'mocha',
  'apple pie', 'baked pie', 'pop tart', 'toaster pastry',
  'chips ahoy', 'oreo', 'nutter butter',
  'cool whip', 'whipped cream',
];

/**
 * Nutrition-based health score adjustment: –30 to +20 pts.
 * Rewards protein density, fiber; penalises excess sugar, sat-fat,
 * trans fat, very high sodium, and treat keywords.
 */
function healthBonus(food: FoodItem): number {
  const n = food.nutrition;
  const cal = n.calories;
  if (cal <= 0) return 0;

  let bonus = 0;

  // Reward protein density (up to +15 pts at ≥40% protein calories)
  const proteinPct = (n.protein * 4) / cal;
  bonus += Math.min(proteinPct / 0.4, 1) * 15;

  // Reward fiber (up to +5 pts, 1 pt per 2 g)
  bonus += Math.min((n.fiber ?? 0) / 2, 5);

  // Penalise excess sugar (–1 pt per gram over 10 g, max –15)
  const sugarOver = Math.max((n.sugar ?? 0) - 10, 0);
  bonus -= Math.min(sugarOver, 15);

  // Penalise saturated fat (–2 pts per gram over 5 g, max –10)
  const satOver = Math.max((n.saturatedFat ?? 0) - 5, 0);
  bonus -= Math.min(satOver * 2, 10);

  // Heavy penalty for any trans fat
  if ((n.transFat ?? 0) > 0) bonus -= 20;

  // Penalise very high sodium
  if ((n.sodium ?? 0) > 1500) bonus -= 10;
  else if ((n.sodium ?? 0) > 1000) bonus -= 5;

  // Keyword-based treat penalty
  const text = `${food.name} ${food.brand ?? ''}`.toLowerCase();
  if (TREAT_KEYWORDS.some(k => text.includes(k))) bonus -= 25;

  return bonus;
}

type MealContext = { label: string; meal: MealCategory };

export function getMealContext(): MealContext {
  const hour = new Date().getHours();
  if (hour < 10) return { label: 'Breakfast Suggestions', meal: 'breakfast' };
  if (hour < 14) return { label: 'Lunch Suggestions', meal: 'lunch' };
  if (hour < 17) return { label: 'Afternoon Snack Suggestions', meal: 'snacks' };
  if (hour < 21) return { label: 'Dinner Suggestions', meal: 'dinner' };
  return { label: 'Evening Snack Suggestions', meal: 'snacks' };
}

/** Returns the meal-appropriateness adjustment for a food in the given context.
 *  +20 = great fit, 0 = neutral, -60 = wrong meal (strong filter) */
function mealFitBonus(food: FoodItem, meal: MealCategory): number {
  const text = `${food.name} ${food.brand ?? ''}`.toLowerCase();

  const isBreakfast   = BREAKFAST_KEYWORDS.some(k => text.includes(k));
  const isLunchDinner = LUNCH_DINNER_KEYWORDS.some(k => text.includes(k));
  const isSnack       = SNACK_KEYWORDS.some(k => text.includes(k));

  // No signals → neutral, always eligible
  if (!isBreakfast && !isLunchDinner && !isSnack) return 0;

  if (meal === 'breakfast') {
    if (isBreakfast)   return 20;   // good fit
    if (isLunchDinner) return -60;  // wrong meal
    if (isSnack)       return -20;  // mildly inappropriate
    return 0;
  }

  if (meal === 'lunch' || meal === 'dinner') {
    if (isLunchDinner) return 20;
    if (isBreakfast)   return -60;
    if (isSnack)       return -15;
    return 0;
  }

  if (meal === 'snacks') {
    if (isSnack)       return 20;
    if (isBreakfast)   return -25;
    if (isLunchDinner) return -30;
    return 0;
  }

  return 0;
}

export function getRecommendations(
  remaining: MacroTarget,
  foods: FoodItem[],
  limit = 6,
  meal?: MealCategory,
): Recommendation[] {
  if (remaining.calories <= 50) return [];

  const activeMeal = meal ?? getMealContext().meal;

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

    // 4. Meal-category fit bonus / penalty (–60 to +20 pts)
    score += mealFitBonus(food, activeMeal);

    // 5. Health / nutrient-density score (–30 to +20 pts)
    score += healthBonus(food);

    scored.push({ food, servings, score });
  }

  // Filter out strongly wrong-meal items (negative score from meal penalty alone
  // pushing total below -20) before returning top results
  return scored
    .filter(r => r.score > -20)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
