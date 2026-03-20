import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration Vite pour l'application de chat BMAD Method
export default defineConfig({
  plugins: [react()],
  // Base URL pour GitHub Pages : /nom-du-repository/
  base: '/bmad-method-product-practice/',
  server: {
    port: 5173,
    open: true,
  },
});
