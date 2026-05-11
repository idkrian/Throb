import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { exerciseRepository } from "./exercise.repository.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
import type { ExerciseStatsDto } from "./exercise.model.js";

export const exerciseService = {
  async createExercise(data: CreateExerciseRequestDto) {
    return await exerciseRepository.createExercise(data);
  },

  async getAllExercises() {
    return await exerciseRepository.getAllExercises();
  },

  async getAllExercisesByMuscleGroup() {
    return await exerciseRepository.getAllExercisesByMuscleGroup();
  },

  async updateExercise(exerciseId: number, data: UpdateExerciseRequestDto) {
    return await exerciseRepository.updateExercise(exerciseId, data);
  },

  async deleteExercise(exerciseId: number, res: Response) {
    if (!exerciseId) {
      return requestErrorHandler(res, "Exercise ID not informed!");
    }
    return await exerciseRepository.deleteExercise(exerciseId);
  },

  async getExerciseStats(exerciseId: number): Promise<ExerciseStatsDto> {
    const logs = await exerciseRepository.getExerciseLogs(exerciseId);

    if (logs.length === 0) {
      return { personalBest: null, lastPerformed: null, history: [] };
    }

    const lastPerformed = logs[0]!.workoutSession.createdAt.toISOString();

    const allSets = logs.flatMap((log) => log.workoutSets);

    const personalBest = allSets.reduce<ExerciseStatsDto["personalBest"]>(
      (best, set) => {
        if (!best) return { weight: set.weight, reps: set.reps };
        const currentWeight = set.weight ?? 0;
        const bestWeight = best.weight ?? 0;
        if (
          currentWeight > bestWeight ||
          (currentWeight === bestWeight && set.reps > best.reps)
        ) {
          return { weight: set.weight, reps: set.reps };
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
        weight: s.weight,
      })),
    }));

    return { personalBest, lastPerformed, history };
  },
};
