import { Router } from "express";
import { workoutController } from "./workout.controller.js";

const workoutRouter = Router();

workoutRouter.get("/stats/muscles/:period", workoutController.getMuscleStats);
workoutRouter.get(
  "/stats/muscle-groups/:period",
  workoutController.getMuscleGroupStats,
);
workoutRouter.get("/stats/summary", workoutController.getSummaryStats);
workoutRouter.get("/:id", workoutController.getWorkoutById);
workoutRouter.get("/", workoutController.getAllWorkouts);
workoutRouter.post("/", workoutController.createWorkout);

export default workoutRouter;
