import type { NextFunction, Request, Response } from "express";
import { workoutService } from "./workout.service.js";
import {
  requestSuccessHandler,
  requestErrorHandler,
} from "../../shared/utils/requestHandlers.js";
import { HttpStatus } from "../../shared/constants/http-status.js";

export const workoutController = {
  async createWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const workout = await workoutService.createWorkout(data);
      requestSuccessHandler(res, workout, "Workout created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getAllWorkouts(req: Request, res: Response, next: NextFunction) {
    try {
      const workouts = await workoutService.getAllWorkouts();
      requestSuccessHandler(res, workouts, "Workouts retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getWorkoutById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const workout = await workoutService.getWorkoutById(id);

      if (!workout) {
        return requestErrorHandler(
          res,
          "Workout not found",
          HttpStatus.NOT_FOUND,
        );
      }

      requestSuccessHandler(res, workout, "Workout retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getMuscleGroupStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await workoutService.getMuscleGroupStats();
      requestSuccessHandler(
        res,
        stats,
        "Muscle group stats retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },

  async getSummaryStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await workoutService.getSummaryStats();
      requestSuccessHandler(
        res,
        stats,
        "Summary stats retrieved successfully!",
      );
    } catch (error) {
      next(error);
    }
  },
};
