import { useState, useEffect } from 'react';
import { SparklesIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FoodItemRow from '../shared/FoodItemRow';
import { db } from '../../db/database';
import {
  getMealContext,
  getRecommendations,
  type MacroTarget,
  type Recommendation,
} from '../../utils/mealRecommendations';
import FoodInsightsPanel from '../FoodInsights/FoodInsightsPanel';
import type { FoodItem, MealCategory, MealEntry } from '../../types';

interface Props {
  remaining: MacroTarget;
  onAdd: (category: MealCategory, entry: MealEntry) => Promise<void>;
}

function FoodDetailSheet({
  rec,
  onClose,
  onAdd,
  isAdded,
}: {
  rec: Recommendation;
  onClose: () => void;
  onAdd: () => void;
  isAdded: boolean;
}) {
  const n = rec.food.nutrition;
  const s = rec.servings;

  const microItems = [
    { label: 'Fiber',         value: n.fiber,        unit: 'g'   },
    { label: 'Sugar',         value: n.sugar,        unit: 'g'   },
    { label: 'Added Sugar',   value: n.addedSugar,   unit: 'g'   },
    { label: 'Saturated Fat', value: n.saturatedFat, unit: 'g'   },
    { label: 'Trans Fat',     value: n.transFat,     unit: 'g'   },
    { label: 'Sodium',        value: n.sodium,       unit: 'mg'  },
    { label: 'Cholesterol',   value: n.cholesterol,  unit: 'mg'  },
    { label: 'Caffeine',      value: n.caffeine,     unit: 'mg'  },
    { label: 'Alcohol',       value: n.alcohol,      unit: 'g'   },
    { label: 'Magnesium',     value: n.magnesium,    unit: 'mg'  },
    { label: 'Zinc',          value: n.zinc,         unit: 'mg'  },
    { label: 'Omega-3',       value: n.omega3,       unit: 'g'   },
    { label: 'Folate',        value: n.folate,       unit: 'mcg' },
    { label: 'Potassium',     value: n.potassium,    unit: 'mg'  },
    { label: 'Calcium',       value: n.calcium,      unit: 'mg'  },
    { label: 'Iron',          value: n.iron,         unit: 'mg'  },
    { label: 'Vitamin C',     value: n.vitaminC,     unit: 'mg'  },
    { label: 'Vitamin D',     value: n.vitaminD,     unit: 'mcg' },
  ].filter(({ value }) => (value ?? 0) > 0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-white/[0.08]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-2 pb-3 border-b border-white/[0.06]">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-base font-semibold text-white leading-snug">{rec.food.name}</h2>
            {rec.food.brand && <p className="text-xs text-gray-500 mt-0.5">{rec.food.brand}</p>}
            <p className="text-xs text-gray-600 mt-0.5">{s}× {rec.food.servingLabel}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/[0.06] shrink-0">
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Macro grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {([
              { label: 'Calories', value: Math.round(n.calories * s),  unit: '',  color: 'text-white' },
              { label: 'Protein',  value: Math.round(n.protein  * s),  unit: 'g', color: 'text-blue-400' },
              { label: 'Carbs',    value: Math.round(n.carbs    * s),  unit: 'g', color: 'text-amber-400' },
              { label: 'Fat',      value: Math.round(n.fat      * s),  unit: 'g', color: 'text-rose-400' },
            ] as const).map(({ label, value, unit, color }) => (
              <div key={label} className="card-raised rounded-xl p-2">
                <div className={`text-base font-bold ${color}`}>{value}{unit}</div>
                <div className="text-xs text-gray-600">{label}</div>
              </div>
            ))}
          </div>

          {/* Micro list */}
          {microItems.length > 0 && (
            <div className="card-raised rounded-xl divide-y divide-white/[0.05]">
              {microItems.map(({ label, value, unit }) => (
                <div key={label} className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs text-white font-medium">
                    {Math.round((value ?? 0) * s * 10) / 10}{unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          <FoodInsightsPanel food={rec.food} servings={s} />

          {/* Add button */}
          <button
            onClick={() => { onAdd(); onClose(); }}
            disabled={isAdded}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
              isAdded
                ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700'
                : 'bg-brand-gradient text-white'
            }`}
          >
            {isAdded ? '✓ Already Added' : `Add to Meal (${Math.round(n.calories * s)} cal)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MealRecommendations({ remaining, onAdd }: Props) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [expanded, setExpanded] = useState(true);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);

  useEffect(() => {
    Promise.all([
      db.customFoods.toArray(),
      db.recentFoods.orderBy('usedAt').reverse().limit(30).toArray(),
    ]).then(([custom, recent]) => {
      // Recent foods first for personalisation, then all seeded/custom — deduplicated
      const seen = new Set<string>();
      const merged: FoodItem[] = [];
      for (const f of [...recent, ...custom]) {
        if (!seen.has(f.id)) {
          seen.add(f.id);
          merged.push(f);
        }
      }
      setFoods(merged);
    });
  }, []);

  const { label, meal } = getMealContext();
  const recs = getRecommendations(remaining, foods, 6);

  if (remaining.calories <= 50) {
    return (
      <div className="card p-4 flex items-center gap-3">
        <SparklesIcon className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <div className="text-sm font-semibold text-gray-300">Smart Suggestions</div>
          <div className="text-xs text-emerald-400 mt-0.5">You've hit your calorie goal for today!</div>
        </div>
      </div>
    );
  }

  if (recs.length === 0) return null;

  const handleAdd = async (rec: Recommendation) => {
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food: rec.food,
      servings: rec.servings,
      timeAdded: new Date().toISOString(),
    };
    await onAdd(meal, entry);
    await db.recentFoods.put({ ...rec.food, usedAt: new Date().toISOString() });
    setAdded(prev => new Set(prev).add(rec.food.id));
  };

  return (
    <>
      <div className="card overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setExpanded(p => !p)}
          className="w-full flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-gray-300">{label}</h3>
          </div>
          <span className="text-gray-600 text-xs">{expanded ? '▲' : '▼'}</span>
        </button>

        {expanded && (
          <>
            {/* Remaining macro strip */}
            <div className="flex gap-3 px-4 pb-3 border-b border-white/[0.07]">
              {[
                { label: 'Cal left', value: Math.round(Math.max(remaining.calories, 0)), color: 'text-white' },
                { label: 'Protein', value: `${Math.round(Math.max(remaining.protein, 0))}g`, color: 'text-blue-400' },
                { label: 'Carbs',   value: `${Math.round(Math.max(remaining.carbs,   0))}g`, color: 'text-amber-400' },
                { label: 'Fat',     value: `${Math.round(Math.max(remaining.fat,     0))}g`, color: 'text-rose-400' },
              ].map(({ label: l, value, color }) => (
                <div key={l} className="flex-1 bg-surface-bg rounded-xl py-2 text-center">
                  <div className={`text-sm font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              ))}
            </div>

            {/* Food rows */}
            <div className="divide-y divide-white/[0.04]">
              {recs.map(rec => {
                const isAdded = added.has(rec.food.id);
                return (
                  <FoodItemRow
                    key={rec.food.id}
                    food={rec.food}
                    servings={rec.servings}
                    onTap={() => setSelectedRec(rec)}
                    actions={
                      <button
                        onClick={() => handleAdd(rec)}
                        disabled={isAdded}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                          isAdded
                            ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700'
                            : 'bg-brand-gradient text-white'
                        }`}
                      >
                        {isAdded ? '✓ Added' : <><PlusIcon className="w-3 h-3" />Add</>}
                      </button>
                    }
                  />
                );
              })}
            </div>

            <div className="px-4 py-2 border-t border-white/[0.07]">
              <p className="text-xs text-gray-600 text-center">
                Tap a food for details · servings auto-sized to fit your goals
              </p>
            </div>
          </>
        )}
      </div>

      {/* Detail bottom sheet */}
      {selectedRec && (
        <FoodDetailSheet
          rec={selectedRec}
          onClose={() => setSelectedRec(null)}
          onAdd={() => handleAdd(selectedRec)}
          isAdded={added.has(selectedRec.food.id)}
        />
      )}
    </>
  );
}
