const db = require("../db/query");

async function createFolderController(req, res) {
  const { name, files, userName } = req.body;

  await db.addFolder(userName, name, files);

  return res.status(200).json({ success: true });
}

async function getFolderController(req, res) {
  const folder = await db.getFolder();

  return res
    .status(200)
    .json({ success: true, folderName: folder?.foldername });
}

module.exports = {
  createFolderController,
  getFolderController,
};
