import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',

  // Module aliasing.
  // Resolve @ to ./src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

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
    sourcemap: true,
    outDir: 'build',
    rollupOptions: {
      output: {
        // See https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id) => {
          if (id.includes('node_modules'))
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      },
      // See https://github.com/vitejs/vite/issues/15012#issuecomment-1815854072
      onLog(level, log, handler) {
        if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
          return;
        }
        handler(level, log);
      }
    }
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
