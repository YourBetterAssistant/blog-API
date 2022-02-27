declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    MONGODB: string;
    REDIS: string;
    PORT: number;
  }
}
