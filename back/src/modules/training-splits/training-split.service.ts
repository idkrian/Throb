import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitRepository } from "./training-split.repository.js";
import type {
  CreateTrainingSplitRequestDto,
  UpdateTrainingSplitRequestDto,
} from "./training-split.scheme.js";

export const trainingSplitService = {
  async createTrainingSplit(data: CreateTrainingSplitRequestDto) {
    return await trainingSplitRepository.createTrainingSplit(data);
  },

  async getAllTrainingSplits() {
    return await trainingSplitRepository.getAllTrainingSplits();
  },

  async getTrainingSplitById(trainingSplitId: number) {
    return await trainingSplitRepository.getTrainingSplitById(trainingSplitId);
  },

  async updateTrainingSplit(
    trainingSplitId: number,
    data: UpdateTrainingSplitRequestDto,
    res: Response
  ) {
    if (!trainingSplitId) {
      requestErrorHandler(res, "Training Split ID not informed!");
    }

    return await trainingSplitRepository.updateTrainingSplit(
      trainingSplitId,
      data
    );
  },
};
