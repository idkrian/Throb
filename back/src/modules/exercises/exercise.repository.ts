import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";

const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: CreateExerciseRequestDto) {
    return await prisma.exercises.create({ data });
  },

  async getAllExercises() {
    return await prisma.exercises.findMany();
  },

  async getAllExercisesByMuscleGroup() {
    const result = await prisma.$queryRaw`
      SELECT
        "muscleGroup",
        json_agg(json_build_object(
          'id', id,
          'title', title,
          'muscle', muscle
        )) AS items
      FROM "exercises"
      GROUP BY "muscleGroup"
    `;

    return result;
  },

  async updateExercise(exerciseId: number, data: UpdateExerciseRequestDto) {
    return await prisma.exercises.update({ where: { id: exerciseId }, data });
  },

  async deleteExercise(exerciseId: number) {
    return await prisma.exercises.delete({ where: { id: exerciseId } });
  },
};
