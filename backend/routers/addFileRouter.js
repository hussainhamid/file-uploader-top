const Router = require("express");
const multer = require("multer");

const addFileRouter = Router();

const upload = multer({ dest: "uploads/" });

const { addFileFunc } = require("../controllers/addfileController");

addFileRouter.post("/", upload.single("uploadedFile"), addFileFunc);

module.exports = {
  addFileRouter,
};
