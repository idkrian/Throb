import axios from "axios";
import { useEffect, useState } from "react";
import { LuBicepsFlexed } from "react-icons/lu";
import { useParams } from "react-router";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import {
  MuscleGroupLabel,
  MuscleLabel,
  type MuscleGroupItemsDto,
  type MuscleType,
} from "../../dtos/muscle.dto";
import { getMusclesByMuscleGroup } from "../../utils";
import type { ExerciseDto } from "../../dtos/exercise.dto";

const TrainingSplitsDetails = () => {
  const [formData, setFormData] = useState<TrainingSplitDto | null>(null);
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
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
    const fetchExercises = async () => {
      const response = await axios.get(`http://localhost:3000/exercise`);
      setExercises(response.data.data);
    };
    fetchMuscles();
    fetchTrainingSplit();
    fetchExercises();
  }, [params.id]);

  const updateTrainingExercise = (
    prop: string,
    value: string,
    index: number
  ) => {
    if (!formData) return;

    const updatedExercises = formData.exercises.map((ex, i) => {
      if (i !== index) return ex;

      if (prop === "exerciseId") {
        return { ...ex, exerciseId: Number(value) };
      }

      // campos de nível raiz
      if (prop === "order" || prop === "sets") {
        return { ...ex, [prop]: Number(value) };
      }
      if (prop === "reps") {
        return { ...ex, reps: value };
      }

      // campos dentro de exercise
      return {
        ...ex,
        exercise: {
          ...ex.exercise,
          [prop]: value,
        },
      };
    });

    setFormData({ ...formData, exercises: updatedExercises });
  };

  const updateTrainingSplit = async (
    trainingSplitId: number,
    data: TrainingSplitDto
  ) => {
    try {
      await axios.put(
        `http://localhost:3000/training-split/${trainingSplitId}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filterExercisesByMuscle = (muscle: MuscleType) => {
    return exercises.filter((ex) => ex.muscle === muscle);
  };

  return (
    <div className="flex flex-col w-full h-full">
      {formData && (
        <div className="flex flex-col w-full h-full items-center gap-8">
          <div className="flex flex-col items-center justify-center gap-2 w-96">
            <LuBicepsFlexed size={100} className="text-indigo" />
            <h1 className="text-center text-white font-bold text-5xl bg-transparent">
              {formData.title}
            </h1>
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
                        onChange={(e) => {
                          updateTrainingExercise(
                            "order",
                            e.target.value,
                            index
                          );
                        }}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => {
                          updateTrainingExercise("sets", e.target.value, index);
                        }}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        value={exercise.reps}
                        onChange={(e) => {
                          updateTrainingExercise("reps", e.target.value, index);
                        }}
                        className="w-12 text-center bg-transparent"
                      />
                    </td>
                    <td className="py-2">
                      <select
                        value={exercise.exercise.muscleGroup}
                        onChange={(e) => {
                          updateTrainingExercise(
                            "muscleGroup",
                            e.target.value,
                            index
                          );
                        }}
                        className="w-5/6"
                      >
                        {muscleGroupExercises.map((mg) => (
                          <option
                            key={mg.muscleGroup}
                            value={mg.muscleGroup}
                            className="text-black"
                          >
                            {MuscleGroupLabel[mg.muscleGroup]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <select
                        value={exercise.exercise.muscle}
                        onChange={(e) => {
                          updateTrainingExercise(
                            "muscle",
                            e.target.value,
                            index
                          );
                        }}
                        className="w-5/6"
                      >
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
                      <select
                        value={String(
                          exercise.exerciseId ?? exercise.exercise.id
                        )}
                        onChange={(e) => {
                          const selectedId = Number(e.target.value);
                          updateTrainingExercise(
                            "exerciseId",
                            String(selectedId),
                            index
                          );
                        }}
                        className="w-5/6"
                      >
                        {filterExercisesByMuscle(exercise.exercise.muscle).map(
                          (exOpt) => (
                            <option
                              className="text-black"
                              key={exOpt.id}
                              value={String(exOpt.id)}
                            >
                              {exOpt.title}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full">
            <div>FEEDBACK DE TREINO</div>
            <button
              className="cursor-pointer px-4 py-2 ml-auto text-white font-semibold bg-indigo rounded-md"
              onClick={() => updateTrainingSplit(Number(params.id), formData)}
            >
              SALVAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSplitsDetails;
