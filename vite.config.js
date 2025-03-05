import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
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
      // // Proxy API requests to User Authentication
      // "/api": {
      //   target: "http://localhost:8081",
      //   changeOrigin: true,
      //   secure: false,
      // },

      // Proxy API requests to Profile Management
      "/profiles": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
