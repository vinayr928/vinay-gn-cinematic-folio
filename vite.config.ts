import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// GitHub Pages serves this repo at /vinay-gn-cinematic-folio/.
// Locally we want "/" so dev previews still work.
const base =
  process.env.GITHUB_PAGES === "true" ? "/vinay-gn-cinematic-folio/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: { host: "::", port: 8080 },
});
