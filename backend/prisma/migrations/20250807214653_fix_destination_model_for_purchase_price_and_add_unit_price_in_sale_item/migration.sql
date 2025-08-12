/*
  Warnings:

  - You are about to drop the column `purchasePrice` on the `products` table. All the data in the column will be lost.
  - Added the required column `unitPrice` to the `saleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasePrice` to the `stockEntryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `purchasePrice`;

-- AlterTable
ALTER TABLE `saleitem` ADD COLUMN `unitPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `stockentryitem` ADD COLUMN `purchasePrice` DOUBLE NOT NULL;
