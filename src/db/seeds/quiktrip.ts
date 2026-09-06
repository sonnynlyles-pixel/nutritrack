import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0, transFat = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

// AUTO-GENERATED from QuikTrip's official nutrition facts PDF (user-provided,
// "QT Kitchens Menu Label Report" style document). Mechanically parsed via
// script rather than hand-transcribed, given ~200 items across food/bakery
// sections. Scope: QT Kitchens hot food, bakery, roller grill, and condiments
// only -- fountain drinks, coffee/Brew Bar, smoothies, Freezoni, and iced teas
// were intentionally left out (lower value to track precisely; generic sodas
// already covered elsewhere in the seed database).
//
// The 8 "build a sub" varieties (Half/Whole x Wheat/White) use the SubBuilder
// picker (src/data/quiktripSubData.ts) instead of flat entries here -- same
// pattern as Jersey Mike's.

export const SEEDS: FoodItem[] = [

  // ── Flatbread ───────────────────────────────────────────
  rf('seed-qt-chicken-bacon-ranch',             "Chicken, Bacon & Ranch",                      "QuikTrip", '1 flatbread (186g)',              570, 31, 37, 33, 14, 85, 1750, 3, 3, 0, 0.5),
  rf('seed-qt-chicken-cheese',                  "Chicken & Cheese",                            "QuikTrip", '1 flatbread (155g)',              410, 24, 37, 19, 10, 65, 1230, 3, 2, 0, 0.5),

  // ── Breakfast Scramble ──────────────────────────────────
  rf('seed-qt-bacon-egg-cheese',                "Bacon, Egg & Cheese",                         "QuikTrip", '1 bowl (215g)',                   500, 31, 8, 37, 31, 560, 800, 0, 2, 0, 0.5),
  rf('seed-qt-protein',                         "Protein",                                     "QuikTrip", '1 bowl (236g)',                   590, 32, 9, 47, 25, 575, 1110, 1, 2, 0, 0.5),
  rf('seed-qt-sausage-egg-cheese',              "Sausage, Egg & Cheese",                       "QuikTrip", '1 bowl (229g)',                   550, 28, 10, 44, 15, 565, 900, 1, 2, 0, 0.5),
  rf('seed-qt-veggie',                          "Veggie",                                      "QuikTrip", '1 bowl (228g)',                   420, 25, 10, 32, 12, 540, 580, 1, 2, 0, 0.5),
  rf('seed-qt-egg-cheese',                      "Egg & Cheese",                                "QuikTrip", '1 bowl (194g)',                   410, 24, 8, 31, 12, 540, 450, 0, 1, 0, 0.5),

  // ── Breakfast Burrito ───────────────────────────────────
  rf('seed-qt-bacon-egg-cheese-no-gravy',       "Bacon, Egg & Cheese NO gravy",                "QuikTrip", '1 burrito (233g)',                660, 28, 57, 35, 15, 295, 1320, 2, 1, 0, 0.5),
  rf('seed-qt-bacon-egg-cheese-grab-and-go',    "Bacon, Egg & Cheese Grab and Go",             "QuikTrip", '1 burrito (206g)',                550, 21, 56, 27, 11, 270, 1340, 2, 1, 0, 0),
  rf('seed-qt-egg-cheese-2',                    "Egg & Cheese",                                "QuikTrip", '1 burrito (222g)',                590, 25, 57, 29, 13, 290, 1090, 2, 1, 0, 0.5),
  rf('seed-qt-sausage-egg-cheese-no-gravy',     "Sausage, Egg & Cheese NO gravy",              "QuikTrip", '1 burrito (240g)',                660, 27, 58, 36, 14, 300, 1320, 3, 1, 0, 0.5),
  rf('seed-qt-sausage-egg-cheese-grab-and-go',  "Sausage, Egg & Cheese Grab and Go",           "QuikTrip", '1 burrito (213g)',                560, 20, 57, 27, 10, 275, 1340, 2, 2, 0, 0),
  rf('seed-qt-the-ultimate',                    "The Ultimate",                                "QuikTrip", '1 burrito (335g)',                900, 37, 63, 55, 22, 335, 2190, 3, 2, 0, 0.5),

  // ── Croissant ───────────────────────────────────────────
  rf('seed-qt-bacon-egg-cheese-2',              "Bacon, Egg & Cheese",                         "QuikTrip", '1 croissant (158g)',              470, 17, 28, 33, 11, 160, 1550, 1, 5, 0, 0),
  rf('seed-qt-egg-cheese-3',                    "Egg & Cheese",                                "QuikTrip", '1 croissant (136g)',              340, 11, 28, 21, 7, 140, 1110, 1, 5, 0, 0),
  rf('seed-qt-ham-egg-cheese',                  "Ham, Egg & Cheese",                           "QuikTrip", '1 croissant (195g)',              390, 22, 29, 22, 7, 170, 1700, 1, 6, 0, 0),
  rf('seed-qt-sausage-egg-cheese-2',            "Sausage, Egg & Cheese",                       "QuikTrip", '1 croissant (192g)',              590, 18, 28, 46, 16, 185, 1470, 1, 5, 0, 0),
  rf('seed-qt-blt-cheese',                      "BLT & Cheese",                                "QuikTrip", '1 croissant (155g)',              390, 13, 28, 26, 10, 30, 1430, 1, 5, 0, 0),
  rf('seed-qt-turkey-lettuce-tomatoes-cheese',  "Turkey, Lettuce, Tomatoes & Cheese",          "QuikTrip", '1 croissant (192g)',              320, 18, 29, 16, 6, 35, 1550, 1, 6, 0, 0),

  // ── Tacos ───────────────────────────────────────────────
  rf('seed-qt-sausage-egg-cheese-3',            "Sausage, Egg & Cheese",                       "QuikTrip", '1 taco (156g)',                   410, 15, 38, 22, 8, 195, 1240, 3, 3, 0, 0),
  rf('seed-qt-sausage-egg-cheese-4',            "Sausage, Egg & Cheese*",                      "QuikTrip", '1 taco (140g)',                   380, 14, 37, 20, 7, 155, 1030, 3, 2, 0, 0),
  rf('seed-qt-bacon-egg-cheese-3',              "Bacon, Egg & Cheese",                         "QuikTrip", '1 taco (149g)',                   410, 16, 36, 22, 9, 195, 1230, 3, 2, 0, 0),
  rf('seed-qt-bacon-egg-cheese-4',              "Bacon, Egg & Cheese*",                        "QuikTrip", '1 taco (159g)',                   420, 18, 37, 22, 9, 230, 1050, 3, 2, 0, 0),
  rf('seed-qt-brisket-egg-cheese',              "Brisket, Egg & Cheese",                       "QuikTrip", '1 taco (166g)',                   410, 19, 37, 20, 8, 185, 1180, 3, 3, 0, 0),
  rf('seed-qt-brisket-egg-cheese-2',            "Brisket, Egg & Cheese*",                      "QuikTrip", '1 taco (143g)',                   350, 16, 36, 16, 6, 155, 890, 3, 2, 0, 0),
  rf('seed-qt-chorizo-egg-cheese',              "Chorizo, Egg & Cheese",                       "QuikTrip", '1 taco (155g)',                   400, 16, 37, 20, 8, 185, 1170, 3, 3, 0, 0),
  rf('seed-qt-chorizo-egg-cheese-2',            "Chorizo, Egg & Cheese*",                      "QuikTrip", '1 taco (145g)',                   380, 15, 37, 19, 7, 150, 980, 3, 2, 0, 0),
  rf('seed-qt-chicken',                         "Chicken",                                     "QuikTrip", '1 taco (149g)',                   310, 20, 34, 10, 3.5, 75, 1010, 3, 2, 0, 0),
  rf('seed-qt-chicken-2',                       "Chicken*",                                    "QuikTrip", '1 taco (127g)',                   280, 16, 34, 8, 3, 55, 990, 3, 2, 0, 0),
  rf('seed-qt-pork',                            "Pork",                                        "QuikTrip", '1 taco (149g)',                   410, 23, 36, 18, 7, 70, 1240, 3, 2, 0, 0),
  rf('seed-qt-pork-2',                          "Pork*",                                       "QuikTrip", '1 taco (144g)',                   400, 22, 36, 17, 7, 65, 1220, 3, 2, 0, 0),
  rf('seed-qt-brisket',                         "Brisket",                                     "QuikTrip", '1 taco (149g)',                   390, 23, 36, 17, 7, 5, 1400, 3, 2, 0, 0),
  rf('seed-qt-brisket-2',                       "Brisket*",                                    "QuikTrip", '1 taco (131g)',                   360, 20, 32, 16, 6, 60, 1110, 3, 1, 0, 0),

  // ── BBQ Sandwiches ──────────────────────────────────────
  rf('seed-qt-bbq-pork',                        "BBQ Pork",                                    "QuikTrip", '1 sandwich (212g)',               580, 32, 61, 21, 7, 95, 990, 2, 16, 0, 0),
  rf('seed-qt-bbq-pork-2',                      "BBQ Pork*",                                   "QuikTrip", '1 sandwich (189g)',               510, 27, 60, 17, 5, 75, 900, 2, 16, 0, 0),
  rf('seed-qt-bbq-brisket',                     "BBQ Brisket",                                 "QuikTrip", '1 sandwich (212g)',               550, 31, 61, 20, 7, 5, 1210, 2, 17, 0, 0),
  rf('seed-qt-bbq-brisket-2',                   "BBQ Brisket*",                                "QuikTrip", '1 sandwich (185g)',               490, 25, 60, 16, 5, 5, 1040, 2, 17, 0, 0),

  // ── Biscuits ────────────────────────────────────────────
  rf('seed-qt-bacon-egg-cheese-5',              "Bacon, Egg & Cheese",                         "QuikTrip", '1 biscuit (187g)',                640, 20, 46, 41, 20, 160, 1750, 1, 4, 0, 0),
  rf('seed-qt-ham-egg-cheese-2',                "Ham, Egg, & Cheese",                          "QuikTrip", '1 biscuit (224g)',                560, 24, 47, 30, 17, 170, 1900, 1, 5, 0, 0),
  rf('seed-qt-sausage-egg-cheese-5',            "Sausage, Egg & Cheese",                       "QuikTrip", '1 biscuit (221g)',                740, 21, 47, 52, 24, 185, 1680, 1, 5, 0, 0.5),
  rf('seed-qt-sausage',                         "Sausage",                                     "QuikTrip", '1 biscuit (164g)',                620, 13, 44, 43, 21, 40, 1260, 1, 3, 0, 0),
  rf('seed-qt-biscuit-gravy',                   "Biscuit & Gravy",                             "QuikTrip", '1 biscuit and gravy (274g)',      520, 9, 57, 28, 16, 15, 1600, 1, 5, 0, 0),
  rf('seed-qt-chicken-biscuit',                 "Chicken Biscuit",                             "QuikTrip", '1 biscuit (195g)',                560, 19, 53, 29, 14, 40, 1180, 3, 4, 0, 0),

  // ── Grilled Cheese ──────────────────────────────────────
  rf('seed-qt-classic-grilled-cheese',          "Classic Grilled Cheese",                      "QuikTrip", '1 sandwich (181g)',               610, 24, 52, 34, 15, 70, 1340, 2, 3, 0, 1),
  rf('seed-qt-blt-cheese-2',                    "BLT & Cheese",                                "QuikTrip", '1 sandwich (243g)',               740, 31, 53, 46, 19, 85, 1790, 3, 3, 0, 1),
  rf('seed-qt-bacon-egg-cheese-6',              "Bacon, Egg & Cheese",                         "QuikTrip", '1 sandwich (246g)',               820, 35, 53, 52, 21, 215, 1920, 2, 3, 0, 1),
  rf('seed-qt-sausage-egg-cheese-6',            "Sausage, Egg & Cheese",                       "QuikTrip", '1 sandwich (288g)',               940, 36, 53, 66, 26, 240, 1830, 2, 3, 0, 1),
  rf('seed-qt-egg-cheese-4',                    "Egg & Cheese",                                "QuikTrip", '1 sandwich (223g)',               690, 29, 53, 41, 17, 195, 1470, 2, 3, 0, 1),
  rf('seed-qt-bbq-pork-3',                      "BBQ Pork",                                    "QuikTrip", '1 sandwich (301g)',               920, 49, 62, 52, 21, 165, 1890, 2, 10, 0, 1),
  rf('seed-qt-bbq-pork-4',                      "BBQ Pork*",                                   "QuikTrip", '1 sandwich (277g)',               850, 43, 62, 48, 20, 140, 1800, 2, 10, 0, 1),
  rf('seed-qt-buffalo-chicken',                 "Buffalo Chicken",                             "QuikTrip", '1 sandwich (263g)',               690, 38, 54, 36, 16, 110, 1970, 2, 4, 0, 1),
  rf('seed-qt-chicken-bacon-ranch-2',           "Chicken, Bacon & Ranch",                      "QuikTrip", '1 sandwich (276g)',               840, 44, 54, 50, 20, 130, 2340, 2, 4, 0, 1),
  rf('seed-qt-cuban',                           "Cuban",                                       "QuikTrip", '1 sandwich (342g)',               840, 56, 53, 44, 17, 160, 1940, 3, 3, 0, 1),
  rf('seed-qt-ham-cheese',                      "Ham & Cheese",                                "QuikTrip", '1 sandwich (240g)',               660, 35, 53, 35, 16, 95, 1930, 2, 4, 0, 1),
  rf('seed-qt-italian',                         "Italian",                                     "QuikTrip", '1 sandwich (222g)',               730, 34, 50, 43, 17, 85, 1900, 2, 3, 0, 1),
  rf('seed-qt-bbq-brisket-3',                   "BBQ Brisket",                                 "QuikTrip", '1 sandwich (301g)',               890, 47, 62, 51, 21, 75, 2100, 2, 12, 0, 1),
  rf('seed-qt-bbq-brisket-4',                   "BBQ Brisket*",                                "QuikTrip", '1 sandwich (273g)',               830, 41, 62, 46, 20, 75, 1940, 2, 11, 0, 1),

  // ── Pretzel ─────────────────────────────────────────────
  rf('seed-qt-cinnamon-sugar',                  "Cinnamon Sugar",                              "QuikTrip", '1 pretzel (179g)',                500, 13, 90, 10, 2.5, 0, 310, 2, 17, 0, 0),
  rf('seed-qt-classic-salt-and-butter',         "Classic, Salt and Butter",                    "QuikTrip", '1 pretzel (176g)',                490, 13, 87, 10, 2.5, 0, 540, 2, 14, 0, 0),
  rf('seed-qt-classic-plain',                   "Classic, Plain",                              "QuikTrip", '1 pretzel (170g)',                440, 13, 87, 4.5, 1.5, 0, 290, 2, 14, 0, 0),
  rf('seed-qt-parmesan',                        "Parmesan",                                    "QuikTrip", '1 pretzel (179g)',                500, 14, 87, 11, 3, 5, 460, 3, 14, 0, 0),

  // ── Personal Pizza ──────────────────────────────────────
  rf('seed-qt-breakfast',                       "Breakfast",                                   "QuikTrip", '1 pizza (381g)',                  1020, 46, 95, 51, 32, 230, 2070, 4, 5, 0, 1),
  rf('seed-qt-breakfast-chorizo',               "Breakfast Chorizo",                           "QuikTrip", '1 pizza (381g)',                  1000, 47, 94, 49, 32, 220, 2010, 4, 5, 0, 1),
  rf('seed-qt-cheese',                          "Cheese",                                      "QuikTrip", '1 pizza (305g)',                  740, 32, 93, 27, 16, 75, 1700, 5, 7, 0, 1),
  rf('seed-qt-pepperoni',                       "Pepperoni",                                   "QuikTrip", '1 pizza (324g)',                  830, 36, 94, 34, 18, 90, 2050, 5, 7, 0, 1),
  rf('seed-qt-supreme',                         "Supreme",                                     "QuikTrip", '1 pizza (408g)',                  920, 39, 99, 43, 20, 105, 2420, 6, 9, 0, 1),
  rf('seed-qt-3-meat',                          "3 Meat",                                      "QuikTrip", '1 pizza (352g)',                  940, 41, 95, 44, 29, 115, 2450, 5, 8, 0, 1),

  // ── Pizza by the Slice ──────────────────────────────────
  rf('seed-qt-breakfast-pizza',                 "Breakfast Pizza",                             "QuikTrip", '1 slice (198g)',                  510, 22, 48, 26, 16, 115, 1190, 2, 4, 0, 0),
  rf('seed-qt-chorizo-breakfast',               "Chorizo Breakfast",                           "QuikTrip", '1 slice (198g)',                  500, 23, 48, 24, 16, 105, 1140, 2, 4, 0, 0),
  rf('seed-qt-pepperoni-2',                     "Pepperoni",                                   "QuikTrip", '1 slice (167g)',                  410, 17, 47, 17, 9, 40, 1140, 3, 5, 0, 0),
  rf('seed-qt-3-meat-2',                        "3 Meat",                                      "QuikTrip", '1 slice (181g)',                  460, 20, 48, 22, 14, 50, 1300, 3, 5, 0, 0),

  // ── X-Large Pizza ───────────────────────────────────────
  rf('seed-qt-breakfast-pizza-per-slice',       "Breakfast Pizza (per slice)",                 "QuikTrip", '1 slice (99g)',                   250, 11, 24, 13, 8, 55, 600, 1, 2, 0, 0),
  rf('seed-qt-chorizo-breakfast-per-slice',     "Chorizo Breakfast (per slice)",               "QuikTrip", '1 slice (99g)',                   250, 11, 24, 12, 8, 55, 570, 1, 2, 0, 0),
  rf('seed-qt-cheese-per-slice',                "Cheese (per slice)",                          "QuikTrip", '1 slice (154g)',                  350, 15, 47, 12, 7, 30, 910, 3, 5, 0, 0),
  rf('seed-qt-sausage-per-slice',               "Sausage (per slice)",                         "QuikTrip", '1 slice (169g)',                  410, 16, 48, 17, 8, 40, 1090, 3, 5, 0, 0),
  rf('seed-qt-pepperoni-per-slice',             "Pepperoni (per slice)",                       "QuikTrip", '1 slice (167g)',                  410, 17, 47, 17, 9, 40, 1140, 3, 5, 0, 0),
  rf('seed-qt-supreme-per-slice',               "Supreme (per slice)",                         "QuikTrip", '1 slice (201g)',                  450, 18, 49, 20, 9, 45, 1270, 3, 6, 0, 0),
  rf('seed-qt-3-meat-per-slice',                "3 Meat (per slice)",                          "QuikTrip", '1 slice (181g)',                  460, 20, 48, 22, 14, 50, 1300, 3, 5, 0, 0),

  // ── Subs (Half/Whole x Wheat/White -- opens SubBuilder) ──────────
  rf('seed-qt-sub-big-italian',                 "The Big Italian",                             "QuikTrip", 'Half, White Bread',               480, 27, 36, 26, 10, 65, 2010, 4, 5, 0, 0),
  rf('seed-qt-sub-double-blt',                  "Double BLT",                                  "QuikTrip", 'Half, White Bread',               530, 19, 32, 37, 11, 50, 1390, 3, 3, 0, 0),
  rf('seed-qt-sub-gardener',                    "The Gardener",                                "QuikTrip", 'Half, White Bread',               310, 13, 35, 14, 6, 25, 720, 3, 4, 0, 0),
  rf('seed-qt-sub-ham',                         "Ham Sub",                                     "QuikTrip", 'Half, White Bread',               350, 18, 33, 19, 6, 45, 1040, 3, 4, 0, 0),
  rf('seed-qt-sub-roast-beef',                  "Roast Beef Sub",                              "QuikTrip", 'Half, White Bread',               440, 29, 34, 21, 8, 75, 1060, 3, 4, 0, 0),
  rf('seed-qt-sub-turkey',                      "Turkey Sub",                                  "QuikTrip", 'Half, White Bread',               370, 23, 34, 16, 6, 50, 1180, 3, 4, 0, 0),
  rf('seed-qt-sub-chicken-bacon-ranch',         "Chicken, Bacon & Ranch Sub",                  "QuikTrip", 'Half, White Bread',               440, 28, 35, 21, 8, 75, 1360, 3, 4, 0, 0),
  rf('seed-qt-sub-3-meat-stack',                "3 Meat Stack Sub",                            "QuikTrip", 'Half, White Bread',               390, 25, 34, 18, 7, 60, 1210, 3, 4, 0, 0),

  // ── Wraps ───────────────────────────────────────────────
  rf('seed-qt-the-big-italian',                 "The Big Italian",                             "QuikTrip", '1 wrap (345g)',                   790, 42, 59, 42, 16, 105, 3250, 3, 4, 0, 0.5),
  rf('seed-qt-double-blt',                      "Double BLT",                                  "QuikTrip", '1 wrap (247g)',                   950, 34, 54, 66, 22, 85, 2650, 2, 1, 0, 0),
  rf('seed-qt-the-gardener',                    "The Gardener",                                "QuikTrip", '1 wrap (215g)',                   470, 15, 56, 20, 8, 25, 1090, 3, 2, 0, 0),
  rf('seed-qt-ham',                             "Ham",                                         "QuikTrip", '1 wrap (298g)',                   580, 36, 57, 23, 9, 80, 2260, 3, 3, 0, 0),
  rf('seed-qt-3-meat-stack',                    "3 Meat Stack",                                "QuikTrip", '1 wrap (298g)',                   620, 39, 57, 26, 10, 90, 2020, 3, 3, 0, 0),
  rf('seed-qt-turkey',                          "Turkey",                                      "QuikTrip", '1 wrap (298g)',                   560, 33, 56, 22, 8, 65, 1930, 3, 3, 0, 0),
  rf('seed-qt-southwest-chicken-salad',         "Southwest Chicken Salad",                     "QuikTrip", '1 wrap (294g)',                   660, 40, 62, 28, 12, 110, 1790, 3, 4, 0, 1),
  rf('seed-qt-chicken-bacon-ranch-3',           "Chicken, Bacon & Ranch",                      "QuikTrip", '1 wrap (307g)',                   690, 40, 54, 32, 12, 155, 1350, 3, 2, 0, 0),

  // ── Mac & Cheese ────────────────────────────────────────
  rf('seed-qt-mac-cheese',                      "Mac & Cheese",                                "QuikTrip", '1 bowl (202g)',                   460, 21, 26, 30, 17, 70, 960, 2, 5, 0, 0),
  rf('seed-qt-bacon',                           "Bacon",                                       "QuikTrip", '1 bowl (212g)',                   510, 24, 26, 34, 26, 85, 1130, 2, 5, 0, 0),
  rf('seed-qt-bbq-brisket-5',                   "BBQ Brisket",                                 "QuikTrip", '1 bowl (276g)',                   640, 34, 36, 40, 20, 75, 1450, 2, 13, 0, 0),
  rf('seed-qt-bbq-brisket-6',                   "BBQ Brisket*",                                "QuikTrip", '1 bowl (294g)',                   680, 38, 36, 43, 21, 75, 1550, 2, 13, 0, 0),
  rf('seed-qt-bbq-pork-5',                      "BBQ Pork",                                    "QuikTrip", '1 bowl (289g)',                   690, 38, 36, 43, 21, 135, 1380, 2, 13, 0, 0),
  rf('seed-qt-bbq-pork-6',                      "BBQ Pork*",                                   "QuikTrip", '1 bowl (294g)',                   700, 39, 36, 43, 21, 140, 1400, 2, 13, 0, 0),
  rf('seed-qt-buffalo-chicken-2',               "Buffalo Chicken",                             "QuikTrip", '1 bowl (249g)',                   510, 27, 28, 32, 17, 90, 1320, 2, 6, 0, 0),
  rf('seed-qt-chicken-bacon-ranch-4',           "Chicken, Bacon & Ranch",                      "QuikTrip", '1 bowl (249g)',                   570, 31, 28, 37, 27, 105, 1420, 2, 6, 0, 0.5),

  // ── Fryer Products ──────────────────────────────────────
  rf('seed-qt-apple-pie',                       "Apple Pie",                                   "QuikTrip", '1 pie (92g)',                     230, 2, 34, 9, 5, 0, 250, 1, 11, 0, 0),
  rf('seed-qt-buffalo-chicken-wings-gng',       "Buffalo Chicken Wings, GNG",                  "QuikTrip", '1 4 EA 4 wings (208g)',           560, 38, 6, 41, 10, 235, 1310, 0, 1, 0, 0),
  rf('seed-qt-buffalo-chicken-wings-mto',       "Buffalo Chicken Wings, MTO",                  "QuikTrip", '1 6 EA 6 wings (312g)',           820, 57, 7, 60, 14, 355, 1600, 0, 0, 0, 0),
  rf('seed-qt-buffalo-chicken-wings-mto-2',     "Buffalo Chicken Wings, MTO",                  "QuikTrip", '1 9 EA 9 wings (467g)',           1220, 85, 11, 90, 21, 530, 2400, 0, 0, 0, 0),
  rf('seed-qt-buffalo-chicken-wings-mto-3',     "Buffalo Chicken Wings, MTO",                  "QuikTrip", '1 12 EA 12 wings (624g)',         1630, 114, 14, 121, 28, 710, 3200, 0, 0, 0, 0),
  rf('seed-qt-chicken-sandwich',                "Chicken Sandwich",                            "QuikTrip", '1 sandwich (184g)',               420, 26, 57, 11, 2, 45, 1460, 1, 8, 0, 0),
  rf('seed-qt-chicken-tenders',                 "Chicken Tenders",                             "QuikTrip", '1 3 tenders (133g)',              360, 24, 25, 18, 4.5, 60, 1490, 3, 0, 0, 0),
  rf('seed-qt-lattice-fries',                   "Lattice Fries",                               "QuikTrip", '1 box (110g)',                    410, 3, 51, 21, 6, 0, 820, 6, 0, 0, 0),
  rf('seed-qt-mozzarella-sticks',               "Mozzarella Sticks",                           "QuikTrip", '1 sticks (123g)',                 240, 14, 29, 0, 4.5, 30, 720, 1, 1, 0, 0),
  rf('seed-qt-tots',                            "Tots",                                        "QuikTrip", '1 box (110g)',                    160, 2, 20, 9, 1, 0, 460, 2, 1, 0, 0),
  rf('seed-qt-lemon-pepper-wings-gng',          "Lemon Pepper Wings, GNG",                     "QuikTrip", '1 4 EA 4 wings (209g)',           550, 38, 6, 40, 9, 235, 1790, 0, 1, 0, 0),
  rf('seed-qt-lemon-pepper-wings-mto',          "Lemon Pepper Wings, MTO",                     "QuikTrip", '1 6 EA 6 wings (314g)',           830, 57, 9, 60, 14, 355, 2760, 0, 1, 0, 0),
  rf('seed-qt-lemon-pepper-wings-mto-2',        "Lemon Pepper Wings, MTO",                     "QuikTrip", '1 9 EA 9 wings (470g)',           1240, 85, 13, 91, 21, 530, 4110, 0, 1, 0, 0),
  rf('seed-qt-lemon-pepper-wings-mto-3',        "Lemon Pepper Wings, MTO",                     "QuikTrip", '1 12 EA 12 wings (626g)',         1650, 114, 17, 121, 28, 710, 5420, 1, 2, 0, 0),

  // ── Grab & Go ───────────────────────────────────────────
  rf('seed-qt-big-italian-grab-go-wheat-half',  "Big Italian Grab & Go Wheat Half",            "QuikTrip", '1 sub (194g)',                    420, 27, 34, 19, 8, 65, 1700, 3, 5, 0, 0),
  rf('seed-qt-big-italian-grab-go-white-half',  "Big Italian Grab & Go White Half",            "QuikTrip", '1 sub (193g)',                    410, 26, 33, 19, 8, 65, 1720, 3, 3, 0, 0),
  rf('seed-qt-big-italian-grab-go-white-whole', "Big Italian Grab & Go White Whole",           "QuikTrip", '1 sub (385g)',                    820, 52, 65, 39, 17, 125, 3440, 7, 7, 0, 1),
  rf('seed-qt-ham-grab-go-wheat-half',          "Ham Grab & Go Wheat Half",                    "QuikTrip", '1 sub (156g)',                    300, 23, 32, 10, 5, 45, 1020, 3, 5, 0, 0),
  rf('seed-qt-ham-grab-go-wheat-whole',         "Ham Grab & Go Wheat Whole",                   "QuikTrip", '1 sub (312g)',                    600, 45, 64, 19, 10, 95, 2040, 6, 9, 0, 0.5),
  rf('seed-qt-ham-grab-go-white-half',          "Ham Grab & Go White Half",                    "QuikTrip", '1 sub (154g)',                    290, 21, 31, 10, 5, 45, 1040, 3, 3, 0, 0),
  rf('seed-qt-ham-grab-go-white-whole',         "Ham Grab & Go White Whole",                   "QuikTrip", '1 sub (309g)',                    520, 33, 61, 23, 9, 70, 1600, 5, 6, 0, 0.5),
  rf('seed-qt-ham-grab-go-wrap',                "Ham Grab & Go Wrap",                          "QuikTrip", '1 wrap (257g)',                   500, 35, 55, 16, 8, 75, 2070, 2, 3, 0, 0),
  rf('seed-qt-roast-beef-grab-go-wheat-half',   "Roast Beef Grab & Go Wheat Half",             "QuikTrip", '1 sub (156g)',                    370, 29, 33, 14, 6, 65, 780, 3, 5, 0, 0),
  rf('seed-qt-roast-beef-grab-go-white-half',   "Roast Beef Grab & Go White Half",             "QuikTrip", '1 sub (154g)',                    370, 28, 32, 14, 6, 65, 800, 3, 3, 0, 0),
  rf('seed-qt-roast-beef-grab-go-wrap',         "Roast Beef Grab & Go Wrap",                   "QuikTrip", '1 wrap (257g)',                   650, 49, 56, 24, 11, 110, 1590, 2, 2, 0, 0),
  rf('seed-qt-stack-grab-go-wheat-half',        "Stack Grab & Go Wheat Half",                  "QuikTrip", '1 sub (156g)',                    320, 25, 32, 11, 5, 50, 930, 3, 5, 0, 0),
  rf('seed-qt-stack-grab-go-wheat-whole',       "Stack Grab & Go Wheat Whole",                 "QuikTrip", '1 sub (312g)',                    650, 50, 64, 22, 10, 105, 1860, 6, 9, 0, 0.5),
  rf('seed-qt-stack-grab-go-wrap',              "Stack Grab & Go Wrap",                        "QuikTrip", '1 wrap (257g)',                   550, 38, 55, 19, 9, 80, 1830, 2, 2, 0, 0),
  rf('seed-qt-turkey-grab-go-wheat-half',       "Turkey Grab & Go Wheat Half",                 "QuikTrip", '1 sub (156g)',                    300, 23, 32, 9, 4.5, 40, 890, 3, 5, 0, 0),
  rf('seed-qt-turkey-grab-go-white-half',       "Turkey Grab & Go White Half",                 "QuikTrip", '1 sub (154g)',                    290, 22, 31, 9, 5, 40, 910, 3, 3, 0, 0),
  rf('seed-qt-turkey-grab-go-white-whole',      "Turkey Grab & Go White Whole",                "QuikTrip", '1 sub (309g)',                    580, 44, 62, 18, 10, 85, 1830, 5, 6, 0, 0.5),
  rf('seed-qt-turkey-grab-go-wrap',             "Turkey Grab & Go Wrap",                       "QuikTrip", '1 wrap (257g)',                   490, 32, 55, 15, 7, 55, 1730, 2, 2, 0, 0),
  rf('seed-qt-southwest-chicken-wrap',          "Southwest Chicken Wrap",                      "QuikTrip", '1 wrap (314g)',                   700, 45, 63, 30, 12, 125, 2000, 3, 4, 0, 1),

  // ── Hotzi Sandwiches ────────────────────────────────────
  rf('seed-qt-jalapeno-cheese-sausage-roll',    "Jalapeno & Cheese Sausage Roll",              "QuikTrip", '1 5.85 oz',                       490, 20, 34, 31, 11, 55, 1220, 1, 3, 0, 1.5),
  rf('seed-qt-sausage-egg-and-cheese-squarewrap-145g', "Sausage Egg and Cheese Squarewrap (145g)",    "QuikTrip", '1',                               460, 15, 34, 30, 12, 105, 1000, 1, 2, 0, 0),

  // ── Roller Grill ────────────────────────────────────────
  rf('seed-qt-buffalo-chicken-bites-with-cheese', "Buffalo Chicken Bites with Cheese",           "QuikTrip", '1 87g',                           190, 14, 12, 9, 2.5, 45, 710, 0, 1, 0, 0),
  rf('seed-qt-cheesy-pepperjack-taquito',       "Cheesy PepperJack Taquito",                   "QuikTrip", '1 106g',                          280, 8, 30, 14, 6, 25, 270, 0, 1, 0, 0),
  rf('seed-qt-egg-roll-pork',                   "Egg Roll - Pork",                             "QuikTrip", '1 85g',                           170, 7, 19, 9, 2.5, 15, 560, 2, 2, 0, 0),
  rf('seed-qt-jalapeno-cheddar-smoked-sausage', "Jalapeno Cheddar Smoked Sausage",             "QuikTrip", '1 91g',                           260, 11, 1, 24, 8, 65, 1060, 0, 1, 0, 0),
  rf('seed-qt-oscar-meyer-all-beef-hot-dog',    "Oscar Meyer All Beef Hot Dog",                "QuikTrip", '1 91g',                           290, 10, 2, 27, 11, 50, 910, 0, 1, 0, 1.5),
  rf('seed-qt-spicy-chicken-taquito',           "Spicy Chicken Taquito",                       "QuikTrip", '1 113g',                          270, 14, 35, 8, 2.5, 30, 690, 2, 2, 0, 0),
  rf('seed-qt-steak-cheese-taquito',            "Steak & Cheese Taquito",                      "QuikTrip", '1 106g',                          240, 10, 31, 9, 2, 10, 450, 0, 1, 0, 0),
  rf('seed-qt-hot-dog-bun',                     "Hot Dog Bun",                                 "QuikTrip", '1 43g',                           110, 3, 21, 1.5, 0, 0, 210, 1, 3, 0, 0),

  // ── Condiment Bar ───────────────────────────────────────
  rf('seed-qt-chicago-relish-1-tbsp',           "Chicago Relish (1 TBSP)",                     "QuikTrip", '1 T.',                            20, 0, 5, 0, 0, 0, 10, 0, 0, 0, 0),
  rf('seed-qt-diced-onion-1-tbsp',              "Diced Onion (1 TBSP)",                        "QuikTrip", '1 T.',                            5, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0),
  rf('seed-qt-diced-tomato-1-tbsp',             "Diced Tomato (1 TBSP)",                       "QuikTrip", '1 T.',                            5, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0),
  rf('seed-qt-fresh-sauerkraut-1-4-cup',        "Fresh Sauerkraut (1/4 cup)",                  "QuikTrip", '1 1/4 c.',                        5, 0, 3, 0, 0, 0, 950, 3, 0, 0, 0),
  rf('seed-qt-jalapeno-slices-7slices',         "Jalapeno Slices (7slices)",                   "QuikTrip", '1 7 slices',                      0, 0, 2, 0, 0, 0, 950, 1, 1, 0, 0),
  rf('seed-qt-pickle-chips-3-slices',           "Pickle Chips (3 slices)",                     "QuikTrip", '1 3 slices',                      0, 0, 1, 0, 0, 0, 520, 1, 0, 0, 0),
  rf('seed-qt-pico-de-gallo-1-tbsp',            "Pico de Gallo (1 TBSP)",                      "QuikTrip", '1 T.',                            5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
  rf('seed-qt-cole-slaw-atlanta-carolinas-1-tbsp', "Cole Slaw (Atlanta/Carolinas) (1 TBSP)",      "QuikTrip", '1 T.',                            20, 0, 2, 1, 0, 0, 25, 0, 1, 0, 0),

  // ── Misc. Mix/Sauces ────────────────────────────────────
  rf('seed-qt-chili-sauce',                     "Chili Sauce",                                 "QuikTrip", '1 portion cup',                   50, 3, 5, 2.5, 0, 0, 270, 1, 1, 0, 0),
  rf('seed-qt-nacho-cheese-sauce',              "Nacho Cheese Sauce",                          "QuikTrip", '1 portion cup',                   60, 1, 4, 3.5, 0.5, 0, 360, 0, 1, 0, 1),

  // ── QTK Bakery ──────────────────────────────────────────
  rf('seed-qt-apple-fritter',                   "Apple Fritter",                               "QuikTrip", '1 donut (164g)',                  560, 7, 73, 28, 11, 0, 480, 2, 33, 0, 0),
  rf('seed-qt-bavarian-cr-me-bismark',          "Bavarian Cr�me Bismark",                      "QuikTrip", '1 donut (129g)',                  380, 5, 61, 14, 5, 0, 370, 1, 30, 0, 0),
  rf('seed-qt-blueberry-cake-donut',            "Blueberry Cake Donut",                        "QuikTrip", '1 donut (85g)',                   280, 4, 43, 11, 4, 15, 370, 1, 23, 0, 0),
  rf('seed-qt-blueberry-cake-donut-holes',      "Blueberry Cake Donut Holes",                  "QuikTrip", '1 cup (163g)',                    530, 7, 85, 19, 7, 30, 710, 1, 47, 0, 0),
  rf('seed-qt-blueberry-muffin',                "Blueberry Muffin",                            "QuikTrip", '1 muffin (172g)',                 590, 8, 70, 33, 6, 105, 40, 2, 9, 0, 0),
  rf('seed-qt-chocolate-cake-donut-w-choc-icing', "Chocolate Cake Donut w/Choc Icing",           "QuikTrip", '1 donut (96g)',                   330, 4, 48, 14, 6, 30, 400, 1, 25, 0, 0),
  rf('seed-qt-chocolate-chip-brownie',          "Chocolate Chip Brownie",                      "QuikTrip", '1 pastry (85g)',                  370, 5, 46, 18, 5, 105, 45, 0, 31, 0, 0),
  rf('seed-qt-chocolate-old-fashioned-cake-donut-w-gla', "Chocolate Old Fashioned Cake Donut w/ Glaze", "QuikTrip", '1 donut (100g)',                  340, 4, 55, 12, 4.5, 15, 330, 1, 34, 0, 0),
  rf('seed-qt-chocolate-chunk-cookie',          "Chocolate Chunk Cookie",                      "QuikTrip", '1 2 cookies (170g)',              740, 9, 105, 35, 17, 65, 410, 5, 62, 0, 0.5),
  rf('seed-qt-cinnamon-roll',                   "Cinnamon Roll",                               "QuikTrip", '1 donut (138g)',                  430, 7, 70, 14, 4.5, 0, 490, 2, 30, 0, 0),
  rf('seed-qt-croissant-large',                 "Croissant - Large",                           "QuikTrip", '1 croissant (90g)',               390, 8, 42, 21, 17, 0, 210, 3, 5, 0, 0),
  rf('seed-qt-hole-bunches',                    "Hole Bunches",                                "QuikTrip", '1 donut (130g)',                  410, 6, 69, 13, 4.5, 0, 430, 1, 34, 0, 0),
  rf('seed-qt-long-john-chocolate',             "Long John - Chocolate",                       "QuikTrip", '1 donut (133g)',                  460, 7, 69, 18, 7, 0, 450, 1, 30, 0, 0),
  rf('seed-qt-long-john-maple',                 "Long John - Maple",                           "QuikTrip", '1 donut (130g)',                  420, 6, 71, 13, 4.5, 0, 440, 1, 37, 0, 0),
  rf('seed-qt-m-m-cookie',                      "M & M Cookie",                                "QuikTrip", '1 2 cookie (170g)',               740, 9, 98, 33, 16, 65, 420, 2, 65, 0, 0.5),
  rf('seed-qt-maple-cinnamon-roll',             "Maple Cinnamon Roll",                         "QuikTrip", '1 donut (183g)',                  580, 7, 108, 14, 4.5, 0, 510, 2, 66, 0, 0),
  rf('seed-qt-maple-pecan-danish',              "Maple Pecan Danish",                          "QuikTrip", '1 danish (90g)',                  320, 6, 31, 19, 9, 30, 260, 2, 5, 0, 0),
  rf('seed-qt-old-fashioned-cake-donut-w-glaze', "Old Fashioned Cake Donut w Glaze",            "QuikTrip", '1 donut (100g)',                  340, 3, 58, 11, 4.5, 15, 350, 1, 37, 0, 0),
  rf('seed-qt-old-fashioned-cake-donut-holes',  "Old Fashioned Cake Donut Holes",              "QuikTrip", '1 cup (163g)',                    550, 6, 90, 19, 7, 30, 670, 1, 51, 0, 0),
  rf('seed-qt-peanut-butter-cookie',            "Peanut Butter Cookie",                        "QuikTrip", '1 2 cookies (170g)',              830, 14, 88, 50, 23, 60, 600, 4, 58, 0, 0.5),
  rf('seed-qt-raspberry-bismark-w-powdered-sugar', "Raspberry Bismark w/ Powdered Sugar",         "QuikTrip", '1 donut (106g)',                  280, 5, 40, 11, 3.5, 0, 370, 1, 11, 0, 0),
  rf('seed-qt-ring-yeast-glazed-donut-w-chocolate-icin', "Ring Yeast Glazed Donut w/Chocolate Icing",   "QuikTrip", '1 donut (91g)',                   310, 5, 46, 12, 4.5, 0, 320, 1, 19, 0, 0),
  rf('seed-qt-ring-yeast-glazed-donut',         "Ring Yeast Glazed Donut",                     "QuikTrip", '1 donut (81g)',                   260, 4, 40, 9, 3, 0, 300, 1, 15, 0, 0),
  rf('seed-qt-ring-yeast-glazed-donut-w-strawberry-ici', "Ring Yeast Glazed Donut w/Strawberry Icing",  "QuikTrip", '1 donut (106g)',                  340, 4, 62, 9, 3, 0, 350, 1, 36, 0, 0),
  rf('seed-qt-ring-yeast-sugar-donut',          "Ring Yeast Sugar Donut",                      "QuikTrip", '1 donut (69g)',                   230, 4, 33, 9, 3, 0, 300, 1, 10, 0, 0),
  rf('seed-qt-sprinkle-hole-bunches',           "Sprinkle Hole Bunches",                       "QuikTrip", '1 donut (130g)',                  410, 6, 66, 13, 4.5, 0, 480, 1, 33, 0, 0),
  rf('seed-qt-white-chip-macadamia-cookie',     "White Chip Macadamia Cookie",                 "QuikTrip", '1 2 cookies (170g)',              800, 9, 95, 45, 22, 70, 380, 3, 57, 0, 0.5),
];
