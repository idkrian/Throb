import type { Request, Response } from "express";

export const exerciseController = {
  async createExercise(req: Request, res: Response) {
    console.log("criado");
  },
};
