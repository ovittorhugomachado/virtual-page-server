/*
  Warnings:

  - You are about to drop the column `accessId` on the `AccessTime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AccessTime" DROP CONSTRAINT "AccessTime_accessId_fkey";

-- AlterTable
ALTER TABLE "AccessTime" DROP COLUMN "accessId",
ADD COLUMN     "visitorId" INTEGER;

-- AddForeignKey
ALTER TABLE "AccessTime" ADD CONSTRAINT "AccessTime_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Access"("id") ON DELETE CASCADE ON UPDATE CASCADE;
