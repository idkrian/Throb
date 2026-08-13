import type {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/client.js";

export interface Exercise {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  muscleGroup: MuscleGroup;
  muscle: Muscle;
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
