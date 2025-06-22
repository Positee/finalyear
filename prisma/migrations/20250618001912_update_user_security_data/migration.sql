/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Fingerprint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `KeypadPin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `RfidTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `DeviceState` (
    `id` VARCHAR(191) NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Fingerprint_studentId_key` ON `Fingerprint`(`studentId`);

-- CreateIndex
CREATE UNIQUE INDEX `KeypadPin_studentId_key` ON `KeypadPin`(`studentId`);

-- CreateIndex
CREATE UNIQUE INDEX `RfidTag_studentId_key` ON `RfidTag`(`studentId`);
