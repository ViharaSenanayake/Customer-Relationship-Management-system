import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DealValueChartProps {
  data: { status: string; value: number }[];
}

const COLORS = ['#6366f1', '#f59e0b', '#a855f7', '#06b6d4', '#10b981', '#ef4444'];

export const DealValueChart = ({ data }: DealValueChartProps) => {
  return (
    <div className="glass rounded-xl p-6 border border-white/10 card-hover">
      <h3 className="text-lg font-medium text-white mb-4">Deal Value by Stage</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="status" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Deal Value']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
