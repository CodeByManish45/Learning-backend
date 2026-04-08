const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    res.status(201).json({
      message: "Register successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Register Failed",
      error: error.message,
    });
  }
});

module.exports = authRouter;
