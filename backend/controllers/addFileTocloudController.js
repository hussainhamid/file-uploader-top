const db = require("../db/query");

async function addFileToCloud(req, res) {
  const { folderName, userName } = req.body;
  const file = req.file;

  try {
    const fileData = {
      name: file.originalname,
      url: file.path,
      mimeType: file.mimetype,
      publicId: file.filename,
    };

    await db.addFiles(userName, folderName, fileData);

    return res.json({ success: true, file: fileData, loadingMsg: true });
  } catch (err) {
    console.error("error in addFileToCloudController.js: ", err);
    return res.json({ success: false, error: err || "unknown error" });
  }
}

module.exports = {
  addFileToCloud,
};
