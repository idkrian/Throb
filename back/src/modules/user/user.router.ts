import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";
import { authenticate } from "../../shared/middlewares/authenticate.js";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequest(createUserSchema),
  userController.createUser,
);

userRouter.get("/", authenticate, userController.getAllUsers);

userRouter.get("/:id", authenticate, userController.getUserById);

userRouter.put(
  "/:id",
  authenticate,
  validateRequest(updateUserSchema),
  userController.updateUser,
);

userRouter.delete("/:id", authenticate, userController.deleteUser);

export default userRouter;
