import type { NextFunction, Request, Response } from "express";
import { resolveLocale } from "../constants/locales.js";

export const localeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.locale = resolveLocale(req.get("Accept-Language"));
  next();
};
