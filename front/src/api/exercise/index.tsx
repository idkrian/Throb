import axios from "axios";
import type { MuscleGroupItemsDto } from "@/dtos/muscle.dto";
import type {
  CreateExerciseDto,
  ExerciseDto,
  ExerciseStatsDto,
} from "@/dtos/exercise.dto";
const BASE_URL = `${import.meta.env.VITE_API_BASE}/exercise`;

export const getMuscleGroups = async (): Promise<MuscleGroupItemsDto[]> => {
  const response = await axios.get(`${BASE_URL}/muscle-groups`);
  return response.data.data;
};

export const getAllExercises = async (): Promise<ExerciseDto[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

export const createExercise = async (
  data: CreateExerciseDto,
): Promise<ExerciseDto> => {
  const response = await axios.post(BASE_URL, data);
  return response.data.data;
};

export const getExerciseStats = async (
  exerciseId: number,
): Promise<ExerciseStatsDto> => {
  const response = await axios.get(`${BASE_URL}/${exerciseId}/stats`);
  return response.data.data;
};
