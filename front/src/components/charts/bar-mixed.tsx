import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useEffect, useState } from "react";
import { getWorkoutMuscleGroupsStats } from "@/api/workout";

interface MuscleGroupStat {
  muscleGroup: string;
  totalSets: number;
  fill: string;
}

const chartConfig = {
  totalSets: {
    label: "Sets",
  },
  chest: {
    label: "Chest",
    color: "var(--chart-1)",
  },
  arms: {
    label: "Arms",
    color: "var(--chart-2)",
  },
  back: {
    label: "Back",
    color: "var(--chart-3)",
  },
  legs: {
    label: "Legs",
    color: "var(--chart-4)",
  },
  core: {
    label: "Core",
    color: "var(--chart-5)",
  },
  shoulders: {
    label: "Shoulders",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export function BarMixed() {
  const [chartData, setChartData] = useState<MuscleGroupStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleGroupsStats().then((data: any) => {
      const mapped: MuscleGroupStat[] = data.map(
        (row: { muscleGroup: string; totalSets: number }) => ({
          muscleGroup: row.muscleGroup,
          totalSets: row.totalSets,
          fill: `var(--color-${row.muscleGroup})`,
        })
      );
      setChartData(mapped);
    });
  }, []);

  return (
    <div className="w-fit h-fit flex flex-col items-center p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">Sets by Muscle Group</h3>
        <p className="text-sm text-muted-foreground">All time</p>
      </div>
      <div className="flex-1 flex items-center justify-center h-fit">
        <ChartContainer className="h-[250px] w-96" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              axisLine={false}
              dataKey="muscleGroup"
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label ?? value
              }
              tickLine={false}
              tickMargin={1}
              type="category"
            />
            <XAxis dataKey="totalSets" hide type="number" />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Bar dataKey="totalSets" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Total sets logged per muscle group
        </div>
      </div>
    </div>
  );
}

export default BarMixed;
