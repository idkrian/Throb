/*
  Warnings:

  - You are about to alter the column `weight` on the `workout_sets` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(6,2)`.
  - A unique constraint covering the columns `[muscleGroup,muscle,title,userId]` on the table `exercises` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `training_splits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `workout_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rpe` to the `workout_sets` table without a default value. This is not possible if the table is not empty.
  - Made the column `weight` on table `workout_sets` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UnitPreference" AS ENUM ('KG', 'LB');

-- DropIndex
DROP INDEX "public"."exercises_muscleGroup_muscle_title_key";

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "training_splits" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "unitPreference" "UnitPreference" NOT NULL DEFAULT 'KG';

-- AlterTable
ALTER TABLE "workout_sessions" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "workout_sets" ADD COLUMN     "rpe" DECIMAL(3,1) NOT NULL,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "weight" SET DATA TYPE DECIMAL(6,2);

-- CreateTable
CREATE TABLE "body_weights" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(6,2) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "body_weights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_muscleGroup_muscle_title_userId_key" ON "exercises"("muscleGroup", "muscle", "title", "userId");

-- AddForeignKey
ALTER TABLE "body_weights" ADD CONSTRAINT "body_weights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_splits" ADD CONSTRAINT "training_splits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
