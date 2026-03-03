import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartData = [
  { browser: "chest", visitors: 3, fill: "var(--color-chest)" },
  { browser: "arms", visitors: 5, fill: "var(--color-arms)" },
  { browser: "back", visitors: 7, fill: "var(--color-back)" },
  { browser: "legs", visitors: 2, fill: "var(--color-legs)" },
  { browser: "core", visitors: 3, fill: "var(--color-core)" },
  { browser: "shoulders", visitors: 1, fill: "var(--color-shoulders)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
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
  return (
    <div className="w-fit h-fit flex flex-col items-center p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">Bar Chart - Mixed</h3>
        <p className="text-sm text-muted-foreground">January - June 2024</p>
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
              dataKey="browser"
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              tickLine={false}
              tickMargin={1}
              type="category"
            />
            <XAxis dataKey="visitors" hide type="number" />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Bar dataKey="visitors" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  );
}

export default BarMixed;
