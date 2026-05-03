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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const subPath = env.SUB_PATH || env.VITE_SUB_PATH || "/image/";

  return {
    base: normalizeBasePath(subPath),
    plugins: [react()],
    assetsInclude: ["**/*.wasm"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/scheduler")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/zustand")) {
              return "vendor-zustand";
            }
            if (id.includes("node_modules/@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("components/editor/canvas/Canvas")) {
              return "editor-canvas";
            }
            if (id.includes("components/editor/ExportDialog")) {
              return "editor-export";
            }
            if (id.includes("components/editor/inspector")) {
              return "editor-inspector";
            }
          },
        },
      },
    },
    server: {
      port: 5174,
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
