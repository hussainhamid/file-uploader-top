-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "foldername" TEXT NOT NULL,
    "files" TEXT[],

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_username_key" ON "Folder"("username");
