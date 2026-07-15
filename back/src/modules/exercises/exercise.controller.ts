import type { Request, Response, NextFunction } from "express";
import { exerciseService } from "./exercise.service.js";
import {
  requestErrorHandler,
  requestSuccessHandler,
} from "../../shared/utils/requestHandlers.js";

export const exerciseController = {
  async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const exercise = await exerciseService.createExercise(userId, req.body);
      requestSuccessHandler(res, exercise, "Exercise created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getAllExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const exercises = await exerciseService.getAllExercises(userId);

      requestSuccessHandler(
        res,
        exercises,
        "Exercises retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllExercisesByMuscleGroup(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.userId);
      const exercises =
        await exerciseService.getAllExercisesByMuscleGroup(userId);

      requestSuccessHandler(
        res,
        exercises,
        "Exercises retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async updateExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const exerciseId = Number(req.params.id);

      const exercise = await exerciseService.updateExercise(
        userId,
        exerciseId,
        req.body,
      );

      requestSuccessHandler(res, exercise, "Exercise updated successfully!");
    } catch (error) {
      next(error);
    }
  },

  async deleteExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const exerciseId = Number(req.params.id);

      const exercise = await exerciseService.deleteExercise(
        userId,
        exerciseId,
        res,
      );

      requestSuccessHandler(res, exercise, "Exercise deleted!");
    } catch (error) {
      next(error);
    }
  },

  async getExerciseStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.userId);
      const exerciseId = Number(req.params.id);

      const stats = await exerciseService.getExerciseStats(userId, exerciseId);

      requestSuccessHandler(res, stats, "Exercise stats retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },
};
