'use client';

import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import {ChartContainer, ChartTooltipContent} from '@/components/ui/chart';

const chartData = [
  {day: 'Mon', xp: 5},
  {day: 'Tue', xp: 15},
  {day: 'Wed', xp: 10},
  {day: 'Thu', xp: 25},
  {day: 'Fri', xp: 20},
  {day: 'Sat', xp: 35},
  {day: 'Sun', xp: 15},
];

const chartConfig = {
  xp: {
    label: 'XP',
    color: 'hsl(var(--primary))',
  },
};

export function DailyProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{top: 20, right: 20, left: -10, bottom: 0}}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <Tooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="xp" fill="var(--color-xp)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
