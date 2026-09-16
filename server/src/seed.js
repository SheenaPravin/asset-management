require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { connectDB } = require("./config/db");
const User = require("./models/User");
const Asset = require("./models/Asset");

const DEMO_ASSETS = [
  { item_name: "Universal Robot UR5e", item_id_numbers: "RASL-ROB-001", item_storage_loc: "Lab A / Bay 1", item_checked_out: false, person_checked_out: "", item_keywords: "robot arm cobot manipulation", item_notes: "6-axis collaborative robot", item_picture_url: "" },
  { item_name: "Velodyne VLP-16 LiDAR", item_id_numbers: "RASL-SEN-014", item_storage_loc: "Lab A / Cage", item_checked_out: true, person_checked_out: "J. Cuomo", item_keywords: "lidar sensor perception", item_notes: "16-channel, needs calibration", item_picture_url: "" },
  { item_name: "Jetson AGX Orin Dev Kit", item_id_numbers: "RASL-CMP-032", item_storage_loc: "Lab B / Shelf 3", item_checked_out: false, person_checked_out: "", item_keywords: "nvidia jetson compute edge", item_notes: "64GB dev kit", item_picture_url: "" },
  { item_name: "DJI Matrice 300 RTK", item_id_numbers: "RASL-UAV-007", item_storage_loc: "Hangar / Locker 2", item_checked_out: true, person_checked_out: "K. Freeman", item_keywords: "drone uav aerial", item_notes: "Batteries TB60 x2", item_picture_url: "" },
  { item_name: "Fluke 87V Multimeter", item_id_numbers: "RASL-TOL-101", item_storage_loc: "Lab B / Bench 1", item_checked_out: false, person_checked_out: "", item_keywords: "multimeter electronics test", item_notes: "", item_picture_url: "" },
];

async function main() {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/asset_management");
  await User.deleteMany({});
  await Asset.deleteMany({});
  const hash = await bcrypt.hash("password123", 10);
  await new User({ email: "admin@lab.local", first_name: "Lab", last_name: "Admin", password: hash }).save();
  await Asset.insertMany(DEMO_ASSETS);
  console.log("Seeded admin@lab.local / password123 + 5 demo assets");
  await mongoose.disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
