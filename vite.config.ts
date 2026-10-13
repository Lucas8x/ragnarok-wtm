import path from 'node:path';
import process from 'node:process';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fileServer } from './src/dev/file-server.ts';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/ragnarok-wtm/' : '/',
  plugins: [fileServer(), tailwindcss(), enhancedImages(), svelte()],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $src: path.resolve('./src'),
    },
  },
});
