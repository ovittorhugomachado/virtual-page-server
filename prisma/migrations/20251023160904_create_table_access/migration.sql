/*
  Warnings:

  - You are about to drop the column `accessDate` on the `project_analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_analytics" DROP COLUMN "accessDate";

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "accessDate" TIMESTAMP(3) NOT NULL,
    "projectAnalyticsId" INTEGER,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_projectAnalyticsId_fkey" FOREIGN KEY ("projectAnalyticsId") REFERENCES "project_analytics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
