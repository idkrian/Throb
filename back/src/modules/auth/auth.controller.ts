import type { Request, Response, NextFunction } from "express";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";
import { authService } from "./auth.service.js";

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.login(req.body);
      requestSuccessHandler(res, user, "User logged in successfully!");
    } catch (error) {
      next(error);
    }
  },
};
