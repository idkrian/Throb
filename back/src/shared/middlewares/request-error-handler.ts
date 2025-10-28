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

  const prismaError = error as any;

  if (prismaError.code) {
    switch (prismaError.code) {
      case "P2025":
        requestErrorHandler(res, "Record not found", HttpStatus.NOT_FOUND);
        return;
      case "P2002":
        requestErrorHandler(
          res,
          "This record already exists and you can't duplicate",
          HttpStatus.CONFLICT
        );
        return;
      case "P2003":
        requestErrorHandler(
          res,
          "Related record not found",
          HttpStatus.BAD_REQUEST
        );
        return;
    }
  }

  console.error("Unexpected error:", error);
  requestErrorHandler(
    res,
    "Internal server error",
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};
