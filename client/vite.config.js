import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 8081,
    // Exclude favicon.ico from being processed
    watch: {
      exclude: ['**/favicon.ico']
    }
  },
});
