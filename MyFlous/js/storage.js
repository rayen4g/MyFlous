/* =========================================================
   MY FLOUS — STORAGE
   Thin, safe wrapper around localStorage, namespaced so this
   app never collides with other keys in the browser.
   Phase 1 only persists UI preferences (theme, first-run);
   transaction storage is scaffolded for Phase 2.
   ========================================================= */

'use strict';

const Storage = (() => {
  const NAMESPACE = 'myflous';

  const key = (name) => `${NAMESPACE}:${name}`;

  /**
   * In-memory read cache, keyed by the fully-namespaced key.
   * localStorage.getItem + JSON.parse is cheap once, but several
   * screens (Statistics in particular) call e.g. Transactions.getAll()
   * multiple times in a single render pass. Caching the parsed value
   * means only the FIRST read of a key per page-load touches
   * localStorage; every read after that is served from memory.
   *
   * A cache entry of `undefined` means "confirmed absent" (mirrors
   * localStorage returning null), so repeated misses don't keep
   * re-querying localStorage either.
   *
   * The cache always stores the canonical value; get() hands back a
   * clone so callers can freely mutate what they receive without
   * corrupting the cache before they explicitly save it back.
   */
  const cache = new Map();

  function cloneValue(value){
    if (value === null || typeof value !== 'object') return value;
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  /**
   * Read a value from localStorage, JSON-decoded.
   * @param {string} name
   * @param {*} fallback
   */
  function get(name, fallback = null){
    const k = key(name);
    try{
      if (cache.has(k)){
        const cached = cache.get(k);
        return cached === undefined ? fallback : cloneValue(cached);
      }
      const raw = window.localStorage.getItem(k);
      if (raw === null){
        cache.set(k, undefined);
        return fallback;
      }
      const parsed = JSON.parse(raw);
      cache.set(k, parsed);
      return cloneValue(parsed);
    }catch(err){
      console.warn(`[Storage] Failed to read "${name}":`, err);
      return fallback;
    }
  }

  /**
   * Write a value to localStorage, JSON-encoded.
   * @param {string} name
   * @param {*} value
   */
  function set(name, value){
    const k = key(name);
    try{
      window.localStorage.setItem(k, JSON.stringify(value));
      cache.set(k, value);
      return true;
    }catch(err){
      console.warn(`[Storage] Failed to write "${name}":`, err);
      return false;
    }
  }

  /**
   * Whether a key has ever been written, without paying for a
   * full JSON.parse (used by the various seed-if-empty checks).
   * @param {string} name
   */
  function exists(name){
    const k = key(name);
    if (cache.has(k)) return cache.get(k) !== undefined;
    return window.localStorage.getItem(k) !== null;
  }

  /**
   * Remove a single key.
   * @param {string} name
   */
  function remove(name){
    const k = key(name);
    try{
      window.localStorage.removeItem(k);
      cache.set(k, undefined);
      return true;
    }catch(err){
      console.warn(`[Storage] Failed to remove "${name}":`, err);
      return false;
    }
  }

  /**
   * Wipe every My Flous key (used by "Reset app" in Profile, Phase 2).
   */
  function clearAll(){
    try{
      Object.keys(window.localStorage)
        .filter(k => k.startsWith(`${NAMESPACE}:`))
        .forEach(k => window.localStorage.removeItem(k));
      cache.clear();
      return true;
    }catch(err){
      console.warn('[Storage] Failed to clear namespace:', err);
      return false;
    }
  }

  /**
   * Detect whether localStorage is actually usable
   * (private-browsing modes / disabled storage can throw).
   */
  function isAvailable(){
    try{
      const testKey = key('__test__');
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    }catch(_){
      return false;
    }
  }

  // ---- Convenience accessors for known app preferences ----
  const Prefs = {
    getTheme: () => get('theme', 'light'),
    setTheme: (theme) => set('theme', theme),

    hasSeenSplash: () => get('hasSeenSplash', false),
    setSeenSplash: (val) => set('hasSeenSplash', val),

    getLastPage: () => get('lastPage', 'home'),
    setLastPage: (page) => set('lastPage', page),

    getCurrency: () => get('currency', 'TND'),
    setCurrency: (currency) => set('currency', currency),

    getNotifications: () => get('notifications', true),
    setNotifications: (val) => set('notifications', val),

    getLanguage: () => get('language', 'en'),
    setLanguage: (lang) => set('language', lang),

    // ---- First-run onboarding wizard (language/name/country/category) ----
    hasCompletedOnboarding: () => get('onboardingComplete', false),
    setOnboardingComplete: (val) => set('onboardingComplete', val),

    // ---- One-time animated guide tour of the Home screen ----
    hasSeenGuideTour: () => get('hasSeenGuideTour', false),
    setSeenGuideTour: (val) => set('hasSeenGuideTour', val)
  };

  // ---- Notifications (top-nav bell badge) ----
  // No full notification center exists yet (that's still on the
  // roadmap), but the bell badge needs a real source of truth rather
  // than always being shown, so this gives it one: a small persisted
  // list, empty by default, that any future feature can push into.
  const Notifications = {
    getAll: () => get('notifications:list', []),
    saveAll: (list) => set('notifications:list', list),

    /** Add a notification (unread by default). For future features to call. */
    add: (notification) => {
      const list = Notifications.getAll();
      list.unshift({ id: uid(), read: false, createdAt: new Date().toISOString(), ...notification });
      Notifications.saveAll(list);
      return list;
    },

    /** Whether the bell badge should be shown. */
    hasUnread: () => Notifications.getAll().some(n => !n.read),

    /** Mark every notification as read (called when the bell is opened). */
    markAllRead: () => {
      const list = Notifications.getAll().map(n => ({ ...n, read: true }));
      Notifications.saveAll(list);
      return list;
    }
  };

  // ---- Profile (personal info shown on the Profile page) ----
  const DEFAULT_PROFILE = {
    name: '',
    age: '',
    country: '',
    occupation: 'student', // 'student' | 'pupil' | 'employee'
    avatar: null,           // data URL, or null to show the placeholder
    bio: ''                 // short "about me" blurb, shown on the Profile page
  };

  const Profile = {
    get: () => ({ ...DEFAULT_PROFILE, ...get('profile', {}) }),
    save: (patch) => {
      const updated = { ...Profile.get(), ...patch };
      set('profile', updated);
      return updated;
    },
    DEFAULTS: DEFAULT_PROFILE
  };

  // ---- Categories (full CRUD system — used by the Add Transaction
  // modal's category chips AND the Manage Categories screen) ----
  const DEFAULT_CATEGORIES = {
    expense: [
      { id: 'food',        name: 'Food',        icon: 'food',        color: '#F97316', isDefault: true },
      { id: 'transport',   name: 'Transport',   icon: 'transport',   color: '#3A8DE4', isDefault: true },
      { id: 'coffee',      name: 'Coffee',      icon: 'coffee',      color: '#A16207', isDefault: true },
      { id: 'shopping',    name: 'Shopping',    icon: 'shopping',    color: '#EC4899', isDefault: true },
      { id: 'entertainment', name: 'Entertainment', icon: 'entertainment', color: '#8B5CF6', isDefault: true },
      { id: 'university',  name: 'University',  icon: 'university',  color: '#6366F1', isDefault: true },
      { id: 'books',       name: 'Books',       icon: 'books',       color: '#14B8A6', isDefault: true },
      { id: 'bills',       name: 'Bills',       icon: 'bills',       color: '#64748B', isDefault: true },
      { id: 'medicine',    name: 'Medicine',    icon: 'medicine',    color: '#E4483A', isDefault: true },
      { id: 'clothing',    name: 'Clothing',    icon: 'clothing',    color: '#06B6D4', isDefault: true },
      { id: 'electronics', name: 'Electronics', icon: 'electronics', color: '#475569', isDefault: true },
      { id: 'other',       name: 'Other',       icon: 'other',       color: '#7A7A82', isDefault: true, isProtected: true }
    ],
    income: [
      { id: 'scholarship', name: 'Scholarship', icon: 'scholarship', color: '#F5B800', isDefault: true },
      { id: 'parents',     name: 'Parents',     icon: 'parents',     color: '#F97316', isDefault: true },
      { id: 'salary',      name: 'Salary',      icon: 'salary',      color: '#1FAE73', isDefault: true },
      { id: 'freelance',   name: 'Freelance',   icon: 'freelance',   color: '#3A8DE4', isDefault: true },
      { id: 'gift',        name: 'Gift',        icon: 'gift',        color: '#EC4899', isDefault: true },
      { id: 'investment',  name: 'Investment',  icon: 'investment',  color: '#8B5CF6', isDefault: true }
    ]
  };

  const Categories = (() => {
    function getAll(type){
      return get(`categories:${type}`, null) || DEFAULT_CATEGORIES[type].map(c => ({ ...c }));
    }

    function saveAll(type, list){
      return set(`categories:${type}`, list);
    }

    function getById(type, id){
      return getAll(type).find(c => c.id === id) || null;
    }

    function findByName(type, name){
      const target = (name || '').trim().toLowerCase();
      return getAll(type).find(c => c.name.toLowerCase() === target) || null;
    }

    /** Find a category by name across both types (used when a tx's exact type-list isn't known). */
    function findByNameAnyType(name){
      return findByName('expense', name) || findByName('income', name);
    }

    function slugify(name){
      const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'category';
      return base;
    }

    function uniqueId(type, name){
      const base = slugify(name);
      const existing = new Set(getAll(type).map(c => c.id));
      if (!existing.has(base)) return base;
      let i = 2;
      while (existing.has(`${base}-${i}`)) i++;
      return `${base}-${i}`;
    }

    /**
     * Add a new category. Returns the created category, or null if
     * the name is empty or already used within that type.
     */
    function add(type, { name, icon, color }){
      const cleanName = (name || '').trim();
      if (!cleanName) return null;
      if (findByName(type, cleanName)) return null;

      const category = {
        id: uniqueId(type, cleanName),
        name: cleanName,
        icon: icon || 'other',
        color: color || '#7A7A82',
        isDefault: false
      };
      const list = getAll(type);
      list.push(category);
      saveAll(type, list);
      return category;
    }

    /**
     * Update an existing category's name/icon/color. If the name
     * changes, every transaction referencing the old name is
     * migrated to the new name so history stays consistent.
     */
    function update(type, id, patch){
      const list = getAll(type);
      const idx = list.findIndex(c => c.id === id);
      if (idx === -1) return null;

      const before = list[idx];
      const cleanName = patch.name !== undefined ? patch.name.trim() : before.name;
      if (!cleanName) return null;

      // Block renaming to a name already used by a different category.
      const clash = list.find(c => c.id !== id && c.name.toLowerCase() === cleanName.toLowerCase());
      if (clash) return null;

      const updated = {
        ...before,
        name: cleanName,
        icon: patch.icon !== undefined ? patch.icon : before.icon,
        color: patch.color !== undefined ? patch.color : before.color
      };
      list[idx] = updated;
      saveAll(type, list);

      if (updated.name !== before.name){
        const txs = Transactions.getAll();
        let changed = false;
        txs.forEach(tx => {
          if (tx.type === type && tx.category === before.name){
            tx.category = updated.name;
            changed = true;
          }
        });
        if (changed) Transactions.saveAll(txs);
      }

      return updated;
    }

    /** How many transactions currently reference this category. */
    function usageCount(type, id){
      const cat = getById(type, id);
      if (!cat) return 0;
      return Transactions.getAll().filter(tx => tx.type === type && tx.category === cat.name).length;
    }

    /**
     * Delete a category. Protected defaults ("Other") can't be
     * deleted. Any transaction referencing it is reassigned to
     * "Other" (created if somehow missing) so no transaction is
     * ever left pointing at a category that no longer exists.
     */
    function remove(type, id){
      const list = getAll(type);
      const cat = list.find(c => c.id === id);
      if (!cat || cat.isProtected) return { ok: false, reason: 'protected' };

      let fallback = list.find(c => c.id === 'other') || findByName(type, 'Other');
      if (!fallback){
        fallback = add(type, { name: 'Other', icon: 'other', color: '#7A7A82' });
      }

      const remaining = getAll(type).filter(c => c.id !== id);
      saveAll(type, remaining);

      const txs = Transactions.getAll();
      let reassigned = 0;
      txs.forEach(tx => {
        if (tx.type === type && tx.category === cat.name){
          tx.category = fallback.name;
          reassigned++;
        }
      });
      if (reassigned > 0) Transactions.saveAll(txs);

      return { ok: true, reassigned };
    }

    function seedDefaultsIfEmpty(){
      ['expense', 'income'].forEach(type => {
        if (!exists(`categories:${type}`)){
          saveAll(type, DEFAULT_CATEGORIES[type].map(c => ({ ...c })));
        }
      });
    }

    return {
      getAll, getById, findByName, findByNameAnyType,
      add, update, remove, usageCount, seedDefaultsIfEmpty,
      DEFAULTS: DEFAULT_CATEGORIES
    };
  })();

  // ---- Transactions ledger (Phase 3: full transaction engine) ----
  const Transactions = {
    getAll: () => get('transactions', []),
    saveAll: (list) => set('transactions', list),

    /**
     * Add a transaction record to the top of the ledger.
     * Does NOT touch account balances — callers use
     * Accounts.applyTransaction() for that, kept separate so the
     * ledger and the balances stay two clearly distinct concerns.
     */
    add: (tx) => {
      const list = Transactions.getAll();
      list.unshift(tx);
      Transactions.saveAll(list);
      return list;
    },

    /** Remove a transaction by id and return the updated list. */
    remove: (id) => {
      const list = Transactions.getAll().filter(tx => tx.id !== id);
      Transactions.saveAll(list);
      return list;
    },

    getById: (id) => Transactions.getAll().find(tx => tx.id === id) || null
  };

  // ---- Accounts (Cash / Bank / Savings) — Dashboard data source ----
  const DEFAULT_ACCOUNTS = {
    cash:    0,
    bank:    0,
    savings: 0
  };

  const Accounts = {
    /**
     * Always returns exactly { cash, bank, savings } — never a raw
     * pass-through of whatever is in localStorage. This sanitizes
     * away any stray keys (e.g. a leftover "total" field from a
     * corrupted state or an old backup) so nothing can ever sneak
     * into the balance calculation below.
     */
    getAll: () => {
      const stored = get('accounts', {});
      return {
        cash:    Number(stored.cash)    || 0,
        bank:    Number(stored.bank)    || 0,
        savings: Number(stored.savings) || 0
      };
    },
    saveAll: (accounts) => set('accounts', {
      cash:    Number(accounts.cash)    || 0,
      bank:    Number(accounts.bank)    || 0,
      savings: Number(accounts.savings) || 0
    }),
    getBalance: (name) => {
      const accounts = Accounts.getAll();
      return Number(accounts[name]) || 0;
    },
    /**
     * Total Balance is NEVER stored — it is always derived live
     * from the three account balances: Total = Cash + Bank + Savings.
     */
    getTotal: () => {
      const { cash, bank, savings } = Accounts.getAll();
      return Math.round((cash + bank + savings) * 1000) / 1000;
    },

    /**
     * Adjust a single account balance by `delta` (can be negative).
     * Rounded to 3 decimals to avoid floating point drift on
     * repeated dinar/millime operations.
     */
    adjust: (name, delta) => {
      return Accounts.adjustMany({ [name]: delta });
    },

    /**
     * Adjust several account balances in one read + one write.
     * Transfers touch two accounts at once; doing that as two
     * separate adjust() calls means two localStorage writes for a
     * single user action. Collapsing it into one round trip halves
     * the write cost for every transfer.
     * @param {Object} deltas - e.g. { cash: -10, bank: 10 }
     */
    adjustMany: (deltas) => {
      const accounts = Accounts.getAll();
      Object.keys(deltas).forEach(name => {
        const delta = Number(deltas[name]) || 0;
        if (!delta) return;
        const current = Number(accounts[name]) || 0;
        accounts[name] = Math.round((current + delta) * 1000) / 1000;
      });
      Accounts.saveAll(accounts);
      return accounts;
    },

    /**
     * Apply a transaction's effect on account balances.
     * income   -> credits the destination account
     * expense  -> debits the "paid from" account
     * transfer -> debits the source, credits the destination
     */
    applyTransaction: (tx) => {
      if (tx.type === 'income'){
        Accounts.adjust(tx.account, tx.amount);
      } else if (tx.type === 'expense'){
        Accounts.adjust(tx.account, -tx.amount);
      } else if (tx.type === 'transfer'){
        Accounts.adjustMany({ [tx.fromAccount]: -tx.amount, [tx.toAccount]: tx.amount });
      }
    },

    /** Reverse a transaction's effect (used when deleting a record). */
    reverseTransaction: (tx) => {
      if (tx.type === 'income'){
        Accounts.adjust(tx.account, -tx.amount);
      } else if (tx.type === 'expense'){
        Accounts.adjust(tx.account, tx.amount);
      } else if (tx.type === 'transfer'){
        Accounts.adjustMany({ [tx.fromAccount]: tx.amount, [tx.toAccount]: -tx.amount });
      }
    }
  };

  // ---- Monthly dashboard statistics ----
  // Computed live from the Transactions ledger (current calendar
  // month) rather than stored as a static snapshot.
  const DashboardStats = {
    getStats: () => {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      const monthTx = Transactions.getAll().filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

      const income = monthTx
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

      const expenses = monthTx
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

      const saved = monthTx
        .filter(tx => tx.type === 'transfer' && tx.toAccount === 'savings')
        .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

      const remaining = income - expenses;

      return {
        income:    Math.round(income * 1000) / 1000,
        expenses:  Math.round(expenses * 1000) / 1000,
        saved:     Math.round(saved * 1000) / 1000,
        remaining: Math.round(remaining * 1000) / 1000
      };
    }
  };

  // ---- First-run defaults ----
  // No sample/demo transactions ship with the app. A brand-new
  // install starts completely empty: zero balances, empty ledger.
  const DEFAULT_TRANSACTIONS = [];

  /**
   * Initialize first-run data exactly once. Each piece is only
   * written if its key has never existed in localStorage, so this
   * never overwrites data the person already has (e.g. after they've
   * started using the app, or restored a backup).
   */
  function seedDefaultsIfEmpty(){
    pruneUnknownKeys();
    if (!exists('accounts')){
      Accounts.saveAll(DEFAULT_ACCOUNTS);
    }
    if (!exists('transactions')){
      Transactions.saveAll(DEFAULT_TRANSACTIONS);
    }
    Categories.seedDefaultsIfEmpty();
  }

  // ---- Known keys — single source of truth ----
  // Every key My Flous has ever written, in one place. Two things
  // read this list: Backup (which of these represent restorable user
  // data) and pruneUnknownKeys (which uses the full list to recognize
  // — and clean up — anything that doesn't belong).
  //
  // `data: true` = real user data, included in backup export/import.
  // `data: false` = device-local UI state (current page, whether the
  // splash screen has been seen) that shouldn't travel between
  // devices or overwrite a fresh install when restoring a backup.
  const KNOWN_KEYS = {
    'accounts':            { data: true },
    'transactions':        { data: true },
    'categories:expense':  { data: true },
    'categories:income':   { data: true },
    'theme':               { data: true },
    'currency':            { data: true },
    'notifications':       { data: true },
    'notifications:list':  { data: true },
    'profile':             { data: true },
    'language':            { data: true },
    'lastPage':            { data: false },
    'hasSeenSplash':       { data: false },
    'onboardingComplete':  { data: false },
    'hasSeenGuideTour':    { data: false }
  };

  /**
   * Remove any localStorage key in the myflous: namespace that isn't
   * in KNOWN_KEYS. This is what keeps the storage a single clean
   * structure over time: a renamed feature, an old test key left
   * behind during development, or a stray key from a future
   * downgrade/upgrade can never quietly pile up next to the real
   * data. Safe to call on every load — it only ever touches keys
   * this app doesn't recognize.
   */
  function pruneUnknownKeys(){
    try{
      const prefix = `${NAMESPACE}:`;
      const removed = [];
      Object.keys(window.localStorage)
        .filter(k => k.startsWith(prefix) && !(k.slice(prefix.length) in KNOWN_KEYS))
        .forEach(k => {
          window.localStorage.removeItem(k);
          cache.delete(k);
          removed.push(k);
        });
      if (removed.length) console.info('[Storage] Pruned unrecognized keys:', removed);
      return removed;
    }catch(err){
      console.warn('[Storage] Failed to prune unknown keys:', err);
      return [];
    }
  }

  // ---- Backup — export/import every My Flous key as one JSON file ----
  const Backup = (() => {
    const BACKUP_KEYS = Object.keys(KNOWN_KEYS).filter(name => KNOWN_KEYS[name].data);

    function exportData(){
      const payload = {
        app: 'MyFlous',
        version: 1,
        exportedAt: new Date().toISOString(),
        data: {}
      };
      BACKUP_KEYS.forEach(name => {
        if (exists(name)) payload.data[name] = get(name);
      });
      return payload;
    }

    /**
     * Restore a previously exported payload. Only recognized
     * My Flous keys are written — never arbitrary localStorage keys —
     * so an imported file can't be used to inject unrelated data.
     */
    function importData(payload){
      if (!payload || typeof payload !== 'object' || !payload.data){
        return { ok: false, reason: 'invalid' };
      }
      BACKUP_KEYS.forEach(name => {
        if (payload.data[name] !== undefined){
          set(name, payload.data[name]);
        }
      });
      return { ok: true };
    }

    return { exportData, importData };
  })();

  return {
    get, set, remove, exists, clearAll, isAvailable, pruneUnknownKeys,
    Prefs, Profile, Notifications, Transactions, Accounts, DashboardStats, Categories, Backup,
    seedDefaultsIfEmpty
  };
})();

// See the matching note in app.js: `const` doesn't auto-attach to
// `window`, and utils.js checks `window.Storage` before using it.
window.Storage = Storage;
