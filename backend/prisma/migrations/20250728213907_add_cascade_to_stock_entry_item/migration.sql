-- DropForeignKey
ALTER TABLE `stockentryitem` DROP FOREIGN KEY `stockEntryItem_stockEntryId_fkey`;

-- DropIndex
DROP INDEX `stockEntryItem_stockEntryId_fkey` ON `stockentryitem`;

-- AddForeignKey
ALTER TABLE `stockEntryItem` ADD CONSTRAINT `stockEntryItem_stockEntryId_fkey` FOREIGN KEY (`stockEntryId`) REFERENCES `stockEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
