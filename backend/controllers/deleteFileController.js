const db = require("../db/query");
const cloudinary = require("../config/cloudinary");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deleteFileController(req, res) {
  const { folderName } = req.params;
  const { files, user } = req.body;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        foldername: folderName,
        username: user,
      },

      include: {
        File: true,
      },
    });

    const filesToDelete = await prisma.file.findMany({
      where: {
        folderId: folder.id,
        id: { in: files },
      },
    });

    for (const file of filesToDelete) {
      let resourceType = "raw";

      if (file.mimeType.startsWith("image/")) {
        resourceType = "image";
      } else if (file.mimeType.startsWith("video/")) {
        resourceType = "video";
      } else if (file.mimeType.startsWith("audio/")) {
        resourceType = "video";
      }

      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: resourceType,
      });
    }

    await db.deleteAFile(user, folderName, files);

    return res.status(200).json({ success: true, files });
  } catch (err) {
    console.error("error in deleteFileController: ", err);
  }
}

module.exports = {
  deleteFileController,
};
