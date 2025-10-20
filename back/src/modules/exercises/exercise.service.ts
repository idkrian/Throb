import { exerciseRepository } from "./exercise.repository.js";
import type { CreateWorkoutRequestDto } from "./exercise.schema.js";

export const exerciseService = {
  async createExercise(data: CreateWorkoutRequestDto) {
    return await exerciseRepository.createExercise(data);
  },
};
