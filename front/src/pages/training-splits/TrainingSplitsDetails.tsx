import axios from "axios";
import { useEffect, useState } from "react";
import { LuBicepsFlexed } from "react-icons/lu";
import { useParams } from "react-router";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import {
  MuscleGroupLabel,
  MuscleLabel,
  type MuscleGroupItemsDto,
} from "../../dtos/muscle.dto";
import {
  getExercisesByMuscleGroup,
  getMusclesByMuscleGroup,
} from "../../utils";

const TrainingSplitsDetails = () => {
  const [formData, setFormData] = useState<TrainingSplitDto | null>(null);
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);
  const params = useParams();

  useEffect(() => {
    const fetchTrainingSplit = async () => {
      const response = await axios.get(
        `http://localhost:3000/training-split/${params.id}`
      );
      setFormData(response.data.data);
    };
    const fetchMuscles = async () => {
      const response = await axios.get(
        "http://localhost:3000/exercise/muscle-groups"
      );
      setMuscleGroupExercises(response.data.data);
    };
    fetchMuscles();
    fetchTrainingSplit();
  }, [params.id]);

  return (
    <div className="flex flex-col w-full h-full">
      {formData && (
        <div className="flex w-full h-full items-center gap-16">
          <div className="flex flex-col items-center justify-center gap-8 w-96">
            <LuBicepsFlexed size={100} className="text-indigo" />
            <input
              type="text"
              value={formData.title}
              className="text-center text-white font-bold text-5xl bg-transparent"
            />
          </div>

          <div className="flex flex-col w-full">
            <table className="table-auto w-full text-white text-center rounded-2xl">
              <thead className="bg-mediumGrey rounded-2xl">
                <tr>
                  <th className="p-2 rounded-l-md">Order</th>
                  <th className="p-2">Sets</th>
                  <th className="p-2">Reps</th>
                  <th className="p-2">Muscle Group</th>
                  <th className="p-2">Muscle</th>
                  <th className="p-2 rounded-r-md">Exercise</th>
                </tr>
              </thead>
              <tbody>
                {formData.exercises.map((exercise, index) => (
                  <tr key={exercise.id || index} className="gap-2">
                    <td className="py-2">
                      <input
                        type="number"
                        value={exercise.order}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={exercise.sets}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        value={exercise.reps}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <select value={exercise.exercise.muscleGroup}>
                        {muscleGroupExercises.map((mg) => (
                          <option key={mg.muscleGroup} value={mg.muscleGroup}>
                            {MuscleGroupLabel[mg.muscleGroup]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <select value={exercise.exercise.muscle}>
                        {getMusclesByMuscleGroup(
                          muscleGroupExercises,
                          exercise.exercise.muscleGroup
                        ).map((muscle) => (
                          <option
                            className="text-black"
                            key={muscle}
                            value={muscle}
                          >
                            {MuscleLabel[muscle]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <select value={exercise.exercise.muscle}>
                        {getExercisesByMuscleGroup(
                          muscleGroupExercises,
                          exercise.exercise.muscleGroup
                        ).map((muscle) => (
                          <option
                            className="text-black"
                            key={muscle.id}
                            value={muscle.title}
                          >
                            {muscle.title}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div>FEEDBACK DE TREINO</div>
            <button className="px-4 py-2 text-white font-semibold bg-indigo rounded-md">
              SALVAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSplitsDetails;
