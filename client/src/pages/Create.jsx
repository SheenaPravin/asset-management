import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecordsAPI } from "../api/client";

const blank = { item_name: "", item_id_numbers: "", item_storage_loc: "", item_keywords: "", item_notes: "", item_picture_url: "", person_checked_out: "", item_checked_out: false };

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState(blank);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    await RecordsAPI.create(form);
    alert("Item created successfully.");
    navigate("/equipment");
  };
  return (
    <div style={{ maxWidth: 700 }}>
      <h3>Create New Record</h3>
      <form onSubmit={submit}>
        <span><em>*required</em></span>
        <div className="mb-2"><label><b>*Name:</b></label><input required className="form-control" value={form.item_name} onChange={set("item_name")} /></div>
        <div className="mb-2"><label><b>ID Numbers:</b></label><input className="form-control" value={form.item_id_numbers} onChange={set("item_id_numbers")} /></div>
        <div className="mb-2"><label><b>*Storage Location:</b></label><input required className="form-control" value={form.item_storage_loc} onChange={set("item_storage_loc")} /></div>
        <div className="mb-2"><label><b>Search Keywords:</b></label><input className="form-control" value={form.item_keywords} onChange={set("item_keywords")} /></div>
        <div className="mb-2"><label><b>Notes:</b></label><input className="form-control" value={form.item_notes} onChange={set("item_notes")} /></div>
        <div className="mb-2"><label><b>Picture URL:</b></label><input className="form-control" value={form.item_picture_url} onChange={set("item_picture_url")} /></div>
        <div className="mb-2"><label><b>Checked Out By:</b></label><input className="form-control" value={form.person_checked_out} onChange={set("person_checked_out")} /></div>
        <div className="mb-2"><label><b>*Checked out? </b></label>
          <div className="form-check"><input type="radio" className="form-check-input" name="co" checked={form.item_checked_out === true} onChange={() => setForm({ ...form, item_checked_out: true })} required /><label className="form-check-label">Yes</label></div>
          <div className="form-check"><input type="radio" className="form-check-input" name="co" checked={form.item_checked_out === false} onChange={() => setForm({ ...form, item_checked_out: false })} /><label className="form-check-label">No</label></div>
        </div>
        <button className="btn btn-primary" type="submit">Create Item</button>
      </form>
    </div>
  );
}
