import type { NextFunction, Request, Response } from "express";
import {
  requestErrorHandler,
  requestSuccessHandler,
} from "../../shared/utils/requestHandlers.js";
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
};
