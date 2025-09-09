const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folderName = req.body.folderName;

    return {
      folder: `uploads/${folderName}`,
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "pdf", "mp4", "docx", "txt"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
