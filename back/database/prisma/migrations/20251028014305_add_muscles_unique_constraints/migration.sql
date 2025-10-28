/*
  Warnings:

  - A unique constraint covering the columns `[muscle_group,muscle]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_muscle_group_muscle_key" ON "Exercise"("muscle_group", "muscle");
