const Router = require("express");

const deleteFileRouter = Router();
const { deleteFileController } = require("../controllers/deleteFileController");

deleteFileRouter.post("/:folderName", deleteFileController);

module.exports = {
  deleteFileRouter,
};
