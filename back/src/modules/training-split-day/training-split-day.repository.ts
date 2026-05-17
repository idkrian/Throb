import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateTrainingSplitDayRequestDto,
  UpdateTrainingSplitDayRequestDto,
} from "./training-split-day.scheme.js";
const prisma = new PrismaClient();

export const trainingSplitDaysRepository = {
  async createTrainingSplitDay(data: CreateTrainingSplitDayRequestDto) {
    return await prisma.$transaction(async (tx) => {
      await tx.training_split_days.deleteMany({
        where: { dayOfWeek: data.dayOfWeek },
      });
      return await tx.training_split_days.create({ data });
    });
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
      (acc, day) => {
        acc[day.dayOfWeek] = {
          id: day.id,
          restDay: day.restDay,
          trainingSplit: day.trainingSplit,
        };
        return acc;
      },
      {} as Record<number, any>,
    );
  },

  async updateTrainingSplitDay(
    id: number,
    data: UpdateTrainingSplitDayRequestDto,
  ) {
    const updateData: {
      dayOfWeek?: number;
      trainingSplitId?: number;
      restDay?: boolean;
    } = {};
    if (data.dayOfWeek !== undefined) updateData.dayOfWeek = data.dayOfWeek;
    if (data.trainingSplitId !== undefined)
      updateData.trainingSplitId = data.trainingSplitId;
    if (data.restDay !== undefined) updateData.restDay = data.restDay;

    return await prisma.$transaction(async (tx) => {
      const current = await tx.training_split_days.findUnique({
        where: { id },
      });
      if (current) {
        const targetDayOfWeek = updateData.dayOfWeek ?? current.dayOfWeek;
        await tx.training_split_days.deleteMany({
          where: { dayOfWeek: targetDayOfWeek, id: { not: id } },
        });
      }

      return await tx.training_split_days.update({
        where: { id },
        data: updateData,
      });
    });
  },

  async deleteTrainingSplitDay(id: number) {
    return await prisma.training_split_days.delete({ where: { id } });
  },
};
