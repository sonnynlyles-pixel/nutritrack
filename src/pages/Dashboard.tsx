import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { useDailyLog } from '../hooks/useDailyLog';
import { useStreak } from '../hooks/useStreak';
import { sumNutrition, DV } from '../utils/nutrition';
import MealRecommendations from '../components/Recommendations/MealRecommendations';
import type { MealCategory } from '../types';

const MEAL_ORDER: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
const MEAL_EMOJI: Record<MealCategory, string> = {
  breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎',
};

function CalorieRing({ consumed, goal }: { consumed: number; goal: number }) {
  const r = 68;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(consumed / goal, 1);
  const offset = circumference * (1 - pct);
  const isOver = consumed > goal * 1.05;
  const isWarning = !isOver && consumed > goal * 0.9;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-700"
          style={{
            background: isOver
              ? 'radial-gradient(circle, #ef4444, transparent)'
              : 'radial-gradient(circle, #6366F1, transparent)',
          }}
        />
        <svg width="180" height="180" className="-rotate-90 relative">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isOver ? '#ef4444' : '#6366F1'} />
              <stop offset="100%" stopColor={isOver ? '#f97316' : '#8B5CF6'} />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx="90" cy="90" r={r} fill="none" stroke="#1A1A27" strokeWidth="13" />
          {/* Progress */}
          <circle
            cx="90" cy="90" r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-white leading-none">{Math.round(consumed)}</div>
          <div className="text-xs text-gray-500 mt-1">of {goal} cal</div>
        </div>
      </div>
      {/* Below ring */}
      <div className="mt-3 text-center">
        <span className={`text-sm font-semibold ${isOver ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-brand-400'}`}>
          {isOver
            ? `${Math.round(consumed - goal)} cal over`
            : `${Math.round(goal - consumed)} cal remaining`}
        </span>
      </div>
    </div>
  );
}

const MACRO_STYLES = {
  protein: { label: 'Protein', from: 'from-blue-500',  to: 'to-indigo-400',  text: 'text-blue-400' },
  carbs:   { label: 'Carbs',   from: 'from-amber-400', to: 'to-orange-400',  text: 'text-amber-400' },
  fat:     { label: 'Fat',     from: 'from-rose-500',  to: 'to-pink-400',    text: 'text-rose-400' },
} as const;

