import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",
  },

  server: {
    proxy: {
      "/sign-up": "http://localhost:3000",
      "/log-in": "http://localhost:3000",
      "/log-out": "http://localhost:3000",
      "/delete": "http://localhost:3000",
      "/create-folder": "http://localhost:3000",
      "/add-file": "http://localhost:3000",
      "/delete-file": "http://localhost:3000",
      "/folder": "http://localhost:3000",
    },
  },
});
