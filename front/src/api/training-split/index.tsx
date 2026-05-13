import axios from "axios";
import type { CreateTrainingSplitRequestDto, TrainingSplitDto } from "@/dtos/training-splits.dto";

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

export const createTrainingSplit = async (data: CreateTrainingSplitRequestDto): Promise<void> => {
    await axios.post("http://localhost:3000/training-split", data);
};

export const deleteTrainingSplit = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:3000/training-split/${id}`);
};