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

  async getAllExercisesByMuscleGroup() {
    // return await prisma.exercises.groupBy({
    //   by: ["muscleGroup"],
    // });
    //
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

  async updateExercise(exerciseId: number, data: UpdateWorkoutRequestDto) {
    return await prisma.exercises.update({ where: { id: exerciseId }, data });
  },

  async deleteExercise(exerciseId: number) {
    return await prisma.exercises.delete({ where: { id: exerciseId } });
  },
};
