const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("DB successfully connected");
    });
  } catch (error) {
    message: "DB is not connected";
  }
}

module.exports = connectToDB;
