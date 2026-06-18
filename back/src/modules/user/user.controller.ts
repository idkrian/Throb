import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";
import { requestSuccessHandler } from "../../shared/utils/requestHandlers.js";

export const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      requestSuccessHandler(res, user, "User created successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      requestSuccessHandler(res, users, "Users retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await userService.getUserById(userId);
      requestSuccessHandler(res, user, "User retrieved successfully!");
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await userService.updateUser(userId, req.body);
      requestSuccessHandler(res, user, "User updated successfully!");
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await userService.deleteUser(userId, res);
      requestSuccessHandler(res, user, "User deleted!");
    } catch (error) {
      next(error);
    }
  },
};
