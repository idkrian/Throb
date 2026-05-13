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

trainingSplitRouter.get("/:id", trainingSplitController.getTrainingSplitById);

trainingSplitRouter.put("/:id", trainingSplitController.updateTrainingSplit);

trainingSplitRouter.delete("/:id", trainingSplitController.deleteTrainingSplit);

export default trainingSplitRouter;
