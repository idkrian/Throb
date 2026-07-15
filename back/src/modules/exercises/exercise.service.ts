import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { exerciseRepository } from "./exercise.repository.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
import type { ExerciseStatsDto } from "./exercise.model.js";

export const exerciseService = {
  async createExercise(userId: number, data: CreateExerciseRequestDto) {
    return await exerciseRepository.createExercise(userId, data);
  },

  async getAllExercises(userId: number) {
    return await exerciseRepository.getAllExercises(userId);
  },

  async getAllExercisesByMuscleGroup(userId: number) {
    return await exerciseRepository.getAllExercisesByMuscleGroup(userId);
  },

  async updateExercise(
    userId: number,
    exerciseId: number,
    data: UpdateExerciseRequestDto,
  ) {
    return await exerciseRepository.updateExercise(userId, exerciseId, data);
  },

  async deleteExercise(userId: number, exerciseId: number, res: Response) {
    if (!exerciseId) {
      return requestErrorHandler(res, "Exercise ID not informed!");
    }
    return await exerciseRepository.deleteExercise(userId, exerciseId);
  },

  async getExerciseStats(
    userId: number,
    exerciseId: number,
  ): Promise<ExerciseStatsDto> {
    const logs = await exerciseRepository.getExerciseLogs(userId, exerciseId);

    if (logs.length === 0) {
      return { personalBest: null, lastPerformed: null, history: [] };
    }

    const lastPerformed = logs[0]!.workoutSession.createdAt.toISOString();

    const allSets = logs.flatMap((log) => log.workoutSets);

    const personalBest = allSets.reduce<ExerciseStatsDto["personalBest"]>(
      (best, set) => {
        const currentWeight = Number(set.weight);
        if (!best) return { weight: currentWeight, reps: set.reps };
        const bestWeight = best.weight ?? 0;
        if (
          currentWeight > bestWeight ||
          (currentWeight === bestWeight && set.reps > best.reps)
        ) {
          return { weight: currentWeight, reps: set.reps };
        }
        return best;
      },
      null,
    );

    const history = logs.map((log) => ({
      date: log.workoutSession.createdAt.toISOString(),
      sets: log.workoutSets.map((s) => ({
        setNumber: s.setNumber,
        reps: s.reps,
        weight: Number(s.weight),
      })),
    }));

    return { personalBest, lastPerformed, history };
  },
};
