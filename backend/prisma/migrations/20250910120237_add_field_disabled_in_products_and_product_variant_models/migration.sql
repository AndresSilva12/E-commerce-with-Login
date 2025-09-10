-- AlterTable
ALTER TABLE `products` ADD COLUMN `disabled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `disabled` BOOLEAN NOT NULL DEFAULT false;
