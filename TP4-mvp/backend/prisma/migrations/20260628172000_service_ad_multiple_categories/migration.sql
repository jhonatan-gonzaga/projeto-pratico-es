-- CreateTable
CREATE TABLE `service_ad_categories` (
    `adId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`adId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Backfill existing primary categories.
INSERT IGNORE INTO `service_ad_categories` (`adId`, `categoryId`, `createdAt`)
SELECT `id`, `categoryId`, CURRENT_TIMESTAMP(3)
FROM `service_ads`;

-- AddForeignKey
ALTER TABLE `service_ad_categories` ADD CONSTRAINT `service_ad_categories_adId_fkey` FOREIGN KEY (`adId`) REFERENCES `service_ads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_ad_categories` ADD CONSTRAINT `service_ad_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
