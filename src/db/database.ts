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

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
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
  rf('seed-sbux-latte-grande',        "Caffè Latte, Grande (2% milk)",       "Starbucks",     '16 fl oz',   190,  13, 19,  7,  5,  25,  170, 0, 17, 150),
  rf('seed-sbux-caramel-mac-grande',  "Caramel Macchiato, Grande",           "Starbucks",     '16 fl oz',   250,  10, 37,  7,  4,  25,  150, 0, 33, 150),
  rf('seed-sbux-mocha-frapp-grande',  "Mocha Frappuccino, Grande",           "Starbucks",     '16 fl oz',   410,   5, 63, 15,  9,  55,  200, 1, 55, 110),
  rf('seed-sbux-bacon-egg-bites',     "Bacon & Gruyère Egg Bites",           "Starbucks",     '2 bites',    310,  19,  9, 22, 11, 215,  560, 0,  1,   0),
  rf('seed-sbux-butter-croissant',    "Butter Croissant",                    "Starbucks",     '1 croissant',260,   5, 31, 14,  8,  30,  230, 1,  8,   0),

  // ── Burger King ────────────────────────────────────────────────
  rf('seed-bk-whopper',               "Whopper",                             "Burger King",   '1 burger',   660,  28, 49, 40, 12,  90,  980, 2, 11),
  rf('seed-bk-whopper-cheese',        "Whopper with Cheese",                 "Burger King",   '1 burger',   740,  32, 50, 46, 16, 115, 1240, 2, 11),
  rf('seed-bk-double-whopper',        "Double Whopper",                      "Burger King",   '1 burger',   900,  52, 49, 57, 19, 165, 1060, 2, 11),
  rf('seed-bk-ch-sandwich',           "Crispy Chicken Sandwich",             "Burger King",   '1 sandwich', 660,  22, 52, 40,  7,  50, 1200, 2,  7),

  // ── Domino's (Large, Hand Tossed, 1 slice) ─────────────────────
  rf('seed-dom-cheese-slice',         "Cheese Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice',  290,  12, 37, 11,  5,  25,  680, 2,  4),
  rf('seed-dom-pepperoni-slice',      "Pepperoni Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice', 330, 14, 37, 14,  6,  35,  820, 2,  4),

  // ── Stubborn Soda ───────────────────────────────────────────────
  rf('seed-stubborn-root-beer',       "Classic Root Beer",                   "Stubborn Soda",  '1 can (12 fl oz)', 150, 0, 39, 0, 0, 0,  70, 0, 39),

  // ── Bang Energy (16 fl oz can — all flavors: 0 cal, 0 carbs) ───
  rf('seed-bang-black-cherry',        "Bang Black Cherry Vanilla",           "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-blue-razz',           "Bang Blue Razz",                      "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-candy-apple',         "Bang Candy Apple Crisp",              "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-cherry-blade',        "Bang Cherry Blade Lemonade",          "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-citrus-twist',        "Bang Citrus Twist",                   "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-cotton-candy',        "Bang Cotton Candy",                   "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-lemon-drop',          "Bang Lemon Drop",                     "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-miami-cola',          "Bang Miami Cola",                     "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-peach-mango',         "Bang Peach Mango",                    "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-pina-colada',         "Bang Pina Colada",                    "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-purple-haze',         "Bang Purple Haze",                    "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-rainbow-unicorn',     "Bang Rainbow Unicorn",                "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-root-beer',           "Bang Root Beer",                      "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-star-blast',          "Bang Star Blast",                     "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-strawberry-blast',    "Bang Strawberry Blast",               "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-watermelon',          "Bang Wyldin Watermelon",              "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),
  rf('seed-bang-any-means-orange',    "Bang Any Means Orange",               "Bang Energy",    '1 can (16 fl oz)',   0, 0,  0, 0, 0, 0,  40, 0,  0, 300),

  // ── Kwik Trip / Kwik Star — Fried Chicken ───────────────────────
  rf('seed-kt-chicken-breast',           "Fried Chicken Breast",                    "Kwik Trip", '1 piece',               240, 26, 10, 11, 2,  85,  390, 0, 1),
  rf('seed-kt-chicken-2pc',              "Fried Chicken Breast & Wing (2 pc)",      "Kwik Trip", '1 container',           300, 33, 12, 14, 3, 110,  590, 0, 1),
  rf('seed-kt-chicken-tenders-2pc',      "Chicken Tenders (2 pc)",                  "Kwik Trip", '2 pieces',              380, 27, 27, 18, 3,  55,  900, 2, 0),
  rf('seed-kt-chicken-tenders-wedges',   "Chicken Tenders & Wedges Combo",          "Kwik Trip", '1 container',           550, 41, 37, 28, 4, 105, 1410, 2, 1),

  // ── Kwik Trip — Boneless Wings ──────────────────────────────────
  rf('seed-kt-wings-buffalo',            "Buffalo Boneless Wings",                  "Kwik Trip", '1 container',           270, 25, 13, 15, 2,  85, 2250, 0, 1),
  rf('seed-kt-wings-plain',              "Boneless Chicken Wings (Original)",       "Kwik Trip", '1 container',           480, 19, 28, 34, 16, 75, 1090, 0, 1),
  rf('seed-kt-wings-garlic-parm',        "Garlic Parmesan Boneless Wings",          "Kwik Trip", '3 pieces',              350, 17, 10, 27, 5,  70, 1140, 0, 2),
  rf('seed-kt-wings-sweet-spicy',        "Sweet & Spicy Boneless Wings",            "Kwik Trip", '1 container',           620, 24, 93, 18, 4,  95, 2260, 1, 56),
  rf('seed-kt-wings-bbq',                "BBQ Boneless Wings",                      "Kwik Trip", '1 container',           640, 23, 95, 18, 4,  95, 3180, 0, 57),

  // ── Kwik Trip — Burgers & Sandwiches ────────────────────────────
  rf('seed-kt-cheeseburger',             "Cheeseburger",                            "Kwik Trip", '1 burger',              350, 16, 28, 20, 8,  55,  810, 1, 3),
  rf('seed-kt-angus-cheeseburger',       "Angus Cheeseburger (1/4 lb)",             "Kwik Trip", '1 burger',              590, 32, 38, 36, 16, 110, 1230, 2, 1),
  rf('seed-kt-angus-bacon-cheeseburger', "Angus Bacon Cheeseburger",                "Kwik Trip", '1 burger',              650, 37, 38, 40, 17, 120, 1490, 2, 1),
  rf('seed-kt-crispy-chicken-sandwich',  "Crispy Fried Chicken Sandwich",           "Kwik Trip", '1 sandwich',            350, 20, 48,  9, 2,  60, 1270, 1, 3),
  rf('seed-kt-spicy-chicken-sandwich',   "Spicy Chicken Sandwich with Cheese",      "Kwik Trip", '1 sandwich',            490, 25, 46, 23, 7,  75, 1500, 1, 4),

  // ── Kwik Trip — Pizza (Traditional Crust, 1 slice = 1/6 pie) ───
  rf('seed-kt-pizza-cheese',             "Cheese Pizza (Traditional Slice)",        "Kwik Trip", '1 slice (1/6 pizza)',   330, 16, 38, 13, 7,  35,  790, 2, 4),
  rf('seed-kt-pizza-pepperoni',          "Pepperoni Pizza (Traditional Slice)",     "Kwik Trip", '1 slice (1/6 pizza)',   370, 17, 37, 17, 9,  40,  910, 2, 3),
  rf('seed-kt-pizza-supreme',            "Supreme Pizza (Traditional Slice)",       "Kwik Trip", '1 slice (1/6 pizza)',   350, 16, 38, 15, 7,  40,  920, 3, 3),
  rf('seed-kt-pizza-parmesan',           "Parmesan Pizza (Traditional Slice)",      "Kwik Trip", '1 slice (1/6 pizza)',   330, 17, 38, 13, 6,  40,  800, 3, 3),
  rf('seed-kt-pizza-tailgater',          "Tailgater Pizza — Sausage & Cheese Curd", "Kwik Trip", '1 slice (1/6 pizza)',   430, 21, 38, 22, 11, 55,  970, 3, 4),

  // ── Kwik Trip — Pizza (Thin Crust, 1/3 pie) ─────────────────────
  rf('seed-kt-pizza-thin-sausage',       "Thin Crust Sausage Pizza",                "Kwik Trip", '1/3 pizza',             350, 16, 26, 20, 9,  45,  590, 2, 3),
  rf('seed-kt-pizza-thin-chicken-alfredo',"Thin Crust Chicken Alfredo Pizza",       "Kwik Trip", '1/3 pizza',             290, 15, 22, 16, 7,  40,  570, 1, 1),

  // ── Kwik Trip — Pothole Pizza (deep-dish individual) ────────────
  rf('seed-kt-pothole-pep-rally',        "Pep Rally Pothole Pizza (Pepperoni)",     "Kwik Trip", '1/3 pizza',             430, 23, 31, 26, 13, 65,  960, 3, 3),
  rf('seed-kt-pothole-meat-sweats',      "Meat Sweats Pothole Pizza",               "Kwik Trip", '1/5 pizza',             340, 19, 21, 22, 10, 60,  750, 2, 2),

  // ── Kwik Trip — Breakfast Pizza ──────────────────────────────────
  rf('seed-kt-bkpizza-croissant',        "Croissant Crust Breakfast Pizza (Slice)", "Kwik Trip", '1 slice',               390, 17, 31, 21, 8, 145,  840, 2, 3),

  // ── Kwik Trip — Breakfast Sandwiches & Burritos ──────────────────
  rf('seed-kt-bk-sausage-croissant',     "Sausage, Egg & Cheese Croissant",         "Kwik Trip", '1 sandwich',            460, 16, 28, 31, 13, 140,  850, 1, 4),
  rf('seed-kt-bk-bacon-croissant',       "Bacon, Egg & Cheese Croissant",           "Kwik Trip", '1 sandwich',            340, 16, 28, 19,  8, 115,  820, 1, 4),
  rf('seed-kt-bk-sausage-muffin',        "Sausage, Egg & Cheese English Muffin",    "Kwik Trip", '1 sandwich',            380, 18, 31, 21,  8, 115,  890, 1, 2),
  rf('seed-kt-bk-bacon-muffin',          "Bacon, Egg & Cheese English Muffin",      "Kwik Trip", '1 sandwich',            260, 14, 27, 11,  4,  80,  740, 2, 4),
  rf('seed-kt-bk-sausage-biscuit',       "Sausage, Egg & Cheese Biscuit",           "Kwik Trip", '1 sandwich',            500, 18, 32, 33, 17, 115, 1380, 1, 5),
  rf('seed-kt-bk-burrito',               "Breakfast Burrito",                       "Kwik Trip", '1 burrito',             330, 13, 32, 16,  7, 115,  860, 1, 3),
  rf('seed-kt-bk-sausage-burrito',       "Sausage Breakfast Burrito",               "Kwik Trip", '1 burrito',             330, 13, 32, 17,  6, 130,  850, 1, 3),

  // ── Kwik Trip — Hot Dogs & Roller Grill ─────────────────────────
  rf('seed-kt-hot-dog',                  "Hot Dog (Frank Only)",                    "Kwik Trip", '1 frank',               140,  5,  2, 13,  5,  35,  410, 0, 1),
  rf('seed-kt-angus-frank',              "Angus Beef Frank (Frank Only)",           "Kwik Trip", '1 frank',               340, 14,  5, 29, 13,  65,  980, 0, 1),
  rf('seed-kt-angus-frank-bun',          "Angus Beef Frank with Coney Bun",         "Kwik Trip", '1 hot dog',             480, 18, 28, 32, 14,  65, 1220, 1, 3),
  rf('seed-kt-corn-dog',                 "Corn Dog",                                "Kwik Trip", '1 corn dog',            280, 10, 26, 15,  5,  45,  830, 1, 9),

  // ── Kwik Trip — Tornados ─────────────────────────────────────────
  rf('seed-kt-tornado-french-toast',     "French Toast & Sausage Tornado",          "Kwik Trip", '1 tornado',             190,  6, 22,  9,  2,  30,  290, 0, 1),
  rf('seed-kt-tornado-sausage-egg',      "Sausage, Egg & Cheese Tornado",           "Kwik Trip", '1 tornado',             190,  6, 22,  9,  2,  30,  290, 0, 1),

  // ── Kwik Trip — Other Kitchen Items ─────────────────────────────
  rf('seed-kt-egg-roll',                 "Southwest Egg Roll",                      "Kwik Trip", '1 egg roll',            180,  6, 25,  6,  2,   5,  530, 2, 2),
  rf('seed-kt-mac-cheese',               "Macaroni & Cheese",                       "Kwik Trip", '1 cup',                 240, 10, 17, 15, 10,  40,  600, 0, 2),

  // ── Casey's General Store — Pizza (large 16", 1 slice = 1/12 pie) ──
  rf('seed-caseys-pizza-cheese',         "Cheese Pizza (Large Slice)",              "Casey's", '1 slice (1/12 large)',  244, 10, 32,  9, 5,  22,  385, 1, 3),
  rf('seed-caseys-pizza-pepperoni',      "Pepperoni Pizza (Large Slice)",           "Casey's", '1 slice (1/12 large)',  266, 11, 32, 11, 5,  27,  475, 1, 3),
  rf('seed-caseys-pizza-sausage',        "Mild Sausage Pizza (Large Slice)",        "Casey's", '1 slice (1/12 large)',  295, 13, 33, 13, 6,  34,  554, 1, 3),
  rf('seed-caseys-pizza-beef',           "Beef Pizza (Large Slice)",                "Casey's", '1 slice (1/12 large)',  287, 13, 32, 12, 5,  37,  602, 1, 3),
  rf('seed-caseys-pizza-bacon',          "Bacon Pizza (Large Slice)",               "Casey's", '1 slice (1/12 large)',  293, 14, 33, 13, 5,  33,  532, 1, 3),
  rf('seed-caseys-pizza-canadian-bacon', "Canadian Bacon Pizza (Large Slice)",      "Casey's", '1 slice (1/12 large)',  260, 12, 33, 10, 5,  27,  465, 1, 3),
  rf('seed-caseys-pizza-chicken',        "Chicken Pizza (Large Slice)",             "Casey's", '1 slice (1/12 large)',  280, 15, 33, 11, 5,  36,  547, 1, 3),
  rf('seed-caseys-pizza-veggie',         "Vegetable Pizza (Large Slice)",           "Casey's", '1 slice (1/12 large)',  248,  9, 29,  9, 5,  20,  368, 1, 3),
  rf('seed-caseys-pizza-bbq-beef',       "BBQ Beef Pizza (Large Slice)",            "Casey's", '1 slice (1/12 large)',  284, 12, 37, 11, 6,  30,  527, 1, 6),
  rf('seed-caseys-pizza-buffalo',        "Buffalo Chicken Pizza (Large Slice)",     "Casey's", '1 slice (1/12 large)',  281, 14, 32, 11, 5,  34,  686, 0, 2),
  rf('seed-caseys-pizza-cbr',            "Chicken Bacon Ranch Pizza (Large Slice)", "Casey's", '1 slice (1/12 large)',  336, 16, 33, 16, 6,  45,  680, 1, 4),
  rf('seed-caseys-pizza-taco',           "Taco Pizza (Large Slice)",                "Casey's", '1 slice (1/12 large)',  336, 15, 36, 15, 7,  42,  784, 1, 3),
  rf('seed-caseys-pizza-supreme',        "Supreme Pizza (Large Slice)",             "Casey's", '1 slice (1/12 large)',  313, 15, 34, 14, 8,  47,  839, 2, 4),
  rf('seed-caseys-pizza-meat-galore',    "Meat Galore Pizza (Large Slice)",         "Casey's", '1 slice (1/12 large)',  310, 16, 33, 14, 8,  49,  831, 1, 4),
  rf('seed-caseys-pizza-bcb',            "Bacon Cheeseburger Pizza (Large Slice)",  "Casey's", '1 slice (1/12 large)',  360, 17, 35, 17, 8,  48,  794, 0, 5),

  // ── Casey's Breakfast Pizza (large 16", 1 slice = 1/12 pie) ────
  rf('seed-caseys-bkpizza-bacon',        "Bacon Breakfast Pizza (Large Slice)",     "Casey's", '1 slice (1/12 large)',  270, 14, 23, 14, 7,  85,  630, 1, 2),
  rf('seed-caseys-bkpizza-sausage',      "Sausage Breakfast Pizza (Large Slice)",   "Casey's", '1 slice (1/12 large)',  328, 15, 33, 16, 7,  68,  624, 1, 2),
  rf('seed-caseys-bkpizza-ham',          "Ham Breakfast Pizza (Large Slice)",       "Casey's", '1 slice (1/12 large)',  304, 15, 33, 13, 6,  65,  641, 0, 3),

  // ── Casey's Breakfast Pizza — Warmer Slices (~1/6 large, pre-made) ──
  rf('seed-caseys-bkpizza-sausage-warm', "Sausage Breakfast Pizza (Warmer Slice)",  "Casey's", '1 warmer slice',        540, 26, 45, 29, 13, 165, 1260, 1, 4),
  rf('seed-caseys-bkpizza-bacon-warm',   "Bacon Breakfast Pizza (Warmer Slice)",    "Casey's", '1 warmer slice',        550, 28, 45, 28, 13, 150, 1200, 1, 3),

  // ── Casey's Chicken ─────────────────────────────────────────────
  rf('seed-caseys-chicken-tenders-3',    "Chicken Tenders (3 pc)",                  "Casey's", '3 pieces',              350, 22, 23, 11, 2,  61,  725, 1, 0),
  rf('seed-caseys-chicken-tenders-4',    "Chicken Tenders (4 pc)",                  "Casey's", '4 pieces',              440, 42, 36, 14, 2, 110, 1380, 2, 2),
  rf('seed-caseys-popcorn-chicken',      "Popcorn Chicken",                         "Casey's", '1 serving',             450, 28, 40, 24, 5,  75, 1650, 2, 0),

  // ── Casey's Breadsticks ─────────────────────────────────────────
  rf('seed-caseys-breadsticks',          "Cheese Breadsticks",                      "Casey's", '1 order',               811, 32, 90, 41, 12, 45, 1530, 5, 5),

  // ── Casey's Burgers & Sandwiches ────────────────────────────────
  rf('seed-caseys-hamburger',            "Hamburger",                               "Casey's", '1 burger',              500, 25, 28, 32, 13, 85,  690, 1, 3),
  rf('seed-caseys-cheeseburger',         "Cheeseburger",                            "Casey's", '1 burger',              555, 28, 28, 36, 14, 95,  870, 1, 3),
  rf('seed-caseys-bacon-cheeseburger',   "Bacon Cheeseburger",                      "Casey's", '1 burger',              622, 32, 28, 41, 16, 113, 1223, 1, 3),
  rf('seed-caseys-chicken-fritter',      "Chicken Fritter Sandwich",                "Casey's", '1 sandwich',            580, 25, 65, 20,  5, 60,  900, 2, 3),
  rf('seed-caseys-pork-sandwich',        "Breaded Pork Sandwich",                   "Casey's", '1 sandwich',            630, 30, 88, 18,  4, 70, 1100, 3, 5),
  rf('seed-caseys-pulled-pork',          "Pulled Pork Sandwich",                    "Casey's", '1 sandwich',            399, 19, 39, 17,  5, 60,  900, 1, 8),
  rf('seed-caseys-bbq-beef-sandwich',    "BBQ Beef Sandwich",                       "Casey's", '1 sandwich',            683, 34, 53, 44, 12, 90, 1422, 2, 8),

  // ── Casey's Wings — Plain (per wing) ────────────────────────────
  rf('seed-caseys-wing-boneless-plain',  "Boneless Wing (Plain)",                   "Casey's", '1 wing',                  80,  6,  5,  5, 1,  15,  300, 0, 0),
  rf('seed-caseys-wing-bonein-plain',    "Bone-In Wing (Plain)",                    "Casey's", '1 wing',                 120,  5,  5,  9, 2,  25,  490, 0, 0),

  // ── Casey's Wings — Sauced & Dry Rub (per 5 wings) ──────────────
  rf('seed-caseys-wings-nashville-bl',   "Nashville Hot Boneless Wings",            "Casey's", '5 wings',                430, 28, 24, 25, 5,  70, 1630, 2, 1),
  rf('seed-caseys-wings-nashville-bi',   "Nashville Hot Bone-In Wings",             "Casey's", '5 wings',                620, 48, 46, 26, 5, 120, 2760, 3, 2),
  rf('seed-caseys-wings-lemon-bl',       "Lemon Pepper Boneless Wings",             "Casey's", '5 wings',                430, 28, 24, 25, 5,  70, 1570, 2, 1),
  rf('seed-caseys-wings-lemon-bi',       "Lemon Pepper Bone-In Wings",              "Casey's", '5 wings',                620, 48, 46, 26, 5, 120, 2670, 3, 2),
  rf('seed-caseys-wings-carolina-bl',    "Carolina Reaper Boneless Wings",          "Casey's", '5 wings',                430, 28, 24, 25, 5,  70, 1560, 2, 1),
  rf('seed-caseys-wings-carolina-bi',    "Carolina Reaper Bone-In Wings",           "Casey's", '5 wings',                620, 48, 46, 26, 5, 120, 2720, 3, 2),
  rf('seed-caseys-wings-buffalo-bl',     "Buffalo Boneless Wings",                  "Casey's", '5 wings',                420, 28, 26, 23, 4,  70, 2710, 2, 1),
  rf('seed-caseys-wings-buffalo-bi',     "Buffalo Bone-In Wings",                   "Casey's", '5 wings',                610, 48, 49, 25, 4, 120, 3840, 3, 2),
  rf('seed-caseys-wings-garlic-bl',      "Garlic Parmesan Boneless Wings",          "Casey's", '5 wings',                560, 31, 24, 38, 8,  75, 1650, 2, 1),
  rf('seed-caseys-wings-garlic-bi',      "Garlic Parmesan Bone-In Wings",           "Casey's", '5 wings',                720, 50, 46, 37, 8, 125, 2740, 0, 2),
  rf('seed-caseys-wings-mango-bl',       "Mango Habanero Boneless Wings",           "Casey's", '5 wings',                480, 28, 44, 21, 4,  70, 1710, 2, 22),
  rf('seed-caseys-wings-mango-bi',       "Mango Habanero Bone-In Wings",            "Casey's", '5 wings',                650, 48, 62, 23, 4, 120, 2770, 3, 18),
  rf('seed-caseys-wings-sweetchili-bl',  "Sweet Chili Boneless Wings",              "Casey's", '5 wings',                500, 28, 50, 21, 4,  70, 1930, 2, 25),
  rf('seed-caseys-wings-sweetchili-bi',  "Sweet Chili Bone-In Wings",               "Casey's", '5 wings',                710, 48, 78, 23, 4, 120, 3170, 3, 31),
  rf('seed-caseys-wings-bbq-bl',         "BBQ Boneless Wings",                      "Casey's", '5 wings',                510, 28, 54, 21, 4,  70, 1890, 2, 30),
  rf('seed-caseys-wings-bbq-bi',         "BBQ Bone-In Wings",                       "Casey's", '5 wings',                710, 48, 78, 23, 4, 120, 3040, 3, 32),

  // ── Casey's Breakfast ───────────────────────────────────────────
  rf('seed-caseys-bk-bacon-croissant',   "Bacon, Egg & Cheese Croissant",           "Casey's", '1 sandwich',            375, 14, 29, 23,  9, 90,  793, 0, 2),
  rf('seed-caseys-bk-sausage-croissant', "Sausage, Egg & Cheese Croissant",         "Casey's", '1 sandwich',            520, 17, 29, 39, 12, 110,  900, 0, 2),
  rf('seed-caseys-bk-ham-croissant',     "Ham, Egg & Cheese Croissant",             "Casey's", '1 sandwich',            358, 18, 24, 24,  8, 90,  750, 0, 2),
  rf('seed-caseys-bk-burrito',           "Breakfast Burrito",                       "Casey's", '1 burrito',             330, 14, 35, 16,  6, 80,  883, 2, 2),
  rf('seed-caseys-bk-bowl-sausage',      "Breakfast Bowl (Sausage)",                "Casey's", '1 bowl',                749, 35, 25, 45, 15, 150, 1200, 1, 2),
  rf('seed-caseys-bk-bowl-bacon',        "Breakfast Bowl (Bacon)",                  "Casey's", '1 bowl',                768, 35, 25, 45, 14, 150, 1200, 1, 2),
  rf('seed-caseys-bk-biscuit-gravy',     "Biscuit & Gravy",                         "Casey's", '1 order',               450,  9, 40, 26, 12, 30, 1140, 1, 5),
  rf('seed-caseys-hashbrown',            "Hashbrown",                               "Casey's", '1 order',               140,  2, 17,  7,  2,  0,  200, 1, 0),

  // ── Beer ─────────────────────────────────────────────────────────
  // Anheuser-Busch
  rf('seed-beer-budweiser',              "Budweiser",                    "Anheuser-Busch", '12 fl oz', 145, 1.3, 10.6, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-bud-light',              "Bud Light",                    "Anheuser-Busch", '12 fl oz', 110, 0.9,  6.6, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-bud-light-lime',         "Bud Light Lime",               "Anheuser-Busch", '12 fl oz', 116, 0.9,  8.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-bud-select-55',          "Budweiser Select 55",          "Anheuser-Busch", '12 fl oz',  55, 0.9,  1.9, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-bud-select-99',          "Budweiser Select 99",          "Anheuser-Busch", '12 fl oz',  99, 1.0,  3.1, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-bud-ice',                "Bud Ice",                      "Anheuser-Busch", '12 fl oz', 123, 1.2,  8.9, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-busch',                  "Busch",                        "Anheuser-Busch", '12 fl oz', 133, 0.9, 10.2, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-busch-light',            "Busch Light",                  "Anheuser-Busch", '12 fl oz',  95, 0.7,  3.2, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-busch-ice',              "Busch Ice",                    "Anheuser-Busch", '12 fl oz', 136, 1.0, 10.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-busch-na',               "Busch NA",                     "Anheuser-Busch", '12 fl oz',  64, 0.7, 14.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-natural-light',          "Natural Light",                "Anheuser-Busch", '12 fl oz',  95, 0.7,  3.2, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-natural-ice',            "Natural Ice",                  "Anheuser-Busch", '12 fl oz', 130, 1.1,  8.9, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-michelob-ultra',         "Michelob Ultra",               "Anheuser-Busch", '12 fl oz',  95, 0.6,  2.6, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-michelob-ultra-gold',    "Michelob Ultra Pure Gold",     "Anheuser-Busch", '12 fl oz',  85, 0.5,  2.5, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-stella-artois',          "Stella Artois",                "AB InBev",       '12 fl oz', 154, 1.5, 13.0, 0, 0, 0, 10, 0, 0),
  // Molson Coors
  rf('seed-beer-coors-light',            "Coors Light",                  "Molson Coors",   '12 fl oz', 102, 0.8,  5.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-coors-banquet',          "Coors Banquet",                "Molson Coors",   '12 fl oz', 147, 1.0, 12.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-miller-lite',            "Miller Lite",                  "Molson Coors",   '12 fl oz',  96, 1.0,  3.2, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-miller-high-life',       "Miller High Life",             "Molson Coors",   '12 fl oz', 141, 1.0, 12.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-miller-64',              "Miller 64",                    "Molson Coors",   '12 fl oz',  64, 0.5,  2.4, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-miller-genuine-draft',   "Miller Genuine Draft",         "Molson Coors",   '12 fl oz', 143, 1.0, 13.1, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-blue-moon',              "Blue Moon Belgian White",      "Molson Coors",   '12 fl oz', 168, 2.0, 14.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-keystone-light',         "Keystone Light",               "Molson Coors",   '12 fl oz', 101, 1.0,  4.7, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-icehouse',               "Icehouse",                     "Molson Coors",   '12 fl oz', 149, 0.9,  9.8, 0, 0, 0, 10, 0, 0),
  // Constellation Brands (Corona / Modelo)
  rf('seed-beer-modelo-especial',        "Modelo Especial",              "Modelo",         '12 fl oz', 143, 1.1, 13.6, 0, 0, 0, 20, 0, 0),
  rf('seed-beer-modelo-negra',           "Modelo Negra",                 "Modelo",         '12 fl oz', 172, 1.4, 15.7, 0, 0, 0, 20, 0, 0),
  rf('seed-beer-modelo-oro',             "Modelo Oro",                   "Modelo",         '12 fl oz',  90, 0.7,  3.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-corona-extra',           "Corona Extra",                 "Corona",         '12 fl oz', 148, 1.2, 13.9, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-corona-light',           "Corona Light",                 "Corona",         '12 fl oz',  99, 0.8,  5.0, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-corona-premier',         "Corona Premier",               "Corona",         '12 fl oz',  90, 0.7,  2.6, 0, 0, 0,  5, 0, 0),
  rf('seed-beer-pacifico',               "Pacifico Clara",               "Pacifico",       '12 fl oz', 143, 1.1, 13.6, 0, 0, 0, 10, 0, 0),
  // Heineken group (incl. Dos Equis & Tecate)
  rf('seed-beer-heineken',               "Heineken",                     "Heineken",       '12 fl oz', 148, 1.0,  9.8, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-heineken-light',         "Heineken Light",               "Heineken",       '12 fl oz',  90, 0.7,  6.8, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-heineken-00',            "Heineken 0.0",                 "Heineken",       '12 fl oz',  69, 0.0, 16.0, 0, 0, 0, 15, 0, 0),
  rf('seed-beer-dos-equis-lager',        "Dos Equis Lager Especial",     "Dos Equis",      '12 fl oz', 131, 0.9, 11.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-dos-equis-ambar',        "Dos Equis Ambar",              "Dos Equis",      '12 fl oz', 146, 1.0, 14.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-tecate',                 "Tecate Original",              "Tecate",         '12 fl oz', 142, 1.0, 12.8, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-tecate-light',           "Tecate Light",                 "Tecate",         '12 fl oz', 110, 0.7,  6.5, 0, 0, 0, 10, 0, 0),
  // Boston Beer Company
  rf('seed-beer-sam-adams-lager',        "Samuel Adams Boston Lager",    "Samuel Adams",   '12 fl oz', 175, 2.0, 17.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-sam-adams-summer',       "Samuel Adams Summer Ale",      "Samuel Adams",   '12 fl oz', 165, 1.5, 18.0, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-sam-adams-octoberfest',  "Samuel Adams Octoberfest",     "Samuel Adams",   '12 fl oz', 187, 1.8, 18.5, 0, 0, 0, 10, 0, 0),
  rf('seed-beer-sam-adams-winter',       "Samuel Adams Winter Lager",    "Samuel Adams",   '12 fl oz', 200, 2.0, 20.0, 0, 0, 0, 10, 0, 0),

  // ── Built Puff Protein Bars ──────────────────────────────────────
  rf('seed-built-puff-brownie-batter',    "Built Puff Brownie Batter",      "Built Bar", '1 bar (40g)',  140, 17, 14, 2.5, 2,   0,  90, 1, 6),
  rf('seed-built-puff-churro',            "Built Puff Churro",              "Built Bar", '1 bar (40g)',  140, 17, 14, 2.5, 1.5, 0,  90, 0, 6),
  rf('seed-built-puff-coconut',           "Built Puff Coconut",             "Built Bar", '1 bar (40g)',  140, 17, 13, 3,   2,   0,  85, 0, 6),
  rf('seed-built-puff-salted-caramel',    "Built Puff Salted Caramel",      "Built Bar", '1 bar (40g)',  140, 17, 14, 2.5, 2,   0, 160, 0, 6),
  rf('seed-built-puff-peanut-butter-cup', "Built Puff Peanut Butter Cup",   "Built Bar", '1 bar (40g)',  150, 17, 14, 2.5, 2,   0, 110, 0, 6),
  rf('seed-built-puff-cookies-n-cream',   "Built Puff Cookies 'N Cream",    "Built Bar", '1 bar (40g)',  150, 17, 14, 3,   2,   0,  95, 0, 7),
  rf('seed-built-puff-mint-chip',         "Built Puff Mint Chip",           "Built Bar", '1 bar (40g)',  140, 17, 14, 3,   1.5, 0,  95, 0, 6),
  rf('seed-built-puff-lemon-meringue',    "Built Puff Lemon Meringue Pie",  "Built Bar", '1 bar (40g)',  140, 16, 14, 2.5, 2,   0,  80, 0, 7),
  rf('seed-built-puff-birthday-cake',     "Built Puff Birthday Cake",       "Built Bar", '1 bar (41g)',  150, 16, 15, 3,   2,   5,  90, 0, 9),
  rf('seed-built-puff-banana-cream-pie',  "Built Puff Banana Cream Pie",    "Built Bar", '1 bar (40g)',  140, 17, 14, 2,   2,   0,  90, 0, 7),
  rf('seed-built-puff-strawberries-cream',"Built Puff Strawberries 'N Cream","Built Bar",'1 bar (45g)', 140, 15, 15, 2.5, 2.5, 0,  85, 0, 8),
  rf('seed-built-puff-rocky-road',        "Built Puff Rocky Road",          "Built Bar", '1 bar (40g)',  140, 15, 15, 3,   2,   0,  90, 1, 7),
  rf('seed-built-puff-cookie-dough-chunk',"Built Puff Cookie Dough Chunk",  "Built Bar", '1 bar (44g)',  160, 15, 19, 3.5, 2.5, 0,  95, 1, 8),
  rf('seed-built-puff-smores-chunk',      "Built Puff S'mores Chunk",       "Built Bar", '1 bar (43g)',  160, 15, 18, 3.5, 3,   0, 105, 0, 9),
  rf('seed-built-puff-mint-brownie-chunk',"Built Puff Mint Brownie Chunk",  "Built Bar", '1 bar (43g)',  160, 15, 18, 3.5, 2.5, 0,  95, 1, 8),

  // ── Pepsi Products ──────────────────────────────────────────────
  rf('seed-pepsi-12oz',                    "Pepsi",                         "Pepsi",        '1 can (12 fl oz)',    150, 0, 41, 0, 0, 0,  30, 0, 41, 38),
  rf('seed-pepsi-20oz',                    "Pepsi",                         "Pepsi",        '1 bottle (20 fl oz)', 250, 0, 69, 0, 0, 0,  55, 0, 69, 63),
  rf('seed-pepsi-zero-12oz',               "Pepsi Zero Sugar",              "Pepsi",        '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 38),
  rf('seed-pepsi-zero-20oz',               "Pepsi Zero Sugar",              "Pepsi",        '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  66, 0,  0, 63),
  rf('seed-diet-pepsi-12oz',               "Diet Pepsi",                    "Pepsi",        '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  36, 0,  0, 35),
  rf('seed-diet-pepsi-20oz',               "Diet Pepsi",                    "Pepsi",        '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  60, 0,  0, 58),
  rf('seed-pepsi-wild-cherry-12oz',        "Pepsi Wild Cherry",             "Pepsi",        '1 can (12 fl oz)',    160, 0, 42, 0, 0, 0,  30, 0, 42, 38),
  rf('seed-pepsi-wild-cherry-20oz',        "Pepsi Wild Cherry",             "Pepsi",        '1 bottle (20 fl oz)', 264, 0, 71, 0, 0, 0,  54, 0, 71, 63),
  rf('seed-pepsi-wild-cherry-zero-12oz',   "Pepsi Wild Cherry Zero Sugar",  "Pepsi",        '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0, 38),
  rf('seed-pepsi-wild-cherry-zero-20oz',   "Pepsi Wild Cherry Zero Sugar",  "Pepsi",        '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  58, 0,  0, 63),
  rf('seed-pepsi-cream-soda-12oz',         "Pepsi Cream Soda",              "Pepsi",        '1 can (12 fl oz)',    150, 0, 39, 0, 0, 0,  35, 0, 39, 38),
  rf('seed-pepsi-cream-soda-20oz',         "Pepsi Cream Soda",              "Pepsi",        '1 bottle (20 fl oz)', 250, 0, 65, 0, 0, 0,  55, 0, 65, 63),
  rf('seed-pepsi-cream-soda-zero-12oz',    "Pepsi Cream Soda Zero Sugar",   "Pepsi",        '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0, 38),
  rf('seed-pepsi-cream-soda-zero-20oz',    "Pepsi Cream Soda Zero Sugar",   "Pepsi",        '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  58, 0,  0, 63),

  // ── Mountain Dew ─────────────────────────────────────────────────
  rf('seed-mtn-dew-12oz',                  "Mountain Dew",                  "Mountain Dew", '1 can (12 fl oz)',    170, 0, 46, 0, 0, 0,  65, 0, 46, 54),
  rf('seed-mtn-dew-20oz',                  "Mountain Dew",                  "Mountain Dew", '1 bottle (20 fl oz)', 290, 0, 77, 0, 0, 0,  85, 0, 77, 90),
  rf('seed-mtn-dew-zero-12oz',             "Mountain Dew Zero Sugar",       "Mountain Dew", '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 54),
  rf('seed-mtn-dew-zero-20oz',             "Mountain Dew Zero Sugar",       "Mountain Dew", '1 bottle (20 fl oz)',   5, 0,  0, 0, 0, 0,  85, 0,  0, 90),
  rf('seed-mtn-dew-code-red-12oz',         "Mountain Dew Code Red",         "Mountain Dew", '1 can (12 fl oz)',    170, 0, 46, 0, 0, 0, 105, 0, 46, 54),
  rf('seed-mtn-dew-code-red-20oz',         "Mountain Dew Code Red",         "Mountain Dew", '1 bottle (20 fl oz)', 280, 0, 76, 0, 0, 0,  95, 0, 76, 90),
  rf('seed-mtn-dew-baja-12oz',             "Mountain Dew Baja Blast",       "Mountain Dew", '1 can (12 fl oz)',    170, 0, 44, 0, 0, 0,  55, 0, 44, 54),
  rf('seed-mtn-dew-baja-20oz',             "Mountain Dew Baja Blast",       "Mountain Dew", '1 bottle (20 fl oz)', 280, 0, 74, 0, 0, 0,  95, 0, 73, 90),
  rf('seed-mtn-dew-baja-zero-12oz',        "Mountain Dew Baja Blast Zero",  "Mountain Dew", '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  50, 0,  0, 54),
  rf('seed-mtn-dew-baja-zero-20oz',        "Mountain Dew Baja Blast Zero",  "Mountain Dew", '1 bottle (20 fl oz)',  10, 0,  0, 0, 0, 0,  83, 0,  0, 90),

  // ── Coca-Cola Products ───────────────────────────────────────────
  rf('seed-coca-cola-12oz',                "Coca-Cola",                     "Coca-Cola",    '1 can (12 fl oz)',    140, 0, 39, 0, 0, 0,  45, 0, 39, 34),
  rf('seed-coca-cola-20oz',                "Coca-Cola",                     "Coca-Cola",    '1 bottle (20 fl oz)', 240, 0, 65, 0, 0, 0,  72, 0, 65, 57),
  rf('seed-diet-coke-12oz',                "Diet Coke",                     "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 46),
  rf('seed-diet-coke-20oz',                "Diet Coke",                     "Coca-Cola",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  70, 0,  0, 77),
  rf('seed-coke-zero-12oz',                "Coca-Cola Zero Sugar",          "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 34),
  rf('seed-coke-zero-20oz',                "Coca-Cola Zero Sugar",          "Coca-Cola",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  70, 0,  0, 57),
  rf('seed-sprite-12oz',                   "Sprite",                        "Sprite",       '1 can (12 fl oz)',    140, 0, 38, 0, 0, 0,  65, 0, 38,  0),
  rf('seed-sprite-20oz',                   "Sprite",                        "Sprite",       '1 bottle (20 fl oz)', 240, 0, 64, 0, 0, 0, 110, 0, 64,  0),
  rf('seed-sprite-zero-12oz',              "Sprite Zero Sugar",             "Sprite",       '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0,  0),
  rf('seed-sprite-zero-20oz',              "Sprite Zero Sugar",             "Sprite",       '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  58, 0,  0,  0),
  rf('seed-fanta-orange-12oz',             "Fanta Orange",                  "Fanta",        '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  55, 0, 44,  0),
  rf('seed-fanta-orange-20oz',             "Fanta Orange",                  "Fanta",        '1 bottle (20 fl oz)', 270, 0, 75, 0, 0, 0,  96, 0, 73,  0),
  rf('seed-barqs-12oz',                    "Barq's Root Beer",              "Barq's",       '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  65, 0, 44, 22),
  rf('seed-barqs-20oz',                    "Barq's Root Beer",              "Barq's",       '1 bottle (20 fl oz)', 270, 0, 74, 0, 0, 0, 108, 0, 74, 37),

  // ── Dr Pepper ────────────────────────────────────────────────────
  rf('seed-dr-pepper-12oz',                "Dr Pepper",                     "Dr Pepper",    '1 can (12 fl oz)',    150, 0, 40, 0, 0, 0,  45, 0, 39, 41),
  rf('seed-dr-pepper-20oz',                "Dr Pepper",                     "Dr Pepper",    '1 bottle (20 fl oz)', 240, 0, 66, 0, 0, 0,  95, 0, 65, 68),
  rf('seed-dr-pepper-zero-12oz',           "Dr Pepper Zero Sugar",          "Dr Pepper",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  60, 0,  0, 41),
  rf('seed-dr-pepper-zero-20oz',           "Dr Pepper Zero Sugar",          "Dr Pepper",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 100, 0,  0, 68),

  // ── A&W Root Beer ────────────────────────────────────────────────
  rf('seed-aw-12oz',                       "A&W Root Beer",                 "A&W",          '1 can (12 fl oz)',    150, 0, 41, 0, 0, 0,  40, 0, 41,  0),
  rf('seed-aw-20oz',                       "A&W Root Beer",                 "A&W",          '1 bottle (20 fl oz)', 274, 0, 74, 0, 0, 0,  67, 0, 74,  0),
  rf('seed-aw-zero-12oz',                  "A&W Root Beer Zero Sugar",      "A&W",          '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0, 115, 0,  0,  0),
  rf('seed-aw-zero-20oz',                  "A&W Root Beer Zero Sugar",      "A&W",          '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 190, 0,  0,  0),

  // ── 7UP ──────────────────────────────────────────────────────────
  rf('seed-7up-12oz',                      "7UP",                           "7UP",          '1 can (12 fl oz)',    140, 0, 39, 0, 0, 0,  40, 0, 38,  0),
  rf('seed-7up-20oz',                      "7UP",                           "7UP",          '1 bottle (20 fl oz)', 240, 0, 64, 0, 0, 0,  70, 0, 63,  0),
  rf('seed-7up-zero-12oz',                 "7UP Zero Sugar",                "7UP",          '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  45, 0,  0,  0),
  rf('seed-7up-zero-20oz',                 "7UP Zero Sugar",                "7UP",          '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  75, 0,  0,  0),

  // ── Starry ───────────────────────────────────────────────────────
  rf('seed-starry-12oz',                   "Starry",                        "Starry",       '1 can (12 fl oz)',    150, 0, 40, 0, 0, 0,  35, 0, 39,  0),
  rf('seed-starry-20oz',                   "Starry",                        "Starry",       '1 bottle (20 fl oz)', 240, 0, 65, 0, 0, 0,  55, 0, 65,  0),
  rf('seed-starry-zero-12oz',              "Starry Zero Sugar",             "Starry",       '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0,  0),
  rf('seed-starry-zero-20oz',              "Starry Zero Sugar",             "Starry",       '1 bottle (20 fl oz)',  10, 0,  0, 0, 0, 0,  60, 0,  0,  0),

  // ── Vitamin Water (20 fl oz bottle = 2.5 servings) ─────────────
  rf('seed-vw-xxx',               "Vitamin Water XXX (Açaí-Blueberry-Pomegranate)", "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-focus',             "Vitamin Water Focus (Kiwi-Strawberry)",          "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-power-c',           "Vitamin Water Power-C (Dragonfruit)",            "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-revive',            "Vitamin Water Revive (Fruit Punch)",             "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-energy',            "Vitamin Water Energy (Tropical Citrus)",         "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33, 50),
  rf('seed-vw-squeezed',          "Vitamin Water Squeezed (Lemonade)",              "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-refresh',           "Vitamin Water Refresh (Tropical Mango)",         "vitaminwater", '1 bottle (20 fl oz)', 125, 0, 33, 0, 0, 0,   0, 0, 33),
  rf('seed-vw-zero-xxx',          "Vitamin Water Zero XXX",                         "vitaminwater", '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,   0, 0,  0),
  rf('seed-vw-zero-rise',         "Vitamin Water Zero Rise (Orange)",               "vitaminwater", '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,   0, 0,  0, 80),

  // ── Pedialyte (8 fl oz serving) ────────────────────────────────
  rf('seed-ped-classic-unflavored',"Pedialyte Classic (Unflavored)",               "Pedialyte",    '8 fl oz',  25, 0, 6, 0, 0, 0, 240, 0, 6),
  rf('seed-ped-classic-grape',    "Pedialyte Classic (Grape)",                     "Pedialyte",    '8 fl oz',  25, 0, 6, 0, 0, 0, 240, 0, 6),
  rf('seed-ped-classic-cherry',   "Pedialyte Classic (Cherry)",                    "Pedialyte",    '8 fl oz',  25, 0, 6, 0, 0, 0, 240, 0, 6),
  rf('seed-ped-classic-strawberry',"Pedialyte Classic (Strawberry)",               "Pedialyte",    '8 fl oz',  25, 0, 6, 0, 0, 0, 240, 0, 6),
  rf('seed-ped-sport-orange',     "Pedialyte Sport (Orange Burst)",                "Pedialyte",    '8 fl oz',  35, 0, 9, 0, 0, 0, 490, 0, 9),
  rf('seed-ped-sport-glacier',    "Pedialyte Sport (Glacier Freeze)",              "Pedialyte",    '8 fl oz',  35, 0, 9, 0, 0, 0, 490, 0, 9),

  // ── Jolly Rancher ──────────────────────────────────────────────
  rf('seed-jr-hard-candy',            "Hard Candy (Original)",               "Jolly Rancher",  '2 pieces',          45, 0, 11, 0, 0, 0,   0, 0,  8),
  rf('seed-jr-hard-candy-sf',         "Hard Candy Sugar Free",               "Jolly Rancher",  '4 pieces (16g)',    35, 0,  9, 0, 0, 0,  10, 0,  0),
  rf('seed-jr-hard-candy-sour',       "Sour Hard Candy",                     "Jolly Rancher",  '4 pieces (16g)',    60, 0, 15, 0, 0, 0,  10, 0, 10),
  rf('seed-jr-hard-candy-cinnamon',   "Cinnamon Fire Hard Candy",            "Jolly Rancher",  '3 pieces (18g)',    70, 0, 17, 0, 0, 0,  10, 0, 11),
  rf('seed-jr-gummies',               "Original Gummies",                    "Jolly Rancher",  '9 pieces (39g)',   120, 2, 28, 0, 0, 0,  25, 0, 19),
  rf('seed-jr-sour-gummies',          "Sour Gummies",                        "Jolly Rancher",  '9 pieces (32g)',   110, 0, 27, 0, 0, 0,  20, 0, 18),
  rf('seed-jr-chews',                 "Awesome Twosome Chews",               "Jolly Rancher",  '13 pieces (39g)', 140, 2, 29, 2, 1, 0,  40, 0, 19),
  rf('seed-jr-lollipop',              "Lollipop",                            "Jolly Rancher",  '1 pop (17g)',       60, 0, 15, 0, 0, 0,   0, 0, 10),
  rf('seed-jr-jelly-beans',           "Jelly Beans",                         "Jolly Rancher",  '30 pieces (40g)',  100, 0, 26, 0, 0, 0,  10, 0, 18),
];

export async function seedFoods() {
  for (const food of SEEDED_FOODS) {
    const existing = await db.customFoods.get(food.id);
    if (!existing) await db.customFoods.put(food);
  }
}
