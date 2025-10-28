import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateWorkoutRequestDto,
  UpdateWorkoutRequestDto,
} from "./exercise.schema.js";

const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: CreateWorkoutRequestDto) {
    return await prisma.exercise.create({ data });
  },

  async getAllExercises() {
    return await prisma.exercise.findMany();
  },

  async updateExercise(exerciseId: number, data: UpdateWorkoutRequestDto) {
    return await prisma.exercise.update({ where: { id: exerciseId }, data });
  },

  async deleteExercise(exerciseId: number) {
    return await prisma.exercise.delete({ where: { id: exerciseId } });
  },
};
