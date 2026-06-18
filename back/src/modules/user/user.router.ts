import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequest(createUserSchema),
  userController.createUser,
);

userRouter.get("/", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.put(
  "/:id",
  validateRequest(updateUserSchema),
  userController.updateUser,
);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
