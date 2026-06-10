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
  async createWorkout(data: CreateWorkoutRequestDto) {
    return await workoutRepository.createWorkout(data);
  },

  async getAllWorkouts() {
    return await workoutRepository.getAllWorkouts();
  },

  async getWorkoutById(id: number) {
    return await workoutRepository.getWorkoutById(id);
  },

  async getMuscleStats(data: GetMuscleStatsRequestDto) {
    return await workoutRepository.getMuscleStats(resolveStartDate(data.period));
  },

  async getMuscleGroupStats(data: GetMuscleStatsRequestDto) {
    return await workoutRepository.getMuscleGroupStats(
      resolveStartDate(data.period),
    );
  },

  async getSummaryStats() {
    return await workoutRepository.getSummaryStats();
  },
};
