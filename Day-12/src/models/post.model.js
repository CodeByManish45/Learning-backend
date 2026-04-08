const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: " ",
  },
  imageURL: {
    type: String,
    required: [true, "Image is required"],
  },
  userId: {
    ref: "instaclones",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User id is required for creting a post"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
