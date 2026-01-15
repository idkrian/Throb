import type { MuscleGroupItemsDto, MuscleGroupType } from "../dtos/muscle.dto";
import { getExercisesByMuscleGroup } from "../utils";

interface MuscleGroupCardProps {
  muscleGroupExercises: MuscleGroupItemsDto[];
  muscleGroup: MuscleGroupType;
}

const MuscleGroupCard = (props: MuscleGroupCardProps) => {
  const imagePath = new URL(
    `../assets/muscles/${props.muscleGroup}.png`,
    import.meta.url
  ).href;

  return (
    <div className="group flex flex-col items-center justify-center px-8 gap-2">
      <img src={imagePath} alt="" className="w-56 flex group-hover:hidden" />
      <p className="text-white font-bold">{props.muscleGroup}</p>
      <div className="h-32 w-56 px-2 rounded-lg overflow-y-auto bg-mediumGrey hidden group-hover:flex flex-col">
        {getExercisesByMuscleGroup(
          props.muscleGroupExercises,
          props.muscleGroup
        ).map((mg) => (
          <p className="text-white cursor-pointer" key={mg.id}>
            {mg.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MuscleGroupCard;
