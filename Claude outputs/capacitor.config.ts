import type { CapacitorConfig } from '@capacitor/cli'

// The web build in dist/ is what gets wrapped for iOS and Android.
// Nothing else in the app needs to change to ship to the stores:
//   npm run build && npx cap add ios && npx cap sync
const config: CapacitorConfig = {
  appId: 'edu.uams.lacasa',
  appName: 'LA CASA',
  webDir: 'dist',
  backgroundColor: '#f4f9fd',
  ios: { contentInset: 'always' },
  android: { backgroundColor: '#f4f9fd' },
}

export default config
