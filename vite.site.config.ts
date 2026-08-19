import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nezha-ui/",
  plugins: [react()],
  build: {
    outDir: "dist-site",
    emptyOutDir: true,
  },
});
