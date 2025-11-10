import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // 포트 번호 설정
  },
  resolve: {
    alias: {
      "@": "/src", // 절대경로로 설정 (Vite에선 '/'는 프로젝트 루트)
    },
  },
});
