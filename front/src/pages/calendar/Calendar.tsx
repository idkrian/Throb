import { useEffect, useState } from "react";
import { getWeekDays } from "../../utils";
import Button from "../../ui/core/Button";
import axios from "axios";
import TrainingSplitCard from "../../components/TrainingSplitCard";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";

const Calendar = () => {
  const [trainingSplitByDay, setTrainingSplitByDay] = useState<
    Record<number, TrainingSplitDto>
  >({});
  useEffect(() => {
    const fetchTrainingSplitDays = async () => {
      const response = await axios.get(
        "http://localhost:3000/training-split-day",
      );
      const data = await response.data.data;

      setTrainingSplitByDay(data);
    };
    fetchTrainingSplitDays();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col items-center justify-center bg-indigo w-[25%] gap-8">
        <div className="flex flex-col">
          <p className="text-center text-white font-bold text-8xl">
            {new Date().getDate()}
          </p>
          <p className="text-center text-white font-bold text-4xl capitalize">
            {new Date().toLocaleDateString("pt-BR", { weekday: "long" })}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center text-white font-bold text-2xl">
            Treino do Dia:
          </p>
          <p className="text-center text-white font-bold text-7xl">PEITO!</p>
        </div>
      </div>
      <div className="grid grid-cols-4 auto-rows-auto divide-x-3 divide-indigo divide justify-around h-full w-[75%]">
        {getWeekDays().map((day) => {
          const trainingSplit = trainingSplitByDay[day.dayNumber];

          return (
            <div className="flex flex-col gap-6 p-4" key={day.dayNumber}>
              <div className="flex flex-col items-center">
                <div className="capitalize font-semibold text-white">
                  {day.dayName}
                </div>
                <div className=" font-semibold text-white">{day.day}</div>
              </div>
              {trainingSplit && (
                <div>
                  <TrainingSplitCard split={trainingSplit} />
                  <Button label="Edit Training Split" color="alert" />
                </div>
              )}
            </div>
          );
        })}
        <div className="flex items-center text-3xl text-indigo font-bold text-center">
          NAO DESISTA NUNCA! 🔥
        </div>
      </div>
    </div>
  );
};

export default Calendar;
