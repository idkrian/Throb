import { Router } from "express";
import { bodyWeightController } from "./body-weight.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createBodyWeightScheme } from "./body-weight.scheme.js";

const bodyWeightRouter = Router();

bodyWeightRouter.post(
  "/",
  validateRequest(createBodyWeightScheme),
  bodyWeightController.createBodyWeight,
);

bodyWeightRouter.get("/latest", bodyWeightController.getLatestBodyWeight);

bodyWeightRouter.get("/", bodyWeightController.getBodyWeights);

export default bodyWeightRouter;
