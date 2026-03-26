import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { useDailyLog } from '../hooks/useDailyLog';
import { useStreak } from '../hooks/useStreak';
import { sumNutrition, DV } from '../utils/nutrition';
import type { MealCategory } from '../types';

const MEAL_ORDER: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

function CalorieRing({ consumed, goal }: { consumed: number; goal: number }) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(consumed / goal, 1);
  const offset = circumference * (1 - pct);
  const color = consumed > goal * 1.1 ? '#ef4444' : consumed > goal ? '#f59e0b' : '#10b981';

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#1f2937" strokeWidth="14" />
        <circle
          cx="90" cy="90" r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="mt-[-100px] text-center">
        <div className="text-3xl font-bold text-white">{Math.round(consumed)}</div>
        <div className="text-xs text-gray-400">of {goal} cal</div>
      </div>
      <div className="mt-[60px] text-center">
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">{Math.round(consumed)}</span> consumed ·{' '}
          <span className={consumed > goal ? 'text-red-400' : 'text-emerald-400'}>
            {Math.abs(goal - Math.round(consumed))} {consumed > goal ? 'over' : 'remaining'}
          </span>
        </div>
      </div>
    </div>
  );
}

function MacroBar({ label, consumed, goal, color }: { label: string; consumed: number; goal: number; color: string }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-xs text-gray-400">{label}</div>
      <div className="flex-1 bg-gray-700 rounded-full h-2">
        <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-400 w-20 text-right">{Math.round(consumed)}g / {goal}g</div>
    </div>
  );
}

export default function Dashboard() {
  const { profile, selectedDate } = useStore();
  const { log, loading, addEntry, updateWater } = useDailyLog(selectedDate);
  const streak = useStreak();
  const navigate = useNavigate();
  const [addingMeal] = useState<MealCategory | null>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const allEntries = log ? Object.values(log.meals).flat() : [];
  const totals = sumNutrition(allEntries);

  const dateLabel = format(new Date(selectedDate + 'T12:00:00'), 'EEEE, MMMM d');

  const microItems = [
    { label: 'Vitamin A', value: totals.vitaminA, dv: DV.vitaminA, unit: 'mcg' },
    { label: 'Vitamin C', value: totals.vitaminC, dv: DV.vitaminC, unit: 'mg' },
    { label: 'Vitamin D', value: totals.vitaminD, dv: DV.vitaminD, unit: 'mcg' },
    { label: 'Vitamin B12', value: totals.vitaminB12, dv: DV.vitaminB12, unit: 'mcg' },
    { label: 'Iron', value: totals.iron, dv: DV.iron, unit: 'mg' },
    { label: 'Calcium', value: totals.calcium, dv: DV.calcium, unit: 'mg' },
    { label: 'Potassium', value: totals.potassium, dv: DV.potassium, unit: 'mg' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between pt-2">
        <div>
          <h1 className="text-xl font-bold text-white">{greeting}, {profile.name}!</h1>
          <p className="text-sm text-gray-400">{dateLabel}</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-orange-900/40 border border-orange-700 rounded-full px-3 py-1">
            <span className="text-lg">🔥</span>
            <span className="text-orange-400 font-bold text-sm">{streak}</span>
          </div>
        )}
      </div>

      {/* Calorie Ring */}
      <div className="bg-gray-800 rounded-2xl p-5 flex justify-center">
        <CalorieRing consumed={totals.calories} goal={profile.calorieGoal} />
      </div>

      {/* Macro Bars */}
      <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Macros</h3>
        <MacroBar label="Protein" consumed={totals.protein} goal={profile.macroTargets.protein} color="bg-blue-400" />
        <MacroBar label="Carbs" consumed={totals.carbs} goal={profile.macroTargets.carbs} color="bg-amber-400" />
        <MacroBar label="Fat" consumed={totals.fat} goal={profile.macroTargets.fat} color="bg-rose-400" />
      </div>

      {/* Water Tracker */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💧</span>
            <div>
              <div className="text-sm font-semibold text-white">
                {log?.waterOz || 0} / {profile.waterGoalOz} oz
              </div>
              <div className="text-xs text-gray-500">Water intake</div>
            </div>
          </div>
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div
              className="h-2 bg-blue-400 rounded-full transition-all"
              style={{ width: `${Math.min(((log?.waterOz || 0) / profile.waterGoalOz) * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {[8, 16, 24].map(oz => (
            <button
              key={oz}
              onClick={() => updateWater((log?.waterOz || 0) + oz)}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300 transition-colors"
            >
              +{oz} oz
            </button>
          ))}
          <button
            onClick={() => updateWater(Math.max(0, (log?.waterOz || 0) - 8))}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-500 transition-colors"
          >
            -
          </button>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">Meals</h3>
        {MEAL_ORDER.map(meal => {
          const entries = log?.meals[meal] || [];
          const mealTotals = sumNutrition(entries);
          return (
            <div key={meal} className="bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white capitalize">{meal}</h4>
                <span className="text-emerald-400 font-semibold text-sm">{Math.round(mealTotals.calories)} cal</span>
              </div>
              {entries.slice(0, 2).map(entry => (
                <div key={entry.id} className="text-xs text-gray-400 py-0.5 truncate">
                  {entry.food.name} ({entry.servings}x)
                </div>
              ))}
              {entries.length > 2 && (
                <div className="text-xs text-gray-500">+{entries.length - 2} more</div>
              )}
              <button
                onClick={() => navigate(`/log?meal=${meal}`)}
                className="mt-3 w-full py-2 border border-dashed border-gray-600 rounded-xl text-emerald-400 text-sm hover:border-emerald-600 transition-colors"
              >
                + Add Food
              </button>
            </div>
          );
        })}
      </div>

      {/* Micronutrients */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Micronutrients (% DV)</h3>
        <div className="grid grid-cols-2 gap-2">
          {microItems.map(item => {
            const pct = Math.round((item.value / item.dv) * 100);
            return (
              <div key={item.label} className="bg-gray-900 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="text-white font-semibold text-sm">{pct}%</div>
                <div className="text-xs text-gray-600">{Math.round(item.value * 10) / 10}{item.unit}</div>
                <div className="mt-1.5 bg-gray-700 rounded-full h-1">
                  <div
                    className="h-1 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
