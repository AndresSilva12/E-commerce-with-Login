/*
  Warnings:

  - Added the required column `motive` to the `stockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockentry` ADD COLUMN `motive` VARCHAR(191) NOT NULL;
