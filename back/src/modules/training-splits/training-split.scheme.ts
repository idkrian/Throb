import z from "zod";

export const trainingSplitExerciseSchema = z.object({
  exerciseId: z.number().int().positive().min(1),
  reps: z.string().max(12),
  sets: z.number().int().positive().min(1),
  order: z.number().int().positive().min(1),
});

export const createTrainingSplitScheme = z.object({
  title: z.string().max(255),
  exercises: z.array(trainingSplitExerciseSchema).min(1),
});

export const updateTrainingSplitScheme = z.object({
  title: z.string().max(255),
  exercises: z.array(trainingSplitExerciseSchema).min(1),
});

export type CreateTrainingSplitRequestDto = z.infer<
  typeof createTrainingSplitScheme
>;

export type UpdateTrainingSplitRequestDto = z.infer<
  typeof updateTrainingSplitScheme
>;
