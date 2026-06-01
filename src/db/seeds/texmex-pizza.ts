import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
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
  // Pancheros
  rf('seed-pancheros-build-bowl',     "Build Your Own Bowl",                 "Pancheros",     '1 bowl',     0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-pancheros-ing-protein-chicke', "Chicken",             "Pancheros", 'protein', 200, 35,  0,  6, 2,  95, 310, 0, 0),
  rf('seed-pancheros-ing-protein-beef',   "Ground Beef",         "Pancheros", 'protein', 300, 22,  0, 25, 9,  80, 500, 0, 0),
  rf('seed-pancheros-ing-protein-pastor', "Carnitas",            "Pancheros", 'protein', 240, 24,  0, 15, 5,  85, 480, 0, 0),
  rf('seed-pancheros-ing-protein-fish',   "Fish",                "Pancheros", 'protein', 120, 24,  0,  3, 1,  60, 120, 0, 0),
  rf('seed-pancheros-ing-rice-white',     "White Rice",          "Pancheros", 'rice',    190,  3, 42,  1, 0,   0, 290, 0, 0),
  rf('seed-pancheros-ing-rice-brown',     "Brown Rice",          "Pancheros", 'rice',    215,  5, 45,  1, 0,   0, 330, 1, 0),
  rf('seed-pancheros-ing-rice-none',      "No Rice",             "Pancheros", 'rice',      0,  0,  0,  0, 0,   0,   0, 0, 0),
  rf('seed-pancheros-ing-beans-black',    "Black Beans",         "Pancheros", 'beans',   130,  8, 24,  1, 0,   0, 180, 6, 0),
  rf('seed-pancheros-ing-beans-pinto',    "Pinto Beans",         "Pancheros", 'beans',   150, 10, 26,  2, 1,   0, 200, 7, 2),
  rf('seed-pancheros-ing-salsa-fresh',    "Fresh Salsa",         "Pancheros", 'salsa',    15,  1,  3,  0, 0,   0, 380, 1, 1),
  rf('seed-pancheros-ing-salsa-verde',    "Verde Salsa",         "Pancheros", 'salsa',    10,  0,  2,  0, 0,   0, 280, 0, 0),
  rf('seed-pancheros-ing-salsa-hot',      "Hot Salsa",           "Pancheros", 'salsa',    20,  1,  4,  0, 0,   0, 420, 1, 1),
  rf('seed-pancheros-ing-extra-queso',    "Queso",               "Pancheros", 'extra',   100,  6,  1,  8, 4,  25, 200, 0, 0),
  rf('seed-pancheros-ing-extra-guac',     "Guacamole",           "Pancheros", 'extra',   200,  3,  7, 20, 2,   0, 250, 5, 1),
  rf('seed-pancheros-ing-extra-lettuce',  "Lettuce",             "Pancheros", 'extra',     5,  0,  1,  0, 0,   0,  10, 0, 0),
  rf('seed-pancheros-ing-extra-tomato',   "Tomato",              "Pancheros", 'extra',    10,  0,  2,  0, 0,   0,   5, 1, 0),
  rf('seed-pancheros-ing-extra-sour',     "Sour Cream",          "Pancheros", 'extra',   100,  2,  2,  9, 6,  30,  40, 0, 1),

  // ── Taco Bell ────────────────────────────────────────────────────
  rf('seed-tb-crunchwrap-supreme',    "Crunchwrap Supreme",                  "Taco Bell",     '1 item',     520,  15, 50, 28,  8,  45, 1230, 3,  8),
  rf('seed-tb-beefy-5-layer-burrito', "Beefy 5-Layer Burrito",               "Taco Bell",     '1 item',     380,  16, 41, 17,  7,  40,  980, 3,  4),
  rf('seed-tb-burrito-supreme-beefy', "Burrito Supreme (Beefy)",             "Taco Bell",     '1 item',     540,  22, 52, 26,  9,  50, 1340, 7,  8),
  rf('seed-tb-cheesy-bean-rice',      "Cheesy Bean and Rice",                "Taco Bell",     '1 item',     370,  11, 50, 15,  6,  25,  950, 6,  4),
  rf('seed-tb-crunchy-taco',          "Crunchy Taco",                        "Taco Bell",     '1 item',     170,   8, 13,  9,  4,  25,  370, 1,  1),
  rf('seed-tb-soft-taco-beef',        "Soft Taco (Beef)",                    "Taco Bell",     '1 item',     200,   9, 20, 10,  4,  30,  470, 2,  2),
  rf('seed-tb-soft-taco-chicken',     "Soft Taco (Chicken)",                 "Taco Bell",     '1 item',     180,  11, 19,  7,  3,  40,  630, 2,  2),
  rf('seed-tb-soft-taco-steak',       "Soft Taco (Steak)",                   "Taco Bell",     '1 item',     180,  10, 19,  8,  3,  30,  640, 2,  2),
  rf('seed-tb-cheesy-roll-up',        "Cheesy Roll-Up",                      "Taco Bell",     '1 item',     280,  12, 23, 16,  7,  40,  550, 1,  1),
  rf('seed-tb-double-decker-taco',    "Double Decker Taco",                  "Taco Bell",     '1 item',     320,  13, 31, 16,  7,  40,  640, 4,  2),
  rf('seed-tb-black-bean-crunchwrap', "Black Beans Crunchwrap Supreme",      "Taco Bell",     '1 item',     480,  16, 51, 24,  8,  35, 1160, 8,  7),
  rf('seed-tb-chalupa-supreme-beef',  "Chalupa Supreme (Beef)",               "Taco Bell",     '1 item',     390,  14, 30, 24,  8,  40, 1040, 2,  3),
  rf('seed-tb-chalupa-supreme-chicken',"Chalupa Supreme (Chicken)",           "Taco Bell",     '1 item',     360,  16, 28, 21,  7,  50, 1100, 2,  2),
  rf('seed-tb-cheesy-fiesta-potatoes', "Cheesy Fiesta Potatoes",             "Taco Bell",     '1 item',     270,   7, 30, 14,  5,  20,  780, 3,  1),
  rf('seed-tb-chips-guacamole',       "Chips & Guacamole",                   "Taco Bell",     '1 item',     360,   6, 38, 20,  3,   0,  650, 5,  1),
  rf('seed-tb-cinna-twists',          "Cinnamon Twists",                     "Taco Bell",     '1 item',     170,   1, 24,  8,  2,   0,  210, 1, 12),
  rf('seed-tb-churros',               "Churros (1 piece)",                   "Taco Bell",     '1 piece',    170,   1, 20,  9,  3,   0,  130, 0,  6),
  rf('seed-tb-doritos-taco-nacho',    "Doritos Nacho Cheese Taco",           "Taco Bell",     '1 item',     460,  13, 40, 27,  8,  30, 1200, 2,  4),
  rf('seed-tb-doritos-taco-locos',    "Doritos Locos Taco",                  "Taco Bell",     '1 item',     370,  13, 30, 22,  8,  35, 1050, 1,  2),
  rf('seed-tb-mexican-pizza',         "Mexican Pizza",                       "Taco Bell",     '1 item',     540,  20, 48, 30, 10,  45, 1050, 3,  6),
  rf('seed-tb-meximelt',              "MexiMelt",                            "Taco Bell",     '1 item',     290,  14, 24, 16,  7,  40,  920, 1,  2),
  rf('seed-tb-nachos-bellgrande',     "Nachos BellGrande",                   "Taco Bell",     '1 item',     470,  13, 45, 27,  8,  35, 1330, 6,  4),
  rf('seed-tb-nachos-cheesy',         "Cheesy Nachos",                       "Taco Bell",     '1 item',     330,   8, 32, 19,  6,  20,  810, 2,  2),
  rf('seed-tb-pintos-cheese',         "Pintos and Cheese",                   "Taco Bell",     '1 item',     210,   9, 20, 11,  5,  25,  700, 3,  1),
  rf('seed-tb-quesadilla-cheese',     "Quesadilla (Cheese)",                 "Taco Bell",     '1 item',     350,  14, 32, 19,  9,  40,  800, 2,  3),
  rf('seed-tb-quesadilla-steak',      "Quesadilla (Steak)",                  "Taco Bell",     '1 item',     380,  18, 32, 21,  9,  55,  970, 2,  3),
  rf('seed-tb-quesadilla-chicken',    "Quesadilla (Chicken)",                "Taco Bell",     '1 item',     370,  17, 32, 20,  9,  50, 1000, 2,  3),
  rf('seed-tb-quesarito-burrito',     "Burritos - Quesarito Burrito",        "Taco Bell",     '1 item',     490,  18, 49, 24, 10,  45, 1190, 3,  5),
  rf('seed-tb-cheesy-bean-burrito',   "Cheesy Bean Burrito",                 "Taco Bell",     '1 item',     370,  12, 48, 15,  5,  25, 1110, 5,  3),
  rf('seed-tb-burrito-supreme-steak', "Burrito Supreme (Steak)",             "Taco Bell",     '1 item',     550,  25, 51, 27,  9,  65, 1360, 7,  8),
  rf('seed-tb-burritos-bellbeefer',   "Burritos Bell Beefer",                "Taco Bell",     '1 item',     350,  15, 35, 16,  7,  35,  950, 2,  3),
  rf('seed-tb-xxl-grilled-stuft',     "XXL Grilled Stuft Burrito",           "Taco Bell",     '1 item',     790,  28, 79, 39, 14,  60, 2040, 6,  8),

  // ── Domino's ────────────────────────────────────────────────────
  rf('seed-dom-medium-pizza-hand-1',  "Medium Hand-Tossed (1 slice)",        "Domino's",      '1 slice',    250,  11, 33, 10,  4,  15,  520, 2,  3),
  rf('seed-dom-medium-pizza-hand-2',  "Medium Hand-Tossed (2 slices)",       "Domino's",      '2 slices',   500,  22, 66, 20,  8,  30, 1040, 4,  6),
  rf('seed-dom-large-pizza-hand-1',   "Large Hand-Tossed (1 slice)",         "Domino's",      '1 slice',    280,  12, 36, 11,  4,  20,  560, 2,  4),
  rf('seed-dom-large-pizza-hand-2',   "Large Hand-Tossed (2 slices)",        "Domino's",      '2 slices',   560,  24, 72, 22,  8,  40, 1120, 4,  8),
  rf('seed-dom-medium-pizza-pan-1',   "Medium Pan Pizza (1 slice)",          "Domino's",      '1 slice',    280,  11, 34, 13,  5,  15,  580, 2,  3),
  rf('seed-dom-medium-pizza-pan-2',   "Medium Pan Pizza (2 slices)",         "Domino's",      '2 slices',   560,  22, 68, 26, 10,  30, 1160, 4,  6),
  rf('seed-dom-large-pizza-pan-1',    "Large Pan Pizza (1 slice)",           "Domino's",      '1 slice',    300,  12, 37, 14,  5,  20,  620, 2,  4),
  rf('seed-dom-large-pizza-pan-2',    "Large Pan Pizza (2 slices)",          "Domino's",      '2 slices',   600,  24, 74, 28, 10,  40, 1240, 4,  8),

  // ── Pizza Hut ────────────────────────────────────────────────────
  rf('seed-ph-medium-handtossed-1',   "Medium Hand-Tossed (1 slice)",        "Pizza Hut",     '1 slice',    240,  10, 30,  9,  4,  15,  480, 2,  2),
  rf('seed-ph-medium-handtossed-2',   "Medium Hand-Tossed (2 slices)",       "Pizza Hut",     '2 slices',   480,  20, 60, 18,  8,  30,  960, 4,  4),
  rf('seed-ph-large-handtossed-1',    "Large Hand-Tossed (1 slice)",         "Pizza Hut",     '1 slice',    280,  12, 36, 10,  4,  20,  560, 2,  3),
  rf('seed-ph-large-handtossed-2',    "Large Hand-Tossed (2 slices)",        "Pizza Hut",     '2 slices',   560,  24, 72, 20,  8,  40, 1120, 4,  6),
  rf('seed-ph-medium-pan-1',          "Medium Pan Pizza (1 slice)",          "Pizza Hut",     '1 slice',    280,  10, 32, 13,  5,  15,  520, 2,  2),
  rf('seed-ph-medium-pan-2',          "Medium Pan Pizza (2 slices)",         "Pizza Hut",     '2 slices',   560,  20, 64, 26, 10,  30, 1040, 4,  4),

  // ── Little Caesars ──────────────────────────────────────────────
  rf('seed-lc-med-1slice',            "Medium (1 slice)",                    "Little Caesars", '1 slice',    250,  10, 33, 10,  4,  15,  480, 1,  3),
  rf('seed-lc-med-2slices',           "Medium (2 slices)",                   "Little Caesars", '2 slices',   500,  20, 66, 20,  8,  30,  960, 2,  6),
  rf('seed-lc-large-1slice',          "Large (1 slice)",                     "Little Caesars", '1 slice',    280,  11, 36, 11,  4,  20,  540, 1,  3),
  rf('seed-lc-large-2slices',         "Large (2 slices)",                    "Little Caesars", '2 slices',   560,  22, 72, 22,  8,  40, 1080, 2,  6),

  // ── Papa John's ─────────────────────────────────────────────────
  rf('seed-pj-large-original-1',      "Large Original (1 slice)",            "Papa John's",   '1 slice',    290,  12, 36, 12,  4,  20,  540, 2,  4),
  rf('seed-pj-large-original-2',      "Large Original (2 slices)",           "Papa John's",   '2 slices',   580,  24, 72, 24,  8,  40, 1080, 4,  8),
  rf('seed-pj-large-thin-1',          "Large Thin Crust (1 slice)",          "Papa John's",   '1 slice',    220,  10, 26,  9,  3,  15,  420, 1,  3),
  rf('seed-pj-large-thin-2',          "Large Thin Crust (2 slices)",         "Papa John's",   '2 slices',   440,  20, 52, 18,  6,  30,  840, 2,  6),
  rf('seed-pj-large-pan-1',           "Large Pan Pizza (1 slice)",           "Papa John's",   '1 slice',    310,  12, 36, 13,  5,  20,  580, 2,  4),
  rf('seed-pj-large-pan-2',           "Large Pan Pizza (2 slices)",          "Papa John's",   '2 slices',   620,  24, 72, 26, 10,  40, 1160, 4,  8),

  // ── Panda Express ────────────────────────────────────────────────
  rf('seed-pe-orange-chicken',        "Orange Chicken",                      "Panda Express",  '1 item',     380,  16, 38, 17,  3,  35,  700, 2, 17),
  rf('seed-pe-black-pepper-steak',    "Black Pepper Angus Steak",            "Panda Express",  '1 item',     170,  16,  7,  8,  2,  35,  580, 0,  3),
  rf('seed-pe-kung-pao-chicken',      "Kung Pao Chicken",                    "Panda Express",  '1 item',     240,  15, 15, 13,  2,  40,  590, 0,  7),
  rf('seed-pe-sizzling-shrimp',       "Sizzling Shrimp",                     "Panda Express",  '1 item',     160,  15,  6,  7,  1, 140,  520, 0,  3),
  rf('seed-pe-hot-ones',              "Hot Ones Blazing Bourbon Chicken",    "Panda Express",  '1 item',     250,  14, 20, 12,  2,  40,  680, 1,  6),
  rf('seed-pe-fried-rice',            "Fried Rice",                          "Panda Express",  '1 item',     380,   9, 48, 16,  3,  25,  700, 2,  5),
  rf('seed-pe-white-rice',            "White Rice",                          "Panda Express",  '1 item',     200,   3, 45,  1,  0,   0,  350, 0,  0),
  rf('seed-pe-brown-rice',            "Brown Rice",                          "Panda Express",  '1 item',     210,   4, 45,  2,  0,   0,  330, 2,  0),
];
