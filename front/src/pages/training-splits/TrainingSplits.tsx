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
    <div className="flex flex-col h-full gap-4 py-4 w-full justify-between">
      <div className="flex w-full flex-wrap justify-around gap-4">
        {trainingSplits &&
          trainingSplits.map((split) => (
            <TrainingSplitCard split={split} width={300} key={split.id} />
          ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center text-center p-2 bg-indigo rounded-sm cursor-pointer shadow-md inset-shadow-xl size-16 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          onClick={() => navigate("/training-splits/create")}
        >
          <FaPlus color="white" size={30} />
        </button>
      </div>
    </div>
  );
};

export default TrainingSplits;
