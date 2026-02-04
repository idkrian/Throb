import { Router } from "express";
import { trainingSplitDayController } from "./training-split-day.controller.js";
import { createTrainingSplitDayScheme } from "./training-split-day.scheme.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";

const trainingSplitDayRouter = Router();

trainingSplitDayRouter.post(
  "/",
  validateRequest(createTrainingSplitDayScheme),
  trainingSplitDayController.createTrainingSplitDay,
);

trainingSplitDayRouter.get(
  "/",
  trainingSplitDayController.getAllTrainingSplitDays,
);

export default trainingSplitDayRouter;
