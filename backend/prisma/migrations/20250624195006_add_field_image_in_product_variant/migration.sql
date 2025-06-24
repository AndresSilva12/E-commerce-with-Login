/*
  Warnings:

  - Added the required column `image` to the `productVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `image` VARCHAR(191) NOT NULL;
