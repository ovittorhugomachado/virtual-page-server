/*
  Warnings:

  - You are about to drop the column `refreshAccessToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "refreshAccessToken",
ADD COLUMN     "refreshAccessTokenVirtualPage" TEXT;
