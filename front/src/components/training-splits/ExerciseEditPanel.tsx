import { IoClose } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import {
  MuscleGroup,
  MuscleGroupLabel,
  MuscleLabel,
  MusclesByGroup,
  type MuscleGroupType,
  type MuscleType,
} from "@/dtos/muscle.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  exercise: TrainingSplitExerciseDto;
  exercises: ExerciseDto[];
  onClose: () => void;
  onUpdate: (patch: Partial<TrainingSplitExerciseDto>) => void;
  onDelete: () => void;
  onMuscleGroupChange: (mg: MuscleGroupType) => void;
  onMuscleChange: (muscle: MuscleType) => void;
  onExerciseChange: (exerciseId: number) => void;
};

const PanelField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-xs uppercase tracking-wider text-lightGrey/50 font-semibold">
      {label}
    </p>
    {children}
  </div>
);

const ExerciseEditPanel = ({
  exercise,
  exercises,
  onClose,
  onUpdate,
  onDelete,
  onMuscleGroupChange,
  onMuscleChange,
  onExerciseChange,
}: Props) => {
  const filterByMuscle = (muscle: MuscleType) =>
    exercises.filter((ex) => ex.muscle === muscle);

  return (
    <>
      <div className="flex items-center justify-between px-5 py-4 border-b border-mediumGrey shrink-0">
        <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
          Edit Exercise
        </p>
        <button
          onClick={onClose}
          className="text-lightGrey/60 hover:text-white cursor-pointer transition"
        >
          <IoClose size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
        {exercise.exercise?.muscleGroup && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-mediumGrey flex items-center justify-center shrink-0">
              <MuscleIcon
                group={exercise.exercise.muscleGroup as MuscleGroupType}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white truncate">
                {exercise.exercise.title}
              </p>
              <p className="text-xs text-lightGrey/60">
                {MuscleLabel[exercise.exercise.muscle]}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <PanelField label="Sets">
            <input
              type="number"
              min={1}
              value={exercise.sets || ""}
              onChange={(e) => onUpdate({ sets: Number(e.target.value) })}
              onBlur={() => exercise.sets < 1 && onUpdate({ sets: 1 })}
              className="w-full bg-mediumGrey rounded-lg px-3 py-2 text-sm outline-none border border-transparent focus:border-indigo transition-colors text-white"
            />
          </PanelField>
          <PanelField label="Reps">
            <input
              type="text"
              value={exercise.reps}
              onChange={(e) => onUpdate({ reps: e.target.value })}
              className="w-full bg-mediumGrey rounded-lg px-3 py-2 text-sm outline-none border border-transparent focus:border-indigo transition-colors text-white"
            />
          </PanelField>
        </div>

        <PanelField label="Muscle Group">
          <Select
            value={exercise.exercise?.muscleGroup ?? ""}
            onValueChange={(value) =>
              onMuscleGroupChange(value as MuscleGroupType)
            }
          >
            <SelectTrigger className="w-full bg-mediumGrey border-transparent text-white data-placeholder:text-lightGrey/50 focus-visible:border-indigo focus-visible:ring-0">
              <SelectValue placeholder="Select muscle group" />
            </SelectTrigger>
            <SelectContent position="popper">
              {(Object.values(MuscleGroup) as MuscleGroupType[]).map((mg) => (
                <SelectItem key={mg} value={mg}>
                  {MuscleGroupLabel[mg]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PanelField>

        <PanelField label="Muscle">
          <Select
            value={exercise.exercise?.muscle ?? ""}
            onValueChange={(value) => onMuscleChange(value as MuscleType)}
          >
            <SelectTrigger className="w-full bg-mediumGrey border-transparent text-white data-placeholder:text-lightGrey/50 focus-visible:border-indigo focus-visible:ring-0">
              <SelectValue placeholder="Select muscle" />
            </SelectTrigger>
            <SelectContent position="popper">
              {exercise.exercise?.muscleGroup &&
                MusclesByGroup[
                  exercise.exercise.muscleGroup as keyof typeof MusclesByGroup
                ]?.map(({ text, value }) => (
                  <SelectItem key={value} value={value}>
                    {text}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </PanelField>

        <PanelField label="Exercise">
          <Select
            value={String(exercise.exerciseId ?? exercise.exercise?.id ?? "")}
            onValueChange={(value) => onExerciseChange(Number(value))}
          >
            <SelectTrigger className="w-full bg-mediumGrey border-transparent text-white data-placeholder:text-lightGrey/50 focus-visible:border-indigo focus-visible:ring-0">
              <SelectValue placeholder="Select exercise" />
            </SelectTrigger>
            <SelectContent position="popper">
              {filterByMuscle(exercise.exercise?.muscle).map((exOpt) => (
                <SelectItem key={exOpt.id} value={String(exOpt.id)}>
                  {exOpt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PanelField>

        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm font-medium cursor-pointer mt-auto"
        >
          <LuTrash2 size={14} />
          Remove exercise
        </button>
      </div>
    </>
  );
};

export default ExerciseEditPanel;
