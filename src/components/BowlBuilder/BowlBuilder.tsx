import { useEffect, useState, useMemo } from 'react';
import { db } from '../../db/database';
import { emptyNutrition } from '../../utils/foodApi';
import type { FoodItem, MealEntry, NutritionInfo } from '../../types';

interface Props {
  brandId: string;   // 'chipotle' | 'pancheros'
  brandName: string; // 'Chipotle' | 'Pancheros'
  onAdd: (entry: MealEntry) => void;
  onCancel: () => void;
}

const CATEGORIES: { key: string; label: string; multi: boolean; required: boolean; hint?: string }[] = [
  { key: 'vessel',  label: 'Style',          multi: false, required: true  },
  { key: 'protein', label: 'Protein',        multi: false, required: true  },
  { key: 'double',  label: 'Double Protein', multi: false, required: false, hint: 'add a 2nd scoop (+$)' },
  { key: 'rice',    label: 'Rice',           multi: false, required: false },
  { key: 'beans',   label: 'Beans',          multi: false, required: false },
  { key: 'salsa',   label: 'Salsa',          multi: true,  required: false },
  { key: 'extra',   label: 'Extras',         multi: true,  required: false },
];

function addNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return Object.fromEntries(
    (Object.keys(a) as (keyof NutritionInfo)[]).map(k => [k, (a[k] || 0) + (b[k] || 0)])
  ) as unknown as NutritionInfo;
}

