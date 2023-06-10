const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { versionKey: false }
);

const NotesModel = mongoose.model("/notes", NotesSchema);

module.exports = { NotesModel };
