import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const normalizeBasePath = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const subPath = env.SUB_PATH || env.VITE_SUB_PATH || "/video/";

  return {
    base: normalizeBasePath(subPath),
    plugins: [react()],
    assetsInclude: ["**/*.wasm"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@openreel/core": path.resolve(__dirname, "../../packages/core/src"),
      },
    },
    worker: {
      format: "es",
    },
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util", "@ffmpeg/core", "@ffmpeg/core-mt"],
    },
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "react";
            }
            if (id.includes("node_modules/zustand")) {
              return "zustand";
            }
            if (id.includes("node_modules/three")) {
              return "three";
            }
            if (id.includes("node_modules/@radix-ui")) {
              return "radix";
            }
          },
        },
      },
    },
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
    preview: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
  };
});
