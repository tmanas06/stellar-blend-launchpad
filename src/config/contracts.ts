// src/config/contracts.ts
export const CONTRACTS = {
    MAINNET: {
      POOL_FACTORY: import.meta.env.VITE_MAINNET_POOL_FACTORY,
      BACKSTOP: import.meta.env.VITE_MAINNET_BACKSTOP,
      EMITTER: import.meta.env.VITE_MAINNET_EMITTER,
      COMET_FACTORY: import.meta.env.VITE_MAINNET_COMET_FACTORY,
      COMET: import.meta.env.VITE_MAINNET_COMET,
    },
    TESTNET: {
      POOL_FACTORY: import.meta.env.VITE_TESTNET_POOL_FACTORY,
      BACKSTOP: import.meta.env.VITE_TESTNET_BACKSTOP,
      EMITTER: import.meta.env.VITE_TESTNET_EMITTER,
    },
    TOKENS: {
      BLND: import.meta.env.VITE_BLND_TOKEN,
      USDC: import.meta.env.VITE_USDC_TOKEN,
      XLM: import.meta.env.VITE_XLM_TOKEN,
      WETH: import.meta.env.VITE_WETH_TOKEN,
      WBTC: import.meta.env.VITE_WBTC_TOKEN,
    }
  } as const;
  
  export type NetworkType = 'MAINNET' | 'TESTNET';
  
  export function getContracts(network: NetworkType) {
    return {
      ...CONTRACTS[network],
      tokens: CONTRACTS.TOKENS
    };
  }