const express = require("express");
const Asset = require("../models/Asset");
const { verifyJWT } = require("../middleware/auth");

const router = express.Router();
router.use(verifyJWT);

// Powers the Home dashboard (replaces hardcoded MongoDB Charts iframes in original).
router.get("/summary", async (req, res) => {
  const [total, checkedOut, byLocation] = await Promise.all([
    Asset.countDocuments(),
    Asset.countDocuments({ item_checked_out: true }),
    Asset.aggregate([{ $group: { _id: "$item_storage_loc", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
  ]);
  res.json({ total, checkedOut, available: total - checkedOut, byLocation });
});

module.exports = router;
