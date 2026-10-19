/* =========================================================
   MY FLOUS — PROFILE & SETTINGS
   Profile identity form (photo, name, age, country, occupation),
   the Settings card (dark mode is wired in app.js; notifications,
   currency and reset live here) and the About card. Data is
   persisted through Storage.Profile / Storage.Prefs; this file
   is UI only. Reuses Confirm + Toast from categories.js/transactions.js.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   COUNTRY PICKER — mobile-friendly bottom sheet used by the
   Profile "Country" field instead of a native <datalist>
   (which renders inconsistently, if at all, on phone browsers).
   Lists every country from COUNTRY_LIST (js/utils.js), grouped
   under A-Z letter headers, with a live search box on top.
   --------------------------------------------------------- */
const CountryPicker = (() => {
  let isOpen = false;
  let onSelect = null;
  let currentValue = '';

  function els(){
    return {
      overlay:      qs('#country-modal-overlay'),
      sheet:        qs('#country-modal-sheet'),
      closeBtn:     qs('#country-modal-close'),
      searchInput:  qs('#country-search-input'),
      searchClear:  qs('#country-search-clear'),
      list:         qs('#country-picker-list')
    };
  }

  /**
   * Group an already-alphabetical list of { en, display } entries under
   * A-Z letter headers, keyed off the (translated) display name.
   */
  function groupAlphabetically(entries){
    const groups = [];
    let current = null;
    entries.forEach(entry => {
      const letter = entry.display.charAt(0).toUpperCase();
      if (!current || current.letter !== letter){
        current = { letter, items: [] };
        groups.push(current);
      }
      current.items.push(entry);
    });
    return groups;
  }

  function renderList(filterText){
    const e = els();
    if (!e.list) return;

    const lang = window.I18n ? I18n.getLanguage() : 'en';
    const term = filterText.trim().toLowerCase();

    const entries = COUNTRY_LIST
      .map(en => ({ en, display: getCountryDisplayName(en, lang) }))
      .sort((a, b) => a.display.localeCompare(b.display, lang));
    const filtered = term
      ? entries.filter(c => c.display.toLowerCase().includes(term) || c.en.toLowerCase().includes(term))
      : entries;

    if (!filtered.length){
      const emptyText = lang === 'fr'
        ? `Aucun pays ne correspond à \u00ab ${filterText} \u00bb`
        : `No countries match "${filterText}"`;
      e.list.innerHTML = `<div class="country-empty">${escapeHTML(emptyText)}</div>`;
      return;
    }

    const groups = groupAlphabetically(filtered);
    e.list.innerHTML = groups.map(group => `
      <div class="history-group">
        <div class="history-group-label">${group.letter}</div>
        ${group.items.map(({ en, display }) => `
          <div class="country-row${en === currentValue ? ' country-row-selected' : ''}" data-country="${escapeHTML(en)}">
            <span class="country-row-flag" aria-hidden="true">${getCountryFlag(en)}</span>
            <span class="country-row-name">${escapeHTML(display)}</span>
            ${en === currentValue ? '<svg class="country-row-check" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </div>

        `).join('')}
      </div>
    `).join('');
  }

  function open(value, selectCallback){
    const e = els();
    if (!e.overlay) return;

    currentValue = value || '';
    onSelect = selectCallback;

    if (e.searchInput) e.searchInput.value = '';
    if (e.searchClear) e.searchClear.style.display = 'none';
    renderList('');

    e.overlay.classList.add('modal-open');
    e.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    window.requestAnimationFrame(() => e.sheet.classList.add('sheet-in'));

    // Scroll the selected country into view once the sheet has settled.
    window.setTimeout(() => {
      const selectedRow = e.list && e.list.querySelector('.country-row-selected');
      if (selectedRow && typeof selectedRow.scrollIntoView === 'function'){
        selectedRow.scrollIntoView({ block: 'center' });
      }
    }, 320);
  }

  function close(){
    const e = els();
    if (!e.overlay || !isOpen) return;
    isOpen = false;
    e.sheet.classList.remove('sheet-in');
    e.sheet.classList.add('sheet-out');
    e.overlay.classList.remove('modal-open');
    window.setTimeout(() => {
      e.sheet.classList.remove('sheet-out');
      e.overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }, 280);
  }

  function bind(){
    const e = els();
    if (!e.overlay) return;

    qsa('[data-country-modal-close]').forEach(el => el.addEventListener('click', close));

    if (e.searchInput){
      e.searchInput.addEventListener('input', () => {
        if (e.searchClear) e.searchClear.style.display = e.searchInput.value ? 'flex' : 'none';
        renderList(e.searchInput.value);
      });
    }
    if (e.searchClear){
      e.searchClear.addEventListener('click', () => {
        e.searchInput.value = '';
        e.searchClear.style.display = 'none';
        renderList('');
        e.searchInput.focus();
      });
    }
    if (e.list){
      e.list.addEventListener('click', (evt) => {
        const row = evt.target.closest('[data-country]');
        if (!row) return;
        hapticTap();
        const country = row.dataset.country;
        const fn = onSelect;
        close();
        if (fn) fn(country);
      });
    }
  }

  return { bind, open, close };
})();

/* ---------------------------------------------------------
   PROFILE IDENTITY FORM
   --------------------------------------------------------- */
const ProfileForm = (() => {

  const OCCUPATION_LABELS = { student: 'Student', pupil: 'Pupil', employee: 'Employee' };

  function els(){
    return {
      nameInput:        qs('#profile-name'),
      ageInput:         qs('#profile-age'),
      countryInput:     qs('#profile-country'),
      countryTrigger:   qs('#profile-country-trigger'),
      countryValue:     qs('#profile-country-value'),
      occupationChips:  qsa('#profile-occupation-chips .chip'),
      bioInput:         qs('#profile-bio'),
      bioCounter:       qs('#profile-bio-counter'),
      bioDisplay:       qs('#profile-bio-display'),
      avatarWrap:       qs('#profile-avatar'),
      avatarImg:        qs('#profile-avatar-img'),
      avatarIcon:       qs('#profile-avatar .avatar-placeholder-icon'),
      avatarEditBtn:    qs('#avatar-edit-btn'),
      avatarFileInput:  qs('#avatar-file-input'),
      nameDisplay:      qs('#profile-name-display'),
      occupationDisplay:qs('#profile-occupation-display'),
      topNavAvatar:     qs('#profile-btn'),
      greetingName:     qs('#greeting-name')
    };
  }

  /** Keep the "N / 150" counter under the Bio textarea in sync, flagging near-limit input. */
  function updateBioCounter(e){
    if (!e.bioInput || !e.bioCounter) return;
    const max = Number(e.bioInput.getAttribute('maxlength')) || 150;
    const len = e.bioInput.value.length;
    e.bioCounter.textContent = `${len} / ${max}`;
    e.bioCounter.classList.toggle('char-counter-limit', len >= max);
  }

  /** Reflect a profile record into every element that displays it. */
  function render(profile){
    const e = els();
    if (!e.nameInput) return; // Profile page not present in this view

    if (document.activeElement !== e.nameInput) e.nameInput.value = profile.name || '';
    if (document.activeElement !== e.ageInput) e.ageInput.value = profile.age || '';
    if (e.countryInput) e.countryInput.value = profile.country || '';
    if (e.countryValue){
      const hasCountry = !!(profile.country && profile.country.trim());
      const lang = window.I18n ? I18n.getLanguage() : 'en';
      e.countryValue.innerHTML = hasCountry
        ? `<span class="country-select-flag" aria-hidden="true">${getCountryFlag(profile.country)}</span> ${escapeHTML(getCountryDisplayName(profile.country, lang))}`
        : 'Select country';
      e.countryValue.classList.toggle('country-select-placeholder', !hasCountry);
    }
    if (document.activeElement !== e.bioInput) e.bioInput.value = profile.bio || '';
    updateBioCounter(e);

    if (e.bioDisplay) e.bioDisplay.textContent = (profile.bio || '').trim();

    e.occupationChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.occupation === profile.occupation);
    });

    const cleanName = (profile.name || '').trim();
    const initials = cleanName ? getInitials(cleanName) : null;

    e.nameDisplay.textContent = cleanName || 'Your Name';
    e.occupationDisplay.textContent = cleanName
      ? (OCCUPATION_LABELS[profile.occupation] || 'Add your details below')
      : 'Add your details below';

    if (e.greetingName) e.greetingName.textContent = cleanName ? cleanName.split(/\s+/)[0] : 'there';

    renderAvatar(profile, e, initials);
  }

  /** Update the profile-page avatar circle AND the top-nav avatar button. */
  function renderAvatar(profile, e, initials){
    if (e.avatarWrap){
      e.avatarWrap.querySelectorAll('.avatar-initials').forEach(n => n.remove());

      if (profile.avatar){
        e.avatarWrap.setAttribute('data-empty', 'false');
        if (e.avatarIcon) e.avatarIcon.style.display = 'none';
        if (e.avatarImg){ e.avatarImg.src = profile.avatar; e.avatarImg.style.display = ''; }
      } else if (initials){
        e.avatarWrap.setAttribute('data-empty', 'false');
        if (e.avatarImg) e.avatarImg.style.display = 'none';
        if (e.avatarIcon) e.avatarIcon.style.display = 'none';
        const span = document.createElement('span');
        span.className = 'avatar-initials';
        span.textContent = initials;
        e.avatarWrap.appendChild(span);
      } else {
        e.avatarWrap.setAttribute('data-empty', 'true');
        if (e.avatarImg) e.avatarImg.style.display = 'none';
        if (e.avatarIcon) e.avatarIcon.style.display = '';
      }
    }

    if (e.topNavAvatar){
      e.topNavAvatar.innerHTML = '';
      if (profile.avatar){
        const img = document.createElement('img');
        img.src = profile.avatar;
        img.alt = '';
        e.topNavAvatar.appendChild(img);
      } else {
        e.topNavAvatar.textContent = initials || 'MF';
      }
    }
  }

  function save(patch){
    const updated = Storage.Profile.save(patch);
    render(updated);
    return updated;
  }

  const saveDebounced = debounce(save, 400);

  function handleAvatarFile(evt){
    const file = evt.target.files && evt.target.files[0];
    evt.target.value = ''; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith('image/')){
      Toast.show('Please choose an image file', 'info');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      save({ avatar: reader.result });
      hapticTap();
      Toast.show('Profile photo updated', 'success');
    };
    reader.readAsDataURL(file);
  }

  function bind(){
    const e = els();
    if (!e.nameInput) return; // Profile page not present in this view

    render(Storage.Profile.get());

    e.nameInput.addEventListener('input', () => saveDebounced({ name: e.nameInput.value }));
    e.ageInput.addEventListener('input', () => {
      const digitsOnly = e.ageInput.value.replace(/[^0-9]/g, '');
      saveDebounced({ age: digitsOnly });
    });

    if (e.countryTrigger){
      e.countryTrigger.addEventListener('click', () => {
        hapticTap();
        CountryPicker.open(e.countryInput ? e.countryInput.value : '', (country) => {
          save({ country });
        });
      });
    }

    if (e.bioInput){
      e.bioInput.addEventListener('input', () => {
        updateBioCounter(e);
        saveDebounced({ bio: e.bioInput.value });
        if (e.bioDisplay) e.bioDisplay.textContent = e.bioInput.value.trim();
      });
    }

    const occupationGroup = qs('#profile-occupation-chips');
    if (occupationGroup){
      occupationGroup.addEventListener('click', (evt) => {
        const chip = evt.target.closest('.chip');
        if (!chip) return;
        hapticTap();
        save({ occupation: chip.dataset.occupation });
      });
    }

    if (e.avatarEditBtn && e.avatarFileInput){
      e.avatarEditBtn.addEventListener('click', () => { hapticTap(); e.avatarFileInput.click(); });
      e.avatarFileInput.addEventListener('change', handleAvatarFile);
    }
  }

  return { bind, render };
})();

