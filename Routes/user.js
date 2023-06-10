const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
const { config } = require("../config");

const UserRoutes = express.Router();

UserRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await UserModel.find({ email });
  if (userFind.length > 0) {
    res.status(200).send({ msg: "User Already Exists" });
    return;
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) res.status(400).send({ err: err });
      else {
        const user = UserModel({ name, email, password: hash });
        await user.save();
        res.status(200).send({ msg: "User Added" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ name: "Harsh" }, config.secret, {
            expiresIn: "7d",
          });
          const RefreshToken = jwt.sign({ name: "Harsh" }, "refresh", {
            expiresIn: "28d",
          });
          res
            .status(200)
            .send({ msg: "Login Success", token, RefreshToken, user });
        } else {
          res.status(200).send({ msg: "wrong password" });
        }
      });
    } else res.status(200).send({ msg: "wrong email" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { UserRoutes };
