/*
  Warnings:

  - You are about to drop the `RequiredPetNeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RequiredPetNeed" DROP CONSTRAINT "RequiredPetNeed_pet_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "requiredNeeds" TEXT[];

-- DropTable
DROP TABLE "RequiredPetNeed";
