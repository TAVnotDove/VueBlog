const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Number,
  },
  editedDate: {
    type: Number,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
