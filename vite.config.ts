import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/",
  plugins: [react()],
  // server: {
  //   port: 3000,
  //   // Optional: Automatically open browser on server start
  //   open: true,
  //   // Optional: If port 3000 is taken, don't try another port
  //   strictPort: true
  // }
})