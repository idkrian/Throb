import { Router } from "express";
import { workoutController } from "./workout.controller.js";

const workoutRouter = Router();

workoutRouter.post("/", workoutController.createWorkout);

export default workoutRouter;
