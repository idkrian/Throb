import axios from "axios";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";

export const getAllTrainingSplits = async (): Promise<TrainingSplitDto[]> => {
    const response = await axios.get("http://localhost:3000/training-split");
    return response.data.data;
};

export const getTrainingSplitById = async (id: string): Promise<TrainingSplitDto> => {
    const response = await axios.get(`http://localhost:3000/training-split/${id}`);
    return response.data.data;
};

export const updateTrainingSplit = async (id: number, data: TrainingSplitDto): Promise<void> => {
    await axios.put(`http://localhost:3000/training-split/${id}`, data);
};
