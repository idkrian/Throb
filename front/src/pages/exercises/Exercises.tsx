import { useEffect, useState } from "react";
import MuscleGroupCard from "../../components/MuscleGroupCard";
import { type MuscleGroupItemsDto, MuscleGroup } from "../../dtos/muscle.dto";
import { getMuscleGroups } from "@/api/exercise";

const Exercises = () => {
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);

  useEffect(() => {
    getMuscleGroups().then(setMuscleGroupExercises);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex flex-wrap items-center justify-center h-full gap-14 p-4 ">
        {Object.values(MuscleGroup).map((mg) => (
          <MuscleGroupCard
            muscleGroupExercises={muscleGroupExercises}
            muscleGroup={mg}
          />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
