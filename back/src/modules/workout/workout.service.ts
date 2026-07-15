import { lastWeek, subtractMonths } from "../../shared/utils/date.js";
import { workoutRepository } from "./workout.repository.js";
import type {
  CreateWorkoutRequestDto,
  GetMuscleStatsRequestDto,
} from "./workout.scheme.js";

function resolveStartDate(period: GetMuscleStatsRequestDto["period"]): Date {
  const today = new Date();

  const periodMap: Record<string, () => Date> = {
    week: () => lastWeek(today),
    month: () => subtractMonths(today, 1),
    trimester: () => subtractMonths(today, 3),
    semester: () => subtractMonths(today, 6),
  };

  const computeStartDate = periodMap[period];
  if (!computeStartDate) throw new Error("Invalid period");

  return computeStartDate();
}

export const workoutService = {
  async createWorkout(userId: number, data: CreateWorkoutRequestDto) {
    return await workoutRepository.createWorkout(userId, data);
  },

  async getAllWorkouts(userId: number) {
    return await workoutRepository.getAllWorkouts(userId);
  },

  async getWorkoutById(userId: number, id: number) {
    return await workoutRepository.getWorkoutById(userId, id);
  },

  async getMuscleStats(userId: number, data: GetMuscleStatsRequestDto) {
    return await workoutRepository.getMuscleStats(
      userId,
      resolveStartDate(data.period),
    );
  },

  async getMuscleGroupStats(userId: number, data: GetMuscleStatsRequestDto) {
    return await workoutRepository.getMuscleGroupStats(
      userId,
      resolveStartDate(data.period),
    );
  },

  async getSummaryStats(userId: number) {
    return await workoutRepository.getSummaryStats(userId);
  },
};
