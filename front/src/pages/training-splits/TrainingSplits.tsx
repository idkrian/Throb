import { useEffect, useState } from "react";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import TrainingSplitCard from "../../components/TrainingSplitCard";
import { getAllTrainingSplits } from "@/api/training-split";

const TrainingSplits = () => {
  const [trainingSplits, setTrainingSplits] = useState<TrainingSplitDto[]>([]);
  useEffect(() => {
    const fetchTrainingSplits = async () => {
      const trainingSplitsData = await getAllTrainingSplits();
      setTrainingSplits(trainingSplitsData);
    };
    fetchTrainingSplits();
  }, []);
  return (
    <div>
      <div>
        {trainingSplits &&
          trainingSplits.map((split) => (
            <TrainingSplitCard split={split} width={300} />
          ))}
      </div>
    </div>
  );
};

export default TrainingSplits;
