const db = require("../db/query");

async function createFolderController(req, res) {
  const { name, files, userName } = req.body;

  await db.addFolder(userName, name, files);

  return res.status(200).json({ success: true });
}

async function getFolderController(req, res) {
  const folder = await db.getFolder();
  const lessFolder = await db.getLessFolder();

  if (!folder) {
    return res.status(500).json({ success: false });
  }

  const currentFolder = folder[0];

  const allFolders = folder.map((f) => f.foldername);

  const lessFolders = lessFolder.map((f) => f.foldername);

  return res.status(200).json({
    success: true,
    folderName: currentFolder.foldername,
    allFolders: allFolders,
    lessFolders: lessFolders,
  });
}

module.exports = {
  createFolderController,
  getFolderController,
};
