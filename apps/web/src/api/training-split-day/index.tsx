import axios from "axios";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";

export interface CreateTrainingSplitDayPayload {
  dayOfWeek: number;
  trainingSplitId: number;
  restDay?: boolean;
}
export interface UpdateTrainingSplitDayPayload {
  dayOfWeek?: number;
  trainingSplitId?: number;
  restDay?: boolean;
}

const BASE_URL = `${import.meta.env.VITE_API_BASE}/training-split-day`;

export const getTrainingSplitDays = async (): Promise<TrainingSplitDayMap> => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

export const createTrainingSplitDay = async (
  payload: CreateTrainingSplitDayPayload,
): Promise<void> => {
  await axios.post(BASE_URL, payload);
};

export const updateTrainingSplitDay = async (
  id: number,
  payload: UpdateTrainingSplitDayPayload,
): Promise<void> => {
  await axios.patch(`${BASE_URL}/${id}`, payload);
};

export const deleteTrainingSplitDay = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
