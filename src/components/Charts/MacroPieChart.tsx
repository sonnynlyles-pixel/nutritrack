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
          contentStyle={{ background: '#FFFFFF', border: '1px solid rgba(57,255,122,0.4)', borderRadius: 8, boxShadow: '0 0 14px rgba(57,255,122,0.12)' }}
          labelStyle={{ color: '#0F172A' }}
          formatter={(value: number, name: string) => {
            const grams = name === 'Fat' ? Math.round(value / 9) : Math.round(value / 4);
            return [`${grams}g (${value} cal)`, name];
          }}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#475569', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
