import z from "zod";
import {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/index.js";

export const createExerciseSchema = z.object({
  title: z.string().max(255),
  muscleGroup: z.enum(MuscleGroup),
  muscle: z.enum(Muscle),
});

export type CreateWorkoutRequestDto = z.infer<typeof createExerciseSchema>;

export type UpdateWorkoutRequestDto = z.infer<typeof createExerciseSchema>;
