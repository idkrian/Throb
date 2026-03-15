import { useEffect, useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import { useParams } from "react-router";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import {
  MuscleGroup,
  MuscleGroupLabel,
  MusclesByGroup,
  type MuscleGroupType,
  type MuscleType,
} from "../../dtos/muscle.dto";
import type { ExerciseDto } from "../../dtos/exercise.dto";
import Button from "../../components/ui/Button";
import FeedbackModal from "../../components/modals/FeedbackModal";
import { getTrainingSplitById, updateTrainingSplit } from "@/api/training-split";
import { getAllExercises } from "@/api/exercise";

const TrainingSplitsDetails = () => {
  const params = useParams();

  const [formData, setFormData] = useState<TrainingSplitDto | null>(null);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">(
    "error",
  );
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);

  useEffect(() => {
    if (params.id) {
      getTrainingSplitById(params.id).then(setFormData);
    }
    getAllExercises().then(setExercises);
  }, [params.id]);

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

      if (prop === "order" || prop === "sets") {
        return { ...ex, [prop]: Number(value) };
      }
      if (prop === "reps") {
        return { ...ex, reps: value };
      }

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

  const handleUpdateTrainingSplit = async (
    trainingSplitId: number,
    data: TrainingSplitDto,
  ) => {
    setLoading(true);
    try {
      await updateTrainingSplit(trainingSplitId, data);
      setFeedbackStatus("success");
      setLoading(false);
      setOpenFeedbackModal(true);
    } catch (error) {
      console.log(error);
      setFeedbackStatus("error");
    }
  };

  const filterExercisesByMuscle = (muscle: MuscleType) => {
    return exercises.filter((ex) => ex.muscle === muscle);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <FeedbackModal
        open={openFeedbackModal}
        status={feedbackStatus}
        description={
          feedbackStatus === "success"
            ? "Training split updated successfully."
            : "There was an error updating the training split."
        }
        onClose={() => setOpenFeedbackModal(false)}
      />
      {formData && (
        <div className="flex flex-col w-full h-full items-center gap-8">
          <div className="flex flex-col items-center justify-center gap-2 w-96">
            <LuClipboardList size={100} className="text-indigo" />
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
                            index,
                          );
                        }}
                        className="w-5/6"
                      >
                        {(Object.values(MuscleGroup) as MuscleGroupType[]).map((mg) => (
                          <option
                            key={mg}
                            value={mg}
                            className="text-black">
                            {MuscleGroupLabel[mg]}
                          </option>
                        ),
                        )}
                      </select>
                    </td>
                    <td className="py-2">
                      <select
                        onChange={(e) => {
                          updateTrainingExercise(
                            "muscle",
                            e.target.value,
                            index,
                          );
                        }}
                        className="w-5/6"
                      >
                        {/* {getMusclesByMuscleGroup(
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
                        ))} */}
                        {Object.values(MusclesByGroup[exercise.exercise.muscleGroup as keyof typeof MusclesByGroup]).map((value) => (
                          <option key={value.value} value={value.value}>
                            {value.text}
                          </option>
                        ),
                        )}
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
                        {filterExercisesByMuscle(exercise.exercise.muscle).map(
                          (exOpt) => (
                            <option
                              className="text-black"
                              key={exOpt.id}
                              value={String(exOpt.id)}
                            >
                              {exOpt.title}
                            </option>
                          ),
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex self-end">
            <Button
              label="SALVAR"
              onClick={() => handleUpdateTrainingSplit(Number(params.id), formData)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSplitsDetails;
