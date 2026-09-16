import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecordsAPI } from "../api/client";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  useEffect(() => { RecordsAPI.get(id).then(({ data }) => setForm(data)); }, [id]);
  if (!form) return <div className="spinner-border" />;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    await RecordsAPI.update(id, form);
    navigate(`/item/${id}`);
  };
  return (
    <div style={{ maxWidth: 700 }}>
      <h3>Edit Record</h3>
      <form onSubmit={submit}>
        {[["item_name", "Name"], ["item_id_numbers", "ID Numbers"], ["item_storage_loc", "Storage Location"], ["item_keywords", "Search Keywords"], ["item_notes", "Notes"], ["item_picture_url", "Picture URL"], ["person_checked_out", "Who Has It"]].map(([k, label]) => (
          <div className="mb-2" key={k}><label><b>{label}:</b></label><input className="form-control" value={form[k] || ""} onChange={set(k)} /></div>
        ))}
        <div className="mb-2"><label><b>Checked out? </b></label>
          <div className="form-check"><input type="radio" name="co" className="form-check-input" checked={String(form.item_checked_out) === "true"} onChange={() => setForm({ ...form, item_checked_out: true })} /><label className="form-check-label">Yes</label></div>
          <div className="form-check"><input type="radio" name="co" className="form-check-input" checked={String(form.item_checked_out) !== "true"} onChange={() => setForm({ ...form, item_checked_out: false })} /><label className="form-check-label">No</label></div>
        </div>
        <button className="btn btn-primary" type="submit">Finish Edit</button>
      </form>
    </div>
  );
}
