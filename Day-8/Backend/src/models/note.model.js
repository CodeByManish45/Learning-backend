const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  Name: String,
  Role: String,
  Description: String,
});

const noteModel = mongoose.model("Note", noteSchema);

module.exports = noteModel;
