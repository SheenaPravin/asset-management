const mongoose = require("mongoose");

// Mirrors the original `records` collection fields from
// bobcat4848/asset-management, with item_checked_out normalised to Boolean.
function toBool(v) {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.toLowerCase() === "true" || v === "1";
  return Boolean(v);
}

const assetSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true, trim: true },
    item_picture_url: { type: String, default: "" },
    item_id_numbers: { type: String, default: "" },
    item_storage_loc: { type: String, required: true, trim: true },
    item_checked_out: { type: Boolean, default: false, set: toBool },
    person_checked_out: { type: String, default: "" },
    item_keywords: { type: String, default: "" },
    item_notes: { type: String, default: "" },
  },
  { timestamps: true, collection: "records" }
);

assetSchema.index({ item_name: "text", item_id_numbers: "text", item_storage_loc: "text", item_keywords: "text" });

module.exports = mongoose.model("Asset", assetSchema);
