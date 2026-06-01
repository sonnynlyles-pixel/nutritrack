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

  // ── Taco Bell – Tacos ───────────────────────────────────────────
  rf('seed-tb-crunchy-taco',          "Crunchy Taco",                        "Taco Bell",     '1 taco',     170,   8, 13,  9,  4,  25,  300, 2,  1),
  rf('seed-tb-crunchy-taco-supreme',  "Crunchy Taco Supreme",                "Taco Bell",     '1 taco',     200,   9, 15, 11,  5,  35,  330, 3,  2),
  rf('seed-tb-soft-taco-beef',        "Soft Taco (Beef)",                    "Taco Bell",     '1 taco',     200,   9, 20,  9,  4,  25,  580, 2,  2),
  rf('seed-tb-soft-taco-supreme',     "Soft Taco Supreme (Beef)",            "Taco Bell",     '1 taco',     230,  10, 22, 11,  5,  35,  630, 3,  3),
  rf('seed-tb-soft-taco-chicken',     "Soft Taco (Chicken)",                 "Taco Bell",     '1 taco',     170,  11, 19,  5,  2,  30,  490, 2,  2),
  rf('seed-tb-soft-taco-steak',       "Soft Taco (Steak)",                   "Taco Bell",     '1 taco',     180,  10, 19,  6,  3,  25,  450, 2,  2),
  rf('seed-tb-doritos-locos-taco',    "Doritos Locos Taco (Nacho Cheese)",   "Taco Bell",     '1 taco',     170,   8, 14,  9,  4,  25,  310, 1,  1),
  rf('seed-tb-doritos-locos-cool',    "Doritos Locos Taco (Cool Ranch)",     "Taco Bell",     '1 taco',     170,   8, 14,  9,  4,  25,  290, 1,  1),
  rf('seed-tb-doritos-locos-fiery',   "Doritos Locos Taco (Fiery)",          "Taco Bell",     '1 taco',     170,   8, 14,  9,  4,  25,  310, 1,  1),
  rf('seed-tb-spicy-potato-soft-taco',"Spicy Potato Soft Taco",              "Taco Bell",     '1 taco',     250,   5, 30, 12,  2,   5,  540, 3,  2),
  rf('seed-tb-cantina-crispy-taco',   "Cantina Chicken Crispy Taco",         "Taco Bell",     '1 taco',     230,  13, 21, 11,  4,  40,  620, 2,  2),
  rf('seed-tb-cantina-soft-taco',     "Cantina Chicken Soft Taco",           "Taco Bell",     '1 taco',     200,  14, 19,  7,  2,  45,  620, 2,  1),

  // ── Taco Bell – Burritos ────────────────────────────────────────
  rf('seed-tb-bean-burrito',          "Bean Burrito",                        "Taco Bell",     '1 burrito',  350,  13, 55, 10,  4,  15, 1020, 8,  4),
  rf('seed-tb-burrito-supreme',       "Burrito Supreme (Beef)",              "Taco Bell",     '1 burrito',  400,  16, 51, 14,  6,  30, 1110, 6,  5),
  rf('seed-tb-burrito-supreme-chkn',  "Burrito Supreme (Chicken)",           "Taco Bell",     '1 burrito',  380,  18, 50, 11,  5,  45, 1210, 5,  5),
  rf('seed-tb-burrito-supreme-steak', "Burrito Supreme (Steak)",             "Taco Bell",     '1 burrito',  400,  19, 49, 13,  6,  35, 1110, 5,  5),
  rf('seed-tb-beefy-5-layer',         "Beefy 5-Layer Burrito",               "Taco Bell",     '1 burrito',  490,  19, 61, 19,  8,  40, 1190, 7,  5),
  rf('seed-tb-cheese-roll-up',        "Cheese Roll-Up",                      "Taco Bell",     '1 roll-up',  180,   9, 22,  7,  4,  25,  490, 1,  2),
  rf('seed-tb-cantina-burrito',       "Cantina Chicken Burrito",             "Taco Bell",     '1 burrito',  590,  30, 72, 18,  7,  75, 1590, 8,  5),
  rf('seed-tb-grilled-cheese-bur-beef',"Grilled Cheese Burrito (Beef)",      "Taco Bell",     '1 burrito',  700,  28, 73, 34, 13,  75, 1590, 8,  7),
  rf('seed-tb-grilled-cheese-bur-chkn',"Grilled Cheese Burrito (Chicken)",   "Taco Bell",     '1 burrito',  680,  32, 73, 29, 11,  85, 1730, 8,  7),
  rf('seed-tb-beefy-crunch-burrito',  "Beefy Crunch Burrito",                "Taco Bell",     '1 burrito',  510,  17, 66, 20,  8,  35, 1010, 5,  5),
  rf('seed-tb-cheesy-bean-rice-bur',  "Cheesy Bean & Rice Burrito",          "Taco Bell",     '1 burrito',  420,  13, 58, 15,  5,  15,  990, 7,  5),

  // ── Taco Bell – Chalupas ────────────────────────────────────────
  rf('seed-tb-chalupa-beef',          "Chalupa Supreme (Beef)",              "Taco Bell",     '1 chalupa',  350,  14, 32, 19,  7,  40,  610, 3,  5),
  rf('seed-tb-chalupa-chicken',       "Chalupa Supreme (Chicken)",           "Taco Bell",     '1 chalupa',  340,  18, 32, 16,  5,  55,  720, 3,  5),
  rf('seed-tb-chalupa-steak',         "Chalupa Supreme (Steak)",             "Taco Bell",     '1 chalupa',  360,  16, 33, 18,  6,  45,  690, 3,  5),

  // ── Taco Bell – Crunchwrap ──────────────────────────────────────
  rf('seed-tb-crunchwrap-beef',       "Crunchwrap Supreme (Beef)",           "Taco Bell",     '1 crunchwrap',540, 17, 73, 20,  8,  35, 1110, 5,  7),
  rf('seed-tb-crunchwrap-chicken',    "Crunchwrap Supreme (Chicken)",        "Taco Bell",     '1 crunchwrap',520, 21, 72, 17,  6,  50, 1220, 5,  7),
  rf('seed-tb-crunchwrap-steak',      "Crunchwrap Supreme (Steak)",          "Taco Bell",     '1 crunchwrap',540, 20, 73, 18,  7,  40, 1170, 5,  7),
  rf('seed-tb-crunchwrap-veggie',     "Veggie Crunchwrap Supreme",           "Taco Bell",     '1 crunchwrap',490, 12, 72, 19,  7,  15, 1000, 7,  7),

  // ── Taco Bell – Mexican Pizza & Specialties ─────────────────────
  rf('seed-tb-mexican-pizza',         "Mexican Pizza",                       "Taco Bell",     '1 pizza',    540,  20, 51, 28,  9,  45, 1010, 6,  5),
  rf('seed-tb-fiesta-taco-salad',     "Fiesta Taco Salad (Beef)",            "Taco Bell",     '1 salad',    760,  27, 78, 38, 12,  55, 1490,12,  9),
  rf('seed-tb-cantina-bowl',          "Cantina Chicken Bowl",                "Taco Bell",     '1 bowl',     470,  27, 59, 12,  4,  60, 1380, 7,  4),
  rf('seed-tb-power-bowl-chicken',    "Power Menu Bowl (Chicken)",           "Taco Bell",     '1 bowl',     490,  28, 53, 18,  6,  75, 1320, 8,  6),
  rf('seed-tb-power-bowl-veggie',     "Power Menu Bowl (Veggie)",            "Taco Bell",     '1 bowl',     430,  13, 62, 15,  6,  20, 1040,10,  7),
  rf('seed-tb-grilled-cheese-dip-taco',"Grilled Cheese Dipping Taco (Beef)","Taco Bell",     '1 taco',     470,  22, 40, 25, 11,  60, 1090, 3,  5),

  // ── Taco Bell – Quesadillas ─────────────────────────────────────
  rf('seed-tb-chicken-quesadilla',    "Chicken Quesadilla",                  "Taco Bell",     '1 quesadilla',510, 28, 39, 24, 11,  80, 1200, 3,  3),
  rf('seed-tb-steak-quesadilla',      "Steak Quesadilla",                    "Taco Bell",     '1 quesadilla',520, 27, 39, 26, 12,  75, 1200, 3,  3),
  rf('seed-tb-beef-quesadilla',       "Beef Quesadilla",                     "Taco Bell",     '1 quesadilla',490, 23, 39, 24, 11,  60, 1130, 3,  3),
  rf('seed-tb-cantina-quesadilla',    "Cantina Chicken Quesadilla",          "Taco Bell",     '1 quesadilla',500, 29, 41, 23,  9,  85, 1430, 3,  3),

  // ── Taco Bell – Nachos & Snacks ─────────────────────────────────
  rf('seed-tb-nachos-bellgrande',     "Nachos BellGrande",                   "Taco Bell",     '1 order',    740,  20, 82, 38,  8,  35, 1250,11,  5),
  rf('seed-tb-chips-nacho-cheese',    "Chips & Nacho Cheese Sauce",          "Taco Bell",     '1 order',    220,   3, 28, 11,  2,   5,  420, 1,  1),
  rf('seed-tb-chips-guacamole',       "Chips & Guacamole",                   "Taco Bell",     '1 order',    250,   3, 33, 13,  2,   0,  290, 4,  2),

  // ── Taco Bell – Sides ───────────────────────────────────────────
  rf('seed-tb-seasoned-rice',         "Seasoned Rice",                       "Taco Bell",     '1 side',     130,   3, 25,  3,  0,   0,  310, 1,  0),
  rf('seed-tb-black-beans',           "Black Beans",                         "Taco Bell",     '1 side',      80,   4, 13,  2,  0,   0,  270, 4,  0),
  rf('seed-tb-cinnamon-twists',       "Cinnamon Twists",                     "Taco Bell",     '1 order',    170,   1, 26,  7,  0,   0,  115, 0, 10),
  rf('seed-tb-nacho-cheese-side',     "Nacho Cheese Sauce (side)",           "Taco Bell",     '2 oz',        35,   1,  5,  2,  0,   5,  210, 0,  2),

  // ── Taco Bell – Breakfast ───────────────────────────────────────
  rf('seed-tb-bkfst-crunchwrap-saus', "Breakfast Crunchwrap (Sausage)",      "Taco Bell",     '1 item',     730,  25, 72, 38, 14, 185, 1390, 3,  6),
  rf('seed-tb-bkfst-crunchwrap-bac',  "Breakfast Crunchwrap (Bacon)",        "Taco Bell",     '1 item',     670,  24, 72, 33, 11, 185, 1400, 3,  6),
  rf('seed-tb-grande-bkfst-bur-saus', "Grande Toasted Breakfast Burrito (Sausage)","Taco Bell",'1 burrito',  670, 24, 56, 37, 14, 205, 1350, 3,  4),
  rf('seed-tb-grande-bkfst-bur-bac',  "Grande Toasted Breakfast Burrito (Bacon)", "Taco Bell",'1 burrito',  600, 23, 56, 30, 10, 200, 1360, 3,  4),
  rf('seed-tb-bkfst-soft-taco-saus',  "Breakfast Soft Taco (Sausage & Egg)", "Taco Bell",     '1 taco',     200,   9, 15, 12,  4, 135,  370, 1,  2),
  rf('seed-tb-bkfst-soft-taco-bacon', "Breakfast Soft Taco (Bacon & Egg)",   "Taco Bell",     '1 taco',     170,   8, 15,  9,  3, 135,  350, 1,  2),
  rf('seed-tb-hash-brown',            "Hash Brown",                          "Taco Bell",     '1 piece',    190,   2, 22, 10,  2,   0,  290, 2,  0),
  rf('seed-tb-cinnabon-2pc',          "Cinnabon Delights (2 pc)",            "Taco Bell",     '2 pieces',   160,   2, 22,  7,  4,   5,   90, 0, 12),
  rf('seed-tb-cinnabon-4pc',          "Cinnabon Delights (4 pc)",            "Taco Bell",     '4 pieces',   310,   5, 43, 14,  8,  10,  190, 1, 25),
  rf('seed-tb-cinnabon-12pc',         "Cinnabon Delights (12 pc)",           "Taco Bell",     '12 pieces',  930,  14,129, 42, 23,  30,  560, 3, 74),

  // ── Taco Bell – Drinks ──────────────────────────────────────────
  rf('seed-tb-baja-blast-med',        "Mountain Dew Baja Blast (Medium)",    "Taco Bell",     '30 fl oz',   230,   0, 62,  0,  0,   0,  115, 0, 62, 54),
  rf('seed-tb-baja-blast-zero-med',   "Mountain Dew Baja Blast Zero (Med)",  "Taco Bell",     '30 fl oz',    10,   0,  3,  0,  0,   0,  140, 0,  0, 54),
  rf('seed-tb-baja-blast-freeze-med', "Baja Blast Freeze (Medium)",          "Taco Bell",     '20 fl oz',   280,   0, 77,  0,  0,   0,   75, 0, 77, 54),
  rf('seed-tb-pepsi-med',             "Pepsi (Medium)",                      "Taco Bell",     '30 fl oz',   200,   0, 54,  0,  0,   0,   30, 0, 54, 38),
  rf('seed-tb-diet-pepsi-med',        "Diet Pepsi (Medium)",                 "Taco Bell",     '30 fl oz',     0,   0,  0,  0,  0,   0,   35, 0,  0, 35),
  rf('seed-tb-mtn-dew-med',           "Mountain Dew (Medium)",               "Taco Bell",     '30 fl oz',   290,   0, 77,  0,  0,   0,  100, 0, 77, 54),
  rf('seed-tb-starry-med',            "Starry (Medium)",                     "Taco Bell",     '30 fl oz',   190,   0, 52,  0,  0,   0,   55, 0, 52,  0),
  rf('seed-tb-brisk-tea-med',         "Brisk Iced Tea (Medium)",             "Taco Bell",     '30 fl oz',   150,   0, 41,  0,  0,   0,   40, 0, 41, 11),
  rf('seed-tb-wild-cherry-pepsi-med', "Wild Cherry Pepsi (Medium)",          "Taco Bell",     '30 fl oz',   210,   0, 57,  0,  0,   0,   30, 0, 57, 38),
  rf('seed-tb-sm-oj',                 "Orange Juice (Small)",                "Taco Bell",     '10 fl oz',   140,   2, 33,  0,  0,   0,   20, 0, 28),

  // ── Domino's (Large, Hand Tossed, 1 slice) ─────────────────────
  rf('seed-dom-cheese-slice',         "Cheese Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice',  290,  12, 37, 11,  5,  25,  680, 2,  4),
  rf('seed-dom-pepperoni-slice',      "Pepperoni Pizza (Large, Hand Tossed, 1 slice)", "Domino's", '1 slice', 330, 14, 37, 14,  6,  35,  820, 2,  4),

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
  rf('seed-lc-thin-crust-cheese',     "Thin Crust Cheese (1 slice)",         "Little Caesars",'1 slice',    170,   9, 18,  6,  3,  15,  420, 1,  1),
  rf('seed-lc-crazy-bread',           "Crazy Bread (1 piece)",               "Little Caesars",'1 piece',    130,   3, 20,  4,  1,   0,  250, 1,  1),
  rf('seed-lc-crazy-sauce',           "Crazy Sauce (side)",                  "Little Caesars",'1 side',     100,   0,  9,  7,  1,   0,  280, 0,  6),

  // ── Papa John's ─────────────────────────────────────────────────
  rf('seed-pj-cheese-lg-original',    "Cheese (Large, Original Crust, 1 slice)", "Papa John's",  '1 slice',  290,  12, 38, 10,  4,  20,  560, 2,  3),
  rf('seed-pj-pepperoni-lg-original', "Pepperoni (Large, Original Crust, 1 slice)", "Papa John's",'1 slice',  330,  14, 38, 14,  6,  30,  720, 2,  4),
  rf('seed-pj-cheese-lg-thin',        "Cheese (Large, Thin Crust, 1 slice)",  "Papa John's",  '1 slice',  230,  11, 22,  11, 5,  20,  480, 1,  2),
  rf('seed-pj-pepperoni-lg-thin',     "Pepperoni (Large, Thin Crust, 1 slice)", "Papa John's", '1 slice',  280,  13, 22, 15,  7,  30,  640, 1,  3),
  rf('seed-pj-cheese-lg-stuffed',     "Cheese (Large, Stuffed Crust, 1 slice)", "Papa John's", '1 slice',  420,  16, 47, 20,  9,  45,  970, 2,  5),
  rf('seed-pj-pepperoni-lg-stuffed',  "Pepperoni (Large, Stuffed Crust, 1 slice)","Papa John's",'1 slice', 470, 18, 47, 24, 11,  55, 1130, 2,  5),
  rf('seed-pj-the-works-lg-orig',     "The Works (Large, Original, 1 slice)",  "Papa John's",  '1 slice',  380,  16, 40, 18,  7,  45,  900, 2,  4),
  rf('seed-pj-garlic-knots-8pc',      "Garlic Knots (8 pc)",                 "Papa John's",   '8 pieces',  360,   8, 46, 16,  4,   5,  680, 2,  2),
  rf('seed-pj-chicken-poppers-8pc',   "Chicken Poppers (8 pc)",              "Papa John's",   '8 pieces',  380,  18, 32, 19,  4,  60,  810, 1,  1),
];
