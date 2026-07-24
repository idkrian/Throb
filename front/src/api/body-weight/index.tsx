import axios from "axios";
import type {
  BodyWeightDto,
  CreateBodyWeightDto,
} from "@/dtos/body-weight.dto";

const BASE_URL = `${import.meta.env.VITE_API_BASE}/body-weight`;

export const createBodyWeight = async (
  data: CreateBodyWeightDto,
): Promise<BodyWeightDto> => {
  const response = await axios.post(BASE_URL, data);
  return response.data.data;
};

export const getBodyWeights = async (): Promise<BodyWeightDto[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

export const getLatestBodyWeight = async (): Promise<BodyWeightDto | null> => {
  const response = await axios.get(`${BASE_URL}/latest`);
  return response.data.data;
};
