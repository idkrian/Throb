import type { TrainingSplitDto } from "../dtos/training-splits.dto";
import { LuTrash2, LuPencil } from "react-icons/lu";
import { Link } from "react-router";

interface TrainingSplitCardProps {
  split: TrainingSplitDto;
  width?: number;
  showDetailsOnHover?: boolean;
}

const TrainingSplitCard = ({
  split,
  width,
  showDetailsOnHover = true,
}: TrainingSplitCardProps) => {
  return (
    <div
      key={split.id}
      className="shadow-2xl"
      style={width ? { width: `${width}px` } : {}}
    >
      <div className="bg-indigo w-full rounded-t-md p-1">
        <p className="text-xl text-white font-bold text-center">
          {split.title}
        </p>
      </div>
      <div
        className={`bg-mediumGrey p-4 rounded-b-md ${showDetailsOnHover ? "group" : ""}`}
      >
        {split.exercises.map((exercise) => (
          <div key={exercise.id} className="mb-2 text-white">
            <p className="font-bold text-md">{exercise.exercise.title}</p>
            <p
              className={`text-sm ${showDetailsOnHover ? "hidden group-hover:block" : ""}`}
            >
              Sets: {exercise.sets} | Reps: {exercise.reps} | Order:{" "}
              {exercise.order}
            </p>
          </div>
        ))}
        <div
          className={`h-10 bg-indigo justify-center items-center w-full divide-x-3 divide-black divide rounded-lg ${showDetailsOnHover ? "hidden group-hover:flex" : "flex"}`}
        >
          <Link
            to={`/training-splits/${split.id}`}
            className="flex w-full justify-center items-center cursor-pointer"
          >
            <LuTrash2 size={20} color="red" />
          </Link>
          <Link
            to={`/training-splits/${split.id}`}
            className="flex w-full justify-center items-center cursor-pointer"
          >
            <LuPencil size={20} color="orange" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingSplitCard;
