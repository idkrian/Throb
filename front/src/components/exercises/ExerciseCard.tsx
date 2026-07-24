import { MuscleGroupLabel, MuscleLabel } from "@/dtos/muscle.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";

type Props = {
  exercise: ExerciseDto;
  onClick: () => void;
};

const ExerciseCard = ({ exercise, onClick }: Props) => (
  <button
    onClick={onClick}
    className="group text-left bg-mediumGrey hover:bg-mediumGrey/70 border border-transparent hover:border-indigo/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col gap-3"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-darkGrey flex items-center justify-center shrink-0">
        <MuscleIcon group={exercise.muscleGroup} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{exercise.title}</p>
        <p className="text-xs text-lightGrey/60">
          {MuscleGroupLabel[exercise.muscleGroup]}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs px-2 py-1 rounded-md bg-darkIndigo/40 text-lightIndigo border border-indigo/30">
        {MuscleLabel[exercise.muscle]}
      </span>
      {exercise.userId !== null && (
        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-darkGrey text-lightGrey/60">
          Custom
        </span>
      )}
    </div>
  </button>
);

export default ExerciseCard;
