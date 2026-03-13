import type { NextFunction, Request, Response } from "express";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";
import { workoutService } from "./workout.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";

export const workoutController = {
  async createWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const workout = await workoutService.createWorkout(data);
      requestSuccessHandler(res, workout, "Workout created succesfully!");
    } catch (error) {
      next(error);
    }
  },
};
