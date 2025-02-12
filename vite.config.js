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
            "ClickAwayListener",
            "Divider",
            "IconButton",
            "InputAdornment",
            "LinearProgress",
            "Menu",
            "MenuItem",
            "Snackbar",
            "Stack",
            "TextField",
            "Toolbar",
            "Typography",
          ],
        },
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',  
  },
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
