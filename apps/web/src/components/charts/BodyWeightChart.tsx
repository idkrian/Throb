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
import type { BodyWeightDto } from "@/dtos/body-weight.dto";
import { useAuth } from "@/contexts/AuthContext";
import { toDisplayWeight, unitLabel } from "@/utils/units";
import { formatDate } from "@/utils/date";

const chartConfig = {
  weight: {
    label: "Body weight",
    color: "#7c3aed",
  },
} satisfies ChartConfig;

type Props = {
  entries: BodyWeightDto[];
};

const BodyWeightChart = ({ entries }: Props) => {
  const { unit } = useAuth();

  // Stored in kg; charted in whatever unit the user reads in.
  const data = entries.map((entry) => ({
    date: formatDate(entry.createdAt, { month: "short", day: "numeric" }, "en-US"),
    weight: toDisplayWeight(entry.weight, unit),
  }));

  if (data.length === 0) {
    return (
      <Card className="bg-mediumGrey border-none min-w-0 flex-1">
        <CardHeader>
          <CardTitle className="text-white">Body Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lightGrey/60 text-sm">
            No entries yet — log your weight to start tracking.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-mediumGrey border-none flex min-w-0 flex-col lg:flex-1 lg:min-h-0">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">Body Weight</CardTitle>
        <CardDescription>Progress over time ({unitLabel(unit)})</CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 pb-2 lg:flex-1 lg:min-h-0">
        <ChartContainer config={chartConfig} className="h-56 w-full lg:h-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="bodyWeightGrad" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="date"
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#bodyWeightGrad)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BodyWeightChart;
