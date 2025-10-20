import type { Request, Response, NextFunction } from "express";
import { exerciseService } from "./exercise.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";

export const exerciseController = {
  async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const exercise = await exerciseService.createExercise(req.body);
      requestSuccessHandler(res, exercise, "Exercise created!");
    } catch (error) {
      next(error);
    }
  },
};
