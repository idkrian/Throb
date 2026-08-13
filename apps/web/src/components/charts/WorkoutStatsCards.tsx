import { useEffect, useState } from "react";
import { Dumbbell, CalendarDays, TrendingUp, Clock } from "lucide-react";
import {
  getWorkoutSummaryStats,
  type WorkoutSummaryStats,
} from "@/api/workout";

const WorkoutStatsCards = () => {
  const [stats, setStats] = useState<WorkoutSummaryStats | null>(null);

  useEffect(() => {
    getWorkoutSummaryStats().then(setStats);
  }, []);

  const totalHours = stats
    ? (stats.totalDurationSeconds / 3600).toFixed(1)
    : "--";

  const items = [
    {
      unit: "Workouts",
      timeframe: "All time",
      value: stats?.totalWorkouts ?? "--",
      icon: Dumbbell,
    },
    {
      unit: "Workouts",
      timeframe: "This week",
      value: stats?.workoutsThisWeek ?? "--",
      icon: CalendarDays,
    },
    {
      unit: "Workouts",
      timeframe: "This month",
      value: stats?.workoutsThisMonth ?? "--",
      icon: TrendingUp,
    },
    {
      unit: "Hours",
      timeframe: "All time",
      value: totalHours,
      icon: Clock,
    },
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2 lg:gap-3">
      {items.map(({ unit, timeframe, value, icon: Icon }) => (
        <div
          key={`${unit}-${timeframe}`}
          className="flex min-w-0 flex-col items-center gap-1.5 rounded-lg bg-mediumGrey px-1.5 py-3 text-center lg:flex-row lg:gap-3 lg:px-4 lg:py-2.5 lg:text-left"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-darkIndigo/40 lg:size-9 lg:rounded-md">
            <Icon className="size-4 text-lightIndigo" />
          </div>
          <div className="w-full min-w-0">
            <p className="text-lg font-bold leading-tight text-white lg:text-xl">
              {value}
            </p>
            <p className="leading-tight lg:truncate lg:text-xs lg:text-lightGrey/60">
              <span className="block truncate text-[11px] font-medium text-lightGrey/80 lg:inline lg:text-xs lg:font-normal lg:text-lightGrey/60">
                {unit}
              </span>
              <span className="hidden lg:inline"> · </span>
              <span className="block truncate text-[10px] text-lightGrey/45 lg:inline lg:text-xs lg:text-lightGrey/60">
                {timeframe}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutStatsCards;
