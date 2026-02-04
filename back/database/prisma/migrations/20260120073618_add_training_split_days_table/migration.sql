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

-- CreateIndex
CREATE UNIQUE INDEX "training_split_days_trainingSplitId_dayOfWeek_key" ON "training_split_days"("trainingSplitId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "training_split_days" ADD CONSTRAINT "training_split_days_trainingSplitId_fkey" FOREIGN KEY ("trainingSplitId") REFERENCES "training_splits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
