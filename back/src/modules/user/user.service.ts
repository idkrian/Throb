import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { userRepository } from "./user.repository.js";
import type {
  CreateUserRequestDto,
  UpdateMeRequestDto,
  UpdateUserRequestDto,
} from "./user.schema.js";
import bcrypt from "bcrypt";

export const userService = {
  async createUser(data: CreateUserRequestDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  },

  async getAllUsers() {
    return await userRepository.getAllUsers();
  },

  async getUserById(userId: number) {
    return await userRepository.getUserById(userId);
  },

  async updateUser(userId: number, data: UpdateUserRequestDto) {
    return await userRepository.updateUser(userId, data);
  },

  async getMe(userId: number) {
    return await userRepository.getUserById(userId);
  },

  async updateMe(userId: number, data: UpdateMeRequestDto) {
    return await userRepository.updateMe(userId, data);
  },

  async deleteUser(userId: number, res: Response) {
    if (!userId) {
      return requestErrorHandler(res, "User ID not informed!");
    }
    return await userRepository.deleteUser(userId);
  },
};
