const postModel = require("../models/post.model");
const { authenticateToken } = require("../middlewares/post.middleware");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function creatingPostController(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // 🔥 upload image
    const file = await imagekit.files.upload({
      file: await toFile(req.file.buffer, "post-image.jpg"),
      fileName: "post-image.jpg",
      folder: "/instaclones-posts",
    });

    // 🔥 save in DB
    const newPost = await postModel.create({
      imageURL: file.url,
      caption: req.body.caption,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("🔥 ERROR AA GAYA:", error);
    res.status(500).json({
      message: "An error occurred while creating the post",
      stack: error.stack,
    });
  }
}

async function getPostController(req, res) {
  const userId = req.user.id;

  try {
    const posts = await postModel.find({ userId: userId });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("🔥 ERROR AA GAYA:", error);
    res.status(500).json({
      message: "An error occurred while fetching posts",
      stack: error.stack,
    });
  }
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  console.log("postId", postId);

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const isValidUser = post.userId.toString() === userId;

    if (!isValidUser) {
      return res.status(401).json({
        message: "forbidden contant.",
      });
    }
    return res.status(200).json({
      message: "Post details fetched successfully.",
      post,
    });
  } catch (error) {
    console.error("🔥 ERROR AA GAYA:", error);
    res.status(500).json({
      message: "An error occurred while fetching post details.",
      stack: error.stack,
    });
  }
}

module.exports = {
  creatingPostController,
  getPostController,
  getPostDetailsController,
};