function MacroBar({ type, consumed, goal }: { type: keyof typeof MACRO_STYLES; consumed: number; goal: number }) {
  const { label, from, to, text } = MACRO_STYLES[type];
  const pct = Math.min((consumed / goal) * 100, 100);
  const isOver = consumed > goal;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs">
          <span className={`font-bold ${text}`}>{Math.round(consumed)}g</span>
          <span className="text-gray-600"> / {goal}g</span>
        </span>
      </div>
      <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${isOver ? 'from-red-500 to-orange-400' : `${from} ${to}`} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { profile, selectedDate } = useStore();
  const { log, loading, addEntry, updateWater } = useDailyLog(selectedDate);
  const streak = useStreak();
  const navigate = useNavigate();
  const [_addingMeal] = useState<MealCategory | null>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const allEntries = log ? Object.values(log.meals).flat() : [];
  const totals = sumNutrition(allEntries);

  const remaining = {
    calories: profile.calorieGoal          - totals.calories,
    protein:  profile.macroTargets.protein - totals.protein,
    carbs:    profile.macroTargets.carbs   - totals.carbs,
    fat:      profile.macroTargets.fat     - totals.fat,
  };

  const dateLabel = format(new Date(selectedDate + 'T12:00:00'), 'EEEE, MMMM d');

  const microItems = [
    { label: 'Vitamin A',   value: totals.vitaminA,   dv: DV.vitaminA,   unit: 'mcg' },
    { label: 'Vitamin C',   value: totals.vitaminC,   dv: DV.vitaminC,   unit: 'mg' },
    { label: 'Vitamin D',   value: totals.vitaminD,   dv: DV.vitaminD,   unit: 'mcg' },
    { label: 'Vitamin B12', value: totals.vitaminB12, dv: DV.vitaminB12, unit: 'mcg' },
    { label: 'Iron',        value: totals.iron,       dv: DV.iron,       unit: 'mg' },
    { label: 'Calcium',     value: totals.calcium,    dv: DV.calcium,    unit: 'mg' },
    { label: 'Potassium',   value: totals.potassium,  dv: DV.potassium,  unit: 'mg' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between pt-3">
        <div>
          <h1 className="text-xl font-bold text-white">{greeting}, {profile.name}!</h1>
          <p className="text-sm text-gray-500 mt-0.5">{dateLabel}</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1.5">
            <span className="text-base">🔥</span>
            <span className="text-orange-400 font-bold text-sm">{streak}</span>
          </div>
        )}
      </div>

      {/* Calorie Ring */}
      <div className="card p-6 flex justify-center">
        <CalorieRing consumed={totals.calories} goal={profile.calorieGoal} />
      </div>

      {/* Macro Bars */}
      <div className="card p-4 space-y-4">
        <p className="section-label">Macros</p>
        <MacroBar type="protein" consumed={totals.protein} goal={profile.macroTargets.protein} />
        <MacroBar type="carbs"   consumed={totals.carbs}   goal={profile.macroTargets.carbs} />
        <MacroBar type="fat"     consumed={totals.fat}     goal={profile.macroTargets.fat} />
      </div>

      {/* Smart Recommendations */}
      <MealRecommendations remaining={remaining} onAdd={addEntry} />

      {/* Water Tracker */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💧</span>
            <div>
              <div className="text-sm font-semibold text-white">
                {log?.waterOz || 0} <span className="text-gray-500 font-normal">/ {profile.waterGoalOz} oz</span>
              </div>
              <div className="text-xs text-gray-600">Water intake</div>
            </div>
          </div>
          <div className="w-28 bg-surface-raised rounded-full h-1.5">
            <div
              className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${Math.min(((log?.waterOz || 0) / profile.waterGoalOz) * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {[8, 16, 24].map(oz => (
            <button
              key={oz}
              onClick={() => updateWater((log?.waterOz || 0) + oz)}
              className="flex-1 py-2 bg-surface-raised hover:bg-surface-high border border-white/[0.06] rounded-xl text-sm text-gray-300 transition-colors"
            >
              +{oz} oz
            </button>
          ))}
          <button
            onClick={() => updateWater(Math.max(0, (log?.waterOz || 0) - 8))}
            className="px-3 py-2 bg-surface-raised hover:bg-surface-high border border-white/[0.06] rounded-xl text-sm text-gray-500 transition-colors"
          >
            −
          </button>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="space-y-3">
        <p className="section-label px-1">Meals</p>
        {MEAL_ORDER.map(meal => {
          const entries = log?.meals[meal] || [];
          const mealTotals = sumNutrition(entries);
          return (
            <div key={meal} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{MEAL_EMOJI[meal]}</span>
                  <h4 className="font-semibold text-white capitalize">{meal}</h4>
                  {entries.length > 0 && (
                    <span className="text-xs text-gray-600">({entries.length})</span>
                  )}
                </div>
                <span className="text-sm font-bold text-brand-400">
                  {Math.round(mealTotals.calories)} cal
                </span>
              </div>
              {entries.slice(0, 2).map(entry => (
                <div key={entry.id} className="text-xs text-gray-500 py-0.5 truncate">
                  {entry.food.name} <span className="text-gray-600">({entry.servings}×)</span>
                </div>
              ))}
              {entries.length > 2 && (
                <div className="text-xs text-gray-600 py-0.5">+{entries.length - 2} more</div>
              )}
              <button
                onClick={() => navigate(`/log?meal=${meal}`)}
                className="mt-3 w-full py-2 border border-dashed border-white/[0.1] hover:border-brand-500/50 rounded-xl text-brand-400 text-sm transition-colors"
              >
                + Add Food
              </button>
            </div>
          );
        })}
      </div>

      {/* Micronutrients */}
      <div className="card p-4">
        <p className="section-label mb-4">Micronutrients (% DV)</p>
        <div className="grid grid-cols-2 gap-2">
          {microItems.map(item => {
            const pct = Math.round((item.value / item.dv) * 100);
            const filled = Math.min(pct, 100);
            return (
              <div key={item.label} className="bg-surface-raised rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-white font-bold text-sm">{pct}%</div>
                <div className="text-xs text-gray-600">{Math.round(item.value * 10) / 10}{item.unit}</div>
                <div className="mt-2 bg-surface-high rounded-full h-1">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-brand-500 to-violet-400"
                    style={{ width: `${filled}%` }}
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
