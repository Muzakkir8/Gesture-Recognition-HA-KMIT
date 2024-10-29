import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
    server: {
      host: '0.0.0.0', // Allows access from any IP in your network
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://192.168.97.145:8000', // Your backend server
          changeOrigin: true,
        },
      },   
      historyApiFallback: true,},  // This points to your PostCSS config
  }
})
