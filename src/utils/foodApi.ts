import type { FoodItem, NutritionInfo } from '../types';

const USDA_KEY = 'DEMO_KEY';

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
  return {
    id: `off-${p.id || p.code || Math.random()}`,
    name: (p.product_name as string) || (p.product_name_en as string) || 'Unknown',
    brand: (p.brands as string) || undefined,
    servingSizeG: parseFloat(p.serving_size as string) || 100,
    servingLabel: (p.serving_size as string) || '100g',
    barcode: p.code as string,
    source: 'off',
    nutrition: {
      calories: n['energy-kcal_serving'] || n['energy-kcal_100g'] || 0,
      protein: n.proteins_serving ?? n.proteins_100g ?? 0,
      carbs: n.carbohydrates_serving ?? n.carbohydrates_100g ?? 0,
      fat: n.fat_serving ?? n.fat_100g ?? 0,
      sugar: n.sugars_serving ?? n.sugars_100g ?? 0,
      fiber: n.fiber_serving ?? n.fiber_100g ?? 0,
      sodium: (n.sodium_serving ?? n.sodium_100g ?? 0) * 1000,
      cholesterol: n.cholesterol_serving ?? 0,
      saturatedFat: n['saturated-fat_serving'] ?? n['saturated-fat_100g'] ?? 0,
      vitaminA: n['vitamin-a_serving'] ?? 0,
      vitaminC: n['vitamin-c_serving'] ?? n['vitamin-c_100g'] ?? 0,
      vitaminD: n['vitamin-d_serving'] ?? 0,
      vitaminB12: n['vitamin-b12_serving'] ?? 0,
      iron: n.iron_serving ?? n.iron_100g ?? 0,
      calcium: n.calcium_serving ?? n.calcium_100g ?? 0,
      potassium: n.potassium_serving ?? n.potassium_100g ?? 0,
    }
  };
}

export async function searchOFF(query: string): Promise<FoodItem[]> {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=15&fields=id,code,product_name,product_name_en,brands,serving_size,nutriments`;
  const res = await fetch(url);
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
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=15&api_key=${USDA_KEY}`;
  const res = await fetch(url);
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
