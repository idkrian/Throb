import z from "zod";

export const createTrainingSplitDayScheme = z.object({
  dayOfWeek: z.number().int().positive().min(1),
  trainingSplitId: z.number().int().positive().min(1),
  restDay: z.boolean().default(false),
});

export type CreateTrainingSplitDayRequestDto = z.infer<
  typeof createTrainingSplitDayScheme
>;
