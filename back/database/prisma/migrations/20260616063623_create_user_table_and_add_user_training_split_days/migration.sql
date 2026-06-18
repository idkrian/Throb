/*
  Warnings:

  - A unique constraint covering the columns `[trainingSplitId,dayOfWeek]` on the table `training_split_days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."training_split_days_dayOfWeek_key";

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "training_split_days" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "training_split_exercises" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "training_splits" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "training_split_days_trainingSplitId_dayOfWeek_key" ON "training_split_days"("trainingSplitId", "dayOfWeek");
