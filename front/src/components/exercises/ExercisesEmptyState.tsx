import { FaPlus } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import {
  MuscleGroupLabel,
  type ExerciseFilter,
  type MuscleGroupType,
} from "@/dtos/muscle.dto";

type Props = {
  filter: ExerciseFilter;
  onCreate: () => void;
};

const ExercisesEmptyState = ({ filter, onCreate }: Props) => (
  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
    <div className="w-20 h-20 rounded-2xl bg-mediumGrey flex items-center justify-center">
      <LuLayoutGrid size={32} className="text-lightIndigo" />
    </div>
    <div>
      <p className="text-lg font-semibold">No exercises yet</p>
      <p className="text-sm text-lightGrey/60 max-w-sm">
        {filter === "ALL"
          ? "Start building your library by adding your first exercise."
          : `No ${MuscleGroupLabel[filter as MuscleGroupType]} exercises yet. Add one to get started.`}
      </p>
    </div>
    <button
      onClick={onCreate}
      className="flex items-center gap-2 bg-indigo hover:bg-lightIndigo transition-colors rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
    >
      <FaPlus size={12} />
      New Exercise
    </button>
  </div>
);

export default ExercisesEmptyState;
