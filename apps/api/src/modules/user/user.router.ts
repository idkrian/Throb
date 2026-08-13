import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createUserSchema, updateMeSchema } from "./user.schema.js";
import { authenticate } from "../../shared/middlewares/authenticate.js";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequest(createUserSchema),
  userController.createUser,
);

userRouter.get("/me", authenticate, userController.getMe);

userRouter.patch(
  "/me",
  authenticate,
  validateRequest(updateMeSchema),
  userController.updateMe,
);

export default userRouter;
