import axios from "axios";
import { useEffect, useState } from "react";
import MuscleGroupCard from "../../components/MuscleGroupCard";
import { type MuscleGroupItemsDto, MuscleGroup } from "../../dtos/muscle.dto";

const Muscles = () => {
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);

  useEffect(() => {
    const fetchMuscles = async () => {
      const response = await axios.get(
        "http://localhost:3000/exercise/muscle-groups"
      );
      const data = await response.data.data;
      setMuscleGroupExercises(data);
    };
    fetchMuscles();
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-2 auto-rows-max place-content-center h-full gap-4 p-4 items-center">
      {Object.values(MuscleGroup).map((mg) => (
        <MuscleGroupCard
          muscleGroupExercises={muscleGroupExercises}
          muscleGroup={mg}
        />
      ))}
    </div>
  );
};

export default Muscles;
