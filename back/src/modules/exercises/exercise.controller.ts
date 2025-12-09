import type { Request, Response, NextFunction } from "express";
import { exerciseService } from "./exercise.service.js";
import {
  requestErrorHandler,
  requestSuccessHandler,
} from "../../shared/utils/requestHandlers.js";

export const exerciseController = {
  async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const exercise = await exerciseService.createExercise(req.body);
      requestSuccessHandler(res, exercise, "Exercise created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getAllExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await exerciseService.getAllExercises();

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
      const exercises = await exerciseService.getAllExercisesByMuscleGroup();

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
      const exerciseId = Number(req.params.id);

      const exercise = await exerciseService.updateExercise(
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
      const exerciseId = Number(req.params.id);

      const exercise = await exerciseService.deleteExercise(exerciseId, res);

      requestSuccessHandler(res, exercise, "Exercise deleted!");
    } catch (error) {
      next(error);
    }
  },
};
