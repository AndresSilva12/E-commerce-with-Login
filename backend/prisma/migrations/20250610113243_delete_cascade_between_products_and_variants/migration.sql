-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `productVariant_productId_fkey`;

-- AddForeignKey
ALTER TABLE `productVariant` ADD CONSTRAINT `productVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
