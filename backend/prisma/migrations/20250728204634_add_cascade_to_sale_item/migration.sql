-- DropForeignKey
ALTER TABLE `saleitem` DROP FOREIGN KEY `saleItem_saleId_fkey`;

-- DropIndex
DROP INDEX `saleItem_saleId_fkey` ON `saleitem`;

-- AddForeignKey
ALTER TABLE `saleItem` ADD CONSTRAINT `saleItem_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
