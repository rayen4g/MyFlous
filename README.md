<div align="center">
  <img src="MyFlous/assets/images/logo.png" alt="My Flous logo" width="112" />
  <h1>My Flous</h1>
  <p><strong>Every dinar. One clear picture.</strong></p>
  <p>A modern, mobile-first personal finance tracker for organizing income, expenses, transfers, and savings — all in one place.</p>
  <p>
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img alt="PWA" src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" />
    <img alt="Android" src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" />
  </p>
</div>
---
💸 About My Flous
My Flous is a personal finance tracking app designed to make everyday money management feel simple, clear, and approachable. Track what comes in, what goes out, how money moves between accounts, and how much you set aside — without juggling multiple tools.
From daily coffee to monthly bills and long-term savings goals, My Flous gives your finances a single, organized home. Its responsive interface is designed for smaller screens as well as desktop, while multilingual support makes the experience more accessible.
> **Track every dinar. Understand your habits. Make your next move count.**
✨ Features
Personal finance dashboard — get a quick overview of balances and monthly activity.
Three account types — organize money across cash, bank, and savings accounts.
Income and expense tracking — record transactions and categorize everyday spending.
Account-to-account transfers — keep transfers between your accounts reflected in your balances.
Transaction history — review activity and filter records by transaction type.
Monthly statistics — compare income and expenses and understand your money flow.
Savings visibility — keep savings alongside your everyday accounts.
Customizable preferences — choose a light or dark theme, supported language, and currency.
Multilingual interface — English, French, and Arabic, including right-to-left layout support for Arabic.
Data backup and restore — export your app data to a JSON backup and restore it when needed.
Local-first storage — app data is stored on the device/browser using `localStorage`; no backend is required for the core experience.
Progressive Web App (PWA) — includes a web app manifest, service worker, and app icons for an installable experience in supported browsers.
Android package included — an APK is provided in the repository's `apk/` directory.
Onboarding and responsive UI — a guided first-run setup and layouts designed for mobile use.
🖼️ Project Preview
The repository includes the presentation website and the My Flous application files. Add screenshots or a short demo GIF here to make the repository even more engaging:
```text
README preview section
├── Dashboard screenshot
├── Transaction / transfer screenshot
└── Statistics screenshot
```
For example, upload screenshots to a `screenshots/` folder and embed them like this:
```md
![My Flous dashboard](screenshots/dashboard.png)
```
🧰 Built With
Technology	Role
HTML5	App structure and interface
CSS3	Responsive layouts, themes, and animations
Vanilla JavaScript	Transactions, account logic, statistics, settings, and interactions
Browser `localStorage`	Local persistence for app data and preferences
PWA technologies	Manifest, service worker, and installable web experience
Capacitor configuration	Prepared configuration for packaging the web app for Android
🚀 Run the Project
Option 1 — Open the main app locally
Download or clone this repository.
Open the `MyFlous/` directory.
Run `index.html` in a modern browser. For the best PWA/service-worker experience, serve the directory through a local development server instead of opening it directly as a `file://` URL.
Example using VS Code:
Open the `MyFlous/` folder in VS Code.
Start a local server with an extension such as Live Server.
Open the local URL shown by the extension.
Option 2 — View the presentation website
The repository root also contains an `index.html` presentation page. Open it or serve the repository root to view the project presentation.
Option 3 — Install on Android
A prebuilt APK is included at:
```text
apk/MyFlous.apk
```
Download the APK to an Android device and install it if you trust the source and understand the risks of installing apps outside an official app store. Android may ask you to allow installation from that source.
Option 4 — Build the Android app with Capacitor
The `MyFlous/` directory contains `capacitor.config.json` and an Android setup guide. To create or sync the native Android project, use Node.js and the Capacitor CLI:
```bash
cd MyFlous
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```
If an `android/` platform directory already exists, skip `npx cap add android` and run `npx cap sync android`. See `MyFlous/CAPACITOR_ANDROID_SETUP.md` for additional setup notes. A native build may require compatible Android Studio, Android SDK, Gradle, and Capacitor versions.
🗂️ Repository Structure
```text <br><br>
.
├── index.html                 # Project presentation website
├── css/                       # Presentation website styles
├── js/                        # Presentation website scripts and translations
├── assets/                    # Presentation assets
├── apk/
│   └── MyFlous.apk             # Android APK
├── MyFlous/
│   ├── index.html              # Main finance tracker app
│   ├── css/                    # App styles, themes, and responsive UI
│   ├── js/                     # App logic, storage, transactions, statistics, i18n
│   ├── assets/                 # App logo and icons
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   ├── capacitor.config.json   # Capacitor configuration
│   ├── CAPACITOR_ANDROID_SETUP.md
│   └── CHANGELOG.md
└── README.md

<br>
```
🔐 Privacy & Data
My Flous is designed around local-first data storage. The core app stores its information in the browser or WebView's local storage rather than requiring an app-owned server.
Your data is tied to the browser/app storage on that device.
Clearing browser/site data or uninstalling the app may remove locally stored information.
Export a backup regularly if you want a copy you can restore later.
A JSON backup can contain personal financial information. Store it securely and do not publish it in a public repository.
Local storage is not the same as encrypted financial storage. Avoid using real sensitive financial data in a development/demo build unless you have reviewed its security limitations.
🧭 Roadmap Ideas
Potential future improvements include:
Optional encrypted backups and clearer recovery workflows.
Recurring transactions and bill reminders.
Budgets by category and spending limits.
More detailed charts and month-to-month comparisons.
Search and advanced transaction filters.
Automated tests for balances, transfers, and backup restoration.
A documented release process and signed Android builds.
🤝 Contributing
Suggestions, bug reports, and improvements are welcome. If you plan to contribute:
Fork the repository.
Create a feature branch (`git checkout -b feature/your-feature`).
Keep changes focused and test key flows such as adding transactions, transferring money, changing preferences, and importing a backup.
Open a pull request describing what changed and how you tested it.
⚠️ Disclaimer
My Flous is a personal finance tracking project. It is not a bank, payment processor, investment service, or provider of financial advice. Balances and statistics depend on the information entered by the user. The included APK should be installed only if you trust the build source.
👤 Author
Created by Rayen Ben Amara.
If you find the project useful, consider giving the repository a ⭐ on GitHub and sharing feedback or ideas for improvement.
---
<div align="center">
  <strong>My Flous</strong><br />
  <sub>Small steps. Bigger goals.</sub>
</div>
