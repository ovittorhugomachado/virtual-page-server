/*
  Warnings:

  - You are about to drop the `ProjectSettings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alert` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferences` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProjectSettings" DROP CONSTRAINT "ProjectSettings_projectId_fkey";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "alert" TEXT NOT NULL,
ADD COLUMN     "preferences" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."ProjectSettings";

-- CreateTable
CREATE TABLE "project_analytics" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "accessDate" TIMESTAMP(3) NOT NULL,
    "totalAccesses" INTEGER NOT NULL,
    "uniqueVisitors" INTEGER NOT NULL,
    "salesOrSignups" INTEGER NOT NULL,
    "avgTimeOnPage" DOUBLE PRECISION,
    "deviceStats" JSONB,
    "genderStats" JSONB,
    "ageStats" JSONB,
    "interestStats" JSONB,

    CONSTRAINT "project_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "projectAnalyticsId" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_analytics" ADD CONSTRAINT "project_analytics_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_projectAnalyticsId_fkey" FOREIGN KEY ("projectAnalyticsId") REFERENCES "project_analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
