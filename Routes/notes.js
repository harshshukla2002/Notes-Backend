const { Auth } = require("../Middleware/Auth");
const { NotesModel } = require("../models/NotesModel");
const express = require("express");

const NotesRoutes = express.Router();

NotesRoutes.get("/", Auth, async (req, res) => {
  try {
    const data = await NotesModel.find({ userID: req.query.userID });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

NotesRoutes.post("/add", Auth, async (req, res) => {
  try {
    const note = NotesModel(req.body);
    await note.save();
    res.status(200).send({ msg: "note added" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

NotesRoutes.patch("/update/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await NotesModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Notes updated" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "something went wrong" });
  }
});

NotesRoutes.delete("/delete/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await NotesModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: `note deleted` });
  } catch (err) {
    res.status(400).send({ err: "something went wrong" });
  }
});

module.exports = { NotesRoutes };
