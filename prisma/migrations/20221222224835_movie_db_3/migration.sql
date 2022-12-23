/*
  Warnings:

  - You are about to alter the column `starsCount` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `movies` MODIFY `starsCount` DECIMAL(65, 30) NOT NULL,
    ALTER COLUMN `releaseDate` DROP DEFAULT;
