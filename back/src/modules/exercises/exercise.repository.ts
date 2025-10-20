import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type { ExerciseRequestDto } from "./exercise.dto.js";

const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: ExerciseRequestDto) {
    return await prisma.exercise.create({ data });
  },
};
