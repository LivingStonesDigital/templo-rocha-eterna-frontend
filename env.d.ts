

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PROD_POCKETBASE: string;
    VAPID_PRIVATE_KEY: string;
    VAPID_PUBLIC_KEY: string;
  }
}