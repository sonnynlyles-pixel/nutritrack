import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, BoltIcon } from '@heroicons/react/24/outline';
import { db } from '../db/database';
import { useStore } from '../store/useStore';
import { useDailyLog } from '../hooks/useDailyLog';
import type { QuickMeal, MealCategory, MealEntry } from '../types';

const MEAL_OPTIONS: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

export default function QuickMeals() {
  const { selectedDate } = useStore();
  const { log, addEntry } = useDailyLog(selectedDate);
  const [quickMeals, setQuickMeals] = useState<QuickMeal[]>([]);
  const [targetMeal, setTargetMeal] = useState<MealCategory>('breakfast');
  const [savingMeal, setSavingMeal] = useState<MealCategory | null>(null);
  const [newMealName, setNewMealName] = useState('');

  useEffect(() => {
    db.quickMeals.toArray().then(setQuickMeals);
  }, []);

  const handleDelete = async (id: string) => {
    await db.quickMeals.delete(id);
    setQuickMeals(prev => prev.filter(m => m.id !== id));
  };

  const handleApplyQuickMeal = async (qm: QuickMeal) => {
    for (const ing of qm.entries) {
      const entry: MealEntry = {
        id: `${Date.now()}-${Math.random()}`,
        food: ing.food,
        servings: ing.servings,
        timeAdded: new Date().toISOString(),
      };
      await addEntry(targetMeal, entry);
    }
  };

  const handleSaveCurrentMeal = async () => {
    if (!newMealName.trim() || !log) return;
    const mealEntries = log.meals[savingMeal!] || [];
    if (mealEntries.length === 0) return;

    const totalCal = mealEntries.reduce((s, e) => s + e.food.nutrition.calories * e.servings, 0);
    const qm: QuickMeal = {
      id: `qm-${Date.now()}`,
      name: newMealName,
      entries: mealEntries.map(e => ({ food: e.food, servings: e.servings })),
      totalCalories: Math.round(totalCal),
    };
    await db.quickMeals.put(qm);
    setQuickMeals(await db.quickMeals.toArray());
    setSavingMeal(null);
    setNewMealName('');
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-5">
      <h1 className="text-xl font-bold text-white pt-2">Quick Meals</h1>

      {/* Add to meal selector */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-white text-sm">Add quick meal to:</h3>
        <div className="flex gap-2">
          {MEAL_OPTIONS.map(m => (
            <button
              key={m}
              onClick={() => setTargetMeal(m)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize transition-colors border ${targetMeal === m ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Save current meal */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-white text-sm">Save a meal from today</h3>
        {savingMeal ? (
          <div className="space-y-3">
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              placeholder="Quick meal name (e.g. My Breakfast)"
              value={newMealName}
              onChange={e => setNewMealName(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setSavingMeal(null)}
                className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCurrentMeal}
                disabled={!newMealName.trim()}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            {MEAL_OPTIONS.map(m => {
              const count = log?.meals[m]?.length || 0;
              return (
                <button
                  key={m}
                  onClick={() => setSavingMeal(m)}
                  disabled={count === 0}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize border transition-colors ${count > 0 ? 'bg-gray-700 border-gray-600 text-gray-200 hover:border-emerald-600' : 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'}`}
                >
                  {m}
                  {count > 0 && <span className="ml-1 text-emerald-400">({count})</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick meals list */}
      <div className="space-y-3">
        {quickMeals.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <BoltIcon className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p>No quick meals saved yet</p>
            <p className="text-xs mt-1">Save a meal above to reuse it quickly</p>
          </div>
        )}
        {quickMeals.map(qm => (
          <div key={qm.id} className="bg-gray-800 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-white">{qm.name}</div>
                <div className="text-xs text-gray-500">
                  {qm.entries.length} items · {qm.totalCalories} cal
                </div>
              </div>
              <button onClick={() => handleDelete(qm.id)} className="p-1.5 text-gray-600 hover:text-red-400">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 mb-3">
              {qm.entries.map((entry, i) => (
                <div key={i} className="text-xs text-gray-400">
                  {entry.servings}x {entry.food.name}
                  <span className="text-gray-600 ml-1">({Math.round(entry.food.nutrition.calories * entry.servings)} cal)</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleApplyQuickMeal(qm)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold"
            >
              <PlusIcon className="w-4 h-4" />
              Add to {targetMeal}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
