import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../shared/middlewares/validate-request.js";
import { loginSchema } from "./auth.schema.js";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), authController.login);

export default authRouter;
