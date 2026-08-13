import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config";

// Dev-server config used only by the dev container (see Dockerfile `dev` stage).
// Bind mounts don't reliably forward filesystem events into Linux containers,
// so we poll for changes. Running `npm run dev` on the host is unaffected and
// keeps using native file watching.
export default mergeConfig(
  base,
  defineConfig({
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
  })
);
