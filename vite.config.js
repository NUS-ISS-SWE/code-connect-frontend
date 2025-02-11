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
            "useRef",
            "useState",
            "useMemo",
          ],
        },
        "react-router-dom",
        {
          "@mui/material": [
            "Box",
            "Button",
            "CircularProgress",
            "IconButton",
            "InputAdornment",
            "LinearProgress",
            "Snackbar",
            "Stack",
            "TextField",
            "Typography",
          ],
        },
      ],
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
