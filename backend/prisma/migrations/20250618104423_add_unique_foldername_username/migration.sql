/*
  Warnings:

  - A unique constraint covering the columns `[foldername,username]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Folder_foldername_username_key" ON "Folder"("foldername", "username");
