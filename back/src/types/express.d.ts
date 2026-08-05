import "express";
import type { Locale } from "../shared/constants/locales.js";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      locale: Locale;
    }
  }
}

export {};
