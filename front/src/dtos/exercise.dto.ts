import type { MuscleGroupType, MuscleType } from "./muscle.dto";

export interface ExerciseDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  muscleGroup: MuscleGroupType;
  muscle: MuscleType;
}
