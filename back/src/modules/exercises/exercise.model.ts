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
