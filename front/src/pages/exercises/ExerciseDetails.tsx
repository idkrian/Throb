import { useParams } from "react-router";
import "../../assets/muscles/BACK.png";
import { getExercisesByMuscleGroup } from "../../utils";
import axios from "axios";
import type { MuscleGroupType } from "../../dtos/muscle.dto";
import { useCallback, useEffect, useState } from "react";
import type { ExerciseDto } from "../../dtos/exercise.dto";
import Button from "../../ui/core/Button";
import CreateExerciseModal from "../../ui/modal/CreateExerciseModal";

const ExerciseDetails = () => {
  const params = useParams();
  const imagePath = new URL(
    `../../assets/muscles/${params.muscle?.toUpperCase()}.png`,
    import.meta.url,
  ).href;
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    ExerciseDto[]
  >([]);

  const [openCreateExerciseModal, setOpenCreateExerciseModal] = useState(false);

  const fetchMuscles = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3000/exercise/muscle-groups",
    );
    const data = await response.data.data;
    const exercisesByMuscleGroup = getExercisesByMuscleGroup(
      data,
      params.muscle?.toUpperCase() as MuscleGroupType,
    );
    setMuscleGroupExercises(exercisesByMuscleGroup);
  }, [params.muscle]);

  useEffect(() => {
    fetchMuscles();
  }, [fetchMuscles]);
  return (
    <div className="flex items-center justify-around h-full">
      <CreateExerciseModal
        open={openCreateExerciseModal}
        onClose={() => setOpenCreateExerciseModal(false)}
        muscle={params.muscle!}
        onSuccess={() => {
          fetchMuscles();
        }}
      />
      <div className="flex flex-col justify-center gap-4">
        <p className="capitalize text-white text-3xl text-center font-bold">
          {params.muscle} Exercises
        </p>
        <img src={imagePath} alt="" className="w-80 flex group-hover:hidden" />
      </div>
      <div className="flex flex-col gap-4 h-full justify-center">
        <div className="flex flex-col w-120 max-h-100 flex-1 px-2 rounded-lg overflow-y-auto bg-mediumGrey">
          {muscleGroupExercises &&
            muscleGroupExercises.map((emg) => (
              <p
                className="text-white font-semibold hover:text-indigo cursor-pointer my-2"
                key={emg.id}
              >
                {emg.title}
              </p>
            ))}
          {muscleGroupExercises &&
            muscleGroupExercises.map((emg) => (
              <p
                className="text-white font-semibold hover:text-indigo cursor-pointer my-2"
                key={emg.id}
              >
                {emg.title}
              </p>
            ))}
        </div>
        <Button
          label={"Add Exercise"}
          onClick={() => setOpenCreateExerciseModal(true)}
          fullWidth
        />
      </div>
    </div>
  );
};

export default ExerciseDetails;
