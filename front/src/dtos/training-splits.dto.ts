import type { ExerciseDto } from "./exercise.dto";

export interface TrainingSplitDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  exercises: ExerciseDto[];
}
