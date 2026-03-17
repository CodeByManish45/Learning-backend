const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//APIs Create Kar Rahe Hai.

app.post("/api/registration",async (req, res) => {
  const {
    Rollno,
    Studentname,
    Fathername,
    Dateofbirth,
    Mobileno,
    Email,
    Password,
    Gender,
    Department,
    Course,
    City,
    Address,
  } = req.body;

  

  const stdudentinfo = await studentModel.create({
    Rollno,
    Studentname,
    Fathername,
    Dateofbirth,
    Mobileno,
    Email,
    Password,
    Gender,
    Department,
    Course,
    City,
    Address,
  });
  res.status(201).json({
    message:"Regstration successfully"})

  });

//Database se Connect.

async function connectDb() {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database is Connected");
  });
}

//Schema create for Databse.

const studentSchema = new mongoose.Schema({
  Rollno: Number,
  Studentname: String,
  Fathername: String,
  Dateofbirth: Date,
  Mobileno: Number,
  Email: String,
  Password: String,
  Gender: String,
  Department: String,
  Course: String,
  City: String,
  Address: String,
});

const studentModel = mongoose.model("student", studentSchema);

connectDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
