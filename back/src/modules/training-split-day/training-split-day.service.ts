import { trainingSplitDaysRepository } from "./training-split-day.repository.js";
import type { CreateTrainingSplitDayRequestDto } from "./training-split-day.scheme.js";

export const trainingSplitDaysService = {
  async createTrainingSplitDay(data: CreateTrainingSplitDayRequestDto) {
    return await trainingSplitDaysRepository.createTrainingSplitDay(data);
  },

  async getAllTrainingSplitDays() {
    return await trainingSplitDaysRepository.getAllTrainingSplitDays();
  },
};
