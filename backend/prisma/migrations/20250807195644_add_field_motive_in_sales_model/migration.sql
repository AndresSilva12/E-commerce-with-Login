/*
  Warnings:

  - Added the required column `motive` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sales` ADD COLUMN `motive` VARCHAR(191) NOT NULL;
