import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../constants/http-status.js";
import { requestErrorHandler } from "../utils/requestHandlers.js";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const requestErrorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    requestErrorHandler(res, error.message, error.statusCode);
    return;
  }

  console.error("Unexpected error:", error);
  requestErrorHandler(
    res,
    "Internal server error",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};
