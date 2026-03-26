import type { FoodItem, NutritionInfo } from '../types';

// Key is passed in at call time so the user can set their own via Settings
let _usdaKey = 'DEMO_KEY';
export function setUsdaApiKey(key: string) { _usdaKey = key || 'DEMO_KEY'; }

export function emptyNutrition(): NutritionInfo {
  return {
    calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0,
    sodium: 0, cholesterol: 0, saturatedFat: 0, vitaminA: 0, vitaminC: 0,
    vitaminD: 0, vitaminB12: 0, iron: 0, calcium: 0, potassium: 0
  };
}

// --- Open Food Facts ---
function parseOFFProduct(p: Record<string, unknown>): FoodItem {
  const n = (p.nutriments as Record<string, number>) || {};
  const servingSizeG = parseFloat(p.serving_size as string) || 100;
  // Scale factor: OFF stores _100g values per 100g/ml. If _serving isn't present,
  // multiply the _100g value by (servingSize / 100) to get the per-serving amount.
  const s = servingSizeG / 100;
  const nv = (servingKey: string, per100Key: string, extraScale = 1): number => {
    if (n[servingKey] != null) return n[servingKey] * extraScale;
    if (n[per100Key] != null) return n[per100Key] * s * extraScale;
    return 0;
  };
  return {
    id: `off-${p.id || p.code || Math.random()}`,
    name: (p.product_name as string) || (p.product_name_en as string) || 'Unknown',
    brand: (p.brands as string) || undefined,
    servingSizeG,
    servingLabel: (p.serving_size as string) || '100g',
    barcode: p.code as string,
    source: 'off',
    nutrition: {
      calories:     nv('energy-kcal_serving', 'energy-kcal_100g'),
      protein:      nv('proteins_serving',    'proteins_100g'),
      carbs:        nv('carbohydrates_serving','carbohydrates_100g'),
      fat:          nv('fat_serving',          'fat_100g'),
      sugar:        nv('sugars_serving',       'sugars_100g'),
      fiber:        nv('fiber_serving',        'fiber_100g'),
      sodium:       nv('sodium_serving',       'sodium_100g', 1000), // OFF stores sodium in g, convert to mg
      cholesterol:  nv('cholesterol_serving',  'cholesterol_100g'),
      saturatedFat: nv('saturated-fat_serving','saturated-fat_100g'),
      vitaminA:     nv('vitamin-a_serving',    'vitamin-a_100g'),
      vitaminC:     nv('vitamin-c_serving',    'vitamin-c_100g'),
      vitaminD:     nv('vitamin-d_serving',    'vitamin-d_100g'),
      vitaminB12:   nv('vitamin-b12_serving',  'vitamin-b12_100g'),
      iron:         nv('iron_serving',         'iron_100g'),
      calcium:      nv('calcium_serving',      'calcium_100g'),
      potassium:    nv('potassium_serving',     'potassium_100g'),
    }
  };
}

export async function searchOFF(query: string): Promise<FoodItem[]> {
  const url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&page_size=15&fields=id,code,product_name,product_name_en,brands,serving_size,nutriments&sort_by=unique_scans_n`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'NutriTrack/1.0 (personal nutrition tracker)' }
  });
  if (!res.ok) throw new Error(`OFF ${res.status}`);
  const data = await res.json();
  return ((data.products || []) as Record<string, unknown>[])
    .filter((p) => p.product_name)
    .map(parseOFFProduct);
}

export async function lookupBarcode(barcode: string): Promise<FoodItem | null> {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 1 && data.product) {
    return parseOFFProduct({ ...data.product, code: barcode });
  }
  return null;
}

// --- USDA FoodData Central ---
function usdaNutrientValue(nutrients: Array<{ nutrientId: number; value: number }>, id: number): number {
  const n = nutrients?.find((n) => n.nutrientId === id);
  return n?.value ?? 0;
}

function parseUSDAFood(f: Record<string, unknown>): FoodItem {
  const nutrients = (f.foodNutrients as Array<{ nutrientId: number; value: number }>) || [];
  const serving = (f.servingSize as number) || 100;
  const servingUnit = (f.servingSizeUnit as string) || 'g';
  return {
    id: `usda-${f.fdcId}`,
    name: (f.description as string) || 'Unknown',
    brand: (f.brandOwner as string) || (f.brandName as string) || undefined,
    servingSizeG: serving,
    servingLabel: `${serving}${servingUnit}`,
    source: 'usda',
    nutrition: {
      calories: usdaNutrientValue(nutrients, 1008),
      protein: usdaNutrientValue(nutrients, 1003),
      carbs: usdaNutrientValue(nutrients, 1005),
      fat: usdaNutrientValue(nutrients, 1004),
      sugar: usdaNutrientValue(nutrients, 2000),
      fiber: usdaNutrientValue(nutrients, 1079),
      sodium: usdaNutrientValue(nutrients, 1093),
      cholesterol: usdaNutrientValue(nutrients, 1253),
      saturatedFat: usdaNutrientValue(nutrients, 1258),
      vitaminA: usdaNutrientValue(nutrients, 1106),
      vitaminC: usdaNutrientValue(nutrients, 1162),
      vitaminD: usdaNutrientValue(nutrients, 1114),
      vitaminB12: usdaNutrientValue(nutrients, 1178),
      iron: usdaNutrientValue(nutrients, 1089),
      calcium: usdaNutrientValue(nutrients, 1087),
      potassium: usdaNutrientValue(nutrients, 1092),
    }
  };
}

export async function searchUSDA(query: string): Promise<FoodItem[]> {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=15&api_key=${_usdaKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`USDA ${res.status}`);
  const data = await res.json();
  return ((data.foods || []) as Record<string, unknown>[]).map(parseUSDAFood);
}

export async function searchFoods(query: string): Promise<FoodItem[]> {
  const [offResults, usdaResults] = await Promise.allSettled([searchOFF(query), searchUSDA(query)]);
  const off = offResults.status === 'fulfilled' ? offResults.value : [];
  const usda = usdaResults.status === 'fulfilled' ? usdaResults.value : [];
  // Interleave results: OFF first (better branded), USDA second (better generics)
  const combined: FoodItem[] = [];
  const maxLen = Math.max(off.length, usda.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < off.length) combined.push(off[i]);
    if (i < usda.length) combined.push(usda[i]);
  }
  return combined.slice(0, 25);
}
