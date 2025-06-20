const db = require("../db/query");

async function openFolderController(req, res) {
  const { folderName } = req.params;

  try {
    const folder = await db.getFolderByName(folderName);

    return res.status(200).json({ success: true, folder });
  } catch (err) {
    console.error("error in openFolderController.js: ", err);
  }
}

module.exports = {
  openFolderController,
};
