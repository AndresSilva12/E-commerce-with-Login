-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `brand` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `products_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productVariant` (
    `id` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `productVariant_productId_size_color_key`(`productId`, `size`, `color`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productVariant` ADD CONSTRAINT `productVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
