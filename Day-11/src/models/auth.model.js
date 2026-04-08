const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const authModel = mongoose.model("authUser", authSchema);

module.exports = authModel;
