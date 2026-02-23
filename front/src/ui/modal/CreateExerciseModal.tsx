import axios from "axios";
import { MusclesByGroup } from "../../dtos/muscle.dto";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

type Props = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  muscle: string;
};
interface FormData {
  muscleGroup: string;
  muscle: string;
  title: string;
  description: string;
}

const CreateExerciseModal = ({ open, onClose, onSuccess, muscle }: Props) => {
  const imagePath = new URL(
    `../../assets/muscles/${muscle.toUpperCase()}.png`,
    import.meta.url,
  ).href;
  const musclesByGroup =
    MusclesByGroup[String(muscle.toUpperCase()) as keyof typeof MusclesByGroup];

  const [formData, setFormData] = useState<FormData>({
    muscleGroup: muscle.toUpperCase(),
    muscle: musclesByGroup[0].value,
    title: "",
    description: "",
  });
  const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">(
    "error",
  );
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);

  const createExercise = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/exercise", data);
      setFeedbackStatus("success");
      setOpenFeedbackModal(true);
    } catch (error) {
      console.log(error);
      setFeedbackStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <FeedbackModal
        open={openFeedbackModal}
        status={feedbackStatus}
        description={
          feedbackStatus === "success"
            ? "Training split updated successfully."
            : "There was an error updating the training split."
        }
        onClose={() => {
          setOpenFeedbackModal(false);
          onClose?.();
          onSuccess?.();
        }}
      />
      <div
        className="flex flex-col bg-mediumGrey rounded-lg p-6 w-120 shadow-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose
          className="cursor-pointer self-end"
          size={20}
          onClick={onClose}
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-bold text-center capitalize">
            Create {muscle} Exercise
          </h2>
          <img
            src={imagePath}
            alt=""
            className="w-32 flex group-hover:hidden"
          />
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <label htmlFor="muscle" className="text-xl font-bold">
              Muscle
            </label>
            <select
              id="muscle"
              defaultValue={musclesByGroup[0].value}
              className="bg-darkGrey border-indigo w-full px-2 py-1 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, muscle: e.target.value })
              }
            >
              {Object.values(musclesByGroup).map((value) => (
                <option key={value.value} value={value.value}>
                  {value.text}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <label htmlFor="title" className="text-xl font-bold">
              Title
            </label>
            <input
              type="text"
              className="bg-darkGrey border-indigo w-full px-2 py-1 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <label htmlFor="description" className="text-xl font-bold">
              Exercise Description
            </label>
            <textarea
              id="description"
              className="bg-darkGrey border-indigo w-full px-2 py-1 rounded-md h-24 max-h-48"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          {onClose && (
            <button
              className="w-full rounded bg-indigo px-3 py-2 text-sm font-semibold cursor-pointer"
              onClick={() => createExercise(formData)}
            >
              Create Exercise
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateExerciseModal;
