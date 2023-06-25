/*
  Warnings:

  - You are about to drop the column `state` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Femea', 'Macho');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "state",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "energy" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "independence" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RequiredPetNeed" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "RequiredPetNeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetImages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequiredPetNeed" ADD CONSTRAINT "RequiredPetNeed_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetImages" ADD CONSTRAINT "PetImages_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
