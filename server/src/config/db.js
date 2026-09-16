const mongoose = require("mongoose");

async function connectDB(uri) {
  if (!uri) throw new Error("MONGO_URI is not set");
  await mongoose.connect(uri);
  console.log("Successfully connected to MongoDB.");
}

module.exports = { connectDB };
