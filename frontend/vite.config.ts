import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('pdfjs-dist') || id.includes('react-pdf')) {
              return 'pdf-vendor'
            }
            if (id.includes('@ant-design') || id.includes('antd')) {
              return 'antd-vendor'
            }
            if (id.includes('@clerk')) {
              return 'clerk-vendor'
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
          }
        },
      },
    },
  },
})
