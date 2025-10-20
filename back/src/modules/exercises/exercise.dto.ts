import type {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/index.js";

export interface ExerciseRequestDto {
  title: string;
  muscle_group: MuscleGroup;
  muscle: Muscle;
}
