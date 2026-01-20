import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, "index.html"),
        "mtkruto-worker": resolve(__dirname, "mtkruto-worker.js"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
