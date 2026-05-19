import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/

export default ({ mode }) => {
  const { NODE_ENV } = process.env;
  const { VITE_basename } = { ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: NODE_ENV === 'production' ? VITE_basename : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      allowedHosts: ['all', 'itkongkit.psu.ac.th'],
      https: {
        port: 3000,
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
      },
    },
  });
};
