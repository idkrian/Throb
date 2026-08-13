import { Router } from "express";
import { trainingSplitDayController } from "./training-split-day.controller.js";
import {
  createTrainingSplitDayScheme,
  updateTrainingSplitDayScheme,
} from "./training-split-day.scheme.js";
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

trainingSplitDayRouter.patch(
  "/:id",
  validateRequest(updateTrainingSplitDayScheme),
  trainingSplitDayController.updateTrainingSplitDay,
);

trainingSplitDayRouter.delete(
  "/:id",
  trainingSplitDayController.deleteTrainingSplitDay,
);

export default trainingSplitDayRouter;
