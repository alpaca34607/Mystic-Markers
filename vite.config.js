import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base:process.env.NODE_ENV === 'production'?'/Mystic-Markers/':'/',
  base:'./',

  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 忽略來自依賴的 Sass 警告
      },
    },
  }
})
