import { LuTrophy } from "react-icons/lu";
import Button from "@/components/ui/Button";
import { formatTime } from "./utils";

type Props = {
  open: boolean;
  title: string;
  workoutSeconds: number;
  totalVolume: number;
  totalCompletedSets: number;
  submitting: boolean;
  onClose: () => void;
  onSave: () => void;
};

const WorkoutSummaryModal = ({
  open,
  title,
  workoutSeconds,
  totalVolume,
  totalCompletedSets,
  submitting,
  onClose,
  onSave,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-8">
      <div className="bg-linear-to-br from-mediumGrey to-darkGrey rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-indigo/30">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="p-3 rounded-full bg-indigo/20">
            <LuTrophy size={36} className="text-lightIndigo" />
          </div>
          <h2 className="text-3xl font-bold">Workout Complete</h2>
          <p className="text-lightGrey/60">{title}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-darkGrey rounded-xl p-4 text-center">
            <p className="text-xs uppercase text-lightGrey/50">Time</p>
            <p className="text-2xl font-bold tabular-nums mt-1">
              {formatTime(workoutSeconds)}
            </p>
          </div>
          <div className="bg-darkGrey rounded-xl p-4 text-center">
            <p className="text-xs uppercase text-lightGrey/50">Volume</p>
            <p className="text-2xl font-bold tabular-nums mt-1">
              {totalVolume.toLocaleString()}
              <span className="text-sm text-lightGrey/50"> kg</span>
            </p>
          </div>
          <div className="bg-darkGrey rounded-xl p-4 text-center">
            <p className="text-xs uppercase text-lightGrey/50">Sets</p>
            <p className="text-2xl font-bold tabular-nums mt-1">
              {totalCompletedSets}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-lightGrey hover:bg-darkGrey transition-colors cursor-pointer"
          >
            Keep going
          </button>
          <Button label="SAVE" onClick={onSave} loading={submitting} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummaryModal;
