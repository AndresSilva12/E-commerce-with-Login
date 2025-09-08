/*
  Warnings:

  - Added the required column `purchasePrice` to the `saleItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `saleitem` ADD COLUMN `purchasePrice` DOUBLE NOT NULL;
