import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TrainingSplitCard from "../components/TrainingSplitCard";
import BarMixed from "@/components/charts/bar-mixed";
import Button from "@/components/ui/Button";
import { getTrainingSplitDays } from "@/api/training-split-day";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";

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
    <div className="flex flex-col w-full h-full border-amber-600">
      <div className="flex w-full h-full justify-between">
        <BarMixed />
        <div className="flex flex-col gap-4">
          <p className="text-center text-2xl font-semibold text-white italic ">
            Today Training Split
          </p>
          <div className="flex flex-col items-center gap-4">
            {todaySplit ? (
              <>
                <TrainingSplitCard
                  split={todaySplit}
                  width={300}
                  hideActions
                />
                <Button
                  label="Start Workout"
                  onClick={() => navigate(`/workout/${todaySplit.id}`)}
                />
              </>
            ) : (
              <p className="text-center text-lg font-medium text-lightGrey mt-4">
                Rest Day! No training scheduled.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
