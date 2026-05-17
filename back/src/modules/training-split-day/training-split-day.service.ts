import { trainingSplitDaysRepository } from "./training-split-day.repository.js";
import type {
  CreateTrainingSplitDayRequestDto,
  UpdateTrainingSplitDayRequestDto,
} from "./training-split-day.scheme.js";

export const trainingSplitDaysService = {
  async createTrainingSplitDay(data: CreateTrainingSplitDayRequestDto) {
    return await trainingSplitDaysRepository.createTrainingSplitDay(data);
  },

  async getAllTrainingSplitDays() {
    return await trainingSplitDaysRepository.getAllTrainingSplitDays();
  },

  async updateTrainingSplitDay(
    id: number,
    data: UpdateTrainingSplitDayRequestDto,
  ) {
    return await trainingSplitDaysRepository.updateTrainingSplitDay(id, data);
  },

  async deleteTrainingSplitDay(id: number) {
    return await trainingSplitDaysRepository.deleteTrainingSplitDay(id);
  },
};
