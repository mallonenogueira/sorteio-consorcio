import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://mallonenogueira.github.io/sorteio-consorcio/",
  plugins: [react()],
});
