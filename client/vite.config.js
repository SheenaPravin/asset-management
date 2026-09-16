import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Repo name doubles as the Pages sub-path: https://<user>.github.io/asset-management/
  base: "/asset-management/",
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
      "/record": "http://localhost:5000",
      "/login": "http://localhost:5000",
      "/register": "http://localhost:5000",
      "/isUserAuth": "http://localhost:5000"
    }
  }
});
