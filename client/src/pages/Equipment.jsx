import React, { useEffect, useState } from "react";
import { RecordsAPI } from "../api/client";
import AssetTable from "../components/AssetTable";

export default function Equipment() {
  const [records, setRecords] = useState([]);
  const [sort, setSort] = useState("item_name");
  const [order, setOrder] = useState("asc");
  const load = async (s = sort, o = order) => {
    const { data } = await RecordsAPI.list({ sort: s, order: o });
    setRecords(data);
  };
  useEffect(() => { load(); }, []);
  const onSort = (f) => { const o = sort === f && order === "asc" ? "desc" : "asc"; setSort(f); setOrder(o); load(f, o); };
  const onDelete = async (id) => { await RecordsAPI.remove(id); setRecords((r) => r.filter((x) => x._id !== id)); };
  return (<div><h3>Equipment</h3><AssetTable records={records} onDelete={onDelete} onSort={onSort} sort={sort} order={order} /></div>);
}
