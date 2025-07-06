import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Expose .env variables to client-side code
    define: {
      'process.env': {
        VITE_MAINNET_POOL_FACTORY: JSON.stringify(env.VITE_MAINNET_POOL_FACTORY),
        VITE_MAINNET_BACKSTOP: JSON.stringify(env.VITE_MAINNET_BACKSTOP),
        VITE_MAINNET_EMITTER: JSON.stringify(env.VITE_MAINNET_EMITTER),
        VITE_MAINNET_COMET_FACTORY: JSON.stringify(env.VITE_MAINNET_COMET_FACTORY),
        VITE_MAINNET_COMET: JSON.stringify(env.VITE_MAINNET_COMET),
        VITE_TESTNET_POOL_FACTORY: JSON.stringify(env.VITE_TESTNET_POOL_FACTORY),
        VITE_TESTNET_BACKSTOP: JSON.stringify(env.VITE_TESTNET_BACKSTOP),
        VITE_TESTNET_EMITTER: JSON.stringify(env.VITE_TESTNET_EMITTER),
        VITE_BLND_TOKEN: JSON.stringify(env.VITE_BLND_TOKEN),
        VITE_USDC_TOKEN: JSON.stringify(env.VITE_USDC_TOKEN),
        VITE_XLM_TOKEN: JSON.stringify(env.VITE_XLM_TOKEN),
        VITE_WETH_TOKEN: JSON.stringify(env.VITE_WETH_TOKEN),
        VITE_WBTC_TOKEN: JSON.stringify(env.VITE_WBTC_TOKEN),
      }
    },
    server: {
      host: "::",
      port: 8080,
      // Enable CORS for development
      cors: true,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Optimize dependencies for production
    optimizeDeps: {
      include: ['@stellar/stellar-sdk', 'soroban-client'],
    },
    // Build configuration
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
    },
  };
});
