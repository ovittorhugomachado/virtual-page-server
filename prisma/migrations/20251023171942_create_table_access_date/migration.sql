/*
  Warnings:

  - You are about to drop the column `accessDate` on the `Access` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Access" DROP CONSTRAINT "Access_projectAnalyticsId_fkey";

-- AlterTable
ALTER TABLE "Access" DROP COLUMN "accessDate";

-- CreateTable
CREATE TABLE "AccessTime" (
    "id" SERIAL NOT NULL,
    "accessId" INTEGER,
    "accessDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_projectAnalyticsId_fkey" FOREIGN KEY ("projectAnalyticsId") REFERENCES "project_analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessTime" ADD CONSTRAINT "AccessTime_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE CASCADE ON UPDATE CASCADE;
