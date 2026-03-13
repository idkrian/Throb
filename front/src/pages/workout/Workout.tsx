import Stopwatch from "@/components/Stopwatch";
import Button from "@/components/ui/Button";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import {
  MuscleGroupLabel,
  MuscleLabel,
  type MuscleGroupItemsDto,
  type MuscleType,
} from "@/dtos/muscle.dto";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import { getMusclesByMuscleGroup } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router";

const Workout = () => {
  const params = useParams();
  const [formData, setFormData] = useState<TrainingSplitDto | null>(null);
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    MuscleGroupItemsDto[]
  >([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [durationSeconds, setDurationSeconds] = useState(0);

  const updateTrainingExercise = (
    prop: string,
    value: string,
    index: number,
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
  const filterExercisesByMuscle = (muscle: MuscleType) => {
    return exercises.filter((ex) => ex.muscle === muscle);
  };

  const addExercise = () => {
    if (!formData) return;

    const defaultMuscleGroup = muscleGroupExercises[0]?.muscleGroup ?? "CHEST";
    const defaultMuscles = getMusclesByMuscleGroup(
      muscleGroupExercises,
      defaultMuscleGroup,
    );
    const defaultMuscle = defaultMuscles[0];
    const defaultExercise = defaultMuscle
      ? filterExercisesByMuscle(defaultMuscle)[0]
      : undefined;

    const newExercise: TrainingSplitExerciseDto = {
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      trainingSplitId: formData.id,
      exerciseId: defaultExercise?.id ?? 0,
      order: formData.exercises.length + 1,
      sets: 3,
      reps: "10",
      exercise: defaultExercise ?? {
        id: 0,
        createdAt: "",
        updatedAt: "",
        title: "",
        muscleGroup: defaultMuscleGroup,
        muscle: defaultMuscle ?? ("CHEST_GENERAL" as MuscleType),
      },
    };

    setFormData({
      ...formData,
      exercises: [...formData.exercises, newExercise],
    });
  };

  const removeExercise = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

  const submitWorkout = async () => {
    if (!formData) return;

    const payload = {
      id: formData.id,
      title: formData.title,
      durationSeconds, // tempo do Stopwatch (segundos)
      exercises: formData.exercises.map((exercise) => ({
        exerciseId: exercise.exerciseId ?? exercise.exercise.id,
        sets: Array.from({ length: exercise.sets ?? 3 }, (_, i) => ({
          setNumber: i + 1,
          reps: Number(exercise.reps) || 10,
          weight: 0,
        })),
      })),
    };
    console.log(payload);

    try {
      await axios.post(`http://localhost:3000/workout`, payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrainingSplit = async () => {
      const response = await axios.get(
        `http://localhost:3000/training-split/${params.splitId}`,
      );
      setFormData(response.data.data);
    };
    const fetchMuscles = async () => {
      const response = await axios.get(
        "http://localhost:3000/exercise/muscle-groups",
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
  }, [params.splitId]);

  return (
    <div className="flex flex-col h-full justify-around">
      <div className="flex h-full items-center justify-around">
        <div>
          <Stopwatch
            durationSeconds={durationSeconds}
            setDurationSeconds={setDurationSeconds}
          />
        </div>
        {formData && (
          <div className="flex flex-col items-center justify-center gap-4">
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
                    <th className="p-2 rounded-r-md"></th>
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
                              index,
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
                            updateTrainingExercise(
                              "sets",
                              e.target.value,
                              index,
                            );
                          }}
                          className="w-12 text-center bg-transparent"
                        />
                      </td>
                      <td className="py-2">
                        <input
                          type="text"
                          value={exercise.reps}
                          onChange={(e) => {
                            updateTrainingExercise(
                              "reps",
                              e.target.value,
                              index,
                            );
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
                              index,
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
                              index,
                            );
                          }}
                          className="w-5/6"
                        >
                          {getMusclesByMuscleGroup(
                            muscleGroupExercises,
                            exercise.exercise.muscleGroup,
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
                            exercise.exerciseId ?? exercise.exercise.id,
                          )}
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            updateTrainingExercise(
                              "exerciseId",
                              String(selectedId),
                              index,
                            );
                          }}
                          className="w-5/6"
                        >
                          {filterExercisesByMuscle(
                            exercise.exercise.muscle,
                          ).map((exOpt) => (
                            <option
                              className="text-black"
                              key={exOpt.id}
                              value={String(exOpt.id)}
                            >
                              {exOpt.title}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => removeExercise(index)}
                          className="flex items-center justify-center p-1.5 bg-red-500 rounded-sm cursor-pointer shadow-md"
                        >
                          <FaRegTrashCan color="white" size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={addExercise}
              className="flex items-center justify-center text-center p-2 bg-indigo rounded-sm cursor-pointer inset-shadow-xl"
            >
              <FaPlus color="white" />
            </button>
          </div>
        )}
      </div>
      <div className="self-end">
        <Button label="Salvar" onClick={submitWorkout} />
      </div>
    </div>
  );
};

export default Workout;
