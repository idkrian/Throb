import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type { CreateWorkoutRequestDto } from "./exercise.schema.js";

const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: CreateWorkoutRequestDto) {
    return await prisma.exercise.create({ data });
  },
};
