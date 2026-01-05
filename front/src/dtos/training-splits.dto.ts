import type { TrainingSplitExerciseDto } from "./training-split-exercise.dto";

export interface TrainingSplitDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  exercises: TrainingSplitExerciseDto[];
}
