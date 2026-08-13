import type { MuscleGroupType, MuscleType } from "./muscle.dto";

export interface ExerciseDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string | null;
  muscleGroup: MuscleGroupType;
  muscle: MuscleType;
  userId: number | null;
}

export interface CreateExerciseDto {
  muscleGroup: MuscleGroupType;
  muscle: MuscleType;
  title: string;
  description: string;
}

export interface ExerciseSetDto {
  setNumber: number;
  reps: number;
  weight: number;
  rpe: number | null;
}

export interface ExerciseHistoryEntryDto {
  date: string;
  maxWeight: number;
  totalVolume: number;
  estimatedOneRepMax: number;
  sets: ExerciseSetDto[];
}

export interface ExercisePersonalBestDto {
  weight: number;
  reps: number;
  estimatedOneRepMax: number;
  date: string;
}

export interface ExerciseStatsDto {
  personalBest: ExercisePersonalBestDto | null;
  bestWeight: number | null;
  lastPerformed: string | null;
  history: ExerciseHistoryEntryDto[];
}

export interface ExercisePerformanceDto {
  exerciseId: number;
  lastPerformed: { date: string; sets: ExerciseSetDto[] } | null;
  personalBest: ExercisePersonalBestDto | null;
  bestWeight: number | null;
}
