const express = require("express");
const cors = require("cors");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/notes", async (req, res) => {
  try {
    const { Name, Role, Description } = req.body;

    const note = await noteModel.create({
      Name,
      Role,
      Description,
    });
    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed to create note",
    });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const note = await noteModel.find();
    res.status(200).json({
      message: "Note fached successfully",
      note,
    });
  } catch (error) {
    res.status(400).json({
      messaage: "Failed to fatched notes data",
    });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteNote = await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted successfully",
      deleteNote,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete note",
    });
  }
});

module.exports = app;
