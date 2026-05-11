import type { MuscleGroupType, MuscleType } from "./muscle.dto";

export interface ExerciseDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  muscleGroup: MuscleGroupType;
  muscle: MuscleType;
}

export interface ExerciseSetDto {
  setNumber: number;
  reps: number;
  weight: number | null;
}

export interface ExerciseHistoryEntryDto {
  date: string;
  sets: ExerciseSetDto[];
}

export interface ExerciseStatsDto {
  personalBest: { weight: number | null; reps: number } | null;
  lastPerformed: string | null;
  history: ExerciseHistoryEntryDto[];
}
