import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [
        /^supabase/,
        /^@supabase/,
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      'supabase': '/dev/null',
    },
  },
});