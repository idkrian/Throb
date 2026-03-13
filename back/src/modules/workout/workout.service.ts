import { workoutRepository } from "./workout.repository.js";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";

export const workoutService = {
  async createWorkout(data: CreateWorkoutRequestDto) {
    return await workoutRepository.createWorkout(data);
  },
};
