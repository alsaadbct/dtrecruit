-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "deviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "internalUserId" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT false,
ALTER COLUMN "isAdmin" SET DEFAULT false;