const db = require("../db/query");

async function deleteFileController(req, res) {
  const { folderName } = req.params;
  const { files, user } = req.body;

  try {
    await db.deleteAFile(user, folderName, files);

    return res.status(200).json({ success: true, files });
  } catch (err) {
    console.error("error in deleteFileController: ", err);
  }
}

module.exports = {
  deleteFileController,
};
