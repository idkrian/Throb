import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type { CreateTrainingSplitDayRequestDto } from "./training-split-day.scheme.js";
const prisma = new PrismaClient();

export const trainingSplitDaysRepository = {
  async createTrainingSplitDay(data: CreateTrainingSplitDayRequestDto) {
    return await prisma.training_split_days.create({ data });
  },

  async getAllTrainingSplitDays() {
    const trainingSplitDays = await prisma.training_split_days.findMany({
      include: {
        trainingSplit: {
          include: { exercises: { include: { exercise: true } } },
        },
      },
    });

    return trainingSplitDays.reduce(
      (acc, split) => {
        acc[split.dayOfWeek] = split.trainingSplit;
        return acc;
      },
      {} as Record<number, any>,
    );
  },
};
