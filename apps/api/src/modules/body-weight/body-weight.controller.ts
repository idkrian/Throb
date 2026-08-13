import type { NextFunction, Request, Response } from "express";
import { bodyWeightService } from "./body-weight.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";

export const bodyWeightController = {
  async createBodyWeight(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const bodyWeight = await bodyWeightService.createBodyWeight(
        userId,
        req.body,
      );
      requestSuccessHandler(res, bodyWeight, "Body weight logged successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getBodyWeights(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const bodyWeights = await bodyWeightService.getBodyWeights(userId);
      requestSuccessHandler(
        res,
        bodyWeights,
        "Body weights retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getLatestBodyWeight(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const bodyWeight = await bodyWeightService.getLatestBodyWeight(userId);
      requestSuccessHandler(
        res,
        bodyWeight,
        "Latest body weight retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
