-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'GLUTES', 'CORE');

-- CreateEnum
CREATE TYPE "Muscle" AS ENUM ('CHEST_GENERAL', 'UPPER_CHEST', 'MIDDLE_CHEST', 'LOWER_CHEST', 'BACK_GENERAL', 'LATS', 'TRAPS', 'LOWER_BACK', 'RHOMBOIDS', 'SHOULDERS_GENERAL', 'FRONT_DELTOID', 'SIDE_DELTOID', 'REAR_DELTOID', 'ARMS_GENERAL', 'BICEPS_LONG_HEAD', 'BICEPS_SHORT_HEAD', 'TRICEPS_LONG_HEAD', 'TRICEPS_LATERAL_HEAD', 'TRICEPS_MEDIAL_HEAD', 'FOREARMS_GENERAL', 'BRACHIORADIALIS', 'PRONATOR_TERES', 'FLEXORS', 'EXTENSORS', 'LEGS_GENERAL', 'QUADRICEPS', 'HAMSTRINGS', 'CALVES', 'GLUTES_GENERAL', 'GLUTEUS_MAXIMUS', 'GLUTEUS_MEDIUS', 'GLUTEUS_MINIMUS', 'CORE_GENERAL', 'ABS', 'OBLIQUES');

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "muscle" "Muscle" NOT NULL,
    "description" TEXT,

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

-- CreateTable
CREATE TABLE "training_split_days" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingSplitId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "restDay" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "training_split_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingSplitId" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_exercise_logs" (
    "id" SERIAL NOT NULL,
    "workoutSessionId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "workout_exercise_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "id" SERIAL NOT NULL,
    "workoutExerciseLogId" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_muscleGroup_muscle_title_key" ON "exercises"("muscleGroup", "muscle", "title");

-- CreateIndex
CREATE UNIQUE INDEX "training_split_exercises_trainingSplitId_exerciseId_key" ON "training_split_exercises"("trainingSplitId", "exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "training_split_days_trainingSplitId_dayOfWeek_key" ON "training_split_days"("trainingSplitId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "training_split_exercises" ADD CONSTRAINT "training_split_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_split_exercises" ADD CONSTRAINT "training_split_exercises_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_split_days" ADD CONSTRAINT "training_split_days_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercise_logs" ADD CONSTRAINT "workout_exercise_logs_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercise_logs" ADD CONSTRAINT "workout_exercise_logs_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workoutExerciseLogId_fkey" FOREIGN KEY ("workoutExerciseLogId") REFERENCES "workout_exercise_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
