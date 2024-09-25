/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `highlights` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `locationDescription` on the `Good` table. All the data in the column will be lost.
  - Added the required column `set` to the `Good` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Good" DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
DROP COLUMN "countryCode",
DROP COLUMN "highlights",
DROP COLUMN "location",
DROP COLUMN "locationDescription",
ADD COLUMN     "set" INTEGER NOT NULL;
