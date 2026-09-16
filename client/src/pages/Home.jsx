import React, { useEffect, useState } from "react";
import { RecordsAPI, StatsAPI } from "../api/client";
import AssetTable from "../components/AssetTable";

export default function Home({ user }) {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [sort, setSort] = useState("item_name");
  const [order, setOrder] = useState("asc");

  const load = async (s = sort, o = order) => {
    const { data } = await RecordsAPI.list({ sort: s, order: o });
    setRecords(data);
  };
  useEffect(() => { load(); StatsAPI.summary().then(({ data }) => setStats(data)).catch(() => {}); }, []);

  const onSort = (f) => {
    const o = sort === f && order === "asc" ? "desc" : "asc";
    setSort(f); setOrder(o); load(f, o);
  };
  const onDelete = async (id) => { await RecordsAPI.remove(id); setRecords((r) => r.filter((x) => x._id !== id)); };

  const max = Math.max(1, ...(stats?.byLocation ?? []).map((x) => x.count));
  return (
    <div>
      <div className="text-center mb-4">
        <h3>Home Dashboard</h3>
        <h6 className="text-muted">Welcome back, {user?.first_name} {user?.last_name}</h6>
      </div>
      {stats && (
        <div className="row mb-4">
          <div className="col-md-4"><div className="card p-3 text-center"><h6>Total items</h6><h2>{stats.total}</h2></div></div>
          <div className="col-md-4"><div className="card p-3 text-center"><h6>Checked out</h6><h2>{stats.checkedOut}</h2></div></div>
          <div className="col-md-4"><div className="card p-3 text-center"><h6>Available</h6><h2>{stats.available}</h2></div></div>
          <div className="col-12 mt-3"><div className="card p-3">
            <h6>Items by storage location</h6>
            {(stats.byLocation ?? []).map((row) => (
              <div key={row._id || "unknown"} className="d-flex align-items-center gap-2 mb-1">
                <span style={{ width: 200 }} className="text-truncate">{row._id || "(no location)"}</span>
                <div className="progress flex-grow-1"><div className="progress-bar" style={{ width: `${(row.count / max) * 100}%` }} /></div>
                <span>{row.count}</span>
              </div>
            ))}
          </div></div>
        </div>
      )}
      <h4>Equipment</h4>
      <AssetTable records={records} onDelete={onDelete} onSort={onSort} sort={sort} order={order} />
    </div>
  );
}
