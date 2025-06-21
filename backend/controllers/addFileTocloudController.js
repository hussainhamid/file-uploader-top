const db = require("../db/query");

async function addFileToCloud(req, res) {
  const { folderName, userName } = req.body;
  const file = req.file;

  try {
    const fileData = {
      name: file.originalname,
      url: file.path,
      mimeType: file.mimetype,
    };

    await db.addFiles(userName, folderName, fileData);

    return res.json({ success: true, file: fileData });
  } catch (err) {
    console.error("error in addFileToCloudController.js: ", err);
    return res.json({ success: false });
  }
}

module.exports = {
  addFileToCloud,
};
