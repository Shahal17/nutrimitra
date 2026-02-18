import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carenest.app',
  appName: 'CareNest',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
