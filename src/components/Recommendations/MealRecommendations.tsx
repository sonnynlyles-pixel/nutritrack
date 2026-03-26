import { useState, useEffect } from 'react';
import { SparklesIcon, PlusIcon } from '@heroicons/react/24/outline';
import { db } from '../../db/database';
import {
  getMealContext,
  getRecommendations,
  type MacroTarget,
  type Recommendation,
} from '../../utils/mealRecommendations';
import type { FoodItem, MealCategory, MealEntry } from '../../types';

interface Props {
  remaining: MacroTarget;
  onAdd: (category: MealCategory, entry: MealEntry) => Promise<void>;
}

export default function MealRecommendations({ remaining, onAdd }: Props) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [expanded, setExpanded] = useState(true);
  const [added, setAdded] = useState<Set<string>>(new Set());

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
      <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-3">
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
    <div className="bg-gray-800 rounded-2xl overflow-hidden">
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
          <div className="flex gap-3 px-4 pb-3 border-b border-gray-700">
            {[
              { label: 'Cal left', value: Math.round(Math.max(remaining.calories, 0)), color: 'text-white' },
              { label: 'Protein', value: `${Math.round(Math.max(remaining.protein, 0))}g`, color: 'text-blue-400' },
              { label: 'Carbs',   value: `${Math.round(Math.max(remaining.carbs,   0))}g`, color: 'text-amber-400' },
              { label: 'Fat',     value: `${Math.round(Math.max(remaining.fat,     0))}g`, color: 'text-rose-400' },
            ].map(({ label: l, value, color }) => (
              <div key={l} className="flex-1 bg-gray-900 rounded-xl py-2 text-center">
                <div className={`text-sm font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500">{l}</div>
              </div>
            ))}
          </div>

          {/* Food cards */}
          <div className="divide-y divide-gray-700/50">
            {recs.map(rec => {
              const n   = rec.food.nutrition;
              const isAdded = added.has(rec.food.id);
              return (
                <div key={rec.food.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{rec.food.name}</div>
                    {rec.food.brand && (
                      <div className="text-xs text-gray-500 truncate">{rec.food.brand}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-0.5">
                      {rec.servings}x {rec.food.servingLabel} ·{' '}
                      <span className="text-white font-medium">
                        {Math.round(n.calories * rec.servings)} cal
                      </span>
                      {' '}·{' '}
                      <span className="text-blue-400">P:{Math.round(n.protein * rec.servings)}g</span>
                      {' '}
                      <span className="text-amber-400">C:{Math.round(n.carbs * rec.servings)}g</span>
                      {' '}
                      <span className="text-rose-400">F:{Math.round(n.fat * rec.servings)}g</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(rec)}
                    disabled={isAdded}
                    className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      isAdded
                        ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isAdded ? '✓ Added' : <><PlusIcon className="w-3 h-3" />Add</>}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-2 border-t border-gray-700">
            <p className="text-xs text-gray-600 text-center">
              Suggestions based on your remaining {meal} goals · servings auto-sized to fit
            </p>
          </div>
        </>
      )}
    </div>
  );
}
