import axios from "axios";
import type {
  CreateTrainingSplitRequestDto,
  TrainingSplitDto,
} from "@/dtos/training-splits.dto";
const BASE_URL = `${import.meta.env.VITE_API_BASE}/training-split`;

export const getAllUserTrainingSplits = async (
  userId: number,
): Promise<TrainingSplitDto[]> => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data.data;
};

export const getTrainingSplitById = async (
  id: string,
): Promise<TrainingSplitDto> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};

export const updateTrainingSplit = async (
  id: number,
  data: TrainingSplitDto,
): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, data);
};

export const createTrainingSplit = async (
  data: CreateTrainingSplitRequestDto,
): Promise<void> => {
  await axios.post(BASE_URL, data);
};

export const deleteTrainingSplit = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
