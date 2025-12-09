import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateTrainingSplitRequestDto,
  UpdateTrainingSplitRequestDto,
} from "./training-split.scheme.js";

const prisma = new PrismaClient();

export const trainingSplitRepository = {
  async createTrainingSplit(data: CreateTrainingSplitRequestDto) {
    return await prisma.training_splits.create({
      data: {
        title: data.title,
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

  async getAllTrainingSplits() {
    return await prisma.training_splits.findMany({
      include: { exercises: { include: { exercise: true } } },
    });
  },

  async updateTrainingSplit(
    trainingSplitId: number,
    data: UpdateTrainingSplitRequestDto
  ) {
    return await prisma.training_splits.update({
      where: { id: trainingSplitId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.exercises && {
          exercises: {
            deleteMany: {},
            create: data.exercises.map((ex) => ({
              exerciseId: ex.exerciseId,
              order: ex.order,
              sets: ex.sets,
              reps: ex.reps,
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
};
