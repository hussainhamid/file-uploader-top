const db = require("../db/query");

async function addFileFunc(req, res) {
  try {
    const { folderName, userName } = req.body;
    const uploadedFileName = req.file.originalname;

    await db.addFileByFolderName(folderName, userName, uploadedFileName);

    res.json({ success: true });
  } catch (err) {
    console.error("error in addFileFunc: ", err);
    res.json({ success: false });
  }
}

module.exports = {
  addFileFunc,
};
