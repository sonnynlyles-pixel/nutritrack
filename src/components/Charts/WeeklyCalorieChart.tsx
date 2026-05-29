import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import type { DailyLog } from '../../types';

interface Props {
  logs: DailyLog[];
  calorieGoal: number;
}

export default function WeeklyCalorieChart({ logs, calorieGoal }: Props) {
  const today = new Date();
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = logs.find(l => l.date === dateStr);
    const calories = log
      ? Object.values(log.meals).flat().reduce((sum, e) => sum + e.food.nutrition.calories * e.servings, 0)
      : 0;
    return {
      day: format(date, 'EEE'),
      date: dateStr,
      calories: Math.round(calories),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(57,255,122,0.18)" />
        <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#FFFFFF', border: '1px solid rgba(57,255,122,0.4)', borderRadius: 8, boxShadow: '0 0 14px rgba(57,255,122,0.12)' }}
          labelStyle={{ color: '#0F172A' }}
          formatter={(value: number) => [`${value} cal`, 'Calories']}
        />
        <ReferenceLine
          y={calorieGoal}
          stroke="#10b981"
          strokeDasharray="6 3"
          label={{ value: 'Goal', fill: '#10b981', fontSize: 11, position: 'insideTopRight' }}
        />
        <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.date}
              fill={entry.calories === 0 ? '#E5E7EB' : entry.calories <= calorieGoal ? '#10b981' : '#ef4444'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
