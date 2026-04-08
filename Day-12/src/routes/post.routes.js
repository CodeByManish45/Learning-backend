const express = require("express");
const {authenticateToken} = require("../middlewares/post.middleware");
const postRouter = express.Router();
const controllers = require("../controllers/post.controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), authenticateToken, controllers.creatingPostController);

postRouter.get("/all-posts", authenticateToken, controllers.getPostController);

postRouter.get("/details/:postId", authenticateToken, controllers.getPostDetailsController);

module.exports = postRouter;
