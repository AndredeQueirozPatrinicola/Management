import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: process.env.FRONT_DEV_HOST,
    port: process.env.FRONT_DEV_PORT
  },
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./"),
    }
  }
})