import { useEffect, useState } from "react";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import TrainingSplitCard from "../../components/TrainingSplitCard";
import { getAllTrainingSplits } from "@/api/training-split";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const TrainingSplits = () => {
  const [trainingSplits, setTrainingSplits] = useState<TrainingSplitDto[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrainingSplits = async () => {
      const trainingSplitsData = await getAllTrainingSplits();
      setTrainingSplits(trainingSplitsData);
    };
    fetchTrainingSplits();
  }, []);
  return (
    <div className="flex gap-4">
      <div>
        {trainingSplits &&
          trainingSplits.map((split) => (
            <TrainingSplitCard split={split} width={300} />
          ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center text-center p-2 bg-indigo rounded-sm cursor-pointer inset-shadow-xl size-22"
          onClick={() => navigate("/training-splits/create")}
        >
          <FaPlus color="white" size={40} />
        </button>
      </div>
    </div>
  );
};

export default TrainingSplits;
