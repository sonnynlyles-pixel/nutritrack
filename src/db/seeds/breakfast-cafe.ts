import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
  // ── Starbucks ──────────────────────────────────────────────────
  rf('seed-sbux-latte-grande',        "Caffè Latte, Grande (2% milk)",       "Starbucks",     '16 fl oz',   190,  13, 19,  7,  5,  25,  170, 0, 17, 150),
  rf('seed-sbux-caramel-mac-grande',  "Caramel Macchiato, Grande",           "Starbucks",     '16 fl oz',   250,  10, 37,  7,  4,  25,  150, 0, 33, 150),
  rf('seed-sbux-mocha-frapp-grande',  "Mocha Frappuccino, Grande",           "Starbucks",     '16 fl oz',   410,   5, 63, 15,  9,  55,  200, 1, 55, 110),
  rf('seed-sbux-bacon-egg-bites',     "Bacon & Gruyère Egg Bites",           "Starbucks",     '2 bites',    310,  19,  9, 22, 11, 215,  560, 0,  1,   0),
  rf('seed-sbux-butter-croissant',    "Butter Croissant",                    "Starbucks",     '1 croissant',260,   5, 31, 14,  8,  30,  230, 1,  8,   0),

  // ── Dunkin' – Donut Builder trigger ─────────────────────────────
  { id: 'seed-dun-donut-builder', name: "Dunkin' Donut Builder 🍩", brand: "Dunkin'", servingSizeG: 1, servingLabel: '1 donut', source: 'custom' as const, nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0, sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } },

  // ── Dunkin' – Donuts (also individually searchable) ──────────────
  rf('seed-dun-glazed-donut',         "Original Glazed Donut",               "Dunkin'",       '1 donut',    260,   4, 33, 13,  6,   0,  260, 1, 13),
  rf('seed-dun-boston-kreme',         "Boston Kreme Donut",                  "Dunkin'",       '1 donut',    300,   4, 43, 13,  6,   0,  310, 1, 20),
  rf('seed-dun-choc-frosted-donut',   "Chocolate Frosted Donut",             "Dunkin'",       '1 donut',    270,   3, 36, 13,  6,   0,  260, 1, 17),
  rf('seed-dun-straw-frosted-donut',  "Strawberry Frosted Donut",            "Dunkin'",       '1 donut',    260,   3, 35, 13,  6,   0,  260, 1, 16),
  rf('seed-dun-vanilla-frosted-donut',"Vanilla Frosted Donut",               "Dunkin'",       '1 donut',    260,   3, 35, 13,  6,   0,  260, 1, 16),
  rf('seed-dun-maple-frosted-donut',  "Maple Frosted Donut",                 "Dunkin'",       '1 donut',    260,   3, 35, 13,  6,   0,  260, 1, 16),
  rf('seed-dun-choc-glazed-donut',    "Chocolate Glazed Donut",              "Dunkin'",       '1 donut',    260,   3, 36, 12,  5,   0,  280, 1, 16),
  rf('seed-dun-marble-frosted-donut', "Marble Frosted Donut",                "Dunkin'",       '1 donut',    270,   3, 36, 13,  6,   0,  260, 1, 17),
  rf('seed-dun-glazed-sprinkles',     "Glazed with Sprinkles Donut",         "Dunkin'",       '1 donut',    270,   3, 35, 13,  6,   0,  260, 1, 15),
  rf('seed-dun-choc-sprinkles',       "Chocolate Frosted with Sprinkles",    "Dunkin'",       '1 donut',    280,   3, 38, 13,  6,   0,  260, 1, 19),
  rf('seed-dun-jelly-donut',          "Jelly Donut",                         "Dunkin'",       '1 donut',    290,   4, 40, 13,  5,   0,  280, 1, 15),
  rf('seed-dun-bavarian-kreme',       "Bavarian Kreme Donut",                "Dunkin'",       '1 donut',    290,   4, 38, 14,  6,   5,  280, 1, 14),
  rf('seed-dun-choc-kreme-filled',    "Chocolate Kreme Filled Donut",        "Dunkin'",       '1 donut',    340,   3, 45, 16,  8,   5,  340, 1, 21),
  rf('seed-dun-glazed-lemon-filled',  "Glazed Lemon Filled Donut",           "Dunkin'",       '1 donut',    260,   3, 37, 11,  5,   0,  250, 1, 16),
  rf('seed-dun-old-fashioned',        "Old Fashioned Donut",                 "Dunkin'",       '1 donut',    290,   3, 33, 17,  8,  15,  410, 1, 14),
  rf('seed-dun-cinnamon-cake',        "Cinnamon Cake Donut",                 "Dunkin'",       '1 donut',    330,   3, 41, 17,  8,  15,  380, 1, 21),
  rf('seed-dun-glazed-cake',          "Glazed Cake Donut",                   "Dunkin'",       '1 donut',    350,   3, 48, 17,  8,  15,  370, 1, 26),
  rf('seed-dun-choc-frosted-cake',    "Chocolate Frosted Cake Donut",        "Dunkin'",       '1 donut',    360,   3, 48, 18,  9,  15,  370, 1, 27),
  rf('seed-dun-blueberry-cake',       "Blueberry Cake Donut",                "Dunkin'",       '1 donut',    310,   3, 38, 16,  8,  15,  400, 1, 17),

  // ── Dunkin' – Munchkins ──────────────────────────────────────────
  rf('seed-dun-munchkins-5pc',        "Munchkins Glazed (5 pc)",             "Dunkin'",       '5 pieces',   200,   3, 26, 10,  5,   0,  170, 0, 10),
  rf('seed-dun-munchkins-10pc',       "Munchkins Glazed (10 pc)",            "Dunkin'",       '10 pieces',  390,   5, 52, 20,  9,   0,  340, 0, 21),
  rf('seed-dun-munchkins-choc-5pc',   "Munchkins Chocolate Glazed (5 pc)",   "Dunkin'",       '5 pieces',   210,   3, 28, 10,  5,   0,  170, 0, 13),
  rf('seed-dun-munchkins-jelly-5pc',  "Munchkins Jelly (5 pc)",              "Dunkin'",       '5 pieces',   210,   3, 31,  9,  4,   0,  180, 0, 12),
  rf('seed-dun-munchkins-of-5pc',     "Munchkins Old Fashioned Cake (5 pc)", "Dunkin'",       '5 pieces',   250,   3, 28, 14,  7,  10,  310, 0, 12),
  rf('seed-dun-munchkins-cake-5pc',   "Munchkins Chocolate Cake (5 pc)",     "Dunkin'",       '5 pieces',   260,   3, 32, 14,  7,  10,  280, 0, 14),

  // ── Dunkin' – Breakfast Sandwiches ──────────────────────────────
  rf('seed-dun-egg-chz-eng-muf',      "Egg & Cheese English Muffin",         "Dunkin'",       '1 sandwich', 320,  17, 31, 14,  7, 205,  730, 2,  4),
  rf('seed-dun-saus-egg-chz-eng',     "Sausage Egg & Cheese English Muffin", "Dunkin'",       '1 sandwich', 510,  22, 32, 32, 13, 255, 1060, 2,  5),
  rf('seed-dun-bacon-egg-chz-eng',    "Bacon Egg & Cheese English Muffin",   "Dunkin'",       '1 sandwich', 420,  24, 32, 20,  9, 235, 1010, 2,  5),
  rf('seed-dun-ham-egg-chz-eng',      "Ham Egg & Cheese English Muffin",     "Dunkin'",       '1 sandwich', 390,  25, 34, 15,  7, 225, 1100, 2,  7),
  rf('seed-dun-turkey-egg-chz-eng',   "Turkey Sausage Egg & Cheese Muffin",  "Dunkin'",       '1 sandwich', 480,  25, 33, 27, 11, 240, 1060, 2,  6),
  rf('seed-dun-saus-egg-chz-crois',   "Sausage Egg & Cheese Croissant",      "Dunkin'",       '1 sandwich', 680,  25, 38, 48, 20, 245, 1110, 1,  7),
  rf('seed-dun-bacon-egg-chz-crois',  "Bacon Egg & Cheese Croissant",        "Dunkin'",       '1 sandwich', 510,  21, 37, 31, 15, 225,  970, 1,  7),
  rf('seed-dun-egg-chz-croissant',    "Egg & Cheese Croissant",              "Dunkin'",       '1 sandwich', 360,  13, 36, 19, 10, 195,  660, 1,  6),
  rf('seed-dun-egg-chz-bagel',        "Egg & Cheese Bagel",                  "Dunkin'",       '1 sandwich', 440,  22, 65, 11,  5, 205, 1060, 3,  6),
  rf('seed-dun-bacon-egg-chz-bagel',  "Bacon Egg & Cheese Bagel",            "Dunkin'",       '1 sandwich', 540,  30, 65, 18,  8, 235, 1360, 3,  7),
  rf('seed-dun-saus-egg-chz-bagel',   "Sausage Egg & Cheese Bagel",          "Dunkin'",       '1 sandwich', 720,  29, 67, 37, 15, 255, 1410, 3,  7),
  rf('seed-dun-wakeup-egg-chz',       "Wake-Up Wrap Egg & Cheese",           "Dunkin'",       '1 wrap',     180,   8, 17,  9,  3, 165,  470, 1,  1),
  rf('seed-dun-wakeup-bacon',         "Wake-Up Wrap Bacon Egg & Cheese",     "Dunkin'",       '1 wrap',     220,  10, 17, 12,  4, 175,  570, 1,  1),
  rf('seed-dun-wakeup-saus',          "Wake-Up Wrap Sausage Egg & Cheese",   "Dunkin'",       '1 wrap',     290,  11, 17, 20,  7, 195,  650, 1,  1),

  // ── Dunkin' – Bagels & Baked Goods ──────────────────────────────
  rf('seed-dun-plain-bagel',          "Plain Bagel",                         "Dunkin'",       '1 bagel',    280,  10, 57,  1,  0,   0,  640, 2,  4),
  rf('seed-dun-sesame-bagel',         "Sesame Bagel",                        "Dunkin'",       '1 bagel',    290,  10, 57,  2,  0,   0,  640, 2,  4),
  rf('seed-dun-everything-bagel',     "Everything Bagel",                    "Dunkin'",       '1 bagel',    290,  10, 57,  2,  0,   0,  770, 2,  5),
  rf('seed-dun-cinnamon-raisin-bagel',"Cinnamon Raisin Bagel",               "Dunkin'",       '1 bagel',    310,  10, 62,  2,  0,   0,  570, 2, 12),
  rf('seed-dun-bagel-cream-cheese',   "Plain Bagel with Cream Cheese",       "Dunkin'",       '1 bagel',    430,  14, 67, 14,  7,  30,  820, 3,  9),
  rf('seed-dun-everything-cc',        "Everything Bagel with Cream Cheese",  "Dunkin'",       '1 bagel',    440,  14, 68, 15,  8,  30,  950, 3, 10),
  rf('seed-dun-blueberry-muffin',     "Blueberry Muffin",                    "Dunkin'",       '1 muffin',   460,   6, 71, 17,  3,  55,  430, 2, 39),
  rf('seed-dun-corn-muffin',          "Corn Muffin",                         "Dunkin'",       '1 muffin',   390,   6, 63, 14,  2,  50,  590, 2, 22),
  rf('seed-dun-honey-bran-muffin',    "Honey Bran Raisin Muffin",            "Dunkin'",       '1 muffin',   450,   6, 78, 13,  2,  50,  480, 4, 40),
  rf('seed-dun-double-choc-muffin',   "Double Chocolate Muffin",             "Dunkin'",       '1 muffin',   560,   7, 84, 22,  4,  55,  430, 3, 54),
  rf('seed-dun-croissant',            "Butter Croissant",                    "Dunkin'",       '1 croissant',340,   7, 36, 19, 11,  45,  370, 1,  6),
  rf('seed-dun-pretzel-stix',         "Pretzel Stix (3 pc)",                 "Dunkin'",       '3 pieces',   260,   7, 46,  6,  1,   0,  880, 2,  3),
  rf('seed-dun-snackin-bacon',        "Snackin' Bacon (8 strips)",           "Dunkin'",       '8 strips',   190,  18,  1, 12,  5,  60, 1010, 0,  1),
  rf('seed-dun-hash-browns',          "Hash Browns (6 pc)",                  "Dunkin'",       '6 pieces',   200,   2, 24, 10,  2,   0,  340, 2,  0),

  // ── Dunkin' – Hot Drinks ─────────────────────────────────────────
  rf('seed-dun-hot-coffee-sm',        "Hot Coffee Small (black)",            "Dunkin'",       '10 fl oz',     5,   0,  1,  0,  0,   0,    5, 0,  0, 180),
  rf('seed-dun-hot-coffee-med',       "Hot Coffee Medium (black)",           "Dunkin'",       '14 fl oz',    10,   0,  2,  0,  0,   0,   10, 0,  1, 270),
  rf('seed-dun-hot-coffee-lg',        "Hot Coffee Large (black)",            "Dunkin'",       '20 fl oz',    15,   0,  4,  0,  0,   0,   15, 0,  2, 360),
  rf('seed-dun-americano-med',        "Medium Americano",                    "Dunkin'",       '14 fl oz',    10,   1,  2,  0,  0,   0,   15, 0,  0, 284),
  rf('seed-dun-cappuccino-med',       "Medium Cappuccino",                   "Dunkin'",       '14 fl oz',   120,   7, 11,  5,  3,  20,  115, 0,  9, 166),
  rf('seed-dun-med-latte',            "Medium Latte",                        "Dunkin'",       '14 fl oz',   120,   8, 11,  5,  3,  20,  115, 0, 11, 166),
  rf('seed-dun-caramel-hot-latte',    "Medium Caramel Swirl Hot Latte",      "Dunkin'",       '14 fl oz',   310,   8, 51,  6,  3,  20,  135, 0, 49, 166),
  rf('seed-dun-mocha-hot-latte',      "Medium Mocha Latte",                  "Dunkin'",       '14 fl oz',   230,   8, 35,  6,  3,  20,  135, 0, 33, 166),
  rf('seed-dun-hot-chocolate-med',    "Medium Hot Chocolate",                "Dunkin'",       '14 fl oz',   330,   9, 58,  8,  4,  20,  295, 2, 48,  15),
  rf('seed-dun-hot-tea-med',          "Medium Hot Tea",                      "Dunkin'",       '14 fl oz',     0,   0,  0,  0,  0,   0,   10, 0,  0,  70),

  // ── Dunkin' – Iced & Cold Drinks ─────────────────────────────────
  rf('seed-dun-iced-coffee-med',      "Medium Iced Coffee (black)",          "Dunkin'",       '24 fl oz',    20,   0,  5,  0,  0,   0,    5, 0,  5, 297),
  rf('seed-dun-iced-coffee-cream-sug',"Medium Iced Coffee (cream & sugar)",  "Dunkin'",       '24 fl oz',   170,   1, 35,  4,  3,  15,   30, 0, 35, 297),
  rf('seed-dun-caramel-iced-latte',   "Medium Caramel Swirl Iced Latte",     "Dunkin'",       '24 fl oz',   310,   8, 53,  6,  4,  20,  135, 0, 50, 166),
  rf('seed-dun-mocha-iced-latte',     "Medium Mocha Iced Latte",             "Dunkin'",       '24 fl oz',   230,   8, 37,  6,  3,  20,  135, 0, 34, 166),
  rf('seed-dun-plain-iced-latte',     "Medium Iced Latte (plain)",           "Dunkin'",       '24 fl oz',    70,   7,  7,  2,  1,  10,   95, 0,  7, 166),
  rf('seed-dun-iced-americano-med',   "Medium Iced Americano",               "Dunkin'",       '24 fl oz',    10,   1,  2,  0,  0,   0,   20, 0,  0, 284),
  rf('seed-dun-cold-brew-med',        "Medium Cold Brew",                    "Dunkin'",       '24 fl oz',    15,   1,  3,  0,  0,   0,   10, 0,  3, 260),
  rf('seed-dun-frozen-coffee-med',    "Medium Frozen Coffee",                "Dunkin'",       '24 fl oz',   440,   4, 90,  9,  6,  30,  230, 0, 75, 196),
  rf('seed-dun-vanilla-bean-coolatta',"Medium Vanilla Bean Coolatta",        "Dunkin'",       '24 fl oz',   490,   2,110,  6,  4,  20,  150, 0,106,   0),
  rf('seed-dun-blue-razz-coolatta',   "Medium Blue Raspberry Coolatta",      "Dunkin'",       '24 fl oz',   340,   0, 86,  0,  0,   0,   35, 0, 86,   0),
  rf('seed-dun-straw-refresher-med',  "Medium Strawberry Refresher",         "Dunkin'",       '24 fl oz',   270,   0, 67,  0,  0,   0,   15, 0, 67,  60),
  rf('seed-dun-mango-refresher-med',  "Medium Mango Pineapple Refresher",    "Dunkin'",       '24 fl oz',   260,   0, 65,  0,  0,   0,   15, 0, 65,  60),
  rf('seed-dun-peach-refresher-med',  "Medium Peach Passion Fruit Refresher","Dunkin'",       '24 fl oz',   260,   0, 65,  0,  0,   0,   15, 0, 65,  60),

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
];
