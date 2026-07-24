import { LuCheck, LuMinus, LuPlus } from "react-icons/lu";
import type { LoggedSet } from "@/dtos/workout.dto";
import { rpeColor } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toCanonicalWeight, toDisplayWeight, weightStep } from "@/utils/units";

type Props = {
  set: LoggedSet;
  index: number;
  targetReps: string;
  onUpdate: (patch: Partial<LoggedSet>) => void;
  onLog: () => void;
};

const SetRow = ({ set, index, targetReps, onUpdate, onLog }: Props) => {
  const { unit } = useAuth();
  const step = weightStep(unit);
  // set.weight is canonical (kg); the input works in the user's unit.
  const displayWeight = toDisplayWeight(set.weight, unit);

  const setDisplayWeight = (value: number) =>
    onUpdate({ weight: toCanonicalWeight(Math.max(0, value), unit) });

  return (
    <div
      className={`grid grid-cols-[28px_1fr_70px_1.2fr_56px] gap-2 items-center px-3 py-2.5 rounded-lg flex-1 min-h-11 transition-all duration-300 ${
        set.completed
          ? "bg-emerald-500/10 border border-emerald-500/30"
          : "bg-darkGrey/60 border border-transparent"
      }`}
    >
      <span
        className={`font-bold text-sm ${
          set.completed ? "text-emerald-400" : "text-lightIndigo"
        }`}
      >
        {index + 1}
      </span>

      <div className="flex items-center gap-1">
        <button
          disabled={set.completed}
          onClick={() => setDisplayWeight(displayWeight - step)}
          className="p-1 rounded-md bg-mediumGrey hover:bg-indigo/40 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <LuMinus size={12} />
        </button>
        <input
          type="number"
          step={0.5}
          disabled={set.completed}
          value={displayWeight || ""}
          placeholder="0"
          onChange={(e) => setDisplayWeight(Number(e.target.value))}
          className="w-full text-center bg-transparent font-semibold text-sm outline-none focus:bg-mediumGrey rounded-md py-0.5 transition-colors"
        />
        <button
          disabled={set.completed}
          onClick={() => setDisplayWeight(displayWeight + step)}
          className="p-1 rounded-md bg-mediumGrey hover:bg-indigo/40 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <LuPlus size={12} />
        </button>
      </div>

      <input
        type="number"
        disabled={set.completed}
        value={set.reps || ""}
        placeholder={targetReps}
        onChange={(e) => onUpdate({ reps: Number(e.target.value) })}
        className="w-full text-center bg-mediumGrey/60 font-semibold text-sm outline-none rounded-md py-1 focus:bg-mediumGrey transition-colors disabled:bg-transparent"
      />

      <div className="flex items-center gap-1.5">
        <input
          type="range"
          min={1}
          max={10}
          disabled={set.completed}
          value={set.rpe}
          onChange={(e) => onUpdate({ rpe: Number(e.target.value) })}
          className="flex-1 min-w-0 accent-indigo cursor-pointer disabled:cursor-not-allowed"
        />
        <span
          className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded min-w-6 text-center ${rpeColor(
            set.rpe,
          )}`}
        >
          {set.rpe}
        </span>
      </div>

      <button
        disabled={set.completed || set.weight <= 0 || set.reps <= 0}
        onClick={onLog}
        className={`flex items-center justify-center h-7 rounded-md font-semibold transition-all duration-200 cursor-pointer ${
          set.completed
            ? "bg-emerald-500/20 text-emerald-400 cursor-default"
            : "bg-indigo hover:bg-darkIndigo hover:scale-105 disabled:bg-mediumGrey disabled:text-lightGrey/30 disabled:cursor-not-allowed disabled:hover:scale-100"
        }`}
      >
        <LuCheck size={14} />
      </button>
    </div>
  );
};

export default SetRow;
