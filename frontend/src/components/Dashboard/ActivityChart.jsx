import React from 'react';
import Card from '../Common/Card.jsx';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const ActivityChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#12121f]/95 border border-white/[0.08] backdrop-blur-md p-3.5 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">{label}</p>
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-white font-medium">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span>{p.name}: {p.value} {p.name === 'Calories' ? 'kcal' : 'ml'}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">Weekly Performance</h3>
        <span className="text-xs text-gray-400 font-medium">Calories & Hydration</span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingBottom: 15 }}
            />
            <Area
              type="monotone"
              dataKey="calories"
              name="Calories"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCalories)"
            />
            <Area
              type="monotone"
              dataKey="water"
              name="Water"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWater)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ActivityChart;
