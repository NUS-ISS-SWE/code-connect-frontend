import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [
        "react",
        {
          react: [
            "createContext",
            "lazy",
            "Suspense",
            "useCallback",
            "useContext",
            "useEffect",
            "useMemo",
            "useRef",
            "useReducer",
            "useState",
          ],
        },
        "react-router-dom",
      ],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/jobpostings": {
        target: "http://localhost:8084",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
