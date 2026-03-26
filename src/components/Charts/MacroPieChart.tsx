import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  protein: number;
  carbs: number;
  fat: number;
}

const COLORS = {
  Protein: '#60a5fa',  // blue-400
  Carbs: '#fbbf24',    // amber-400
  Fat: '#fb7185',      // rose-400
};

export default function MacroPieChart({ protein, carbs, fat }: Props) {
  const data = [
    { name: 'Protein', value: Math.round(protein * 4) },
    { name: 'Carbs', value: Math.round(carbs * 4) },
    { name: 'Fat', value: Math.round(fat * 9) },
  ].filter(d => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
          labelStyle={{ color: '#f9fafb' }}
          formatter={(value: number, name: string) => {
            const grams = name === 'Fat' ? Math.round(value / 9) : Math.round(value / 4);
            return [`${grams}g (${value} cal)`, name];
          }}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
