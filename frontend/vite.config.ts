
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from "vite-plugin-node-polyfills";

// 🚨 Se elimina completamente la definición del plugin 'emailApiPlugin' 🚨

export default defineConfig({
  // Base Path: Usado para el despliegue estático.
  base: '/evm-dashboard',

  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },  
  plugins: [
    tsconfigPaths(),
    react(),
    nodePolyfills(),
  ],  
  preview: {
    port: 8081,
  },  
  server: {
    host: '0.0.0.0', 
    port: 5173,     
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false, // Usa 'true' si tu backend usa HTTPS
      },
    },
  },
});