import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

export const bodyWeightRepository = {
  async createBodyWeight(userId: number, weight: number) {
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
