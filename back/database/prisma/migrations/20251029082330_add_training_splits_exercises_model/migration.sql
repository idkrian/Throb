/*
  Warnings:

  - You are about to drop the `exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training_plits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."exercise" DROP CONSTRAINT "exercise_trainingSplitId_fkey";

-- DropTable
DROP TABLE "public"."exercise";

-- DropTable
DROP TABLE "public"."training_plits";

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "muscle" "Muscle" NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_splits" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "training_splits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_split_exercises" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingSplitId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "order" INTEGER,
    "sets" INTEGER,
    "reps" TEXT,

    CONSTRAINT "training_split_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_muscleGroup_muscle_title_key" ON "exercises"("muscleGroup", "muscle", "title");

-- CreateIndex
CREATE UNIQUE INDEX "training_split_exercises_trainingSplitId_exerciseId_key" ON "training_split_exercises"("trainingSplitId", "exerciseId");

-- AddForeignKey
ALTER TABLE "training_split_exercises" ADD CONSTRAINT "training_split_exercises_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_split_exercises" ADD CONSTRAINT "training_split_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
