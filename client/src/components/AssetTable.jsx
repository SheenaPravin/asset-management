import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const fmtChecked = (v) => (v === true || v === "true" ? "Yes" : "No");

export default function AssetTable({ records, onDelete, onSort, sort, order }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const f = q.trim().toUpperCase();
    if (!f) return records;
    return records.filter((r) =>
      [r.item_name, r.item_id_numbers, r.item_storage_loc, String(r.item_checked_out), r.person_checked_out, r.item_keywords]
        .map((x) => String(x ?? "").toUpperCase())
        .some((x) => x.includes(f))
    );
  }, [records, q]);

  const arrow = (field) => (sort === field ? (order === "asc" ? " ▲" : " ▼") : "");

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" style={{ maxWidth: 400 }} placeholder="Search for items.."
          value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th role="button" onClick={() => onSort("item_name")}>Item{arrow("item_name")}</th>
            <th role="button" onClick={() => onSort("item_id_numbers")}>ID Numbers{arrow("item_id_numbers")}</th>
            <th role="button" onClick={() => onSort("item_storage_loc")}>Storage Location{arrow("item_storage_loc")}</th>
            <th role="button" onClick={() => onSort("item_checked_out")}>Checked Out{arrow("item_checked_out")}</th>
            <th role="button" onClick={() => onSort("person_checked_out")}>By Who{arrow("person_checked_out")}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r._id}>
              <td>{r.item_name}</td>
              <td>{r.item_id_numbers}</td>
              <td>{r.item_storage_loc}</td>
              <td>{fmtChecked(r.item_checked_out)}</td>
              <td>{r.person_checked_out}</td>
              <td className="d-flex gap-1">
                <Link to={`/edit/${r._id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                  if (window.confirm("Are you sure you want to delete this item?")) onDelete(r._id);
                }}>Delete</button>
                <Link to={`/item/${r._id}`} className="btn btn-sm btn-outline-primary">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p className="text-muted">No items found.</p>}
    </div>
  );
}
