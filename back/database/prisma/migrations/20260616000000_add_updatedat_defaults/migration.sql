-- Reconcile migration history with the database: `updatedAt` columns already
-- carry a `DEFAULT CURRENT_TIMESTAMP` (matching `@default(now())` in the schema)
-- but this was never recorded in a migration, causing recurring drift.

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "training_splits" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "training_split_exercises" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "training_split_days" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
