import axios from "axios";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface WorkoutExercisePayload {
  exerciseId: number;
  sets: WorkoutSet[];
}

export interface CreateWorkoutPayload {
  id: number;
  title: string;
  durationSeconds: number;
  exercises: WorkoutExercisePayload[];
}

export interface MuscleGroupStat {
  muscleGroup: string;
  totalSets: number;
}

export interface MuscleStat {
  muscle: string;
  totalSets: number;
}

export interface WorkoutSummaryStats {
  totalWorkouts: number;
  totalDurationSeconds: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
}

export type MuscleStatsPeriod = "week" | "month" | "trimester" | "semester";

const BASE_URL = `${import.meta.env.VITE_API_BASE}/workout`;

export const createWorkout = async (
  payload: CreateWorkoutPayload,
): Promise<void> => {
  await axios.post(BASE_URL, payload);
};

export const getAllWorkouts = async (): Promise<WorkoutSessionDto[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

export const getWorkoutById = async (
  id: number,
): Promise<WorkoutSessionDto> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};

export const getWorkoutMuscleGroupsStats = async (
  period: MuscleStatsPeriod,
): Promise<MuscleGroupStat[]> => {
  const response = await axios.get(`${BASE_URL}/stats/muscle-groups/${period}`);
  return response.data.data;
};

export const getWorkoutMuscleStats = async (
  period: MuscleStatsPeriod,
): Promise<MuscleStat[]> => {
  const response = await axios.get(`${BASE_URL}/stats/muscles/${period}`);
  return response.data.data;
};

export const getWorkoutSummaryStats =
  async (): Promise<WorkoutSummaryStats> => {
    const response = await axios.get(`${BASE_URL}/stats/summary`);
    return response.data.data;
  };
