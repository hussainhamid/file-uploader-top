const {
  createFolderController,
  getFolderController,
} = require("../controllers/createFolderController");

const Router = require("express");

const createFolderRouter = Router();

createFolderRouter.get("/", getFolderController);
createFolderRouter.post("/", createFolderController);

module.exports = {
  createFolderRouter,
};
