/*
  Warnings:

  - The primary key for the `SharingAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[noteId,userId]` on the table `SharingAccess` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "createdAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SharingAccess" DROP CONSTRAINT "SharingAccess_pkey",
ALTER COLUMN "createdAt" SET DEFAULT now(),
ADD CONSTRAINT "SharingAccess_pkey" PRIMARY KEY ("noteId", "userId");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "SharingAccess_noteId_userId_key" ON "SharingAccess"("noteId", "userId");
