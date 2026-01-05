import type { NextFunction, Request, Response } from "express";
import { trainingSplitService } from "./training-split.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitRepository } from "./training-split.repository.js";

export const trainingSplitController = {
  async createTrainingSplit(req: Request, res: Response, next: NextFunction) {
    try {
      const trainingSplit = await trainingSplitService.createTrainingSplit(
        req.body
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Split created succesfully!"
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllTrainingSplits(req: Request, res: Response, next: NextFunction) {
    try {
      const trainingSplits = await trainingSplitService.getAllTrainingSplits();

      requestSuccessHandler(
        res,
        trainingSplits,
        "Training Splits retrieved successfully!"
      );
    } catch (error) {
      next(error);
    }
  },

  async getTrainingSplitById(req: Request, res: Response, next: NextFunction) {
    try {
      const trainingSplitId = Number(req.params.id);
      const trainingSplit = await trainingSplitService.getTrainingSplitById(
        trainingSplitId
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Splits retrieved successfully!"
      );
    } catch (error) {
      next(error);
    }
  },

  async updateTrainingSplit(req: Request, res: Response, next: NextFunction) {
    try {
      const trainingSplitId = Number(req.params.id);
      const trainingSplit = await trainingSplitService.updateTrainingSplit(
        trainingSplitId,
        req.body,
        res
      );

      requestSuccessHandler(
        res,
        trainingSplit,
        "Training Split Updated Succesfully!"
      );
    } catch (error) {
      next(error);
    }
  },
};
