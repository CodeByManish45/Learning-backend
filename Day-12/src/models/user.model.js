const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username is already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already exists"],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("instaClone", userSchema);

module.exports = userModel;
