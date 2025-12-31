import { LuBicepsFlexed } from "react-icons/lu";
import type { MuscleGroupItemsDto, MuscleGroupType } from "../dtos/muscle.dto";
import { getExercisesByMuscleGroup } from "../utils";

interface MuscleGroupCardProps {
  muscleGroupExercises: MuscleGroupItemsDto[];
  muscleGroup: MuscleGroupType;
}

const MuscleGroupCard = (props: MuscleGroupCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-8 gap-2">
      <LuBicepsFlexed size={72} className="text-indigo" />
      <p className="text-white font-semibold">{props.muscleGroup}</p>
      <div className="h-32 w-full px-2 rounded-lg overflow-y-auto bg-mediumGrey">
        {getExercisesByMuscleGroup(
          props.muscleGroupExercises,
          props.muscleGroup
        ).map((mg) => (
          <p className="text-white" key={mg.id}>
            {mg.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MuscleGroupCard;
