import axios from "axios";
import { useEffect, useState } from "react";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import TrainingSplitCard from "../../components/TrainingSplitCard";

const TrainingSplits = () => {
  const [trainingSplits, setTrainingSplits] = useState<TrainingSplitDto[]>([]);
  useEffect(() => {
    const fetchTrainingSplits = async () => {
      const trainingSplitsData = await axios.get(
        "http://localhost:3000/training-split"
      );
      const data = await trainingSplitsData.data.data;

      setTrainingSplits(data);
    };
    fetchTrainingSplits();
  }, []);
  return (
    <div>
      <div>
        {trainingSplits &&
          trainingSplits.map((split) => <TrainingSplitCard split={split} />)}
      </div>
    </div>
  );
};

export default TrainingSplits;
