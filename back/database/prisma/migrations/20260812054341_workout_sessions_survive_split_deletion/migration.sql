-- DropForeignKey
ALTER TABLE "public"."workout_sessions" DROP CONSTRAINT "workout_sessions_trainingSplitId_fkey";

-- AlterTable
ALTER TABLE "workout_sessions" ALTER COLUMN "trainingSplitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
