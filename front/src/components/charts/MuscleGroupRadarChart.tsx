import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
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
import { getWorkoutMuscleGroupsStats, type MuscleGroupStat } from "@/api/workout";

const MUSCLE_GROUPS: { key: string; label: string }[] = [
  { key: "CHEST", label: "Chest" },
  { key: "BACK", label: "Back" },
  { key: "SHOULDERS", label: "Shoulders" },
  { key: "ARMS", label: "Arms" },
  { key: "LEGS", label: "Legs" },
  { key: "GLUTES", label: "Glutes" },
  { key: "CORE", label: "Core" },
];

const chartConfig = {
  sets: {
    label: "Sets",
    color: "#7c3aed",
  },
} satisfies ChartConfig;

const MuscleGroupRadarChart = () => {
  const [data, setData] = useState<MuscleGroupStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleGroupsStats().then(setData);
  }, []);

  const totals: Record<string, number> = {};
  for (const item of data) {
    totals[item.muscleGroup] = item.totalSets;
  }

  const chartData = MUSCLE_GROUPS.map(({ key, label }) => ({
    muscle: label,
    sets: totals[key] ?? 0,
  }));

  return (
    <Card className="bg-mediumGrey border-none flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">Muscle Balance</CardTitle>
        <CardDescription>Sets per muscle group</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[220px]">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#e5e5f0" strokeOpacity={0.15} />
            <PolarAngleAxis
              dataKey="muscle"
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey="sets"
              fill="#7c3aed"
              fillOpacity={0.35}
              stroke="#a78bfa"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MuscleGroupRadarChart;
