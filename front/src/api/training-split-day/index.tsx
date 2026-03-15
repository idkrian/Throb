import axios from "axios";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";

export const getTrainingSplitDays = async (): Promise<Record<number, TrainingSplitDto>> => {
    const response = await axios.get("http://localhost:3000/training-split-day");
    return response.data.data;
};
