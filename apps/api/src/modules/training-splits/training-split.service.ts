import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitRepository } from "./training-split.repository.js";
import type {
  CreateTrainingSplitRequestDto,
  UpdateTrainingSplitRequestDto,
} from "./training-split.scheme.js";

export const trainingSplitService = {
  async createTrainingSplit(
    userId: number,
    data: CreateTrainingSplitRequestDto,
  ) {
    return await trainingSplitRepository.createTrainingSplit(userId, data);
  },

  async getAllUserTrainingSplits(userId: number) {
    return await trainingSplitRepository.getAllUserTrainingSplits(userId);
  },

  async getUserTrainingSplitById(userId: number, trainingSplitId: number) {
    return await trainingSplitRepository.getUserTrainingSplitById(
      userId,
      trainingSplitId,
    );
  },

  async updateUserTrainingSplit(
    userId: number,
    trainingSplitId: number,
    data: UpdateTrainingSplitRequestDto,
    res: Response,
  ) {
    if (!trainingSplitId) {
      requestErrorHandler(res, "Training Split ID not informed!");
    }

    return await trainingSplitRepository.updateUserTrainingSplit(
      userId,
      trainingSplitId,
      data,
    );
  },

  async deleteUserTrainingSplit(
    userId: number,
    trainingSplitId: number,
    res: Response,
  ) {
    if (!trainingSplitId) {
      requestErrorHandler(res, "Training Split ID not informed!");
    }

    return await trainingSplitRepository.deleteUserTrainingSplit(
      userId,
      trainingSplitId,
    );
  },
};
