const Image = require("./models/Image");
const router = require("express").Router();

const authController = require("./controllers/authController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const { imageController } = require("./controllers/imageController");
const checkAuth = require("./middleware/checkAuth");

router.use(authController);

router.get("/api/get-image/:imageType/:id", async (req, res) => {
  const { imageType, id } = req.params;

  if (imageType === "profile") {
    try {
      const image = await Image.findOne({
        author: id,
      });

      const imagePath = __dirname + `\\${image.path}`;

      res.sendFile(imagePath);
    } catch (error) {
      res.sendFile(__dirname + "\\images" + "\\default-profile-image.svg");
    }
  } else if (imageType === "post") {
    try {
      const image = await Image.findById(id);

      const imagePath = __dirname + `\\${image.path}`;

      res.sendFile(imagePath);
    } catch (error) {
      res.sendFile(__dirname + "\\images" + "\\image-not-found.svg");
    }
  } else {
    res.sendFile(__dirname + "\\images" + "\\image-not-found.svg");
  }
});

router.use(checkAuth);

router.use(postController);
router.use(commentController);
router.use(imageController);

module.exports = router;
