import z from "zod";
import {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/index.js";

export const createExerciseSchema = z.object({
  title: z.string().max(255),
  muscle_group: z.enum(MuscleGroup),
  muscle: z.enum(Muscle),
});

export type CreateWorkoutRequestDto = z.infer<typeof createExerciseSchema>;

export type UpdateWorkoutRequestDto = z.infer<typeof createExerciseSchema>;
