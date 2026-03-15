import { useState, useEffect } from "react";
import type { TrainingSplitDto } from "../dtos/training-splits.dto";
import TrainingSplitCard from "../components/TrainingSplitCard";
import BarMixed from "@/components/charts/bar-mixed";
import { getTrainingSplitDays } from "@/api/training-split-day";

const Dashboard = () => {
  const [trainingSplitByDay, setTrainingSplitByDay] = useState<
    Record<number, TrainingSplitDto>
  >({});
  const todayNumber = new Date().getDay();
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
          <div className="">
            {trainingSplitByDay[todayNumber] ? (
              <TrainingSplitCard
                split={trainingSplitByDay[todayNumber]}
                width={300}
                showDetailsOnHover={false}
              />
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
