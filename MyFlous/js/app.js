/* =========================================================
   MY FLOUS — APP
   Boots the splash sequence, applies the saved theme, and
   wires up the app-shell navigation (top nav + bottom nav +
   page transition system). Phase 1 foundation only.
   ========================================================= */

'use strict';

const App = (() => {

  const SPLASH_DURATION_MS = 3000;
  const SPLASH_EXIT_MS = 500;

  let currentPage = 'home';

  /* ---------------------------------------------------------
     DASHBOARD / HOME PAGE
     --------------------------------------------------------- */

  /**
   * Returns "Good Morning" / "Good Afternoon" / "Good Evening"
   * based on the device's current local time.
   */
  function getGreeting(){
    const hour = new Date().getHours();
    const key = (hour < 5 || hour >= 18) ? 'greeting.evening'
      : (hour < 12) ? 'greeting.morning'
      : 'greeting.afternoon';
    return window.I18n ? window.I18n.t(key) : key;
  }

  /**
   * Animate a number from 0 up to `target`, formatted with 3
   * decimals to match the app's currency style (e.g. 450.000).
   * Uses requestAnimationFrame with an ease-out curve — no
   * external animation library needed.
   * @param {HTMLElement} el
   * @param {number} target
   * @param {number} [duration]
   */
  function animateCounter(el, target, duration = 600){
    if (!el) return;
    // Start from whatever is currently on screen (parsed back out of the
    // formatted "1,234.567" string) rather than always resetting to 0.
    // Otherwise every live update (e.g. right after adding an expense)
    // makes every counter flash down to 0 before counting back up, which
    // reads as broken/glitchy even though the underlying data is correct.
    const parsedCurrent = parseFloat((el.textContent || '').replace(/,/g, ''));
    const start = Number.isFinite(parsedCurrent) ? parsedCurrent : 0;
    const startTime = performance.now();

    // Respect reduced-motion preference: snap to final value.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion){
      el.textContent = target.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      return;
    }

    function easeOutQuint(t){ return 1 - Math.pow(1 - t, 5); }

    function tick(now){
      const elapsed = now - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const eased = easeOutQuint(progress);
      const value = start + (target - start) * eased;
      el.textContent = value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      if (progress < 1){
        requestAnimationFrame(tick);
      }else{
        el.textContent = target.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      }
    }
    requestAnimationFrame(tick);
  }

  /**
   * Kick off the count-up animation for every element on the
   * Dashboard carrying a [data-counter-target] attribute.
   */
  function animateAllCounters(scopeEl){
    qsa('[data-counter-target]', scopeEl).forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter-target')) || 0;
      animateCounter(el, target);
    });
  }

  /**
   * Render the greeting, balance, account cards and statistic
   * cards from Storage into the Dashboard's data-counter-target
   * attributes, then trigger the count-up animation.
   */
  function renderDashboard(){
    const homePage = qs('.page[data-page="home"]');
    if (!homePage) return;

    // ---- Greeting ----
    const greetingEl = qs('#greeting-text');
    if (greetingEl) greetingEl.textContent = getGreeting();

    // ---- Accounts ----
    const accounts = Storage.Accounts.getAll();
    const total = Storage.Accounts.getTotal();

    setCounterTarget('#balance-counter', total);
    setCounterTarget('#acc-cash-counter', accounts.cash);
    setCounterTarget('#acc-bank-counter', accounts.bank);
    setCounterTarget('#acc-savings-counter', accounts.savings);

    // ---- Monthly statistics ----
    const stats = Storage.DashboardStats.getStats();
    setCounterTarget('#stat-income-counter', stats.income);
    setCounterTarget('#stat-expenses-counter', stats.expenses);
    setCounterTarget('#stat-saved-counter', stats.saved);
    setCounterTarget('#stat-remaining-counter', stats.remaining);
    setCounterTarget('#stat-income-inline', stats.income);
    setCounterTarget('#stat-expenses-inline', stats.expenses);

    // ---- Recent transactions preview (latest 3) ----
    renderRecentTransactions();

    // ---- Animate every counter on the page ----
    animateAllCounters(homePage);
  }

  function setCounterTarget(selector, value){
    const el = qs(selector);
    if (el) el.setAttribute('data-counter-target', Number(value) || 0);
  }

  /**
   * Build the "Recent transactions" preview list from
   * Storage.Transactions — read-only preview, no add/edit
   * logic yet (that lands with the Add page in Phase 3).
   */
  function renderRecentTransactions(){
    const list = qs('#recent-tx-list');
    if (!list) return;

    renderListWithSkeleton(list, 3, () => {
      const transactions = Storage.Transactions.getAll().slice(0, 3);
      if (transactions.length === 0){
        return `<div class="tx-empty">No transactions yet. Tap a quick action above to get started.</div>`;
      }
      return transactions.map(tx => TxRow.render(tx)).join('');
    });
  }

  /**
   * Paint a brief skeleton placeholder, then swap in the real
   * markup on the next animation frame. Guarantees a smooth,
   * "content is loading" feel on the very first paint (splash
   * screen already covers this) and on low-end devices where a
   * big ledger takes a couple of frames to render, without ever
   * artificially delaying the app.
   * @param {HTMLElement} container
   * @param {number} rows
   * @param {Function} renderFn returns the real innerHTML string
   */
  function renderListWithSkeleton(container, rows, renderFn){
    container.innerHTML = skeletonRowsHTML(rows);
    requestAnimationFrame(() => {
      container.innerHTML = renderFn();
    });
  }

  function skeletonRowsHTML(rows = 3){
    return Array.from({ length: rows }).map(() => `
      <div class="skeleton-row">
        <div class="skeleton-block sk-icon"></div>
        <div class="skeleton-lines">
          <div class="skeleton-block sk-line w-60"></div>
          <div class="skeleton-block sk-line w-35"></div>
        </div>
        <div class="skeleton-block sk-amount"></div>
      </div>`).join('');
  }

  /* ---------------------------------------------------------
     THEME
     --------------------------------------------------------- */
  function initTheme(){
    const saved = Storage.Prefs.getTheme();
    applyTheme(saved, /*persist*/ false);
  }

  function applyTheme(theme, persist = true){
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (persist) Storage.Prefs.setTheme(theme);

    const toggle = qs('#theme-toggle');
    if (toggle) toggle.classList.toggle('on', theme === 'dark');

    // Keep the Android/iOS status bar and browser chrome in sync with
    // the app's own theme (not just the OS's prefers-color-scheme).
    const metaThemeColor = qs('#meta-theme-color');
    if (metaThemeColor) metaThemeColor.setAttribute('content', theme === 'dark' ? '#0A0A0C' : '#FDFBF6');
  }

  function toggleTheme(){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    hapticTap();
    applyTheme(isDark ? 'light' : 'dark');
  }

  /* ---------------------------------------------------------
     CURRENCY
     --------------------------------------------------------- */
  /**
   * Push the saved currency preference into every static label
   * on screen, then re-render the amount-bearing views so every
   * formatted figure picks up the new currency too.
   */
  function applyCurrency(){
    const currency = Storage.Prefs.getCurrency();

    const balanceCurrencyEl = qs('#balance-currency');
    if (balanceCurrencyEl) balanceCurrencyEl.textContent = currency;

    qsa('.acc-currency').forEach(el => { el.textContent = currency; });

    const txnCurrencyEl = qs('#txn-amount-currency');
    if (txnCurrencyEl) txnCurrencyEl.textContent = currency;

    const select = qs('#currency-select');
    if (select && select.value !== currency) select.value = currency;

    renderDashboard();
    if (window.Statistics) Statistics.render();
    if (window.History) History.render();
  }

  /* ---------------------------------------------------------
     ONBOARDING GATE
     Decides whether the first-run wizard should play. Returns
     false (and silently marks onboarding as complete) for any
     device that already has real data on it — e.g. someone
     updating from a pre-onboarding version of the app — so
     existing users are never forced through setup again.
     Reset Data wipes Storage.clearAll() + reloads, which clears
     this flag along with everything else, so onboarding always
     comes back after a reset without any extra wiring here.
     --------------------------------------------------------- */
  function shouldShowOnboarding(){
    if (Storage.Prefs.hasCompletedOnboarding()) return false;

    const isReturningUser = Storage.exists('profile')
      || Storage.Transactions.getAll().length > 0
      || Storage.Accounts.getTotal() > 0;

    if (isReturningUser){
      Storage.Prefs.setOnboardingComplete(true);
      Storage.Prefs.setSeenGuideTour(true); // don't tour someone who already knows the app
      return false;
    }
    return true;
  }

  /* ---------------------------------------------------------
     SPLASH SCREEN
     --------------------------------------------------------- */
  function revealShell(){
    const shell = qs('#app-shell');
    if (!shell) return;
    shell.classList.add('shell-visible');
    shell.removeAttribute('aria-hidden');
  }

  function maybeStartGuideTour(){
    if (!window.GuideTour) return;
    if (Storage.Prefs.hasSeenGuideTour()) return;
    // Home is already the active tab right after onboarding/splash, but
    // guard anyway in case a saved lastPage sent the user elsewhere.
    if (currentPage !== 'home') return;
    window.setTimeout(() => GuideTour.start(), 500);
  }

  function runSplashSequence(){
    const splash = qs('#splash-screen');

    const finish = () => {
      splash.classList.add('splash-exit');
      window.setTimeout(() => {
        splash.remove();
        if (window.Onboarding && shouldShowOnboarding()){
          Onboarding.open(() => {
            revealShell();
            maybeStartGuideTour();
          });
        } else {
          revealShell();
          maybeStartGuideTour();
        }
      }, SPLASH_EXIT_MS);
    };

    // Allow skipping the splash by tapping it (nice real-app touch).
    splash.addEventListener('click', finish, { once: true });

    window.setTimeout(finish, SPLASH_DURATION_MS);
  }

  /* ---------------------------------------------------------
     NAVIGATION / PAGE TRANSITIONS
     --------------------------------------------------------- */
  // Bottom-nav tab order, used only to pick a left/right transition direction.
  const NAV_ORDER = ['home', 'history', 'statistics', 'profile'];

  function goToPage(pageName){
    if (pageName === currentPage) return;

    const nextEl = qs(`.page[data-page="${pageName}"]`);
    const currentEl = qs(`.page[data-page="${currentPage}"]`);
    if (!nextEl) return;

    hapticTap();
    if (window.PWAEnhancements) PWAEnhancements.showRouteProgress();

    const pageContainer = qs('#page-container');
    if (pageContainer){
      const fromIdx = NAV_ORDER.indexOf(currentPage);
      const toIdx = NAV_ORDER.indexOf(pageName);
      const dir = (fromIdx === -1 || toIdx === -1 || toIdx >= fromIdx) ? 'forward' : 'back';
      pageContainer.setAttribute('data-nav-dir', dir);
    }

    if (currentEl){
      currentEl.classList.add('anim-page-exit');
      window.setTimeout(() => {
        currentEl.classList.remove('page-active', 'anim-page-exit');
      }, 180);
    }

    nextEl.classList.add('page-active', 'anim-page-enter');
    window.setTimeout(() => {
      nextEl.classList.remove('anim-page-enter');
      if (window.PWAEnhancements) PWAEnhancements.hideRouteProgress();
    }, 340);

    updateBottomNavActive(pageName);
    updateTopBar(pageName);

    currentPage = pageName;
    Storage.Prefs.setLastPage(pageName);
    nextEl.scrollTop = 0;

    // Re-play the Dashboard's count-up animation each time it's revisited.
    if (pageName === 'home') animateAllCounters(nextEl);

    // Re-render Statistics from the latest ledger every time it's opened,
    // so newly added transactions are always reflected.
    if (pageName === 'statistics' && window.Statistics) Statistics.render();

    // Same idea for History — re-render on every visit so a currency
    // change (or any other edit) made elsewhere is always reflected.
    if (pageName === 'history' && window.History) History.render();
  }

  function updateBottomNavActive(pageName){
    qsa('.nav-item, .nav-item-add').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageName);
    });
  }

  function updateTopBar(pageName){
    const titleEl = qs('#top-bar-title');
    if (!titleEl) return;
    const t = window.I18n ? window.I18n.t : (k => k);
    const labels = {
      home: t('brand.name'),
      history: t('nav.history'),
      add: t('nav.addTransactionAria'),
      statistics: t('nav.stats'),
      profile: t('nav.profile')
    };
    titleEl.textContent = labels[pageName] || t('brand.name');
  }

  function bindNavigation(){
    // NOTE: `.page` sections themselves carry `data-page="..."` too (used
    // to identify them for goToPage's querySelector lookups), so a plain
    // `[data-page]` selector here would ALSO bind a click listener to the
    // page wrapper itself. Clicking any in-page link (like the "Details"
    // or "See all" links) would then bubble and fire goToPage() a second
    // time for the *current* page right after firing it for the target
    // page, undoing the navigation. Excluding `.page` keeps this bound
    // only to actual nav controls (nav items, drawer links, in-page
    // "Details"/"See all" links, etc.).
    qsa('[data-page]:not(.page)').forEach(el => {
      el.addEventListener('click', () => goToPage(el.dataset.page));
    });
  }

  /* ---------------------------------------------------------
     HISTORY-FILTER ENTRY POINTS
     Cards like the "Income" stat card act as an "Income Details"
     button: tapping (or Enter/Space, since they're role="button")
     jumps to History pre-filtered to that transaction type.
     --------------------------------------------------------- */
  function bindHistoryFilterEntryPoints(){
    const openFiltered = (el) => {
      const type = el.dataset.historyFilter;
      if (!type) return;
      hapticTap();
      goToPage('history');
      if (window.History) History.filterByType(type);
    };

    qsa('[data-history-filter]').forEach(el => {
      el.addEventListener('click', () => openFiltered(el));
      el.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter' || evt.key === ' '){
          evt.preventDefault();
          openFiltered(el);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     TOP NAV ACTIONS (menu / notifications / profile)
     --------------------------------------------------------- */
  /** Show the bell badge only when an unread notification actually exists. */
  function updateNotifBadge(){
    const dot = qs('#notif-btn .notif-dot');
    if (!dot) return;
    dot.classList.toggle('is-visible', Storage.Notifications.hasUnread());
  }

  function bindTopNavActions(){
    const menuBtn = qs('#menu-btn');
    const notifBtn = qs('#notif-btn');
    const profileBtn = qs('#profile-btn');

    if (menuBtn){
      menuBtn.addEventListener('click', () => {
        hapticTap();
        openDrawer();
      });
    }

    if (notifBtn){
      notifBtn.addEventListener('click', () => {
        hapticTap();
        console.info('[My Flous] Notifications tapped — notification center arrives in Phase 2.');
        Storage.Notifications.markAllRead();
        updateNotifBadge();
      });
    }

    if (profileBtn){
      profileBtn.addEventListener('click', () => goToPage('profile'));
    }
  }

  /* ---------------------------------------------------------
     SIDE DRAWER MENU
     Slide-out panel (opened from the top-nav menu button) with
     quick links to the four main pages plus Export/Reset data
     shortcuts. The shortcuts simply forward to the existing
     Profile-page buttons so there's one source of truth for
     what Export/Reset actually do (including the Reset confirm
     dialog and the Toasts).
     --------------------------------------------------------- */
  let drawerOpen = false;

  function drawerEls(){
    return {
      overlay: qs('#drawer-overlay'),
      panel:   qs('#drawer-panel')
    };
  }

  function updateDrawerActive(){
    qsa('.drawer-link[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === currentPage);
    });
  }

  function openDrawer(){
    const { overlay, panel } = drawerEls();
    if (!overlay || drawerOpen) return;
    drawerOpen = true;

    updateDrawerActive();
    overlay.classList.add('drawer-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => panel.classList.add('panel-in'));
  }

  function closeDrawer(){
    const { overlay, panel } = drawerEls();
    if (!overlay || !drawerOpen) return;
    drawerOpen = false;

    panel.classList.remove('panel-in');
    panel.classList.add('panel-out');
    overlay.classList.remove('drawer-open');

    window.setTimeout(() => {
      panel.classList.remove('panel-out');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }, 280);
  }

  function bindDrawer(){
    const { overlay } = drawerEls();
    if (!overlay) return;

    qsa('[data-drawer-close]').forEach(el => {
      el.addEventListener('click', () => {
        hapticTap();
        closeDrawer();
      });
    });

    const exportBtn = qs('#drawer-export-btn');
    if (exportBtn) exportBtn.addEventListener('click', () => qs('#export-backup-btn')?.click());

    const resetBtn = qs('#drawer-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => qs('#reset-data-btn')?.click());

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && drawerOpen) closeDrawer();
    });
  }

  /* ---------------------------------------------------------
     PROFILE PAGE: theme switch binding
     --------------------------------------------------------- */
  function bindThemeSwitch(){
    const toggle = qs('#theme-toggle');
    if (toggle) toggle.addEventListener('click', toggleTheme);
  }

  function bindReplayTour(){
    const btn = qs('#replay-tour-btn');
    if (!btn || !window.GuideTour) return;
    btn.addEventListener('click', () => {
      hapticTap();
      goToPage('home');
      window.setTimeout(() => GuideTour.start(), 380);
    });
  }

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  function init(){
    Storage.seedDefaultsIfEmpty();
    if (window.I18n) I18n.init();
    initTheme();
    bindNavigation();
    bindTopNavActions();
    bindDrawer();
    bindThemeSwitch();
    bindHistoryFilterEntryPoints();
    initTransactionSystem();
    initCategorySystem();
    if (window.initProfileSystem) initProfileSystem();
    if (window.Onboarding) Onboarding.bind();
    if (window.GuideTour) GuideTour.bind();
    bindReplayTour();
    applyCurrency(); // also renders the Dashboard + Statistics with the saved currency
    updateNotifBadge();
    runSplashSequence();

    // Restore last visited tab (defaults to home on first run).
    // "add" no longer exists as a page (it's the modal now), so guard
    // against restoring into it from an older saved preference.
    const lastPage = Storage.Prefs.getLastPage();
    const lastPageEl = lastPage ? qs(`.page[data-page="${lastPage}"]`) : null;
    if (lastPage && lastPage !== 'home' && lastPageEl){
      lastPageEl.classList.add('page-active');
      qs('.page[data-page="home"]')?.classList.remove('page-active');
      currentPage = lastPage;
      updateBottomNavActive(lastPage);
      updateTopBar(lastPage);
    }
  }

  return {
    init, goToPage, toggleTheme, renderDashboard, animateAllCounters, applyCurrency,
    updateNotifBadge, renderListWithSkeleton, skeletonRowsHTML,
    refreshChrome: () => updateTopBar(currentPage)
  };
})();

// Top-level `const` does not attach to `window` the way `var`/function
// declarations do. Other files (transactions.js, categories.js) check
// `window.App` before calling back into it to refresh the Dashboard
// live after a transaction — without this, that check always failed
// and the Dashboard only updated on the next navigation/reload.
window.App = App;

document.addEventListener('DOMContentLoaded', App.init);
