import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TrainingSplitCard from "../components/TrainingSplitCard";
import Button from "@/components/ui/Button";
import { getTrainingSplitDays } from "@/api/training-split-day";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";
import MuscleHeatmap from "@/components/analytics/MuscleHeatmap";
import WorkoutStatsCards from "@/components/charts/WorkoutStatsCards";
import MuscleGroupRadarChart from "@/components/charts/MuscleGroupRadarChart";
import WorkoutFrequencyChart from "@/components/charts/WorkoutFrequencyChart";

const Dashboard = () => {
  const [trainingSplitByDay, setTrainingSplitByDay] =
    useState<TrainingSplitDayMap>({});
  const todayNumber = new Date().getDay();
  const navigate = useNavigate();
  const todayEntry = trainingSplitByDay[todayNumber];
  const todaySplit =
    todayEntry && !todayEntry.restDay ? todayEntry.trainingSplit : undefined;

  useEffect(() => {
    getTrainingSplitDays().then(setTrainingSplitByDay);
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-3 overflow-hidden">
      <WorkoutStatsCards />
      <div className="grid flex-1 min-h-0 grid-cols-[300px_1fr_minmax(280px,320px)] gap-3">
        <div className="flex flex-col gap-3 min-h-0">
          <MuscleGroupRadarChart />
          <WorkoutFrequencyChart />
        </div>
        <div className="flex flex-col rounded-lg bg-mediumGrey p-3 min-h-0">
          <MuscleHeatmap />
        </div>
        <div className="flex flex-col gap-3 rounded-lg bg-mediumGrey p-3 min-h-0 overflow-y-auto">
          {todaySplit ? (
            <>
              <p className="text-center text-lg font-semibold text-white">
                Today's Training
              </p>
              <TrainingSplitCard
                fullHeight
                split={todaySplit}
                width={280}
                hideActions
              />
              <Button
                label="Start Workout"
                onClick={() => navigate(`/workout/${todaySplit.id}`)}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <p className="text-5xl">🔋</p>
              <p className="text-2xl font-bold text-white">Rest Day</p>
              <p className="text-sm font-medium text-lightGrey text-center">
                No training scheduled for today. Recover well!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
