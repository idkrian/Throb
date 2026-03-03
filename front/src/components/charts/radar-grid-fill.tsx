import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartData = [
  { month: "Chest", desktop: 203 },
  { month: "Arms", desktop: 186 },
  { month: "Back", desktop: 237 },
  { month: "Legs", desktop: 285 },
  { month: "Core", desktop: 264 },
  { month: "Shoulder", desktop: 209 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RadarGridFill() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Atual Treino</h3>
        <p className="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          className="aspect-square w-80 h-80"
          config={chartConfig}
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <PolarGrid className="fill-indigo opacity-20" />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-indigo)"
              fillOpacity={0.7}
            />
          </RadarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-1 text-sm text-center mt-2">
        <div className="flex items-center justify-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center justify-center gap-2 leading-none">
          January - June 2024
        </div>
      </div>
    </div>
  );
}

export default RadarGridFill;
