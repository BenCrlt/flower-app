import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, type PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tanstackRouter({ routesDirectory: "./src/routes" }),
    tailwindcss(),
    react(),
    svgr(),
    ...(VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["flower.svg"],
      manifest: {
        name: "Flower Admin",
        short_name: "Flower",
        description: "Gestion du Flower Music Festival",
        theme_color: "#09090b",
        background_color: "#09090b",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "flower.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
    }) as PluginOption[]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
  },
});
