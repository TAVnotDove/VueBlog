const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

router.get("/api/posts/:postId/:commentId", async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.commentId }).populate(
    {
      path: "author",
      select: "username",
    }
  );

  if (!comment) return res.status(404).send({ message: "Comment not found" });

  return res.status(200).send({
    comment,
  });
});

router.post("/api/posts/:postId", async (req, res) => {
  try {
    const comment = await Comment.create({
      author: req.userInSession.id,
      post: req.params.postId,
      text: req.body.text,
      createdDate: new Date().getTime(),
    });

    await Post.updateOne(
      { _id: req.params.postId },
      { $push: { comments: comment._id } }
    );

    return res.status(201).send({ comment });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/api/posts/:postId/:commentId", async (req, res) => {
  const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
    text: req.body.text,
    editedDate: new Date().getTime(),
  });

  if (!updatedComment) return res.status(404).send("Comment not found");

  return res.status(200).send({ message: "Comment changed" });
});

router.delete("/api/posts/:postId/:commentId", async (req, res) => {
  const deletedPost = await Comment.findByIdAndRemove(req.params.commentId);

  await Post.findByIdAndUpdate(req.params.postId, {
    $pull: { comments: req.params.commentId },
  });

  if (!deletedPost) return res.status(404).send("Comment not found");

  return res.status(200).send({ message: "Comment deleted" });
});

router.put("/api/comments/like/:commentId", async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.commentId });

  if (!comment) return res.status(404).send("Comment not found");

  if (comment.likes.includes(req.userInSession.id)) {
    comment.likes.splice(comment.likes.indexOf(req.userInSession.id), 1);
  } else {
    comment.likes.push(req.userInSession.id);
  }

  comment.save();

  return res.status(200).send({ message: "Comment liked" });
});

module.exports = router;
