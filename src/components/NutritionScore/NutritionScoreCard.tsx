import { useState, useEffect } from 'react';
import { subDays, format } from 'date-fns';
import { db } from '../../db/database';
import { getPeriodScore, scoreColor, scoreGradient } from '../../utils/dayScore';
import type { PeriodScore } from '../../utils/dayScore';
import type { UserProfile } from '../../types';
import type { DailyLog } from '../../types';

type Period = '7' | '30' | '365';

const PERIOD_LABELS: Record<Period, string> = {
  '7':   'Week',
  '30':  'Month',
  '365': 'Year',
};

const TIPS: Record<string, string> = {
  'Calorie Goal':    'Try pre-logging meals the night before so you can plan your day.',
  'Protein':         'Add a protein source (eggs, Greek yogurt, chicken) to every meal.',
  'Sodium':          'Choose low-sodium options and rinse canned foods before eating.',
  'Fiber':           'Swap refined carbs for whole grains, beans, or veggies.',
  'Sugar':           'Replace sugary drinks with water or zero-sugar alternatives.',
  'Saturated Fat':   'Choose lean meats and swap butter for olive oil when cooking.',
  'Meal Balance':    'Try to log at least 3 meals per day for better tracking accuracy.',
  'Caffeine':        'Limit caffeine to before 2pm to protect sleep quality.',
};

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(score, 100) / 100);
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#eab308' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg width="144" height="144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} fill="none" stroke="#1A1A27" strokeWidth="11" />
        <circle
          cx="72" cy="72" r={r}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold leading-none ${scoreColor(score)}`}>{score}</span>
        <span className="text-xs text-gray-500 mt-1">out of 100</span>
      </div>
    </div>
  );
}

export default function NutritionScoreCard({ profile }: { profile: UserProfile }) {
  const [period, setPeriod] = useState<Period>('7');
  const [score, setScore] = useState<PeriodScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const days = parseInt(period);
    const start = format(subDays(new Date(), days - 1), 'yyyy-MM-dd');
    db.dailyLogs
      .where('date').aboveOrEqual(start)
      .toArray()
      .then((logs: DailyLog[]) => {
        setScore(getPeriodScore(logs, profile, days));
        setLoading(false);
      });
  }, [period, profile]);

  return (
    <div className="card p-4 space-y-4">
      {/* Header + period tabs */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Nutrition Score</h3>
        <div className="flex bg-surface-raised rounded-xl overflow-hidden">
          {(Object.entries(PERIOD_LABELS) as [Period, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                period === key
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !score || score.daysLogged === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No logged days in this period yet.
        </div>
      ) : (
        <>
          {/* Score ring */}
          <div className="space-y-1">
            <ScoreRing score={score.avg} />
            <p className="text-center text-xs text-gray-500">
              Based on {score.daysLogged} of {score.daysTotal} days logged
            </p>
          </div>

          {/* Grade label */}
          <div className={`text-center text-sm font-semibold ${scoreColor(score.avg)}`}>
            {score.avg >= 90 ? '🏆 Excellent' :
             score.avg >= 80 ? '⭐ Great' :
             score.avg >= 70 ? '👍 Good' :
             score.avg >= 60 ? '📈 Decent' :
             score.avg >= 40 ? '⚠️ Needs Work' :
                               '🔴 Poor'}
          </div>

          {/* Category bars */}
          <div className="space-y-2.5">
            {score.categories.map(cat => (
              <div key={cat.key}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-gray-400">{cat.label}</span>
                  <span className={`text-xs font-semibold ${scoreColor(cat.pct)}`}>{cat.pct}%</span>
                </div>
                <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${scoreGradient(cat.pct)}`}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Strengths */}
          {score.strengths.length > 0 && (
            <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-xl p-3 space-y-1">
              <p className="text-xs font-semibold text-emerald-400 mb-1.5">✓ Doing well</p>
              {score.strengths.map(s => (
                <p key={s} className="text-xs text-gray-300">· {s}</p>
              ))}
            </div>
          )}

          {/* Improvements */}
          {score.improvements.length > 0 && (
            <div className="bg-orange-900/20 border border-orange-800/40 rounded-xl p-3 space-y-2">
              <p className="text-xs font-semibold text-orange-400 mb-1.5">↑ Room to improve</p>
              {score.improvements.map(s => (
                <div key={s}>
                  <p className="text-xs text-gray-300 font-medium">· {s}</p>
                  {TIPS[s] && (
                    <p className="text-xs text-gray-500 ml-2 mt-0.5">{TIPS[s]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
