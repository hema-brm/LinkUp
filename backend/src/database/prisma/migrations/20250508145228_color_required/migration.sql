/*
  Warnings:

  - Made the column `color` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "color" SET NOT NULL;
