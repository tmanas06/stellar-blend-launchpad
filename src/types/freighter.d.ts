// Type definitions for Freighter API
// These types are used throughout the application to ensure type safety with the Freighter wallet

declare module '@stellar/freighter-api' {
  export interface AddressResponse {
    publicKey: string;
    error?: string;
  }

  export interface IsConnectedResponse {
    isConnected: boolean;
  }

  export function isConnected(): Promise<IsConnectedResponse>;
  export function getPublicKey(): Promise<string>;
  export function getAddress(): Promise<AddressResponse>;
  export function signTransaction(xdr: string, network: string): Promise<string>;
  export function requestAccess(): Promise<string>;
  export function isAllowed(): Promise<boolean>;
}

// Global type augmentation for the Window object
declare global {
  interface Window {
    freighter?: {
      isConnected(): Promise<boolean>;
      getPublicKey(): Promise<string>;
      getAddress(): Promise<{ publicKey: string; error?: string }>;
      signTransaction(xdr: string, network?: string): Promise<string>;
      requestAccess(): Promise<string>;
      isAllowed(): Promise<boolean>;
    };
  }
}

export {}; // This ensures the file is treated as a module
