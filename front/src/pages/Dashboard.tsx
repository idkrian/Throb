import axios from "axios";
import { useState, useEffect } from "react";
import Body from "../../src/assets/body3.png";
import type { TrainingSplitDto } from "../dtos/training-splits.dto";
import TrainingSplitCard from "../components/TrainingSplitCard";

const Dashboard = () => {
  const [trainingSplitByDay, setTrainingSplitByDay] = useState<
    Record<number, TrainingSplitDto>
  >({});
  const todayNumber = new Date().getDay();
  useEffect(() => {
    const fetchTrainingSplitDays = async () => {
      const response = await axios.get(
        "http://localhost:3000/training-split-day",
      );
      const data = await response.data.data;

      setTrainingSplitByDay(data);
      console.log(todayNumber);
      console.log(data);

      console.log(data[todayNumber]);
    };
    fetchTrainingSplitDays();
  }, []);

  return (
    <div className="flex flex-col w-full h-full border-amber-600">
      <div className="flex w-full h-full justify-between">
        <img src={Body} alt="body" className="h-112 p-8" />
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
