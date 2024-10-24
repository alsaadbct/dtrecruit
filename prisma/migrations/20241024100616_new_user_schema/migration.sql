/*
  Warnings:

  - A unique constraint covering the columns `[internalUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTypeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "internalUserId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "userTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_internalUserId_key" ON "User"("internalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
