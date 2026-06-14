'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

interface ResultsChartProps {
  data: { P: number; A: number; E: number; I: number };
}

const COLORS = {
  P: '#775948',
  A: '#683E23',
  E: '#FAC7A6',
  I: '#ACA59B',
};

const LABELS = {
  P: 'Производство',
  A: 'Администрирование',
  E: 'Предпринимательство',
  I: 'Интеграция',
};

const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  const chartData = (['P', 'A', 'E', 'I'] as const).map((key) => ({
    name: key,
    label: LABELS[key],
    value: data[key],
    color: COLORS[key],
  }));

  return (
    <div className="w-full" style={{ height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 32, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ACA59B" opacity={0.1} />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: '#683E23', strokeWidth: 1, opacity: 0.2 }}
            tickLine={false}
            tick={{ fill: '#683E23', fontSize: 13, fontWeight: 700, fontFamily: 'Arimo', opacity: 0.6 }}
          />
          <YAxis
            axisLine={{ stroke: '#683E23', strokeWidth: 1, opacity: 0.2 }}
            tickLine={false}
            tick={{ fill: '#683E23', fontSize: 11, fontFamily: 'Arimo', opacity: 0.5 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(104,62,35,0.03)' }}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid rgba(172,165,155,0.2)',
              borderRadius: 0,
              fontFamily: 'Arimo',
              fontWeight: 700,
              boxShadow: 'none',
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, _name: any, entry: any) => [value, entry?.payload?.label ?? _name]}
          />
          <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={40}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              style={{ fill: '#683E23', fontSize: 13, fontWeight: 700, fontFamily: 'Arimo', opacity: 0.8 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
