import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // The output directory for build
    assetsDir: "assets", // Where assets will go
  },
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    host: "0.0.0.0", // Listen on all network interfaces
    port: 3001, // Match the exposed port
    strictPort: true, // Fail if the port is unavailable
  },
});
