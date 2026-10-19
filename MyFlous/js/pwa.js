/* =========================================================
   MY FLOUS — PWA / MOBILE POLISH LAYER
   Everything needed to make the app installable, offline-
   capable and feel native on Android (and inside a Capacitor
   WebView, where `serviceWorker` / `beforeinstallprompt` are
   simply absent and every call here safely no-ops).
   ========================================================= */

'use strict';

const PWAEnhancements = (() => {

  let deferredInstallPrompt = null;
  let routeProgressTimer = null;

  /* ---------------------------------------------------------
     SERVICE WORKER — register + surface "update available"
     --------------------------------------------------------- */
  function registerServiceWorker(){
    if (!('serviceWorker' in navigator)) return;

    // Skip entirely on file:// (e.g. some raw Capacitor/WebView setups
    // that don't route through https/http) where SW registration throws.
    if (location.protocol === 'file:') return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (!installing) return;
            installing.addEventListener('statechange', () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller){
                showStatusBanner({
                  variant: 'update',
                  message: 'A new version is ready.',
                  actionLabel: 'Reload',
                  onAction: () => {
                    installing.postMessage('SKIP_WAITING');
                    window.location.reload();
                  }
                });
              }
            });
          });
        })
        .catch((err) => console.warn('[PWA] Service worker registration failed:', err));
    });
  }

  /* ---------------------------------------------------------
     ONLINE / OFFLINE STATUS BANNER
     --------------------------------------------------------- */
  function bindConnectivityBanner(){
    if (!navigator.onLine){
      showStatusBanner({ variant: 'offline', message: "You're offline — changes are saved on this device.", sticky: true });
    }

    window.addEventListener('offline', () => {
      showStatusBanner({ variant: 'offline', message: "You're offline — changes are saved on this device.", sticky: true });
    });

    window.addEventListener('online', () => {
      showStatusBanner({ variant: 'online', message: 'Back online.', autoHideMs: 2200 });
    });
  }

  let bannerHideTimer = null;
  function ensureBannerEl(){
    let el = qs('#status-banner');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'status-banner';
    el.className = 'status-banner';
    el.innerHTML = `<span class="status-dot" aria-hidden="true"></span><span class="status-text"></span>`;
    document.body.appendChild(el);
    return el;
  }

  function showStatusBanner({ variant, message, actionLabel, onAction, sticky = false, autoHideMs = 0 }){
    const el = ensureBannerEl();
    el.setAttribute('data-variant', variant);
    qs('.status-text', el).textContent = message;

    const oldBtn = qs('button', el);
    if (oldBtn) oldBtn.remove();
    if (actionLabel && onAction){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = actionLabel;
      btn.addEventListener('click', onAction);
      el.appendChild(btn);
    }

    window.clearTimeout(bannerHideTimer);
    el.classList.add('is-visible');

    if (!sticky){
      const delay = autoHideMs || 3200;
      bannerHideTimer = window.setTimeout(() => el.classList.remove('is-visible'), delay);
    }
  }

  /* ---------------------------------------------------------
     CUSTOM "ADD TO HOME SCREEN" PROMPT
     --------------------------------------------------------- */
  function bindInstallPrompt(){
    window.addEventListener('beforeinstallprompt', (evt) => {
      evt.preventDefault();
      deferredInstallPrompt = evt;
      if (Storage.get('installDismissed', false)) return;
      showInstallChip();
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      hideInstallChip();
    });
  }

  function ensureInstallChip(){
    let el = qs('#install-chip');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'install-chip';
    el.className = 'install-chip';
    el.innerHTML = `
      <span>Install My Flous for quick, offline access</span>
      <button type="button" class="install-btn">Install</button>
      <button type="button" class="install-dismiss" aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    document.body.appendChild(el);

    qs('.install-btn', el).addEventListener('click', async () => {
      hapticTap();
      hideInstallChip();
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(() => null);
      deferredInstallPrompt = null;
    });
    qs('.install-dismiss', el).addEventListener('click', () => {
      hapticTap();
      Storage.set('installDismissed', true);
      hideInstallChip();
    });
    return el;
  }

  function showInstallChip(){
    const el = ensureInstallChip();
    window.requestAnimationFrame(() => el.classList.add('is-visible'));
  }
  function hideInstallChip(){
    const el = qs('#install-chip');
    if (el) el.classList.remove('is-visible');
  }

  /* ---------------------------------------------------------
     ROUTE PROGRESS BAR — brief, native-feeling loading cue
     shown during page navigation / heavier re-renders.
     --------------------------------------------------------- */
  function ensureProgressEl(){
    let el = qs('#route-progress');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'route-progress';
    el.className = 'route-progress';
    const container = qs('#page-container');
    (container || document.body).appendChild(el);
    return el;
  }

  function showRouteProgress(){
    const el = ensureProgressEl();
    window.clearTimeout(routeProgressTimer);
    el.classList.remove('is-done');
    // restart the CSS transition reliably
    void el.offsetWidth;
    el.classList.add('is-active');
  }

  function hideRouteProgress(){
    const el = qs('#route-progress');
    if (!el) return;
    el.classList.remove('is-active');
    el.classList.add('is-done');
    routeProgressTimer = window.setTimeout(() => el.classList.remove('is-done'), 260);
  }

  /* ---------------------------------------------------------
     RIPPLE MICRO-INTERACTION
     Delegated at the document level (one listener, works for
     content rendered later from localStorage) so every button,
     card, chip and nav item gets a consistent Material-style
     tap ripple with near-zero overhead.
     --------------------------------------------------------- */
  const RIPPLE_SELECTOR = [
    '.icon-btn', '.quick-action', '.account-card', '.stat-card', '.nav-item',
    '.nav-item-add', '.chip', '.btn-primary', '.btn-secondary', '.cat-add-btn',
    '.history-category-chip', '.filter-tab', '.cat-type-tab', '.txn-tab',
    '.cat-row-btn', '.color-picker-btn', '.icon-picker-btn'
  ].join(', ');

  function bindRipples(){
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    document.addEventListener('pointerdown', (evt) => {
      if (evt.button !== undefined && evt.button > 0) return;
      const target = evt.target.closest(RIPPLE_SELECTOR);
      if (!target || target.disabled) return;

      target.classList.add('ripple-surface');
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${(evt.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2}px`;
      ripple.style.top = `${(evt.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     PERFORMANCE — defer non-critical work, passive listeners
     --------------------------------------------------------- */
  function bindPerfSafeguards(){
    // Passive listeners on scroll surfaces so the browser never
    // has to block scrolling to check for preventDefault().
    qsa('.page, .modal-sheet').forEach(el => {
      el.addEventListener('touchstart', () => {}, { passive: true });
    });
  }

  function init(){
    registerServiceWorker();
    bindConnectivityBanner();
    bindInstallPrompt();
    bindRipples();
    bindPerfSafeguards();
  }

  return { init, showRouteProgress, hideRouteProgress, showStatusBanner };
})();

// See the matching note in app.js: top-level `const` doesn't attach to
// `window`, and app.js checks `window.PWAEnhancements` before calling
// back into it (route-progress bar on page navigation) — without this,
// that check always failed and the progress bar silently never showed.
window.PWAEnhancements = PWAEnhancements;

document.addEventListener('DOMContentLoaded', PWAEnhancements.init);
