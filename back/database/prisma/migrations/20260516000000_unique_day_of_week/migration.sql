-- WARNING: destructive. The unique constraint is being tightened to a single
-- row per `dayOfWeek` globally, so any older rows for the same day-of-week are
-- discarded here. Keeps the most recently created row per dayOfWeek (max id).
DELETE FROM "training_split_days"
WHERE "id" NOT IN (
  SELECT MAX("id") FROM "training_split_days" GROUP BY "dayOfWeek"
);

-- DropIndex
DROP INDEX "training_split_days_trainingSplitId_dayOfWeek_key";

-- CreateIndex
CREATE UNIQUE INDEX "training_split_days_dayOfWeek_key" ON "training_split_days"("dayOfWeek");
