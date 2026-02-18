# CareNest as an App (PWA + Android/iOS)

CareNest is built as a web-first PWA, so you can use it as an installable app immediately, and then package it for Android/iOS stores.

## Option A: Install as PWA (fastest)

### Android (Chrome)
1. Deploy CareNest (`npm run build` + `npm run preview` or hosting).
2. Open URL in Chrome.
3. Tap **Install app** / **Add to Home screen**.
4. CareNest opens in standalone app mode using `manifest.webmanifest`.

### iPhone/iPad (Safari)
1. Open CareNest URL in Safari.
2. Tap **Share** → **Add to Home Screen**.
3. Launch from the home screen like a native app.

## Option B: Build native wrapper app with Capacitor

> Use this for Play Store/App Store delivery.

### 1) Install dependencies
```bash
npm install
```

### 2) Build web bundle
```bash
npm run build
```

### 3) Sync native projects
```bash
npm run mobile:sync
```

### 4) Run Android app
```bash
npm run mobile:android
```

### 5) Run iOS app (macOS only)
```bash
npm run mobile:ios
```

## Production notes
- Use HTTPS and production API URL.
- Configure push notifications (FCM/APNs) if needed.
- Add app icons/splash screens before store submission.
- Enable stricter auth hardening (2FA/OTP) and device attestation in production.
