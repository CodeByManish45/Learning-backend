const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Database is Connected");
    });
  } catch (error) {
    (console.log("Failed to connect DB"), error.message);
  }
}

module.exports = connectToDB;
