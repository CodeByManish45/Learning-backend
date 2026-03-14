const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to Db");
    });
  } catch (error) {
    message: "failed to conncted Db";
  }
}

module.exports = connectToDb;
