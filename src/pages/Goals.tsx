import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { calculateCalorieGoal, calculateDefaultMacros, calculateTDEE } from '../utils/nutrition';
import { db } from '../db/database';
import type { UserProfile } from '../types';

const ACTIVITY_OPTIONS: { value: UserProfile['activityLevel']; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little/no exercise' },
  { value: 'lightly', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 'moderately', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 'very', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
  { value: 'extra', label: 'Extra Active', desc: '2x/day or physical job' },
];

export default function Goals() {
  const { profile, setProfile, usdaApiKey, setUsdaApiKey } = useStore();
  const [draft, setDraft] = useState<UserProfile>({ ...profile });
  const [draftUsdaKey, setDraftUsdaKey] = useState(usdaApiKey === 'DEMO_KEY' ? '' : usdaApiKey);
  const [overrideCalories, setOverrideCalories] = useState(false);
  const [manualMacros, setManualMacros] = useState(false);
  const [saved, setSaved] = useState(false);
  const [backupMsg, setBackupMsg] = useState('');
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const [dailyLogs, weightEntries, quickMeals, recipes, customFoods] = await Promise.all([
      db.dailyLogs.toArray(),
      db.weightEntries.toArray(),
      db.quickMeals.toArray(),
      db.recipes.toArray(),
      db.customFoods.filter(f => !f.id.startsWith('seed-')).toArray(),
    ]);
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      store: localStorage.getItem('nutritrack-store'),
      dailyLogs,
      weightEntries,
      quickMeals,
      recipes,
      customFoods,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutritrack-backup-${new Date().toLocaleDateString('en-CA')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const backup = JSON.parse(ev.target?.result as string);
        if (backup.store) localStorage.setItem('nutritrack-store', backup.store);
        if (backup.dailyLogs?.length)   await db.dailyLogs.bulkPut(backup.dailyLogs);
        if (backup.weightEntries?.length) await db.weightEntries.bulkPut(backup.weightEntries);
        if (backup.quickMeals?.length)  await db.quickMeals.bulkPut(backup.quickMeals);
        if (backup.recipes?.length)     await db.recipes.bulkPut(backup.recipes);
        if (backup.customFoods?.length) await db.customFoods.bulkPut(backup.customFoods);
        setBackupMsg('Restored! Reloading...');
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        setBackupMsg('Import failed — make sure you chose a NutriTrack backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const update = (patch: Partial<UserProfile>) => setDraft(d => ({ ...d, ...patch }));

  const tdee = Math.round(calculateTDEE(draft));
  const autoCals = calculateCalorieGoal(draft);
  const autoMacros = calculateDefaultMacros(overrideCalories ? draft.calorieGoal : autoCals);

  useEffect(() => {
    if (!overrideCalories) {
      update({ calorieGoal: autoCals });
    }
  }, [autoCals, overrideCalories]);

  useEffect(() => {
    if (!manualMacros) {
      update({ macroTargets: autoMacros });
    }
  }, [autoMacros, manualMacros]);

  const macroCals = draft.macroTargets.protein * 4 + draft.macroTargets.carbs * 4 + draft.macroTargets.fat * 9;

  const handleSave = () => {
    setProfile(draft);
    setUsdaApiKey(draftUsdaKey.trim() || 'DEMO_KEY');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 pb-24">
      <h1 className="text-xl font-bold text-white pt-2">Settings & Goals</h1>

      {/* Profile */}
      <section className="card p-4 space-y-3">
        <h2 className="font-semibold text-white">Profile</h2>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Name</label>
          <input
            className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            value={draft.name}
            onChange={e => update({ name: e.target.value })}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Age</label>
            <input
              type="number"
              className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
              value={draft.age}
              onFocus={e => e.target.select()}
              onChange={e => update({ age: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Gender</label>
            <select
              className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
              value={draft.gender}
              onChange={e => update({ gender: e.target.value as 'male' | 'female' })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Height</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500 pr-8"
                value={draft.heightFt}
                onFocus={e => e.target.select()}
                onChange={e => update({ heightFt: parseInt(e.target.value) || 0 })}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">ft</span>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500 pr-8"
                value={draft.heightIn}
                onFocus={e => e.target.select()}
                onChange={e => update({ heightIn: parseInt(e.target.value) || 0 })}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">in</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Current Weight (lbs)</label>
            <input
              type="number"
              className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
              value={draft.currentWeight}
              onFocus={e => e.target.select()}
              onChange={e => update({ currentWeight: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Goal Weight (lbs)</label>
            <input
              type="number"
              className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
              value={draft.goalWeight}
              onFocus={e => e.target.select()}
              onChange={e => update({ goalWeight: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </section>

      {/* Activity Level */}
      <section className="card p-4 space-y-2">
        <h2 className="font-semibold text-white mb-3">Activity Level</h2>
        {ACTIVITY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => update({ activityLevel: opt.value })}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${draft.activityLevel === opt.value ? 'bg-emerald-900 border-emerald-500' : 'bg-gray-700 border-white/[0.06]'}`}
          >
            <div className="font-medium text-white text-sm">{opt.label}</div>
            <div className="text-xs text-gray-400">{opt.desc}</div>
          </button>
        ))}
      </section>

      {/* Weight Goal */}
      <section className="card p-4 space-y-4">
        <h2 className="font-semibold text-white">Weight Goal</h2>
        <div className="flex gap-2">
          {(['lose', 'maintain', 'gain'] as const).map(g => (
            <button
              key={g}
              onClick={() => update({ weightGoal: g })}
              className={`flex-1 py-2.5 rounded-xl border capitalize text-sm font-medium transition-colors ${draft.weightGoal === g ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-700 border-white/[0.06] text-gray-300'}`}
            >
              {g}
            </button>
          ))}
        </div>
        {draft.weightGoal !== 'maintain' && (
          <div>
            <label className="text-xs text-gray-400 block mb-2">Rate: {draft.goalRateLbs} lbs/week</label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.5}
              value={draft.goalRateLbs}
              onChange={e => update({ goalRateLbs: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5 lbs</span>
              <span>1 lb</span>
              <span>1.5 lbs</span>
              <span>2 lbs</span>
            </div>
          </div>
        )}
      </section>

      {/* Calorie Goal */}
      <section className="card p-4 space-y-3">
        <h2 className="font-semibold text-white">Calorie Goal</h2>
        <div className="flex items-center justify-between bg-surface-raised rounded-xl p-3">
          <span className="text-sm text-gray-400">TDEE (maintenance)</span>
          <span className="text-white font-semibold">{tdee} cal</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Override auto-calculation</span>
          <button
            onClick={() => setOverrideCalories(v => !v)}
            className={`w-12 h-6 rounded-full transition-colors relative ${overrideCalories ? 'bg-emerald-600' : 'bg-gray-600'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${overrideCalories ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
        {overrideCalories ? (
          <div>
            <label className="text-xs text-gray-400 block mb-1">Custom Calorie Goal</label>
            <input
              type="number"
              className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
              value={draft.calorieGoal}
              onFocus={e => e.target.select()}
              onChange={e => update({ calorieGoal: parseInt(e.target.value) || 0 })}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between bg-emerald-900/30 border border-emerald-800 rounded-xl p-3">
            <span className="text-sm text-gray-300">Daily Goal</span>
            <span className="text-emerald-400 font-bold text-lg">{autoCals} cal</span>
          </div>
        )}
      </section>

      {/* Macro Targets */}
      <section className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Macro Targets</h2>
          <button
            onClick={() => setManualMacros(v => !v)}
            className={`w-12 h-6 rounded-full transition-colors relative ${manualMacros ? 'bg-emerald-600' : 'bg-gray-600'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${manualMacros ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="text-xs text-gray-500">{manualMacros ? 'Manual mode' : 'Auto-calculated from calorie goal'}</div>

        {(['protein', 'carbs', 'fat'] as const).map(macro => {
          const colors = { protein: 'text-blue-400', carbs: 'text-amber-400', fat: 'text-rose-400' };
          const cals = macro === 'fat'
            ? draft.macroTargets[macro] * 9
            : draft.macroTargets[macro] * 4;
          const pct = Math.round((cals / (draft.calorieGoal || 1)) * 100);
          return (
            <div key={macro}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium capitalize ${colors[macro]}`}>{macro}</span>
                <span className="text-xs text-gray-400">{draft.macroTargets[macro]}g · {pct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={macro === 'fat' ? 200 : 500}
                step={5}
                value={draft.macroTargets[macro]}
                disabled={!manualMacros}
                onChange={e => update({ macroTargets: { ...draft.macroTargets, [macro]: parseInt(e.target.value) } })}
                className={`w-full ${macro === 'protein' ? 'accent-blue-400' : macro === 'carbs' ? 'accent-amber-400' : 'accent-rose-400'}`}
              />
            </div>
          );
        })}

        <div className={`flex items-center justify-between text-sm rounded-xl p-2 ${macroCals > draft.calorieGoal * 1.1 ? 'bg-red-900/30 border border-red-800' : 'bg-gray-900'}`}>
          <span className="text-gray-400">Macro calories total</span>
          <span className={macroCals > draft.calorieGoal * 1.1 ? 'text-red-400' : 'text-white'}>
            {Math.round(macroCals)} / {draft.calorieGoal} cal
          </span>
        </div>
      </section>

      {/* Water Goal */}
      <section className="card p-4 space-y-3">
        <h2 className="font-semibold text-white">Water Goal</h2>
        <div className="flex items-center gap-3">
          <input
            type="number"
            className="flex-1 bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
            value={draft.waterGoalOz}
            onFocus={e => e.target.select()}
            onChange={e => update({ waterGoalOz: parseInt(e.target.value) || 0 })}
          />
          <span className="text-gray-400">oz/day</span>
        </div>
      </section>

      {/* API Keys */}
      <section className="card p-4 space-y-3">
        <h2 className="font-semibold text-white">Food Database API Key</h2>
        <p className="text-xs text-gray-400">
          A free USDA API key gives you unlimited food searches. Without one, searches may be rate-limited.{' '}
          <a href="https://api.data.gov/signup/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">
            Get your free key at api.data.gov/signup
          </a>
        </p>
        <div>
          <label className="text-xs text-gray-400 block mb-1">USDA FoodData Central API Key</label>
          <input
            type="text"
            placeholder="Paste your API key here..."
            className="w-full bg-surface-raised border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-brand-500"
            value={draftUsdaKey}
            onChange={e => setDraftUsdaKey(e.target.value)}
          />
          {usdaApiKey === 'DEMO_KEY' && (
            <p className="text-xs text-yellow-500 mt-1">⚠ Using shared DEMO_KEY — add your own key to avoid rate limits</p>
          )}
          {usdaApiKey !== 'DEMO_KEY' && (
            <p className="text-xs text-emerald-400 mt-1">✓ Personal API key active</p>
          )}
        </div>
      </section>

      {/* Data Backup */}
      <section className="card p-4 space-y-3">
        <h2 className="font-semibold text-white">Data Backup</h2>
        <p className="text-xs text-gray-400">
          Export your logs, weight history, and settings to a file. Use Import to restore after reinstalling the app.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Export Backup
          </button>
          <button
            onClick={() => importRef.current?.click()}
            className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors"
          >
            Import Backup
          </button>
        </div>
        <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        {backupMsg && (
          <p className={`text-xs ${backupMsg.includes('failed') ? 'text-red-400' : 'text-emerald-400'}`}>
            {backupMsg}
          </p>
        )}
      </section>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors ${saved ? 'bg-emerald-700 text-emerald-200' : 'bg-brand-gradient text-white'}`}
      >
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
