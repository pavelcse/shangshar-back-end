/*
  Warnings:

  - You are about to alter the column `DeletedAt` on the `expense` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DeletedAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DeletedAt` on the `month` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DeletedAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `expense` MODIFY `DeletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `DeletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `month` ADD COLUMN `InStock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `DeletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `DeletedAt` TIMESTAMP NULL;
