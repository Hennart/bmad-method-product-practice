import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration Vite pour l'application de chat BMAD Method
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
