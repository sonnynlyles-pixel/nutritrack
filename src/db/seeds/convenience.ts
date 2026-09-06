import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
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

  // ── QuikTrip: see src/db/seeds/quiktrip.ts for the full official menu ──

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

];
