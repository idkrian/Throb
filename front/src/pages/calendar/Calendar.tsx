import { useEffect } from "react";
import { getWeekDays } from "../../utils";

const Calendar = () => {
  useEffect(() => {
    console.log(getWeekDays());
    console.log(new Date().getDay());
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
        {getWeekDays().map((day) => (
          <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col items-center">
              <div className="capitalize font-semibold text-white">
                {day.dayName}
              </div>
              <div className=" font-semibold text-white">{day.day}</div>
            </div>
            <div className="shadow-2xl">
              <div className="bg-indigo w-full rounded-t-md p-1">
                <p className="text-xl text-white font-bold text-center">
                  Peito
                </p>
              </div>
              <div className="bg-mediumGrey p-4 group rounded-b-md">
                <div className="mb-2 text-white">
                  <p className="font-bold text-md">Peitasso</p>
                  <p className="text-sm hidden group-hover:block">
                    Sets: 2 | Reps: 3 | Order: 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center text-3xl text-indigo font-bold text-center">
          NAO DESISTA NUNCA! 🔥
        </div>
      </div>
    </div>
  );
};

export default Calendar;
