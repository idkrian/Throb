import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateWorkoutRequestDto,
  UpdateWorkoutRequestDto,
} from "./exercise.schema.js";

const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: CreateWorkoutRequestDto) {
    return await prisma.exercises.create({ data });
  },

  async getAllExercises() {
    return await prisma.exercises.findMany();
  },

  async updateExercise(exerciseId: number, data: UpdateWorkoutRequestDto) {
    return await prisma.exercises.update({ where: { id: exerciseId }, data });
  },

  async deleteExercise(exerciseId: number) {
    return await prisma.exercises.delete({ where: { id: exerciseId } });
  },
};
