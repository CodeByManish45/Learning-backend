const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isEmailalredyExits = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isEmailalredyExits) {
    return res.status(409).json({
      message: "User already exits",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

//LOGIN API

async function login(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    return res.status(406).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
  });
}

module.exports = { register, login };
