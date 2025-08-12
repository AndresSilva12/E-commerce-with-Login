/*
  Warnings:

  - Added the required column `userId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sales` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `stockEntryItem` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `variantId` VARCHAR(191) NOT NULL,
    `stockEntryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stockEntry` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockEntryItem` ADD CONSTRAINT `stockEntryItem_stockEntryId_fkey` FOREIGN KEY (`stockEntryId`) REFERENCES `stockEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockEntryItem` ADD CONSTRAINT `stockEntryItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `productVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockEntry` ADD CONSTRAINT `stockEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
