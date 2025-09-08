-- DropIndex
DROP INDEX `expenses_name_key` ON `expenses`;

-- AlterTable
ALTER TABLE `expenses` MODIFY `amount` DECIMAL(10, 2) NOT NULL;
