/*
  Warnings:

  - Added the required column `total` to the `stockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockentry` ADD COLUMN `total` DOUBLE NOT NULL;
