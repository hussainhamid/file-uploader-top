const Router = require("express");

const deleteFolderRouter = Router();
const {
  deleteFolderControllers,
} = require("../controllers/DeleteFolderController");

deleteFolderRouter.post("/:user", deleteFolderControllers);

module.exports = {
  deleteFolderRouter,
};
