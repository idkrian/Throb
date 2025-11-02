/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Exercise";

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "muscle" "Muscle" NOT NULL,
    "trainingSplitId" INTEGER,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_plits" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "training_plits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercise_muscleGroup_muscle_title_key" ON "exercise"("muscleGroup", "muscle", "title");

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_plits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
