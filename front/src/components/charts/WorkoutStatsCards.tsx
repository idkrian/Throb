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
      label: "Total Workouts",
      value: stats?.totalWorkouts ?? "--",
      icon: Dumbbell,
      sub: "All Time",
    },
    {
      label: "This Week",
      value: stats?.workoutsThisWeek ?? "--",
      icon: CalendarDays,
      sub: "Sessions",
    },
    {
      label: "This Month",
      value: stats?.workoutsThisMonth ?? "--",
      icon: TrendingUp,
      sub: "Sessions",
    },
    {
      label: "Total Hours",
      value: totalHours,
      icon: Clock,
      sub: "Time Trained",
    },
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon, sub }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-lg bg-mediumGrey px-4 py-2.5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-darkIndigo/40">
            <Icon className="h-4 w-4 text-lightIndigo" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold leading-tight text-white">
              {value}
            </p>
            <p className="truncate text-xs text-lightGrey/60">
              {label} · {sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutStatsCards;
