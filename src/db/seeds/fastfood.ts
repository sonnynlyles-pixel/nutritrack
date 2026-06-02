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
  rf('seed-jm-italian-sub-reg',       "Italian Sub (Regular)",               "Jersey Mike's", '1 sandwich', 720,  36, 61, 40, 14, 105, 1700, 3,  7),
  rf('seed-jm-roast-beef-reg',        "Roast Beef (Regular)",                "Jersey Mike's", '1 sandwich', 610,  42, 61, 19,  8,  75, 1140, 3,  6),
  rf('seed-jm-steak-cheese-reg',      "Steak & Cheese (Regular)",            "Jersey Mike's", '1 sandwich', 630,  38, 63, 26, 10,  85, 1350, 3,  7),

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
  rf('seed-mcd-dbl-sausage-mcmuffin', "Double Sausage McMuffin with Egg",    "McDonald's",    '1 sandwich', 600,  28, 30, 42, 14, 290, 1150, 1,  3),
  rf('seed-mcd-sausage-patty',        "Sausage Patty",                       "McDonald's",    '1 patty',    170,   9,  0, 15,  5,  40,  370, 0,  0),
  rf('seed-mcd-bacon',                "Bacon",                               "McDonald's",    '2 slices',    90,   7,  0,  7,  3,  15,  310, 0,  0),

  // ── Burger King ────────────────────────────────────────────────
  rf('seed-bk-whopper',               "Whopper",                             "Burger King",   '1 burger',   660,  28, 52, 40, 12, 100,  980, 3, 11),
  rf('seed-bk-whopper-jr',            "Whopper Jr.",                         "Burger King",   '1 burger',   340,  15, 31, 18,  6,  55,  520, 2,  6),
  rf('seed-bk-double-whopper',        "Double Whopper",                      "Burger King",   '1 burger',   960,  54, 52, 57, 18, 155, 1130, 3, 11),
  rf('seed-bk-triple-whopper',        "Triple Whopper",                      "Burger King",   '1 burger',  1260,  81, 52, 76, 25, 210, 1280, 3, 11),
  rf('seed-bk-whopper-plant-based',   "Whopper (Plant-Based)",               "Burger King",   '1 burger',   630,  25, 55, 35, 10,   0, 1320, 4, 10),
  rf('seed-bk-flame-grilled-burger',  "Flame Grilled Burger",                "Burger King",   '1 burger',   290,  17, 28, 13,  5,  45,  590, 2,  5),
  rf('seed-bk-double-burger',         "Double Flame Grilled Burger",         "Burger King",   '1 burger',   480,  32, 29, 25,  9,  90, 1000, 2,  5),
  rf('seed-bk-croissan-wich-saus',    "Croissan'wich (Sausage)",             "Burger King",   '1 sandwich', 450,  17, 25, 30, 13,  60, 1030, 1,  3),
  rf('seed-bk-croissan-wich-bacon',   "Croissan'wich (Bacon, Egg & Cheese)", "Burger King",   '1 sandwich', 340,  17, 24, 19,  8, 180, 1110, 0,  3),

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
  rf('seed-jj-pepe-slim',             "Pepe (Slim)",                         "Jimmy John's",  '1 sandwich', 325,  16, 30, 14,  5,  60, 1090, 1,  3),
  rf('seed-jj-pepe-8in',              "Pepe (8\\\")",                         "Jimmy John's",  '1 sandwich', 650,  32, 60, 29, 10, 120, 2180, 2,  6),
  rf('seed-jj-pepe-giant',            "Pepe (Giant)",                        "Jimmy John's",  '1 sandwich', 975,  48, 90, 43, 15, 180, 3270, 3,  9),
  rf('seed-jj-vito-slim',             "Vito (Slim)",                         "Jimmy John's",  '1 sandwich', 405,  21, 30, 21,  8,  75, 1570, 1,  3),
  rf('seed-jj-vito-8in',              "Vito (8\\\")",                         "Jimmy John's",  '1 sandwich', 810,  42, 60, 41, 16, 150, 3140, 2,  6),
  rf('seed-jj-gourmet-smoked-ham-slim',"Gourmet Smoked Ham (Slim)",          "Jimmy John's",  '1 sandwich', 305,  17, 30, 12,  4,  50, 1030, 1,  2),
  rf('seed-jj-bootlegger-slim',       "Bootlegger (Slim)",                   "Jimmy John's",  '1 sandwich', 385,  21, 30, 19,  7,  75, 1230, 1,  3),
  rf('seed-jj-billy-slim',            "Billy (Slim)",                        "Jimmy John's",  '1 sandwich', 365,  22, 30, 16,  5,  80, 1080, 1,  2),
  rf('seed-jj-italian-night-slim',    "Italian Night Club (Slim)",           "Jimmy John's",  '1 sandwich', 545,  27, 30, 36, 11, 115, 1570, 1,  3),

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
];
