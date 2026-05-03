import {
  LuPause,
  LuPlay,
  LuRotateCw,
  LuTimer,
  LuTrophy,
} from "react-icons/lu";
import { formatTime } from "@/utils";

type Props = {
  workoutSeconds: number;
  workoutRunning: boolean;
  onToggleRunning: () => void;
  onResetTime: () => void;
  exerciseFinishedCount: number;
  totalExercises: number;
  totalCompletedSets: number;
  totalSets: number;
  overallPct: number;
  totalVolume: number;
  pulseVolume: boolean;
};

const WorkoutHeader = ({
  workoutSeconds,
  workoutRunning,
  onToggleRunning,
  onResetTime,
  exerciseFinishedCount,
  totalExercises,
  totalCompletedSets,
  totalSets,
  overallPct,
  totalVolume,
  pulseVolume,
}: Props) => (
  <div className="grid grid-cols-3 gap-4 shrink-0">
    <div className="bg-mediumGrey rounded-xl p-4 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-indigo/20 text-lightIndigo">
        <LuTimer size={24} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-lightGrey/60 uppercase tracking-wider">
          Workout time
        </span>
        <span className="text-2xl font-bold tabular-nums">
          {formatTime(workoutSeconds)}
        </span>
      </div>
      <div className="ml-auto flex gap-1">
        <button
          className="p-2 rounded-lg hover:bg-darkGrey transition-colors cursor-pointer"
          onClick={onToggleRunning}
        >
          {workoutRunning ? <LuPause size={20} /> : <LuPlay size={20} />}
        </button>
        <button
          className="p-2 rounded-lg hover:bg-darkGrey transition-colors cursor-pointer"
          onClick={onResetTime}
        >
          <LuRotateCw size={20} />
        </button>
      </div>
    </div>

    <div className="bg-mediumGrey rounded-xl p-4 flex flex-col justify-center gap-2">
      <div className="flex justify-between text-xs text-lightGrey/60 uppercase tracking-wider">
        <span>Progress</span>
        <span>
          {exerciseFinishedCount} / {totalExercises} exercises
        </span>
      </div>
      <div className="h-2 bg-darkGrey rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-indigo to-lightIndigo rounded-full transition-all duration-500 ease-out"
          style={{ width: `${overallPct}%` }}
        />
      </div>
      <span className="text-xs text-lightGrey/60 tabular-nums">
        {totalCompletedSets} of {totalSets} sets done
      </span>
    </div>

    <div className="bg-mediumGrey rounded-xl p-4 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-indigo/20 text-lightIndigo">
        <LuTrophy size={24} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-lightGrey/60 uppercase tracking-wider">
          Volume
        </span>
        <span
          className={`text-2xl font-bold tabular-nums transition-all duration-300 ${
            pulseVolume ? "text-lightIndigo scale-110" : ""
          }`}
        >
          {totalVolume.toLocaleString()} kg
        </span>
      </div>
    </div>
  </div>
);

export default WorkoutHeader;
