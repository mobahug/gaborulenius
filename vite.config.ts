import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/gaborulenius/",
  build: {
    rollupOptions: {
      output: {
        // Create smaller chunks for vendor libraries
        manualChunks(id) {
          if (id.includes("node_modules/scrolly-video/")) {
            return "vendor-scrolly-video";
          }
          if (id.includes("node_modules/@mui/")) {
            return "vendor-mui";
          }
          if (id.includes("node_modules/jotai/")) {
            return "vendor-jotai";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "vendor-framer-motion";
          }
          if (id.includes("node_modules/react-intl/")) {
            return "vendor-react-intl";
          }
        },
      },
    },
  },
});
