-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharingAccess" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "noteId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharingAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_unique" ON "User"("displayName", "email");

-- CreateIndex
CREATE INDEX "note_unique" ON "Notes"("authorId", "title", "content");

-- CreateIndex
CREATE INDEX "sharing_access_unique" ON "SharingAccess"("noteId", "userId");

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharingAccess" ADD CONSTRAINT "SharingAccess_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharingAccess" ADD CONSTRAINT "SharingAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
