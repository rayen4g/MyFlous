/* =========================================================
   MY FLOUS — TRANSACTIONS
   The full transaction system: the Add Transaction modal
   (Income / Expense / Transfer), the History page, and the
   shared row renderer + toast used by both the Dashboard
   preview and the History list.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   SHARED TRANSACTION ROW RENDERER
   Used by Dashboard "Recent transactions" and the History
   page, so every list in the app renders rows identically.
   --------------------------------------------------------- */
const TxRow = (() => {

  function render(tx, opts = {}){
    const { showDelete = false } = opts;
    const meta = categoryMetaFor(tx);
    const iconPath = ICON_LIBRARY[meta.icon] || ICON_LIBRARY.default;
    const dateLabel = formatRelativeDate(tx.date);
    const amountText = formatCurrency(tx.amount, '').trim();

    let title, metaText, amountHTML;

    if (tx.type === 'transfer'){
      title = escapeHTML(tx.description || `${accountLabel(tx.fromAccount)} → ${accountLabel(tx.toAccount)}`);
      metaText = `${accountLabel(tx.fromAccount)} → ${accountLabel(tx.toAccount)} · ${dateLabel}`;
      amountHTML = `<span class="tx-amount neutral">${amountText}</span>`;
    } else {
      const isIncome = tx.type === 'income';
      title = escapeHTML(tx.description || tx.category || (isIncome ? 'Income' : 'Expense'));
      metaText = `${escapeHTML(tx.category || '')} · ${dateLabel}`;
      const sign = isIncome ? '+' : '-';
      const amountClass = isIncome ? 'pos' : 'neg';
      amountHTML = `<span class="tx-amount ${amountClass}">${sign}${amountText}</span>`;
    }

    const deleteBtn = showDelete ? deleteButtonHTML('Delete transaction', `data-delete-tx="${tx.id}"`) : '';

    return `
      <div class="tx-item" data-tx-id="${tx.id}">
        <div class="tx-icon" style="color:${meta.color}; background:${meta.color}24;">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>
        </div>
        <div class="tx-info">
          <div class="tx-title">${title}</div>
          <div class="tx-meta">${metaText}</div>
        </div>
        ${amountHTML}
        ${deleteBtn}
      </div>`;
  }

  return { render };
})();

/* ---------------------------------------------------------
   TOAST — success / error messages
   --------------------------------------------------------- */
const Toast = (() => {
  let hideTimer = null;

  function show(message, variant = 'success'){
    const el = qs('#toast');
    if (!el) return;

    window.clearTimeout(hideTimer);
    el.textContent = message;
    el.className = `toast toast-${variant} toast-visible`;

    hideTimer = window.setTimeout(() => {
      el.classList.remove('toast-visible');
    }, 2600);
  }

  return { show };
})();

/* ---------------------------------------------------------
   ADD TRANSACTION MODAL
   --------------------------------------------------------- */
