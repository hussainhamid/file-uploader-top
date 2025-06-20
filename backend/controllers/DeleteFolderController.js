const db = require("../db/query");

async function deleteFolderControllers(req, res) {
  const { user: userName } = req.params;
  const { folders } = req.body;

  try {
    await db.deleteAFolder(userName, folders);

    return res.status(200).json({ success: true, folders });
  } catch (err) {
    console.error("error in deleteFolderController: ", err);
  }
}

module.exports = {
  deleteFolderControllers,
};
