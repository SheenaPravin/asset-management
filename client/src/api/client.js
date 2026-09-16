import axios from "axios";
import { DEMO_RECORDS, DEMO_USER } from "./demoData";

// GitHub Pages serves the frontend only — no Express/Mongo backend there.
// Build with VITE_DEMO=true to run the dashboard against local mock data.
export const DEMO = import.meta.env.VITE_DEMO === "true";

const api = axios.create({ baseURL: "" });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  return cfg;
});

function loadDemo() {
  try {
    const raw = localStorage.getItem("am_demo_records");
    if (raw) return JSON.parse(raw);
  } catch { /* fall through to seed */ }
  localStorage.setItem("am_demo_records", JSON.stringify(DEMO_RECORDS));
  return [...DEMO_RECORDS];
}
function saveDemo(rows) {
  localStorage.setItem("am_demo_records", JSON.stringify(rows));
}
const normBool = (v) => v === true || v === "true";

const demoRecords = {
  list: async ({ sort = "item_name", order = "asc" } = {}) => {
    const rows = loadDemo();
    const dir = order === "desc" ? -1 : 1;
    rows.sort((a, b) => {
      const x = normBool(a[sort]) === true ? "true" : String(a[sort] ?? "").toLowerCase();
      const y = normBool(b[sort]) === true ? "true" : String(b[sort] ?? "").toLowerCase();
      return x < y ? -dir : x > y ? dir : 0;
    });
    return { data: rows };
  },
  get: async (id) => ({ data: loadDemo().find((r) => r._id === id) }),
  create: async (payload) => {
    const rows = loadDemo();
    const row = { ...payload, _id: "demo-" + Date.now() };
    rows.push(row);
    saveDemo(rows);
    return { data: row };
  },
  update: async (id, payload) => {
    const rows = loadDemo().map((r) => (r._id === id ? { ...r, ...payload } : r));
    saveDemo(rows);
    return { data: rows.find((r) => r._id === id) };
  },
  remove: async (id) => {
    saveDemo(loadDemo().filter((r) => r._id !== id));
    return { data: { message: "1 document deleted" } };
  },
};

const demoAuth = {
  login: async () => ({ data: { message: "Success", token: "Bearer demo" } }),
  register: async () => ({ data: { message: "Success" } }),
  me: async () => ({ data: DEMO_USER }),
};

const demoStats = {
  summary: async () => {
    const rows = loadDemo();
    const checkedOut = rows.filter((r) => normBool(r.item_checked_out)).length;
    const byLoc = {};
    rows.forEach((r) => { byLoc[r.item_storage_loc || "(no location)"] = (byLoc[r.item_storage_loc || "(no location)"] || 0) + 1; });
    return {
      data: {
        total: rows.length,
        checkedOut,
        available: rows.length - checkedOut,
        byLocation: Object.entries(byLoc).map(([k, count]) => ({ _id: k, count })),
      },
    };
  },
};

export const AuthAPI = DEMO
  ? demoAuth
  : {
      login: (email, password) => api.post("/api/auth/login", { email, password }),
      register: (payload) => api.post("/api/auth/register", payload),
      me: () => api.get("/api/auth/me"),
    };

export const RecordsAPI = DEMO
  ? demoRecords
  : {
      list: (params = {}) => api.get("/api/records", { params }),
      get: (id) => api.get(`/api/records/${id}`),
      create: (payload) => api.post("/api/records", payload),
      update: (id, payload) => api.put(`/api/records/${id}`, payload),
      remove: (id) => api.delete(`/api/records/${id}`),
    };

export const StatsAPI = DEMO
  ? demoStats
  : { summary: () => api.get("/api/stats/summary") };

export default api;
