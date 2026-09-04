import type { FoodItem } from '../../types';

function rf(id: string, name: string, brand: string, label: string, cal: number, protein: number, carbs: number, fat: number, satFat: number, chol: number, sodium: number, fiber: number, sugar: number, caffeine = 0): FoodItem {
  return { id, name, brand, servingSizeG: 1, servingLabel: label, source: 'custom', nutrition: { calories: cal, protein, carbs, fat, saturatedFat: satFat, cholesterol: chol, sodium, fiber, sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0, caffeine, alcohol: 0, addedSugar: 0, transFat: 0, magnesium: 0, zinc: 0, omega3: 0, folate: 0 } };
}

export const SEEDS: FoodItem[] = [
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
  // Oikos Pro Drink (ready-to-drink protein shake, 1 bottle = 207mL — macros identical across flavors per label)
  rf('seed-oikos-pro-drink-vanilla',        "Oikos Pro Drink Vanilla",             "Oikos",          '1 bottle (207mL)', 120, 23, 5, 1.5, 1, 35, 120, 0, 4),
  rf('seed-oikos-pro-drink-chocolate',      "Oikos Pro Drink Chocolate",           "Oikos",          '1 bottle (207mL)', 120, 23, 5, 1.5, 1, 35, 120, 0, 4),
  rf('seed-oikos-pro-drink-strawberry',     "Oikos Pro Drink Strawberry",          "Oikos",          '1 bottle (207mL)', 120, 23, 5, 1.5, 1, 35, 120, 0, 4),
  rf('seed-oikos-pro-drink-cookies-cream',  "Oikos Pro Drink Cookies & Cream",     "Oikos",          '1 bottle (207mL)', 120, 23, 5, 1.5, 1, 35, 120, 0, 4),
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

  // ── Ellenos Greek Yogurt ────────────────────────────────────────
  rf('seed-ellenos-plain',            "Plain Greek Yogurt",                  "Ellenos",        '1 container (6 oz)', 200, 17, 13,  9, 6, 45, 110, 2, 10),
  rf('seed-ellenos-marionberry',      "Marionberry Greek Yogurt",            "Ellenos",        '1 container (5.3 oz)', 200, 12, 24, 7, 4, 35,  80, 2, 20),
  rf('seed-ellenos-strawberry-sc',    "Strawberry Shortcake Greek Yogurt",   "Ellenos",        '1 container (6 oz)', 280, 13, 34, 10, 7, 35, 130, 1, 24),
  rf('seed-ellenos-lemon-curd',       "Lemon Curd Greek Yogurt",             "Ellenos",        '1 container (4 oz)', 170, 10, 19,  7, 4, 65,  70, 1, 17),
  rf('seed-ellenos-passion-fruit',    "Passion Fruit Greek Yogurt",          "Ellenos",        '1 container (5.3 oz)', 200, 13, 22, 6, 4, 35,  85, 2, 19),
  rf('seed-ellenos-vanilla-bean',     "Vanilla Bean Greek Yogurt",           "Ellenos",        '1 container (5.3 oz)', 210, 13, 22, 7, 4, 35,  90, 2, 20),
  rf('seed-ellenos-mango',            "Mango Greek Yogurt",                  "Ellenos",        '1 container (5.3 oz)', 200, 12, 22, 7, 4, 35,  80, 2, 20),
  rf('seed-ellenos-black-cherry',     "Black Cherry Greek Yogurt",           "Ellenos",        '1 container (5.3 oz)', 200, 12, 23, 7, 4, 35,  85, 2, 20),

  // ── Solely Organic Fruit Gummies (1 pouch = 20g) ───────────────
  rf('seed-solely-mango',             "Mango Organic Fruit Gummies",         "Solely",         '1 pouch (0.7 oz)',  70, 0, 14, 0, 0, 0, 0, 1,  7),
  rf('seed-solely-mango-guava',       "Mango & Guava Organic Fruit Gummies", "Solely",         '1 pouch (0.7 oz)',  60, 0, 13, 0, 0, 0, 0, 1,  6),
  rf('seed-solely-mango-orange',      "Mango & Orange Organic Fruit Gummies","Solely",         '1 pouch (0.7 oz)',  60, 1, 14, 0, 0, 0, 0, 1,  7),
  rf('seed-solely-mango-pf',          "Mango & Passion Fruit Organic Gummies","Solely",        '1 pouch (0.7 oz)',  60, 0, 15, 0, 0, 0, 0, 1,  9),
  rf('seed-solely-mango-blueberry',   "Mango & Blueberry Organic Gummies",  "Solely",         '1 pouch (0.7 oz)',  60, 0, 14, 0, 0, 0, 0, 1, 11),
  rf('seed-solely-mango-strawberry',  "Mango & Strawberry Organic Gummies", "Solely",         '1 pouch (0.7 oz)',  60, 0, 14, 0, 0, 0, 0, 1,  7),

  // ── 365 by Whole Foods ──────────────────────────────────────────
  rf('seed-365-oatmeal-plain',        "Organic Instant Oatmeal Original",    "365 by Whole Foods", '1 packet (40g)', 150, 5, 27, 2.5, 0, 0, 0, 4, 0),

  // ── SUNSET Wild Wonders Medley Tomatoes ────────────────────────
  rf('seed-sunset-wild-wonders',      "Wild Wonders Medley Tomatoes",        "SUNSET",         '~25 tomatoes (92g)',  25, 1, 4, 0, 0, 0, 0, 1, 3),

  // ── Cape Gooseberries ───────────────────────────────────────────
  rf('seed-peeled-cape-gooseberry',   "Cape Gooseberries",                   "Peeled",         '1/2 cup (85g)',  45, 1.5, 9.5, 0.5, 0, 0, 1, 3, 6),

  // ── Hot Ones Los Calientes Verde Hot Sauce ──────────────────────
  rf('seed-hot-ones-verde',           "Los Calientes Verde Hot Sauce",       "Hot Ones",       '1 tsp (5g)',  0, 0, 0.5, 0, 0, 0, 40, 0, 0),

  // ── Zack's Mighty Chile Lime Rolled Tortilla Chips ──────────────
  rf('seed-zacks-chile-lime',         "Chile Lime Rolled Tortilla Chips",    "Zack's Mighty",  '1 oz (28g)', 140, 2, 15, 8, 0.5, 0, 190, 1, 0),

  // ── Chomps Beef Sticks (all flavors share identical macros) ─────
  rf('seed-chomps-original',          "Original Beef Stick",                 "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-jalapeno',          "Jalapeño Beef Stick",                 "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-italian',           "Italian Style Beef Stick",            "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-sea-salt',          "Sea Salt Beef Stick",                 "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-smoky-bbq',         "Smoky BBQ Beef Stick",                "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-taco',              "Taco Seasoned Beef Stick",            "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),
  rf('seed-chomps-habanero',          "Habanero Beef Stick",                 "Chomps",         '1 stick (33g)', 100, 10, 0, 7, 3, 30, 380, 0, 0),

  // ── belVita Breakfast Biscuits (1 pack = 4 biscuits, 50g) — values sourced from USDA FoodData Central Mondelez USA branded label data ─
  rf('seed-belvita-blueberry',        "Blueberry Breakfast Biscuits",        "belVita",        '1 pack (4 biscuits)', 230, 4, 36, 8, 0.5, 0, 210, 3, 13),
  rf('seed-belvita-vanilla',          "Vanilla Breakfast Biscuits",          "belVita",        '1 pack (4 biscuits)', 230, 4, 35, 9, 1,   0, 180, 3, 11),
  rf('seed-belvita-cranberry-orange', "Cranberry Orange Breakfast Biscuits", "belVita",        '1 pack (4 biscuits)', 230, 3, 35, 8, 0.5, 0, 220, 3, 12),
  rf('seed-belvita-toasted-coconut',  "Toasted Coconut Breakfast Biscuits",  "belVita",        '1 pack (4 biscuits)', 230, 4, 35, 9, 1.5, 0, 115, 3, 11),
  rf('seed-belvita-apple-cinnamon',   "Apple Cinnamon Breakfast Biscuits",   "belVita",        '1 pack (4 biscuits)', 230, 3, 36, 8, 0.5, 0, 170, 3, 13),
  rf('seed-belvita-golden-oat',       "Golden Oat Breakfast Biscuits",       "belVita",        '1 pack (4 biscuits)', 230, 4, 35, 8, 0.5, 0, 220, 3, 11),
  rf('seed-belvita-choc-chip',        "Chocolate Chip Breakfast Biscuits",   "belVita",        '1 pack (4 biscuits)', 230, 4, 35, 8, 1.5, 0, 180, 4, 11),
  rf('seed-belvita-cinnamon-bs',      "Cinnamon Brown Sugar Breakfast Biscuits","belVita",     '1 pack (4 biscuits)', 230, 4, 35, 8, 0.5, 0, 220, 3, 10),

  // ── Counter High Protein Frozen Burritos ────────────────────────
  rf('seed-counter-beefy-queso',      "Beefy Queso Burrito",                 "Counter",        '1 burrito (204g)', 360, 30, 43, 10, 1.5, 10, 1040, 5, 2),
];
