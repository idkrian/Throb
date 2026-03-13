/*
  Warnings:

  - Added the required column `durationSeconds` to the `workout_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_sessions" ADD COLUMN     "durationSeconds" INTEGER NOT NULL;
