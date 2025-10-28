import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  base: './',
  build: { 
    outDir: '../dist', 
    emptyOutDir: true 
  },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:5000' },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'frontend/src') },
  },
});

