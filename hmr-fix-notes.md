# HMR WebSocket repair notes

The managed preview serves the full-stack app through an HTTPS reverse proxy, while the embedded Vite bridge was injecting `/@vite/client` and the browser was attempting an unsupported localhost WebSocket connection. Setting `hmr: false` for `MANUS_WEBDEV_PROJECT_ID` alone did not prevent the client script from being injected, so the transformed development HTML now removes the exact Vite client script in managed preview mode. Local development keeps the default same-process HMR configuration.

Verification completed: the local rendered HTML no longer contains `/@vite/client`, the application entry remains present, the full-stack dev server starts on port 3000, the preview renders the ORKA LOTUS BEACH page, and `pnpm check` passes with zero TypeScript errors.
