import { prisma } from "../../../database/prisma/prisma.js";
import type {
  CreateTrainingSplitRequestDto,
  UpdateTrainingSplitRequestDto,
} from "./training-split.scheme.js";

export const trainingSplitRepository = {
  async createTrainingSplit(
    userId: number,
    data: CreateTrainingSplitRequestDto,
  ) {
    return await prisma.training_splits.create({
      data: {
        title: data.title,
        userId,
        exercises: {
          create: data.exercises.map((ex) => ({
            exerciseId: ex.exerciseId,
            order: ex.order,
            sets: ex.sets,
            reps: ex.reps,
          })),
        },
      },
      include: { exercises: true },
    });
  },

  async getAllUserTrainingSplits(userId: number) {
    return await prisma.training_splits.findMany({
      where: { userId },
      include: { exercises: { include: { exercise: true } } },
    });
  },

  async getUserTrainingSplitById(userId: number, trainingSplitId: number) {
    return await prisma.training_splits.findUnique({
      where: { id: trainingSplitId, userId },
      include: { exercises: { include: { exercise: true } } },
    });
  },

  async updateUserTrainingSplit(
    userId: number,
    trainingSplitId: number,
    data: UpdateTrainingSplitRequestDto,
  ) {
    return await prisma.training_splits.update({
      where: { id: trainingSplitId, userId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.exercises && {
          exercises: {
            deleteMany: {},
            create: data.exercises.map((ex) => ({
              order: ex.order,
              sets: ex.sets,
              reps: ex.reps,
              exerciseId: ex.exerciseId,
            })),
          },
        }),
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  },

  async deleteUserTrainingSplit(userId: number, trainingSplitId: number) {
    return await prisma.$transaction(async (tx) => {
      await tx.training_split_exercises.deleteMany({
        where: { trainingSplitId },
      });
      await tx.training_split_days.deleteMany({ where: { trainingSplitId } });

      return await tx.training_splits.delete({
        where: { id: trainingSplitId, userId },
      });
    });
  },
};
