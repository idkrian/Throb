import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";
const prisma = new PrismaClient();

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
};
