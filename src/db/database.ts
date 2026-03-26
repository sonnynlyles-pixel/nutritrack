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

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0 } };
}

// Seed well-known restaurant items that aren't reliably in public APIs
const SEEDED_FOODS: FoodItem[] = [
  // ── Jersey Mike's ──────────────────────────────────────────────
  rf('seed-jm-chipotle-steak-reg',    "Chipotle Cheese Steak (Regular)",     "Jersey Mike's", '1 sandwich', 980,  45, 63, 60, 19, 147, 2381, 3,  9),
  rf('seed-jm-chipotle-steak-giant',  "Chipotle Cheese Steak (Giant)",       "Jersey Mike's", '1 sandwich', 1480, 68, 95, 90, 29, 220, 3571, 5, 14),
  rf('seed-jm-turkey-provolone-reg',  "Turkey & Provolone (Regular)",        "Jersey Mike's", '1 sandwich', 580,  44, 61, 19,  8,  80, 1530, 3,  7),
  rf('seed-jm-club-sub-reg',          "Club Sub (Regular)",                  "Jersey Mike's", '1 sandwich', 640,  45, 62, 26,  9,  95, 1580, 3,  7),
  rf('seed-jm-blt-reg',               "BLT (Regular)",                       "Jersey Mike's", '1 sandwich', 600,  26, 54, 33, 11,  55, 1020, 3,  6),

  // ── McDonald's ─────────────────────────────────────────────────
  rf('seed-mcd-big-mac',              "Big Mac",                             "McDonald's",    '1 burger',   590,  25, 46, 34, 11,  85, 1050, 3,  9),
  rf('seed-mcd-qpc',                  "Quarter Pounder with Cheese",         "McDonald's",    '1 burger',   520,  30, 42, 26, 12,  95, 1140, 2, 10),
  rf('seed-mcd-dqpc',                 "Double Quarter Pounder with Cheese",  "McDonald's",    '1 burger',   740,  49, 43, 42, 19, 175, 1360, 2, 10),
  rf('seed-mcd-mcdouble',             "McDouble",                            "McDonald's",    '1 burger',   400,  22, 36, 18,  8,  70,  840, 2,  7),
  rf('seed-mcd-mcchicken',            "McChicken",                           "McDonald's",    '1 sandwich', 400,  14, 39, 21,  4,  45,  560, 2,  5),
  rf('seed-mcd-nuggets-10pc',         "Chicken McNuggets (10 pc)",           "McDonald's",    '10 pieces',  420,  22, 27, 25,  4,  65,  840, 1,  0),
  rf('seed-mcd-large-fries',          "Large Fries",                         "McDonald's",    '1 large',    480,   7, 66, 22,  3,   0,  400, 6,  0),
  rf('seed-mcd-egg-mcmuffin',         "Egg McMuffin",                        "McDonald's",    '1 sandwich', 310,  17, 30, 13,  5, 250,  760, 2,  3),

  // ── Chick-fil-A ────────────────────────────────────────────────
  rf('seed-cfa-original-sandwich',    "Original Chicken Sandwich",           "Chick-fil-A",   '1 sandwich', 440,  28, 41, 19,  4,  75, 1350, 2,  6),
  rf('seed-cfa-spicy-deluxe',         "Spicy Deluxe Sandwich",               "Chick-fil-A",   '1 sandwich', 550,  36, 47, 26,  7, 100, 1750, 2,  7),
  rf('seed-cfa-grilled-sandwich',     "Grilled Chicken Sandwich",            "Chick-fil-A",   '1 sandwich', 390,  36, 38, 11,  2,  80, 1120, 2,  7),
  rf('seed-cfa-nuggets-8pc',          "Chicken Nuggets (8 pc)",              "Chick-fil-A",   '8 pieces',   260,  27, 11, 12,  2,  70, 1210, 0,  1),
  rf('seed-cfa-strips-3pc',           "Chicken Strips (3 pc)",               "Chick-fil-A",   '3 strips',   370,  37, 21, 17,  3,  65, 1210, 0,  2),
  rf('seed-cfa-waffle-fries-med',     "Waffle Fries (Medium)",               "Chick-fil-A",   '1 medium',   420,   5, 50, 22,  4,   0,  260, 5,  0),

  // ── Chipotle ───────────────────────────────────────────────────
  rf('seed-chipotle-chicken-bowl',    "Chicken Bowl (rice, beans, salsa, cheese)", "Chipotle", '1 bowl',    675,  53, 71, 22,  8,  95, 1965, 8,  3),
  rf('seed-chipotle-chicken-burrito', "Chicken Burrito (rice, beans, salsa, cheese)", "Chipotle", '1 burrito', 890, 57, 99, 32, 12, 95, 2310, 9, 4),
  rf('seed-chipotle-steak-bowl',      "Steak Bowl (rice, beans, salsa, cheese)", "Chipotle",  '1 bowl',    640,  43, 71, 20,  7,  60, 1980, 8,  3),
  rf('seed-chipotle-carnitas-bowl',   "Carnitas Bowl (rice, beans, salsa, cheese)", "Chipotle", '1 bowl',   700,  45, 71, 26, 11,  80, 2000, 8,  3),

  // ── Subway (6-inch, 9-grain wheat) ─────────────────────────────
  rf('seed-sub-turkey-6',             "6\" Turkey Breast",                   "Subway",        '1 sandwich', 210,  13, 36,  4,  1,  20,  730, 5,  6),
  rf('seed-sub-bmt-6',                "6\" Italian B.M.T.",                  "Subway",        '1 sandwich', 450,  23, 47, 21,  8,  55, 1790, 5,  8),
  rf('seed-sub-meatball-6',           "6\" Meatball Marinara",               "Subway",        '1 sandwich', 500,  23, 52, 22,  8,  55, 1180, 6, 11),
  rf('seed-sub-tuna-6',               "6\" Tuna",                            "Subway",        '1 sandwich', 430,  20, 46, 19,  4,  45, 1070, 5,  7),
  rf('seed-sub-steak-6',              "6\" Steak & Cheese",                  "Subway",        '1 sandwich', 380,  26, 44, 12,  5,  55, 1190, 5,  7),

  // ── Wendy's ────────────────────────────────────────────────────
  rf('seed-wdy-daves-single',         "Dave's Single",                       "Wendy's",       '1 burger',   570,  30, 39, 30, 12,  90, 1160, 2,  9),
  rf('seed-wdy-daves-double',         "Dave's Double",                       "Wendy's",       '1 burger',   810,  50, 40, 49, 21, 165, 1410, 2,  9),
  rf('seed-wdy-baconator',            "Baconator",                           "Wendy's",       '1 burger',   940,  59, 38, 57, 23, 190, 1780, 2,  8),
  rf('seed-wdy-spicy-chicken',        "Spicy Chicken Sandwich",              "Wendy's",       '1 sandwich', 500,  29, 51, 19,  4,  65, 1200, 2,  7),
  rf('seed-wdy-jr-bacon-cheeseburger',"Jr. Bacon Cheeseburger",              "Wendy's",       '1 burger',   380,  20, 27, 20,  8,  65,  700, 1,  6),
  rf('seed-wdy-small-frosty',         "Small Chocolate Frosty",              "Wendy's",       '1 small',    340,   9, 57,  9,  6,  35,  200, 0, 46),

  // ── Taco Bell ──────────────────────────────────────────────────
  rf('seed-tb-crunchy-taco',          "Crunchy Taco",                        "Taco Bell",     '1 taco',     170,   8, 13,  9,  4,  25,  300, 2,  1),
  rf('seed-tb-soft-taco-beef',        "Soft Taco (Beef)",                    "Taco Bell",     '1 taco',     200,   9, 20,  9,  4,  25,  580, 2,  2),
  rf('seed-tb-doritos-locos-taco',    "Doritos Locos Taco (Nacho Cheese)",   "Taco Bell",     '1 taco',     170,   8, 14,  9,  4,  25,  310, 1,  1),
  rf('seed-tb-burrito-supreme',       "Burrito Supreme (Beef)",              "Taco Bell",     '1 burrito',  400,  16, 51, 14,  6,  30, 1110, 6,  5),
  rf('seed-tb-chicken-quesadilla',    "Chicken Quesadilla",                  "Taco Bell",     '1 quesadilla',510, 28, 39, 24, 11,  80, 1200, 3,  3),
  rf('seed-tb-bean-burrito',          "Bean Burrito",                        "Taco Bell",     '1 burrito',  350,  13, 55, 10,  4,  15, 1020, 8,  4),

  // ── Panera Bread ───────────────────────────────────────────────
  rf('seed-panera-broccoli-cheddar',  "Broccoli Cheddar Soup (Bowl)",        "Panera Bread",  '1 bowl',     360,  11, 29, 24, 11,  60, 1110, 3,  8),
  rf('seed-panera-mac-cheese',        "Mac & Cheese (Bowl)",                 "Panera Bread",  '1 bowl',     670,  25, 83, 28, 14,  70, 1600, 4,  9),
  rf('seed-panera-frontega-panini',   "Chicken Frontega Panini",             "Panera Bread",  '1 sandwich', 860,  47, 94, 35, 12, 120, 1920, 4, 12),
  rf('seed-panera-fuji-apple-salad',  "Fuji Apple Salad with Chicken",       "Panera Bread",  '1 salad',    520,  29, 51, 24,  6,  75, 1090, 4, 37),

  // ── Starbucks ──────────────────────────────────────────────────
  rf('seed-sbux-latte-grande',        "Caffè Latte, Grande (2% milk)",       "Starbucks",     '16 fl oz',   190,  13, 19,  7,  5,  25,  170, 0, 17),
  rf('seed-sbux-caramel-mac-grande',  "Caramel Macchiato, Grande",           "Starbucks",     '16 fl oz',   250,  10, 37,  7,  4,  25,  150, 0, 33),
  rf('seed-sbux-mocha-frapp-grande',  "Mocha Frappuccino, Grande",           "Starbucks",     '16 fl oz',   410,   5, 63, 15,  9,  55,  200, 1, 55),
  rf('seed-sbux-bacon-egg-bites',     "Bacon & Gruyère Egg Bites",           "Starbucks",     '2 bites',    310,  19,  9, 22, 11, 215,  560, 0,  1),
  rf('seed-sbux-butter-croissant',    "Butter Croissant",                    "Starbucks",     '1 croissant',260,   5, 31, 14,  8,  30,  230, 1,  8),

  // ── Burger King ────────────────────────────────────────────────
  rf('seed-bk-whopper',               "Whopper",                             "Burger King",   '1 burger',   660,  28, 49, 40, 12,  90,  980, 2, 11),
  rf('seed-bk-whopper-cheese',        "Whopper with Cheese",                 "Burger King",   '1 burger',   740,  32, 50, 46, 16, 115, 1240, 2, 11),
  rf('seed-bk-double-whopper',        "Double Whopper",                      "Burger King",   '1 burger',   900,  52, 49, 57, 19, 165, 1060, 2, 11),
  rf('seed-bk-ch-sandwich',           "Crispy Chicken Sandwich",             "Burger King",   '1 sandwich', 660,  22, 52, 40,  7,  50, 1200, 2,  7),

  // ── Domino's (Large, Hand Tossed, 1 slice) ─────────────────────
  rf('seed-dom-cheese-slice',         "Cheese Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice',  290,  12, 37, 11,  5,  25,  680, 2,  4),
  rf('seed-dom-pepperoni-slice',      "Pepperoni Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice', 330, 14, 37, 14,  6,  35,  820, 2,  4),
];

export async function seedFoods() {
  for (const food of SEEDED_FOODS) {
    const existing = await db.customFoods.get(food.id);
    if (!existing) await db.customFoods.put(food);
  }
}
