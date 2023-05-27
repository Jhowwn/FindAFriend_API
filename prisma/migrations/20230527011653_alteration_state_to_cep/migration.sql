/*
  Warnings:

  - You are about to drop the column `state` on the `Ong` table. All the data in the column will be lost.
  - Added the required column `cep` to the `Ong` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ong" DROP COLUMN "state",
ADD COLUMN     "cep" TEXT NOT NULL;
