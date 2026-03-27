import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, addDays, parseISO } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { useDailyLog } from '../hooks/useDailyLog';
import { sumNutrition } from '../utils/nutrition';
import FoodSearchModal from '../components/FoodSearch/FoodSearchModal';
import FoodInsightsPanel from '../components/FoodInsights/FoodInsightsPanel';
import FoodItemRow from '../components/shared/FoodItemRow';
import type { MealCategory, MealEntry } from '../types';

const MEALS: { key: MealCategory; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch',     label: 'Lunch',     emoji: '☀️' },
  { key: 'dinner',    label: 'Dinner',    emoji: '🌙' },
  { key: 'snacks',    label: 'Snacks',    emoji: '🍎' },
];

export default function FoodLog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedDate } = useStore();

  const dateParam  = searchParams.get('date');
  const mealParam  = searchParams.get('meal') as MealCategory | null;
  const today      = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(dateParam || today);

  const { log, loading, addEntry, removeEntry, updateWater, updateNotes } = useDailyLog(currentDate);
  const [modalMeal, setModalMeal]     = useState<MealCategory | null>(mealParam || null);
  const [expandedMeals, setExpandedMeals] = useState<Set<MealCategory>>(
    new Set(mealParam ? [mealParam] : ['breakfast', 'lunch', 'dinner', 'snacks'])
  );
  const [selectedEntry, setSelectedEntry] = useState<MealEntry | null>(null);

  const changeDate = (delta: number) => {
    const newDate = format(addDays(parseISO(currentDate), delta), 'yyyy-MM-dd');
    setCurrentDate(newDate);
    setSelectedDate(newDate);
    navigate(`/log?date=${newDate}`, { replace: true });
  };

  const allEntries = log ? Object.values(log.meals).flat() : [];
  const totals     = sumNutrition(allEntries);

  const toggleMeal = (meal: MealCategory) => {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(meal)) next.delete(meal); else next.add(meal);
      return next;
    });
  };

  const handleAddEntry = async (entry: MealEntry) => {
    if (modalMeal) await addEntry(modalMeal, entry);
    setModalMeal(null);
  };

  const dateLabel = format(parseISO(currentDate), 'EEE, MMM d');
  const isToday   = currentDate === today;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-24">

      {/* Date header */}
      <div className="sticky top-0 glass border-b border-white/[0.06] z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-white/[0.06] transition-colors">
            <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
          </button>
          <div className="text-center">
            <div className="font-semibold text-white">{dateLabel}</div>
            {isToday && <div className="text-xs text-brand-400">Today</div>}
          </div>
          <button
            onClick={() => changeDate(1)}
            disabled={currentDate >= today}
            className="p-2 rounded-full hover:bg-white/[0.06] transition-colors disabled:opacity-30"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Meal sections */}
        {MEALS.map(({ key, label, emoji }) => {
          const entries    = log?.meals[key] || [];
          const mealTotals = sumNutrition(entries);
          const isExpanded = expandedMeals.has(key);

          return (
            <div key={key} className="card overflow-hidden">
              <button
                onClick={() => toggleMeal(key)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  <span className="font-semibold text-white">{label}</span>
                  {entries.length > 0 && (
                    <span className="text-xs text-gray-600">({entries.length})</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-400 font-bold text-sm">
                    {Math.round(mealTotals.calories)} cal
                  </span>
                  <span className="text-gray-600 text-xs">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-white/[0.05]">
                  {entries.map(entry => (
                    <FoodItemRow
                      key={entry.id}
                      food={entry.food}
                      servings={entry.servings}
                      onTap={() => setSelectedEntry(entry)}
                      actions={
                        <button
                          onClick={() => removeEntry(key, entry.id)}
                          className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      }
                    />
                  ))}
                  <button
                    onClick={() => setModalMeal(key)}
                    className="w-full flex items-center justify-center gap-2 p-3 text-brand-400 hover:bg-white/[0.03] transition-colors"
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
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">💧</span>
              <span className="font-semibold text-white">Water</span>
            </div>
            <span className="text-blue-400 font-bold">{log?.waterOz || 0} oz</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateWater(Math.max(0, (log?.waterOz || 0) - 8))}
              className="w-10 h-10 bg-surface-raised hover:bg-surface-high border border-white/[0.06] rounded-xl text-white font-bold transition-colors"
            >−</button>
            <input
              type="number"
              className="flex-1 bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-center text-white focus:outline-none focus:border-brand-500 transition-colors"
              value={log?.waterOz || 0}
              onChange={e => updateWater(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <button
              onClick={() => updateWater((log?.waterOz || 0) + 8)}
              className="w-10 h-10 bg-surface-raised hover:bg-surface-high border border-white/[0.06] rounded-xl text-white font-bold transition-colors"
            >+</button>
          </div>
        </div>

        {/* Notes */}
        <div className="card p-4">
          <label className="block section-label mb-3">Notes</label>
          <textarea
            className="w-full bg-surface-raised border border-white/[0.06] rounded-xl p-3 text-gray-200 text-sm resize-none focus:outline-none focus:border-brand-500 transition-colors"
            rows={3}
            placeholder="How are you feeling today?"
            value={log?.notes || ''}
            onChange={e => updateNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Sticky totals bar */}
      <div className="fixed bottom-16 left-0 right-0 glass border-t border-white/[0.06] px-4 py-2.5 z-10">
        <div className="flex justify-around max-w-lg mx-auto text-center">
          <div>
            <div className="text-white font-bold">{Math.round(totals.calories)}</div>
            <div className="text-xs text-gray-600">Cal</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">{Math.round(totals.protein)}g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div>
            <div className="text-amber-400 font-bold">{Math.round(totals.carbs)}g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
          <div>
            <div className="text-rose-400 font-bold">{Math.round(totals.fat)}g</div>
            <div className="text-xs text-gray-600">Fat</div>
          </div>
        </div>
      </div>

      {/* Food Detail Panel */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedEntry(null)} />
          <div className="relative bg-surface-card rounded-t-3xl max-h-[85vh] overflow-y-auto border-t border-white/[0.08]">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            <div className="flex items-start justify-between px-4 pt-2 pb-3 border-b border-white/[0.06]">
              <div className="flex-1 min-w-0 pr-3">
                <h2 className="text-base font-semibold text-white leading-snug">{selectedEntry.food.name}</h2>
                {selectedEntry.food.brand && <p className="text-xs text-gray-500 mt-0.5">{selectedEntry.food.brand}</p>}
                <p className="text-xs text-gray-600 mt-0.5">{selectedEntry.servings}× {selectedEntry.food.servingLabel}</p>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="p-1.5 rounded-full hover:bg-white/[0.06] shrink-0">
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="px-4 py-4 space-y-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                {([
                  { label: 'Calories', value: Math.round(selectedEntry.food.nutrition.calories * selectedEntry.servings), unit: '',  color: 'text-white' },
                  { label: 'Protein',  value: Math.round(selectedEntry.food.nutrition.protein  * selectedEntry.servings), unit: 'g', color: 'text-blue-400' },
                  { label: 'Carbs',    value: Math.round(selectedEntry.food.nutrition.carbs    * selectedEntry.servings), unit: 'g', color: 'text-amber-400' },
                  { label: 'Fat',      value: Math.round(selectedEntry.food.nutrition.fat      * selectedEntry.servings), unit: 'g', color: 'text-rose-400' },
                ] as const).map(({ label, value, unit, color }) => (
                  <div key={label} className="card-raised rounded-xl p-2">
                    <div className={`text-base font-bold ${color}`}>{value}{unit}</div>
                    <div className="text-xs text-gray-600">{label}</div>
                  </div>
                ))}
              </div>
              <div className="card-raised rounded-xl divide-y divide-white/[0.05]">
                {([
                  { label: 'Fiber',         value: selectedEntry.food.nutrition.fiber,        unit: 'g'   },
                  { label: 'Sugar',         value: selectedEntry.food.nutrition.sugar,        unit: 'g'   },
                  { label: 'Added Sugar',   value: selectedEntry.food.nutrition.addedSugar,   unit: 'g'   },
                  { label: 'Saturated Fat', value: selectedEntry.food.nutrition.saturatedFat, unit: 'g'   },
                  { label: 'Trans Fat',     value: selectedEntry.food.nutrition.transFat,     unit: 'g'   },
                  { label: 'Sodium',        value: selectedEntry.food.nutrition.sodium,       unit: 'mg'  },
                  { label: 'Cholesterol',   value: selectedEntry.food.nutrition.cholesterol,  unit: 'mg'  },
                  { label: 'Caffeine',      value: selectedEntry.food.nutrition.caffeine,     unit: 'mg'  },
                  { label: 'Alcohol',       value: selectedEntry.food.nutrition.alcohol,      unit: 'g'   },
                  { label: 'Magnesium',     value: selectedEntry.food.nutrition.magnesium,    unit: 'mg'  },
                  { label: 'Zinc',          value: selectedEntry.food.nutrition.zinc,         unit: 'mg'  },
                  { label: 'Omega-3',       value: selectedEntry.food.nutrition.omega3,       unit: 'g'   },
                  { label: 'Folate',        value: selectedEntry.food.nutrition.folate,       unit: 'mcg' },
                ] as const).filter(({ value }) => (value ?? 0) > 0).map(({ label, value, unit }) => (
                  <div key={label} className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs text-white font-medium">
                      {Math.round((value ?? 0) * selectedEntry.servings * 10) / 10}{unit}
                    </span>
                  </div>
                ))}
              </div>
              <FoodInsightsPanel food={selectedEntry.food} servings={selectedEntry.servings} />
            </div>
          </div>
        </div>
      )}

      <FoodSearchModal
        isOpen={modalMeal !== null}
        onClose={() => setModalMeal(null)}
        onAdd={handleAddEntry}
        category={modalMeal || 'snacks'}
      />
    </div>
  );
}
