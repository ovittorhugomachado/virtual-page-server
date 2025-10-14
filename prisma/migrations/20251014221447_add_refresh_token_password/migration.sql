/*
  Warnings:

  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenEmail]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenEmail` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."users_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "token",
ADD COLUMN     "refreshTokenPassword" TEXT,
ADD COLUMN     "tokenEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenEmail_key" ON "users"("tokenEmail");
