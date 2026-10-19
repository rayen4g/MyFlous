# My Flous — Android Studio Conversion Guide (Capacitor)

This build is ready to be wrapped as a native Android app with
[Capacitor](https://capacitorjs.com). Everything below assumes you have
**Node.js 18+**, **Android Studio** (with an installed SDK + at least one
emulator or a USB-debugging device) already set up.

The web app itself needs **zero code changes** for this — it already:
- uses only **relative** paths (`css/...`, `js/...`, `assets/...`) so it works from a `file://`/WebView origin,
- persists everything in `localStorage` (no backend/server required),
- ships a `manifest.json` + `sw.js` (safe to leave in — Capacitor ignores the service worker inside the native WebView by default, but it's what makes the same build installable as a PWA on desktop/Android Chrome too),
- includes `capacitor.config.json` pre-filled with the app id, name, splash and status-bar colors matching the brand.

## 1. Initialize the native project

From the folder containing this `index.html`:

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "My Flous" "com.myflous.app" --web-dir "."
```

Since `capacitor.config.json` is already included in this backup with the
correct `appId`, `appName` and `webDir`, `npx cap init` will detect and
reuse it — just confirm the prompts.

## 2. Add the Android platform

```bash
npx cap add android
npx cap copy android
npx cap sync android
```

This generates an `android/` folder — a full Gradle project you open
directly in Android Studio.

## 3. Open in Android Studio

```bash
npx cap open android
```

Let Gradle sync finish, then just **Run ▶** on an emulator or a
USB-connected device. The whole app (HTML/CSS/JS) is bundled inside the
APK under `android/app/src/main/assets/public/`, so it works fully
offline out of the box — no server, no Wi-Fi needed.

## 4. Recommended Capacitor plugins (optional but nice)

These match the hooks already wired into `capacitor.config.json`:

```bash
npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/app
npx cap sync android
```

- **SplashScreen** — replaces the OS's default white flash with the app's
  own gold-on-charcoal splash before `index.html`'s own animated splash
  screen takes over.
- **StatusBar** — keeps the Android status bar dark, matching the app's
  `--bg`/`--dm-bg` tokens.
- **Keyboard** — resizes the WebView (not just overlays) when the amount/
  description inputs focus, so the bottom nav never gets covered.
- **App** — lets you hook the Android hardware back button to the app's
  own `App.goToPage('home')` / modal-close logic instead of exiting.

Example hardware back-button wiring (add near the end of `js/app.js` or
in a new small script, only runs where Capacitor exists — safe no-op on
the web):

```js
if (window.Capacitor?.isNativePlatform()) {
  const { App: CapApp } = window.Capacitor.Plugins;
  CapApp.addListener('backButton', () => {
    const openModal = document.querySelector('.modal-overlay.modal-open');
    if (openModal) { openModal.querySelector('[data-modal-close], [data-cat-modal-close]')?.click(); return; }
    if (document.querySelector('.page[data-page="home"]').classList.contains('page-active')) {
      CapApp.exitApp();
    } else {
      App.goToPage('home');
    }
  });
}
```

## 5. App icon & splash (native, optional)

The web icons in `assets/icons/` (`icon-192.png`, `icon-512.png`,
`icon-maskable-512.png`) are already the right source art for Android's
adaptive icon generator. In Android Studio:
`File → New → Image Asset` → pick `icon-512.png` as the foreground,
use the brand gold (`#F5B800`) as the background layer.

## 6. Building a release APK/AAB

Once you're happy testing in Android Studio:

```bash
npx cap sync android
```

then in Android Studio: **Build → Generate Signed Bundle / APK**, choose
**Android App Bundle (AAB)** for Play Store submission (or APK for
direct install/testing), and follow the signing-key wizard.

## 7. Updating the app later

Any time you edit the HTML/CSS/JS in this project:

```bash
npx cap copy android   # copies web assets into the native shell
npx cap sync android   # copy + updates native plugin bindings
```

then re-run from Android Studio.

## Notes on offline data

Everything the app stores — accounts, transactions, categories, profile,
theme, currency — lives in the WebView's `localStorage`, which Android
persists per-app just like any native app's private storage. Uninstalling
the app removes this data (same as any app); encourage users to use
**Profile → Export data** for their own backups before uninstalling or
switching devices, and **Import data** to restore.
