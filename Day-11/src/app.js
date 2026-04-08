const express = require("express");
const authRouter = require("./routes/auth.route");
const cookie = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use("/api/auth", authRouter);



module.exports = app;
