-- AlterTable
ALTER TABLE "users" ADD COLUMN     "languagePreference" TEXT NOT NULL DEFAULT 'en';

-- CreateTable
CREATE TABLE "exercise_translations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "exercise_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercise_translations_exerciseId_locale_key" ON "exercise_translations"("exerciseId", "locale");

-- AddForeignKey
ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
