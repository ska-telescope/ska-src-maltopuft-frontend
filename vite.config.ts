import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),

    // Add support for test code coverage
    istanbul({
      include: ['src/*'],
      exclude: ['node_modules', 'cypress'],
      extension: ['.ts', '.tsx'],
      requireEnv: false
    })
  ],

  // Add support for test code coverage
  build: {
    sourcemap: true
  },

  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:3000'
  }
});
