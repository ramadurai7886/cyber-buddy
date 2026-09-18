import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cyberbuddy.app',
  appName: 'Cyber Buddy',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
