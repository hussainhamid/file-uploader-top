const {
  createFolderController,
  getFolderController,
} = require("../controllers/createFolderController");

const Router = require("express");

const createFolderRouter = Router();

createFolderRouter.get("/:userName", getFolderController);
createFolderRouter.post("/", createFolderController);

module.exports = {
  createFolderRouter,
};
