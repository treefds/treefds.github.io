import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative assets work on both username.github.io and /repository/ Pages sites.
export default defineConfig({
  base: './',
  plugins: [react()],
});
