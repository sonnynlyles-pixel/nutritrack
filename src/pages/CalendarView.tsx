import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, isSameMonth, isSameDay, parseISO
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { db } from '../db/database';
import { useStore } from '../store/useStore';
import { getDayScore, scoreColor, scoreBg } from '../utils/dayScore';
import type { DailyLog } from '../types';

function getDayCalories(log: DailyLog): number {
  return Object.values(log.meals).flat()
    .reduce((sum, e) => sum + e.food.nutrition.calories * e.servings, 0);
}

export default function CalendarView() {
  const navigate = useNavigate();
  const { profile, selectedDate, setSelectedDate } = useStore();
  const [viewDate, setViewDate] = useState(new Date());
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});
  const [showScoreSheet, setShowScoreSheet] = useState(false);

  useEffect(() => {
    const start = format(startOfWeek(startOfMonth(viewDate)), 'yyyy-MM-dd');
    const end   = format(endOfWeek(endOfMonth(viewDate)),   'yyyy-MM-dd');
    db.dailyLogs.where('date').between(start, end, true, true).toArray().then(entries => {
      const map: Record<string, DailyLog> = {};
      entries.forEach(e => { map[e.date] = e; });
      setLogs(map);
    });
  }, [viewDate]);

  const today     = new Date();
  const days: Date[] = [];
  let cur = startOfWeek(startOfMonth(viewDate));
  const calEnd = endOfWeek(endOfMonth(viewDate));
  while (cur <= calEnd) { days.push(cur); cur = addDays(cur, 1); }

  const selectDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(dateStr);
    const log = logs[dateStr];
    if (log && Object.values(log.meals).flat().length > 0) {
      setShowScoreSheet(true);
    } else {
      navigate(`/log?date=${dateStr}`);
    }
  };

  // Selected day score
  const selectedLog = logs[selectedDate];
  const scoreBreakdown = selectedLog ? getDayScore(selectedLog, profile) : null;

  // Weekly summary
  const selDate   = parseISO(selectedDate);
  const weekStart = startOfWeek(selDate, { weekStartsOn: 1 });
  const weekDays  = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekCalories = weekDays.map(d => {
    const log = logs[format(d, 'yyyy-MM-dd')];
    return log ? Math.round(getDayCalories(log)) : 0;
  });
  const loggedDays = weekCalories.filter(c => c > 0);
  const avgCal = loggedDays.length > 0
    ? Math.round(loggedDays.reduce((a, b) => a + b, 0) / loggedDays.length)
    : 0;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4 pb-24">
      {/* Month header */}
      <div className="flex items-center justify-between py-2">
        <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 rounded-full hover:bg-gray-800">
          <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
        </button>
        <h2 className="text-lg font-bold text-white">{format(viewDate, 'MMMM yyyy')}</h2>
        <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 rounded-full hover:bg-gray-800">
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dateStr      = format(day, 'yyyy-MM-dd');
          const isCurrentMo  = isSameMonth(day, viewDate);
          const isToday      = isSameDay(day, today);
          const isSelected   = dateStr === selectedDate;
          const log          = logs[dateStr];
          const score        = log ? getDayScore(log, profile) : null;

          return (
            <button
              key={dateStr}
              onClick={() => selectDay(day)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-colors
                ${!isCurrentMo ? 'opacity-30' : ''}
                ${isSelected ? 'bg-emerald-700' : isToday ? 'ring-2 ring-emerald-500 bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'}
              `}
            >
              <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                {format(day, 'd')}
              </span>
              {score ? (
                <span className={`text-xs font-bold leading-none mt-0.5 ${isSelected ? 'text-white' : scoreColor(score.total)}`}>
                  {score.total}
                </span>
              ) : log && getDayCalories(log) > 0 ? (
                <span className="text-xs text-gray-500 leading-none mt-0.5">
                  {Math.round(getDayCalories(log) / 1000 * 10) / 10}k
                </span>
              ) : null}
              {/* Score bar at bottom of cell */}
              {score && (
                <div className="absolute bottom-1 left-1.5 right-1.5 h-0.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBg(score.total)}`}
                    style={{ width: `${score.total}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Score sheet for selected day */}
      {showScoreSheet && scoreBreakdown && (
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {format(parseISO(selectedDate), 'EEEE, MMM d')}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`text-4xl font-bold ${scoreColor(scoreBreakdown.total)}`}>
                  {scoreBreakdown.total}
                </span>
                <span className="text-gray-500 text-sm">/ 100</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/log?date=${selectedDate}`)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300"
              >
                <ClipboardDocumentListIcon className="w-4 h-4" />
                View Log
              </button>
              <button
                onClick={() => setShowScoreSheet(false)}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${scoreBg(scoreBreakdown.total)}`}
              style={{ width: `${scoreBreakdown.total}%` }}
            />
          </div>

          {/* Breakdown rows */}
          <div className="space-y-2">
            {([
              scoreBreakdown.calories,
              scoreBreakdown.protein,
              scoreBreakdown.sodium,
              scoreBreakdown.fiber,
              scoreBreakdown.sugar,
              scoreBreakdown.satFat,
              scoreBreakdown.mealBalance,
            ] as const).map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-28 text-xs text-gray-400 shrink-0">{item.label}</div>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBg(Math.round((item.points / item.max) * 100))}`}
                    style={{ width: `${Math.round((item.points / item.max) * 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 w-10 text-right shrink-0">
                  {item.points}/{item.max}
                </div>
                <div className="text-xs text-gray-500 w-40 truncate shrink-0 hidden sm:block">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly summary */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Week Summary</h3>
          {avgCal > 0 && (
            <span className="text-xs text-gray-400">avg {avgCal.toLocaleString()} cal/day</span>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d, i) => {
            const dateStr = format(d, 'yyyy-MM-dd');
            const log     = logs[dateStr];
            const score   = log ? getDayScore(log, profile) : null;
            const cal     = weekCalories[i];
            return (
              <div key={dateStr} className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{format(d, 'EEE')[0]}</span>
                <div className="w-full h-12 bg-gray-700 rounded-lg overflow-hidden flex flex-col justify-end">
                  {cal > 0 && (
                    <div
                      className={`w-full rounded-lg ${score ? scoreBg(score.total) : 'bg-emerald-500'}`}
                      style={{ height: `${Math.min(100, Math.round((cal / profile.calorieGoal) * 100))}%` }}
                    />
                  )}
                </div>
                <span className={`text-xs font-semibold ${score ? scoreColor(score.total) : 'text-gray-600'}`}>
                  {score ? score.total : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
