const db = require("../db/query");
const cloudinary = require("../config/cloudinary");

async function deleteFolderControllers(req, res) {
  const { user: userName } = req.params;
  const { folders } = req.body;

  try {
    if (!folders) {
      console.log("folder dosent exists");
    }

    await db.deleteAFolder(
      userName,
      folders.map((f) => f.folderName)
    );

    for (const folderName of folders.map((f) => f.folderName)) {
      try {
        await cloudinary.api.delete_resources_by_prefix(
          `uploads/${folderName}`
        );

        await cloudinary.api.delete_folder(`uploads/${folderName}`);
      } catch (err) {
        console.log(
          "folder does not exists in cloudinary, but it has been dleted from db"
        );
      }
    }

    return res.status(200).json({ success: true, folders });
  } catch (err) {
    console.error("error in deleteFolderController: ", err);
  }
}

module.exports = {
  deleteFolderControllers,
};
