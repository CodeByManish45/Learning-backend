const express = require("express");
const authModel = require("../models/auth.model");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isEmailAlreadyRegistered = await authModel.findOne({ email });

    if (isEmailAlreadyRegistered) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await authModel.create({ name, email, password: hash });

    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("JWT_TOKEN", token);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatchedPassword =
      user.password === crypto.createHash("md5").update(password).digest("hex");

    if (!isMatchedPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = JWT.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("JWT_TOKEN", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    res.status(200).json({
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
});

module.exports = authRouter;
