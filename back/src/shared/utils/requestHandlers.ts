import type { Response } from "express";
import { HttpStatus } from "../constants/http-status.js";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | undefined;
}

export const requestSuccessHandler = <T>(
  res: Response,
  data: T,
  message: string,
  statusCode: number = HttpStatus.OK
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const requestErrorHandler = (
  res: Response,
  message: string,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  error?: string
): void => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  res.status(statusCode).json(response);
};
