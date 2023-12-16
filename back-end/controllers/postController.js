const router = require("express").Router();
const Post = require("../models/Post");
const Image = require("../models/Image");
const { upload } = require("./imageController");

router.get("/api/posts", async (req, res) => {
  const posts = await Post.find().populate({
    path: "author",
    select: "username",
  });

  return res.status(200).send({ posts });
});

router.get("/api/posts/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })
      .populate({ path: "author", select: "username" });

    if (!post) return res.status(404).send({ message: "Post not found" });

    return res.status(200).send({
      post,
      hasLikedPost: post.likes.includes(req.userInSession.id),
      hasLikedComments: post.comments.map((comment) =>
        comment.likes.includes(req.userInSession.id)
      ),
    });
  } catch (error) {
    return res.status(404).send({ message: "Post not found" });
  }
});

router.get("/api/posts-search", async (req, res) => {
  try {
    const posts = await Post.find({
      title: { $regex: req.query.searchTerm, $options: "i" },
    }).populate({
      path: "author",
      select: "username",
    });

    return res.status(200).send({ posts });
  } catch (error) {
    return res.status(404).send({ error });
  }
});

router.post("/api/posts", upload.array("images[]", 3), async (req, res) => {
  const files = req.files;

  try {
    let filesResult = [];

    if (files.length > 0) {
      filesResult = await Image.insertMany(
        files.map((file) => ({
          path: file.path,
          author: req.userInSession.id,
        }))
      );
    }

    const post = await Post.create({
      author: req.userInSession.id,
      title: req.body.title,
      text: req.body.text,
      images: filesResult.length > 0 ? filesResult.map((file) => file._id) : [],
      createdDate: new Date().getTime(),
    });

    return res.status(201).send({ post });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.put("/api/posts/:postId", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
    title: req.body.title,
    text: req.body.text,
    editedDate: new Date().getTime(),
  });

  if (!updatedPost) return res.status(404).send("Post not found");

  return res.status(200).send({ message: "Post changed" });
});

router.delete("/api/posts/:postId", async (req, res) => {
  const deletedPost = await Post.findByIdAndRemove(req.params.postId);

  if (!deletedPost) return res.status(404).send("Post not found");

  return res.status(200).send({ message: "Post deleted" });
});

router.put("/api/posts/like/:postId", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId });

  if (!post) return res.status(404).send("Post not found");

  if (post.likes.includes(req.userInSession.id)) {
    post.likes.splice(post.likes.indexOf(req.userInSession.id), 1);
  } else {
    post.likes.push(req.userInSession.id);
  }

  post.save();

  return res.status(200).send({ message: "Post liked" });
});

module.exports = router;
