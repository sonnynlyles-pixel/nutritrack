import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { calculateCalorieGoal, calculateDefaultMacros, calculateTDEE } from '../../utils/nutrition';
import type { UserProfile } from '../../types';

const ACTIVITY_OPTIONS: { value: UserProfile['activityLevel']; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise, desk job' },
  { value: 'lightly', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 'moderately', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 'very', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
  { value: 'extra', label: 'Extra Active', desc: 'Very hard exercise, physical job or 2x training' },
];

const GOAL_RATES = [0.5, 1, 1.5, 2];

export default function OnboardingWizard() {
  const { profile, setProfile } = useStore();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<UserProfile>({ ...profile });

  const update = (patch: Partial<UserProfile>) => setDraft(d => ({ ...d, ...patch }));

  const totalSteps = 6;

  const handleFinish = () => {
    const calorieGoal = calculateCalorieGoal(draft);
    const macroTargets = calculateDefaultMacros(calorieGoal);
    setProfile({ ...draft, calorieGoal, macroTargets, setupComplete: true });
  };

  const canNext = () => {
    if (step === 0) return draft.name.trim().length > 0;
    if (step === 1) return draft.age > 0 && draft.currentWeight > 0 && draft.goalWeight > 0;
    return true;
  };

  const tdee = Math.round(calculateTDEE(draft));
  const calorieGoal = calculateCalorieGoal(draft);
  const macros = calculateDefaultMacros(calorieGoal);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-emerald-400' : i < step ? 'bg-emerald-700' : 'bg-gray-700'}`}
            />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🥗</div>
            <h1 className="text-3xl font-bold text-white">Welcome to NutriTrack</h1>
            <p className="text-gray-400">Your personal calorie and nutrition tracker. Let's get you set up in under a minute.</p>
            <div>
              <label className="block text-sm text-gray-400 mb-2 text-left">What's your name?</label>
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-emerald-500"
                placeholder="Enter your name"
                value={draft.name}
                onChange={e => update({ name: e.target.value })}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Personal Info</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Age</label>
              <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                value={draft.age}
                onChange={e => update({ age: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gender</label>
              <div className="flex gap-3">
                {(['male', 'female'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => update({ gender: g })}
                    className={`flex-1 py-3 rounded-xl border capitalize font-medium transition-colors ${draft.gender === g ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Height</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    value={draft.heightFt}
                    onChange={e => update({ heightFt: parseInt(e.target.value) || 0 })}
                  />
                  <span className="text-xs text-gray-500 ml-1">ft</span>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    value={draft.heightIn}
                    onChange={e => update({ heightIn: parseInt(e.target.value) || 0 })}
                  />
                  <span className="text-xs text-gray-500 ml-1">in</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Current Weight (lbs)</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  value={draft.currentWeight}
                  onChange={e => update({ currentWeight: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Goal Weight (lbs)</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  value={draft.goalWeight}
                  onChange={e => update({ goalWeight: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Activity Level */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Activity Level</h2>
            {ACTIVITY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => update({ activityLevel: opt.value })}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${draft.activityLevel === opt.value ? 'bg-emerald-900 border-emerald-500' : 'bg-gray-800 border-gray-700'}`}
              >
                <div className="font-medium text-white">{opt.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Weight Goal */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Weight Goal</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-2">What's your goal?</label>
              <div className="flex gap-2">
                {(['lose', 'maintain', 'gain'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => update({ weightGoal: g })}
                    className={`flex-1 py-3 rounded-xl border capitalize font-medium transition-colors ${draft.weightGoal === g ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            {draft.weightGoal !== 'maintain' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Rate: {draft.goalRateLbs} lbs/week
                </label>
                <div className="flex gap-2">
                  {GOAL_RATES.map(r => (
                    <button
                      key={r}
                      onClick={() => update({ goalRateLbs: r })}
                      className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${draft.goalRateLbs === r ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {draft.goalRateLbs <= 1 ? 'Sustainable and recommended' : draft.goalRateLbs <= 1.5 ? 'Moderate pace' : 'Aggressive — may be difficult to sustain'}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Water Goal (oz/day)</label>
              <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                value={draft.waterGoalOz}
                onChange={e => update({ waterGoalOz: parseInt(e.target.value) || 64 })}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-2">Your Plan</h2>
            <p className="text-gray-400 text-sm mb-6">Based on your info, here's your personalized plan:</p>
            <div className="bg-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">TDEE (maintenance)</span>
                <span className="text-white font-semibold">{tdee} cal</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <span className="text-gray-400">Daily Calorie Goal</span>
                <span className="text-emerald-400 font-bold text-xl">{calorieGoal} cal</span>
              </div>
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="text-sm text-gray-400 mb-2">Macro Targets</div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Protein</span>
                  <span className="text-white">{macros.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-400">Carbs</span>
                  <span className="text-white">{macros.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-400">Fat</span>
                  <span className="text-white">{macros.fat}g</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              You can customize these goals anytime in Settings.
            </p>
          </div>
        )}

        {/* Step 5: Done */}
        {step === 5 && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-white">You're all set, {draft.name}!</h2>
            <p className="text-gray-400">Start logging your meals and tracking your progress toward your goal.</p>
            <div className="bg-gray-800 rounded-2xl p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Daily Goal</span>
                <span className="text-emerald-400 font-semibold">{calorieGoal} cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Goal</span>
                <span className="text-white capitalize">{draft.weightGoal} weight</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Target</span>
                <span className="text-white">{draft.goalWeight} lbs</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-4 rounded-2xl bg-gray-800 text-gray-300 font-semibold"
            >
              Back
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className={`flex-1 py-4 rounded-2xl font-semibold transition-colors ${canNext() ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            >
              Start Tracking!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
