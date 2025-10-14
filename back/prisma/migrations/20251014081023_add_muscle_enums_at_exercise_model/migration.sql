/*
  Warnings:

  - Added the required column `muscle` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle_group` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'GLUTES', 'CORE');

-- CreateEnum
CREATE TYPE "Muscle" AS ENUM ('CHEST_GENERAL', 'UPPER_CHEST', 'MIDDLE_CHEST', 'LOWER_CHEST', 'BACK_GENERAL', 'LATS', 'TRAPS', 'LOWER_BACK', 'RHOMBOIDS', 'SHOULDERS_GENERAL', 'FRONT_DELTOID', 'SIDE_DELTOID', 'REAR_DELTOID', 'ARMS_GENERAL', 'BICEPS_LONG_HEAD', 'BICEPS_SHORT_HEAD', 'TRICEPS_LONG_HEAD', 'TRICEPS_LATERAL_HEAD', 'TRICEPS_MEDIAL_HEAD', 'FOREARMS_GENERAL', 'BRACHIORADIALIS', 'PRONATOR_TERES', 'FLEXORS', 'EXTENSORS', 'LEGS_GENERAL', 'QUADRICEPS', 'HAMSTRINGS', 'CALVES', 'GLUTES_GENERAL', 'GLUTEUS_MAXIMUS', 'GLUTEUS_MEDIUS', 'GLUTEUS_MINIMUS', 'CORE_GENERAL', 'ABS', 'OBLIQUES');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "muscle" "Muscle" NOT NULL,
ADD COLUMN     "muscle_group" "MuscleGroup" NOT NULL;
