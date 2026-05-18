import { workoutRepository } from "./workout.repository.js";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";

export const workoutService = {
  async createWorkout(data: CreateWorkoutRequestDto) {
    return await workoutRepository.createWorkout(data);
  },

  async getAllWorkouts() {
    return await workoutRepository.getAllWorkouts();
  },

  async getWorkoutById(id: number) {
    return await workoutRepository.getWorkoutById(id);
  },

  async getMuscleStats() {
    return await workoutRepository.getMuscleStats();
  },

  async getMuscleGroupStats() {
    return await workoutRepository.getMuscleGroupStats();
  },

  async getSummaryStats() {
    return await workoutRepository.getSummaryStats();
  },
};
