import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LuRotateCw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import { MuscleGroup, MusclesByGroup, type MuscleGroupType, type MuscleType } from "@/dtos/muscle.dto";
import { getTrainingSplitById, updateTrainingSplit } from "@/api/training-split";
import { getAllExercises } from "@/api/exercise";
import { summarizeSplit } from "@/utils";
import FeedbackModal from "@/components/modals/FeedbackModal";
import TrainingSplitHeader from "@/components/training-splits/TrainingSplitHeader";
import ExerciseListItem from "@/components/training-splits/ExerciseListItem";
import ExerciseEditPanel from "@/components/training-splits/ExerciseEditPanel";

const TrainingSplitsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TrainingSplitDto | null>(null);
  const [savedData, setSavedData] = useState<TrainingSplitDto | null>(null);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">("success");
  const [openFeedback, setOpenFeedback] = useState(false);

  useEffect(() => {
    if (id) {
      getTrainingSplitById(id).then((data) => {
        setFormData(data);
        setSavedData(data);
      });
    }
    getAllExercises().then(setExercises);
  }, [id]);

  const filterByMuscle = (muscle: MuscleType) =>
    exercises.filter((ex) => ex.muscle === muscle);

  const hasChanges = useMemo(() => {
    if (!formData || !savedData) return false;
    return JSON.stringify(formData) !== JSON.stringify(savedData);
  }, [formData, savedData]);

  const summary = useMemo(
    () => (formData ? summarizeSplit(formData) : null),
    [formData],
  );

  const orderedExercises = useMemo(
    () => (formData ? [...formData.exercises].sort((a, b) => a.order - b.order) : []),
    [formData],
  );

  const selectedExercise =
    selectedIndex !== null ? orderedExercises[selectedIndex] ?? null : null;

  const patchById = (targetId: number, patch: Partial<TrainingSplitExerciseDto>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      exercises: formData.exercises.map((ex) =>
        ex.id === targetId ? { ...ex, ...patch } : ex,
      ),
    });
  };

  const updateExercise = (orderedIndex: number, patch: Partial<TrainingSplitExerciseDto>) => {
    const target = orderedExercises[orderedIndex];
    if (!target) return;
    patchById(target.id, patch);
  };

  const moveExercise = (orderedIndex: number, direction: -1 | 1) => {
    if (!formData) return;
    const swapIndex = orderedIndex + direction;
    if (swapIndex < 0 || swapIndex >= orderedExercises.length) return;

    const a = orderedExercises[orderedIndex];
    const b = orderedExercises[swapIndex];
    setFormData({
      ...formData,
      exercises: formData.exercises.map((ex) => {
        if (ex.id === a.id) return { ...ex, order: b.order };
        if (ex.id === b.id) return { ...ex, order: a.order };
        return ex;
      }),
    });
    setSelectedIndex(swapIndex);
  };

  const deleteExercise = (orderedIndex: number) => {
    if (!formData) return;
    const target = orderedExercises[orderedIndex];
    const remaining = formData.exercises
      .filter((ex) => ex.id !== target.id)
      .sort((a, b) => a.order - b.order)
      .map((ex, i) => ({ ...ex, order: i + 1 }));
    setFormData({ ...formData, exercises: remaining });
    setSelectedIndex(null);
  };

  const addExercise = () => {
    if (!formData) return;
    const defaultMg: MuscleGroupType = MuscleGroup.CHEST;
    const defaultMuscle = MusclesByGroup[defaultMg][0].value;
    const defaultExercise = filterByMuscle(defaultMuscle)[0];
    if (!defaultExercise) return;

    const newEx: TrainingSplitExerciseDto = {
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
      trainingSplitId: formData.id,
      exerciseId: defaultExercise.id,
      order: formData.exercises.length + 1,
      sets: 3,
      reps: "10",
      exercise: defaultExercise,
    };

    setFormData({ ...formData, exercises: [...formData.exercises, newEx] });
    setSelectedIndex(formData.exercises.length);
  };

  const handleMuscleGroupChange = (orderedIndex: number, newMg: MuscleGroupType) => {
    const firstExercise = exercises.find((e) => e.muscleGroup === newMg);
    if (!firstExercise) return;
    updateExercise(orderedIndex, { exercise: firstExercise, exerciseId: firstExercise.id });
  };

  const handleMuscleChange = (orderedIndex: number, newMuscle: MuscleType) => {
    const firstExercise = filterByMuscle(newMuscle)[0];
    if (!firstExercise) return;
    updateExercise(orderedIndex, { exercise: firstExercise, exerciseId: firstExercise.id });
  };

  const handleExerciseChange = (orderedIndex: number, exerciseId: number) => {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;
    updateExercise(orderedIndex, { exercise: ex, exerciseId: ex.id });
  };

  const handleSave = async () => {
    if (!formData || !id) return;
    setSaving(true);
    try {
      await updateTrainingSplit(Number(id), formData);
      setSavedData(formData);
      setFeedbackStatus("success");
    } catch {
      setFeedbackStatus("error");
    } finally {
      setSaving(false);
      setOpenFeedback(true);
    }
  };

  if (!formData) {
    return (
      <div className="flex w-full h-full items-center justify-center text-white">
        <LuRotateCw size={36} className="animate-spin text-indigo" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-0 text-white overflow-hidden">
      <FeedbackModal
        open={openFeedback}
        status={feedbackStatus}
        description={
          feedbackStatus === "success"
            ? "Training split updated successfully."
            : "There was an error updating the training split."
        }
        onClose={() => setOpenFeedback(false)}
      />

      <TrainingSplitHeader
        formData={formData}
        editingTitle={editingTitle}
        hasChanges={hasChanges}
        saving={saving}
        summary={summary}
        onTitleChange={(title) => setFormData({ ...formData, title })}
        onEditingTitleToggle={setEditingTitle}
        onBack={() => navigate("/training-splits")}
        onStart={() => navigate(`/workout/${id}`)}
        onSave={handleSave}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-w-0 overflow-y-auto p-6 gap-3">
          {orderedExercises.map((ex, index) => (
            <ExerciseListItem
              key={ex.id}
              ex={ex}
              index={index}
              isSelected={selectedIndex === index}
              isFirst={index === 0}
              isLast={index === orderedExercises.length - 1}
              onSelect={() => setSelectedIndex(selectedIndex === index ? null : index)}
              onMoveUp={() => moveExercise(index, -1)}
              onMoveDown={() => moveExercise(index, 1)}
              onDelete={() => deleteExercise(index)}
            />
          ))}

          <button
            onClick={addExercise}
            className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/10 hover:border-indigo/50 text-lightGrey/50 hover:text-indigo transition-all cursor-pointer"
          >
            <FaPlus size={12} />
            <span className="text-sm font-medium">Add exercise</span>
          </button>
        </div>

        <aside
          className={`flex flex-col bg-darkGrey border-l border-mediumGrey shrink-0 transition-[width] duration-300 overflow-hidden ${
            selectedIndex !== null ? "w-80" : "w-0"
          }`}
        >
          <div className="w-80 flex flex-col h-full">
            {selectedExercise && selectedIndex !== null && (
              <ExerciseEditPanel
                exercise={selectedExercise}
                exercises={exercises}
                onClose={() => setSelectedIndex(null)}
                onUpdate={(patch) => updateExercise(selectedIndex, patch)}
                onDelete={() => deleteExercise(selectedIndex)}
                onMuscleGroupChange={(mg) => handleMuscleGroupChange(selectedIndex, mg)}
                onMuscleChange={(muscle) => handleMuscleChange(selectedIndex, muscle)}
                onExerciseChange={(exerciseId) => handleExerciseChange(selectedIndex, exerciseId)}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrainingSplitsDetails;
