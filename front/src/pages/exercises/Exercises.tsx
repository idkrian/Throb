import axios from "axios";
import { useEffect, useState } from "react";
import MuscleGroupCard from "../../components/MuscleGroupCard";
import { type MuscleGroupItemsDto, MuscleGroup } from "../../dtos/muscle.dto";

const Exercises = () => {
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);

  useEffect(() => {
    const fetchMuscles = async () => {
      const response = await axios.get(
        "http://localhost:3000/exercise/muscle-groups",
      );
      const data = await response.data.data;
      setMuscleGroupExercises(data);
    };
    fetchMuscles();
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
