import Button from "@/components/ui/Button";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import {
    MuscleGroupLabel,
    MuscleLabel,
    type MuscleGroupItemsDto,
    type MuscleGroupType,
    type MuscleType,
} from "@/dtos/muscle.dto";
import type { CreateTrainingSplitRequestDto } from "@/dtos/training-splits.dto";
import { getMusclesByMuscleGroup } from "@/utils";
import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { getMuscleGroups, getAllExercises } from "@/api/exercise";
import { LuClipboardList } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import { createTrainingSplit } from "@/api/training-split";
import FeedbackModal from "@/components/modals/FeedbackModal";
import { useNavigate } from "react-router";

interface ExerciseFormItem {
    exerciseId: number;
    sets: number;
    reps: string;
    order: number;
    muscleGroup: MuscleGroupType;
    muscle: MuscleType;
}

const TrainingSplitCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("New Training Split");
    const [exerciseRows, setExerciseRows] = useState<ExerciseFormItem[]>([]);
    const [muscleGroupExercises, setMuscleGroupExercises] = useState<MuscleGroupItemsDto[]>([]);
    const [exercises, setExercises] = useState<ExerciseDto[]>([]);
    const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">("error");
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
    const [animatingRows, setAnimatingRows] = useState<Set<number>>(new Set());

    const filterExercisesByMuscle = (muscle: MuscleType) =>
        exercises.filter((ex) => ex.muscle === muscle);

    const updateExercise = (index: number, updates: Partial<ExerciseFormItem>) => {
        setExerciseRows((rows) =>
            rows.map((row, i) => (i === index ? { ...row, ...updates } : row)),
        );
    };

    const handleMuscleGroupChange = (index: number, newMg: MuscleGroupType) => {
        const muscles = getMusclesByMuscleGroup(muscleGroupExercises, newMg);
        const newMuscle = muscles[0];
        const newExerciseId = newMuscle ? (filterExercisesByMuscle(newMuscle)[0]?.id ?? 0) : 0;
        updateExercise(index, { muscleGroup: newMg, muscle: newMuscle, exerciseId: newExerciseId });
    };

    const handleMuscleChange = (index: number, newMuscle: MuscleType) => {
        const newExerciseId = filterExercisesByMuscle(newMuscle)[0]?.id ?? 0;
        updateExercise(index, { muscle: newMuscle, exerciseId: newExerciseId });
    };

    const addExercise = () => {
        const defaultMg = (muscleGroupExercises[0]?.muscleGroup ?? "CHEST") as MuscleGroupType;
        const muscles = getMusclesByMuscleGroup(muscleGroupExercises, defaultMg);
        const defaultMuscle = muscles[0] ?? ("CHEST_GENERAL" as MuscleType);
        const defaultExerciseId = filterExercisesByMuscle(defaultMuscle)[0]?.id ?? 0;

        const newRow: ExerciseFormItem = {
            exerciseId: defaultExerciseId,
            order: exerciseRows.length + 1,
            sets: 3,
            reps: "10",
            muscleGroup: defaultMg,
            muscle: defaultMuscle,
        };

        const newIndex = exerciseRows.length;
        setExerciseRows((rows) => [...rows, newRow]);
        setAnimatingRows((prev) => new Set([...prev, newIndex]));
        setTimeout(() => {
            setAnimatingRows((prev) => {
                const next = new Set(prev);
                next.delete(newIndex);
                return next;
            });
        }, 50);
    };

    const deleteExercise = (index: number) => {
        setExerciseRows((rows) =>
            rows
                .filter((_, i) => i !== index)
                .map((row, i) => ({ ...row, order: i + 1 })),
        );
    };

    const submitTrainingSplit = async () => {
        const payload: CreateTrainingSplitRequestDto = {
            title,
            exercises: exerciseRows.map(({ exerciseId, sets, reps, order }) => ({
                exerciseId,
                sets,
                reps,
                order,
            })),
        };

        try {
            await createTrainingSplit(payload);
            setFeedbackStatus("success");
            setOpenFeedbackModal(true);
        } catch (error) {
            console.log(error);
            setFeedbackStatus("error");
            setOpenFeedbackModal(true);
        }
    };

    useEffect(() => {
        getMuscleGroups().then(setMuscleGroupExercises);
        getAllExercises().then(setExercises);
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center gap-12">
            <FeedbackModal
                open={openFeedbackModal}
                status={feedbackStatus}
                description={
                    feedbackStatus === "success"
                        ? "Training split created successfully."
                        : "There was an error creating the training split."
                }
                onClose={() => {
                    setOpenFeedbackModal(false);
                    if (feedbackStatus === "success") navigate("/training-splits");
                }}
            />
            <div className="flex flex-col items-center justify-center gap-2 w-96">
                <LuClipboardList size={80} className="text-indigo" />
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Training Split Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md bg-darkGrey border-indigo text-white text-center text-3xl font-bold"
                    />
                    <TbPencil size={20} className="text-white" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col w-full">
                    <table className="table-auto w-full text-white text-center rounded-2xl">
                        <thead className="bg-mediumGrey rounded-2xl">
                            <tr>
                                <th className="py-2 px-4 rounded-l-md">Order</th>
                                <th className="py-2 px-4">Sets</th>
                                <th className="py-2 px-4">Reps</th>
                                <th className="py-2 px-4">Muscle Group</th>
                                <th className="py-2 px-4">Muscle</th>
                                <th className="py-2 px-4 rounded-r-md">Exercise</th>
                                <th className="py-2 px-4 rounded-r-md"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exerciseRows.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`gap-2 transition-all duration-300 ease-out ${animatingRows.has(index)
                                        ? "opacity-0 -translate-y-2"
                                        : "opacity-100 translate-y-0"
                                        }`}
                                >
                                    <td className="py-2">
                                        <input
                                            type="number"
                                            value={row.order}
                                            onChange={(e) =>
                                                updateExercise(index, { order: Number(e.target.value) })
                                            }
                                            className="w-12 text-center bg-transparent"
                                        />
                                    </td>
                                    <td className="py-2">
                                        <input
                                            type="number"
                                            value={row.sets}
                                            onChange={(e) =>
                                                updateExercise(index, { sets: Number(e.target.value) })
                                            }
                                            className="w-12 text-center bg-transparent"
                                        />
                                    </td>
                                    <td className="py-2">
                                        <input
                                            type="number"
                                            value={row.reps}
                                            onChange={(e) =>
                                                updateExercise(index, { reps: e.target.value })
                                            }
                                            className="w-12 text-center bg-transparent"
                                        />
                                    </td>
                                    <td className="py-2">
                                        <select
                                            value={row.muscleGroup}
                                            onChange={(e) =>
                                                handleMuscleGroupChange(index, e.target.value as MuscleGroupType)
                                            }
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
                                            value={row.muscle}
                                            onChange={(e) =>
                                                handleMuscleChange(index, e.target.value as MuscleType)
                                            }
                                            className="w-5/6"
                                        >
                                            {getMusclesByMuscleGroup(
                                                muscleGroupExercises,
                                                row.muscleGroup,
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
                                            value={String(row.exerciseId)}
                                            onChange={(e) =>
                                                updateExercise(index, {
                                                    exerciseId: Number(e.target.value),
                                                })
                                            }
                                            className="w-5/6"
                                        >
                                            {filterExercisesByMuscle(row.muscle).map((exOpt) => (
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
                                            onClick={() => deleteExercise(index)}
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
            <div className="self-end">
                <Button label="Salvar" onClick={submitTrainingSplit} />
            </div>
        </div>
    );
};

export default TrainingSplitCreate;
