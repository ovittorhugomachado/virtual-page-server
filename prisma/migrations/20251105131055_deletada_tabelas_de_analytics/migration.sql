/*
  Warnings:

  - You are about to drop the `Access` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccessTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Access" DROP CONSTRAINT "Access_projectAnalyticsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AccessTime" DROP CONSTRAINT "AccessTime_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."leads" DROP CONSTRAINT "leads_projectAnalyticsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_analytics" DROP CONSTRAINT "project_analytics_projectId_fkey";

-- DropTable
DROP TABLE "public"."Access";

-- DropTable
DROP TABLE "public"."AccessTime";

-- DropTable
DROP TABLE "public"."leads";

-- DropTable
DROP TABLE "public"."project_analytics";
