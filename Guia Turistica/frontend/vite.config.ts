// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()]
// });

// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 🔥 Permite acceso desde Docker
    port: 5137,
    strictPort: true,
    watch: {
      usePolling: true,
    }
  }
});
