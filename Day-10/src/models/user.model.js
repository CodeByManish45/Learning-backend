const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email is already exists"],
  },
  password: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
