import type {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/index.js";

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
