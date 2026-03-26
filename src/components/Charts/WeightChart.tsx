import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Dot
} from 'recharts';
import type { WeightEntry } from '../../types';
import { format, parseISO } from 'date-fns';

interface Props {
  entries: WeightEntry[];
  goalWeight: number;
}

export default function WeightChart({ entries, goalWeight }: Props) {
  const data = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e => ({
      date: e.date,
      label: format(parseISO(e.date), 'MMM d'),
      weight: e.weightLbs,
    }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        No weight entries yet
      </div>
    );
  }

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights, goalWeight) - 5;
  const maxW = Math.max(...weights, goalWeight) + 5;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 11 }} />
        <YAxis domain={[minW, maxW]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
          labelStyle={{ color: '#f9fafb' }}
          formatter={(value: number) => [`${value} lbs`, 'Weight']}
        />
        <ReferenceLine
          y={goalWeight}
          stroke="#10b981"
          strokeDasharray="6 3"
          label={{ value: `Goal: ${goalWeight}lbs`, fill: '#10b981', fontSize: 11, position: 'insideTopRight' }}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={<Dot r={4} fill="#60a5fa" />}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