export default function BowlBuilder({ brandId, brandName, onAdd, onCancel }: Props) {
  const [ingredients, setIngredients] = useState<FoodItem[]>([]);
  const [singles, setSingles] = useState<Record<string, string | null>>({});
  const [multis, setMultis] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    db.customFoods
      .filter(f => f.id.startsWith(`seed-${brandId}-ing-`))
      .toArray()
      .then(items => {
        setIngredients(items);
        // Pre-select "Bowl" style and "No Rice" / "No Beans" defaults
        const defaults: Record<string, string | null> = {};
        const bowl = items.find(f => f.id.includes('-ing-vessel-bowl'));
        if (bowl) defaults.vessel = bowl.id;
        const noRice = items.find(f => f.id.includes('-ing-rice-none'));
        if (noRice) defaults.rice = noRice.id;
        const noBeans = items.find(f => f.id.includes('-ing-beans-none'));
        if (noBeans) defaults.beans = noBeans.id;
        setSingles(defaults);
      });
  }, [brandId]);

  const grouped = useMemo(() => {
    const g: Record<string, FoodItem[]> = {};
    for (const cat of CATEGORIES) {
      g[cat.key] = ingredients.filter(f => f.id.startsWith(`seed-${brandId}-ing-${cat.key}-`));
    }
    return g;
  }, [ingredients, brandId]);

  const selectedItems = useMemo(() => {
    const items: FoodItem[] = [];
    for (const cat of CATEGORIES) {
      if (!cat.multi) {
        const id = singles[cat.key];
        if (id) {
          const item = ingredients.find(f => f.id === id);
          if (item) items.push(item);
        }
      } else {
        const ids = multis[cat.key] || new Set<string>();
        for (const id of ids) {
          const item = ingredients.find(f => f.id === id);
          if (item) items.push(item);
        }
      }
    }
    return items;
  }, [singles, multis, ingredients]);

  const totalNutrition = useMemo(
    () => selectedItems.reduce((acc, item) => addNutrition(acc, item.nutrition), emptyNutrition()),
    [selectedItems]
  );

  // Build a readable name from selections, e.g. "Chipotle Burrito — Chicken, Brown Rice, Black Beans, Guac"
  const vesselItem = singles.vessel ? ingredients.find(f => f.id === singles.vessel) : null;
  const style = vesselItem?.name.toLowerCase().includes('burrito') ? 'Burrito'
    : vesselItem?.name.toLowerCase().includes('taco') ? 'Tacos'
    : 'Bowl';

  const ingredientNames = selectedItems
    .filter(i => i.nutrition.calories > 0 && !i.id.includes('-ing-vessel-'))
    .map(i => i.name)
    .join(', ');

  const entryName = `${brandName} ${style}${ingredientNames ? ` — ${ingredientNames}` : ''}`;

  const canAdd = CATEGORIES
    .filter(c => c.required)
    .every(c => !c.multi && singles[c.key] != null);

  const handleAdd = () => {
    if (!canAdd) return;
    const food: FoodItem = {
      id: `custom-builder-${Date.now()}`,
      name: entryName,
      brand: brandName,
      servingSizeG: 1,
      servingLabel: '1 custom order',
      source: 'custom',
      nutrition: totalNutrition,
    };
    onAdd({
      id: `${Date.now()}-${Math.random()}`,
      food,
      servings: 1,
      timeAdded: new Date().toISOString(),
    });
  };

  const toggleSingle = (cat: string, id: string) => {
    setSingles(s => ({ ...s, [cat]: s[cat] === id ? null : id }));
  };

  const toggleMulti = (cat: string, id: string) => {
    setMultis(m => {
      const next = new Set(m[cat] || new Set<string>());
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...m, [cat]: next };
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sticky running total */}
      <div className="sticky top-0 bg-surface-bg/95 backdrop-blur-sm z-10 px-4 py-3 border-b border-white/[0.07]">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-white font-bold text-lg leading-none">{Math.round(totalNutrition.calories)}</div>
            <div className="text-gray-500 text-xs mt-0.5">cal</div>
          </div>
          <div>
            <div className="text-blue-400 font-semibold">{Math.round(totalNutrition.protein)}g</div>
            <div className="text-gray-500 text-xs mt-0.5">protein</div>
          </div>
          <div>
            <div className="text-amber-400 font-semibold">{Math.round(totalNutrition.carbs)}g</div>
            <div className="text-gray-500 text-xs mt-0.5">carbs</div>
          </div>
          <div>
            <div className="text-rose-400 font-semibold">{Math.round(totalNutrition.fat)}g</div>
            <div className="text-gray-500 text-xs mt-0.5">fat</div>
          </div>
        </div>
      </div>

      {/* Ingredient categories */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {CATEGORIES.map(cat => {
          let items = grouped[cat.key] || [];
          if (items.length === 0) return null;

          // For double protein, only show option matching the currently selected protein
          if (cat.key === 'double') {
            const selectedProteinId = singles['protein'];
            if (!selectedProteinId) return null;
            const proteinItem = ingredients.find(f => f.id === selectedProteinId);
            const proteinName = proteinItem?.name.toLowerCase() ?? '';
            items = items.filter(f => f.name.toLowerCase().replace('double ', '') === proteinName);
            if (items.length === 0) return null;
          }

          return (
            <div key={cat.key}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{cat.label}</span>
                {cat.required && <span className="text-[10px] text-emerald-500 font-bold">REQUIRED</span>}
                {cat.hint && <span className="text-[10px] text-gray-600">{cat.hint}</span>}
                {!cat.required && !cat.hint && !cat.multi && <span className="text-[10px] text-gray-600 ml-auto">pick one</span>}
                {cat.multi && <span className="text-[10px] text-gray-600 ml-auto">pick any</span>}
              </div>
              <div className="space-y-1.5">
                {items.map(item => {
                  const isSelected = cat.multi
                    ? (multis[cat.key] || new Set<string>()).has(item.id)
                    : singles[cat.key] === item.id;
                  const cal = item.nutrition.calories;

                  return (
                    <button
                      key={item.id}
                      onClick={() => cat.multi ? toggleMulti(cat.key, item.id) : toggleSingle(cat.key, item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-emerald-900/40 border-emerald-600/70'
                          : 'bg-surface-raised border-white/[0.05] active:bg-surface-high'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Radio / checkbox indicator */}
                        <div className={`shrink-0 flex items-center justify-center transition-colors ${
                          cat.multi
                            ? `w-4 h-4 rounded border-2 ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600'}`
                            : `w-4 h-4 rounded-full border-2 ${isSelected ? 'border-emerald-500' : 'border-gray-600'}`
                        }`}>
                          {cat.multi && isSelected && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                            </svg>
                          )}
                          {!cat.multi && isSelected && (
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {item.name}
                        </span>
                      </div>
                      {cal > 0 ? (
                        <span className={`text-xs shrink-0 ${isSelected ? 'text-emerald-400' : 'text-gray-500'}`}>
                          +{cal} cal
                        </span>
                      ) : (
                        <span className="text-xs text-gray-700 shrink-0">0 cal</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-3 border-t border-white/[0.07] space-y-3">
        {ingredientNames ? (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {entryName}
          </p>
        ) : null}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-700 text-gray-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="flex-[2] py-3 rounded-xl bg-emerald-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {canAdd ? 'Add to Meal' : 'Pick a style & protein'}
          </button>
        </div>
      </div>
    </div>
  );
}
