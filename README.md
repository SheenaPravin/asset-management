# Asset Management (modernized port)

MERN asset tracker mimicking [bobcat4848/asset-management](https://github.com/bobcat4848/asset-management) — equipment CRUD, check-out tracking, JWT auth, dashboard stats.

Original was React 17 (CRA) + Express + MongoDB native driver + Mongoose. This port modernizes to **React 18 + Vite + React Router 6** and a **single Mongoose data layer**, and fixes bugs (JWT secret mismatch, inconsistent routes).

## Features (parity with original)
- Register / Login (JWT Bearer, 30d), `PrivateRoute`, Navbar with Sign Out
- Home dashboard + equipment table (search, sortable columns)
- Equipment page (full list), Create, Edit, Item Details pages
- System page placeholder (admin actions roadmap)
- REST API: `GET/POST /api/records`, `GET/PUT/DELETE /api/records/:id`, `GET /api/stats/summary`
- Legacy compat: `/record`, `/record/add`, `/isUserAuth` still respond

## Quickstart
```bash
npm run install:all
cp server/.env.example server/.env   # set MONGO_URI + JWT_SECRET
# start Mongo locally (or `docker compose up -d mongo`)
npm run seed   # creates admin@lab.local / password123 + 5 demo assets
npm run dev:server   # :5000
npm run dev:client   # :5173
```

## Env (`server/.env`)
`PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CLIENT_URL` — see `.env.example`.

## Roadmap vs original
- Mongo Charts iframes replaced by live `/api/stats/summary` bars (no hardcoded chart IDs)
- `item_checked_out` normalized to Boolean (accepts legacy `"true"/"false"`)
- Next: roles/admin user management, image uploads, CSV export, backups
