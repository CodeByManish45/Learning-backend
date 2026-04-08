const express = require("express");
const controoler = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", controoler.register);

authRouter.post("/login", controoler.login);

module.exports = authRouter;
