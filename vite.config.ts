import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, 'src/store'),
      },
      {
        find: '@lib',
        replacement: path.resolve(__dirname, 'src/lib'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
    ],
  },
});
