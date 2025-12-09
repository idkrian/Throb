import type { MuscleDto } from "./muscle.dto";

export interface ExerciseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  trainingSplitId: number;
  exerciseId: number;
  order: number;
  sets: number;
  reps: string;
  exercise: MuscleDto;
}
