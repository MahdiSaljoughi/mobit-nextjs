/*
  Warnings:

  - The `rule` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rule" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rule",
ADD COLUMN     "rule" "Rule" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "rule";
