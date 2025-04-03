import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'chatting-app',
  webDir: 'www',
  plugins: {
    Geolocation: {
      enabled: true,
    },
  },
};

export default config;
