const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Image = require("../models/Image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/api/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send({ message: "No image uploaded" });

  if (req.body.type === "profile") {
    const image = await Image.findOne({
      author: req.userInSession.id,
    });

    if (image) {
      await Image.findByIdAndDelete({ _id: image._id });

      fs.unlink(path.join(`${__dirname}\\..\\`, image.path), (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: `Error deleting file: ${err}` });
      });
    }
  }

  await Image.create({
    author: req.userInSession.id,
    path: req.file.path,
  });

  res.status(200).send("Image uploaded");
});

module.exports = { upload, imageController: router };
