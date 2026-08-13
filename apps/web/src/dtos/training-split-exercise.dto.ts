import type { ExerciseDto } from "./exercise.dto";

export interface TrainingSplitExerciseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  trainingSplitId: number;
  exerciseId: number;
  order: number;
  sets: number;
  reps: string;
  exercise: ExerciseDto;
}
