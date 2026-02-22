import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Mystic-Markers/' : '/',

  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 忽略來自依賴的 Sass 警告
      },
    },
  }
}))
