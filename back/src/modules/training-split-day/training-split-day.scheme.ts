import z from "zod";

export const createTrainingSplitDayScheme = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  trainingSplitId: z.number().int().positive().min(1),
  restDay: z.boolean().default(false),
});

export const updateTrainingSplitDayScheme = z.object({
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  trainingSplitId: z.number().int().positive().min(1).optional(),
  restDay: z.boolean().optional(),
});

export type CreateTrainingSplitDayRequestDto = z.infer<
  typeof createTrainingSplitDayScheme
>;

export type UpdateTrainingSplitDayRequestDto = z.infer<
  typeof updateTrainingSplitDayScheme
>;
