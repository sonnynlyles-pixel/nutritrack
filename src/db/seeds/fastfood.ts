import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
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
  rf('seed-mcd-bacon-mcdouble',       "Bacon McDouble",                      "McDonald's",    '1 burger',   450,  25, 36, 23, 10,  80, 1010, 2,  7),
  rf('seed-mcd-double-cheeseburger',  "Double Cheeseburger",                 "McDonald's",    '1 burger',   450,  25, 35, 24, 11,  80, 1050, 2,  8),
  rf('seed-mcd-dbl-bacon-qpc',        "Double Bacon Quarter Pounder",        "McDonald's",    '1 burger',   900,  61, 44, 56, 24, 225, 1640, 2, 11),
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
  rf('seed-mcd-chicken-big-mac',      "Chicken Big Mac",                     "McDonald's",    '1 burger',   720,  41, 49, 40,  9, 120, 1680, 2,  8),
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
  { id: 'seed-mcd-fries-sizer',       name: "French Fries — Pick a Size 🍟",  brand: "McDonald's",    servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-nuggets-sizer',     name: "Chicken McNuggets — Pick a Size 🍗", brand: "McDonald's", servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  rf('seed-mcd-side-salad',           "Side Salad",                          "McDonald's",    '1 salad',     15,   1,  2,  0,  0,   0,   10, 1,  1),
  rf('seed-mcd-apple-slices',         "Apple Slices",                        "McDonald's",    '1 bag',       15,   0,  4,  0,  0,   0,    0, 0,  3),
  rf('seed-mcd-southwest-salad',      "Southwest Grilled Chicken Salad",     "McDonald's",    '1 salad',    350,  37, 27, 12,  4,  90,  840, 6,  9),
  rf('seed-mcd-grilled-chkn-salad',   "Grilled Chicken Salad",               "McDonald's",    '1 salad',    320,  37, 25, 10,  4,  90,  730, 5,  8),

  // ── McDonald's – McCafé Hot Beverages ──────────────────────────
  rf('seed-mcd-sm-coffee',            "Small Coffee (black)",                "McDonald's",    '12 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0, 109),
  rf('seed-mcd-med-coffee',           "Medium Coffee (black)",               "McDonald's",    '16 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0, 145),
  rf('seed-mcd-lg-coffee',            "Large Coffee (black)",                "McDonald's",    '21 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0, 178),
  rf('seed-mcd-sm-latte',             "Small Latte",                         "McDonald's",    '12 fl oz',   120,   7, 11,  5,  3,  20,   75, 0, 10, 71),
  rf('seed-mcd-med-latte',            "Medium Latte",                        "McDonald's",    '16 fl oz',   170,  10, 15,  7,  4,  30,  105, 0, 13, 95),
  rf('seed-mcd-lg-latte',             "Large Latte",                         "McDonald's",    '21 fl oz',   220,  13, 19,  9,  5,  35,  130, 0, 17, 142),
  rf('seed-mcd-sm-caramel-latte',     "Small Caramel Latte",                 "McDonald's",    '12 fl oz',   200,   7, 30,  7,  4,  20,  100, 0, 25, 71),
  rf('seed-mcd-med-caramel-latte',    "Medium Caramel Latte",                "McDonald's",    '16 fl oz',   270,  10, 42,  9,  5,  30,  140, 0, 35, 95),
  rf('seed-mcd-lg-caramel-latte',     "Large Caramel Latte",                 "McDonald's",    '21 fl oz',   350,  13, 55, 11,  6,  35,  170, 0, 45, 142),
  rf('seed-mcd-sm-french-van-latte',  "Small French Vanilla Latte",          "McDonald's",    '12 fl oz',   190,   7, 28,  7,  4,  20,   95, 0, 24, 71),
  rf('seed-mcd-med-french-van-latte', "Medium French Vanilla Latte",         "McDonald's",    '16 fl oz',   260,  10, 39,  9,  5,  30,  130, 0, 33, 95),
  rf('seed-mcd-lg-french-van-latte',  "Large French Vanilla Latte",          "McDonald's",    '21 fl oz',   340,  13, 52, 11,  6,  35,  165, 0, 44, 142),
  rf('seed-mcd-sm-mocha',             "Small Mocha",                         "McDonald's",    '12 fl oz',   230,   8, 35,  7,  4,  25,   90, 1, 32, 71),
  rf('seed-mcd-med-mocha',            "Medium Mocha",                        "McDonald's",    '16 fl oz',   300,  10, 46,  9,  5,  30,  115, 1, 42, 95),
  rf('seed-mcd-lg-mocha',             "Large Mocha",                         "McDonald's",    '21 fl oz',   390,  13, 59, 12,  7,  40,  150, 1, 54, 142),
  rf('seed-mcd-sm-caramel-mac',       "Small Caramel Macchiato",             "McDonald's",    '12 fl oz',   200,   7, 26,  7,  4,  20,   95, 0, 25, 71),
  rf('seed-mcd-med-caramel-mac',      "Medium Caramel Macchiato",            "McDonald's",    '16 fl oz',   270,  10, 35, 10,  6,  30,  120, 0, 34, 95),
  rf('seed-mcd-lg-caramel-mac',       "Large Caramel Macchiato",             "McDonald's",    '21 fl oz',   340,  12, 44, 13,  8,  40,  145, 0, 43, 142),
  rf('seed-mcd-sm-cappuccino',        "Small Cappuccino",                    "McDonald's",    '12 fl oz',    80,   4,  9,  3,  2,  10,   50, 0,  8, 71),
  rf('seed-mcd-med-cappuccino',       "Medium Cappuccino",                   "McDonald's",    '16 fl oz',   110,   6, 12,  4,  2,  15,   70, 0, 11, 95),
  rf('seed-mcd-lg-cappuccino',        "Large Cappuccino",                    "McDonald's",    '21 fl oz',   150,   8, 17,  5,  3,  20,   95, 0, 15, 142),
  rf('seed-mcd-sm-americano',         "Small Americano",                     "McDonald's",    '12 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0, 71),
  rf('seed-mcd-med-americano',        "Medium Americano",                    "McDonald's",    '16 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0, 95),
  rf('seed-mcd-sm-hot-chocolate',     "Small Hot Chocolate",                 "McDonald's",    '12 fl oz',   290,   9, 44, 10,  6,  25,  170, 2, 40),
  rf('seed-mcd-med-hot-chocolate',    "Medium Hot Chocolate",                "McDonald's",    '16 fl oz',   370,  11, 57, 12,  7,  30,  215, 2, 52),

  // ── McDonald's – McCafé Iced Beverages ──────────────────────────
  rf('seed-mcd-sm-iced-coffee',       "Small Iced Coffee",                   "McDonald's",    '16 fl oz',   140,   1, 23,  5,  3,  10,   20, 0, 22, 133),
  rf('seed-mcd-med-iced-coffee',      "Medium Iced Coffee",                  "McDonald's",    '22 fl oz',   190,   1, 32,  7,  4,  15,   25, 0, 30, 200),
  rf('seed-mcd-lg-iced-coffee',       "Large Iced Coffee",                   "McDonald's",    '32 fl oz',   280,   2, 48, 10,  6,  20,   40, 0, 44, 266),
  rf('seed-mcd-sm-iced-latte',        "Small Iced Latte",                    "McDonald's",    '16 fl oz',    60,   5,  6,  2,  1,  10,   50, 0,  6, 71),
  rf('seed-mcd-med-iced-latte',       "Medium Iced Latte",                   "McDonald's",    '22 fl oz',    80,   7,  8,  3,  2,  15,   65, 0,  8, 95),
  rf('seed-mcd-lg-iced-latte',        "Large Iced Latte",                    "McDonald's",    '32 fl oz',   110,   9, 11,  4,  3,  20,   85, 0, 11, 142),
  rf('seed-mcd-sm-iced-car-mac',      "Small Iced Caramel Macchiato",        "McDonald's",    '16 fl oz',   200,   7, 26,  8,  4,  25,   90, 0, 25, 71),
  rf('seed-mcd-med-iced-car-mac',     "Medium Iced Caramel Macchiato",       "McDonald's",    '22 fl oz',   270,   9, 35, 10,  6,  30,  115, 0, 34, 95),
  rf('seed-mcd-lg-iced-car-mac',      "Large Iced Caramel Macchiato",        "McDonald's",    '32 fl oz',   340,  12, 44, 13,  8,  40,  145, 0, 43, 142),
  rf('seed-mcd-sm-iced-mocha',        "Small Iced Mocha",                    "McDonald's",    '16 fl oz',   330,   8, 46, 12,  8,  35,  120, 1, 43, 71),
  rf('seed-mcd-med-iced-mocha',       "Medium Iced Mocha",                   "McDonald's",    '22 fl oz',   420,  10, 58, 16, 10,  45,  150, 1, 55, 95),
  rf('seed-mcd-lg-iced-mocha',        "Large Iced Mocha",                    "McDonald's",    '32 fl oz',   530,  13, 74, 20, 13,  55,  185, 1, 70, 142),
  rf('seed-mcd-sm-iced-fv-latte',     "Small Iced French Vanilla Latte",     "McDonald's",    '16 fl oz',   190,   7, 25,  7,  4,  20,   90, 0, 24, 71),
  rf('seed-mcd-med-iced-fv-latte',    "Medium Iced French Vanilla Latte",    "McDonald's",    '22 fl oz',   260,   9, 34,  9,  5,  30,  120, 0, 32, 95),
  rf('seed-mcd-lg-iced-fv-latte',     "Large Iced French Vanilla Latte",     "McDonald's",    '32 fl oz',   330,  12, 43, 12,  7,  40,  150, 0, 41, 142),
  rf('seed-mcd-sm-iced-caramel-latte',"Small Iced Caramel Latte",            "McDonald's",    '16 fl oz',   200,   7, 28,  7,  4,  20,  100, 0, 26, 71),
  rf('seed-mcd-med-iced-caramel-latte',"Medium Iced Caramel Latte",          "McDonald's",    '22 fl oz',   270,  10, 38,  9,  5,  30,  135, 0, 35, 95),
  rf('seed-mcd-lg-iced-caramel-latte',"Large Iced Caramel Latte",            "McDonald's",    '32 fl oz',   350,  13, 49, 11,  6,  40,  175, 0, 46, 142),

  // ── McDonald's – Frappés ─────────────────────────────────────────
  rf('seed-mcd-sm-frappe-mocha',      "Small Mocha Frappé",                  "McDonald's",    '12 fl oz',   450,   7, 62, 20, 13,  55,  150, 1, 55, 75),
  rf('seed-mcd-med-frappe-mocha',     "Medium Mocha Frappé",                 "McDonald's",    '16 fl oz',   560,   9, 79, 24, 16,  65,  190, 1, 70, 100),
  rf('seed-mcd-lg-frappe-mocha',      "Large Mocha Frappé",                  "McDonald's",    '22 fl oz',   670,  11, 95, 28, 19,  75,  230, 1, 84, 125),
  rf('seed-mcd-sm-frappe-caramel',    "Small Caramel Frappé",                "McDonald's",    '12 fl oz',   430,   7, 62, 18, 12,  55,  150, 0, 58, 75),
  rf('seed-mcd-med-frappe-caramel',   "Medium Caramel Frappé",               "McDonald's",    '16 fl oz',   550,   9, 80, 22, 15,  65,  190, 0, 74, 100),
  rf('seed-mcd-lg-frappe-caramel',    "Large Caramel Frappé",                "McDonald's",    '22 fl oz',   660,  11, 96, 26, 17,  75,  230, 0, 89, 125),

  // ── McDonald's – Shakes & Frozen ────────────────────────────────
  rf('seed-mcd-sm-vanilla-shake',     "Small Vanilla Shake",                 "McDonald's",    '12 fl oz',   530,  12, 78, 20, 13,  75,  220, 0, 63),
  rf('seed-mcd-med-vanilla-shake',    "Medium Vanilla Shake",                "McDonald's",    '16 fl oz',   650,  15, 96, 24, 16,  95,  270, 0, 78),
  rf('seed-mcd-lg-vanilla-shake',     "Large Vanilla Shake",                 "McDonald's",    '22 fl oz',   840,  19,124, 32, 20, 120,  350, 0,101),
  rf('seed-mcd-sm-choc-shake',        "Small Chocolate Shake",               "McDonald's",    '12 fl oz',   530,  12, 78, 20, 13,  75,  250, 1, 63),
  rf('seed-mcd-med-choc-shake',       "Medium Chocolate Shake",              "McDonald's",    '16 fl oz',   650,  15, 96, 24, 16,  95,  300, 1, 78),
  rf('seed-mcd-lg-choc-shake',        "Large Chocolate Shake",               "McDonald's",    '22 fl oz',   840,  19,125, 32, 20, 120,  390, 1,101),
  rf('seed-mcd-sm-strawberry-shake',  "Small Strawberry Shake",              "McDonald's",    '12 fl oz',   530,  12, 79, 20, 13,  75,  220, 0, 65),
  rf('seed-mcd-med-strawberry-shake', "Medium Strawberry Shake",             "McDonald's",    '16 fl oz',   650,  15, 98, 24, 16,  95,  270, 0, 81),
  rf('seed-mcd-lg-strawberry-shake',  "Large Strawberry Shake",              "McDonald's",    '22 fl oz',   840,  19,127, 32, 20, 120,  350, 0,106),
  rf('seed-mcd-mcflurry-oreo',        "McFlurry with OREO",                  "McDonald's",    '1 regular',  510,  10, 79, 17, 10,  40,  280, 1, 59),
  rf('seed-mcd-mcflurry-m-and-ms',    "McFlurry with M&M's",                 "McDonald's",    '1 regular',  640,  13, 96, 22, 13,  45,  220, 1, 79),
  rf('seed-mcd-sm-mcflurry-oreo',     "Snack Size McFlurry with OREO",       "McDonald's",    '1 snack',    330,   7, 51, 11,  7,  30,  190, 0, 38),
  rf('seed-mcd-sm-mcflurry-m-and-ms', "Snack Size McFlurry with M&M's",      "McDonald's",    '1 snack',    430,   8, 65, 15,  9,  30,  160, 0, 53),
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
  rf('seed-mcd-med-fanta-orange',     "Fanta Orange (Medium)",               "McDonald's",    '21 fl oz',   220,   0, 59,  0,  0,   0,   30, 0, 59),
  rf('seed-mcd-med-barqs-root-beer',  "Barq's Root Beer (Medium)",           "McDonald's",    '21 fl oz',   200,   0, 54,  0,  0,   0,  105, 0, 54),
  rf('seed-mcd-med-sweet-tea',        "Sweet Tea (Medium)",                  "McDonald's",    '21 fl oz',   160,   0, 40,  0,  0,   0,   10, 0, 40),
  rf('seed-mcd-med-unsweet-tea',      "Unsweetened Iced Tea (Medium)",       "McDonald's",    '21 fl oz',     0,   0,  0,  0,  0,   0,    0, 0,  0),
  rf('seed-mcd-sm-lemonade',          "Minute Maid Lemonade (Small)",        "McDonald's",    '12 fl oz',   150,   0, 40,  0,  0,   0,   10, 0, 38),
  rf('seed-mcd-med-lemonade',         "Minute Maid Lemonade (Medium)",       "McDonald's",    '21 fl oz',   250,   0, 68,  0,  0,   0,   10, 0, 63),
  rf('seed-mcd-lg-lemonade',          "Minute Maid Lemonade (Large)",        "McDonald's",    '30 fl oz',   340,   0, 91,  0,  0,   0,   15, 0, 88),
  rf('seed-mcd-mcfreeze-sprite',      "McFreeze Sprite",                     "McDonald's",    '22 fl oz',   190,   0, 51,  0,  0,   0,   50, 0, 51),
  rf('seed-mcd-sm-oj',                "Orange Juice (Small)",                "McDonald's",    '12 fl oz',   140,   2, 33,  0,  0,   0,   20, 0, 28),
  rf('seed-mcd-1pct-milk-jug',        "1% Low Fat Milk (8 oz)",              "McDonald's",    '8 fl oz',    100,   8, 13,  2,  2,  10,  125, 0, 12),
  rf('seed-mcd-choc-milk-jug',        "Chocolate Milk (8 oz)",               "McDonald's",    '8 fl oz',    140,   8, 22,  2,  1,  10,  130, 0, 21),

  // ── McDonald's – Desserts & Bakery ──────────────────────────────
  // ── McDonald's – Best in the World Specialty Drinks ─────────────
  // Dirty Dr Pepper: Dr Pepper + coconut syrup + cream
  rf('seed-mcd-sm-dirty-drp',         "Dirty Dr Pepper (Small)",             "McDonald's",    '16 fl oz',   200,   0, 51,  2,  1,   5,   60, 0, 49, 41),
  rf('seed-mcd-med-dirty-drp',        "Dirty Dr Pepper (Medium)",            "McDonald's",    '22 fl oz',   280,   0, 63,  3,  2,   8,   85, 0, 61, 55),
  rf('seed-mcd-lg-dirty-drp',         "Dirty Dr Pepper (Large)",             "McDonald's",    '30 fl oz',   370,   0, 82,  4,  2,  10,  110, 0, 79, 72),
  // Orange Dream: Hi-C Orange + vanilla cream (orange creamsicle vibes)
  rf('seed-mcd-sm-orange-dream',      "Orange Dream (Small)",                "McDonald's",    '16 fl oz',   190,   1, 38,  5,  3,  15,   50, 0, 36),
  rf('seed-mcd-med-orange-dream',     "Orange Dream (Medium)",               "McDonald's",    '22 fl oz',   250,   1, 50,  6,  4,  20,   65, 0, 48),
  rf('seed-mcd-lg-orange-dream',      "Orange Dream (Large)",                "McDonald's",    '30 fl oz',   330,   2, 66,  8,  5,  25,   85, 0, 63),
  // Lavender Lemonade
  rf('seed-mcd-sm-lavender-lemon',    "Lavender Lemonade (Small)",           "McDonald's",    '16 fl oz',   180,   0, 47,  0,  0,   0,   10, 0, 45),
  rf('seed-mcd-med-lavender-lemon',   "Lavender Lemonade (Medium)",          "McDonald's",    '22 fl oz',   240,   0, 63,  0,  0,   0,   10, 0, 61),
  rf('seed-mcd-lg-lavender-lemon',    "Lavender Lemonade (Large)",           "McDonald's",    '30 fl oz',   320,   0, 84,  0,  0,   0,   15, 0, 81),
  // Spicy Strawberry Lemonade
  rf('seed-mcd-sm-spicy-straw-lemon', "Spicy Strawberry Lemonade (Small)",   "McDonald's",    '16 fl oz',   190,   0, 50,  0,  0,   0,   10, 0, 48),
  rf('seed-mcd-med-spicy-straw-lemon',"Spicy Strawberry Lemonade (Medium)",  "McDonald's",    '22 fl oz',   250,   0, 66,  0,  0,   0,   10, 0, 64),
  rf('seed-mcd-lg-spicy-straw-lemon', "Spicy Strawberry Lemonade (Large)",   "McDonald's",    '30 fl oz',   330,   0, 88,  0,  0,   0,   15, 0, 85),
  // Peach Mango Refresher
  rf('seed-mcd-sm-peach-mango-ref',   "Peach Mango Refresher (Small)",       "McDonald's",    '16 fl oz',   170,   0, 44,  0,  0,   0,   15, 0, 42),
  rf('seed-mcd-med-peach-mango-ref',  "Peach Mango Refresher (Medium)",      "McDonald's",    '22 fl oz',   230,   0, 60,  0,  0,   0,   20, 0, 57),
  rf('seed-mcd-lg-peach-mango-ref',   "Peach Mango Refresher (Large)",       "McDonald's",    '30 fl oz',   300,   0, 79,  0,  0,   0,   25, 0, 75),
  // McCafé Cold Brew
  rf('seed-mcd-sm-creamy-cold-brew',  "Creamy Cold Brew (Small)",            "McDonald's",    '12 fl oz',    80,   1, 10,  4,  2,  15,   50, 0,  9, 175),
  rf('seed-mcd-med-creamy-cold-brew', "Creamy Cold Brew (Medium)",           "McDonald's",    '16 fl oz',   110,   1, 14,  5,  3,  20,   70, 0, 12, 233),
  rf('seed-mcd-lg-creamy-cold-brew',  "Creamy Cold Brew (Large)",            "McDonald's",    '22 fl oz',   150,   2, 20,  7,  4,  30,   90, 0, 17, 310),
  rf('seed-mcd-sm-caramel-cold-brew', "Caramel Cold Brew (Small)",           "McDonald's",    '12 fl oz',   160,   1, 28,  4,  2,  15,   55, 0, 27, 175),
  rf('seed-mcd-med-caramel-cold-brew',"Caramel Cold Brew (Medium)",          "McDonald's",    '16 fl oz',   210,   1, 37,  5,  3,  20,   75, 0, 35, 233),
  rf('seed-mcd-lg-caramel-cold-brew', "Caramel Cold Brew (Large)",           "McDonald's",    '22 fl oz',   280,   2, 50,  7,  4,  30,   95, 0, 47, 310),
  rf('seed-mcd-sm-vanilla-cold-brew', "Vanilla Sweet Cream Cold Brew (Sm)",  "McDonald's",    '12 fl oz',    90,   1, 11,  5,  3,  20,   50, 0, 10, 175),
  rf('seed-mcd-med-vanilla-cold-brew',"Vanilla Sweet Cream Cold Brew (Med)", "McDonald's",    '16 fl oz',   120,   1, 15,  6,  4,  25,   65, 0, 13, 233),
  rf('seed-mcd-lg-vanilla-cold-brew', "Vanilla Sweet Cream Cold Brew (Lg)",  "McDonald's",    '22 fl oz',   160,   2, 20,  8,  5,  35,   85, 0, 17, 310),
  // Shamrock Shake (seasonal March)
  rf('seed-mcd-sm-shamrock-shake',    "Shamrock Shake (Small)",              "McDonald's",    '12 fl oz',   460,  11, 73, 15,  9,  55,  180, 0, 60),
  rf('seed-mcd-med-shamrock-shake',   "Shamrock Shake (Medium)",             "McDonald's",    '16 fl oz',   570,  13, 91, 17, 11,  70,  230, 0, 75),
  rf('seed-mcd-lg-shamrock-shake',    "Shamrock Shake (Large)",              "McDonald's",    '22 fl oz',   740,  17,118, 22, 14,  90,  290, 0, 97),
  // Specialty drink size-picker triggers
  { id: 'seed-mcd-dirty-drp-sizer',        name: "Dirty Dr Pepper — Pick a Size 🥤",         brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-orange-dream-sizer',     name: "Orange Dream — Pick a Size 🍊",            brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-lavender-lemon-sizer',   name: "Lavender Lemonade — Pick a Size 💜",       brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-spicy-straw-lemon-sizer',name: "Spicy Strawberry Lemonade — Pick a Size 🍓",brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-peach-mango-ref-sizer',  name: "Peach Mango Refresher — Pick a Size 🍑",   brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-creamy-cold-brew-sizer', name: "Creamy Cold Brew — Pick a Size ☕",         brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-mcd-shamrock-shake-sizer',   name: "Shamrock Shake — Pick a Size ☘️",          brand: "McDonald's", servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },

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
  { id: 'seed-cfa-waffle-fries-sizer', name: 'Waffle Fries — Pick a Size 🍟', brand: 'Chick-fil-A', servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-cfa-nuggets-sizer', name: 'Chicken Nuggets — Pick a Size 🍗', brand: 'Chick-fil-A', servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  { id: 'seed-cfa-mac-sizer', name: 'Mac & Cheese — Pick a Size 🧀', brand: 'Chick-fil-A', servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
];
