import { Router } from "express";
import { exerciseController } from "./exercise.controller.js";

const exerciseRouter = Router();

exerciseRouter.post("/", exerciseController.createExercise);
