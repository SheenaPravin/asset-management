import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RecordsAPI } from "../api/client";

const NO_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => { RecordsAPI.get(id).then(({ data }) => setItem(data)); }, [id]);
  if (!item) return <div className="spinner-border" />;
  const checked = String(item.item_checked_out) === "true";
  const Row = ({ label, value }) => value ? <div className="row mb-1"><div className="col-3 text-muted">{label}:</div><div className="col-9"><b>{value}</b></div></div> : null;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1>{item.item_name}</h1>
          <Row label="ID Number" value={item.item_id_numbers} />
          <Row label="Storage Location" value={item.item_storage_loc} />
          <Row label="Notes" value={item.item_notes} />
          <Row label="Search Keywords" value={item.item_keywords} />
          <div className="row mb-1"><div className="col-3 text-muted">Checked out?:</div><div className="col-9"><b>{checked ? "Yes" : "No"}</b></div></div>
          {checked && <Row label="Being Used by" value={item.person_checked_out || "Unknown"} />}
          <Link to={`/edit/${id}`} className="btn btn-primary mt-3">Edit</Link>
        </div>
        <div className="col-md-4">
          <img src={item.item_picture_url || NO_IMG} alt={item.item_name} className="img-fluid rounded" style={{ maxHeight: 250 }} />
        </div>
      </div>
    </div>
  );
}
