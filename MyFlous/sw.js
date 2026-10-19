/* =========================================================
   MY FLOUS — SERVICE WORKER
   Offline-first caching for the app shell so the whole app
   (UI, JS, CSS, icons) keeps working with zero network,
   which matters both for real users and for wrapping the app
   in a Capacitor Android WebView.

   Strategy:
   - App shell (HTML/CSS/JS/icons/manifest): cache-first,
     falling back to network, and self-healing the cache
     whenever a fresh copy is fetched.
   - Google Fonts: stale-while-revalidate (use cache
     instantly, refresh quietly in the background).
   - Everything else: network-first with a cache fallback.

   All actual app data (transactions, accounts, categories,
   profile, preferences) lives in localStorage on the page,
   never here — the service worker only caches static files.
   ========================================================= */

'use strict';

const CACHE_VERSION = 'v1.9.2';
const APP_CACHE = `myflous-app-${CACHE_VERSION}`;
const FONT_CACHE = `myflous-fonts-${CACHE_VERSION}`;

/** Every file required for the app to boot and run fully offline. */
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  './css/variables.css',
  './css/style.css',
  './css/animations.css',
  './css/responsive.css',
  './css/enhancements.css',
  './css/onboarding.css',
  './js/utils.js',
  './js/storage.js',
  './js/i18n.js',
  './js/transactions.js',
  './js/categories.js',
  './js/statistics.js',
  './js/profile.js',
  './js/pwa.js',
  './js/onboarding.js',
  './js/app.js',
  './assets/icons/favicon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png'
];

/* ---------------------------------------------------------
   INSTALL — precache the app shell, activate immediately
   --------------------------------------------------------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] Precache failed:', err))
  );
});

/* ---------------------------------------------------------
   ACTIVATE — drop any caches from a previous app version
   --------------------------------------------------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== FONT_CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ---------------------------------------------------------
   FETCH
   --------------------------------------------------------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Google Fonts: stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  // Same-origin app files: cache-first with network fallback
  if (url.origin === self.location.origin){
    event.respondWith(cacheFirst(request));
    return;
  }

  // Anything else (rare, third-party): try network, fall back to cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

async function cacheFirst(request){
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok){
      const cache = await caches.open(APP_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Fully offline and not cached yet — show the offline fallback
    // for navigation requests, otherwise just fail quietly.
    if (request.mode === 'navigate'){
      const fallback = await caches.match('./offline.html');
      if (fallback) return fallback;
    }
    return caches.match('./index.html');
  }
}

async function staleWhileRevalidate(request, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await networkFetch) || Response.error();
}

/* ---------------------------------------------------------
   MESSAGES — allow the page to request an immediate activation
   after a new service worker has finished installing.
   --------------------------------------------------------- */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
