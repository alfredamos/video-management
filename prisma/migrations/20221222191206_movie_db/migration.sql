-- CreateTable
CREATE TABLE `genres` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `producer` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `youtubeId` VARCHAR(255) NOT NULL,
    `starsCount` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `releaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NOT NULL,
    `genreId` VARCHAR(191) NULL,
    `pgRating` ENUM('Violence', 'Family', 'Language', 'Sex') NOT NULL DEFAULT 'Family',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
