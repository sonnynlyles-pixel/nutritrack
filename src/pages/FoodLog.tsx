import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { useDailyLog } from '../hooks/useDailyLog';
import { sumNutrition } from '../utils/nutrition';
import FoodSearchModal from '../components/FoodSearch/FoodSearchModal';
import type { MealCategory, MealEntry } from '../types';

const MEALS: { key: MealCategory; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙' },
  { key: 'snacks', label: 'Snacks', emoji: '🍎' },
];

export default function FoodLog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedDate } = useStore();

  const dateParam = searchParams.get('date');
  const mealParam = searchParams.get('meal') as MealCategory | null;

  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(dateParam || today);

  const { log, loading, addEntry, removeEntry, updateWater, updateNotes } = useDailyLog(currentDate);
  const [openMeal, setOpenMeal] = useState<MealCategory | null>(mealParam || null);
  const [modalMeal, setModalMeal] = useState<MealCategory | null>(null);
  const [expandedMeals, setExpandedMeals] = useState<Set<MealCategory>>(
    new Set(mealParam ? [mealParam] : ['breakfast', 'lunch', 'dinner', 'snacks'])
  );

  const changeDate = (delta: number) => {
    const newDate = format(addDays(parseISO(currentDate), delta), 'yyyy-MM-dd');
    setCurrentDate(newDate);
    setSelectedDate(newDate);
    navigate(`/log?date=${newDate}`, { replace: true });
  };

  const allEntries = log ? Object.values(log.meals).flat() : [];
  const totals = sumNutrition(allEntries);

  const toggleMeal = (meal: MealCategory) => {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(meal)) next.delete(meal);
      else next.add(meal);
      return next;
    });
  };

  const handleAddEntry = async (entry: MealEntry) => {
    if (modalMeal) await addEntry(modalMeal, entry);
    setModalMeal(null);
  };

  const dateLabel = format(parseISO(currentDate), 'EEE, MMM d');
  const isToday = currentDate === today;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Date header */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-800">
            <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
          </button>
          <div className="text-center">
            <div className="font-semibold text-white">{dateLabel}</div>
            {isToday && <div className="text-xs text-emerald-400">Today</div>}
          </div>
          <button
            onClick={() => changeDate(1)}
            disabled={currentDate >= today}
            className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-30"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Meal sections */}
        {MEALS.map(({ key, label, emoji }) => {
          const entries = log?.meals[key] || [];
          const mealTotals = sumNutrition(entries);
          const isExpanded = expandedMeals.has(key);

          return (
            <div key={key} className="bg-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleMeal(key)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  <span className="font-semibold text-white">{label}</span>
                  <span className="text-xs text-gray-500">({entries.length})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-semibold text-sm">
                    {Math.round(mealTotals.calories)} cal
                  </span>
                  <span className="text-gray-600 text-xs">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-700">
                  {entries.map(entry => (
                    <div key={entry.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-700/50">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{entry.food.name}</div>
                        {entry.food.brand && (
                          <div className="text-xs text-gray-500 truncate">{entry.food.brand}</div>
                        )}
                        <div className="text-xs text-gray-500">
                          {entry.servings}x {entry.food.servingLabel} ·{' '}
                          <span className="text-white">{Math.round(entry.food.nutrition.calories * entry.servings)} cal</span>{' '}
                          | P:{Math.round(entry.food.nutrition.protein * entry.servings)}g
                          C:{Math.round(entry.food.nutrition.carbs * entry.servings)}g
                          F:{Math.round(entry.food.nutrition.fat * entry.servings)}g
                        </div>
                      </div>
                      <button
                        onClick={() => removeEntry(key, entry.id)}
                        className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setModalMeal(key)}
                    className="w-full flex items-center justify-center gap-2 p-3 text-emerald-400 hover:bg-gray-700/50 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Food</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Water */}
        <div className="bg-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">💧</span>
              <span className="font-semibold text-white">Water</span>
            </div>
            <span className="text-blue-400 font-semibold">{log?.waterOz || 0} oz</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateWater(Math.max(0, (log?.waterOz || 0) - 8))}
              className="w-10 h-10 bg-gray-700 rounded-xl text-white font-bold"
            >-</button>
            <input
              type="number"
              className="flex-1 bg-gray-700 rounded-xl px-3 py-2 text-center text-white focus:outline-none focus:border-emerald-500 border border-transparent"
              value={log?.waterOz || 0}
              onChange={e => updateWater(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <button
              onClick={() => updateWater((log?.waterOz || 0) + 8)}
              className="w-10 h-10 bg-gray-700 rounded-xl text-white font-bold"
            >+</button>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-800 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">Notes</label>
          <textarea
            className="w-full bg-gray-700 rounded-xl p-3 text-gray-200 text-sm resize-none focus:outline-none focus:border-emerald-500 border border-transparent"
            rows={3}
            placeholder="How are you feeling today?"
            value={log?.notes || ''}
            onChange={e => updateNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Sticky totals bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2 z-10">
        <div className="flex justify-around max-w-lg mx-auto text-center">
          <div>
            <div className="text-white font-bold">{Math.round(totals.calories)}</div>
            <div className="text-xs text-gray-500">Cal</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">{Math.round(totals.protein)}g</div>
            <div className="text-xs text-gray-500">Protein</div>
          </div>
          <div>
            <div className="text-amber-400 font-bold">{Math.round(totals.carbs)}g</div>
            <div className="text-xs text-gray-500">Carbs</div>
          </div>
          <div>
            <div className="text-rose-400 font-bold">{Math.round(totals.fat)}g</div>
            <div className="text-xs text-gray-500">Fat</div>
          </div>
        </div>
      </div>

      {/* Food Search Modal */}
      <FoodSearchModal
        isOpen={modalMeal !== null}
        onClose={() => setModalMeal(null)}
        onAdd={handleAddEntry}
        category={modalMeal || 'snacks'}
      />
    </div>
  );
}
