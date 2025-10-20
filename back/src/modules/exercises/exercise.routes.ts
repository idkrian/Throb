import { Router } from "express";
import { exerciseController } from "./exercise.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createExerciseSchema } from "./exercise.schema.js";

const exerciseRouter = Router();

exerciseRouter.post(
  "/",
  validateRequest(createExerciseSchema),
  exerciseController.createExercise
);

export default exerciseRouter;
