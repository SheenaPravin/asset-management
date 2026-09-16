require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/records", require("./routes/assets"));
app.use("/api/stats", require("./routes/stats"));

// Legacy compat for original client: /register /login /isUserAuth /record
const { verifyJWT } = require("./middleware/auth");
app.use("/record", require("./routes/assets"));
app.get("/isUserAuth", verifyJWT, (req, res) => res.json({ isLoggedIn: true, ...req.user }));

async function start() {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/asset_management");
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
if (require.main === module) start();
module.exports = app;
