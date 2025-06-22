/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Dean` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Dean` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `Dean` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dean` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Lecturer` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Dean_email_key` ON `Dean`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_email_key` ON `Lecturer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);
