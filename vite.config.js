import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Vercel 部署用根路徑，GitHub Pages 需要加上 repo 名稱
  base: process.env.VERCEL ? '/' : (mode === 'production' ? '/Mystic-Markers/' : '/'),

  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 忽略來自依賴的 Sass 警告
      },
    },
  }
}))
