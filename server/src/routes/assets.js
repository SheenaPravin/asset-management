const express = require("express");
const Asset = require("../models/Asset");
const { verifyJWT } = require("../middleware/auth");

const router = express.Router();
router.use(verifyJWT);

const SORTABLE = ["item_name", "item_id_numbers", "item_storage_loc", "item_checked_out", "person_checked_out", "createdAt", "updatedAt"];

// GET /api/records?search=&sort=item_name&order=asc&checkedOut=true
router.get("/", async (req, res) => {
  try {
    const { search = "", sort = "item_name", order = "asc", checkedOut } = req.query;
    const filter = {};
    if (checkedOut === "true") filter.item_checked_out = true;
    if (checkedOut === "false") filter.item_checked_out = false;
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { item_name: rx }, { item_id_numbers: rx }, { item_storage_loc: rx },
        { person_checked_out: rx }, { item_keywords: rx }, { item_notes: rx },
      ];
    }
    const sortField = SORTABLE.includes(sort) ? sort : "item_name";
    const assets = await Asset.find(filter).sort({ [sortField]: order === "desc" ? -1 : 1 }).lean();
    res.json(assets);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Not found" });
    res.json(asset);
  } catch (e) {
    res.status(400).json({ message: "Invalid id" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { item_name, item_storage_loc } = req.body;
    if (!item_name || !item_storage_loc)
      return res.status(400).json({ message: "item_name and item_storage_loc are required" });
    const asset = await new Asset(req.body).save();
    res.status(201).json(asset);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// legacy alias: POST /record/add
router.post("/add", async (req, res) => {
  try {
    const asset = await new Asset(req.body).save();
    res.status(201).json(asset);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ message: "Not found" });
    res.json(asset);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const r = await Asset.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });
    res.json({ message: "1 document deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
