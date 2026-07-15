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

trainingSplitRouter.get("/", trainingSplitController.getAllUserTrainingSplits);

trainingSplitRouter.get(
  "/:id",
  trainingSplitController.getUserTrainingSplitById,
);

trainingSplitRouter.put("/:id", trainingSplitController.updateUserTrainingSplit);

trainingSplitRouter.delete(
  "/:id",
  trainingSplitController.deleteUserTrainingSplit,
);

export default trainingSplitRouter;
