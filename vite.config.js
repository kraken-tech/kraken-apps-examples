import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // When running in dev mode, serve files with CORS enabled to allow cross-origin requests from test environments.
  const cors = mode === "development";

  // To simplify the workflow when working locally, make the output file names static.
  const entryFilenames = mode === "development" ? {
    entryFileNames: "assets/localdev_app.js",
    chunkFileNames: "assets/localdev_app.js",
    assetFileNames: "assets/localdev_app.[ext]",
  } : {};

  return {
    plugins: [react()],
    server: { cors },
    build: {
      rollupOptions: {
        output: {
          // Avoid chunk splitting for the main entry point.
          manualChunks: undefined,
          // Avoid chunk splitting for dynamic imports.
          inlineDynamicImports: true,
          ...entryFilenames,
        },
      },
      // Massively increase the inline limit to prevent bundle splitting.
      assetsInlineLimit: 100000000,
      // Prevent CSS splitting.
      cssCodeSplit: false,
    }
  };
});
