const Router = require("express");
const path = require("path");
const multer = require("multer");

const addFileRouter = Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, res, cb) => {
    cb(null, res.originalname);
  },
});

const upload = multer({ storage });

const { addFileFunc } = require("../controllers/addfileController");

addFileRouter.post("/:folderName", upload.single("uploadedFile"), addFileFunc);

module.exports = {
  addFileRouter,
};
