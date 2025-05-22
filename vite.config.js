import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      cors: mode === "development",
    },
    build: {
      rollupOptions: {
        output: {
          // Avoid chunk splitting for the main entry point.
          manualChunks: undefined,
          // Avoid chunk splitting for dynamic imports.
          inlineDynamicImports: true,
        },
      },
      // Massively increase the inline limit to prevent bundle splitting.
      assetsInlineLimit: 100000000,
      // Prevent CSS splitting.
      cssCodeSplit: false,
    }
  };
});
