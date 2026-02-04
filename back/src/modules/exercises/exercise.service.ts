import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { exerciseRepository } from "./exercise.repository.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";

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
};
