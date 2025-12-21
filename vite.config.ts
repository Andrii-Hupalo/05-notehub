import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/05-notehub/",
  plugins: [react()],
});
