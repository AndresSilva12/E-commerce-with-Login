/*
  Warnings:

  - You are about to drop the column `code` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchasePrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `productVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `products_code_key` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `code`,
    DROP COLUMN `price`,
    ADD COLUMN `purchasePrice` DOUBLE NOT NULL,
    ADD COLUMN `salePrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `productVariant_code_key` ON `productVariant`(`code`);
