/*
  Warnings:

  - Added the required column `deletedAt` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL;
