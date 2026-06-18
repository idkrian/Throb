import z from "zod";

export const createUserSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.email().optional(),
});

export type CreateUserRequestDto = z.infer<typeof createUserSchema>;

export type UpdateUserRequestDto = z.infer<typeof updateUserSchema>;
