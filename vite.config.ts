import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User Pages repo (btheard3.github.io) should use base "/"
export default defineConfig({
  plugins: [react()],
  base: "/",
});
