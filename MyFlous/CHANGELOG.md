# My Flous — First-Run Onboarding + Guided Tour (v1.9.2)

## Added

- **Animated first-run onboarding wizard** — instead of dropping
  straight into an empty dashboard, a brand-new install (or a device
  right after **Reset Data**) now walks through a 6-step wizard:
  a Welcome screen with a floating animated coin logo, Language
  (choose English/French/Arabic — applies live, no reload needed),
  Name, Country (reuses the existing Country picker sheet), Category
  (Pupil / Student / Employee, matching the existing occupation
  field), and a Ready screen that personalizes its message with the
  name just entered. Every step slides in with its own staggered
  entrance animation; a progress bar tracks position and a Skip
  button is always available. Finishing (or skipping) saves straight
  into the existing Profile/Prefs storage, so the Profile page and
  Home greeting are populated immediately — no separate first-run
  data model.
- **One-time guided Home tour** — right after onboarding (or a splash
  launch that's already onboarded), a spotlight-and-tooltip walkthrough
  briefly highlights the Balance card, the **+** add button, the
  History/Statistics tabs, and the Profile avatar, with a pulsing gold
  ring around each and a "Skip tour" option. Plays once automatically,
  and can be replayed anytime from **Profile → Replay app tour**.
- Existing installs that update to this version are detected (any
  saved profile, transactions, or account balance) and are silently
  marked as already onboarded — they're never forced through setup.
- New files: `css/onboarding.css`, `js/onboarding.js`.

---

# My Flous — Country Picker (v1.3.15)

## Changed

- **Profile → Country is now a proper mobile picker, not a native
  `<datalist>`** — `<datalist>` renders inconsistently (and on some
  mobile browsers, not at all as a usable dropdown) so tapping the
  field used to just pop the keyboard with no real way to browse
  options. The field is now a button that opens the same bottom-sheet
  style used by "Manage Categories", with a search box on top and
  every country listed below, grouped under A–Z letter headers like a
  contacts app. Tapping a country selects it, closes the sheet, and
  saves immediately; reopening it scrolls to and checkmarks whatever
  is currently selected.
- **Country list is now comprehensive** — replaced the old ~40-country
  shortlist with the full alphabetical list of world countries (UN
  member states + Holy See + State of Palestine + Taiwan), **excluding
  Israel** per request. 194 countries in total.

---

# My Flous — "Details" / "See all" Home Links (v1.3.14)

## Fixed

- **"Details" (This Month) and "See all" (Recent transactions) links on
  Home did nothing** — both already carried the correct
  `data-page="statistics"` / `data-page="history"` markup, but
  `bindNavigation()` bound its click listener to *every* `[data-page]`
  element, and the `.page` section wrappers themselves also carry a
  `data-page` attribute (used elsewhere to look them up). Clicking a
  link inside a page bubbled up into that page's own listener, so
  `goToPage()` fired twice in one click — once for the target page,
  then immediately again for the page you were already on — which
  left neither page marked active. Scoped the selector to
  `[data-page]:not(.page)` so only actual nav controls (nav items,
  drawer links, in-page shortcut links) are bound; page wrappers are
  excluded. "Details" now opens Statistics and "See all" now opens
  History, as intended.

---

# My Flous — Full Application Test & Bug Sweep (v1.3.13)

## Tested

Ran the app end-to-end (headless real-browser harness: actual
`<script>` load order, real `localStorage`, dispatched clicks/
inputs/submits — not a mock) and verified every area requested:

- **Dashboard** — greeting, balance/account counters, monthly stat
  cards, quick actions, recent-transactions preview.
- **History** — full ledger render, type filter tabs, contextual
  category chips, live debounced search, delete-with-undo-balance.
- **Statistics** — all 5 charts (monthly income/expense bars, savings
  line, expense-category donut, weekly bars) and the monthly report.
- **Profile** — identity fields, avatar upload, bio counter, occupation
  chips, all with correct debounced persistence.
- **Settings** — dark mode, notifications, currency.
- **Currency** — switching currency updates every currency label and
  re-renders Dashboard/History/Statistics.
- **Dark mode** — toggling flips `data-theme` on `<html>`/`<body>`,
  the switch UI, and the `theme-color` meta tag; persists and restores
  correctly across reload.
- **Navigation** — bottom nav, drawer, FAB, and card/stat deep-links
  into History all land on the correct page and update the active
  state.
- **Transactions** — income / expense / transfer add flows, amount
  validation (empty/zero/negative, insufficient balance), category +
  account selection, and ledger + balance consistency.
- **Transfers** — cross-account balance updates in a single write,
  insufficient-balance guard, correct History rendering.
- **localStorage** — every read/write goes through the namespaced
  `Storage` wrapper; add/delete/reset all leave the ledger and account
  balances consistent with each other.
- **Responsive layout** — breakpoints for small/standard/large phones,
  landscape, foldables and high-DPI all present and non-overlapping.
- **Animations** — counter count-ups, page transitions, modal sheets,
  and chart "grow-in" all fire and settle to the correct final values.

## Fixed

- **Service worker cache stuck one version behind** — the v1.3.12
  changelog entry says `CACHE_VERSION` was bumped so installed users
  receive the update, but the shipped `sw.js` still read `v1.3.11`.
  Since the cache name only changes when this string changes, anyone
  with the app already installed would have kept being served
  pre-v1.3.12 cached JS indefinitely. Bumped to `v1.3.13`.
- **About screen showed a stale version number** — the Profile → About
  card was hardcoded to "Version 1.3.0" regardless of how many
  releases had actually shipped. Updated to "Version 1.3.13" to match
  this release.

## Verified (no changes needed)

- Every account/transaction/category mutation is symmetric: add ↔
  delete correctly apply and reverse the balance effect, including
  transfers (both legs, one read + one write).
- Insufficient-balance and invalid-amount validation blocks submission
  before it ever reaches Storage, on both Expense and Transfer.
- Search and filters on History are correctly debounced and re-render
  from the live ledger every time.
- Reset (with confirmation) clears every `myflous:` key with no
  leftovers.
- No duplicate top-level identifiers, no missing DOM ids, no broken
  asset paths in `index.html`, `manifest.json`, or `sw.js`'s precache
  list.

---

# My Flous — Bug Sweep (v1.3.12)

## Fixed

- **Route-progress bar never appeared** — `app.js` guards every call
  into the PWA layer with `if (window.PWAEnhancements)` before
  showing/hiding the thin progress bar during page navigation (the
  same pattern used for `App`, `History` and `Statistics`). But
  unlike those three, `PWAEnhancements` was never actually attached
  to `window` — only declared as a top-level `const` — so the guard
  silently evaluated to `false` on every single page change and the
  progress bar never ran. Added the missing `window.PWAEnhancements
  = PWAEnhancements;`, matching the existing pattern.
- **Stale service worker cache** — `CACHE_VERSION` in `sw.js` was
  still `v1.3.5`, several releases behind. Because the service worker
  only re-fetches app files when the cache name changes, anyone with
  the app already installed could keep being served old cached JS
  indefinitely, including after this session's fixes. Bumped to
  `v1.3.12` so installed users actually receive the update.

## Verified (no changes needed)

Audited the full project for the other categories requested and
found no further issues:
- **Syntax** — every `.js` file and `sw.js` parses cleanly.
- **Undefined variables** — no genuinely undefined identifiers;
  cross-file references that looked suspicious in static analysis
  (`App`, `Statistics`, `History` used inside `transactions.js`,
  `categories.js`, `profile.js`, which load *before* those files)
  are all correctly guarded with `if (window.X)` and only run from
  event handlers fired after every script has loaded.
- **Broken imports** — every `<script>`, `<link>`, manifest icon, and
  service-worker precache path points at a file that actually exists;
  no missing assets.
- **Duplicate globals** — no two files declare the same top-level
  name (which would throw `SyntaxError: Identifier has already been
  declared` in a real browser, since classic `<script>` tags share one
  global lexical scope for `const`/`let`).
- **DOM IDs** — every `#id` referenced from JS exists in the HTML, or
  is created dynamically at runtime by that same file (e.g. the
  status banner, install chip, route-progress bar).
- Ran a full headless smoke test (jsdom): loaded the real
  `index.html`, executed all scripts in their actual load order,
  fired `DOMContentLoaded`, and navigated every page. Zero console
  errors, zero warnings, both before verifying the fix and after.

---

# My Flous — Storage Cleanup & Optimization (v1.3.11)

## Reviewed

- Audited every `localStorage` access in the codebase. All reads and
  writes already went exclusively through the `Storage` wrapper under
  a single `myflous:` namespace — there were no duplicate or
  conflicting keys in the code. The work below hardens that structure
  and makes it self-healing, and closes some real read/write waste.

## Added

- **Self-cleaning key registry** — `Storage` now keeps one master
  list (`KNOWN_KEYS`) of every key the app has ever written. On every
  launch, `pruneUnknownKeys()` removes any `myflous:` key that isn't
  on that list — so a leftover key from an old build, a dev/test
  key, or anything else that doesn't belong can never quietly pile up
  next to real data. This is what keeps storage "a single clean
  structure" over time rather than just at one point in time.
- **`Storage.exists(name)`** — cheap existence check used by all the
  first-run seed logic, instead of reaching past the wrapper into raw
  `localStorage.getItem`.

## Optimized

- **In-memory read cache** — `Storage.get()` now caches the parsed
  value per key. Screens that read the same key several times per
  render (Statistics calls `Transactions.getAll()` four times when
  building its charts) now hit `localStorage` + `JSON.parse` once per
  key per page load instead of once per call; every read after that
  is served from memory. Each call still returns an independent copy,
  so nothing can mutate the cache by accident.
- **Batched transfer writes** — moving money between two of your own
  accounts (Cash → Bank, etc.) previously did two separate
  read-modify-write cycles to `localStorage`, one per account.
  `Accounts.adjustMany()` now applies both sides of a transfer in a
  single read and a single write.

## Backup

- Confirmed the existing Export/Import backup (Profile → Backup)
  covers every real data key via the same `KNOWN_KEYS` list used for
  pruning, so backup coverage and cleanup can never silently drift
  apart from each other. Device-local UI state (last page viewed,
  whether the splash screen has been seen) is intentionally excluded
  from backups, since restoring a backup onto a different device
  shouldn't force it to someone else's last-viewed screen.

---

# My Flous — Notification Badge Fix (v1.3.10)

## Fixed

- **Bell badge was always on** — the red dot on the top-nav
  notification icon was hardcoded to always show, whether or not
  there was anything to notify about. It's now driven by a real,
  persisted notification state and only appears when at least one
  unread notification actually exists.
- Tapping the bell now marks any notifications as read and hides the
  badge immediately, instead of just logging to the console.

## Added

- `Storage.Notifications` — a small `localStorage`-backed store
  (`add`, `getAll`, `hasUnread`, `markAllRead`) any future feature can
  push into to raise the badge. Empty by default, so out of the box
  the badge is correctly hidden (there's no notification center yet —
  that's still on the roadmap — this just gives the icon an honest
  on/off state instead of a decorative dot).
- Included in Export/Import backups alongside everything else.

## Design

- Visual design of the dot (size, color, position) is unchanged —
  only its visibility is now conditional.

---

# My Flous — Currency Sync Fix (v1.3.9)

## Fixed

- **Changing currency didn't always update History** — Dashboard and
  Statistics were already refreshed the moment the currency selector
  changed, but the History list was not, so amounts there could keep
  showing the old currency until a transaction was added or deleted.
  `applyCurrency()` now also re-renders History immediately.
- **Navigating to History could show a stale currency** — every other
  page-with-amounts already re-rendered on every visit (Statistics
  did); History didn't. Opening History now always re-renders it
  fresh, the same way Statistics does, so it's never out of sync no
  matter what changed while you were on another page.

## Notes

- Currency is stored in `localStorage` (`Storage.Prefs`), as it
  already was — this fix is about making every screen *react* to that
  saved value immediately, not about where it's stored.
- `formatCurrency()` (used everywhere: Dashboard, History, Statistics,
  the Add Transaction form, account cards) already read the live
  saved currency on every call, so once a view actually re-renders, it
  always shows the correct currency — the gap was purely about which
  views were being told to re-render.
- There is currently no "Budget" feature/page in the app to update —
  only Dashboard, History, Statistics, the Add Transaction form, and
  the account cards exist as currency-bearing views. If a Budget
  feature is added later, wire it into the same `applyCurrency()` /
  page-visit refresh pattern used here.

---

# My Flous — Date & Time in History (v1.3.8)

## Added

- **Time now shown in History** — each transaction card already
  recorded `createdAt` (the real device clock time it was saved at)
  behind the scenes for sorting; it's now also formatted and
  displayed, right under the category/account line, as e.g.
  `16 Jul · 19:42`.
- Added a `formatTime()` helper (`js/utils.js`) alongside the
  existing `formatDate()`, so time is rendered consistently.

## Notes

- The transaction **date** stays user-selectable, exactly as before
  (it's the date you pick when adding a transaction).
- The **time** is not editable — it's captured automatically from the
  device clock the moment the transaction is saved, and cannot be
  changed by the user.

---

# My Flous — Profile Bio (v1.3.7)

## Added

- **Bio field on Profile** — a new "Bio" textarea in the Profile
  identity card, capped at 150 characters, with a live "N / 150"
  character counter that turns red at the limit.
- Bio text is persisted in `localStorage` alongside the rest of the
  profile (name, age, country, occupation) and is included
  automatically in Export/Import backups.
- The saved bio is displayed on the Profile page itself (italic line
  under the name/occupation header), updating live as you type.

---

# My Flous — Settings Cleanup (v1.3.6)

## Removed

- **"Security — Phase 2" placeholder row** removed from the Profile
  page Settings section. It was a dead UI stub (no click handler, no
  backing logic) advertising an unbuilt feature. The card now opens
  directly with the working Export data / Import data / Reset data
  rows, with no gap left behind.

---

# My Flous — Menu Button / Side Drawer (v1.3.5)

## Fixed

- **Menu button did nothing** — the top-nav hamburger button was a
  known stub that only logged `"side drawer arrives in Phase 2"` to
  the console. It now opens a real slide-out drawer.

## Added

- **Side drawer menu** — tapping the menu button slides in a panel
  from the left with quick links to Home, History, Statistics and
  Profile (the currently open page is highlighted), plus Export data
  and Reset data shortcuts. The shortcuts forward to the existing
  Profile-page Export/Reset buttons, so there's a single source of
  truth for that logic (including the Reset confirmation dialog).
  Closes via its own X button, the backdrop, Escape, or by picking
  any link.
- **Service worker cache bump (`v1.3.4` → `v1.3.5`)**.

# My Flous — Profile Image Fix (v1.3.4)

## Fixed

- **Profile avatar image not filling the circular frame** — the
  top-nav avatar button's `<img>` was a direct flex child with no
  `position`, so flexbox's default `min-height: auto` could keep the
  image at its intrinsic size and let `object-fit: cover` crop
  off-center (clipped from one edge instead of centered), especially
  for tall/narrow or wide/short photos.
- Both the top-nav avatar (`.profile-avatar img`) and the profile-page
  large avatar (`.profile-header .avatar-lg img`) now use
  `position: absolute; inset: 0;` with `min-width: 100%;
  min-height: 100%;`, `object-fit: cover;`, and an explicit
  `object-position: center center;` — the photo always fills the
  circle completely and stays centered, regardless of its original
  aspect ratio.
- **Service worker cache bump (`v1.3.3` → `v1.3.4`)**.

# My Flous — Expense Details Button Fix (v1.3.3)

## Fixed

- **Expense Details button** — same dead-button issue as the Income
  card: styled clickable, did nothing. Now reuses the
  `data-history-filter` + `History.filterByType()` mechanism built for
  Income, so tapping "Expenses" on the Dashboard opens History with
  the Expense filter tab applied automatically — expense transactions
  only, search/category filters reset.
- Verified end-to-end (headless): seeded income/expense/transfer
  transactions, clicked Expenses → History shows only expense rows;
  clicked Income right after → correctly swaps to income-only with no
  cross-contamination between the two buttons.
- **Service worker cache bump (`v1.3.2` → `v1.3.3`)**.

# My Flous — Income Details Button Fix (v1.3.2)

## Fixed

- **Income Details button** — the "Income" card in the Dashboard's
  "This Month" section was styled as clickable (pointer cursor, tap
  animation in `enhancements.css`) but had no click handler at all, so
  tapping it did nothing. It's now a real, keyboard-accessible button
  (`role="button"`, tabindex, Enter/Space support) that opens History
  with the Income filter tab applied automatically — only income
  transactions are shown, search and category filters are reset so
  nothing hides them.
- Added a reusable `History.filterByType(type)` API so any future
  entry point (e.g. an Expense Details button) can jump straight into
  a pre-filtered History view the same way.
- **Service worker cache bump (`v1.3.1` → `v1.3.2`)** so this reaches
  an already-installed copy of the app — see the note in the previous
  entry below for why this matters every time.

# My Flous — History Fix (v1.3.1)

## Fixed

- **History ordering** — every Income, Expense, and Transfer now sorts
  newest-first using an explicit tiebreaker (transaction date, then the
  save timestamp, then id) instead of relying on incidental array
  order. Two transactions logged on the same day now always show the
  most-recently-added one on top, guaranteed.
- **History resilience** — a single malformed transaction record can no
  longer blank the whole History page; rendering is now wrapped so it
  fails safely with a "couldn't display" message instead of silently
  showing nothing (which could look like your data disappeared).
- **Service worker cache bump (`v1.3.0` → `v1.3.1`)** — this is the
  important one for anyone who already installed the app: the
  service worker serves the app's JS/CSS cache-first and only replaces
  it when the version string changes, so without this bump an
  already-installed copy would keep running the *old* `transactions.js`
  indefinitely, even after the code was fixed. Reopen the app (or tap
  the "update available" banner) to pick up this build.

Confirmed via a scripted add/render pass: adding an Income, then an
Expense, then a Transfer in sequence — each one appears at the top of
History immediately after saving, with no page reload needed.

# My Flous — Final Phase Changelog (v1.3.0)

Everything from earlier phases (dashboard, transactions, categories,
statistics, profile, theming) is untouched and fully working. This pass
was a polish + platform-readiness pass: animations, transitions, mobile
responsiveness, touch feedback, performance, PWA/offline support, and
Capacitor/Android Studio readiness — plus a bug/quality sweep.

## Added

- **`css/enhancements.css`** — new stylesheet layered on top of the
  existing four, purely additive:
  - Touch feedback on every remaining tappable surface (stat cards,
    transaction rows, switches, filter/type tabs, settings rows, the
    profile avatar) that didn't already have an `:active` state.
  - A lightweight, dependency-free **ripple** micro-interaction on
    buttons, chips, cards and nav items (`js/pwa.js` → `bindRipples()`),
    disabled automatically under `prefers-reduced-motion`.
  - Directional **page transitions** (slide left/right depending on
    bottom-nav tab order) instead of a single fade for every route.
  - A slim **top progress bar** during page navigation — a native-feeling
    loading cue instead of a jarring instant cut.
  - **Skeleton loading placeholders** (shimmer rows) for the very first
    paint of Recent Transactions and the History list, swapped for real
    content a frame later — never an empty flash, and it never repeats
    on later re-renders/searches so it doesn't get in the way.
  - A **button busy/spinner state** on Add Transaction submit, guarding
    against accidental double-submits.
  - **Offline / back-online / update-available** status banners.
  - A custom **"Install app"** chip that surfaces the browser's install
    prompt at a good moment instead of relying on the browser's own UI.
  - Spacing refinements (section/card rhythm, chip wrapping, search bar
    breathing room) and several new responsive breakpoints (very small
    Android phones, large phablets, unfolded foldables, short landscape).
  - `overscroll-behavior: contain`, `touch-action: manipulation` and
    `contain: layout style paint` for smoother, jank-free scrolling and
    to remove Android's old 300ms tap delay.

- **`js/pwa.js`** — new module: service worker registration, offline/
  online detection, install-prompt handling, ripple binding, and the
  route-progress bar hooks used by `App.goToPage`.

- **PWA files**: `manifest.json`, `sw.js` (cache-first app shell +
  stale-while-revalidate for Google Fonts + offline fallback),
  `offline.html`, and generated icons
  (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`,
  `apple-touch-icon.png`, `favicon-32.png`) matching the existing brand
  mark.

- **`capacitor.config.json`** and **`CAPACITOR_ANDROID_SETUP.md`** — a
  ready-to-use Capacitor config and a step-by-step guide to wrap this
  exact build as a native Android Studio project.

## Changed

- `index.html` — added the manifest link, apple-touch-icon, mobile web
  app meta tags, a `<noscript>` fallback, and the two new `<script>`/
  `<link>` tags. No existing markup, ids or structure were altered.
- `js/app.js` — page navigation now sets a nav direction attribute and
  triggers the route-progress bar; Recent Transactions render through the
  new skeleton-then-swap helper.
- `js/transactions.js` — the History list's first render uses the same
  skeleton-then-swap pattern; the Add Transaction submit button gets a
  brief busy state; the duplicated delete-button SVG markup (previously
  copy-pasted in two places) now goes through one shared helper.
- `js/categories.js` — the category row's delete icon now reuses the
  same shared icon constant instead of a third copy of the same SVG path.
- `js/utils.js` — added `TRASH_ICON_PATH` + `deleteButtonHTML()` so the
  delete-icon markup exists in exactly one place app-wide.
- About card version bumped to reflect this phase.

## Verified (no regressions)

Tested end-to-end with a headless browser at multiple mobile viewport
widths (320/360/390/412px):
- Splash → app shell → all four tabs navigate and animate correctly.
- Add Income/Expense/Transfer, delete a transaction, and the account
  balances/statistics/history all update immediately and correctly.
- Category add/edit/delete, including transaction reassignment to
  "Other" on delete.
- Theme toggle, currency switch, notifications toggle, profile fields
  and avatar upload all read/write `localStorage` correctly.
- Backup export produces a correctly named JSON file; import/reset flows
  are intact.
- All data survives a full page reload (transactions, accounts,
  categories, profile, theme, currency).
- Service worker installs, activates, and the app fully loads and
  functions with the network completely disabled after first visit.
- Zero console/page errors in every scenario above.

## Known platform notes

- Google Fonts (Poppins/Inter) require network on first load; after
  that, the service worker serves them from cache. If Capacitor's
  WebView has no network on first launch, the app still works — it just
  falls back to the `system-ui`/`-apple-system` fonts already declared
  as fallbacks in `css/variables.css`.
