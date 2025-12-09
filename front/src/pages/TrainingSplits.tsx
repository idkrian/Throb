import axios from "axios";
import { useEffect, useState } from "react";
import type { TrainingSplitDto } from "../dtos/training-splits.dto";

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
          trainingSplits.map((split) => (
            <div key={split.id} className="w-80 shadow-2xl">
              <div className="bg-indigo w-full rounded-t-md p-1">
                <p className="text-xl text-white font-bold text-center">
                  {split.title}
                </p>
              </div>
              <div className="bg-mediumGrey p-4 group rounded-b-md">
                {split.exercises.map((exercise) => (
                  <div key={exercise.id} className="mb-2 text-white">
                    <p className="font-bold text-md">
                      {exercise.exercise.title}
                    </p>
                    <p className="text-sm hidden group-hover:block">
                      Sets: {exercise.sets} | Reps: {exercise.reps} | Order:{" "}
                      {exercise.order}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrainingSplits;
