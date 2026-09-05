import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0, transFat = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
  // ── Jersey Mike's ──────────────────────────────────────────────
  // Full current numbered menu, Regular size on White Bread ("Mike's Way"
  // defaults) — for size/bread variants, see SubBuilder (opens automatically
  // when one of these is selected).
  //
  // Nutrition pulled live from Jersey Mike's own US ingredient-level nutrition
  // API (subs.jerseymikes.com/nutrition/{productId}/{sizeId} — the same data
  // that powers their real "build your sub" calculator on the live US site),
  // replacing an earlier version sourced from their Canadian nutrition PDF that
  // ran 9-29% low on several nutrients for the same items. Verified byte-exact
  // against a user-provided real calculator readout before regenerating.
  //
  // #64/#65/#66 Portabella items dropped — discontinued, not on the current US
  // menu at all. #87/#88 Teriyaki Chicken/Steak also skipped — Jersey Mike's
  // own API returns null nutrition for them (an ingredient, likely the sauce
  // or rice, has incomplete data on their backend); omitted rather than guess.
  // #19 BBQ Beef and #20 Grilled Pastrami Reuben added — real current items
  // that weren't in the previous seed set.
  rf('seed-jm-1-blt',                       "BLT",                                   "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 788.14, 28.6, 64.35, 47.77, 10.31, 58.63, 1633.37, 4.06, 5.73, 0, 0.3),
  rf('seed-jm-2-jersey-shore',              "Jersey Shore's Favorite",               "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 823.6, 39.24, 68.59, 44.35, 10.63, 65.68, 2008.94, 4.39, 7.93, 0, 0.37),
  rf('seed-jm-3-ham-provolone',             "Ham and Provolone",                     "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 816.8, 38.23, 67.86, 44.36, 10.7, 63.44, 1962.5, 4.39, 7.35, 0, 0.37),
  rf('seed-jm-4-number-four',               "The Number Four",                       "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 806.15, 37.19, 70.05, 42.62, 9.61, 55.89, 1851.22, 4.39, 8.9, 0, 0.37),
  rf('seed-jm-5-super-sub',                 "The Super Sub",                         "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 837.46, 41.71, 70.03, 44.17, 10.32, 67.96, 2120.83, 4.39, 9.05, 0, 0.37),
  rf('seed-jm-6-roast-beef-provolone',      "Roast Beef and Provolone",              "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 913.34, 56.93, 65.83, 46.25, 11.23, 116.77, 1323.88, 4.39, 5.33, 0, 0.41),
  rf('seed-jm-7-turkey-provolone',          "Turkey and Provolone",                  "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 817.2, 45.37, 66.48, 41.38, 9.18, 73.51, 1976.4, 4.39, 5.98, 0, 0.37),
  rf('seed-jm-8-club-sub',                  "Club Sub",                              "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 1162.99, 50.15, 68.31, 77.83, 16.46, 105.12, 2563.9, 4.39, 7.77, 0, 0.64),
  rf('seed-jm-9-club-supreme',              "Club Supreme",                          "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 1191.2, 59.31, 66.88, 76.74, 15.65, 131.96, 2050.66, 4.39, 6.42, 0, 0.41),
  rf('seed-jm-10-tuna-fish',                "Tuna Fish",                             "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 1062.1, 33.1, 66.96, 74.74, 10.47, 55.94, 1348.35, 4.78, 6.45, 0, 0.41),
  rf('seed-jm-11-stickball',                "Stickball Special",                     "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 887.46, 39.43, 68.29, 51.32, 13.49, 75.85, 2170.81, 4.41, 7.73, 0, 0.37),
  rf('seed-jm-12-cancro',                   "Cancro Special",                        "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 966.35, 59.05, 66.33, 50.97, 12.87, 127.35, 1504.57, 4.45, 5.7, 0, 0.41),
  rf('seed-jm-13-original-italian',         "The Original Italian",                  "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 956.02, 46.78, 71.09, 54.52, 14.21, 92.38, 2571.21, 4.47, 9.95, 0, 0.37),
  rf('seed-jm-14-veggie',                   "The Veggie",                            "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 953.62, 39.35, 68.74, 58.57, 20.23, 81.4, 1310.48, 4.93, 6.15, 0, 0.75),
  rf('seed-jm-16-chicken-philly',           "Mike's Chicken Philly",                 "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 683.84, 48.34, 72.98, 21.67, 9.93, 134.52, 2187.75, 3.21, 10.64, 0, 0.25),
  rf('seed-jm-17-famous-philly',            "Mike's Famous Philly",                  "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 748.33, 45.95, 74.01, 30.32, 14.39, 120.05, 2164.61, 3.21, 9.66, 0, 0.77),
  rf('seed-jm-19-bbq-beef',                 "BBQ Beef",                              "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 708.07, 60.08, 87.37, 11.37, 3.27, 123.57, 1811.47, 3.64, 20.13, 0, 0.15),
  rf('seed-jm-20-pastrami-reuben',          "Grilled Pastrami Reuben",               "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 721.29, 41.68, 74.24, 29.77, 8.22, 99.78, 1914.94, 5.49, 9.11, 0, 0.11),
  rf('seed-jm-26-bacon-ranch-cheesesteak',  "Bacon Ranch Chicken Cheese Steak",      "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 923.8, 55.05, 71.35, 46.8, 14.77, 163.71, 2485.08, 3.74, 8.8, 0, 0.25),
  rf('seed-jm-31-california-chicken',       "California Chicken Cheese Steak",       "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 931.78, 49.2, 70.04, 50.83, 14.36, 150.07, 2148.02, 3.74, 8.43, 0, 0.52),
  rf('seed-jm-42-chipotle-chicken-cheesesteak', "Chipotle Chicken Cheese Steak",         "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 973.27, 48.8, 74.66, 53.39, 14.87, 158.61, 2547.17, 3.3, 11.88, 0, 0.46),
  rf('seed-jm-43-chipotle-cheesesteak',     "Chipotle Cheese Steak",                 "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 1037.76, 46.41, 75.69, 62.04, 19.32, 144.14, 2524.03, 3.3, 10.91, 0, 0.98),
  rf('seed-jm-44-buffalo-chicken',          "Buffalo Chicken Cheese Steak",          "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 894.46, 50.31, 72.95, 44.46, 14.27, 155, 3588.26, 4.14, 9.49, 0, 0.31),
  rf('seed-jm-54-big-kahuna-hot-veggie',    "Big Kahuna Hot Veggie",                 "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 715.14, 39.44, 67.28, 32.57, 17.13, 81.4, 1307.09, 4.99, 5.23, 0, 0.75),
  rf('seed-jm-55-big-kahuna-chicken',       "Big Kahuna Chicken Cheese Steak",       "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 741.28, 51.12, 75.22, 26.1, 12.65, 147.73, 2740.95, 3.67, 11.85, 0, 0.32),
  rf('seed-jm-56-big-kahuna',               "Big Kahuna Cheese Steak",               "Jersey Mike's",  '1 sandwich (Regular, White Bread)', 802.93, 48.66, 75.59, 34.74, 17.11, 133.26, 2717.53, 3.55, 10.58, 0, 0.84),

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
  rf('seed-mcd-grilled-chkn-sndwch',  "Grilled Chicken Sandwich",            "McDonald's",    '1 sandwich', 390,  37, 44,  9,  2,  75, 1040, 3,  8),

  // ── McDonald's – Sides ─────────────────────────────────────────
  { id: 'seed-mcd-fries-sizer', name: 'French Fries — Pick a Size 🍟', brand: "McDonald's", servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },

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
  rf('seed-mcd-dbl-sausage-mcmuffin', "Double Sausage McMuffin with Egg",    "McDonald's",    '1 sandwich', 600,  28, 30, 42, 14, 290, 1150, 1,  3),
  rf('seed-mcd-sausage-patty',        "Sausage Patty",                       "McDonald's",    '1 patty',    170,   9,  0, 15,  5,  40,  370, 0,  0),
  rf('seed-mcd-bacon',                "Bacon",                               "McDonald's",    '2 slices',    90,   7,  0,  7,  3,  15,  310, 0,  0),

  // ── Burger King ────────────────────────────────────────────────
  // BEEF — US menu nutritional data
  rf('seed-bk-whopper',               "Whopper",                             "Burger King",   '1 burger',   660,  28, 49, 40, 12,  90,  980, 2, 11),
  rf('seed-bk-whopper-cheese',        "Whopper with Cheese",                 "Burger King",   '1 burger',   750,  31, 50, 46, 15, 105, 1200, 2, 11),
  rf('seed-bk-double-whopper',        "Double Whopper",                      "Burger King",   '1 burger',   900,  48, 49, 57, 20, 175, 1050, 2, 11),
  rf('seed-bk-double-whopper-cheese', "Double Whopper with Cheese",          "Burger King",   '1 burger',   990,  52, 51, 62, 23, 185, 1380, 2, 12),
  rf('seed-bk-triple-whopper',        "Triple Whopper",                      "Burger King",   '1 burger',  1140,  68, 49, 74, 27, 265, 1120, 2, 11),
  rf('seed-bk-big-king',              "Big King",                            "Burger King",   '1 burger',   520,  26, 37, 31, 12,  70,  770, 2,  8),
  rf('seed-bk-dbl-cheese-burger',     "Double Cheeseburger",                 "Burger King",   '1 burger',   380,  23, 28, 19,  9,  90,  850, 1,  6),
  rf('seed-bk-whopper-jr',            "Whopper Jr.",                         "Burger King",   '1 burger',   340,  15, 31, 19,  6,  45,  480, 1,  6),
  rf('seed-bk-whopper-jr-cheese',     "Whopper Jr. with Cheese",             "Burger King",   '1 burger',   380,  17, 32, 22,  8,  55,  660, 1,  6),
  rf('seed-bk-hamburger',             "Hamburger",                           "Burger King",   '1 burger',   230,  12, 27,  8,  3,  35,  480, 1,  5),
  rf('seed-bk-cheeseburger',          "Cheeseburger",                        "Burger King",   '1 burger',   270,  14, 28, 11,  5,  45,  660, 1,  6),
  rf('seed-bk-rodeo-cheese-burger',   "Rodeo Cheeseburger",                  "Burger King",   '1 burger',   370,  16, 35, 18,  7,  50,  660, 1, 11),
  rf('seed-bk-angry-bacon-king',      "Angry Bacon King",                    "Burger King",   '1 burger',  1090,  57, 57, 70, 27, 225, 2070, 2, 16),
  rf('seed-bk-bacon-king',            "Bacon King",                          "Burger King",   '1 burger',  1050,  61, 49, 67, 26, 195, 1970, 2, 12),
  rf('seed-bk-whopper-plant-based',   "Impossible Whopper",                  "Burger King",   '1 burger',   630,  25, 58, 34, 11,  10, 1080, 4, 12),
  // CHICKEN
  rf('seed-bk-original-chicken',      "Original Chicken Sandwich",           "Burger King",   '1 sandwich', 660,  22, 60, 41,  8,  45, 1230, 2,  6),
  rf('seed-bk-crispy-chicken',        "Crispy Chicken Sandwich",             "Burger King",   '1 sandwich', 490,  25, 49, 22,  4,  55, 1040, 2,  5),
  rf('seed-bk-spicy-crispy-chicken',  "Spicy Crispy Chicken Sandwich",       "Burger King",   '1 sandwich', 700,  30, 56, 40,  7,  80, 1640, 2,  7),
  rf('seed-bk-big-fish',              "BK Big Fish",                         "Burger King",   '1 sandwich', 630,  23, 66, 32,  6,  55, 1380, 2,  8),
  rf('seed-bk-chicken-bacon-king',    "Chicken Bacon King",                  "Burger King",   '1 burger',   830,  45, 49, 50, 18, 155, 1840, 2, 12),
  rf('seed-bk-chicken-fries-6pc',     "Chicken Fries (6pc)",                 "Burger King",   '6 pieces',   270,  14, 20, 15,  3,  35,  490, 1,  0),
  rf('seed-bk-chicken-fries-9pc',     "Chicken Fries (9pc)",                 "Burger King",   '9 pieces',   410,  21, 30, 22,  4,  55,  730, 1,  0),
  rf('seed-bk-chicken-nuggets-4pc',   "Chicken Nuggets (4pc)",               "Burger King",   '4 pieces',   170,   9, 11, 10,  2,  25,  310, 0,  0),
  rf('seed-bk-chicken-nuggets-6pc',   "Chicken Nuggets (6pc)",               "Burger King",   '6 pieces',   260,  13, 17, 15,  3,  35,  470, 0,  0),
  rf('seed-bk-chicken-nuggets-9pc',   "Chicken Nuggets (9pc)",               "Burger King",   '9 pieces',   390,  20, 26, 23,  5,  55,  700, 0,  0),
  // SIDES & FRIES
  rf('seed-bk-fries-small',           "Fries (Small)",                       "Burger King",   '1 small',    230,   3, 30, 11,  2,   0,  380, 2,  0),
  rf('seed-bk-fries-medium',          "Fries (Medium)",                      "Burger King",   '1 medium',   380,   5, 49, 18,  3,   0,  620, 3,  0),
  rf('seed-bk-fries-large',           "Fries (Large)",                       "Burger King",   '1 large',    490,   6, 62, 23,  4,   0,  800, 4,  0),
  rf('seed-bk-onion-rings-8pc',       "Onion Rings (Small)",                 "Burger King",   '1 small',    180,   2, 22,  9,  2,   0,  250, 2,  2),
  rf('seed-bk-onion-rings-12pc',      "Onion Rings (Medium)",                "Burger King",   '1 medium',   310,   4, 38, 16,  3,   0,  430, 3,  3),
  rf('seed-bk-onion-rings-large',     "Onion Rings (Large)",                 "Burger King",   '1 large',    500,   6, 61, 25,  5,   0,  700, 5,  4),

  // ── Wendy's ────────────────────────────────────────────────────
  rf('seed-wd-single',                "Single",                              "Wendy's",       '1 burger',   250,  13, 31, 10,  4,  30,  570, 2,  5),
  rf('seed-wd-double',                "Double",                              "Wendy's",       '1 burger',   410,  25, 31, 20,  8,  65, 1030, 2,  5),
  rf('seed-wd-triple',                "Triple",                              "Wendy's",       '1 burger',   570,  38, 31, 30, 12, 100, 1360, 2,  5),
  rf('seed-wd-jr-cheeseburger',       "Jr. Hamburger",                       "Wendy's",       '1 burger',   250,  13, 31, 10,  4,  30,  560, 2,  5),
  rf('seed-wd-jr-cheese',             "Jr. Cheeseburger",                    "Wendy's",       '1 burger',   300,  15, 31, 14,  6,  45,  820, 2,  5),
  rf('seed-wd-spicy-chk-sandwich',    "Spicy Chicken Sandwich",              "Wendy's",       '1 sandwich', 470,  18, 44, 25,  4,  40, 1000, 2,  6),
  rf('seed-wd-grilled-chk-sandwich',  "Grilled Chicken Sandwich",            "Wendy's",       '1 sandwich', 310,  35, 35,  6,  1,  75,  720, 2,  6),
  rf('seed-wd-crispy-chk-sandwich',   "Crispy Chicken Sandwich",             "Wendy's",       '1 sandwich', 470,  17, 44, 26,  4,  40, 1020, 2,  6),

  // ── Culver's ────────────────────────────────────────────────────
  rf('seed-culv-single-butterburger', "ButterBurger (Single)",               "Culver's",      '1 burger',   390,  18, 34, 20,  8,  55,  630, 1,  5),
  rf('seed-culv-double-butterburger', "ButterBurger (Double)",               "Culver's",      '1 burger',   610,  34, 34, 34, 14, 110, 1100, 1,  5),
  rf('seed-culv-triple-butterburger', "ButterBurger (Triple)",               "Culver's",      '1 burger',   830,  51, 34, 50, 20, 165, 1450, 1,  5),
  rf('seed-culv-grill-turkey',        "Grilled Turkey Burger",               "Culver's",      '1 burger',   340,  27, 34, 13,  3,  45,  680, 1,  4),
  rf('seed-culv-mushroom-swiss',      "Mushroom & Swiss ButterBurger",       "Culver's",      '1 burger',   500,  25, 35, 29, 11,  80, 1080, 2,  6),
  rf('seed-culv-pub-burger-single',   "Jalapeño Jack Pub Burger (Single)",   "Culver's",      '1 burger',   600,  33, 35, 38, 14, 105, 1270, 1, 10),
  rf('seed-culv-pub-burger-double',   "Jalapeño Jack Pub Burger (Double)",   "Culver's",      '1 burger',   820,  50, 35, 55, 21, 160, 1640, 1, 10),
  rf('seed-culv-onion-rings-small',   "Onion Rings (Small)",                 "Culver's",      '1 small',    240,   3, 26, 13,  2,   0,  420, 2,  1),
  rf('seed-culv-onion-rings-medium',  "Onion Rings (Medium)",                "Culver's",      '1 medium',   350,   4, 38, 19,  3,   0,  610, 3,  2),
  rf('seed-culv-onion-rings-large',   "Onion Rings (Large)",                 "Culver's",      '1 large',    480,   6, 52, 26,  4,   0,  840, 4,  2),
  { id: 'seed-culv-onion-rings-sizer', name: 'Onion Rings — Pick a Size 🧅', brand: 'Culver\'s', servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
  rf('seed-culv-root-beer-small',      "Fountain Root Beer (Small)",          "Culver's",      '1 small',    140,   0, 39,  0,  0,   0,   35, 0, 39),
  rf('seed-culv-root-beer-medium',     "Fountain Root Beer (Medium)",         "Culver's",      '1 medium',   220,   0, 61,  0,  0,   0,   55, 0, 61),
  rf('seed-culv-root-beer-large',      "Fountain Root Beer (Large)",          "Culver's",      '1 large',    310,   0, 86,  0,  0,   0,   80, 0, 86),
  { id: 'seed-culv-root-beer-sizer', name: 'Fountain Root Beer — Pick a Size 🥤', brand: 'Culver\'s', servingSizeG: 1, servingLabel: '1 drink', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },

  // ── Sonic ────────────────────────────────────────────────────────
  rf('seed-sonic-jr-burger',          "Jr. Burger",                          "Sonic",         '1 burger',   350,  16, 34, 18,  7,  40,  650, 1,  5),
  rf('seed-sonic-regular-burger',     "Regular Burger",                      "Sonic",         '1 burger',   470,  21, 45, 24,  9,  55,  980, 2,  7),
  rf('seed-sonic-double-burger',      "Double Burger",                       "Sonic",         '1 burger',   650,  37, 45, 36, 13, 100, 1430, 2,  7),
  rf('seed-sonic-quarter-pound',      "Quarter Pound Burger",                "Sonic",         '1 burger',   470,  26, 44, 24,  9,  70, 1080, 2,  7),

  // ── Arby's ──────────────────────────────────────────────────────
  rf('seed-arby-classic-roast',       "Classic Roast Beef",                  "Arby's",        '1 sandwich', 320,  22, 34, 13,  4,  40,  750, 2,  5),
  rf('seed-arby-beef-cheddar',        "Beef 'N Cheddar",                     "Arby's",        '1 sandwich', 450,  22, 41, 23,  7,  45, 1170, 2,  8),
  rf('seed-arby-king-roast',          "King\'s Roast Beef",                  "Arby's",        '1 sandwich', 530,  35, 35, 29, 10,  65, 1100, 1,  6),
  rf('seed-arby-crispy-fish',         "Crispy Fish",                         "Arby's",        '1 sandwich', 470,  20, 44, 25,  5,  30,  890, 2,  6),
  rf('seed-arby-chicken-tenders-3',   "Crispy Chicken Tenders (3 pc)",       "Arby's",        '3 pieces',   380,  17, 36, 20,  4,  40,  840, 1,  4),
  rf('seed-arby-beef-gyro',           "Spiced Beef Gyro",                    "Arby's",        '1 sandwich', 470,  22, 44, 24,  8,  55, 1110, 2,  8),

  // ── Popeyes ─────────────────────────────────────────────────────
  rf('seed-popy-classic-chicken',     "Classic Chicken Sandwich",            "Popeyes",       '1 sandwich', 390,  24, 35, 17,  3,  50,  840, 2,  4),
  rf('seed-popy-spicy-chicken',       "Spicy Chicken Sandwich",              "Popeyes",       '1 sandwich', 410,  24, 35, 18,  3,  50,  940, 2,  4),
  rf('seed-popy-chicken-tenders-2',   "Chicken Tenders (2 pc)",              "Popeyes",       '2 pieces',   250,  15, 13, 15,  3,  30,  380, 0,  1),
  rf('seed-popy-chicken-tenders-3',   "Chicken Tenders (3 pc)",              "Popeyes",       '3 pieces',   370,  23, 20, 22,  4,  45,  570, 0,  2),
  rf('seed-popy-chicken-tenders-5',   "Chicken Tenders (5 pc)",              "Popeyes",       '5 pieces',   630,  39, 33, 38,  7,  75,  960, 1,  3),

  // ── Jimmy John's ────────────────────────────────────────────────
  // Nutrition verified against Jimmy John's official current Nutrition Guide
  // (Effective 3.3.2025) — replaces a previous partial/inaccurate set.
  // Originals (8" French bread, with lettuce/tomato/mayo)
  rf('seed-jj-pepe-8in',              "Pepe",                                "Jimmy John's",  '1 sandwich (8")', 600, 29, 50, 29,  9,  70, 1570, 4, 4),
  rf('seed-jj-bigjohn-8in',           "Big John",                            "Jimmy John's",  '1 sandwich (8")', 500, 26, 47, 21,3.5,  60, 1110, 4, 2),
  rf('seed-jj-totallytuna-8in',       "Totally Tuna",                        "Jimmy John's",  '1 sandwich (8")', 510, 21, 51, 22,  3,  40, 1160, 5, 4),
  rf('seed-jj-turkeytom-8in',         "Turkey Tom",                          "Jimmy John's",  '1 sandwich (8")', 480, 23, 48, 19,2.5,  50, 1160, 4, 2),
  rf('seed-jj-vito-8in',              "Vito",                                "Jimmy John's",  '1 sandwich (8")', 570, 32, 52, 26, 11,  85, 1850, 5, 4),
  rf('seed-jj-veggie-8in',            "The Veggie",                          "Jimmy John's",  '1 sandwich (8")', 670, 27, 50, 38, 14,  60, 1260, 5, 3),
  rf('seed-jj-jjblt-8in',             "J.J.B.L.T.",                          "Jimmy John's",  '1 sandwich (8")', 710, 28, 70, 33,  8,  45, 1580, 6, 2),
  rf('seed-jj-spicy-eastcoast-8in',   "Spicy East Coast Italian",            "Jimmy John's",  '1 sandwich (8")',1020, 50, 77, 54, 18, 160, 3440, 7, 5),
  // Favorites (8" French bread)
  rf('seed-jj-billyclub-8in',         "Billy Club",                          "Jimmy John's",  '1 sandwich (8")', 810, 50, 73, 32, 10, 110, 2360, 6, 4),
  rf('seed-jj-italiannight-8in',      "Italian Night Club",                  "Jimmy John's",  '1 sandwich (8")', 930, 48, 77, 46, 14, 130, 2850, 6, 5),
  rf('seed-jj-huntersclub-8in',       "Hunter's Club",                       "Jimmy John's",  '1 sandwich (8")', 830, 55, 70, 34, 10, 130, 2080, 6, 2),
  rf('seed-jj-countryclub-8in',       "Country Club",                        "Jimmy John's",  '1 sandwich (8")', 780, 48, 74, 30,  9, 100, 2350, 6, 4),
  rf('seed-jj-beachclub-8in',         "Beach Club",                          "Jimmy John's",  '1 sandwich (8")', 850, 45, 75, 39, 14,  95, 2050, 7, 3),
  rf('seed-jj-jimmycubano-8in',       "Jimmy Cubano",                        "Jimmy John's",  '1 sandwich (8")', 830, 43, 71, 38, 13,  90, 3330, 6, 2),
  rf('seed-jj-bootleggerclub-8in',    "Bootlegger Club",                     "Jimmy John's",  '1 sandwich (8")', 680, 44, 71, 23,3.5,  90, 1890, 6, 2),
  rf('seed-jj-clubtuna-8in',          "Club Tuna",                           "Jimmy John's",  '1 sandwich (8")', 860, 42, 76, 40, 14,  85, 1980, 7, 4),
  rf('seed-jj-clublulu-8in',          "Club Lulu",                           "Jimmy John's",  '1 sandwich (8")', 690, 35, 71, 26,  5,  65, 1760, 6, 2),
  rf('seed-jj-ultimateporker-8in',    "Ultimate Porker",                     "Jimmy John's",  '1 sandwich (8")', 690, 33, 72, 28,  6,  60, 1890, 6, 3),
  rf('seed-jj-gargantuan-8in',        "The J.J. Gargantuan",                 "Jimmy John's",  '1 sandwich (8")',1080, 78, 78, 49, 15, 205, 3930, 6, 5),
  rf('seed-jj-chickencaesar-8in',     "Chicken Caesar",                      "Jimmy John's",  '1 sandwich (8")', 870, 39, 79, 43,  9,  90, 2160, 5, 3),
  rf('seed-jj-kickinranch-wrap',      "Kickin' Ranch Chicken Wrap",          "Jimmy John's",  '1 wrap',           850, 39, 60, 42, 12,  95, 1970, 6, 4),
  rf('seed-jj-tuscanitalian-8in',     "Tuscan Italian",                      "Jimmy John's",  '1 sandwich (8")', 840, 45, 62, 45, 13, 130, 2760, 5, 5),
  // Plain Slims (8" French bread, meat/cheese only — no veggies/condiments)
  rf('seed-jj-pepe-slim',             "Pepe (Plain Slim)",                   "Jimmy John's",  '1 sandwich (8" Slim)', 540, 33, 69, 13,  6,  50, 1610, 4, 1),
  rf('seed-jj-bigjohn-slim',          "Big John (Plain Slim)",               "Jimmy John's",  '1 sandwich (8" Slim)', 440, 30, 66,  5,  1,  45, 1200, 4, 0),
  rf('seed-jj-totallytuna-slim',      "Totally Tuna (Plain Slim)",           "Jimmy John's",  '1 sandwich (8" Slim)', 600, 24, 70, 23,  3,  30, 1410, 5, 2),
  rf('seed-jj-turkeytom-slim',        "Turkey Tom (Plain Slim)",             "Jimmy John's",  '1 sandwich (8" Slim)', 420, 27, 68,  3,  0,  30, 1250, 4, 0),
  rf('seed-jj-vito-slim',             "Vito (Plain Slim)",                   "Jimmy John's",  '1 sandwich (8" Slim)', 630, 35, 69, 23, 10,  85, 1980, 4, 1),
  rf('seed-jj-veggie-slim',           "The Veggie (Plain Slim)",             "Jimmy John's",  '1 sandwich (8" Slim)', 590, 30, 68, 21, 11,  45, 1180, 4, 0),
  // Little Johns (mini version of each Original)
  rf('seed-jj-littlejohn-1',          "Little John 1 (Pepe)",                "Jimmy John's",  '1 mini sandwich', 300, 15, 25, 15,  4,  35,  770, 2, 2),
  rf('seed-jj-littlejohn-2',          "Little John 2 (Big John)",            "Jimmy John's",  '1 mini sandwich', 250, 13, 24, 11,  2,  30,  560, 2, 1),
  rf('seed-jj-littlejohn-3',          "Little John 3 (Totally Tuna)",        "Jimmy John's",  '1 mini sandwich', 250, 10, 26, 11,1.5,  15,  590, 3, 2),
  rf('seed-jj-littlejohn-4',          "Little John 4 (Turkey Tom)",          "Jimmy John's",  '1 mini sandwich', 240, 12, 24, 10,1.5,  25,  580, 2, 1),
  rf('seed-jj-littlejohn-5',          "Little John 5 (Vito)",                "Jimmy John's",  '1 mini sandwich', 290, 16, 26, 13,  5,  40,  900, 2, 2),
  rf('seed-jj-littlejohn-6',          "Little John 6 (The Veggie)",          "Jimmy John's",  '1 mini sandwich', 340, 13, 25, 20,  7,  30,  580, 3, 1),
  rf('seed-jj-littlejohn-blt',        "Little John B.L.T.",                  "Jimmy John's",  '1 mini sandwich', 300, 12, 24, 16,4.5,  25,  680, 2, 1),

  // ── Subway ──────────────────────────────────────────────────────
  rf('seed-sub-italian-6in',          "Italian BMT (6\\\")",                  "Subway",        '1 sandwich', 280,  13, 37, 10,  4,  30,  880, 2,  4),
  rf('seed-sub-italian-footlong',     "Italian BMT (Footlong)",              "Subway",        '1 sandwich', 560,  27, 74, 19,  7,  60, 1760, 3,  8),
  rf('seed-sub-spicy-italian-6in',    "Spicy Italian (6\\\")",               "Subway",        '1 sandwich', 310,  13, 37, 14,  5,  35,  940, 2,  4),
  rf('seed-sub-spicy-italian-footlong',"Spicy Italian (Footlong)",           "Subway",        '1 sandwich', 620,  27, 74, 28, 10,  70, 1880, 3,  8),
  rf('seed-sub-turkey-6in',           "Turkey Breast (6\\\")",               "Subway",        '1 sandwich', 240,  16, 37,  4,  1,  20,  680, 2,  4),
  rf('seed-sub-turkey-footlong',      "Turkey Breast (Footlong)",            "Subway",        '1 sandwich', 480,  33, 74,  7,  2,  40, 1360, 4,  8),
  rf('seed-sub-turkey-bacon-6in',     "Turkey Bacon & Guacamole (6\\\")",    "Subway",        '1 sandwich', 340,  17, 37, 15,  4,  25,  920, 2,  5),
  rf('seed-sub-turkey-bacon-footlong',"Turkey Bacon & Guacamole (Footlong)","Subway",        '1 sandwich', 680,  34, 74, 29,  8,  50, 1840, 4, 10),
  rf('seed-sub-veggie-6in',           "Veggie Delite (6\\\")",               "Subway",        '1 sandwich', 230,   8, 39,  3,  1,   0,  570, 2,  4),
  rf('seed-sub-veggie-footlong',      "Veggie Delite (Footlong)",            "Subway",        '1 sandwich', 460,  16, 78,  5,  1,   0, 1140, 4,  8),

  // ── Panera Bread ────────────────────────────────────────────────
  rf('seed-panera-full-chicken-asiago','Full Asiago Roast Chicken Sandwich', "Panera Bread",  '1 sandwich', 640,  48, 59, 22,  5, 105, 1360, 3,  8),
  rf('seed-panera-half-chicken-asiago','Half Asiago Roast Chicken Sandwich', "Panera Bread",  '½ sandwich', 320,  24, 29, 11,  3,  55,  680, 2,  4),
  rf('seed-panera-full-turkey-avocado','Full Turkey Sandwich',               "Panera Bread",  '1 sandwich', 610,  50, 61, 17,  3,  85, 1290, 4,  6),
  rf('seed-panera-half-turkey-avocado','Half Turkey Sandwich',               "Panera Bread",  '½ sandwich', 305,  25, 30,  8,  2,  42,  645, 2,  3),
  rf('seed-panera-tomato-mozzarella', "Tomato Mozzarella Sandwich",          "Panera Bread",  '1 sandwich', 490,  19, 57, 20,  7,  30, 1080, 3,  8),
  rf('seed-panera-mac-cheese-full',   "Mac & Cheese",                        "Panera Bread",  '1 bowl',     680,  27, 76, 27, 12,  50, 1380, 4, 11),
  rf('seed-panera-mac-cheese-half',   "Mac & Cheese (half)",                 "Panera Bread",  '½ bowl',     340,  14, 38, 14,  6,  25,  690, 2,  5),

  // ── Chick-fil-A ────────────────────────────────────────────────
  rf('seed-cfa-original-sandwich',    "Original Chicken Sandwich",           "Chick-fil-A",   '1 sandwich', 440,  28, 41, 19,  4,  75, 1350, 2,  6),
  rf('seed-cfa-spicy-deluxe',         "Spicy Deluxe Sandwich",               "Chick-fil-A",   '1 sandwich', 550,  36, 47, 26,  7, 100, 1750, 2,  7),
  rf('seed-cfa-grilled-sandwich',     "Grilled Chicken Sandwich",            "Chick-fil-A",   '1 sandwich', 390,  36, 38, 11,  2,  80, 1120, 2,  7),
  rf('seed-cfa-nuggets-8pc',          "Chicken Nuggets (8 pc)",              "Chick-fil-A",   '8 pieces',   260,  27, 11, 12,  2,  70, 1210, 0,  1),
  rf('seed-cfa-strips-3pc',           "Chicken Strips (3 pc)",               "Chick-fil-A",   '3 strips',   370,  37, 21, 17,  3,  65, 1210, 0,  2),
  rf('seed-cfa-waffle-fries-med',     "Waffle Fries (Medium)",               "Chick-fil-A",   '1 medium',   420,   5, 50, 22,  4,   0,  260, 5,  0),

  // ── Wingstop Chicken Tenders ───────────────────────────────────
  // 3-piece tenders
  rf('seed-ws-tender-3pc-atomic',     "Chicken Tenders 3pc - Atomic",       "Wingstop",      '3 pieces',   450,  30, 36, 21,  3,  90, 2550, 0,  0),
  rf('seed-ws-tender-3pc-cajun',      "Chicken Tenders 3pc - Cajun",        "Wingstop",      '3 pieces',   450,  30, 33, 21,  3,  90, 3060, 0,  0),
  rf('seed-ws-tender-3pc-garlic',     "Chicken Tenders 3pc - Garlic Parm",  "Wingstop",      '3 pieces',   630,  30, 33, 42,  8,  90, 1650, 0,  0),
  rf('seed-ws-tender-3pc-hawaiian',   "Chicken Tenders 3pc - Hawaiian",     "Wingstop",      '3 pieces',   480,  30, 48, 21,  3,  90, 1740, 0, 15),
  rf('seed-ws-tender-3pc-hickory',    "Chicken Tenders 3pc - Hickory BBQ",  "Wingstop",      '3 pieces',   510,  30, 51, 21,  3,  90, 2130, 0, 18),
  rf('seed-ws-tender-3pc-honey-rub',  "Chicken Tenders 3pc - Hot Honey",    "Wingstop",      '3 pieces',   660,  30, 42, 42,  8,  90, 2340, 0,  9),
  rf('seed-ws-tender-3pc-lemon',      "Chicken Tenders 3pc - Lemon Pepper", "Wingstop",      '3 pieces',   600,  30, 30, 39,  8,  90, 1860, 0,  0),
  rf('seed-ws-tender-3pc-louisiana',  "Chicken Tenders 3pc - Louisiana",    "Wingstop",      '3 pieces',   540,  30, 30, 36,  6,  90, 1620, 0,  0),
  rf('seed-ws-tender-3pc-mango',      "Chicken Tenders 3pc - Mango Hab",    "Wingstop",      '3 pieces',   510,  30, 51, 21,  3,  90, 1710, 0, 21),
  rf('seed-ws-tender-3pc-mild',       "Chicken Tenders 3pc - Mild",         "Wingstop",      '3 pieces',   600,  30, 30, 42,  8,  90, 2190, 0,  0),
  rf('seed-ws-tender-3pc-original',   "Chicken Tenders 3pc - Original Hot", "Wingstop",      '3 pieces',   420,  30, 30, 21,  3,  90, 2610, 0,  0),
  rf('seed-ws-tender-3pc-plain',      "Chicken Tenders 3pc - Plain",        "Wingstop",      '3 pieces',   420,  30, 30, 21,  3,  90, 1410, 0,  0),
  rf('seed-ws-tender-3pc-korean',     "Chicken Tenders 3pc - Spicy Korean", "Wingstop",      '3 pieces',   510,  30, 48, 21,  3,  90, 2040, 0, 18),
  // 5-piece tenders
  rf('seed-ws-tender-5pc-atomic',     "Chicken Tenders 5pc - Atomic",       "Wingstop",      '5 pieces',   750,  50, 60, 35,  5, 150, 4250, 0,  0),
  rf('seed-ws-tender-5pc-cajun',      "Chicken Tenders 5pc - Cajun",        "Wingstop",      '5 pieces',   750,  50, 55, 35,  5, 150, 5100, 0,  0),
  rf('seed-ws-tender-5pc-garlic',     "Chicken Tenders 5pc - Garlic Parm",  "Wingstop",      '5 pieces',  1050,  50, 55, 70, 13, 150, 2750, 0,  0),
  rf('seed-ws-tender-5pc-hawaiian',   "Chicken Tenders 5pc - Hawaiian",     "Wingstop",      '5 pieces',   800,  50, 80, 35,  5, 150, 2900, 0, 25),
  rf('seed-ws-tender-5pc-hickory',    "Chicken Tenders 5pc - Hickory BBQ",  "Wingstop",      '5 pieces',   850,  50, 85, 35,  5, 150, 3550, 0, 30),
  rf('seed-ws-tender-5pc-honey-rub',  "Chicken Tenders 5pc - Hot Honey",    "Wingstop",      '5 pieces',  1100,  50, 70, 70, 13, 150, 3900, 0, 15),
  rf('seed-ws-tender-5pc-lemon',      "Chicken Tenders 5pc - Lemon Pepper", "Wingstop",      '5 pieces',  1000,  50, 50, 65, 13, 150, 3100, 0,  0),
  rf('seed-ws-tender-5pc-louisiana',  "Chicken Tenders 5pc - Louisiana",    "Wingstop",      '5 pieces',   900,  50, 50, 60, 10, 150, 2700, 0,  0),
  rf('seed-ws-tender-5pc-mango',      "Chicken Tenders 5pc - Mango Hab",    "Wingstop",      '5 pieces',   850,  50, 85, 35,  5, 150, 2850, 0, 35),
  rf('seed-ws-tender-5pc-mild',       "Chicken Tenders 5pc - Mild",         "Wingstop",      '5 pieces',  1000,  50, 50, 70, 13, 150, 3650, 0,  0),
  rf('seed-ws-tender-5pc-original',   "Chicken Tenders 5pc - Original Hot", "Wingstop",      '5 pieces',   700,  50, 50, 35,  5, 150, 4350, 0,  0),
  rf('seed-ws-tender-5pc-plain',      "Chicken Tenders 5pc - Plain",        "Wingstop",      '5 pieces',   700,  50, 50, 35,  5, 150, 2350, 0,  0),
  rf('seed-ws-tender-5pc-korean',     "Chicken Tenders 5pc - Spicy Korean", "Wingstop",      '5 pieces',   850,  50, 80, 35,  5, 150, 3400, 0, 30),
  // Sizer entry
  { id: 'seed-ws-tenders-sizer', name: 'Chicken Tenders — Pick Size & Flavor 🍗', brand: 'Wingstop', servingSizeG: 1, servingLabel: '1 order', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },
];
