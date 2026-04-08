const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = connectToDB;