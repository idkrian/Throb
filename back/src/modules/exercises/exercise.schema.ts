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

export const updateExerciseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().max(255),
  muscleGroup: z.enum(MuscleGroup),
  muscle: z.enum(Muscle),
});

export type CreateExerciseRequestDto = z.infer<typeof createExerciseSchema>;

export type UpdateExerciseRequestDto = z.infer<typeof updateExerciseSchema>;
