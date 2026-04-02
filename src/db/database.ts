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
  const cutoffStr = cutoff.toLocaleDateString('en-CA');
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

  // ── McDonald's – Burgers & Sandwiches ──────────────────────────
  rf('seed-mcd-big-mac',              "Big Mac",                             "McDonald's",    '1 burger',   590,  25, 46, 34, 11,  85, 1050, 3,  9),
  rf('seed-mcd-qpc',                  "Quarter Pounder with Cheese",         "McDonald's",    '1 burger',   520,  30, 42, 26, 12,  95, 1140, 2, 10),
  rf('seed-mcd-dqpc',                 "Double Quarter Pounder with Cheese",  "McDonald's",    '1 burger',   740,  49, 43, 42, 19, 175, 1360, 2, 10),
  rf('seed-mcd-tqpc',                 "Triple Quarter Pounder with Cheese",  "McDonald's",    '1 burger',   990,  67, 44, 60, 26, 265, 1590, 2, 10),
  rf('seed-mcd-mcdouble',             "McDouble",                            "McDonald's",    '1 burger',   400,  22, 36, 18,  8,  70,  840, 2,  7),
  rf('seed-mcd-double-cheeseburger',  "Double Cheeseburger",                 "McDonald's",    '1 burger',   450,  25, 35, 24, 11,  80,  1050, 2,  8),
  rf('seed-mcd-cheeseburger',         "Cheeseburger",                        "McDonald's",    '1 burger',   300,  15, 33, 13,  6,  45,  680, 2,  6),
  rf('seed-mcd-hamburger',            "Hamburger",                           "McDonald's",    '1 burger',   250,  12, 32,  9,  4,  35,  520, 1,  6),
  rf('seed-mcd-big-mac-double',       "Double Big Mac",                      "McDonald's",    '1 burger',   740,  45, 47, 42, 16, 140, 1290, 3,  9),
  rf('seed-mcd-mcrib',                "McRib",                               "McDonald's",    '1 sandwich', 520,  26, 45, 26, 10,  70, 1040, 3, 11),
  rf('seed-mcd-filet-o-fish',         "Filet-O-Fish",                        "McDonald's",    '1 sandwich', 390,  17, 38, 19,  4,  40,  580, 1,  5),
  rf('seed-mcd-mcchicken',            "McChicken",                           "McDonald's",    '1 sandwich', 400,  14, 39, 21,  4,  45,  560, 2,  5),
  rf('seed-mcd-deluxe-mccrispy',      "Deluxe McCrispy Chicken Sandwich",    "McDonald's",    '1 sandwich', 530,  27, 52, 25,  4,  65, 1200, 2,  7),
  rf('seed-mcd-spicy-mccrispy',       "Spicy McCrispy Chicken Sandwich",     "McDonald's",    '1 sandwich', 530,  27, 52, 25,  4,  65, 1290, 2,  7),
  rf('seed-mcd-mccrispy',             "McCrispy Chicken Sandwich",           "McDonald's",    '1 sandwich', 470,  26, 46, 21,  4,  65,  980, 2,  6),
  rf('seed-mcd-dbl-mccrispy',         "Double McCrispy Chicken Sandwich",    "McDonald's",    '1 sandwich', 720,  47, 53, 38,  8, 120, 1530, 2,  7),
  rf('seed-mcd-grilled-chkn-sndwch',  "Grilled Chicken Sandwich",            "McDonald's",    '1 sandwich', 390,  37, 44,  9,  2,  75, 1040, 3,  8),
  rf('seed-mcd-jr-chicken',           "Junior Chicken",                      "McDonald's",    '1 sandwich', 280,  12, 32, 11,  2,  25,  540, 1,  3),

  // ── McDonald's – Chicken & Fish ─────────────────────────────────
  rf('seed-mcd-nuggets-4pc',          "Chicken McNuggets (4 pc)",            "McDonald's",    '4 pieces',   170,   9, 10, 10,  2,  25,  340, 0,  0),
  rf('seed-mcd-nuggets-6pc',          "Chicken McNuggets (6 pc)",            "McDonald's",    '6 pieces',   250,  13, 15, 15,  3,  40,  510, 1,  0),
  rf('seed-mcd-nuggets-10pc',         "Chicken McNuggets (10 pc)",           "McDonald's",    '10 pieces',  420,  22, 27, 25,  4,  65,  840, 1,  0),
  rf('seed-mcd-nuggets-20pc',         "Chicken McNuggets (20 pc)",           "McDonald's",    '20 pieces',  830,  44, 52, 49,  8, 130, 1680, 2,  0),
  rf('seed-mcd-mcnuggets-40pc',       "Chicken McNuggets (40 pc)",           "McDonald's",    '40 pieces', 1660,  88,104, 98, 16, 260, 3360, 4,  0),
  rf('seed-mcd-crispy-chkn-tenders',  "Crispy Chicken Tenders (3 pc)",       "McDonald's",    '3 pieces',   360,  24, 30, 16,  3,  60,  850, 1,  1),
  rf('seed-mcd-crispy-chkn-tenders5', "Crispy Chicken Tenders (5 pc)",       "McDonald's",    '5 pieces',   600,  40, 50, 26,  5, 100, 1420, 2,  2),

  // ── McDonald's – Breakfast ──────────────────────────────────────
  rf('seed-mcd-egg-mcmuffin',         "Egg McMuffin",                        "McDonald's",    '1 sandwich', 310,  17, 30, 13,  5, 250,  760, 2,  3),
  rf('seed-mcd-sausage-mcmuffin',     "Sausage McMuffin",                    "McDonald's",    '1 sandwich', 400,  16, 29, 25,  9,  45,  790, 1,  3),
  rf('seed-mcd-sausage-mcmuffin-egg', "Sausage McMuffin with Egg",           "McDonald's",    '1 sandwich', 480,  21, 30, 31, 10, 255,  920, 1,  3),
  rf('seed-mcd-sausage-biscuit',      "Sausage Biscuit",                     "McDonald's",    '1 sandwich', 460,  14, 36, 30, 11,  40, 1050, 1,  3),
  rf('seed-mcd-sausage-biscuit-egg',  "Sausage Biscuit with Egg",            "McDonald's",    '1 sandwich', 530,  18, 37, 35, 12, 250, 1170, 1,  3),
  rf('seed-mcd-bacon-egg-chz-biscuit',"Bacon, Egg & Cheese Biscuit",         "McDonald's",    '1 sandwich', 460,  20, 38, 26,  9, 255, 1340, 1,  4),
  rf('seed-mcd-bacon-egg-chz-mcmuff', "Bacon, Egg & Cheese McMuffin",        "McDonald's",    '1 sandwich', 310,  17, 28, 15,  6, 245,  950, 2,  3),
  rf('seed-mcd-hotcakes',             "Hotcakes (3 pc)",                     "McDonald's",    '3 pancakes', 580,  13,102, 15,  4,  30,  750, 3, 45),
  rf('seed-mcd-hotcakes-sausage',     "Hotcakes and Sausage",                "McDonald's",    '1 order',    780,  22,103, 33, 11,  65, 1040, 3, 45),
  rf('seed-mcd-big-breakfast',        "Big Breakfast",                       "McDonald's",    '1 order',    760,  28, 51, 48, 16, 520, 1480, 2,  4),
  rf('seed-mcd-big-bkfst-hotcakes',   "Big Breakfast with Hotcakes",         "McDonald's",    '1 order',   1340,  36,155, 60, 19, 545, 1960, 5, 48),
  rf('seed-mcd-hashbrown',            "Hash Browns",                         "McDonald's",    '1 piece',    150,   1, 15,  9,  1,   0,  310, 1,  0),
  rf('seed-mcd-sausage-burrito',      "Sausage Burrito",                     "McDonald's",    '1 burrito',  310,  13, 26, 17,  6, 120,  810, 1,  2),
  rf('seed-mcd-fruit-maple-oatmeal',  "Fruit & Maple Oatmeal",               "McDonald's",    '1 bowl',     320,   6, 64,  4,  1,   5,  150, 4, 32),
  rf('seed-mcd-fruit-maple-oatmeal-nc',"Fruit & Maple Oatmeal (no cream)",   "McDonald's",    '1 bowl',     290,   6, 62,  3,  0,   0,  105, 4, 29),
  rf('seed-mcd-mcgriddles-saus-egg',  "Sausage, Egg & Cheese McGriddles",    "McDonald's",    '1 sandwich', 550,  20, 48, 30, 10, 255, 1290, 1, 17),
  rf('seed-mcd-mcgriddles-saus',      "Sausage McGriddles",                  "McDonald's",    '1 sandwich', 430,  14, 45, 22,  8,  35,  920, 1, 17),
  rf('seed-mcd-mcgriddles-bac-egg',   "Bacon, Egg & Cheese McGriddles",      "McDonald's",    '1 sandwich', 430,  18, 44, 20,  6, 250, 1140, 1, 16),
  rf('seed-mcd-steak-egg-cheese-biscuit',"Steak, Egg & Cheese Biscuit",      "McDonald's",    '1 sandwich', 500,  26, 39, 27, 10, 265, 1480, 1,  3),

  // ── McDonald's – Sides ──────────────────────────────────────────
  rf('seed-mcd-sm-fries',             "Small Fries",                         "McDonald's",    '1 small',    230,   3, 30, 11,  2,   0,  190, 3,  0),
  rf('seed-mcd-med-fries',            "Medium Fries",                        "McDonald's",    '1 medium',   320,   4, 43, 15,  2,   0,  270, 4,  0),
  rf('seed-mcd-large-fries',          "Large Fries",                         "McDonald's",    '1 large',    480,   7, 66, 22,  3,   0,  400, 6,  0),
  rf('seed-mcd-side-salad',           "Side Salad",                          "McDonald's",    '1 salad',     15,   1,  2,  0,  0,   0,   10, 1,  1),
  rf('seed-mcd-apple-slices',         "Apple Slices",                        "McDonald's",    '1 bag',       15,   0,  4,  0,  0,   0,    0, 0,  3),
  rf('seed-mcd-southwest-salad',      "Southwest Grilled Chicken Salad",     "McDonald's",    '1 salad',    350,  37, 27, 12,  4,  90,  840, 6,  9),
  rf('seed-mcd-grilled-chkn-salad',   "Grilled Chicken Salad",               "McDonald's",    '1 salad',    320,  37, 25, 10,  4,  90,  730, 5,  8),

  // ── McDonald's – McCafé Beverages ───────────────────────────────
  rf('seed-mcd-sm-coffee',            "Small Coffee (black)",                "McDonald's",    '12 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-med-coffee',           "Medium Coffee (black)",               "McDonald's",    '16 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-lg-coffee',            "Large Coffee (black)",                "McDonald's",    '21 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-sm-latte',             "Small Latte",                         "McDonald's",    '12 fl oz',   120,   7, 11,  5,  3,  20,   75, 0, 10),
  rf('seed-mcd-med-latte',            "Medium Latte",                        "McDonald's",    '16 fl oz',   170,  10, 15,  7,  4,  30,  105, 0, 13),
  rf('seed-mcd-lg-latte',             "Large Latte",                         "McDonald's",    '21 fl oz',   220,  13, 19,  9,  5,  35,  130, 0, 17),
  rf('seed-mcd-sm-caramel-latte',     "Small Caramel Latte",                 "McDonald's",    '12 fl oz',   200,   7, 30,  7,  4,  20,  100, 0, 25),
  rf('seed-mcd-med-caramel-latte',    "Medium Caramel Latte",                "McDonald's",    '16 fl oz',   270,  10, 42,  9,  5,  30,  140, 0, 35),
  rf('seed-mcd-lg-caramel-latte',     "Large Caramel Latte",                 "McDonald's",    '21 fl oz',   350,  13, 55, 11,  6,  35,  170, 0, 45),
  rf('seed-mcd-sm-cappuccino',        "Small Cappuccino",                    "McDonald's",    '12 fl oz',    80,   4,  9,  3,  2,  10,   50, 0,  8),
  rf('seed-mcd-med-cappuccino',       "Medium Cappuccino",                   "McDonald's",    '16 fl oz',   110,   6, 12,  4,  2,  15,   70, 0, 11),
  rf('seed-mcd-sm-americano',         "Small Americano",                     "McDonald's",    '12 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-med-americano',        "Medium Americano",                    "McDonald's",    '16 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-sm-iced-coffee',       "Small Iced Coffee",                   "McDonald's",    '16 fl oz',   140,   1, 23,  5,  3,  10,   20, 0, 22),
  rf('seed-mcd-med-iced-coffee',      "Medium Iced Coffee",                  "McDonald's",    '22 fl oz',   190,   1, 32,  7,  4,  15,   25, 0, 30),
  rf('seed-mcd-lg-iced-coffee',       "Large Iced Coffee",                   "McDonald's",    '32 fl oz',   280,   2, 48, 10,  6,  20,   40, 0, 44),
  rf('seed-mcd-sm-frappe-mocha',      "Small Mocha Frappé",                  "McDonald's",    '12 fl oz',   450,   7, 62, 20, 13,  55,  150, 1, 55),
  rf('seed-mcd-med-frappe-mocha',     "Medium Mocha Frappé",                 "McDonald's",    '16 fl oz',   560,   9, 79, 24, 16,  65,  190, 1, 70),
  rf('seed-mcd-sm-frappe-caramel',    "Small Caramel Frappé",                "McDonald's",    '12 fl oz',   430,   7, 62, 18, 12,  55,  150, 0, 58),
  rf('seed-mcd-med-frappe-caramel',   "Medium Caramel Frappé",               "McDonald's",    '16 fl oz',   550,   9, 80, 22, 15,  65,  190, 0, 74),
  rf('seed-mcd-sm-hot-chocolate',     "Small Hot Chocolate",                 "McDonald's",    '12 fl oz',   290,   9, 44, 10,  6,  25,  170, 2, 40),
  rf('seed-mcd-med-hot-chocolate',    "Medium Hot Chocolate",                "McDonald's",    '16 fl oz',   370,  11, 57, 12,  7,  30,  215, 2, 52),

  // ── McDonald's – Shakes & Frozen ────────────────────────────────
  rf('seed-mcd-sm-vanilla-shake',     "Small Vanilla Shake",                 "McDonald's",    '12 fl oz',   530,  12, 78, 20, 13,  75,  220, 0, 63),
  rf('seed-mcd-med-vanilla-shake',    "Medium Vanilla Shake",                "McDonald's",    '16 fl oz',   650,  15, 96, 24, 16,  95,  270, 0, 78),
  rf('seed-mcd-lg-vanilla-shake',     "Large Vanilla Shake",                 "McDonald's",    '22 fl oz',   840,  19,124, 32, 20, 120,  350, 0,101),
  rf('seed-mcd-sm-choc-shake',        "Small Chocolate Shake",               "McDonald's",    '12 fl oz',   530,  12, 78, 20, 13,  75,  250, 1, 63),
  rf('seed-mcd-med-choc-shake',       "Medium Chocolate Shake",              "McDonald's",    '16 fl oz',   650,  15, 96, 24, 16,  95,  300, 1, 78),
  rf('seed-mcd-sm-strawberry-shake',  "Small Strawberry Shake",              "McDonald's",    '12 fl oz',   530,  12, 79, 20, 13,  75,  220, 0, 65),
  rf('seed-mcd-med-strawberry-shake', "Medium Strawberry Shake",             "McDonald's",    '16 fl oz',   650,  15, 98, 24, 16,  95,  270, 0, 81),
  rf('seed-mcd-mcflurry-oreo',        "McFlurry with OREO",                  "McDonald's",    '1 regular',  510,  10, 79, 17, 10,  40,  280, 1, 59),
  rf('seed-mcd-mcflurry-m-and-ms',    "McFlurry with M&M's",                 "McDonald's",    '1 regular',  640,  13, 96, 22, 13,  45,  220, 1, 79),
  rf('seed-mcd-sm-mcflurry-oreo',     "Snack Size McFlurry with OREO",       "McDonald's",    '1 snack',    330,   7, 51, 11,  7,  30,  190, 0, 38),
  rf('seed-mcd-soft-serve-cone',      "Vanilla Soft Serve Cone",             "McDonald's",    '1 cone',     200,   5, 30,  6,  4,  20,   95, 0, 24),
  rf('seed-mcd-sundae-hot-fudge',     "Hot Fudge Sundae",                    "McDonald's",    '1 sundae',   330,   8, 53, 10,  7,  25,  160, 1, 40),
  rf('seed-mcd-sundae-caramel',       "Caramel Sundae",                      "McDonald's",    '1 sundae',   340,   7, 61,  8,  5,  25,  150, 0, 44),
  rf('seed-mcd-mcfreeze-coke',        "McFreeze Coca-Cola",                  "McDonald's",    '22 fl oz',   200,   0, 55,  0,  0,   0,   45, 0, 55),

  // ── McDonald's – Fountain Drinks (medium 21oz) ──────────────────
  rf('seed-mcd-med-coke',             "Coca-Cola (Medium)",                  "McDonald's",    '21 fl oz',   210,   0, 58,  0,  0,   0,   20, 0, 58),
  rf('seed-mcd-med-diet-coke',        "Diet Coke (Medium)",                  "McDonald's",    '21 fl oz',     0,   0,  0,  0,  0,   0,   40, 0,  0),
  rf('seed-mcd-med-sprite',           "Sprite (Medium)",                     "McDonald's",    '21 fl oz',   200,   0, 54,  0,  0,   0,   55, 0, 54),
  rf('seed-mcd-med-dr-pepper',        "Dr Pepper (Medium)",                  "McDonald's",    '21 fl oz',   200,   0, 54,  0,  0,   0,   75, 0, 54),
  rf('seed-mcd-med-hi-c-punch',       "Hi-C Orange Lavaburst (Medium)",      "McDonald's",    '21 fl oz',   170,   0, 44,  0,  0,   0,   50, 0, 44),
  rf('seed-mcd-med-sweet-tea',        "Sweet Tea (Medium)",                  "McDonald's",    '21 fl oz',   160,   0, 40,  0,  0,   0,   10, 0, 40),
  rf('seed-mcd-sm-oj',                "Orange Juice (Small)",                "McDonald's",    '12 fl oz',   140,   2, 33,  0,  0,   0,   20, 0, 28),
  rf('seed-mcd-1pct-milk-jug',        "1% Low Fat Milk (8 oz)",              "McDonald's",    '8 fl oz',    100,   8, 13,  2,  2,  10,  125, 0, 12),
  rf('seed-mcd-choc-milk-jug',        "Chocolate Milk (8 oz)",               "McDonald's",    '8 fl oz',    140,   8, 22,  2,  1,  10,  130, 0, 21),

  // ── McDonald's – Desserts & Bakery ──────────────────────────────
  rf('seed-mcd-apple-pie',            "Baked Apple Pie",                     "McDonald's",    '1 pie',      250,   3, 33, 13,  6,   0,  170, 1, 13),
  rf('seed-mcd-choc-chip-cookie',     "Chocolate Chip Cookie",               "McDonald's",    '1 cookie',   170,   2, 22,  9,  5,  15,  115, 1, 14),
  rf('seed-mcd-sugar-cookie',         "Sugar Cookie",                        "McDonald's",    '1 cookie',   190,   2, 25, 10,  5,  20,  120, 0, 15),
  rf('seed-mcd-cinnamon-roll',        "Warm Cinnamon Roll",                  "McDonald's",    '1 roll',     390,   5, 55, 17,  6,  25,  320, 1, 27),
  rf('seed-mcd-blueberry-muffin',     "Blueberry Muffin",                    "McDonald's",    '1 muffin',   430,   5, 57, 20,  5,  55,  360, 1, 29),
  rf('seed-mcd-chocolate-muffin',     "Double Chocolate Muffin",             "McDonald's",    '1 muffin',   450,   6, 61, 21,  6,  50,  340, 3, 34),

  // ── McDonald's – Condiments & Sauces ────────────────────────────
  rf('seed-mcd-sauce-barbeque',       "Barbeque Sauce",                      "McDonald's",    '1 packet',    45,   0, 10,  0,  0,   0,  260, 0,  9),
  rf('seed-mcd-sauce-honey-mustard',  "Honey Mustard Sauce",                 "McDonald's",    '1 packet',    60,   0,  9,  2,  0,   5,  170, 0,  8),
  rf('seed-mcd-sauce-ranch',          "Ranch Sauce",                         "McDonald's",    '1 packet',   110,   0,  2, 11,  2,  10,  210, 0,  1),
  rf('seed-mcd-sauce-buffalo',        "Spicy Buffalo Sauce",                 "McDonald's",    '1 packet',    30,   0,  2,  2,  0,   0,  800, 0,  0),
  rf('seed-mcd-sauce-sw-dipping',     "Sweet 'N Sour Sauce",                 "McDonald's",    '1 packet',    50,   0, 11,  0,  0,   0,  150, 0, 10),
  rf('seed-mcd-sauce-sriracha',       "Sriracha Mac Sauce",                  "McDonald's",    '1 packet',    50,   0,  4,  4,  1,  10,  135, 0,  2),
  rf('seed-mcd-sauce-honey',          "Honey",                               "McDonald's",    '1 packet',    50,   0, 12,  0,  0,   0,    0, 0, 12),
  rf('seed-mcd-ketchup-packet',       "Ketchup",                             "McDonald's",    '1 packet',    10,   0,  3,  0,  0,   0,  110, 0,  2),

  // ── Charlotte's Kitchen (Des Moines, IA) ───────────────────────
  // NOTE: Charlotte's Kitchen does not publish official nutrition data.
  // These values are estimates based on comparable fried chicken restaurants
  // and known ingredients. Treat as approximations, not exact figures.
  rf('seed-ck-nashville-hot-sndwch',  "Nashville Hot Chicken Sandwich",      "Charlotte's Kitchen", '1 sandwich', 720,  38, 54, 36,  8, 110, 1480, 2,  6),
  rf('seed-ck-crab-rangoon-sndwch',   "Crab Rangoon Chicken Sandwich",       "Charlotte's Kitchen", '1 sandwich', 790,  37, 71, 37, 11, 125, 1320, 2, 20),
  rf('seed-ck-original-sndwch',       "Original Chicken Sandwich",           "Charlotte's Kitchen", '1 sandwich', 620,  34, 52, 30,  7, 100, 1180, 2,  7),
  rf('seed-ck-char-fries',            "Char Fries",                          "Charlotte's Kitchen", '1 order',    500,   6, 65, 24,  3,   0,  820, 5,  4),
  rf('seed-ck-tenders-3pc',           "Chicken Tenders (3 pc)",              "Charlotte's Kitchen", '3 pieces',   380,  30, 24, 18,  4,  85,  920, 1,  1),
  rf('seed-ck-tenders-4pc',           "Chicken Tenders (4 pc)",              "Charlotte's Kitchen", '4 pieces',   500,  40, 32, 24,  5, 115, 1220, 1,  1),
  rf('seed-ck-chars-bowl',            "Char's Bowl",                         "Charlotte's Kitchen", '1 bowl',     890,  44, 82, 42,  9, 115, 1950, 6, 10),
  rf('seed-ck-shake-vanilla',         "Vanilla Milkshake",                   "Charlotte's Kitchen", '1 shake',    580,  11, 82, 23, 14,  80,  230, 0, 72),
  rf('seed-ck-shake-chocolate',       "Chocolate Milkshake",                 "Charlotte's Kitchen", '1 shake',    620,  12, 88, 24, 15,  80,  250, 1, 78),
  rf('seed-ck-shake-strawberry',      "Strawberry Milkshake",                "Charlotte's Kitchen", '1 shake',    560,  10, 80, 22, 13,  75,  210, 0, 70),

  // ── B-Bop's Burgers (Iowa chain – official data from b-bops.com) ──────────
  rf('seed-bbops-qtr-hamburger',      "1/4 lb Hamburger",                    "B-Bop's",       '1 burger',   569,  29, 54, 32, 11,  77,  543, 3, 12),
  rf('seed-bbops-qtr-cheeseburger',   "1/4 lb Cheeseburger",                 "B-Bop's",       '1 burger',   640,  29, 44, 40, 11, 110, 1090, 3, 13),
  rf('seed-bbops-half-hamburger',     "1/2 lb Hamburger",                    "B-Bop's",       '1 burger',   900,  46, 43, 61, 21, 175,  810, 4, 12),
  rf('seed-bbops-half-cheeseburger',  "1/2 lb Cheeseburger",                 "B-Bop's",       '1 burger',  1040,  52, 45, 73, 21, 215, 1490, 4, 14),
  rf('seed-bbops-charbroiled-chkn',   "Charbroiled Chicken Sandwich",        "B-Bop's",       '1 sandwich', 360,  33, 41,  9,  2,  85,  860, 2,  8),
  rf('seed-bbops-spicy-chkn',         "Spicy Chicken Sandwich",              "B-Bop's",       '1 sandwich', 440,  24, 56, 13,  2,  55, 1270, 2,  8),
  rf('seed-bbops-sm-fries',           "French Fries (Small)",                "B-Bop's",       '3.75 oz',    173,   3, 28,  6,  2,   0,  320, 3,  0),
  rf('seed-bbops-lg-fries',           "French Fries (Large)",                "B-Bop's",       '4.5 oz',     207,   3, 34,  7,  2,   0,  385, 3,  0),
  rf('seed-bbops-pork-fritter',       "Pork Loin Fritter Sandwich",          "B-Bop's",       '1 sandwich', 750,  35, 68, 36, 10,  90, 1380, 3,  8),
  rf('seed-bbops-fish-sandwich',      "Fish Sandwich",                       "B-Bop's",       '1 sandwich', 450,  20, 42, 22,  5,  55,  890, 2,  5),
  rf('seed-bbops-chili-cup',          "Chili (Cup)",                         "B-Bop's",       '1 cup',      280,  18, 22, 12,  4,  45,  820, 4,  6),
  rf('seed-bbops-choc-shake',         "Chocolate Shake",                     "B-Bop's",       '1 shake',    650,  12, 89, 26, 16,  80,  280, 1, 82),

  // ── Pizza Ranch (Iowa chain – official nutrition PDF 2023) ──────────────────
  // Fat/sat-fat estimated from calorie balance on items where PDF data wasn't captured
  rf('seed-pr-pepperoni-sm',          "Pepperoni Pizza (Small slice)",       "Pizza Ranch",   '1 slice',    210,   8, 26,  8,  3,  20,  240, 1,  2),
  rf('seed-pr-cheese-sm',             "Cheese Pizza (Small slice)",          "Pizza Ranch",   '1 slice',    210,   9, 26,  8,  3,  20,  180, 1,  2),
  rf('seed-pr-bbq-chicken-sm',        "BBQ Chicken Pizza (Small slice)",     "Pizza Ranch",   '1 slice',    200,   9, 27,  6,  2,  20,  220, 1,  3),
  rf('seed-pr-chkn-bacon-ranch-skil', "Chicken Bacon Ranch Pizza (Skillet)", "Pizza Ranch",   '1 slice',    340,  13, 28, 18,  6,  40,  560, 1,  2),
  rf('seed-pr-texan-taco-lg-thin',    "Texan Taco Pizza (Large Thin)",       "Pizza Ranch",   '1 slice',    200,   9, 21,  8,  3,  25,  350, 1,  2),
  rf('seed-pr-california-sm-thin',    "California Chicken Pizza (Thin)",     "Pizza Ranch",   '1 slice',    140,   7, 10,  6,  2,  20,  200, 0,  1),
  rf('seed-pr-broasted-wings',        "Broasted Chicken Wings",              "Pizza Ranch",   '1 serving',  348,  29,  0, 25,  7,  95,  500, 0,  0),
  rf('seed-pr-broasted-breast',       "Broasted Chicken Breast",             "Pizza Ranch",   '1 piece',    330,  26, 18, 19,  5,  80,  600, 1,  0),
  rf('seed-pr-garlic-bread-cheese',   "Garlic Bread with Cheese",            "Pizza Ranch",   '1 serving',  288,   8, 12, 18,  8,  25,  380, 0,  1),

  // ── Maid-Rite (Iowa-founded chain – third-party confirmed data) ─────────────
  rf('seed-maidrite-sandwich',        "Maid-Rite Sandwich",                  "Maid-Rite",     '1 sandwich', 415,  31, 27, 19,  7,  90, 1160, 0,  5),

  // ── Tasty Tacos (Des Moines – flour taco confirmed, others estimated) ───────
  rf('seed-tt-flour-taco-beef',       "Original Flour Taco (Beef)",          "Tasty Tacos",   '1 taco',     321,  13, 20, 15,  5,  40,  700, 3,  3),
  rf('seed-tt-corn-taco-beef',        "Corn Taco (Beef)",                    "Tasty Tacos",   '1 taco',     240,  11, 19, 12,  4,  35,  560, 2,  2),
  rf('seed-tt-burrito-beef',          "Beef Burrito",                        "Tasty Tacos",   '1 burrito',  530,  22, 58, 23,  8,  55, 1200, 5,  4),
  rf('seed-tt-taco-salad',            "Taco Salad (Beef)",                   "Tasty Tacos",   '1 salad',    550,  24, 48, 28,  9,  60, 1100, 6,  5),
  rf('seed-tt-nacho-supreme',         "Nacho Supreme (Beef)",                "Tasty Tacos",   '1 order',    620,  22, 65, 30, 10,  55, 1300, 6,  5),

  // ── Abelardo's Mexican Food (Iowa/Nebraska chain) ───────────────────────────
  // California Burrito has a full nutrition panel from MyNetDiary (entry confirmed).
  // All other burrito macros confirmed via MyNetDiary; sat fat/chol/sodium/fiber/sugar
  // estimated from ingredients where not captured in third-party data.
  rf('seed-abel-california-burrito',  "California Burrito",                  "Abelardo's",    '1 burrito', 1131,  57,105, 53, 17, 122, 1278, 7,  2),
  rf('seed-abel-carne-asada-burrito', "Carne Asada Burrito",                 "Abelardo's",    '1 burrito', 1035, 105, 40, 48, 14, 200, 1400, 4,  3),
  rf('seed-abel-carnitas-burrito',    "Carnitas Burrito",                    "Abelardo's",    '1 burrito', 1200,  86, 44, 66, 22, 180, 1350, 5,  2),
  rf('seed-abel-diablo-burrito',      "Diablo Burrito",                      "Abelardo's",    '1 burrito',  669,  70, 36, 27,  8, 155, 1100, 4,  3),
  rf('seed-abel-meat-lovers-burrito', "Meat Lovers Burrito",                 "Abelardo's",    '1 burrito', 1133,  80, 28, 77, 24, 200, 1600, 3,  2),
  rf('seed-abel-chile-relleno-bur',   "Chile Relleno Burrito",               "Abelardo's",    '1 burrito',  838,  25, 69, 51, 16, 120, 1200, 6,  5),
  rf('seed-abel-surf-n-turf-burrito', "Surf N Turf Burrito",                 "Abelardo's",    '1 burrito',  695,  69, 37, 29,  8, 200, 1300, 4,  2),
  rf('seed-abel-bean-cheese-burrito', "Bean & Cheese Burrito",               "Abelardo's",    '1 burrito',  552,  27, 71, 19,  9,  40,  980,10,  3),
  rf('seed-abel-steak-egg-burrito',   "Steak & Egg Burrito",                 "Abelardo's",    '1 burrito',  716,  65, 39, 34, 11, 280, 1100, 3,  2),
  rf('seed-abel-birria-taco',         "Tacos Birria",                        "Abelardo's",    '1 taco',     322,  18, 25, 16,  6,  60,  580, 2,  1),
  rf('seed-abel-combo15-carne-plate', "Combo 15 – Carne Asada Plate",        "Abelardo's",    '1 plate',   1059,  97, 56, 48, 14, 190, 1500, 8,  4),
  rf('seed-abel-rice-bowl-texas',     "Rice Bowl Texas",                     "Abelardo's",    '1 bowl',    1176, 110, 35, 64, 18, 220, 1450, 4,  3),
  rf('seed-abel-super-fries',         "Super Fries",                         "Abelardo's",    '1 order',   1712, 136, 89, 88, 28, 280, 2200, 8,  5),

  // ── Chick-fil-A ────────────────────────────────────────────────
  rf('seed-cfa-original-sandwich',    "Original Chicken Sandwich",           "Chick-fil-A",   '1 sandwich', 440,  28, 41, 19,  4,  75, 1350, 2,  6),
  rf('seed-cfa-spicy-deluxe',         "Spicy Deluxe Sandwich",               "Chick-fil-A",   '1 sandwich', 550,  36, 47, 26,  7, 100, 1750, 2,  7),
  rf('seed-cfa-grilled-sandwich',     "Grilled Chicken Sandwich",            "Chick-fil-A",   '1 sandwich', 390,  36, 38, 11,  2,  80, 1120, 2,  7),
  rf('seed-cfa-nuggets-8pc',          "Chicken Nuggets (8 pc)",              "Chick-fil-A",   '8 pieces',   260,  27, 11, 12,  2,  70, 1210, 0,  1),
  rf('seed-cfa-strips-3pc',           "Chicken Strips (3 pc)",               "Chick-fil-A",   '3 strips',   370,  37, 21, 17,  3,  65, 1210, 0,  2),
  rf('seed-cfa-waffle-fries-med',     "Waffle Fries (Medium)",               "Chick-fil-A",   '1 medium',   420,   5, 50, 22,  4,   0,  260, 5,  0),

  // ── Chipotle — Build Your Own (builder trigger) ────────────────
  // Tapping this opens the bowl builder; ingredient entries below are hidden from normal search
  rf('seed-chipotle-builder',         "Build Your Own Bowl / Burrito",       "Chipotle",   '1 custom order', 0, 0, 0, 0, 0, 0, 0, 0, 0),
  // Vessel
  rf('seed-chipotle-ing-vessel-bowl',     "Bowl",                 "Chipotle", 'vessel',   0,  0,  0,  0, 0,  0,   0, 0, 0),
  rf('seed-chipotle-ing-vessel-burrito',  "Burrito Tortilla",     "Chipotle", 'vessel', 320,  8, 48, 11, 2,  0, 680, 3, 1),
  rf('seed-chipotle-ing-vessel-softtaco', "Soft Tacos (×2)",      "Chipotle", 'vessel', 260,  6, 42,  8, 3,  0, 660, 2, 2),
  rf('seed-chipotle-ing-vessel-crispytaco',"Crispy Tacos (×3)",   "Chipotle", 'vessel', 195,  3, 27,  9, 1,  0, 225, 2, 1),
  // Protein
  rf('seed-chipotle-ing-protein-chicken',  "Chicken",             "Chipotle", 'protein', 180, 32,  2,  7, 2, 105, 310, 0, 0),
  rf('seed-chipotle-ing-protein-steak',    "Steak",               "Chipotle", 'protein', 150, 21,  1,  7, 3,  65, 310, 0, 0),
  rf('seed-chipotle-ing-protein-carnitas', "Carnitas",            "Chipotle", 'protein', 210, 23,  1, 13, 5,  70, 540, 0, 0),
  rf('seed-chipotle-ing-protein-barbacoa', "Barbacoa",            "Chipotle", 'protein', 170, 24,  2,  7, 3,  75, 460, 0, 0),
  rf('seed-chipotle-ing-protein-sofritas', "Sofritas",            "Chipotle", 'protein', 150,  8, 11,  9, 2,  0, 480, 2, 0),
  rf('seed-chipotle-ing-protein-alpastor', "Chicken Al Pastor",   "Chipotle", 'protein', 200, 29,  5,  8, 2, 105, 500, 0, 1),
  // Rice
  rf('seed-chipotle-ing-rice-none',        "No Rice",             "Chipotle", 'rice',     0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-chipotle-ing-rice-white',       "White Rice",          "Chipotle", 'rice',   210,  4, 40,  3, 1,   0, 350, 0, 0),
  rf('seed-chipotle-ing-rice-brown',       "Brown Rice",          "Chipotle", 'rice',   215,  5, 40,  3, 1,   0, 330, 2, 0),
  // Beans
  rf('seed-chipotle-ing-beans-none',       "No Beans",            "Chipotle", 'beans',   0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-chipotle-ing-beans-black',      "Black Beans",         "Chipotle", 'beans',  130,  8, 22,  2, 0,   0, 200, 7, 0),
  rf('seed-chipotle-ing-beans-pinto',      "Pinto Beans",         "Chipotle", 'beans',  130,  8, 22,  2, 0,   0, 185, 7, 0),
  // Salsa
  rf('seed-chipotle-ing-salsa-mild',       "Fresh Tomato (Mild)", "Chipotle", 'salsa',   25,  1,  4,  1, 0,   0, 470, 1, 2),
  rf('seed-chipotle-ing-salsa-medium',     "Tomatillo Green (Medium)","Chipotle",'salsa',15,  0,  3,  0, 0,   0, 230, 1, 1),
  rf('seed-chipotle-ing-salsa-hot',        "Tomatillo Red (Hot)", "Chipotle", 'salsa',   30,  1,  4,  1, 0,   0, 500, 1, 1),
  rf('seed-chipotle-ing-salsa-corn',       "Corn Salsa",          "Chipotle", 'salsa',   80,  3, 15,  2, 0,   0, 150, 1, 3),
  // Double protein (adds a second scoop — same macros as the single serving)
  rf('seed-chipotle-ing-double-chicken',   "Double Chicken",      "Chipotle", 'double', 180, 32,  2,  7, 2, 105, 310, 0, 0),
  rf('seed-chipotle-ing-double-steak',     "Double Steak",        "Chipotle", 'double', 150, 21,  1,  7, 3,  65, 310, 0, 0),
  rf('seed-chipotle-ing-double-carnitas',  "Double Carnitas",     "Chipotle", 'double', 210, 23,  1, 13, 5,  70, 540, 0, 0),
  rf('seed-chipotle-ing-double-barbacoa',  "Double Barbacoa",     "Chipotle", 'double', 170, 24,  2,  7, 3,  75, 460, 0, 0),
  rf('seed-chipotle-ing-double-sofritas',  "Double Sofritas",     "Chipotle", 'double', 150,  8, 11,  9, 2,   0, 480, 2, 0),
  // Extras
  rf('seed-chipotle-ing-extra-cheese',     "Cheese",              "Chipotle", 'extra',  110,  6,  1,  9, 5,  30, 180, 0, 0),
  rf('seed-chipotle-ing-extra-sourcream',  "Sour Cream",          "Chipotle", 'extra',  120,  2,  2, 11, 7,  35,  30, 0, 2),
  rf('seed-chipotle-ing-extra-guac',       "Guacamole",           "Chipotle", 'extra',  230,  2,  8, 22, 3,   0, 370, 6, 1),
  rf('seed-chipotle-ing-extra-queso',      "Queso Blanco",        "Chipotle", 'extra',  120,  4,  4, 10, 4,  15, 390, 0, 1),
  rf('seed-chipotle-ing-extra-fajita',     "Fajita Veggies",      "Chipotle", 'extra',   20,  1,  4,  1, 0,   0, 175, 1, 2),
  rf('seed-chipotle-ing-extra-lettuce',    "Romaine Lettuce",     "Chipotle", 'extra',    5,  0,  1,  0, 0,   0,   5, 0, 0),
  rf('seed-chipotle-ing-extra-chips',      "Chips & Salsa",       "Chipotle", 'extra',  570, 10, 73, 27, 3,   0, 420, 5, 1),
  rf('seed-chipotle-ing-extra-kidschips',  "Chips (Kid's)",       "Chipotle", 'extra',  210,  4, 27, 10, 1,   0, 150, 2, 0),

  // ── Pancheros — Build Your Own ─────────────────────────────────
  rf('seed-pancheros-builder',        "Build Your Own Bowl / Burrito",       "Pancheros", '1 custom order', 0, 0, 0, 0, 0, 0, 0, 0, 0),
  // Vessel
  rf('seed-pancheros-ing-vessel-bowl',     "Bowl",                "Pancheros",'vessel',   0,  0,  0,  0, 0,  0,   0, 0, 0),
  rf('seed-pancheros-ing-vessel-burrito',  "Burrito Tortilla",    "Pancheros",'vessel', 310,  8, 56,  7, 3,  0, 730, 2, 1),
  rf('seed-pancheros-ing-vessel-taco',     "Flour Tacos (×2)",    "Pancheros",'vessel', 260,  6, 44,  7, 2,  0, 640, 2, 2),
  rf('seed-pancheros-ing-vessel-quesadilla',"Quesadilla",         "Pancheros",'vessel', 380, 14, 44, 16, 8,  35, 810, 2, 2),
  rf('seed-pancheros-ing-vessel-nachos',   "Nachos",              "Pancheros",'vessel', 480,  6, 58, 24, 4,  0,  620, 4, 1),
  // Protein
  rf('seed-pancheros-ing-protein-chicken', "Chicken",             "Pancheros",'protein', 130, 25,  1,  3, 1,  70, 570, 0, 0),
  rf('seed-pancheros-ing-protein-steak',   "Steak",               "Pancheros",'protein', 130, 20,  1,  5, 2,  50, 420, 0, 0),
  rf('seed-pancheros-ing-protein-pork',    "Pulled Pork",         "Pancheros",'protein', 130, 19,  1,  6, 2,  55, 580, 0, 0),
  rf('seed-pancheros-ing-protein-tofu',    "Tofu",                "Pancheros",'protein', 110, 10,  3,  7, 1,   0,   5, 1, 0),
  // Double protein (adds a second scoop)
  rf('seed-pancheros-ing-double-chicken',  "Double Chicken",      "Pancheros",'double', 130, 25,  1,  3, 1,  70, 570, 0, 0),
  rf('seed-pancheros-ing-double-steak',    "Double Steak",        "Pancheros",'double', 130, 20,  1,  5, 2,  50, 420, 0, 0),
  rf('seed-pancheros-ing-double-pork',     "Double Pulled Pork",  "Pancheros",'double', 130, 19,  1,  6, 2,  55, 580, 0, 0),
  rf('seed-pancheros-ing-double-tofu',     "Double Tofu",         "Pancheros",'double', 110, 10,  3,  7, 1,   0,   5, 1, 0),
  // Rice — Pancheros only offers cilantro lime rice (one style)
  rf('seed-pancheros-ing-rice-none',       "No Rice",             "Pancheros",'rice',     0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-pancheros-ing-rice-cilantro',   "Cilantro Lime Rice",  "Pancheros",'rice',   200,  4, 41,  2, 0,   0, 340, 0, 0),
  // Beans
  rf('seed-pancheros-ing-beans-none',      "No Beans",            "Pancheros",'beans',   0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-pancheros-ing-beans-black',     "Black Beans",         "Pancheros",'beans',  100,  7, 18,  1, 0,   0, 340, 6, 0),
  rf('seed-pancheros-ing-beans-pinto',     "Pinto Beans",         "Pancheros",'beans',  100,  6, 18,  1, 0,   0, 290, 5, 0),
  // Salsa
  rf('seed-pancheros-ing-salsa-pico',      "Pico de Gallo",       "Pancheros",'salsa',   15,  0,  3,  0, 0,   0, 230, 1, 1),
  rf('seed-pancheros-ing-salsa-chipotle',  "Chipotle Salsa",      "Pancheros",'salsa',   30,  0,  5,  1, 0,   0, 420, 1, 2),
  rf('seed-pancheros-ing-salsa-green',     "Green Tomatillo",     "Pancheros",'salsa',   15,  0,  3,  0, 0,   0, 210, 0, 1),
  rf('seed-pancheros-ing-salsa-corn',      "Corn Salsa",          "Pancheros",'salsa',   55,  1, 12,  1, 0,   0, 120, 1, 3),
  rf('seed-pancheros-ing-salsa-hot',       "Panchero's Hot Sauce","Pancheros",'salsa',    5,  0,  1,  0, 0,   0, 190, 0, 0),
  // Extras
  rf('seed-pancheros-ing-extra-cheese',    "Cheese",              "Pancheros",'extra',  110,  7,  0,  9, 5,  30, 190, 0, 0),
  rf('seed-pancheros-ing-extra-sourcream', "Sour Cream",          "Pancheros",'extra',   60,  1,  2,  5, 3,  20,  15, 0, 1),
  rf('seed-pancheros-ing-extra-queso',     "Queso",               "Pancheros",'extra',   80,  3,  4,  6, 3,  15, 330, 0, 1),
  rf('seed-pancheros-ing-extra-guac',      "Guacamole",           "Pancheros",'extra',  120,  1,  5, 11, 2,   0, 115, 3, 0),
  rf('seed-pancheros-ing-extra-fajita',    "Fajita Veggies",      "Pancheros",'extra',   25,  1,  4,  1, 0,   0, 190, 1, 1),
  rf('seed-pancheros-ing-extra-lettuce',   "Lettuce",             "Pancheros",'extra',    5,  0,  1,  0, 0,   0,   5, 0, 0),
  rf('seed-pancheros-ing-extra-tortilla',  "Side Tortilla",       "Pancheros",'extra',  155,  4, 28,  4, 1,   0, 365, 1, 0),
  rf('seed-pancheros-ing-extra-chips',     "Chips",               "Pancheros",'extra',  280,  4, 36, 13, 2,   0, 140, 2, 0),

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

  // ── Burger King – Whoppers ──────────────────────────────────────
  rf('seed-bk-whopper',               "Whopper",                             "Burger King",   '1 burger',   670,  31, 54, 39, 12,  85, 1170, 3, 13),
  rf('seed-bk-whopper-cheese',        "Whopper with Cheese",                 "Burger King",   '1 burger',   760,  36, 56, 46, 16, 105, 1600, 3, 14),
  rf('seed-bk-whopper-bacon-cheese',  "Bacon & Cheese Whopper",              "Burger King",   '1 burger',   820,  40, 56, 51, 18, 115, 1850, 3, 14),
  rf('seed-bk-double-whopper',        "Double Whopper",                      "Burger King",   '1 burger',   920,  52, 54, 58, 20, 150, 1240, 3, 13),
  rf('seed-bk-double-whopper-cheese', "Double Whopper with Cheese",          "Burger King",   '1 burger',  1010,  56, 56, 65, 24, 175, 1670, 3, 14),
  rf('seed-bk-triple-whopper',        "Triple Whopper",                      "Burger King",   '1 burger',  1355,  73, 54, 97, 28, 255, 1120, 3, 13),
  rf('seed-bk-triple-whopper-cheese', "Triple Whopper with Cheese",          "Burger King",   '1 burger',  1565,  82, 56,114, 32, 280, 1550, 3, 14),
  rf('seed-bk-whopper-jr',            "Whopper Jr.",                         "Burger King",   '1 burger',   330,  15, 30, 18,  5,  35,  560, 2,  7),
  rf('seed-bk-whopper-jr-cheese',     "Whopper Jr. with Cheese",             "Burger King",   '1 burger',   370,  18, 31, 22,  7,  45,  780, 2,  8),
  rf('seed-bk-impossible-whopper',    "Impossible Whopper",                  "Burger King",   '1 burger',   630,  29, 62, 34, 10,  15, 1350, 6, 14),

  // ── Burger King – Burgers ───────────────────────────────────────
  rf('seed-bk-hamburger',             "Hamburger",                           "Burger King",   '1 burger',   250,  13, 29, 10,  4,  30,  560, 1,  7),
  rf('seed-bk-cheeseburger',          "Cheeseburger",                        "Burger King",   '1 burger',   290,  15, 30, 13,  6,  40,  780, 1,  7),
  rf('seed-bk-dbl-hamburger',         "Double Hamburger",                    "Burger King",   '1 burger',   360,  22, 29, 17,  7,  60,  590, 1,  7),
  rf('seed-bk-dbl-cheeseburger',      "Double Cheeseburger",                 "Burger King",   '1 burger',   400,  24, 30, 21,  9,  70,  810, 1,  7),
  rf('seed-bk-bacon-cheeseburger',    "Bacon Cheeseburger",                  "Burger King",   '1 burger',   340,  18, 30, 16,  7,  45,  940, 1,  7),
  rf('seed-bk-bacon-dbl-cheese',      "Bacon Double Cheeseburger",           "Burger King",   '1 burger',   440,  27, 30, 24, 11,  75,  970, 1,  7),
  rf('seed-bk-rodeo-burger',          "Rodeo Burger",                        "Burger King",   '1 burger',   410,  16, 51, 17,  5,  35,  635, 3, 11),
  rf('seed-bk-rodeo-cheeseburger',    "Rodeo Cheeseburger",                  "Burger King",   '1 burger',   450,  17, 52, 21,  8,  45,  835, 3, 11),
  rf('seed-bk-rodeo-king',            "Rodeo King",                          "Burger King",   '1 burger',  1480,  79, 69,100, 39, 310, 2340, 3, 14),
  rf('seed-bk-big-king',              "Big King",                            "Burger King",   '1 burger',  1009,  55, 57, 64, 26, 174, 2076, 3, 15),
  rf('seed-bk-bacon-king',            "Bacon King",                          "Burger King",   '1 burger',  1200,  66, 55, 81, 32, 200, 2270, 3, 15),
  rf('seed-bk-xl-cheeseburger',       "Extra Long Cheeseburger",             "Burger King",   '1 burger',   640,  29, 50, 37, 13,  90, 1120, 2, 11),

  // ── Burger King – Chicken & Fish Sandwiches ─────────────────────
  rf('seed-bk-royal-crispy',          "Classic Royal Crispy Chicken",        "Burger King",   '1 sandwich', 600,  31, 54, 31,  5,  80, 1330, 9,  9),
  rf('seed-bk-spicy-royal-crispy',    "Spicy Royal Crispy Chicken",          "Burger King",   '1 sandwich', 760,  31, 58, 47,  8,  80, 1580, 9, 11),
  rf('seed-bk-swiss-royal-crispy',    "Bacon & Swiss Royal Crispy Chicken",  "Burger King",   '1 sandwich', 740,  39, 56, 43, 11, 110, 1920, 9, 10),
  rf('seed-bk-orig-chicken',          "Original Chicken Sandwich",           "Burger King",   '1 sandwich', 680,  23, 63, 39,  7,  65, 1380, 3,  7),
  rf('seed-bk-chicken-jr',            "Chicken Jr.",                         "Burger King",   '1 sandwich', 440,  13, 39, 27,  5,  40,  700, 2,  5),
  rf('seed-bk-spicy-chicken-jr',      "Spicy Chicken Jr.",                   "Burger King",   '1 sandwich', 380,  12, 42, 19,  4,  30,  680, 2,  6),
  rf('seed-bk-big-fish',              "Big Fish Sandwich",                   "Burger King",   '1 sandwich', 570,  19, 58, 30,  5,  50, 1270, 3,  8),
  rf('seed-bk-fiery-big-fish',        "Fiery Big Fish Sandwich",             "Burger King",   '1 sandwich', 730,  19, 61, 46,  8,  55, 1530, 3, 11),

  // ── Burger King – Wraps ─────────────────────────────────────────
  rf('seed-bk-wrap-classic',          "Classic Royal Crispy Wrap",           "Burger King",   '1 wrap',     310,  15, 28, 17,  4,  45,  700, 2,  3),
  rf('seed-bk-wrap-honey-mustard',    "Honey Mustard Royal Crispy Wrap",     "Burger King",   '1 wrap',     290,  15, 28, 14,  3,  40,  680, 2,  4),
  rf('seed-bk-wrap-spicy',            "Spicy Royal Crispy Wrap",             "Burger King",   '1 wrap',     390,  15, 28, 25,  5,  45,  750, 2,  3),

  // ── Burger King – Nuggets & Chicken Fries ───────────────────────
  rf('seed-bk-nuggets-4pc',           "Chicken Nuggets (4 pc)",              "Burger King",   '4 pieces',   190,   9, 12, 12,  3,  30,  490, 1,  0),
  rf('seed-bk-nuggets-8pc',           "Chicken Nuggets (8 pc)",              "Burger King",   '8 pieces',   380,  20, 20, 22,  5,  50,  610, 2,  0),
  rf('seed-bk-nuggets-10pc',          "Chicken Nuggets (10 pc)",             "Burger King",   '10 pieces',  480,  22, 30, 31,  6,  70, 1220, 2,  0),
  rf('seed-bk-nuggets-20pc',          "Chicken Nuggets (20 pc)",             "Burger King",   '20 pieces',  970,  45, 60, 62, 12, 140, 2440, 5,  0),
  rf('seed-bk-chkn-fries-8pc',        "Chicken Fries (8 pc)",                "Burger King",   '8 pieces',   220,  13, 16, 12,  3,  35,  520, 1,  0),
  rf('seed-bk-chkn-fries-12pc',       "Chicken Fries (12 pc)",               "Burger King",   '12 pieces',  340,  20, 24, 18,  5,  52,  780, 2,  0),

  // ── Burger King – Sides ─────────────────────────────────────────
  rf('seed-bk-fries-value',           "French Fries (Value)",                "Burger King",   '1 value',    230,   3, 33, 10,  1,   0,  170, 2,  1),
  rf('seed-bk-fries-small',           "French Fries (Small)",                "Burger King",   '1 small',    300,   4, 43, 13,  2,   0,  220, 3,  1),
  rf('seed-bk-fries-medium',          "French Fries (Medium)",               "Burger King",   '1 medium',   370,   5, 54, 16,  2,   0,  270, 4,  1),
  rf('seed-bk-fries-large',           "French Fries (Large)",                "Burger King",   '1 large',    440,   5, 64, 19,  3,   0,  320, 5,  1),
  rf('seed-bk-onion-rings-small',     "Onion Rings (Small)",                 "Burger King",   '1 small',    280,   4, 37, 13,  2,   0,  510, 4,  4),
  rf('seed-bk-onion-rings-medium',    "Onion Rings (Medium)",                "Burger King",   '1 medium',   360,   4, 48, 16,  3,   0,  640, 5,  5),
  rf('seed-bk-onion-rings-large',     "Onion Rings (Large)",                 "Burger King",   '1 large',    520,   7, 70, 24,  4,   0,  950, 7,  7),
  rf('seed-bk-mozzarella-4pc',        "Mozzarella Sticks (4 pc)",            "Burger King",   '4 pieces',   240,  10, 24, 12,  4,  20,  790, 1,  2),
  rf('seed-bk-jal-bites-4pc',         "Jalapeño Cheddar Bites (4 pc)",       "Burger King",   '4 pieces',   230,   6, 27, 11,  5,  15,  700, 2,  1),
  rf('seed-bk-jal-bites-8pc',         "Jalapeño Cheddar Bites (8 pc)",       "Burger King",   '8 pieces',   460,  13, 54, 21,  9,  30, 1410, 4,  3),

  // ── Burger King – Breakfast ─────────────────────────────────────
  rf('seed-bk-cw-egg-cheese',         "Egg & Cheese Croissan'wich",          "Burger King",   '1 sandwich', 352,  14, 29, 21, 11, 250,  855, 3,  5),
  rf('seed-bk-cw-ham-egg-cheese',     "Ham, Egg & Cheese Croissan'wich",     "Burger King",   '1 sandwich', 392,  20, 30, 23, 11, 265, 1215, 3,  6),
  rf('seed-bk-cw-saus-egg-cheese',    "Sausage, Egg & Cheese Croissan'wich", "Burger King",   '1 sandwich', 542,  21, 29, 38, 17, 280, 1255, 3,  5),
  rf('seed-bk-cw-fully-loaded',       "Fully Loaded Croissan'wich",          "Burger King",   '1 sandwich', 704,  34, 33, 50, 23, 320, 2206, 3,  7),
  rf('seed-bk-saus-biscuit',          "Sausage Biscuit",                     "Burger King",   '1 biscuit',  430,  11, 30, 30, 13,  35, 1150, 1,  2),
  rf('seed-bk-bec-biscuit',           "Bacon, Egg & Cheese Biscuit",         "Burger King",   '1 biscuit',  410,  15, 32, 26, 12, 225, 1370, 1,  3),
  rf('seed-bk-sec-biscuit',           "Sausage, Egg & Cheese Biscuit",       "Burger King",   '1 biscuit',  550,  20, 32, 39, 17, 250, 1580, 1,  3),
  rf('seed-bk-breakfast-burrito',     "Breakfast Burrito Jr.",               "Burger King",   '1 burrito',  420,  16, 29, 26,  9, 235, 1080, 2,  2),
  rf('seed-bk-pancake-saus',          "Pancake & Sausage Platter",           "Burger King",   '1 platter',  620,  13, 79, 29,  9,  75, 1080, 1, 36),
  rf('seed-bk-fts-3pc',               "French Toast Sticks (3 pc)",          "Burger King",   '3 pieces',   230,   4, 32, 10,  2,   0,  220, 2,  9),
  rf('seed-bk-fts-5pc',               "French Toast Sticks (5 pc)",          "Burger King",   '5 pieces',   380,   6, 77, 16,  4,   0,  400, 3, 33),
  rf('seed-bk-hash-browns-sm',        "Hash Browns (Small)",                 "Burger King",   '1 small',    290,   2, 29, 19,  4,   0,  840, 2,  0),
  rf('seed-bk-hash-browns-md',        "Hash Browns (Medium)",                "Burger King",   '1 medium',   540,   4, 54, 34,  7,   0, 1480, 5,  0),
  rf('seed-bk-hash-browns-lg',        "Hash Browns (Large)",                 "Burger King",   '1 large',    740,   6, 75, 48,  9,   0, 2040, 6,  1),

  // ── Burger King – Desserts & Shakes ────────────────────────────
  rf('seed-bk-soft-serve-cone',       "Soft Serve Cone",                     "Burger King",   '1 cone',     200,   5, 33,  5,  4,  20,  150, 0, 22),
  rf('seed-bk-hershey-pie',           "Hershey's Sundae Pie",                "Burger King",   '1 slice',    310,   3, 32, 18, 12,  10,  230, 1, 22),
  rf('seed-bk-vanilla-shake',         "Vanilla Shake",                       "Burger King",   '1 shake',    600,  13, 98, 16, 11,  65,  410, 0, 81),
  rf('seed-bk-oreo-shake',            "Oreo Cookie Shake",                   "Burger King",   '1 shake',    680,  13,111, 20, 12,  65,  470, 1, 88),
  rf('seed-bk-choc-shake',            "Chocolate Shake",                     "Burger King",   '1 shake',    580,  13,100, 15, 10,  65,  420, 2, 81),
  rf('seed-bk-cookie',                "Chocolate Chip Cookie",               "Burger King",   '1 cookie',   160,   2, 23,  8,  4,  10,  110, 1, 14),

  // ── Burger King – Dipping Sauces ───────────────────────────────
  rf('seed-bk-sauce-bbq',             "BBQ Dipping Sauce",                   "Burger King",   '1 oz packet',  50,  0, 12,  0,  0,   0,  310, 0, 11),
  rf('seed-bk-sauce-ranch',           "Ranch Dipping Sauce",                 "Burger King",   '1 oz packet', 140,  0,  1, 14,  3,  10,  200, 0,  1),
  rf('seed-bk-sauce-buffalo',         "Buffalo Dipping Sauce",               "Burger King",   '1 oz packet',  80,  0,  2,  8,  2,  10,  370, 0,  1),
  rf('seed-bk-sauce-honey-mustard',   "Honey Mustard Dipping Sauce",         "Burger King",   '1 oz packet',  90,  0,  8,  6,  1,  10,  170, 0,  8),
  rf('seed-bk-sauce-zesty',           "Zesty Onion Ring Sauce",              "Burger King",   '1 oz packet', 150,  0,  3, 16,  3,  15,  230, 0,  1),

  // ── Domino's (Large, Hand Tossed, 1 slice) ─────────────────────
  rf('seed-dom-cheese-slice',         "Cheese Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice',  290,  12, 37, 11,  5,  25,  680, 2,  4),
  rf('seed-dom-pepperoni-slice',      "Pepperoni Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice', 330, 14, 37, 14,  6,  35,  820, 2,  4),

  // ── Popeyes ─────────────────────────────────────────────────────
  rf('seed-pop-classic-sndwch',       "Classic Chicken Sandwich",            "Popeyes",       '1 sandwich', 700,  28, 57, 42,  9,  80, 1443, 2,  7),
  rf('seed-pop-spicy-sndwch',         "Spicy Chicken Sandwich",              "Popeyes",       '1 sandwich', 700,  28, 57, 42,  9,  80, 1669, 2,  7),
  rf('seed-pop-tenders-3pc',          "Chicken Tenders (3 pc)",              "Popeyes",       '3 pieces',   340,  28, 17, 17,  4,  80, 1060, 0,  0),
  rf('seed-pop-2pc-leg-thigh',        "2pc Leg & Thigh",                     "Popeyes",       '2 pieces',   370,  25, 16, 23,  7, 120,  920, 0,  0),
  rf('seed-pop-cajun-fries-reg',      "Cajun Fries (Regular)",               "Popeyes",       '1 regular',  260,   3, 32, 13,  3,   0,  630, 3,  0),
  rf('seed-pop-mashed-potatoes',      "Mashed Potatoes with Gravy",          "Popeyes",       '1 regular',  120,   2, 19,  4,  1,   0,  570, 1,  0),
  rf('seed-pop-mac-cheese',           "Mac & Cheese",                        "Popeyes",       '1 regular',  220,   6, 26, 10,  4,  20,  680, 1,  4),
  rf('seed-pop-coleslaw',             "Coleslaw",                            "Popeyes",       '1 regular',  200,   1, 22, 12,  2,  10,  230, 2, 17),
  rf('seed-pop-red-beans-rice',       "Red Beans & Rice",                    "Popeyes",       '1 regular',  230,   8, 32,  8,  2,  10,  650, 5,  2),
  rf('seed-pop-biscuit',              "Biscuit",                             "Popeyes",       '1 biscuit',  260,   4, 27, 15,  4,  25,  520, 1,  3),

  // ── KFC ─────────────────────────────────────────────────────────
  rf('seed-kfc-or-breast',            "Original Recipe Chicken Breast",      "KFC",           '1 piece',    390,  39, 11, 21,  5, 145, 1010, 0,  0),
  rf('seed-kfc-or-drumstick',         "Original Recipe Drumstick",           "KFC",           '1 piece',    130,  14,  4,  7,  2,  70,  330, 0,  0),
  rf('seed-kfc-or-thigh',             "Original Recipe Thigh",               "KFC",           '1 piece',    280,  18,  9, 19,  5, 110,  560, 0,  0),
  rf('seed-kfc-xc-breast',            "Extra Crispy Breast",                 "KFC",           '1 piece',    530,  35, 23, 35,  7, 135, 1010, 0,  0),
  rf('seed-kfc-classic-sndwch',       "Classic Chicken Sandwich",            "KFC",           '1 sandwich', 650,  28, 53, 38,  7,  80, 1370, 2,  6),
  rf('seed-kfc-chicken-little',       "Chicken Little",                      "KFC",           '1 sandwich', 320,  15, 27, 17,  3,  50,  590, 1,  4),
  rf('seed-kfc-famous-bowl',          "Famous Bowl",                         "KFC",           '1 bowl',     710,  26, 86, 27,  5,  60, 2090, 5,  4),
  rf('seed-kfc-pot-pie',              "Pot Pie",                             "KFC",           '1 pie',      720,  27, 70, 37, 13,  70, 1970, 4,  4),
  rf('seed-kfc-mac-cheese',           "Mac & Cheese (Individual)",           "KFC",           '1 serving',  180,   7, 21,  8,  4,  20,  680, 1,  4),
  rf('seed-kfc-mash-gravy',           "Mashed Potatoes & Gravy (Individual)","KFC",           '1 serving',  120,   2, 19,  4,  1,   0,  570, 2,  0),
  rf('seed-kfc-biscuit',              "Biscuit",                             "KFC",           '1 biscuit',  180,   4, 22,  9,  3,   0,  570, 1,  3),
  rf('seed-kfc-coleslaw',             "Coleslaw (Individual)",               "KFC",           '1 serving',  170,   1, 22,  9,  1,  10,  180, 2, 18),
  rf('seed-kfc-corn-cob',             "Corn on the Cob",                     "KFC",           '1 ear',       70,   2, 13,  2,  0,   0,    5, 1,  3),
  rf('seed-kfc-green-beans',          "Green Beans (Individual)",            "KFC",           '1 serving',   25,   1,  4,  1,  0,   5,  440, 2,  1),

  // ── Raising Cane's ──────────────────────────────────────────────
  rf('seed-canes-1-finger',           "Chicken Finger (1 pc)",               "Raising Cane's",'1 finger',   140,  12,  9,  6,  1,  35,  290, 0,  0),
  rf('seed-canes-3-finger-combo',     "3 Finger Combo",                      "Raising Cane's",'3 fingers',  420,  36, 27, 18,  3, 105,  870, 0,  0),
  rf('seed-canes-box-combo',          "Box Combo (4 fingers)",               "Raising Cane's",'4 fingers',  560,  48, 36, 24,  4, 140, 1160, 0,  0),
  rf('seed-canes-fries',              "Crinkle Cut Fries",                   "Raising Cane's",'1 serving',  310,   5, 43, 14,  2,   0,  490, 3,  0),
  rf('seed-canes-coleslaw',           "Coleslaw",                            "Raising Cane's",'1 serving',  190,   2, 14, 15,  2,  15,  290, 2, 11),
  rf('seed-canes-texas-toast',        "Texas Toast",                         "Raising Cane's",'1 slice',    150,   4, 19,  7,  1,   0,  250, 1,  1),
  rf('seed-canes-sauce',              "Cane's Sauce",                        "Raising Cane's",'1 container',190,   1,  3, 20,  3,  20,  280, 0,  2),

  // ── Wingstop ────────────────────────────────────────────────────
  // Bone-in Wings — 6 pc (all flavors)
  rf('seed-ws-bonein-plain',          "Bone-in Wings, Plain (per wing)",     "Wingstop",      '1 wing',      70,   7,  0,  5,  1,  40,  170, 0,  0),
  rf('seed-ws-classic-buffalo-6pc',   "Classic Buffalo Wings (6 pc)",        "Wingstop",      '6 wings',    480,  44,  3, 31,  8, 240, 1730, 0,  1),
  rf('seed-ws-original-hot-6pc',      "Original Hot Wings (6 pc)",           "Wingstop",      '6 wings',    480,  44,  2, 32,  8, 240, 1510, 0,  0),
  rf('seed-ws-mild-6pc',              "Mild Wings (6 pc)",                   "Wingstop",      '6 wings',    490,  44,  3, 33,  8, 240, 1600, 0,  0),
  rf('seed-ws-lemon-pepper-6pc',      "Lemon Pepper Wings (6 pc)",           "Wingstop",      '6 wings',    570,  43,  3, 42,  9, 240, 1690, 0,  0),
  rf('seed-ws-garlic-parm-6pc',       "Garlic Parmesan Wings (6 pc)",        "Wingstop",      '6 wings',    580,  44,  3, 43, 10, 255, 1260, 0,  0),
  rf('seed-ws-louisiana-rub-6pc',     "Louisiana Rub Wings (6 pc)",          "Wingstop",      '6 wings',    450,  43,  2, 30,  7, 240, 1440, 0,  0),
  rf('seed-ws-cajun-6pc',             "Cajun Wings (6 pc)",                  "Wingstop",      '6 wings',    460,  43,  3, 31,  7, 240, 1600, 0,  0),
  rf('seed-ws-hickory-bbq-6pc',       "Hickory Smoked BBQ Wings (6 pc)",     "Wingstop",      '6 wings',    510,  43,  8, 33,  8, 240, 1520, 0,  2),
  rf('seed-ws-mango-hab-6pc',         "Mango Habanero Wings (6 pc)",         "Wingstop",      '6 wings',    520,  43, 10, 33,  8, 240, 1480, 0,  3),
  rf('seed-ws-atomic-6pc',            "Atomic Wings (6 pc)",                 "Wingstop",      '6 wings',    490,  44,  3, 32,  8, 240, 1590, 0,  1),
  rf('seed-ws-spicy-korean-6pc',      "Spicy Korean Q Wings (6 pc)",         "Wingstop",      '6 wings',    530,  43, 12, 33,  8, 240, 1550, 0,  2),
  rf('seed-ws-hawaiian-6pc',          "Hawaiian Wings (6 pc)",               "Wingstop",      '6 wings',    520,  43, 10, 33,  8, 240, 1400, 0,  3),
  // Bone-in Wings — 10 pc
  rf('seed-ws-classic-buffalo-10pc',  "Classic Buffalo Wings (10 pc)",       "Wingstop",      '10 wings',   800,  73,  5, 52, 13, 400, 2880, 0,  1),
  rf('seed-ws-lemon-pepper-10pc',     "Lemon Pepper Wings (10 pc)",          "Wingstop",      '10 wings',   950,  72,  5, 70, 15, 400, 2820, 0,  0),
  rf('seed-ws-garlic-parm-10pc',      "Garlic Parmesan Wings (10 pc)",       "Wingstop",      '10 wings',   970,  73,  5, 72, 17, 425, 2100, 0,  0),
  rf('seed-ws-mango-hab-10pc',        "Mango Habanero Wings (10 pc)",        "Wingstop",      '10 wings',   870,  72, 17, 55, 13, 400, 2470, 0,  5),
  rf('seed-ws-hickory-bbq-10pc',      "Hickory Smoked BBQ Wings (10 pc)",    "Wingstop",      '10 wings',   850,  72, 13, 55, 13, 400, 2540, 0,  3),
  // Boneless Wings — 6 pc (all flavors)
  rf('seed-ws-boneless-plain',        "Boneless Wings, Plain (per piece)",   "Wingstop",      '1 piece',     80,   5,  6,  4,  1,  15,  240, 0,  0),
  rf('seed-ws-boneless-buffalo-6pc',  "Boneless Classic Buffalo (6 pc)",     "Wingstop",      '6 pc',       540,  34, 40, 27,  6, 105, 1900, 1,  1),
  rf('seed-ws-boneless-original-6pc', "Boneless Original Hot (6 pc)",        "Wingstop",      '6 pc',       540,  34, 40, 27,  6, 105, 1780, 1,  0),
  rf('seed-ws-boneless-mild-6pc',     "Boneless Mild (6 pc)",                "Wingstop",      '6 pc',       550,  34, 40, 28,  6, 105, 1820, 1,  0),
  rf('seed-ws-boneless-lemon-6pc',    "Boneless Lemon Pepper (6 pc)",        "Wingstop",      '6 pc',       610,  33, 40, 38,  7, 105, 1760, 1,  0),
  rf('seed-ws-boneless-gparm-6pc',    "Boneless Garlic Parmesan (6 pc)",     "Wingstop",      '6 pc',       620,  34, 40, 39,  8, 120, 1380, 1,  0),
  rf('seed-ws-boneless-cajun-6pc',    "Boneless Cajun (6 pc)",               "Wingstop",      '6 pc',       530,  33, 40, 27,  6, 105, 1760, 1,  0),
  rf('seed-ws-boneless-louisiana-6pc',"Boneless Louisiana Rub (6 pc)",       "Wingstop",      '6 pc',       510,  33, 40, 26,  6, 105, 1620, 1,  0),
  rf('seed-ws-boneless-bbq-6pc',      "Boneless Hickory Smoked BBQ (6 pc)",  "Wingstop",      '6 pc',       560,  33, 48, 27,  6, 105, 1700, 1,  2),
  rf('seed-ws-boneless-mango-6pc',    "Boneless Mango Habanero (6 pc)",      "Wingstop",      '6 pc',       580,  33, 49, 27,  6, 105, 1660, 1,  3),
  rf('seed-ws-boneless-atomic-6pc',   "Boneless Atomic (6 pc)",              "Wingstop",      '6 pc',       545,  34, 40, 27,  6, 105, 1760, 1,  1),
  rf('seed-ws-boneless-korean-6pc',   "Boneless Spicy Korean Q (6 pc)",      "Wingstop",      '6 pc',       570,  33, 48, 27,  6, 105, 1730, 1,  2),
  rf('seed-ws-boneless-hawaiian-6pc', "Boneless Hawaiian (6 pc)",            "Wingstop",      '6 pc',       575,  33, 48, 27,  6, 105, 1570, 1,  3),
  // Chicken Sandwiches
  rf('seed-ws-sandwich-classic',      "Chicken Sandwich, Classic",           "Wingstop",      '1 sandwich', 490,  29, 58, 14,  3,  70, 1290, 2,  7),
  rf('seed-ws-sandwich-spicy',        "Chicken Sandwich, Spicy",             "Wingstop",      '1 sandwich', 510,  29, 58, 16,  3,  70, 1460, 2,  7),
  rf('seed-ws-sandwich-lemon',        "Chicken Sandwich, Lemon Pepper",      "Wingstop",      '1 sandwich', 560,  29, 59, 22,  4,  70, 1450, 2,  7),
  // Tenders
  rf('seed-ws-tenders-3pc',           "Chicken Tenders (3 pc)",              "Wingstop",      '3 tenders',  330,  30, 16, 17,  3,  80,  820, 1,  0),
  rf('seed-ws-tenders-5pc',           "Chicken Tenders (5 pc)",              "Wingstop",      '5 tenders',  550,  50, 27, 28,  5, 135, 1370, 1,  0),
  // Sides
  rf('seed-ws-seasoned-fries-reg',    "Seasoned Fries (Regular)",            "Wingstop",      '1 regular',  310,   4, 41, 15,  3,   0,  840, 3,  0),
  rf('seed-ws-seasoned-fries-lg',     "Seasoned Fries (Large)",              "Wingstop",      '1 large',    510,   7, 67, 25,  5,   0, 1380, 5,  0),
  rf('seed-ws-cheese-fries-reg',      "Cheese Fries (Regular)",              "Wingstop",      '1 regular',  440,  10, 46, 24,  8,  30, 1160, 3,  1),
  rf('seed-ws-cheese-fries-lg',       "Cheese Fries (Large)",                "Wingstop",      '1 large',    640,  15, 72, 35, 12,  45, 1700, 4,  1),
  rf('seed-ws-loaded-fries',          "Loaded Fries",                        "Wingstop",      '1 order',    760,  22, 73, 43, 14,  70, 1880, 4,  2),
  rf('seed-ws-cajun-fries-reg',       "Cajun Fries (Regular)",               "Wingstop",      '1 regular',  320,   4, 42, 15,  3,   0,  930, 3,  0),
  rf('seed-ws-corn',                  "Corn on the Cob",                     "Wingstop",      '1 ear',      140,   3, 24,  5,  1,   0,  260, 3,  5),
  rf('seed-ws-veggie-sticks',         "Veggie Sticks (Celery & Carrots)",    "Wingstop",      '1 order',     25,   1,  5,  0,  0,   0,   65, 2,  3),
  rf('seed-ws-coleslaw',              "Coleslaw",                            "Wingstop",      '1 side',     170,   1, 20,  9,  1,  10,  260, 1,  8),
  // Dips & Sauces
  rf('seed-ws-ranch',                 "Ranch Dip",                           "Wingstop",      '1 container',170,   0,  2, 18,  3,  10,  260, 0,  1),
  rf('seed-ws-bleu-cheese',           "Bleu Cheese Dip",                     "Wingstop",      '1 container',180,   1,  2, 19,  4,  20,  330, 0,  1),
  rf('seed-ws-honey-mustard',         "Honey Mustard Dip",                   "Wingstop",      '1 container',160,   0, 10, 14,  2,  10,  230, 0,  5),
  rf('seed-ws-bbq-sauce',             "BBQ Sauce",                           "Wingstop",      '1 container', 60,   0, 14,  0,  0,   0,  290, 0, 10),
  rf('seed-ws-buffalo-sauce',         "Classic Buffalo Sauce",               "Wingstop",      '1 container', 80,   0,  2,  8,  1,   0,  780, 0,  0),

  // ── Five Guys ───────────────────────────────────────────────────
  rf('seed-fg-little-hamburger',      "Little Hamburger",                    "Five Guys",     '1 burger',   550,  26, 40, 26, 11,  80,  380, 2,  9),
  rf('seed-fg-little-cheeseburger',   "Little Cheeseburger",                 "Five Guys",     '1 burger',   610,  29, 40, 32, 14, 100,  580, 2,  9),
  rf('seed-fg-hamburger',             "Hamburger",                           "Five Guys",     '1 burger',   700,  40, 40, 43, 17, 145,  430, 2,  9),
  rf('seed-fg-cheeseburger',          "Cheeseburger",                        "Five Guys",     '1 burger',   840,  46, 40, 55, 23, 185,  830, 2,  9),
  rf('seed-fg-bacon-burger',          "Bacon Burger",                        "Five Guys",     '1 burger',   780,  44, 40, 48, 19, 160,  680, 2,  9),
  rf('seed-fg-bacon-cheeseburger',    "Bacon Cheeseburger",                  "Five Guys",     '1 burger',   920,  50, 40, 60, 25, 200, 1080, 2,  9),
  rf('seed-fg-little-bacon-chz',      "Little Bacon Cheeseburger",           "Five Guys",     '1 burger',   690,  33, 40, 37, 16, 115,  830, 2,  9),
  rf('seed-fg-hot-dog',               "Hot Dog",                             "Five Guys",     '1 hot dog',  540,  21, 40, 32, 12,  65,  860, 2,  9),
  rf('seed-fg-veggie-sandwich',       "Veggie Sandwich",                     "Five Guys",     '1 sandwich', 440,  17, 60, 15,  5,  25,  530, 5, 12),
  rf('seed-fg-reg-fries',             "Regular Fries",                       "Five Guys",     '1 regular',  953,  13,131, 41,  7,   0,  962, 9,  1),
  rf('seed-fg-cajun-fries',           "Cajun Fries (Regular)",               "Five Guys",     '1 regular',  953,  13,131, 41,  7,   0, 1327, 9,  1),

  // ── Shake Shack ─────────────────────────────────────────────────
  rf('seed-ss-shackburger',           "ShackBurger",                         "Shake Shack",   '1 burger',   500,  26, 40, 28, 11,  80,  820, 2,  9),
  rf('seed-ss-double-shackburger',    "Double ShackBurger",                  "Shake Shack",   '1 burger',   770,  47, 41, 49, 22, 160, 1230, 2,  9),
  rf('seed-ss-smokeshack',            "SmokeShack",                          "Shake Shack",   '1 burger',   590,  32, 41, 34, 14, 100, 1110, 2, 11),
  rf('seed-ss-shack-stack',           "Shack Stack",                         "Shake Shack",   '1 burger',   720,  40, 51, 41, 16, 130, 1060, 3, 13),
  rf('seed-ss-chicken-shack',         "Chicken Shack",                       "Shake Shack",   '1 sandwich', 660,  40, 55, 29,  7, 105, 1400, 2,  7),
  rf('seed-ss-crinkle-fries',         "Crinkle Cut Fries",                   "Shake Shack",   '1 regular',  470,   8, 60, 21,  5,   0, 1050, 6,  1),
  rf('seed-ss-cheese-fries',          "Cheese Fries",                        "Shake Shack",   '1 regular',  620,  15, 66, 33, 12,  30, 1530, 6,  4),
  rf('seed-ss-chicago-dog',           "Shack-cago Dog",                      "Shake Shack",   '1 hot dog',  400,  14, 41, 20,  7,  40, 1090, 2, 10),
  rf('seed-ss-vanilla-shake',         "Vanilla Shake",                       "Shake Shack",   '1 shake',    760,  16,103, 31, 19, 120,  510, 0, 89),
  rf('seed-ss-chocolate-shake',       "Chocolate Shake",                     "Shake Shack",   '1 shake',    770,  16,109, 31, 19, 120,  540, 1, 94),

  // ── Whataburger ─────────────────────────────────────────────────
  rf('seed-wb-whataburger',           "Whataburger",                         "Whataburger",   '1 burger',   590,  31, 62, 26,  9,  85, 1090, 3, 11),
  rf('seed-wb-double-whataburger',    "Double Meat Whataburger",             "Whataburger",   '1 burger',   820,  52, 62, 42, 16, 165, 1420, 3, 11),
  rf('seed-wb-triple-whataburger',    "Triple Meat Whataburger",             "Whataburger",   '1 burger',  1050,  73, 62, 59, 23, 245, 1740, 3, 11),
  rf('seed-wb-bacon-cheese',          "Bacon & Cheese Whataburger",          "Whataburger",   '1 burger',   700,  37, 62, 35, 13, 110, 1500, 3, 11),
  rf('seed-wb-spicy-chicken',         "Spicy Chicken Sandwich",              "Whataburger",   '1 sandwich', 510,  24, 57, 22,  4,  55, 1200, 2,  8),
  rf('seed-wb-honey-bbq-strip',       "Honey BBQ Chicken Strip Sandwich",    "Whataburger",   '1 sandwich', 720,  31, 84, 28,  5,  60, 1450, 3, 34),
  rf('seed-wb-whatachickn',           "Whatachick'n Sandwich",               "Whataburger",   '1 sandwich', 560,  25, 56, 26,  5,  60, 1220, 2,  8),
  rf('seed-wb-whatachickn-strips',    "Whatachick'n Strips (3 pc)",          "Whataburger",   '3 strips',   440,  29, 25, 25,  5,  70, 1180, 1,  1),
  rf('seed-wb-fries-med',             "French Fries (Medium)",               "Whataburger",   '1 medium',   380,   5, 50, 18,  3,   0,  470, 4,  0),
  rf('seed-wb-onion-rings-med',       "Onion Rings (Medium)",                "Whataburger",   '1 medium',   430,   6, 53, 22,  4,   0,  660, 3,  8),
  rf('seed-wb-taquito',               "Taquito with Cheese (Breakfast)",     "Whataburger",   '1 taquito',  380,  18, 25, 23, 10, 290,  780, 1,  1),
  rf('seed-wb-brekfast-bun',          "Breakfast on a Bun (Sausage/Egg)",    "Whataburger",   '1 sandwich', 480,  20, 36, 29, 11, 265, 1100, 1,  4),
  rf('seed-wb-cinnamon-roll',         "Cinnamon Roll",                       "Whataburger",   '1 roll',     420,   6, 60, 18,  5,  30,  520, 1, 26),

  // ── Culver's ────────────────────────────────────────────────────
  rf('seed-culv-butterburger',        "ButterBurger (Single)",               "Culver's",      '1 burger',   380,  22, 33, 16,  6,  65,  500, 1,  7),
  rf('seed-culv-butterburger-chz',    "ButterBurger with Cheese",            "Culver's",      '1 burger',   430,  25, 34, 20,  9,  80,  710, 1,  7),
  rf('seed-culv-dbl-butterburger-chz',"Double ButterBurger with Cheese",     "Culver's",      '1 burger',   640,  42, 35, 35, 16, 155, 1070, 1,  7),
  rf('seed-culv-bacon-deluxe',        "Bacon Deluxe (Single)",               "Culver's",      '1 burger',   530,  28, 37, 30, 11,  95,  860, 2,  9),
  rf('seed-culv-crispy-chicken',      "Crispy Chicken Sandwich",             "Culver's",      '1 sandwich', 590,  27, 55, 29,  6,  65, 1240, 2,  8),
  rf('seed-culv-fish-sandwich',       "Fish Sandwich",                       "Culver's",      '1 sandwich', 460,  18, 45, 22,  5,  55,  870, 1,  6),
  rf('seed-culv-tenders-3pc',         "Chicken Tenders (3 pc)",              "Culver's",      '3 pieces',   400,  27, 27, 21,  4,  65, 1040, 1,  0),
  rf('seed-culv-cheese-curds',        "Cheese Curds (Regular)",              "Culver's",      '1 regular',  520,  23, 41, 30, 14,  65, 1380, 1,  5),
  rf('seed-culv-fries-reg',           "Crinkle Cut Fries (Regular)",         "Culver's",      '1 regular',  340,   5, 44, 16,  3,   0,  410, 4,  0),
  rf('seed-culv-concrete-oreo',       "Concrete Mixer (Vanilla/Oreo)",       "Culver's",      '1 regular',  740,  16, 95, 32, 18, 100,  490, 1, 72),
  rf('seed-culv-vanilla-custard',     "Vanilla Custard (Dish)",              "Culver's",      '1 dish',     340,   8, 42, 16,  9,  90,  170, 0, 34),

  // ── Sonic Drive-In ──────────────────────────────────────────────
  rf('seed-sonic-classic-chzbrgr',    "Classic Cheeseburger",                "Sonic",         '1 burger',   710,  34, 52, 40, 15, 100, 1060, 2, 10),
  rf('seed-sonic-supersonic-dbl',     "SuperSONIC Double Cheeseburger",      "Sonic",         '1 burger',   980,  57, 53, 59, 24, 185, 1450, 2, 11),
  rf('seed-sonic-bacon-toaster',      "Bacon Cheeseburger Toaster",          "Sonic",         '1 burger',   840,  43, 63, 46, 17, 115, 1560, 3,  8),
  rf('seed-sonic-jr-deluxe',          "Jr. Deluxe Cheeseburger",             "Sonic",         '1 burger',   430,  20, 34, 24,  9,  60,  690, 1,  7),
  rf('seed-sonic-chkn-strip-dinner',  "Chicken Strip Dinner (3 pc)",         "Sonic",         '1 dinner',   720,  32, 73, 31,  6,  55, 1620, 4,  5),
  rf('seed-sonic-crispy-chkn',        "Crispy Chicken Sandwich",             "Sonic",         '1 sandwich', 630,  28, 62, 29,  5,  55, 1200, 2,  7),
  rf('seed-sonic-grilled-chkn',       "Grilled Chicken Sandwich",            "Sonic",         '1 sandwich', 430,  35, 43, 12,  2,  85, 1010, 2,  8),
  rf('seed-sonic-classic-hotdog',     "Classic Hot Dog",                     "Sonic",         '1 hot dog',  380,  12, 33, 22,  8,  40,  870, 1,  6),
  rf('seed-sonic-corn-dog',           "Corn Dog",                            "Sonic",         '1 corn dog', 210,   6, 23, 11,  3,  25,  480, 1,  6),
  rf('seed-sonic-chili-cheese-coney', "Chili Cheese Coney",                  "Sonic",         '1 hot dog',  370,  16, 31, 21,  9,  50,  930, 2,  5),
  rf('seed-sonic-onion-rings-med',    "Onion Rings (Medium)",                "Sonic",         '1 medium',   440,   5, 54, 22,  4,   0,  740, 3,  6),
  rf('seed-sonic-tater-tots-med',     "Tater Tots (Medium)",                 "Sonic",         '1 medium',   310,   3, 39, 16,  3,   0,  560, 3,  0),
  rf('seed-sonic-mozz-sticks',        "Mozzarella Sticks (4 pc)",            "Sonic",         '4 pieces',   430,  18, 38, 23, 10,  40, 1040, 1,  3),
  rf('seed-sonic-fries-med',          "French Fries (Medium)",               "Sonic",         '1 medium',   350,   4, 46, 17,  3,   0,  380, 3,  0),
  rf('seed-sonic-vanilla-shake-med',  "Vanilla Shake (Medium)",              "Sonic",         '1 medium',   540,  14, 76, 21, 13,  75,  350, 0, 65),
  rf('seed-sonic-choc-shake-med',     "Chocolate Shake (Medium)",            "Sonic",         '1 medium',   580,  14, 84, 21, 13,  75,  380, 1, 72),
  rf('seed-sonic-cherry-limeade-med', "Cherry Limeade (Medium)",             "Sonic",         '1 medium',   180,   0, 46,  0,  0,   0,   15, 0, 44),
  rf('seed-sonic-oreo-blast-med',     "Sonic Blast Oreo (Medium)",           "Sonic",         '1 medium',   690,  15, 96, 27, 16,  80,  500, 1, 76),

  // ── Arby's ──────────────────────────────────────────────────────
  rf('seed-arb-classic-roast-beef',   "Classic Roast Beef",                  "Arby's",        '1 sandwich', 360,  23, 37, 14,  5,  55,  970, 1,  5),
  rf('seed-arb-med-roast-beef',       "Medium Roast Beef",                   "Arby's",        '1 sandwich', 410,  27, 38, 15,  6,  65, 1130, 1,  5),
  rf('seed-arb-beef-n-cheddar',       "Beef 'n Cheddar (Original)",          "Arby's",        '1 sandwich', 450,  26, 44, 18,  7,  70, 1310, 1,  9),
  rf('seed-arb-french-dip-swiss',     "French Dip & Swiss",                  "Arby's",        '1 sandwich', 500,  35, 46, 18,  8,  95, 1660, 2,  5),
  rf('seed-arb-reuben',               "Reuben",                              "Arby's",        '1 sandwich', 680,  43, 52, 33, 14, 130, 2280, 3,  9),
  rf('seed-arb-turkey-club-wrap',     "Turkey Club Wrap",                    "Arby's",        '1 wrap',     560,  36, 44, 26,  8,  95, 1540, 3,  4),
  rf('seed-arb-chkn-bacon-swiss',     "Chicken Bacon Swiss (Crispy)",        "Arby's",        '1 sandwich', 680,  38, 57, 32,  9, 100, 1560, 2,  7),
  rf('seed-arb-loaded-curly-fries',   "Loaded Curly Fries",                  "Arby's",        '1 order',    650,  17, 67, 36, 10,  40, 1720, 5,  2),
  rf('seed-arb-curly-fries-med',      "Curly Fries (Medium)",                "Arby's",        '1 medium',   410,   6, 51, 20,  4,   0, 1010, 4,  0),
  rf('seed-arb-mozz-sticks',          "Mozzarella Sticks (4 pc)",            "Arby's",        '4 pieces',   430,  18, 38, 23, 10,  40, 1050, 2,  3),
  rf('seed-arb-jalapeno-bites',       "Jalapeño Bites (5 pc)",               "Arby's",        '5 pieces',   290,   7, 33, 15,  6,  15,  680, 1,  3),
  rf('seed-arb-choc-shake-med',       "Chocolate Shake (Medium)",            "Arby's",        '1 medium',   660,  15,105, 20, 13,  70,  530, 1, 88),
  rf('seed-arb-vanilla-shake-med',    "Vanilla Shake (Medium)",              "Arby's",        '1 medium',   570,  14, 88, 18, 12,  65,  470, 0, 73),
  rf('seed-arb-horsey-sauce',         "Horsey Sauce",                        "Arby's",        '1 packet',    60,   0,  3,  5,  1,   5,  150, 0,  2),

  // ── Dairy Queen ─────────────────────────────────────────────────
  rf('seed-dq-burger',                "DQ Burger",                           "Dairy Queen",   '1 burger',   350,  18, 34, 15,  6,  50,  630, 1,  7),
  rf('seed-dq-cheeseburger',          "Cheeseburger",                        "Dairy Queen",   '1 burger',   400,  22, 35, 18,  8,  65,  820, 1,  7),
  rf('seed-dq-flamethrower',          "FlameThrower GrillBurger",            "Dairy Queen",   '1 burger',  1030,  54, 57, 66, 27, 190, 1720, 2, 12),
  rf('seed-dq-bacon-dbl-chzbrgr',     "Bacon Double Cheeseburger",           "Dairy Queen",   '1 burger',   680,  43, 35, 40, 18, 145, 1270, 1,  8),
  rf('seed-dq-chkn-strip-basket',     "Chicken Strip Basket (4 pc)",         "Dairy Queen",   '1 basket',  1070,  43,103, 51,  9,  85, 2440, 4,  4),
  rf('seed-dq-crispy-chkn-sndwch',    "Crispy Chicken Sandwich",             "Dairy Queen",   '1 sandwich', 590,  26, 61, 27,  5,  55, 1200, 2,  7),
  rf('seed-dq-hot-dog',               "Hot Dog",                             "Dairy Queen",   '1 hot dog',  290,  11, 23, 17,  6,  30,  730, 1,  5),
  rf('seed-dq-chili-cheese-dog',      "Chili Cheese Dog",                    "Dairy Queen",   '1 hot dog',  400,  16, 30, 24, 10,  55, 1090, 2,  6),
  rf('seed-dq-blizzard-oreo-med',     "Blizzard Oreo (Medium)",              "Dairy Queen",   '1 medium',   690,  15, 99, 25, 14,  65,  480, 1, 74),
  rf('seed-dq-blizzard-reeses-med',   "Blizzard Reese's (Medium)",           "Dairy Queen",   '1 medium',   830,  20,107, 38, 18,  70,  520, 2, 88),
  rf('seed-dq-blizzard-oreo-sm',      "Blizzard Oreo (Small)",               "Dairy Queen",   '1 small',    490,  10, 71, 18, 10,  45,  340, 1, 53),
  rf('seed-dq-vanilla-cone-med',      "Vanilla Soft Serve Cone (Medium)",    "Dairy Queen",   '1 cone',     330,   8, 53,  9,  6,  30,  160, 0, 40),
  rf('seed-dq-dipped-cone-med',       "Dipped Cone (Medium)",                "Dairy Queen",   '1 cone',     490,   9, 65, 23, 14,  30,  200, 1, 50),
  rf('seed-dq-banana-split',          "Banana Split",                        "Dairy Queen",   '1 serving',  510,   8, 96, 12,  8,  30,  180, 3, 78),
  rf('seed-dq-peanut-buster-parfait', "Peanut Buster Parfait",               "Dairy Queen",   '1 serving',  700,  16, 99, 29, 14,  35,  390, 3, 80),
  rf('seed-dq-choc-sundae-med',       "Chocolate Sundae (Medium)",           "Dairy Queen",   '1 medium',   400,   8, 66, 11,  7,  30,  200, 1, 54),
  rf('seed-dq-fries-reg',             "Regular Fries",                       "Dairy Queen",   '1 regular',  300,   4, 41, 13,  2,   0,  530, 3,  0),
  rf('seed-dq-onion-rings-reg',       "Onion Rings (Regular)",               "Dairy Queen",   '1 regular',  360,   5, 47, 17,  3,   0,  740, 2,  5),

  // ── Jack in the Box ─────────────────────────────────────────────
  rf('seed-jitb-jumbo-jack',          "Jumbo Jack",                          "Jack in the Box",'1 burger',  600,  27, 51, 32, 11,  70,  910, 2, 10),
  rf('seed-jitb-jumbo-jack-chz',      "Jumbo Jack with Cheese",              "Jack in the Box",'1 burger',  690,  32, 54, 38, 15,  90, 1190, 2, 11),
  rf('seed-jitb-sourdough-jack',      "Sourdough Jack",                      "Jack in the Box",'1 burger',  720,  35, 43, 46, 17, 110, 1230, 2,  8),
  rf('seed-jitb-bacon-ult-chzbrgr',   "Bacon Ultimate Cheeseburger",         "Jack in the Box",'1 burger', 1090,  59, 53, 74, 30, 220, 1760, 2, 11),
  rf('seed-jitb-buttery-jack',        "Classic Buttery Jack",                "Jack in the Box",'1 burger',  870,  40, 56, 55, 22, 135, 1310, 2, 11),
  rf('seed-jitb-spicy-chkn',          "Spicy Chicken Sandwich",              "Jack in the Box",'1 sandwich',560,  24, 57, 26,  5,  50, 1110, 2,  7),
  rf('seed-jitb-teriyaki-bowl',       "Chicken Teriyaki Bowl",               "Jack in the Box",'1 bowl',    670,  35,110,  9,  2,  65, 1620, 3, 18),
  rf('seed-jitb-egg-rolls',           "Egg Rolls (3 pc)",                    "Jack in the Box",'3 pieces',  400,  12, 43, 20,  6,  25,  680, 3,  3),
  rf('seed-jitb-tacos-2pc',           "Tacos (2 pc)",                        "Jack in the Box",'2 tacos',   340,  14, 32, 18,  7,  25,  620, 4,  2),
  rf('seed-jitb-curly-fries-med',     "Seasoned Curly Fries (Medium)",       "Jack in the Box",'1 medium',  400,   6, 49, 20,  4,   0,  870, 4,  0),
  rf('seed-jitb-fries-med',           "Regular Fries (Medium)",              "Jack in the Box",'1 medium',  380,   5, 47, 19,  4,   0,  590, 4,  0),
  rf('seed-jitb-mini-churros',        "Mini Churros (5 pc)",                 "Jack in the Box",'5 pieces',  230,   3, 34,  9,  2,   0,  220, 1, 10),

  // ── Hardee's / Carl's Jr. ───────────────────────────────────────
  rf('seed-hrd-orig-thickburger',     "Original Thickburger (1/3 lb)",       "Hardee's",      '1 burger',   700,  33, 49, 41, 16, 110, 1190, 2,  9),
  rf('seed-hrd-dbl-thickburger',      "Double Thickburger (2/3 lb)",         "Hardee's",      '1 burger',  1060,  59, 50, 72, 29, 220, 1650, 2,  9),
  rf('seed-hrd-bacon-chz-thickbrgr',  "Bacon Cheese Thickburger (1/3 lb)",   "Hardee's",      '1 burger',   820,  41, 50, 50, 20, 135, 1620, 2,  9),
  rf('seed-hrd-famous-star',          "Famous Star with Cheese",             "Hardee's",      '1 burger',   700,  32, 53, 39, 14, 100, 1180, 2, 11),
  rf('seed-hrd-super-star',           "Super Star with Cheese",              "Hardee's",      '1 burger',   930,  51, 54, 56, 22, 175, 1570, 2, 11),
  rf('seed-hrd-spicy-chkn',           "Spicy Chicken Sandwich",              "Hardee's",      '1 sandwich', 510,  26, 52, 22,  4,  55, 1300, 2,  6),
  rf('seed-hrd-tenders-3pc',          "Hand-Breaded Chicken Tenders (3 pc)", "Hardee's",      '3 pieces',   370,  24, 25, 19,  4,  70,  870, 1,  1),
  rf('seed-hrd-fries-med',            "Natural Cut Fries (Medium)",          "Hardee's",      '1 medium',   430,   5, 57, 20,  4,   0,  640, 5,  0),
  rf('seed-hrd-monster-biscuit',      "Monster Biscuit (Breakfast)",         "Hardee's",      '1 biscuit',  780,  37, 43, 52, 18, 330, 2230, 1,  3),
  rf('seed-hrd-loaded-omelet-biscuit',"Loaded Omelet Biscuit",               "Hardee's",      '1 biscuit',  640,  27, 44, 41, 14, 260, 1760, 1,  4),
  rf('seed-hrd-biscuit-gravy',        "Made From Scratch Biscuit & Gravy",   "Hardee's",      '1 order',    510,  11, 53, 28, 10,  25, 1560, 2,  5),

  // ── Pizza Hut ───────────────────────────────────────────────────
  rf('seed-ph-personal-pepperoni',    "Personal Pan Pepperoni Pizza",        "Pizza Hut",     '1 pizza',    600,  28, 68, 24, 10,  60, 1340, 4,  6),
  rf('seed-ph-personal-cheese',       "Personal Pan Cheese Pizza",           "Pizza Hut",     '1 pizza',    520,  24, 68, 18,  8,  40, 1080, 4,  6),
  rf('seed-ph-ht-pepperoni-slice',    "Pepperoni (Large Hand Tossed)",       "Pizza Hut",     '1 slice',    240,  11, 27,  9,  4,  25,  560, 1,  2),
  rf('seed-ph-ht-cheese-slice',       "Cheese (Large Hand Tossed)",          "Pizza Hut",     '1 slice',    210,  10, 27,  7,  3,  20,  470, 1,  2),
  rf('seed-ph-tn-pepperoni-slice',    "Pepperoni (Large Thin N Crispy)",     "Pizza Hut",     '1 slice',    190,   9, 20,  8,  4,  25,  490, 1,  1),
  rf('seed-ph-sc-pepperoni-slice',    "Pepperoni (Large Stuffed Crust)",     "Pizza Hut",     '1 slice',    310,  14, 35, 12,  6,  35,  760, 2,  3),
  rf('seed-ph-meat-lovers-slice',     "Meat Lovers (Large Hand Tossed)",     "Pizza Hut",     '1 slice',    320,  15, 27, 16,  6,  45,  840, 1,  2),
  rf('seed-ph-supreme-slice',         "Supreme (Large Hand Tossed)",         "Pizza Hut",     '1 slice',    260,  12, 29, 11,  5,  30,  630, 2,  3),
  rf('seed-ph-breadsticks',           "Breadsticks (2 pc)",                  "Pizza Hut",     '2 pieces',   170,   5, 28,  5,  1,   0,  290, 1,  2),
  rf('seed-ph-cheese-breadsticks',    "Cheese Breadsticks (2 pc)",           "Pizza Hut",     '2 pieces',   210,   8, 28,  8,  4,  15,  430, 1,  2),
  rf('seed-ph-boneless-wings-8pc',    "Boneless Wings (8 pc)",               "Pizza Hut",     '8 pieces',   560,  36, 40, 26,  5, 100, 1560, 2,  4),
  rf('seed-ph-trad-wings-8pc',        "Traditional Wings (8 pc)",            "Pizza Hut",     '8 pieces',   560,  52,  4, 36, 10, 220, 1560, 0,  0),

  // ── Little Caesars ──────────────────────────────────────────────
  rf('seed-lc-hot-n-ready-pepperoni', "Hot-N-Ready Pepperoni (1 slice)",     "Little Caesars",'1 slice',    280,  13, 30, 12,  5,  30,  630, 1,  2),
  rf('seed-lc-hot-n-ready-cheese',    "Hot-N-Ready Cheese (1 slice)",        "Little Caesars",'1 slice',    250,  12, 30,  9,  4,  20,  520, 1,  2),
  rf('seed-lc-deep-dish-pepperoni',   "Deep Dish Pepperoni (1 slice)",       "Little Caesars",'1 slice',    360,  16, 38, 16,  6,  40,  840, 2,  3),
  rf('seed-lc-deep-dish-cheese',      "Deep Dish Cheese (1 slice)",          "Little Caesars",'1 slice',    320,  14, 38, 13,  5,  25,  700, 2,  3),
  rf('seed-lc-thin-crust-pepperoni',  "Thin Crust Pepperoni (1 slice)",      "Little Caesars",'1 slice',    200,  10, 18,  9,  4,  25,  530, 1,  1),
  rf('seed-lc-extramostbestest',      "ExtraMostBestest Pepperoni (1 slice)","Little Caesars",'1 slice',    300,  15, 30, 13,  6,  35,  710, 1,  2),
  rf('seed-lc-crazy-bread',           "Crazy Bread (1 piece)",               "Little Caesars",'1 piece',    100,   3, 16,  3,  1,   0,  150, 0,  1),
  rf('seed-lc-italian-cheese-bread',  "Italian Cheese Bread (1 piece)",      "Little Caesars",'1 piece',    150,   6, 17,  7,  3,  15,  310, 1,  1),
  rf('seed-lc-caesar-wings-4pc',      "Caesar Wings (4 pc)",                 "Little Caesars",'4 pieces',   280,  24,  0, 20,  6, 110,  640, 0,  0),

  // ── Papa John's ─────────────────────────────────────────────────
  rf('seed-pj-orig-pepperoni-slice',  "Original Crust Pepperoni (1 slice)",  "Papa John's",   '1 slice',    280,  12, 34, 10,  5,  25,  680, 2,  4),
  rf('seed-pj-orig-cheese-slice',     "Original Crust Cheese (1 slice)",     "Papa John's",   '1 slice',    250,  11, 34,  9,  4,  20,  570, 2,  4),
  rf('seed-pj-thin-pepperoni-slice',  "Thin Crust Pepperoni (1 slice)",      "Papa John's",   '1 slice',    210,  10, 22,  9,  4,  25,  600, 1,  2),
  rf('seed-pj-stuffed-pepperoni-sl',  "Stuffed Crust Pepperoni (1 slice)",   "Papa John's",   '1 slice',    360,  16, 41, 14,  7,  40,  890, 2,  5),
  rf('seed-pj-the-works-slice',       "The Works (1 slice)",                 "Papa John's",   '1 slice',    300,  13, 35, 12,  5,  30,  720, 2,  5),
  rf('seed-pj-garlic-parm-breadstick',"Garlic Parmesan Breadstick",          "Papa John's",   '1 stick',    150,   4, 22,  5,  2,   0,  280, 1,  2),
  rf('seed-pj-cheesestick',           "Cheesestick",                         "Papa John's",   '1 stick',    170,   7, 22,  6,  3,  15,  340, 1,  2),
  rf('seed-pj-wings-4pc',             "Papa's Wings (4 pc)",                 "Papa John's",   '4 pieces',   220,  22,  2, 14,  4,  95,  590, 0,  0),
  rf('seed-pj-cinnapie-slice',        "Cinnapie (1 slice)",                  "Papa John's",   '1 slice',    170,   3, 27,  6,  2,   0,  180, 1, 10),

  // ── Panda Express ───────────────────────────────────────────────
  rf('seed-pe-orange-chicken',        "Orange Chicken",                      "Panda Express", '1 entree',   420,  15, 43, 21,  4,  90,  820, 0, 19),
  rf('seed-pe-beijing-beef',          "Beijing Beef",                        "Panda Express", '1 entree',   470,  13, 46, 26,  5,  45,  620, 2, 25),
  rf('seed-pe-broccoli-beef',         "Broccoli Beef",                       "Panda Express", '1 entree',   150,   9, 13,  7,  2,  15,  520, 2,  5),
  rf('seed-pe-kung-pao-chicken',      "Kung Pao Chicken",                    "Panda Express", '1 entree',   290,  16, 23, 14,  3,  65,  870, 3, 12),
  rf('seed-pe-black-pepper-chicken',  "Black Pepper Chicken",                "Panda Express", '1 entree',   280,  17, 19, 14,  3,  80, 1000, 2,  7),
  rf('seed-pe-honey-walnut-shrimp',   "Honey Walnut Shrimp",                 "Panda Express", '1 entree',   360,  13, 35, 23,  4,  90,  520, 1, 19),
  rf('seed-pe-string-bean-chicken',   "String Bean Chicken Breast",          "Panda Express", '1 entree',   190,  14, 14,  9,  2,  40,  810, 3,  5),
  rf('seed-pe-chow-mein',             "Chow Mein",                           "Panda Express", '1 side',     510,  16, 82, 15,  2,   0,  860, 5,  8),
  rf('seed-pe-fried-rice',            "Fried Rice",                          "Panda Express", '1 side',     620,  18, 96, 18,  4, 150,  890, 3,  3),
  rf('seed-pe-white-rice',            "White Steamed Rice",                  "Panda Express", '1 side',     380,   7, 84,  0,  0,   0,    0, 1,  0),
  rf('seed-pe-super-greens',          "Super Greens",                        "Panda Express", '1 side',     130,   6, 13,  6,  1,   0,  530, 5,  6),
  rf('seed-pe-cream-cheese-rangoon',  "Cream Cheese Rangoon (3 pc)",         "Panda Express", '3 pieces',   190,   5, 24,  8,  4,  25,  180, 1,  5),
  rf('seed-pe-egg-roll',              "Chicken Egg Roll",                    "Panda Express", '1 piece',    200,   6, 20, 10,  2,  10,  390, 2,  2),
  rf('seed-pe-fortune-cookie',        "Fortune Cookie",                      "Panda Express", '1 cookie',    32,   0,  7,  0,  0,   0,   20, 0,  4),

  // ── Dunkin' ─────────────────────────────────────────────────────
  rf('seed-dun-glazed-donut',         "Original Glazed Donut",               "Dunkin'",       '1 donut',    260,   4, 33, 13,  6,   0,  260, 1, 13),
  rf('seed-dun-boston-kreme',         "Boston Kreme Donut",                  "Dunkin'",       '1 donut',    300,   4, 43, 13,  6,   0,  310, 1, 20),
  rf('seed-dun-choc-frosted-donut',   "Chocolate Frosted Donut",             "Dunkin'",       '1 donut',    270,   3, 36, 13,  6,   0,  260, 1, 17),
  rf('seed-dun-jelly-donut',          "Jelly Donut",                         "Dunkin'",       '1 donut',    290,   4, 40, 13,  5,   0,  280, 1, 15),
  rf('seed-dun-blueberry-muffin',     "Blueberry Muffin",                    "Dunkin'",       '1 muffin',   460,   6, 71, 17,  3,  55,  430, 2, 39),
  rf('seed-dun-corn-muffin',          "Corn Muffin",                         "Dunkin'",       '1 muffin',   390,   6, 63, 14,  2,  50,  590, 2, 22),
  rf('seed-dun-croissant',            "Croissant",                           "Dunkin'",       '1 croissant',340,   7, 36, 19, 11,  45,  370, 1,  6),
  rf('seed-dun-bagel-cream-cheese',   "Plain Bagel with Cream Cheese",       "Dunkin'",       '1 bagel',    430,  14, 67, 14,  7,  30,  820, 3,  9),
  rf('seed-dun-saus-egg-chz-crois',   "Sausage Egg & Cheese Croissant",      "Dunkin'",       '1 sandwich', 680,  25, 38, 48, 20, 245, 1110, 1,  7),
  rf('seed-dun-bacon-egg-chz-crois',  "Bacon Egg & Cheese Croissant",        "Dunkin'",       '1 sandwich', 510,  21, 37, 31, 15, 225,  970, 1,  7),
  rf('seed-dun-hash-browns',          "Hash Browns (6 pc)",                  "Dunkin'",       '6 pieces',   200,   2, 24, 10,  2,   0,  340, 2,  0),
  rf('seed-dun-med-latte',            "Medium Latte",                        "Dunkin'",       '14 fl oz',   120,   8, 11,  5,  3,  20,  115, 0, 11),
  rf('seed-dun-caramel-iced-latte',   "Medium Caramel Swirl Iced Latte",     "Dunkin'",       '24 fl oz',   310,   8, 53,  6,  4,  20,  135, 0, 50),
  rf('seed-dun-frozen-coffee-med',    "Medium Frozen Coffee",                "Dunkin'",       '24 fl oz',   440,   4, 90,  9,  6,  30,  230, 0, 75),
  rf('seed-dun-munchkins-5pc',        "Munchkins Glazed (5 pc)",             "Dunkin'",       '5 pieces',   200,   3, 26, 10,  5,   0,  170, 0, 10),

  // ── Denny's ─────────────────────────────────────────────────────
  rf('seed-den-grand-slam',           "Grand Slam Breakfast",                "Denny's",       '1 plate',    780,  36, 65, 42, 14, 490, 1810, 3, 14),
  rf('seed-den-classic-breakfast',    "Classic Breakfast",                   "Denny's",       '1 plate',    650,  28, 52, 38, 12, 430, 1540, 3,  8),
  rf('seed-den-lumberjack-slam',      "Lumberjack Slam",                     "Denny's",       '1 plate',   1010,  52, 72, 58, 18, 575, 2830, 4, 14),
  rf('seed-den-french-toast-slam',    "French Toast Slam",                   "Denny's",       '1 plate',    830,  35, 80, 42, 13, 470, 1680, 3, 25),
  rf('seed-den-buttermilk-pancakes',  "Buttermilk Pancakes (Short Stack 3)", "Denny's",       '3 pancakes', 430,   9, 82,  8,  3,  15, 1330, 2, 14),
  rf('seed-den-classic-burger',       "Classic Burger",                      "Denny's",       '1 burger',   760,  42, 54, 40, 16, 120, 1130, 2, 11),
  rf('seed-den-bacon-chzbrgr',        "Bacon Cheeseburger",                  "Denny's",       '1 burger',   890,  50, 55, 52, 22, 155, 1490, 2, 12),
  rf('seed-den-veggie-omelet',        "Loaded Veggie Omelet",                "Denny's",       '1 omelet',   490,  28, 14, 37, 14, 660,  960, 3,  5),
  rf('seed-den-moons-over-hammy',     "Moons Over My Hammy",                 "Denny's",       '1 sandwich', 740,  46, 47, 42, 17, 545, 2230, 2,  5),
  rf('seed-den-fit-slam',             "Fit Slam",                            "Denny's",       '1 plate',    390,  34, 41,  9,  3, 360,  730, 5, 11),
  rf('seed-den-seasoned-fries',       "Seasoned Fries",                      "Denny's",       '1 side',     430,   5, 54, 21,  4,   0,  780, 5,  0),
  rf('seed-den-mozzarella-sticks',    "Mozzarella Sticks (5 pc)",            "Denny's",       '5 pieces',   710,  26, 59, 40, 19,  85, 1620, 3,  5),

  // ── Waffle House ────────────────────────────────────────────────
  rf('seed-wh-plain-waffle',          "Waffle (Plain)",                      "Waffle House",  '1 waffle',   340,   7, 49, 13,  4,  55,  580, 1, 11),
  rf('seed-wh-pecan-waffle',          "Pecan Waffle",                        "Waffle House",  '1 waffle',   430,   9, 51, 21,  5,  55,  600, 2, 13),
  rf('seed-wh-blueberry-waffle',      "Blueberry Waffle",                    "Waffle House",  '1 waffle',   380,   7, 57, 13,  4,  55,  590, 2, 19),
  rf('seed-wh-scrambled-eggs',        "Scrambled Eggs (2)",                  "Waffle House",  '2 eggs',     180,  12,  2, 14,  4, 380,  170, 0,  1),
  rf('seed-wh-bacon-3strips',         "Bacon (3 strips)",                    "Waffle House",  '3 strips',   100,   8,  0,  8,  3,  25,  390, 0,  0),
  rf('seed-wh-sausage-patty',         "Sausage Patty",                       "Waffle House",  '1 patty',    200,   9,  1, 18,  6,  45,  430, 0,  0),
  rf('seed-wh-hashbrowns-plain',      "Hashbrowns (Scattered Plain)",        "Waffle House",  '1 serving',  260,   3, 36, 11,  2,   0,  350, 3,  0),
  rf('seed-wh-hashbrowns-sm-cov',     "Hashbrowns Scattered Smothered & Covered","Waffle House",'1 serving',390, 10, 42, 19,  6,  25,  780, 4,  3),
  rf('seed-wh-tbone-steak-eggs',      "T-Bone Steak & Eggs",                 "Waffle House",  '1 plate',    680,  58,  3, 47, 17, 460, 1040, 0,  1),
  rf('seed-wh-patty-melt',            "Patty Melt",                          "Waffle House",  '1 sandwich', 760,  38, 52, 45, 18, 110, 1280, 2,  7),
  rf('seed-wh-cheeseburger',          "Cheeseburger",                        "Waffle House",  '1 burger',   640,  35, 44, 36, 15, 100,  990, 2,  8),
  rf('seed-wh-grilled-chkn-sndwch',   "Grilled Chicken Sandwich",            "Waffle House",  '1 sandwich', 490,  38, 46, 15,  3,  95,  970, 2,  8),
  rf('seed-wh-cheese-omelet',         "Cheese Omelette",                     "Waffle House",  '1 omelet',   460,  26,  4, 38, 16, 680,  680, 0,  2),

  // ── IHOP ────────────────────────────────────────────────────────
  rf('seed-ihop-pancakes-short',      "Original Buttermilk Pancakes (2 pc)", "IHOP",          '2 pancakes', 430,   9, 65, 15,  4,  50, 1070, 1, 12),
  rf('seed-ihop-pancakes-full',       "Original Buttermilk Pancakes (4 pc)", "IHOP",          '4 pancakes', 750,  15,112, 24,  6,  90, 1820, 2, 21),
  rf('seed-ihop-colorado-omelet',     "Colorado Omelette",                   "IHOP",          '1 omelet',  1010,  57, 26, 76, 29, 745, 2180, 4,  6),
  rf('seed-ihop-bacon-temptation',    "Bacon Temptation Omelette",           "IHOP",          '1 omelet',   870,  45, 18, 69, 26, 710, 1540, 2,  4),
  rf('seed-ihop-eggs-benedict',       "Classic Eggs Benedict",               "IHOP",          '1 plate',    760,  34, 55, 46, 15, 455, 2060, 3,  6),
  rf('seed-ihop-chicken-and-waffles', "Chicken & Waffles",                   "IHOP",          '1 plate',   1160,  52,115, 55, 16, 205, 2700, 5, 21),
  rf('seed-ihop-2x2x2',               "2x2x2 (2 eggs/2 bacon/2 pancakes)",   "IHOP",          '1 plate',    590,  22, 56, 31,  9, 295, 1600, 1, 10),
  rf('seed-ihop-big-steak-omelet',    "Big Steak Omelette",                  "IHOP",          '1 omelet',  1180,  67, 36, 87, 33, 820, 2620, 4,  7),
  rf('seed-ihop-french-toast',        "Thick N Fluffy French Toast (2 pc)",  "IHOP",          '2 slices',   600,  13, 83, 24,  5, 110,  780, 2, 30),
  rf('seed-ihop-simple-fit-veggie',   "Simple & Fit Veggie Omelette",        "IHOP",          '1 omelet',   380,  25, 17, 25,  8, 615,  870, 3,  7),

  // ── 7-Eleven ────────────────────────────────────────────────────
  rf('seed-7e-big-gulp-coke',         "Big Gulp Coca-Cola (32 oz)",          "7-Eleven",      '32 fl oz',   290,   0, 79,  0,  0,   0,   20, 0, 79),
  rf('seed-7e-slurpee-coke',          "Slurpee Coca-Cola (22 oz)",           "7-Eleven",      '22 fl oz',   160,   0, 44,  0,  0,   0,   35, 0, 44),
  rf('seed-7e-big-bite-hotdog',       "Big Bite Hot Dog",                    "7-Eleven",      '1 hot dog',  370,  13, 23, 25,  9,  45,  890, 1,  4),
  rf('seed-7e-dbl-big-bite-hotdog',   "Double Big Bite Hot Dog",             "7-Eleven",      '1 hot dog',  540,  21, 24, 40, 15,  75, 1530, 1,  4),
  rf('seed-7e-taquito-chicken',       "Taquito – Chicken & Cheese",          "7-Eleven",      '1 taquito',  200,   9, 19, 10,  4,  25,  430, 1,  1),
  rf('seed-7e-taquito-beef',          "Taquito – Beef & Cheese",             "7-Eleven",      '1 taquito',  220,   9, 19, 12,  5,  30,  480, 1,  1),
  rf('seed-7e-roller-sausage',        "Roller Grill Sausage",                "7-Eleven",      '1 sausage',  280,  11,  3, 25,  9,  55,  680, 0,  1),
  rf('seed-7e-pizza-slice-pep',       "Pizza Slice – Pepperoni",             "7-Eleven",      '1 slice',    380,  16, 43, 16,  7,  35,  780, 2,  4),
  rf('seed-7e-glazed-donut',          "Glazed Donut",                        "7-Eleven",      '1 donut',    340,   4, 46, 16,  7,  15,  280, 1, 21),
  rf('seed-7e-bec-taquito',           "Bacon Egg & Cheese Taquito",          "7-Eleven",      '1 taquito',  230,  10, 20, 12,  4,  80,  510, 1,  1),

  // ── Wawa ────────────────────────────────────────────────────────
  rf('seed-wawa-sizzli-saus-biscuit', "Sizzli Egg/Cheese/Sausage (Biscuit)", "Wawa",          '1 sandwich', 560,  22, 38, 36, 14, 185, 1190, 1,  4),
  rf('seed-wawa-sizzli-bacon-crois',  "Sizzli Egg/Cheese/Bacon (Croissant)", "Wawa",          '1 sandwich', 430,  19, 32, 25, 11, 200,  970, 1,  6),
  rf('seed-wawa-italian-hoagie',      "Classic Italian Hoagie (Shorti)",     "Wawa",          '1 shorti',   680,  32, 58, 34, 12,  80, 1870, 3,  6),
  rf('seed-wawa-turkey-shorti',       "Turkey Shorti",                       "Wawa",          '1 shorti',   480,  28, 57, 14,  4,  55, 1430, 3,  6),
  rf('seed-wawa-meatball-shorti',     "Meatball Shorti",                     "Wawa",          '1 shorti',   620,  28, 66, 28, 11,  65, 1540, 4, 10),
  rf('seed-wawa-mac-cheese',          "Mac & Cheese (Bowl)",                 "Wawa",          '1 bowl',     540,  18, 64, 24, 12,  55, 1100, 3,  7),
  rf('seed-wawa-chicken-noodle-soup', "Chicken Noodle Soup (Cup)",           "Wawa",          '1 cup',      130,   9, 16,  3,  1,  25,  890, 1,  2),
  rf('seed-wawa-mango-smoothie',      "Mango Smoothie (Medium)",             "Wawa",          '1 medium',   290,   3, 68,  1,  0,   0,   45, 2, 58),

  // ── Sheetz ──────────────────────────────────────────────────────
  rf('seed-sht-mto-burger',           "MTO Burger 1/3 lb with Cheese",       "Sheetz",        '1 burger',   680,  38, 44, 39, 16, 115, 1020, 2,  8),
  rf('seed-sht-mto-crispy-chkn',      "MTO Crispy Chicken Sandwich",         "Sheetz",        '1 sandwich', 590,  28, 62, 26,  4,  55, 1180, 3,  8),
  rf('seed-sht-mto-bkfst-burrito',    "MTO Breakfast Burrito (Sausage)",     "Sheetz",        '1 burrito',  560,  26, 42, 32, 12, 240, 1150, 2,  3),
  rf('seed-sht-mto-mac-cheese',       "MTO Mac & Cheese",                    "Sheetz",        '1 order',    430,  14, 58, 16,  9,  40,  980, 2,  6),
  rf('seed-sht-fryz',                 "Fryz (Regular)",                      "Sheetz",        '1 regular',  380,   5, 52, 18,  3,   0,  620, 4,  0),
  rf('seed-sht-pretzel-bites',        "Pretzel Bites (8 pc)",                "Sheetz",        '8 pieces',   350,  10, 68,  4,  1,   0,  780, 2,  2),
  rf('seed-sht-shmuffin-saus',        "Shmuffin Egg/Cheese/Sausage",         "Sheetz",        '1 sandwich', 520,  24, 36, 30, 11, 230, 1080, 2,  5),
  rf('seed-sht-roller-hotdog',        "Roller Grill Hot Dog",                "Sheetz",        '1 hot dog',  290,  11, 22, 18,  7,  40,  730, 1,  3),

  // ── QuikTrip (QT) ───────────────────────────────────────────────
  rf('seed-qt-hot-dog',               "QT Kitchens Hot Dog",                 "QuikTrip",      '1 hot dog',  370,  13, 26, 24,  9,  45,  870, 1,  4),
  rf('seed-qt-taquito-chicken',       "QT Kitchens Taquito – Chicken",       "QuikTrip",      '1 taquito',  200,   9, 21,  9,  3,  25,  410, 1,  1),
  rf('seed-qt-pizza-slice-pep',       "QT Kitchens Pizza Slice – Pepperoni", "QuikTrip",      '1 slice',    360,  15, 41, 15,  6,  30,  740, 2,  3),
  rf('seed-qt-bkfst-burrito',         "QT Kitchens Breakfast Burrito",       "QuikTrip",      '1 burrito',  430,  20, 40, 21,  8, 185,  980, 2,  2),
  rf('seed-qt-glazed-donut',          "QT Kitchens Glazed Donut",            "QuikTrip",      '1 donut',    320,   4, 44, 14,  6,  10,  260, 1, 20),
  rf('seed-qt-blueberry-muffin',      "QT Kitchens Blueberry Muffin",        "QuikTrip",      '1 muffin',   430,   5, 63, 18,  3,  45,  400, 2, 34),

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
  rf('seed-pepsi-wc-cream-12oz',           "Pepsi Wild Cherry & Cream",     "Pepsi",        '1 can (12 fl oz)',    150, 0, 41, 0, 0, 0,  30, 0, 41, 38),
  rf('seed-pepsi-wc-cream-20oz',           "Pepsi Wild Cherry & Cream",     "Pepsi",        '1 bottle (20 fl oz)', 260, 0, 69, 0, 0, 0,  55, 0, 69, 63),
  rf('seed-pepsi-wc-cream-zero-12oz',      "Pepsi Wild Cherry & Cream Zero Sugar", "Pepsi", '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  30, 0,  0, 38),
  rf('seed-pepsi-wc-cream-zero-20oz',      "Pepsi Wild Cherry & Cream Zero Sugar", "Pepsi", '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  55, 0,  0, 63),
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
  rf('seed-coca-cola-12oz',                "Coca-Cola",                          "Coca-Cola",    '1 can (12 fl oz)',    140, 0, 39, 0, 0, 0,  45, 0, 39, 34),
  rf('seed-coca-cola-20oz',                "Coca-Cola",                          "Coca-Cola",    '1 bottle (20 fl oz)', 240, 0, 65, 0, 0, 0,  72, 0, 65, 57),
  rf('seed-cherry-coke-12oz',              "Cherry Coca-Cola",                   "Coca-Cola",    '1 can (12 fl oz)',    150, 0, 40, 0, 0, 0,  45, 0, 40, 34),
  rf('seed-cherry-coke-20oz',              "Cherry Coca-Cola",                   "Coca-Cola",    '1 bottle (20 fl oz)', 250, 0, 67, 0, 0, 0,  75, 0, 67, 57),
  rf('seed-coke-orange-vanilla-12oz',      "Coca-Cola Orange Vanilla",           "Coca-Cola",    '1 can (12 fl oz)',    150, 0, 40, 0, 0, 0,  35, 0, 40, 34),
  rf('seed-coke-orange-vanilla-20oz',      "Coca-Cola Orange Vanilla",           "Coca-Cola",    '1 bottle (20 fl oz)', 240, 0, 65, 0, 0, 0,  60, 0, 65, 57),
  rf('seed-coke-starlight-12oz',           "Coca-Cola Starlight",                "Coca-Cola",    '1 can (12 fl oz)',    140, 0, 39, 0, 0, 0,  45, 0, 39, 34),
  rf('seed-diet-coke-12oz',                "Diet Coke",                          "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 46),
  rf('seed-diet-coke-20oz',                "Diet Coke",                          "Coca-Cola",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  70, 0,  0, 77),
  rf('seed-diet-coke-feisty-cherry-12oz',  "Diet Coke Feisty Cherry",            "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0, 46),
  rf('seed-diet-coke-ginger-lime-12oz',    "Diet Coke Ginger Lime",              "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  30, 0,  0, 46),
  rf('seed-diet-coke-strawberry-12oz',     "Diet Coke Strawberry Guava",         "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  30, 0,  0, 46),
  rf('seed-diet-coke-blueberry-12oz',      "Diet Coke Blueberry Acai",           "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  30, 0,  0, 46),
  rf('seed-coke-zero-12oz',                "Coca-Cola Zero Sugar",               "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 34),
  rf('seed-coke-zero-20oz',                "Coca-Cola Zero Sugar",               "Coca-Cola",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  70, 0,  0, 57),
  rf('seed-coke-zero-cherry-12oz',         "Coca-Cola Zero Sugar Cherry",        "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 34),
  rf('seed-coke-zero-cherry-20oz',         "Coca-Cola Zero Sugar Cherry",        "Coca-Cola",    '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  70, 0,  0, 57),
  rf('seed-coke-zero-orange-vanilla-12oz', "Coca-Cola Zero Sugar Orange Vanilla","Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0, 34),
  rf('seed-coke-zero-vanilla-12oz',        "Coca-Cola Zero Sugar Vanilla",       "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 34),
  rf('seed-coke-zero-starlight-12oz',      "Coca-Cola Zero Sugar Starlight",     "Coca-Cola",    '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  40, 0,  0, 34),
  rf('seed-sprite-12oz',                   "Sprite",                             "Sprite",       '1 can (12 fl oz)',    140, 0, 38, 0, 0, 0,  65, 0, 38,  0),
  rf('seed-sprite-20oz',                   "Sprite",                             "Sprite",       '1 bottle (20 fl oz)', 240, 0, 64, 0, 0, 0, 110, 0, 64,  0),
  rf('seed-sprite-lymonade-12oz',          "Sprite Lymonade",                    "Sprite",       '1 can (12 fl oz)',    140, 0, 38, 0, 0, 0,  65, 0, 37,  0),
  rf('seed-sprite-zero-12oz',              "Sprite Zero Sugar",                  "Sprite",       '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0,  0),
  rf('seed-sprite-zero-20oz',              "Sprite Zero Sugar",                  "Sprite",       '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0,  58, 0,  0,  0),
  rf('seed-fanta-orange-12oz',             "Fanta Orange",                       "Fanta",        '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  55, 0, 44,  0),
  rf('seed-fanta-orange-20oz',             "Fanta Orange",                       "Fanta",        '1 bottle (20 fl oz)', 270, 0, 75, 0, 0, 0,  96, 0, 73,  0),
  rf('seed-fanta-grape-12oz',              "Fanta Grape",                        "Fanta",        '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  55, 0, 44,  0),
  rf('seed-fanta-strawberry-12oz',         "Fanta Strawberry",                   "Fanta",        '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  55, 0, 44,  0),
  rf('seed-fanta-pineapple-12oz',          "Fanta Pineapple",                    "Fanta",        '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  55, 0, 43,  0),
  rf('seed-fanta-berry-12oz',              "Fanta Berry",                        "Fanta",        '1 can (12 fl oz)',    160, 0, 43, 0, 0, 0,  55, 0, 43,  0),
  rf('seed-barqs-12oz',                    "Barq's Root Beer",                   "Barq's",       '1 can (12 fl oz)',    160, 0, 44, 0, 0, 0,  65, 0, 44, 22),
  rf('seed-barqs-20oz',                    "Barq's Root Beer",                   "Barq's",       '1 bottle (20 fl oz)', 270, 0, 74, 0, 0, 0, 108, 0, 74, 37),
  rf('seed-fresca-12oz',                   "Fresca Original Citrus",             "Fresca",       '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0,  0),
  rf('seed-fresca-black-cherry-12oz',      "Fresca Black Cherry Citrus",         "Fresca",       '1 can (12 fl oz)',      0, 0,  0, 0, 0, 0,  35, 0,  0,  0),
  rf('seed-mello-yello-12oz',              "Mello Yello",                        "Mello Yello",  '1 can (12 fl oz)',    170, 0, 47, 0, 0, 0,  60, 0, 47, 51),
  rf('seed-mello-yello-20oz',              "Mello Yello",                        "Mello Yello",  '1 bottle (20 fl oz)', 290, 0, 79, 0, 0, 0,  95, 0, 79, 85),
  rf('seed-pibb-xtra-12oz',               "Pibb Xtra",                          "Pibb Xtra",    '1 can (12 fl oz)',    160, 0, 43, 0, 0, 0,  65, 0, 43, 40),
  rf('seed-pibb-xtra-20oz',               "Pibb Xtra",                          "Pibb Xtra",    '1 bottle (20 fl oz)', 270, 0, 73, 0, 0, 0, 108, 0, 73, 67),

  // ── Gatorade ─────────────────────────────────────────────────────
  rf('seed-gatorade-fruit-punch-20oz',     "Gatorade Fruit Punch",               "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-orange-20oz',          "Gatorade Orange",                    "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-lemon-lime-20oz',      "Gatorade Lemon Lime",                "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-glacier-freeze-20oz',  "Gatorade Glacier Freeze",            "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-cool-blue-20oz',       "Gatorade Cool Blue",                 "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-riptide-rush-20oz',    "Gatorade Riptide Rush",              "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-fierce-grape-20oz',    "Gatorade Fierce Grape",              "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-fierce-melon-20oz',    "Gatorade Fierce Melon",              "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-strawberry-20oz',      "Gatorade Strawberry",                "Gatorade",     '1 bottle (20 fl oz)', 130, 0, 36, 0, 0, 0, 270, 0, 34,  0),
  rf('seed-gatorade-zero-fruit-punch-20oz',"Gatorade Zero Fruit Punch",          "Gatorade",     '1 bottle (20 fl oz)',  10, 0,  1, 0, 0, 0, 270, 0,  0,  0),
  rf('seed-gatorade-zero-orange-20oz',     "Gatorade Zero Orange",               "Gatorade",     '1 bottle (20 fl oz)',  10, 0,  1, 0, 0, 0, 270, 0,  0,  0),
  rf('seed-gatorade-zero-lemon-lime-20oz', "Gatorade Zero Lemon Lime",           "Gatorade",     '1 bottle (20 fl oz)',  10, 0,  1, 0, 0, 0, 270, 0,  0,  0),
  rf('seed-gatorade-zero-glacier-20oz',    "Gatorade Zero Glacier Cherry",       "Gatorade",     '1 bottle (20 fl oz)',  10, 0,  1, 0, 0, 0, 270, 0,  0,  0),
  rf('seed-gatorade-zero-berry-20oz',      "Gatorade Zero Berry",                "Gatorade",     '1 bottle (20 fl oz)',  10, 0,  1, 0, 0, 0, 270, 0,  0,  0),

  // ── Powerade ─────────────────────────────────────────────────────
  rf('seed-powerade-mountain-berry-20oz',  "Powerade Mountain Berry Blast",      "Powerade",     '1 bottle (20 fl oz)', 130, 0, 35, 0, 0, 0, 150, 0, 34,  0),
  rf('seed-powerade-fruit-punch-20oz',     "Powerade Fruit Punch",               "Powerade",     '1 bottle (20 fl oz)', 130, 0, 35, 0, 0, 0, 150, 0, 34,  0),
  rf('seed-powerade-orange-20oz',          "Powerade Orange",                    "Powerade",     '1 bottle (20 fl oz)', 130, 0, 35, 0, 0, 0, 150, 0, 34,  0),
  rf('seed-powerade-grape-20oz',           "Powerade Grape",                     "Powerade",     '1 bottle (20 fl oz)', 130, 0, 35, 0, 0, 0, 150, 0, 34,  0),
  rf('seed-powerade-lemon-lime-20oz',      "Powerade Lemon Lime",                "Powerade",     '1 bottle (20 fl oz)', 130, 0, 35, 0, 0, 0, 150, 0, 34,  0),
  rf('seed-powerade-zero-mixed-berry-20oz',"Powerade Zero Mixed Berry",          "Powerade",     '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 150, 0,  0,  0),
  rf('seed-powerade-zero-grape-20oz',      "Powerade Zero Grape",                "Powerade",     '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 150, 0,  0,  0),
  rf('seed-powerade-zero-fruit-punch-20oz',"Powerade Zero Fruit Punch",          "Powerade",     '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 150, 0,  0,  0),
  rf('seed-powerade-zero-watermelon-20oz', "Powerade Zero Watermelon",           "Powerade",     '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 150, 0,  0,  0),
  rf('seed-powerade-zero-orange-20oz',     "Powerade Zero Orange",               "Powerade",     '1 bottle (20 fl oz)',   0, 0,  0, 0, 0, 0, 150, 0,  0,  0),

  // ── Monster Energy ───────────────────────────────────────────────
  rf('seed-monster-original-16oz',         "Monster Energy Original",            "Monster",      '1 can (16 fl oz)',    210, 0, 54, 0, 0, 0, 190, 0, 54, 160),
  rf('seed-monster-lo-carb-16oz',          "Monster Energy Lo-Carb",             "Monster",      '1 can (16 fl oz)',     30, 0,  6, 0, 0, 0, 180, 0,  3, 140),
  rf('seed-monster-zero-ultra-16oz',       "Monster Energy Zero Ultra",          "Monster",      '1 can (16 fl oz)',      0, 0,  0, 0, 0, 0, 180, 0,  0, 150),
  rf('seed-monster-ultra-white-16oz',      "Monster Ultra White",                "Monster",      '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 190, 0,  0, 150),
  rf('seed-monster-ultra-sunrise-16oz',    "Monster Ultra Sunrise",              "Monster",      '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 190, 0,  0, 150),
  rf('seed-monster-ultra-rosa-16oz',       "Monster Ultra Rosa",                 "Monster",      '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 190, 0,  0, 150),
  rf('seed-monster-ultra-black-16oz',      "Monster Ultra Black",                "Monster",      '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 190, 0,  0, 150),
  rf('seed-monster-mango-loco-16oz',       "Monster Mango Loco",                 "Monster",      '1 can (16 fl oz)',    220, 0, 57, 0, 0, 0, 170, 0, 55, 160),
  rf('seed-monster-pacific-punch-16oz',    "Monster Pacific Punch",              "Monster",      '1 can (16 fl oz)',    220, 0, 57, 0, 0, 0, 170, 0, 55, 160),
  rf('seed-monster-pipeline-punch-16oz',   "Monster Pipeline Punch",             "Monster",      '1 can (16 fl oz)',    220, 0, 57, 0, 0, 0, 170, 0, 55, 160),
  rf('seed-monster-khaotic-16oz',          "Monster Khaotic",                    "Monster",      '1 can (16 fl oz)',    220, 0, 57, 0, 0, 0, 150, 0, 55, 160),
  rf('seed-monster-assault-16oz',          "Monster Assault",                    "Monster",      '1 can (16 fl oz)',    210, 0, 53, 0, 0, 0, 190, 0, 52, 160),
  rf('seed-monster-rehab-tea-16oz',        "Monster Rehab Tea + Lemonade",       "Monster",      '1 can (16 fl oz)',     25, 0,  7, 0, 0, 0, 115, 0,  4, 161),
  rf('seed-monster-rehab-peach-16oz',      "Monster Rehab Peach Tea",            "Monster",      '1 can (16 fl oz)',     25, 0,  7, 0, 0, 0, 115, 0,  4, 161),

  // ── Reign Energy ────────────────────────────────────────────────
  rf('seed-reign-orange-dreamsicle-16oz',  "Reign Orange Dreamsicle",            "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-razzle-dazzle-16oz',      "Reign Razzle Dazzle",                "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-melon-mania-16oz',        "Reign Melon Mania",                  "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-peach-fizz-16oz',         "Reign Peach Fizz",                   "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-lemon-hdz-16oz',          "Reign Lemon HDZ",                    "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-strawberry-sublime-16oz', "Reign Strawberry Sublime",           "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-mang-o-matic-16oz',       "Reign Mang-O-Matic",                 "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),
  rf('seed-reign-cherry-limeade-16oz',     "Reign Cherry Limeade",               "Reign",        '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 200, 0,  0, 300),

  // ── Celsius ──────────────────────────────────────────────────────
  rf('seed-celsius-original-12oz',         "Celsius Original",                   "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,   0, 0,  0, 200),
  rf('seed-celsius-wild-berry-12oz',       "Celsius Wild Berry",                 "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,   0, 0,  0, 200),
  rf('seed-celsius-peach-vibe-12oz',       "Celsius Sparkling Peach Vibe",       "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,  10, 0,  0, 200),
  rf('seed-celsius-orange-12oz',           "Celsius Sparkling Orange",           "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,  10, 0,  0, 200),
  rf('seed-celsius-watermelon-12oz',       "Celsius Sparkling Watermelon",       "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,  10, 0,  0, 200),
  rf('seed-celsius-kiwi-guava-12oz',       "Celsius Sparkling Kiwi Guava",       "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,  10, 0,  0, 200),
  rf('seed-celsius-strawberry-guava-12oz', "Celsius Sparkling Strawberry Guava", "Celsius",      '1 can (12 fl oz)',     10, 0,  2, 0, 0, 0,  10, 0,  0, 200),
  rf('seed-celsius-heat-cherry-lime-16oz', "Celsius HEAT Cherry Lime",           "Celsius",      '1 can (16 fl oz)',     15, 0,  3, 0, 0, 0,   0, 0,  0, 300),
  rf('seed-celsius-heat-inferno-16oz',     "Celsius HEAT Inferno Punch",         "Celsius",      '1 can (16 fl oz)',     15, 0,  3, 0, 0, 0,   0, 0,  0, 300),

  // ── Rockstar Energy ──────────────────────────────────────────────
  rf('seed-rockstar-original-16oz',        "Rockstar Original",                  "Rockstar",     '1 can (16 fl oz)',    250, 0, 63, 0, 0, 0,  75, 0, 62, 160),
  rf('seed-rockstar-pure-zero-16oz',       "Rockstar Pure Zero",                 "Rockstar",     '1 can (16 fl oz)',      0, 0,  0, 0, 0, 0, 110, 0,  0, 240),
  rf('seed-rockstar-xdurance-16oz',        "Rockstar XDurance",                  "Rockstar",     '1 can (16 fl oz)',     10, 0,  3, 0, 0, 0, 105, 0,  0, 240),
  rf('seed-rockstar-sugar-free-16oz',      "Rockstar Sugar Free",                "Rockstar",     '1 can (16 fl oz)',     20, 0,  3, 0, 0, 0, 170, 0,  0, 160),
  rf('seed-rockstar-punched-16oz',         "Rockstar Punched",                   "Rockstar",     '1 can (16 fl oz)',    270, 0, 70, 0, 0, 0,  80, 0, 69, 160),

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

  // ── Oikos Triple Zero Greek Yogurt (5.3 oz / 150g container) ───
  // All flavors: 0g fat, 0 added sugar, 0 artificial sweeteners per label
  rf('seed-oikos-tz-mixed-berry',     "Oikos Triple Zero Mixed Berry",       "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-strawberry',      "Oikos Triple Zero Strawberry",        "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-blueberry',       "Oikos Triple Zero Blueberry",         "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-vanilla',         "Oikos Triple Zero Vanilla",           "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-peach',           "Oikos Triple Zero Peach",             "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-black-cherry',    "Oikos Triple Zero Black Cherry",      "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-chocolate',       "Oikos Triple Zero Chocolate",         "Oikos",          '1 container (5.3 oz)', 120, 15, 15, 0, 0, 10,  70, 6,  9),
  rf('seed-oikos-tz-coconut-creme',   "Oikos Triple Zero Coconut Crème",     "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-banana-creme',    "Oikos Triple Zero Banana Crème",      "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-toasted-coconut', "Oikos Triple Zero Toasted Coconut",   "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  65, 6,  9),
  rf('seed-oikos-tz-lemon',           "Oikos Triple Zero Lemon",             "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  70, 6,  9),
  rf('seed-oikos-tz-salted-caramel',  "Oikos Triple Zero Salted Caramel",    "Oikos",          '1 container (5.3 oz)', 120, 15, 14, 0, 0, 10,  90, 6,  9),
  // Oikos Pro (5.3 oz — higher protein, 0g added sugar)
  rf('seed-oikos-pro-vanilla',        "Oikos Pro Vanilla",                   "Oikos",          '1 container (5.3 oz)', 130, 20, 10, 0, 0, 10, 125, 3,  9),
  rf('seed-oikos-pro-strawberry',     "Oikos Pro Strawberry",                "Oikos",          '1 container (5.3 oz)', 130, 20, 10, 0, 0, 10, 125, 3,  9),
  rf('seed-oikos-pro-blueberry',      "Oikos Pro Blueberry",                 "Oikos",          '1 container (5.3 oz)', 130, 20, 10, 0, 0, 10, 125, 3,  9),
  rf('seed-oikos-pro-peach',          "Oikos Pro Peach",                     "Oikos",          '1 container (5.3 oz)', 130, 20, 10, 0, 0, 10, 125, 3,  9),
  // Oikos Plain (5.3 oz)
  rf('seed-oikos-plain-nonfat',       "Oikos Plain Nonfat Greek Yogurt",     "Oikos",          '1 container (5.3 oz)',  80, 15,  6, 0, 0, 10,  65, 0,  6),
  rf('seed-oikos-plain-whole',        "Oikos Plain Whole Milk Greek Yogurt", "Oikos",          '1 container (5.3 oz)', 130, 11,  8, 6, 4, 25,  55, 0,  7),

  // ── Chobani Greek Yogurt ────────────────────────────────────────
  // Zero Sugar (5.3 oz)
  rf('seed-chobani-zs-vanilla',       "Chobani Zero Sugar Vanilla",          "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  rf('seed-chobani-zs-strawberry',    "Chobani Zero Sugar Strawberry",       "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  rf('seed-chobani-zs-blueberry',     "Chobani Zero Sugar Blueberry",        "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  rf('seed-chobani-zs-peach',         "Chobani Zero Sugar Peach",            "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  rf('seed-chobani-zs-mixed-berry',   "Chobani Zero Sugar Mixed Berry",      "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  rf('seed-chobani-zs-black-cherry',  "Chobani Zero Sugar Black Cherry",     "Chobani",        '1 container (5.3 oz)',  60, 11,  5, 0, 0,  5,  65, 0,  0),
  // Chobani Complete (5.3 oz — added protein + fiber)
  rf('seed-chobani-complete-vanilla', "Chobani Complete Vanilla",            "Chobani",        '1 container (5.3 oz)', 120, 15, 14, 0, 0,  5,  85, 3,  8),
  rf('seed-chobani-complete-straw',   "Chobani Complete Strawberry",         "Chobani",        '1 container (5.3 oz)', 120, 15, 14, 0, 0,  5,  85, 3,  8),
  // Chobani Plain (5.3 oz)
  rf('seed-chobani-plain-nonfat',     "Chobani Plain Nonfat Greek Yogurt",   "Chobani",        '1 container (5.3 oz)',  80, 14,  6, 0, 0,  5,  55, 0,  5),
  rf('seed-chobani-plain-2pct',       "Chobani Plain 2% Greek Yogurt",       "Chobani",        '1 container (5.3 oz)', 100, 14,  7, 2, 1, 10,  55, 0,  5),
  rf('seed-chobani-plain-whole',      "Chobani Plain Whole Milk Greek Yogurt","Chobani",       '1 container (5.3 oz)', 130, 12,  7, 7, 5, 25,  55, 0,  5),
  // Chobani Flip (5.3 oz — higher sugar due to mix-ins)
  rf('seed-chobani-flip-almond',      "Chobani Flip Almond Coco Loco",       "Chobani",        '1 container (5.3 oz)', 210, 12, 24, 9, 4, 15,  95, 1, 19),
  rf('seed-chobani-flip-peanut',      "Chobani Flip Peanut Butter Dream",    "Chobani",        '1 container (5.3 oz)', 230, 14, 22,11, 5, 15, 160, 2, 16),
  rf('seed-chobani-flip-strawberry',  "Chobani Flip Strawberry Cheesecake",  "Chobani",        '1 container (5.3 oz)', 200, 12, 27, 7, 4, 15,  95, 0, 20),

  // ── Fage Greek Yogurt ───────────────────────────────────────────
  // Total 0% Plain (7 oz container — Fage standard size)
  rf('seed-fage-0-plain',             "Fage Total 0% Plain",                 "Fage",           '1 container (7 oz)',   100, 18,  7, 0, 0,  5,  65, 0,  7),
  rf('seed-fage-2-plain',             "Fage Total 2% Plain",                 "Fage",           '1 container (7 oz)',   130, 17,  7, 4, 2, 15,  65, 0,  7),
  rf('seed-fage-5-plain',             "Fage Total 5% Plain",                 "Fage",           '1 container (7 oz)',   170, 16,  7, 9, 6, 30,  65, 0,  7),
  // Fage Split Cup 0% (5.3 oz — with fruit on the side)
  rf('seed-fage-0-strawberry',        "Fage Total 0% Strawberry",            "Fage",           '1 container (5.3 oz)', 130, 12, 20, 0, 0,  5,  55, 0, 18),
  rf('seed-fage-0-blueberry',         "Fage Total 0% Blueberry",             "Fage",           '1 container (5.3 oz)', 130, 12, 20, 0, 0,  5,  55, 0, 18),
  rf('seed-fage-0-peach',             "Fage Total 0% Peach",                 "Fage",           '1 container (5.3 oz)', 130, 12, 20, 0, 0,  5,  55, 0, 18),
  rf('seed-fage-0-honey',             "Fage Total 0% Honey",                 "Fage",           '1 container (5.3 oz)', 170, 12, 29, 0, 0,  5,  55, 0, 28),
  rf('seed-fage-2-strawberry',        "Fage Total 2% Strawberry",            "Fage",           '1 container (5.3 oz)', 150, 12, 20, 2, 1, 10,  55, 0, 18),
  rf('seed-fage-2-honey',             "Fage Total 2% Honey",                 "Fage",           '1 container (5.3 oz)', 190, 12, 29, 3, 1, 10,  55, 0, 28),

  // ── Siggi's Icelandic Skyr ──────────────────────────────────────
  // 4.4 oz containers (Siggi's standard single-serve)
  rf('seed-siggis-plain-0',           "Siggi's 0% Plain",                    "Siggi's",        '1 container (4.4 oz)', 100, 17,  7, 0, 0,  5,  60, 0,  4),
  rf('seed-siggis-vanilla-0',         "Siggi's 0% Vanilla",                  "Siggi's",        '1 container (4.4 oz)', 100, 14, 12, 0, 0,  5,  65, 0,  9),
  rf('seed-siggis-strawberry-0',      "Siggi's 0% Strawberry",               "Siggi's",        '1 container (4.4 oz)', 100, 14, 12, 0, 0,  5,  55, 0,  9),
  rf('seed-siggis-blueberry-0',       "Siggi's 0% Blueberry",                "Siggi's",        '1 container (4.4 oz)', 100, 14, 12, 0, 0,  5,  55, 0,  9),
  rf('seed-siggis-peach-0',           "Siggi's 0% Peach",                    "Siggi's",        '1 container (4.4 oz)', 100, 14, 12, 0, 0,  5,  55, 0,  9),
  rf('seed-siggis-mixed-berry-2',     "Siggi's 2% Mixed Berry",              "Siggi's",        '1 container (4.4 oz)', 120, 14, 12, 2, 1, 10,  55, 0,  9),
  rf('seed-siggis-vanilla-2',         "Siggi's 2% Vanilla",                  "Siggi's",        '1 container (4.4 oz)', 120, 14, 13, 2, 1, 10,  60, 0, 10),
  rf('seed-siggis-plain-4',           "Siggi's 4% Plain",                    "Siggi's",        '1 container (4.4 oz)', 140, 14,  5, 6, 4, 20,  55, 0,  4),
  rf('seed-siggis-strawberry-4',      "Siggi's 4% Strawberry",               "Siggi's",        '1 container (4.4 oz)', 140, 12, 14, 5, 3, 15,  55, 0, 11),

  // ── Two Good Greek Yogurt (5.3 oz) ──────────────────────────────
  // 2g sugar per container
  rf('seed-twogood-vanilla',          "Two Good Vanilla",                    "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),
  rf('seed-twogood-strawberry',       "Two Good Strawberry",                 "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),
  rf('seed-twogood-blueberry',        "Two Good Blueberry",                  "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),
  rf('seed-twogood-peach',            "Two Good Peach",                      "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),
  rf('seed-twogood-black-cherry',     "Two Good Black Cherry",               "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),
  rf('seed-twogood-lemon',            "Two Good Lemon",                      "Two Good",       '1 container (5.3 oz)',  80, 12,  4, 0, 0,  5,  65, 0,  2),

  // ── Hamburger Helper ────────────────────────────────────────────
  // As-packaged: 35g dry = 1 serving (1/5 box)
  rf('seed-hh-4cheese-dry',           "Four Cheese Lasagna (as packaged)",   "Hamburger Helper", '35g (1/5 box)', 130, 4, 27, 1, 0.5, 0, 720, 1, 3),
  // Prepared per box label (1 cup prepared with ground beef + milk)
  rf('seed-hh-4cheese-prep',          "Four Cheese Lasagna (prepared)",      "Hamburger Helper", '1 cup prepared', 360, 22, 32, 14, 5, 65, 870, 1, 4),

  // ── Member's Mark 85/15 Organic Grass Fed Ground Beef ───────────
  rf('seed-mm-beef-8515-4oz',         "85/15 Organic Grass Fed Ground Beef", "Member's Mark",    '4 oz (113g) raw', 230, 21, 0, 15, 6, 80, 75, 0, 0),
  rf('seed-mm-beef-8515-3oz',         "85/15 Organic Grass Fed Ground Beef", "Member's Mark",    '3 oz (85g) raw',  170, 16, 0, 11, 4, 60, 55, 0, 0),

  // ── Bell Pepper ─────────────────────────────────────────────────
  rf('seed-green-bell-pepper',        "Green Bell Pepper",                   "",                 '1 medium (120g)', 30, 1, 7, 0, 0, 0, 4, 2, 4),
  rf('seed-green-bell-pepper-half',   "Green Bell Pepper",                   "",                 '1/2 medium (60g)', 15, 0.5, 3.5, 0, 0, 0, 2, 1, 2),

  // ── Recipe: HH Four Cheese Lasagna w/ MM 85/15 Beef ─────────────
  // Full batch: 1 box HH Four Cheese Lasagna + 1 lb MM 85/15 beef + ½ cup 2% milk + ½ green bell pepper
  // ~1,646 cal total across ~1,200g cooked (~5 cups).  137 cal/100g.
  // Set servings to match grams: 3.5 servings = 350g, 2.5 servings = 250g, etc.
  rf('seed-hh-recipe-mm-beef',        "HH Four Cheese Lasagna (MM 85/15 Beef + Bell Pepper)", "Homemade", '100g', 137, 9, 12, 6, 3, 26, 316, 1, 2),

  // ── Jimmy John's – Slims (8" French bread, meat only) ───────────
  // Slim subs = bread + meat + optional mayo/mustard, no extras
  rf('seed-jj-slim1',                 "Slim 1 – Ham & Cheese",               "Jimmy John's",   '8" sub',       550, 27, 63, 21,  8,  55, 1580, 2,  4),
  rf('seed-jj-slim2',                 "Slim 2 – Roast Beef",                 "Jimmy John's",   '8" sub',       520, 31, 61, 16,  5,  65, 1170, 2,  3),
  rf('seed-jj-slim3',                 "Slim 3 – Tuna Salad",                 "Jimmy John's",   '8" sub',       680, 24, 62, 36,  6,  35, 1190, 2,  3),
  rf('seed-jj-slim4',                 "Slim 4 – Turkey Breast",              "Jimmy John's",   '8" sub',       490, 27, 62, 13,  3,  45, 1510, 2,  4),
  rf('seed-jj-slim5',                 "Slim 5 – Salami",                     "Jimmy John's",   '8" sub',       690, 29, 62, 35, 12,  65, 1920, 2,  3),
  rf('seed-jj-slim6',                 "Slim 6 – Double Provolone",           "Jimmy John's",   '8" sub',       600, 28, 62, 27, 13,  50, 1320, 2,  4),

  // ── Jimmy John's – 8" Subs ──────────────────────────────────────
  rf('seed-jj-1-pepe',                "The Pepe #1",                         "Jimmy John's",   '8" sub',       630, 32, 64, 27,  9,  65, 1890, 2,  4),
  rf('seed-jj-2-bigjohn',             "Big John #2",                         "Jimmy John's",   '8" sub',       590, 35, 63, 19,  4,  75, 1210, 2,  4),
  rf('seed-jj-3-tuna',                "Totally Tuna #3",                     "Jimmy John's",   '8" sub',       750, 31, 65, 39,  6,  40, 1220, 2,  4),
  rf('seed-jj-4-tom',                 "Turkey Tom #4",                       "Jimmy John's",   '8" sub',       560, 28, 63, 18,  4,  50, 1550, 2,  5),
  rf('seed-jj-5-vito',                "Vito #5",                             "Jimmy John's",   '8" sub',       790, 36, 64, 41, 14,  75, 2060, 2,  4),
  rf('seed-jj-6-veg',                 "Vegetarian #6",                       "Jimmy John's",   '8" sub',       580, 26, 63, 23,  8,  30, 1090, 3,  5),
  rf('seed-jj-7-smoked-ham',          "Gourmet Smoked Ham Club #7",          "Jimmy John's",   '8" sub',       690, 40, 66, 27,  9,  75, 2120, 2,  5),
  rf('seed-jj-8-billy',               "Billy Club #8",                       "Jimmy John's",   '8" sub',       780, 46, 67, 31,  8,  95, 1890, 2,  5),
  rf('seed-jj-9-italian',             "Italian Night Club #9",               "Jimmy John's",   '8" sub',       980, 52, 68, 52, 16, 105, 2530, 2,  5),
  rf('seed-jj-10-hunter',             "Hunter's Club #10",                   "Jimmy John's",   '8" sub',       700, 44, 66, 23,  6,  95, 1880, 2,  5),
  rf('seed-jj-11-country',            "Country Club #11",                    "Jimmy John's",   '8" sub',       730, 42, 66, 28,  9,  90, 2310, 2,  5),
  rf('seed-jj-12-beach',              "Beach Club #12",                      "Jimmy John's",   '8" sub',       740, 37, 66, 32,  8,  75, 1640, 3,  5),
  rf('seed-jj-13-bootlegger',         "Bootlegger Club #13",                 "Jimmy John's",   '8" sub',       700, 44, 65, 23,  6,  90, 1900, 2,  5),
  rf('seed-jj-14-gargantuan',         "J.J. Gargantuan #14",                 "Jimmy John's",   '1 sandwich',  1080, 65, 94, 53, 17, 150, 3070, 3,  7),
  rf('seed-jj-15-club-tuna',          "Club Tuna #15",                       "Jimmy John's",   '8" sub',       900, 40, 67, 50, 12,  75, 1860, 2,  5),
  rf('seed-jj-16-club-lulu',          "Club Lulu #16",                       "Jimmy John's",   '8" sub',       770, 44, 65, 33,  9, 110, 2140, 2,  5),
  rf('seed-jj-17-sriracha',           "Sriracha Kick #17",                   "Jimmy John's",   '8" sub',       820, 37, 66, 43, 12,  80, 2100, 2,  6),
  rf('seed-jj-18-avocado',            "Turkey & Avocado #18",                "Jimmy John's",   '8" sub',       710, 36, 65, 32,  7,  65, 1600, 4,  5),
  rf('seed-jj-blt',                   "J.J.B.L.T.",                          "Jimmy John's",   '8" sub',       640, 24, 63, 32,  9,  45, 1390, 2,  5),

  // ── Jimmy John's – Giant Subs (same as 8" but doubled meat on 16" bread) ──
  rf('seed-jj-giant-pepe',            "Giant Pepe #1",                       "Jimmy John's",   '16" sub',     1060, 57, 96, 45, 14, 120, 3180, 3,  7),
  rf('seed-jj-giant-bigjohn',         "Giant Big John #2",                   "Jimmy John's",   '16" sub',      990, 63, 95, 30,  6, 145, 2090, 3,  7),
  rf('seed-jj-giant-tuna',            "Giant Totally Tuna #3",               "Jimmy John's",   '16" sub',     1210, 52, 96, 65, 10,  75, 2110, 3,  7),
  rf('seed-jj-giant-tom',             "Giant Turkey Tom #4",                 "Jimmy John's",   '16" sub',      930, 50, 95, 29,  5,  95, 2760, 3,  8),
  rf('seed-jj-giant-vito',            "Giant Vito #5",                       "Jimmy John's",   '16" sub',     1310, 65, 96, 70, 24, 145, 3720, 3,  7),
  rf('seed-jj-giant-billy',           "Giant Billy Club #8",                 "Jimmy John's",   '16" sub',     1290, 85, 100, 51, 13, 185, 3400, 3,  8),
  rf('seed-jj-giant-italian',         "Giant Italian Night Club #9",         "Jimmy John's",   '16" sub',     1680, 90, 100, 82, 26, 200, 4610, 3,  8),
  rf('seed-jj-giant-hunter',          "Giant Hunter's Club #10",             "Jimmy John's",   '16" sub',     1120, 82, 100, 38,  9, 185, 3400, 3,  8),
  rf('seed-jj-giant-country',         "Giant Country Club #11",              "Jimmy John's",   '16" sub',     1180, 79, 100, 45, 13, 175, 4260, 3,  8),
  rf('seed-jj-giant-beach',           "Giant Beach Club #12",                "Jimmy John's",   '16" sub',     1190, 68, 100, 52, 13, 145, 2940, 4,  8),
  rf('seed-jj-giant-bootlegger',      "Giant Bootlegger Club #13",           "Jimmy John's",   '16" sub',     1120, 82, 97, 37, 10, 175, 3440, 3,  8),

  // ── Jimmy John's – Unwiches (lettuce wrap, no bread ~−280 cal / −58g carbs) ──
  rf('seed-jj-uw-pepe',               "Unwich – Pepe #1",                    "Jimmy John's",   '1 lettuce wrap', 290, 22,  5, 22,  8,  60, 1670, 1,  2),
  rf('seed-jj-uw-bigjohn',            "Unwich – Big John #2",                "Jimmy John's",   '1 lettuce wrap', 250, 25,  4, 14,  4,  70,  990, 1,  2),
  rf('seed-jj-uw-tuna',               "Unwich – Totally Tuna #3",            "Jimmy John's",   '1 lettuce wrap', 410, 22,  7, 34,  6,  35, 1000, 1,  2),
  rf('seed-jj-uw-tom',                "Unwich – Turkey Tom #4",              "Jimmy John's",   '1 lettuce wrap', 220, 18,  5, 14,  3,  45, 1330, 1,  3),
  rf('seed-jj-uw-vito',               "Unwich – Vito #5",                    "Jimmy John's",   '1 lettuce wrap', 480, 27,  6, 38, 13,  70, 1830, 1,  2),
  rf('seed-jj-uw-veg',                "Unwich – Vegetarian #6",              "Jimmy John's",   '1 lettuce wrap', 250, 17,  7, 18,  7,  25,  870, 2,  3),
  rf('seed-jj-uw-billy',              "Unwich – Billy Club #8",              "Jimmy John's",   '1 lettuce wrap', 460, 38,  9, 26,  7,  90, 1670, 1,  3),
  rf('seed-jj-uw-italian',            "Unwich – Italian Night Club #9",      "Jimmy John's",   '1 lettuce wrap', 660, 43, 10, 48, 14, 100, 2310, 1,  3),
  rf('seed-jj-uw-hunter',             "Unwich – Hunter's Club #10",          "Jimmy John's",   '1 lettuce wrap', 370, 35,  8, 19,  5,  90, 1660, 1,  3),
  rf('seed-jj-uw-beach',              "Unwich – Beach Club #12",             "Jimmy John's",   '1 lettuce wrap', 410, 28,  9, 28,  7,  70, 1420, 2,  3),
  rf('seed-jj-uw-bootlegger',         "Unwich – Bootlegger Club #13",        "Jimmy John's",   '1 lettuce wrap', 380, 35,  7, 19,  5,  85, 1680, 1,  3),
  rf('seed-jj-uw-gargantuan',         "Unwich – J.J. Gargantuan #14",        "Jimmy John's",   '1 lettuce wrap', 760, 55, 12, 46, 15, 140, 2840, 2,  5),

  // ── Jimmy John's – Sides & Extras ──────────────────────────────
  rf('seed-jj-chips-plain',           "Original Chips",                      "Jimmy John's",   '1 bag (1 oz)',   130,  2, 19,  6, 1,   0,  180, 1,  0),
  rf('seed-jj-chips-bbq',             "BBQ Chips",                           "Jimmy John's",   '1 bag (1 oz)',   130,  2, 19,  6, 1,   0,  220, 1,  2),
  rf('seed-jj-chips-jalapeno',        "Jalapeño Chips",                      "Jimmy John's",   '1 bag (1 oz)',   130,  2, 19,  6, 1,   0,  200, 1,  1),
  rf('seed-jj-chips-salt-vinegar',    "Salt & Vinegar Chips",                "Jimmy John's",   '1 bag (1 oz)',   120,  2, 18,  5, 1,   0,  360, 1,  0),
  rf('seed-jj-cookie-choc',           "Chocolate Chunk Cookie",              "Jimmy John's",   '1 cookie',       420,  5, 57, 20, 11,  45,  240, 1, 38),
  rf('seed-jj-cookie-oatmeal',        "Oatmeal Raisin Cookie",               "Jimmy John's",   '1 cookie',       420,  6, 60, 18,  9,  45,  280, 2, 32),
  rf('seed-jj-cookie-sugar',          "Sugar Cookie",                        "Jimmy John's",   '1 cookie',       400,  4, 54, 19, 10,  40,  250, 0, 30),
  rf('seed-jj-pickle',                "Kosher Dill Pickle Spear",            "Jimmy John's",   '1 spear',         10,  0,  2,  0,  0,   0,  790, 0,  0),
  rf('seed-jj-avocado-spread',        "Avocado Spread (add-on)",             "Jimmy John's",   '1 portion',       90,  1,  5,  8,  1,   0,    5, 3,  0),
];

export async function seedFoods() {
  // Upsert all seeded foods so new entries are always picked up on app update
  await db.customFoods.bulkPut(SEEDED_FOODS);
}
