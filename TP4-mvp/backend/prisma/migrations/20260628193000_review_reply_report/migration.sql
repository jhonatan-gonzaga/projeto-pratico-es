ALTER TABLE `reviews`
  ADD COLUMN `professionalReply` TEXT NULL,
  ADD COLUMN `repliedAt` DATETIME(3) NULL,
  ADD COLUMN `reportReason` VARCHAR(191) NULL,
  ADD COLUMN `reportDetails` TEXT NULL,
  ADD COLUMN `reportedAt` DATETIME(3) NULL;
