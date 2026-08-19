import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NezhaUI",
      fileName: (format) => (format === "es" ? "nezha-ui.js" : "nezha-ui.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: "nezha-ui.[ext]",
        globals: { react: "React", "react-dom": "ReactDOM" },
      },
    },
  },
});
