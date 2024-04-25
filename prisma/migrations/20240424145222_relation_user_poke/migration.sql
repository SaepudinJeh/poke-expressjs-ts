/*
  Warnings:

  - You are about to drop the `MyPoke` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MyPoke";

-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_username_key" ON "pokemons"("username");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
