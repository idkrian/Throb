import { PrismaClient } from "../../../database/prisma/generated/prisma/index.js";
import type {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from "./user.schema.js";

const prisma = new PrismaClient();

const publicUserSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  email: true,
} as const;

export const userRepository = {
  async createUser(data: CreateUserRequestDto) {
    return await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      select: publicUserSelect,
    });
  },

  async getAllUsers() {
    return await prisma.users.findMany({ select: publicUserSelect });
  },

  async getUserById(userId: number) {
    return await prisma.users.findUnique({
      where: { id: userId },
      select: publicUserSelect,
    });
  },

  async getUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  },

  async updateUser(userId: number, data: UpdateUserRequestDto) {
    const updateData: { name?: string; email?: string } = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;

    return await prisma.users.update({
      where: { id: userId },
      data: updateData,
      select: publicUserSelect,
    });
  },

  async deleteUser(userId: number) {
    return await prisma.users.delete({
      where: { id: userId },
      select: publicUserSelect,
    });
  },
};
