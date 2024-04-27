-- AlterTable
ALTER TABLE "user" ADD COLUMN     "defaultName" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
