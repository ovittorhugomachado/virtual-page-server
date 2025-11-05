/*
  Warnings:

  - Changed the type of `tag` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROMOTION', 'AWARD', 'UPDATE', 'ATTENTION');

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "tag",
ADD COLUMN     "tag" "NotificationType" NOT NULL;
