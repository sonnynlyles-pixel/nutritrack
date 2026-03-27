import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { db } from '../db/database';
import { useStore } from '../store/useStore';
import { useStreak } from '../hooks/useStreak';
import WeightChart from '../components/Charts/WeightChart';
import WeeklyCalorieChart from '../components/Charts/WeeklyCalorieChart';
import MacroPieChart from '../components/Charts/MacroPieChart';
import type { WeightEntry, DailyLog } from '../types';
import { sumNutrition } from '../utils/nutrition';
import { subDays } from 'date-fns';

interface Measurements {
  chest: string;
  waist: string;
  hips: string;
  arms: string;
  thighs: string;
}

export default function Progress() {
  const { profile } = useStore();
  const streak = useStreak();
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [weeklyLogs, setWeeklyLogs] = useState<DailyLog[]>([]);
  const [newWeight, setNewWeight] = useState('');
  const [newWeightDate, setNewWeightDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [newWeightNotes, setNewWeightNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: '', waist: '', hips: '', arms: '', thighs: ''
  });

  useEffect(() => {
    db.weightEntries.orderBy('date').reverse().limit(30).toArray().then(setWeightEntries);
    const today = new Date();
    const start = format(subDays(today, 7), 'yyyy-MM-dd');
    db.dailyLogs.where('date').aboveOrEqual(start).toArray().then(setWeeklyLogs);
  }, []);

  const handleSaveWeight = async () => {
    if (!newWeight) return;
    setSaving(true);
    const entry: WeightEntry = {
      id: `w-${Date.now()}`,
      date: newWeightDate,
      weightLbs: parseFloat(newWeight),
      notes: newWeightNotes || undefined,
    };
    await db.weightEntries.put(entry);
    const updated = await db.weightEntries.orderBy('date').reverse().limit(30).toArray();
    setWeightEntries(updated);
    setNewWeight('');
    setNewWeightNotes('');
    setSaving(false);
  };

  const handleDeleteWeight = async (id: string) => {
    await db.weightEntries.delete(id);
    setWeightEntries(prev => prev.filter(e => e.id !== id));
  };

  const currentWeight = weightEntries[0]?.weightLbs || profile.currentWeight;
  const startWeight = profile.currentWeight;
  const diff = currentWeight - startWeight;
  const remaining = profile.goalWeight - currentWeight;

  // Weekly average macros
  const allWeekEntries = weeklyLogs.flatMap(l => Object.values(l.meals).flat());
  const weekTotals = sumNutrition(allWeekEntries);
  const days = weeklyLogs.length || 1;
  const avgMacros = {
    protein: weekTotals.protein / days,
    carbs: weekTotals.carbs / days,
    fat: weekTotals.fat / days,
  };

  // Last 30 days heatmap
  const today = new Date();
  const heatmapDays = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, 29 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = weeklyLogs.find(l => l.date === dateStr);
    const cal = log ? Object.values(log.meals).flat().reduce((s, e) => s + e.food.nutrition.calories * e.servings, 0) : 0;
    return { dateStr, cal };
  });

  // Weekly table
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = weeklyLogs.find(l => l.date === dateStr);
    const entries = log ? Object.values(log.meals).flat() : [];
    const n = sumNutrition(entries);
    return { label: format(date, 'EEE'), ...n };
  });

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold text-white pt-2">Progress</h1>

      {/* Streak */}
      <div className="card p-4 flex items-center gap-4">
        <div className="text-5xl">🔥</div>
        <div>
          <div className="text-3xl font-bold text-orange-400">{streak}</div>
          <div className="text-sm text-gray-400">day{streak !== 1 ? 's' : ''} logged in a row</div>
        </div>
      </div>

      {/* Weight Stats */}
      <div className="card p-4 grid grid-cols-2 gap-3">
        <div className="bg-surface-raised rounded-xl p-3">
          <div className="text-xs text-gray-500">Current</div>
          <div className="text-xl font-bold text-white">{currentWeight} lbs</div>
        </div>
        <div className="bg-surface-raised rounded-xl p-3">
          <div className="text-xs text-gray-500">Goal</div>
          <div className="text-xl font-bold text-emerald-400">{profile.goalWeight} lbs</div>
        </div>
        <div className="bg-surface-raised rounded-xl p-3">
          <div className="text-xs text-gray-500">Change</div>
          <div className={`text-xl font-bold ${diff < 0 ? 'text-emerald-400' : diff > 0 ? 'text-red-400' : 'text-gray-400'}`}>
            {diff > 0 ? '+' : ''}{diff.toFixed(1)} lbs
          </div>
        </div>
        <div className="bg-surface-raised rounded-xl p-3">
          <div className="text-xs text-gray-500">Remaining</div>
          <div className={`text-xl font-bold ${Math.abs(remaining) < 5 ? 'text-emerald-400' : 'text-white'}`}>
            {Math.abs(remaining).toFixed(1)} lbs
          </div>
        </div>
      </div>

      {/* Log Weight */}
      <div className="card p-4 space-y-3">
        <h3 className="font-semibold text-white">Log Weight</h3>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.1"
            placeholder="Weight (lbs)"
            className="flex-1 bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            value={newWeight}
            onFocus={e => e.target.select()}
            onChange={e => setNewWeight(e.target.value)}
          />
          <input
            type="date"
            className="flex-1 bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            value={newWeightDate}
            onChange={e => setNewWeightDate(e.target.value)}
          />
        </div>
        <input
          placeholder="Notes (optional)"
          className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
          value={newWeightNotes}
          onChange={e => setNewWeightNotes(e.target.value)}
        />
        <button
          onClick={handleSaveWeight}
          disabled={!newWeight || saving}
          className="w-full py-3 bg-brand-gradient disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl font-semibold transition-colors"
        >
          {saving ? 'Saving...' : 'Save Weight'}
        </button>
      </div>

      {/* Weight Chart */}
      <div className="card p-4">
        <h3 className="font-semibold text-white mb-3">Weight Trend</h3>
        <WeightChart entries={weightEntries} goalWeight={profile.goalWeight} />
        {/* Recent entries */}
        <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
          {weightEntries.slice(0, 10).map(e => (
            <div key={e.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{e.date}</span>
              <span className="text-white">{e.weightLbs} lbs</span>
              <button onClick={() => handleDeleteWeight(e.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* 30-day heatmap */}
      <div className="card p-4">
        <h3 className="font-semibold text-white mb-3">30-Day Calorie Compliance</h3>
        <div className="grid grid-cols-10 gap-1">
          {heatmapDays.map(({ dateStr, cal }) => {
            const pct = cal / profile.calorieGoal;
            const color = cal === 0 ? 'bg-gray-700' : pct <= 1.0 ? 'bg-emerald-500' : pct <= 1.1 ? 'bg-yellow-500' : 'bg-red-500';
            return (
              <div
                key={dateStr}
                className={`aspect-square rounded ${color} opacity-80`}
                title={`${dateStr}: ${Math.round(cal)} cal`}
              />
            );
          })}
        </div>
        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded inline-block" /> At/Under goal</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded inline-block" /> Slightly over</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded inline-block" /> Over</span>
        </div>
      </div>

      {/* Weekly Calorie Chart */}
      <div className="card p-4">
        <h3 className="font-semibold text-white mb-3">This Week's Calories</h3>
        <WeeklyCalorieChart logs={weeklyLogs} calorieGoal={profile.calorieGoal} />
      </div>

      {/* Macro Pie */}
      <div className="card p-4">
        <h3 className="font-semibold text-white mb-1">Weekly Macro Avg</h3>
        <MacroPieChart protein={avgMacros.protein} carbs={avgMacros.carbs} fat={avgMacros.fat} />
      </div>

      {/* Weekly Table */}
      <div className="card p-4 overflow-x-auto">
        <h3 className="font-semibold text-white mb-3">Daily Breakdown</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs">
              <th className="text-left py-1">Day</th>
              <th className="text-right py-1">Cal</th>
              <th className="text-right py-1">Pro</th>
              <th className="text-right py-1">Carb</th>
              <th className="text-right py-1">Fat</th>
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day, i) => (
              <tr key={i} className="border-t border-white/[0.07]">
                <td className="py-2 text-gray-300">{day.label}</td>
                <td className={`py-2 text-right font-medium ${day.calories > 0 ? 'text-white' : 'text-gray-600'}`}>
                  {day.calories > 0 ? Math.round(day.calories) : '-'}
                </td>
                <td className="py-2 text-right text-blue-400">{day.protein > 0 ? `${Math.round(day.protein)}g` : '-'}</td>
                <td className="py-2 text-right text-amber-400">{day.carbs > 0 ? `${Math.round(day.carbs)}g` : '-'}</td>
                <td className="py-2 text-right text-rose-400">{day.fat > 0 ? `${Math.round(day.fat)}g` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Body Measurements */}
      <div className="card p-4 space-y-3">
        <h3 className="font-semibold text-white">Body Measurements (inches)</h3>
        {(Object.keys(measurements) as Array<keyof Measurements>).map(key => (
          <div key={key} className="flex items-center gap-3">
            <label className="w-20 text-sm text-gray-400 capitalize">{key}</label>
            <input
              type="number"
              step="0.1"
              placeholder="—"
              className="flex-1 bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500 text-sm"
              value={measurements[key]}
              onChange={e => setMeasurements(prev => ({ ...prev, [key]: e.target.value }))}
            />
            <span className="text-xs text-gray-600">in</span>
          </div>
        ))}
      </div>
    </div>
  );
}
