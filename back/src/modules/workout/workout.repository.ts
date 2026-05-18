import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";
const prisma = new PrismaClient();

const workoutWithDetails = {
  workoutExerciseLogs: {
    include: {
      exercise: true,
      workoutSets: { orderBy: { setNumber: "asc" as const } },
    },
  },
  trainingSplit: true,
};

export const workoutRepository = {
  async createWorkout(data: CreateWorkoutRequestDto) {
    return await prisma.workout_sessions.create({
      data: {
        trainingSplitId: data.id,
        durationSeconds: data.durationSeconds,
        workoutExerciseLogs: {
          create: data.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            workoutSets: {
              create: exercise.sets.map((set) => ({
                setNumber: set.setNumber,
                reps: set.reps,
                weight: set.weight,
              })),
            },
          })),
        },
      },
    });
  },

  async getAllWorkouts() {
    return await prisma.workout_sessions.findMany({
      orderBy: { createdAt: "desc" },
      include: workoutWithDetails,
    });
  },

  async getWorkoutById(id: number) {
    return await prisma.workout_sessions.findUnique({
      where: { id },
      include: workoutWithDetails,
    });
  },

  async getMuscleStats() {
    const result = await prisma.$queryRaw<
      { muscle: string; totalSets: bigint }[]
    >`
      SELECT e."muscle", COUNT(ws.id)::bigint AS "totalSets"
      FROM workout_sessions wsess
      JOIN workout_exercise_logs wel ON wel."workoutSessionId" = wsess.id
      JOIN exercises e ON e.id = wel."exerciseId"
      JOIN workout_sets ws ON ws."workoutExerciseLogId" = wel.id
      GROUP BY e."muscle"
      ORDER BY "totalSets" DESC
    `;

    return result.map((row) => ({
      muscle: row.muscle,
      totalSets: Number(row.totalSets),
    }));
  },

  async getMuscleGroupStats() {
    const result = await prisma.$queryRaw<
      { muscleGroup: string; totalSets: bigint }[]
    >`
      SELECT e."muscleGroup", COUNT(ws.id)::bigint AS "totalSets"
      FROM workout_sessions wsess
      JOIN workout_exercise_logs wel ON wel."workoutSessionId" = wsess.id
      JOIN exercises e ON e.id = wel."exerciseId"
      JOIN workout_sets ws ON ws."workoutExerciseLogId" = wel.id
      GROUP BY e."muscleGroup"
      ORDER BY "totalSets" DESC
    `;

    return result.map((row) => ({
      muscleGroup: row.muscleGroup,
      totalSets: Number(row.totalSets),
    }));
  },

  async getSummaryStats() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalWorkouts, totalDuration, workoutsThisWeek, workoutsThisMonth] =
      await Promise.all([
        prisma.workout_sessions.count(),
        prisma.workout_sessions.aggregate({
          _sum: { durationSeconds: true },
        }),
        prisma.workout_sessions.count({
          where: { createdAt: { gte: startOfWeek } },
        }),
        prisma.workout_sessions.count({
          where: { createdAt: { gte: startOfMonth } },
        }),
      ]);

    return {
      totalWorkouts,
      totalDurationSeconds: totalDuration._sum.durationSeconds ?? 0,
      workoutsThisWeek,
      workoutsThisMonth,
    };
  },
};
