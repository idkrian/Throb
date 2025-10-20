import type { ExerciseRequestDto } from "./exercise.dto.js";
import { exerciseRepository } from "./exercise.repository.js";

export const exerciseService = {
  async createExercise(data: ExerciseRequestDto) {
    return await exerciseRepository.createExercise(data);
  },
};
