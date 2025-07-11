export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  // App Configuration
  app: {
    name: 'Everything App',
    version: import.meta.env.VITE_APP_VERSION || '0.2.1',
    basePath: import.meta.env.VITE_BASE_PATH || '/everything',
  },
  
  // Feature Flags
  features: {
    qrScanner: true,
    qrGenerator: true,
    themeSwitcher: true,
  }
}

export type Config = typeof config 