const TransactionModal = (() => {

  let currentType = 'expense';
  let selected = { category: null, account: null, from: null, to: null };
  let isOpen = false;

  const TYPE_LABELS = {
    income:   { title: 'txn.addIncome',   submit: 'txn.addIncome',   accountLabel: 'txn.accountDestination' },
    expense:  { title: 'txn.addExpense',  submit: 'txn.addExpense',  accountLabel: 'txn.paidFrom' },
    transfer: { title: 'txn.transferMoney', submit: 'common.transfer' }
  };
  const tt = (key) => (window.I18n ? window.I18n.t(key) : key);

  function els(){
    return {
      overlay:        qs('#txn-modal-overlay'),
      sheet:           qs('#txn-modal-sheet'),
      title:           qs('#txn-modal-title'),
      tabs:            qsa('.txn-tab'),
      form:            qs('#txn-form'),
      amount:          qs('#txn-amount'),
      amountError:     qs('#txn-amount-error'),
      categoryGroup:   qs('#txn-category-group'),
      categoryChips:   qs('#txn-category-chips'),
      categoryError:   qs('#txn-category-error'),
      accountGroup:    qs('#txn-account-group'),
      accountLabel:    qs('#txn-account-label'),
      accountChips:    qs('#txn-account-chips'),
      accountError:    qs('#txn-account-error'),
      transferGroup:   qs('#txn-transfer-group'),
      fromChips:       qs('#txn-from-chips'),
      toChips:         qs('#txn-to-chips'),
      transferError:   qs('#txn-transfer-error'),
      description:     qs('#txn-description'),
      date:             qs('#txn-date'),
      dateError:       qs('#txn-date-error'),
      submitBtn:       qs('#txn-submit-btn'),
      closeBtn:        qs('#txn-modal-close')
    };
  }

  /** Open the modal, optionally preset to a type and (for transfers) a "to" account. */
  function open(type = 'expense', opts = {}){
    reset();
    currentType = type === 'savings' ? 'transfer' : type;
    if (type === 'savings') selected.to = 'savings';
    if (opts.presetTo) selected.to = opts.presetTo;

    const { overlay, sheet, date } = els();
    if (!overlay) return;

    date.value = new Date().toISOString().slice(0, 10);

    switchType(currentType, /*skipReset*/ true);

    overlay.classList.add('modal-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isOpen = true;

    window.requestAnimationFrame(() => sheet.classList.add('sheet-in'));
    window.setTimeout(() => els().amount.focus({ preventScroll: true }), 350);
  }

  function close(){
    const { overlay, sheet } = els();
    if (!overlay || !isOpen) return;
    isOpen = false;

    sheet.classList.remove('sheet-in');
    sheet.classList.add('sheet-out');
    overlay.classList.remove('modal-open');

    window.setTimeout(() => {
      sheet.classList.remove('sheet-out');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      reset();
    }, 280);
  }

  function reset(){
    selected = { category: null, account: null, from: null, to: null };
    const e = els();
    if (e.form) e.form.reset();
    if (e.submitBtn) e.submitBtn.classList.remove('is-busy');
    clearErrors();
  }

  function clearErrors(){
    const e = els();
    [e.amountError, e.categoryError, e.accountError, e.transferError, e.dateError].forEach(el => {
      if (el) el.textContent = '';
    });
    qsa('.field-invalid').forEach(el => el.classList.remove('field-invalid'));
  }

  /** Switch the active transaction type and rebuild the form around it. */
  function switchType(type, skipReset = false){
    currentType = type;
    if (!skipReset){
      selected.category = null;
      selected.account = null;
      selected.from = null;
      selected.to = null;
    }
    clearErrors();

    const e = els();
    e.tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.type === type));

    const labels = TYPE_LABELS[type];
    e.title.textContent = tt(labels.title);
    e.submitBtn.textContent = tt(labels.submit);
    e.submitBtn.className = `btn-primary btn-${type}`;

    const isTransfer = type === 'transfer';
    e.categoryGroup.style.display = isTransfer ? 'none' : '';
    e.accountGroup.style.display = isTransfer ? 'none' : '';
    e.transferGroup.style.display = isTransfer ? '' : 'none';

    if (!isTransfer){
      e.accountLabel.textContent = tt(labels.accountLabel);
      renderCategoryChips(type);
      // Re-apply active state on account chips (cash/bank/savings shared markup).
      qsa('.chip[data-account]', e.accountChips).forEach(chip => {
        chip.classList.toggle('active', chip.dataset.account === selected.account);
      });
    } else {
      qsa('.chip[data-from]', e.fromChips).forEach(chip => {
        chip.classList.toggle('active', chip.dataset.from === selected.from);
      });
      qsa('.chip[data-to]', e.toChips).forEach(chip => {
        chip.classList.toggle('active', chip.dataset.to === selected.to);
      });
    }
  }

  function renderCategoryChips(type){
    const e = els();
    const categories = Storage.Categories.getAll(type);
    e.categoryChips.innerHTML = categories.map(cat => `
      <button type="button" class="chip chip-cat" data-category="${escapeHTML(cat.name)}">
        <span class="chip-icon" style="color:${cat.color}; background:${cat.color}24;">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_LIBRARY[cat.icon] || ICON_LIBRARY.default}</svg>
        </span>${escapeHTML(cat.name)}
      </button>
    `).join('');
  }

  /** Toggle a single-select chip within a chip-group. */
  function bindChipGroup(container, attr, onSelect){
    if (!container) return;
    container.addEventListener('click', (evt) => {
      const chip = evt.target.closest(`.chip[data-${attr}]`);
      if (!chip) return;
      hapticTap();
      qsa('.chip', container).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      onSelect(chip.dataset[attr]);
    });
  }

  /* -------- Validation -------- */
  function markInvalid(fieldEl, errorEl, message){
    if (fieldEl) fieldEl.classList.add('field-invalid');
    if (errorEl) errorEl.textContent = message;
  }

  function validate(){
    clearErrors();
    const e = els();
    let valid = true;

    const amount = parseFloat(e.amount.value);
    if (!e.amount.value || Number.isNaN(amount) || amount <= 0){
      markInvalid(e.amount, e.amountError, 'Enter a valid amount');
      valid = false;
    }

    if (!e.date.value){
      markInvalid(e.date, e.dateError, 'Pick a date');
      valid = false;
    }

    if (currentType === 'transfer'){
      if (!selected.from || !selected.to){
        markInvalid(e.transferGroup, e.transferError, 'Choose both accounts');
        valid = false;
      } else if (selected.from === selected.to){
        markInvalid(e.transferGroup, e.transferError, 'Choose two different accounts');
        valid = false;
      } else if (valid && Storage.Accounts.getBalance(selected.from) < amount){
        markInvalid(e.transferGroup, e.transferError, `Insufficient balance in ${accountLabel(selected.from)}`);
        valid = false;
      }
    } else {
      if (!selected.category){
        markInvalid(e.categoryChips, e.categoryError, 'Select a category');
        valid = false;
      }
      if (!selected.account){
        markInvalid(e.accountChips, e.accountError, 'Select an account');
        valid = false;
      }
      if (currentType === 'expense' && valid && selected.account && Storage.Accounts.getBalance(selected.account) < amount){
        markInvalid(e.accountChips, e.accountError, `Insufficient balance in ${accountLabel(selected.account)}`);
        valid = false;
      }
    }

    return valid;
  }

  function buildTransaction(){
    const e = els();
    const amount = Math.round(parseFloat(e.amount.value) * 1000) / 1000;
    const description = e.description.value.trim();
    const isoDate = new Date(`${e.date.value}T12:00:00`).toISOString();

    const base = {
      id: uid(),
      type: currentType,
      amount,
      description,
      date: isoDate,
      createdAt: new Date().toISOString()
    };

    if (currentType === 'transfer'){
      return {
        ...base,
        fromAccount: selected.from,
        toAccount: selected.to,
        category: 'Transfer'
      };
    }

    return {
      ...base,
      category: selected.category,
      account: selected.account
    };
  }

  function handleSubmit(evt){
    evt.preventDefault();
    const e = els();
    if (e.submitBtn.classList.contains('is-busy')) return; // guard against double-tap
    if (!validate()) {
      hapticTap();
      return;
    }

    e.submitBtn.classList.add('is-busy');

    const tx = buildTransaction();
    Storage.Transactions.add(tx);
    Storage.Accounts.applyTransaction(tx);

    hapticTap();

    const successMsg = currentType === 'income'
      ? `+${formatCurrency(tx.amount)} added to ${accountLabel(tx.account)}`
      : currentType === 'expense'
        ? `${formatCurrency(tx.amount)} expense logged`
        : `${formatCurrency(tx.amount)} moved to ${accountLabel(tx.toAccount)}`;

    close();
    Toast.show(successMsg, 'success');

    // Refresh every view that reads from the transactions/accounts.
    if (window.App) App.renderDashboard();
    if (window.History) History.render();
    if (window.Statistics) Statistics.render();
  }

  function bind(){
    const e = els();
    if (!e.overlay) return;

    e.tabs.forEach(tab => {
      tab.addEventListener('click', () => { hapticTap(); switchType(tab.dataset.type); });
    });

    bindChipGroup(e.categoryChips, 'category', (val) => { selected.category = val; });
    bindChipGroup(e.accountChips, 'account', (val) => { selected.account = val; });
    bindChipGroup(e.fromChips, 'from', (val) => { selected.from = val; });
    bindChipGroup(e.toChips, 'to', (val) => { selected.to = val; });

    e.form.addEventListener('submit', handleSubmit);
    e.closeBtn.addEventListener('click', close);
    qsa('[data-modal-close]').forEach(el => el.addEventListener('click', close));

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && isOpen) close();
    });
  }

  return { open, close, bind };
})();

