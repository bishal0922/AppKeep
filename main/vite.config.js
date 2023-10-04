import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  }
});