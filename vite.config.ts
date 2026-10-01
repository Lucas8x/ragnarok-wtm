import path from 'node:path';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), svelte()],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $src: path.resolve('./src'),
    },
  },
});
