import type { NextFunction, Request, Response } from "express";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { trainingSplitDaysService } from "./training-split-day.service.js";

export const trainingSplitDayController = {
  async createTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const trainingSplitDay =
        await trainingSplitDaysService.createTrainingSplitDay(req.body);

      requestSuccessHandler(
        res,
        trainingSplitDay,
        "Training Splits Day created successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllTrainingSplitDays(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const trainingSplitDays =
        await trainingSplitDaysService.getAllTrainingSplitDays();

      requestSuccessHandler(
        res,
        trainingSplitDays,
        "Training Splits Days retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async updateTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      const trainingSplitDay =
        await trainingSplitDaysService.updateTrainingSplitDay(id, req.body);
      requestSuccessHandler(
        res,
        trainingSplitDay,
        "Training Splits Day updated successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async deleteTrainingSplitDay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      await trainingSplitDaysService.deleteTrainingSplitDay(id);
      requestSuccessHandler(
        res,
        null,
        "Training Splits Day deleted successfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
