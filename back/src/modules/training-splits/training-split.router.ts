import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createTrainingSplitScheme } from "./training-split.scheme.js";
import { trainingSplitController } from "./training-split.controller.js";

const trainingSplitRouter = Router();

trainingSplitRouter.post(
  "/",
  validateRequest(createTrainingSplitScheme),
  trainingSplitController.createTrainingSplit
);

trainingSplitRouter.get("/", trainingSplitController.getAllTrainingSplits);

export default trainingSplitRouter;
