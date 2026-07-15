import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { requestErrorHandler } from "../utils/requestHandlers.js";
import { env } from "../config/env.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      requestErrorHandler(
        res,
        "Authorization header is missing or malformed",
        401,
      );
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token!, env.JWT_SECRET);

    req.userId = (decoded as { userId: string }).userId;

    next();
  } catch (error) {
    requestErrorHandler(res, "Invalid token", 401);
  }
};