/* ---------------------------------------------------------
   SETTINGS PANEL — notifications switch, currency selector,
   reset data (dark mode switch stays in app.js since it also
   drives the whole app shell's theme).
   --------------------------------------------------------- */
const SettingsPanel = (() => {

  function bindNotifications(){
    const toggle = qs('#notif-toggle');
    if (!toggle) return;

    const applyState = (on) => toggle.classList.toggle('on', on);
    applyState(Storage.Prefs.getNotifications());

    toggle.addEventListener('click', () => {
      hapticTap();
      const next = !toggle.classList.contains('on');
      applyState(next);
      Storage.Prefs.setNotifications(next);
      Toast.show(next ? 'Notifications enabled' : 'Notifications disabled', 'info');
    });
  }

  function populateCurrencySelect(){
    const select = qs('#currency-select');
    if (!select) return;
    select.innerHTML = CURRENCY_OPTIONS.map(c =>
      `<option value="${c.code}">${c.code} — ${escapeHTML(c.name)}</option>`
    ).join('');
    select.value = Storage.Prefs.getCurrency();
  }

  function bindCurrency(){
    const select = qs('#currency-select');
    if (!select) return;

    populateCurrencySelect();

    select.addEventListener('change', () => {
      hapticTap();
      Storage.Prefs.setCurrency(select.value);
      if (window.App) App.applyCurrency();
      Toast.show(`Currency set to ${select.value}`, 'success');
    });
  }

  function bindReset(){
    const btn = qs('#reset-data-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      hapticTap();
      const t = window.I18n ? I18n.t : (key => key);
      Confirm.show({
        title: t('settings.resetConfirmTitle'),
        message: t('settings.resetConfirmMessage'),
        okText: t('settings.resetConfirmOk'),
        onConfirm: () => {
          Storage.clearAll();
          Toast.show(t('settings.resetDone'), 'info');
          window.setTimeout(() => window.location.reload(), 700);
        }
      });
    });
  }

  function bind(){
    bindNotifications();
    bindCurrency();
    bindReset();
  }

  return { bind, populateCurrencySelect };
})();

function initProfileSystem(){
  CountryPicker.bind();
  ProfileForm.bind();
  SettingsPanel.bind();
}
