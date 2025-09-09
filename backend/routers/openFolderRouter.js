const Router = require("express");

const openFolderRouter = Router();

const { openFolderController } = require("../controllers/openFolderContoller");

openFolderRouter.get("/:folderName", openFolderController);

module.exports = {
  openFolderRouter,
};
