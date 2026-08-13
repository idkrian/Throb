import z from "zod";

export const createBodyWeightScheme = z.object({
  weight: z.number().positive().max(500),
});

export type CreateBodyWeightRequestDto = z.infer<typeof createBodyWeightScheme>;
