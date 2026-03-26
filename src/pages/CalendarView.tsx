import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { db } from '../db/database';
import { useStore } from '../store/useStore';
import type { DailyLog } from '../types';

function getDayCalories(log: DailyLog): number {
  return Object.values(log.meals).flat()
    .reduce((sum, e) => sum + e.food.nutrition.calories * e.servings, 0);
}

function getDayMealCount(log: DailyLog): number {
  return Object.values(log.meals).filter(m => m.length > 0).length;
}

export default function CalendarView() {
  const navigate = useNavigate();
  const { profile, selectedDate, setSelectedDate } = useStore();
  const [viewDate, setViewDate] = useState(new Date());
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});

  useEffect(() => {
    const start = format(startOfWeek(startOfMonth(viewDate)), 'yyyy-MM-dd');
    const end = format(endOfWeek(endOfMonth(viewDate)), 'yyyy-MM-dd');
    db.dailyLogs.where('date').between(start, end, true, true).toArray().then(entries => {
      const map: Record<string, DailyLog> = {};
      entries.forEach(e => { map[e.date] = e; });
      setLogs(map);
    });
  }, [viewDate]);

  const today = new Date();
  const monthStart = startOfMonth(viewDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(endOfMonth(viewDate));

  const days: Date[] = [];
  let cur = calStart;
  while (cur <= calEnd) {
    days.push(cur);
    cur = addDays(cur, 1);
  }

  const getDayColor = (dateStr: string) => {
    const log = logs[dateStr];
    if (!log) return '';
    const cal = getDayCalories(log);
    if (cal === 0) return '';
    const pct = cal / profile.calorieGoal;
    if (pct <= 1.0) return 'text-emerald-400';
    if (pct <= 1.1) return 'text-yellow-400';
    return 'text-red-400';
  };

  const selectDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDate(dateStr);
    navigate(`/log?date=${dateStr}`);
  };

  // Weekly summary (Mon-Sun of the selected date's week)
  const selDate = parseISO(selectedDate);
  const weekStart = startOfWeek(selDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekCalories = weekDays.map(d => {
    const log = logs[format(d, 'yyyy-MM-dd')];
    return log ? Math.round(getDayCalories(log)) : 0;
  });
  const avgCal = weekCalories.filter(c => c > 0).length > 0
    ? Math.round(weekCalories.filter(c => c > 0).reduce((a, b) => a + b, 0) / weekCalories.filter(c => c > 0).length)
    : 0;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
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

      {/* Day of week labels */}
      <div className="grid grid-cols-7 text-center mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isToday = isSameDay(day, today);
          const isSelected = dateStr === selectedDate;
          const log = logs[dateStr];
          const mealCount = log ? getDayMealCount(log) : 0;
          const calColor = getDayColor(dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => selectDay(day)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-colors
                ${!isCurrentMonth ? 'opacity-30' : ''}
                ${isSelected ? 'bg-emerald-700' : isToday ? 'ring-2 ring-emerald-500 bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'}
              `}
            >
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                {format(day, 'd')}
              </span>
              {log && getDayCalories(log) > 0 && (
                <span className={`text-xs font-semibold ${calColor}`}>
                  {Math.round(getDayCalories(log) / 1000 * 10) / 10}k
                </span>
              )}
              {mealCount > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: Math.min(mealCount, 4) }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-emerald-500" />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Weekly summary */}
      <div className="bg-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Week Summary</h3>
          {avgCal > 0 && (
            <span className="text-xs text-gray-400">Avg: <span className="text-emerald-400 font-semibold">{avgCal} cal</span></span>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, i) => {
            const cal = weekCalories[i];
            const pct = cal > 0 ? Math.min((cal / profile.calorieGoal) * 100, 100) : 0;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-xs text-gray-500">{format(day, 'EEE')[0]}</div>
                <div className="w-full bg-gray-700 rounded-full h-12 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-sm transition-all ${cal > profile.calorieGoal ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{cal > 0 ? `${Math.round(cal / 100) / 10}k` : '-'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
