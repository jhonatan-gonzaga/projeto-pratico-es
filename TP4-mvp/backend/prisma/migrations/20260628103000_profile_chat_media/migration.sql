-- AlterEnum
ALTER TABLE `portfolio_project_images` MODIFY `type` ENUM('COVER', 'BEFORE', 'AFTER', 'GENERAL') NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `messages`
  ADD COLUMN `type` ENUM('TEXT', 'AUDIO') NOT NULL DEFAULT 'TEXT',
  MODIFY `text` TEXT NULL,
  ADD COLUMN `audioUrl` VARCHAR(191) NULL,
  ADD COLUMN `durationMs` INTEGER NULL;

-- CreateTable
CREATE TABLE `direct_request_images` (
    `id` VARCHAR(191) NOT NULL,
    `directRequestId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `direct_request_images_directRequestId_idx`(`directRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `direct_request_images` ADD CONSTRAINT `direct_request_images_directRequestId_fkey` FOREIGN KEY (`directRequestId`) REFERENCES `direct_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