/* ---------------------------------------------------------
   HISTORY PAGE
   Full transaction ledger: type filter tabs, a category
   filter row (contextual to the active type), a live search
   box, and a dedicated transaction-card renderer that shows
   icon / name / amount / date / category / account, colored
   by type (income = green, expense = red, transfer = gold).
   --------------------------------------------------------- */
const History = (() => {

  const state = { type: 'all', category: 'all', search: '' };
  const MAX_STAGGER_STEPS = 8;
  const STAGGER_STEP_MS = 40;
  let hasRenderedOnce = false;

  /* ---- Rendering ---- */

  function render(){
    const list = qs('#history-list');
    if (!list) return;

    // First-ever render: paint a brief skeleton, then swap in the
    // real list a frame later (perceived-performance polish only —
    // every later filter/search re-render stays instant, no flicker).
    if (!hasRenderedOnce){
      hasRenderedOnce = true;
      list.innerHTML = (window.App && App.skeletonRowsHTML) ? App.skeletonRowsHTML(5) : '';
      requestAnimationFrame(renderReal);
      return;
    }

    renderReal();
  }

  function renderReal(){
    const list = qs('#history-list');
    if (!list) return;

    try {
      // Always re-read straight from storage — every Income / Expense /
      // Transfer submit calls History.render() right after saving, so
      // this always reflects the very latest ledger, newest first.
      const all = Storage.Transactions.getAll();
      const typeFiltered = state.type === 'all' ? all : all.filter(tx => tx.type === state.type);

      renderCategoryChips(typeFiltered);

      const searched = applySearch(typeFiltered, state.search);
      const filtered = state.category === 'all'
        ? searched
        : searched.filter(tx => (tx.category || '') === state.category);

      if (filtered.length === 0){
        list.innerHTML = emptyStateHTML();
        return;
      }

      const groups = groupByDate(filtered);
      let index = 0;
      list.innerHTML = groups.map(group => `
        <div class="history-group">
          <div class="history-group-label">${group.label}</div>
          ${group.items.map(tx => {
            const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_STEP_MS;
            index++;
            return renderCard(tx, delay);
          }).join('')}
        </div>
      `).join('');
    } catch (err) {
      // A single malformed record must never blank the whole History
      // page. Show an honest "couldn't display" message rather than
      // silently reusing the "no transactions" empty state, which
      // would look like the user's data disappeared.
      console.error('[History] render failed:', err);
      list.innerHTML = `
        <div class="card empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3>Couldn't display History</h3>
          <p>Your transactions are safe. Pull to refresh or reopen the app to try again.</p>
        </div>`;
    }
  }

  /** Build one transaction card: icon, name, amount, date, time, category, account. */
  function renderCard(tx, delay = 0){
    const type = tx.type;
    const meta = categoryMetaFor(tx);
    const iconPath = ICON_LIBRARY[meta.icon] || ICON_LIBRARY.default;
    const dateLabel = formatDate(tx.date);
    // createdAt is the actual device clock time the transaction was saved
    // at; older records saved before this field existed fall back to date.
    const timeLabel = formatTime(tx.createdAt || tx.date);

    let name, categoryLabel, accountText, sign;

    if (type === 'transfer'){
      const fromLabel = accountLabel(tx.fromAccount);
      const toLabel = accountLabel(tx.toAccount);
      name = escapeHTML(tx.description || `${fromLabel} → ${toLabel}`);
      categoryLabel = 'Transfer';
      accountText = `${fromLabel} → ${toLabel}`;
      sign = '';
    } else {
      const isIncome = type === 'income';
      name = escapeHTML(tx.description || tx.category || (isIncome ? 'Income' : 'Expense'));
      categoryLabel = escapeHTML(tx.category || '');
      accountText = accountLabel(tx.account);
      sign = isIncome ? '+' : '-';
    }

    const amountText = `${sign}${formatCurrency(tx.amount)}`;

    return `
      <div class="history-card" data-tx-id="${tx.id}" style="animation-delay:${delay}ms;">
        <div class="history-card-icon history-card-icon-${type}">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>
        </div>
        <div class="history-card-body">
          <div class="history-card-top">
            <span class="history-card-name">${name}</span>
            <span class="history-card-amount history-card-amount-${type}">${amountText}</span>
          </div>
          <div class="history-card-meta">${categoryLabel} · ${escapeHTML(accountText)}</div>
          <div class="history-card-datetime">${dateLabel} · ${timeLabel}</div>
        </div>
        ${deleteButtonHTML('Delete transaction', `data-delete-tx="${tx.id}"`)}
      </div>`;
  }

  /** Contextual category chip row: only categories present in the current type filter. */
  function renderCategoryChips(typeFiltered){
    const wrap = qs('#history-category-filter');
    if (!wrap) return;

    if (state.type === 'transfer'){
      wrap.innerHTML = '';
      wrap.style.display = 'none';
      return;
    }

    const categories = [...new Set(
      typeFiltered.filter(tx => tx.type !== 'transfer').map(tx => tx.category).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    if (categories.length === 0){
      wrap.innerHTML = '';
      wrap.style.display = 'none';
      return;
    }

    // If the previously selected category no longer applies (e.g. type just changed), reset it.
    if (state.category !== 'all' && !categories.includes(state.category)){
      state.category = 'all';
    }

    wrap.style.display = '';
    wrap.innerHTML = ['all', ...categories].map(cat => `
      <button type="button" class="history-category-chip ${state.category === cat ? 'active' : ''}" data-category="${escapeHTML(cat)}">
        ${cat === 'all' ? 'All categories' : escapeHTML(cat)}
      </button>
    `).join('');
  }

  function applySearch(list, term){
    const q = term.trim().toLowerCase();
    if (!q) return list;
    return list.filter(tx => {
      const fields = tx.type === 'transfer'
        ? [tx.description, 'transfer', accountLabel(tx.fromAccount), accountLabel(tx.toAccount)]
        : [tx.description, tx.category, accountLabel(tx.account), tx.type];
      return fields.some(f => (f || '').toLowerCase().includes(q));
    });
  }

  function emptyStateHTML(){
    const hasFilters = state.type !== 'all' || state.category !== 'all' || state.search.trim() !== '';
    const message = hasFilters
      ? 'No transactions match your search or filters.'
      : 'Everything you log will show up here.';
    return `
      <div class="card empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3>No transactions found</h3>
        <p>${message}</p>
      </div>`;
  }

  function groupByDate(transactions){
    // Primary sort: transaction date, newest first. Secondary sort:
    // createdAt timestamp (when the record was actually saved), newest
    // first — an explicit tiebreaker so two transactions logged on the
    // same day always show most-recently-added on top, regardless of
    // storage/array order. Falls back to id (also time-based, see uid())
    // for any legacy record saved before createdAt existed.
    const sorted = [...transactions].sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      const createdDiff = new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (createdDiff !== 0) return createdDiff;
      return String(b.id).localeCompare(String(a.id));
    });
    const groups = [];
    let lastLabel = null;

    sorted.forEach(tx => {
      const label = formatRelativeDate(tx.date);
      const groupLabel = ['Today', 'Yesterday'].includes(label) ? label : formatDate(tx.date);
      if (groupLabel !== lastLabel){
        groups.push({ label: groupLabel, items: [] });
        lastLabel = groupLabel;
      }
      groups[groups.length - 1].items.push(tx);
    });

    return groups;
  }

  /**
   * Programmatically switch History to a given type filter ("all" /
   * "income" / "expense" / "transfer"), keeping the filter-tab UI,
   * category chips, and search box all in sync — used by dashboard
   * entry points like the Income stat card ("Income Details").
   * @param {string} type
   */
  function filterByType(type){
    const tabs = qs('#history-filter-tabs');
    const targetTab = tabs ? qs(`.filter-tab[data-filter="${type}"]`, tabs) : null;
    if (!targetTab) return; // unknown filter — leave state untouched

    state.type = type;
    state.category = 'all';
    state.search = '';

    const input = qs('#history-search-input');
    const clearBtn = qs('#history-search-clear');
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';

    qsa('.filter-tab', tabs).forEach(t => t.classList.remove('active'));
    targetTab.classList.add('active');

    render();
  }

  /* ---- Actions ---- */

  function deleteTransaction(id){
    const tx = Storage.Transactions.getById(id);
    if (!tx) return;

    const row = qs(`.history-card[data-tx-id="${id}"]`);
    if (row) row.classList.add('history-card-removing');

    window.setTimeout(() => {
      Storage.Accounts.reverseTransaction(tx);
      Storage.Transactions.remove(id);
      render();
      if (window.App) App.renderDashboard();
      if (window.Statistics) Statistics.render();
      Toast.show('Transaction deleted', 'info');
    }, row ? 220 : 0);
  }

  /* ---- Bindings ---- */

  function bindFilterTabs(){
    const tabs = qs('#history-filter-tabs');
    if (!tabs) return;
    tabs.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.filter-tab');
      if (!btn) return;
      hapticTap();
      qsa('.filter-tab', tabs).forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      state.type = btn.dataset.filter;
      state.category = 'all';
      render();
    });
  }

  function bindCategoryFilter(){
    const wrap = qs('#history-category-filter');
    if (!wrap) return;
    wrap.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.history-category-chip');
      if (!btn) return;
      hapticTap();
      state.category = btn.dataset.category;
      render();
    });
  }

  function bindSearch(){
    const input = qs('#history-search-input');
    const clearBtn = qs('#history-search-clear');
    if (!input) return;

    const runSearch = debounce(() => {
      state.search = input.value;
      if (clearBtn) clearBtn.style.display = state.search.trim() ? 'flex' : 'none';
      render();
    }, 220);

    input.addEventListener('input', runSearch);

    if (clearBtn){
      clearBtn.addEventListener('click', () => {
        hapticTap();
        input.value = '';
        state.search = '';
        clearBtn.style.display = 'none';
        render();
        input.focus();
      });
    }
  }

  function bindDeleteButtons(){
    const list = qs('#history-list');
    if (!list) return;
    list.addEventListener('click', (evt) => {
      const btn = evt.target.closest('[data-delete-tx]');
      if (!btn) return;
      hapticTap();
      deleteTransaction(btn.dataset.deleteTx);
    });
  }

  function init(){
    bindFilterTabs();
    bindCategoryFilter();
    bindSearch();
    bindDeleteButtons();
    render();
  }

  return { init, render, filterByType };
})();

// See the matching note in app.js: `const` doesn't auto-attach to
// `window`, and app.js/categories.js check `window.History` before
// calling back into it to refresh the ledger live.
window.History = History;

/* ---------------------------------------------------------
   ENTRY POINTS FOR QUICK ACTIONS / FAB
   Any element carrying [data-tx-type] opens the modal with
   that preset type, instead of navigating pages.
   --------------------------------------------------------- */
function bindTransactionTriggers(){
  qsa('[data-tx-type]').forEach(el => {
    el.addEventListener('click', () => {
      hapticTap();
      TransactionModal.open(el.dataset.txType);
    });
  });
}

function initTransactionSystem(){
  TransactionModal.bind();
  bindTransactionTriggers();
  History.init();
}
