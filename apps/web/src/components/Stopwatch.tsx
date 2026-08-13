import { useEffect, useState } from "react";
import { CiPause1, CiPlay1, CiUndo } from "react-icons/ci";

type StopwatchProps = {
  durationSeconds: number;
  setDurationSeconds: (seconds: number) => void;
};

const Stopwatch = ({ durationSeconds, setDurationSeconds }: StopwatchProps) => {
  // internal time in centiseconds (10ms units) for display precision
  const [ticks, setTicks] = useState(durationSeconds * 100);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTicks((t) => t + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    setDurationSeconds(Math.floor(ticks / 100));
  }, [ticks, setDurationSeconds]);

  // Hours calculation
  const hours = Math.floor(ticks / 360000);

  // Minutes calculation
  const minutes = Math.floor((ticks % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((ticks % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = ticks % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTicks(0);
  };
  return (
    <div className="flex flex-col items-center justify-center text-white gap-2">
      <div className="flex bg-linear-to-r from-[#8711c1] to-[#2472fc] items-center justify-center size-56 rounded-full shadow-xs">
        <div className="flex flex-col items-center justify-center bg-darkGrey h-[94%] w-[94%] rounded-full">
          <p className="text-white font-semibold text-4xl">
            {hours > 0 ? `${hours.toString().padStart(2, "0")}:` : ""}
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <button
          className="font-semibold px-2 cursor-pointer shadow-md"
          onClick={startAndStop}
        >
          {isRunning ? <CiPause1 size={34} /> : <CiPlay1 size={34} />}
        </button>
        <button
          className="font-semibold px-2 cursor-pointer shadow-md"
          onClick={reset}
        >
          <CiUndo size={34} className="font-black" />
        </button>
      </div>
    </div>
  );
};
export default Stopwatch;
