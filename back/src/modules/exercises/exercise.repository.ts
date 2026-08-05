import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
import type { Locale } from "../../shared/constants/locales.js";
const prisma = new PrismaClient();

export const exerciseRepository = {
  async createExercise(userId: number, data: CreateExerciseRequestDto) {
    return await prisma.exercises.create({
      data: {
        title: data.title,
        muscleGroup: data.muscleGroup,
        muscle: data.muscle,
        description: data.description ?? null,
        userId,
      },
    });
  },

  async getAllExercises(userId: number, locale: Locale) {
    return await prisma.exercises.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      include: {
        translations: {
          where: { locale },
          select: { title: true, description: true },
        },
      },
    });
  },

  async getAllExercisesByMuscleGroup(userId: number, locale: Locale) {
    return await prisma.$queryRaw`
      SELECT
        e."muscleGroup",
        json_agg(json_build_object(
          'id', e.id,
          'title', COALESCE(t.title, e.title),
          'description', COALESCE(t.description, e.description),
          'muscle', e.muscle,
          'userId', e."userId"
        )) AS items
      FROM "exercises" e
      LEFT JOIN "exercise_translations" t
        ON t."exerciseId" = e.id AND t.locale = ${locale}
      WHERE e."userId" IS NULL OR e."userId" = ${userId}
      GROUP BY e."muscleGroup"
    `;
  },

  async updateExercise(
    userId: number,
    exerciseId: number,
    data: UpdateExerciseRequestDto,
  ) {
    return await prisma.exercises.update({
      where: { id: exerciseId, userId },
      data,
    });
  },

  async deleteExercise(userId: number, exerciseId: number) {
    return await prisma.exercises.delete({
      where: { id: exerciseId, userId },
    });
  },

  async getExerciseLogs(userId: number, exerciseId: number) {
    return await prisma.workout_exercise_logs.findMany({
      where: { exerciseId, workoutSession: { userId } },
      include: {
        workoutSession: { select: { createdAt: true } },
        workoutSets: {
          select: { setNumber: true, reps: true, weight: true, rpe: true },
          orderBy: { setNumber: "asc" },
        },
      },
      orderBy: { workoutSession: { createdAt: "desc" } },
    });
  },

  async getLogsForExercises(userId: number, exerciseIds: number[]) {
    return await prisma.workout_exercise_logs.findMany({
      where: { exerciseId: { in: exerciseIds }, workoutSession: { userId } },
      include: {
        workoutSession: { select: { createdAt: true } },
        workoutSets: {
          select: { setNumber: true, reps: true, weight: true, rpe: true },
          orderBy: { setNumber: "asc" },
        },
      },
      orderBy: { workoutSession: { createdAt: "desc" } },
    });
  },
};
