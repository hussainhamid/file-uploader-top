const Router = require("express");

const addFileToCloudRouter = Router();
const upload = require("../config/multer");
const { addFileToCloud } = require("../controllers/addFileTocloudController");

addFileToCloudRouter.post(
  "/:folderName",
  upload.single("uploadedFile"),
  addFileToCloud
);

module.exports = {
  addFileToCloudRouter,
};
