-- CreateTable
CREATE TABLE "MyPoke" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "MyPoke_pkey" PRIMARY KEY ("id")
);
