const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
