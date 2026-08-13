import { userRepository } from "../user/user.repository.js";
import type { LoginRequestDto } from "./auth.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../shared/config/env.js";
import { AppError } from "../../shared/middlewares/request-error-handler.js";

export const authService = {
  async login(data: LoginRequestDto) {
    const user = await userRepository.getUserByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { password, ...publicUser } = user;

    return { ...publicUser, token };
  },
};
