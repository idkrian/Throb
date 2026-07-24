import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const bodyWeightRepository = {
  async upsertTodayBodyWeight(userId: number, weight: number) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const existing = await prisma.body_weights.findFirst({
      where: { userId, createdAt: { gte: start, lte: end } },
    });

    if (existing) {
      return await prisma.body_weights.update({
        where: { id: existing.id },
        data: { weight },
      });
    }

    return await prisma.body_weights.create({
      data: { userId, weight },
    });
  },

  async getBodyWeights(userId: number) {
    return await prisma.body_weights.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  },

  async getLatestBodyWeight(userId: number) {
    return await prisma.body_weights.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
