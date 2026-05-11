import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(data: CreateExerciseRequestDto) {
    return await prisma.exercises.create({
      data: {
        title: data.title,
        muscleGroup: data.muscleGroup,
        muscle: data.muscle,
        description: data.description ?? null,
      },
    });
  },

  async getAllExercises() {
    return await prisma.exercises.findMany();
  },

  async getAllExercisesByMuscleGroup() {
    return await prisma.$queryRaw`
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
  },

  async updateExercise(exerciseId: number, data: UpdateExerciseRequestDto) {
    return await prisma.exercises.update({ where: { id: exerciseId }, data });
  },

  async deleteExercise(exerciseId: number) {
    return await prisma.exercises.delete({ where: { id: exerciseId } });
  },

  async getExerciseLogs(exerciseId: number) {
    return await prisma.workout_exercise_logs.findMany({
      where: { exerciseId },
      include: {
        workoutSession: { select: { createdAt: true } },
        workoutSets: {
          select: { setNumber: true, reps: true, weight: true },
          orderBy: { setNumber: "asc" },
        },
      },
      orderBy: { workoutSession: { createdAt: "desc" } },
    });
  },
};
