import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getAllWorkouts } from "@/api/workout";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { dayKey, formatDate } from "@/utils/date";

const chartConfig = {
  workouts: {
    label: "Workouts",
    color: "#7c3aed",
  },
} satisfies ChartConfig;

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  // dayKey (not toISOString) so the week bucket uses the same calendar day as the rest of the app.
  return dayKey(d);
}

function buildWeeklyData(workouts: WorkoutSessionDto[]) {
  const counts: Record<string, number> = {};
  for (const w of workouts) {
    const key = getWeekStart(w.createdAt);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, workouts]) => ({
      week: formatDate(
        week + "T12:00:00",
        {
          month: "short",
          day: "numeric",
        },
        "en-US",
      ),
      workouts,
    }));
}

const WorkoutFrequencyChart = () => {
  const [data, setData] = useState<{ week: string; workouts: number }[]>([]);

  useEffect(() => {
    getAllWorkouts().then((ws) => setData(buildWeeklyData(ws)));
  }, []);

  if (data.length === 0) {
    return (
      <Card className="bg-mediumGrey border-none flex-1">
        <CardHeader>
          <CardTitle className="text-white">Workout Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lightGrey/60 text-sm">No workout history yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-mediumGrey border-none flex min-w-0 flex-col lg:flex-1 lg:min-h-0">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">Workout Frequency</CardTitle>
        <CardDescription>Workouts per week (last 12 weeks)</CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 pb-2 lg:flex-1 lg:min-h-0">
        <ChartContainer config={chartConfig} className="h-56 w-full lg:h-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="workoutsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e5f0"
              strokeOpacity={0.08}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="workouts"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#workoutsGrad)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WorkoutFrequencyChart;
