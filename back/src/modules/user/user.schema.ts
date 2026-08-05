import z from "zod";
import { UnitPreference } from "../../../database/prisma/generated/prisma/index.js";
import { SUPPORTED_LOCALES } from "../../shared/constants/locales.js";

export const createUserSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.email().optional(),
  unitPreference: z.enum(UnitPreference).optional(),
});

export const updateMeSchema = z.object({
  name: z.string().max(255).optional(),
  unitPreference: z.enum(UnitPreference).optional(),
  languagePreference: z.enum(SUPPORTED_LOCALES).optional(),
});

export type CreateUserRequestDto = z.infer<typeof createUserSchema>;

export type UpdateUserRequestDto = z.infer<typeof updateUserSchema>;

export type UpdateMeRequestDto = z.infer<typeof updateMeSchema>;
