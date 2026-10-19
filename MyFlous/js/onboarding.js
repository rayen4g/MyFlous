/* =========================================================
   MY FLOUS — ONBOARDING WIZARD + GUIDED HOME TOUR
   Onboarding: a 6-step animated wizard (welcome, language,
   name, country, category, ready) shown on first launch or
   right after "Reset data" wipes the device. Writes straight
   into Storage.Profile / Storage.Prefs — same source of truth
   the Profile page itself reads from.
   GuideTour: a one-time spotlight+tooltip walkthrough of the
   Home screen, played right after onboarding finishes (or on
   demand from Profile > "Replay app tour").
   ========================================================= */

'use strict';

const Onboarding = (() => {
  // Welcome/Ready render their own big CTA (see onboarding.css); the
  // shared bottom nav (Back/Next) only shows for the 4 steps between them.
  const STEPS = ['welcome', 'language', 'name', 'country', 'category', 'ready'];

  let stepIndex = 0;
  let onComplete = null;
  const state = { language: 'en', name: '', country: '', occupation: 'student' };

  function els(){
    return {
      screen:          qs('#onboarding-screen'),
      stepsWrap:       qs('#ob-steps'),
      progressFill:    qs('#ob-progress-fill'),
      skipBtn:         qs('#ob-skip-btn'),
      backBtn:         qs('#ob-back-btn'),
      nextBtn:         qs('#ob-next-btn'),
      welcomeNextBtn:  qs('#ob-welcome-next'),
      languageList:    qs('#ob-language-list'),
      nameInput:       qs('#ob-name-input'),
      countryTrigger:  qs('#ob-country-trigger'),
      countryValue:    qs('#ob-country-value'),
      categoryList:    qs('#ob-category-list'),
      readySubtitle:   qs('#ob-ready-subtitle'),
      finishBtn:       qs('#ob-finish-btn')
    };
  }

  function currentStepName(){ return STEPS[stepIndex]; }

  function updateProgress(){
    const e = els();
    if (!e.progressFill) return;
    const pct = (stepIndex / (STEPS.length - 1)) * 100;
    e.progressFill.style.width = `${pct}%`;
  }

  /* ---------------------------------------------------------
     LANGUAGE STEP
     --------------------------------------------------------- */
  function renderLanguageList(){
    const e = els();
    if (!e.languageList || !window.I18n) return;
    e.languageList.innerHTML = I18n.LANGUAGES.map(lang => `
      <div class="ob-language-row${lang.code === state.language ? ' selected' : ''}" data-lang="${lang.code}">
        <span class="ob-language-flag">${I18n.FLAGS[lang.flag]}</span>
        <span class="ob-language-name">${lang.native}</span>
        <svg class="ob-language-check" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    `).join('');
  }

  function bindLanguageList(){
    const e = els();
    if (!e.languageList) return;
    e.languageList.addEventListener('click', (evt) => {
      const row = evt.target.closest('[data-lang]');
      if (!row) return;
      const chosen = row.dataset.lang;
      if (chosen === state.language){ goNext(); return; }
      hapticTap();
      state.language = chosen;
      if (window.I18n) I18n.applyLanguage(chosen);
      renderLanguageList();
      // Let the "selected" highlight land before sliding to the next step.
      window.setTimeout(goNext, 260);
    });
  }

  /* ---------------------------------------------------------
     NAME STEP
     --------------------------------------------------------- */
  function bindName(){
    const e = els();
    if (!e.nameInput) return;
    e.nameInput.addEventListener('input', () => e.nameInput.classList.remove('ob-field-invalid'));
    e.nameInput.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter'){ evt.preventDefault(); goNext(); }
    });
  }

  /* ---------------------------------------------------------
     COUNTRY STEP (reuses the existing CountryPicker sheet)
     --------------------------------------------------------- */
  function bindCountry(){
    const e = els();
    if (!e.countryTrigger) return;
    e.countryTrigger.addEventListener('click', () => {
      hapticTap();
      if (typeof CountryPicker === 'undefined') return;
      CountryPicker.open(state.country, (chosen) => {
        state.country = chosen;
        if (e.countryValue){
          const lang = window.I18n ? I18n.getLanguage() : 'en';
          e.countryValue.innerHTML = `<span class="country-select-flag" aria-hidden="true">${getCountryFlag(chosen)}</span> ${escapeHTML(getCountryDisplayName(chosen, lang))}`;
          e.countryValue.classList.remove('country-select-placeholder');
        }
        e.countryTrigger.classList.add('selected');
      });
    });
  }

  /* ---------------------------------------------------------
     CATEGORY (occupation) STEP
     --------------------------------------------------------- */
  function renderCategorySelection(){
    const e = els();
    if (!e.categoryList) return;
    qsa('.ob-category-card', e.categoryList).forEach(card => {
      card.classList.toggle('selected', card.dataset.occupation === state.occupation);
    });
  }

  function bindCategoryList(){
    const e = els();
    if (!e.categoryList) return;
    e.categoryList.addEventListener('click', (evt) => {
      const card = evt.target.closest('.ob-category-card');
      if (!card) return;
      hapticTap();
      state.occupation = card.dataset.occupation;
      renderCategorySelection();
    });
  }

  /* ---------------------------------------------------------
     READY STEP
     --------------------------------------------------------- */
  function renderReady(){
    const e = els();
    if (!e.readySubtitle || !window.I18n) return;
    const name = state.name;
    e.readySubtitle.textContent = name
      ? I18n.t('onboarding.readySubtitleNamed').replace('{name}', name)
      : I18n.t('onboarding.readySubtitle');
  }

  /* ---------------------------------------------------------
     STEP NAVIGATION
     --------------------------------------------------------- */
  function validateCurrentStep(){
    if (currentStepName() !== 'name') return true;
    const e = els();
    const val = (e.nameInput.value || '').trim();
    if (!val){
      e.nameInput.classList.remove('ob-field-invalid');
      void e.nameInput.offsetWidth; // restart the shake animation on repeat taps
      e.nameInput.classList.add('ob-field-invalid');
      e.nameInput.focus();
      return false;
    }
    state.name = val;
    return true;
  }

  function showStep(index){
    const e = els();
    stepIndex = clamp(index, 0, STEPS.length - 1);
    const stepEls = qsa('.ob-step', e.stepsWrap);

    stepEls.forEach((el, i) => {
      el.classList.remove('ob-step-active', 'ob-step-prev');
      if (i === stepIndex) el.classList.add('ob-step-active');
      else if (i < stepIndex) el.classList.add('ob-step-prev');
    });

    if (e.screen) e.screen.setAttribute('data-current-step', currentStepName());
    if (e.backBtn) e.backBtn.classList.toggle('ob-visible', stepIndex >= 1 && stepIndex <= STEPS.length - 2);
    updateProgress();

    if (currentStepName() === 'ready') renderReady();
    if (e.stepsWrap) e.stepsWrap.scrollTop = 0;
  }

  function goNext(){
    if (!validateCurrentStep()) return;
    if (stepIndex >= STEPS.length - 1) return;
    hapticTap();
    showStep(stepIndex + 1);
  }

  function goBack(){
    if (stepIndex <= 0) return;
    hapticTap();
    showStep(stepIndex - 1);
  }

  /** Jump straight to the Ready step, keeping whatever was already chosen. */
  function skip(){
    const e = els();
    if (e.nameInput && e.nameInput.value.trim()) state.name = e.nameInput.value.trim();
    hapticTap();
    showStep(STEPS.length - 1);
  }

  /* ---------------------------------------------------------
     FINISH — persist the profile + close the wizard
     --------------------------------------------------------- */
  function finish(){
    const e = els();
    hapticTap();

    Storage.Profile.save({
      name: state.name,
      country: state.country,
      occupation: state.occupation
    });
    Storage.Prefs.setOnboardingComplete(true);

    if (typeof ProfileForm !== 'undefined') ProfileForm.render(Storage.Profile.get());
    if (typeof Toast !== 'undefined'){
      Toast.show(window.I18n ? I18n.t('onboarding.readyTitle') : 'All set!', 'success');
    }

    if (e.screen) e.screen.classList.add('ob-exit');
    window.setTimeout(() => {
      if (e.screen){
        e.screen.classList.remove('ob-visible', 'ob-exit');
        e.screen.setAttribute('aria-hidden', 'true');
      }
      if (typeof onComplete === 'function') onComplete();
    }, 420);
  }

  /* ---------------------------------------------------------
     OPEN / BIND
     --------------------------------------------------------- */
  function open(onCompleteCb){
    onComplete = onCompleteCb;
    const e = els();
    if (!e.screen){
      if (typeof onCompleteCb === 'function') onCompleteCb();
      return;
    }

    state.language = window.I18n ? I18n.getLanguage() : 'en';
    state.name = '';
    state.country = '';
    state.occupation = 'student';

    if (e.nameInput) e.nameInput.value = '';
    if (e.countryValue && window.I18n){
      e.countryValue.textContent = I18n.t('onboarding.countryButton');
      e.countryValue.classList.add('country-select-placeholder');
    }
    if (e.countryTrigger) e.countryTrigger.classList.remove('selected');

    renderLanguageList();
    renderCategorySelection();

    e.screen.classList.add('ob-visible');
    e.screen.removeAttribute('aria-hidden');
    showStep(0);
  }

  function bind(){
    const e = els();
    if (!e.screen) return;

    if (e.skipBtn) e.skipBtn.addEventListener('click', skip);
    if (e.backBtn) e.backBtn.addEventListener('click', goBack);
    if (e.nextBtn) e.nextBtn.addEventListener('click', goNext);
    if (e.welcomeNextBtn) e.welcomeNextBtn.addEventListener('click', goNext);
    if (e.finishBtn) e.finishBtn.addEventListener('click', finish);

    bindLanguageList();
    bindName();
    bindCountry();
    bindCategoryList();
  }

  return { bind, open };
})();

/* =========================================================
   GUIDED HOME TOUR
   ========================================================= */
const GuideTour = (() => {
  const STEPS = [
    { selector: '.balance-card',  titleKey: 'tour.balanceTitle', textKey: 'tour.balanceText', pad: 10, radius: '22px' },
    { selector: '#fab-add-btn',   titleKey: 'tour.addTitle',     textKey: 'tour.addText',      pad: 14, radius: '50%' },
    { selector: '.bottom-nav',    titleKey: 'tour.navTitle',     textKey: 'tour.navText',      pad: 4,  radius: '26px' },
    { selector: '#profile-btn',   titleKey: 'tour.profileTitle', textKey: 'tour.profileText',  pad: 8,  radius: '50%' }
  ];

  let index = 0;
  let active = false;

  function els(){
    return {
      overlay:    qs('#tour-overlay'),
      spotlight:  qs('#tour-spotlight'),
      tooltip:    qs('#tour-tooltip'),
      arrow:      qs('#tour-tooltip-arrow'),
      stepLabel:  qs('#tour-tooltip-step'),
      title:      qs('#tour-tooltip-title'),
      text:       qs('#tour-tooltip-text'),
      nextBtn:    qs('#tour-next-btn'),
      skipBtn:    qs('#tour-skip-btn')
    };
  }

  function placeStep(){
    const e = els();
    const step = STEPS[index];
    const targetEl = qs(step.selector);

    // Target not on screen (different page state) — skip it gracefully.
    if (!targetEl || targetEl.offsetParent === null){
      if (index >= STEPS.length - 1) finish(); else { index += 1; placeStep(); }
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const pad = step.pad || 8;

    e.spotlight.style.top = `${rect.top - pad}px`;
    e.spotlight.style.left = `${rect.left - pad}px`;
    e.spotlight.style.width = `${rect.width + pad * 2}px`;
    e.spotlight.style.height = `${rect.height + pad * 2}px`;
    e.spotlight.style.borderRadius = step.radius || '18px';

    if (window.I18n){
      e.stepLabel.textContent = I18n.t('tour.stepOf').replace('{current}', index + 1).replace('{total}', STEPS.length);
      e.title.textContent = I18n.t(step.titleKey);
      e.text.textContent = I18n.t(step.textKey);
      e.nextBtn.textContent = (index === STEPS.length - 1) ? I18n.t('tour.done') : I18n.t('tour.next');
    }

    positionTooltip(rect, pad);
    requestAnimationFrame(() => e.tooltip.classList.add('tour-tooltip-visible'));
  }

  function positionTooltip(rect, pad){
    const e = els();
    e.tooltip.classList.remove('tour-tooltip-visible');

    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    const estHeight = e.tooltip.offsetHeight || 150;
    const tooltipWidth = e.tooltip.offsetWidth || 280;

    const spaceBelow = viewportH - rect.bottom;
    const placeAbove = spaceBelow < estHeight + 28;

    let top = placeAbove
      ? rect.top - pad - estHeight - 14
      : rect.bottom + pad + 14;
    top = clamp(top, 12, viewportH - estHeight - 12);

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = clamp(left, 16, viewportW - tooltipWidth - 16);

    e.tooltip.style.top = `${top}px`;
    e.tooltip.style.left = `${left}px`;

    e.arrow.className = `tour-tooltip-arrow ${placeAbove ? 'arrow-bottom' : 'arrow-top'}`;
    const arrowLeft = clamp(rect.left + rect.width / 2 - left - 7, 16, tooltipWidth - 28);
    e.arrow.style.left = `${arrowLeft}px`;
  }

  function next(){
    hapticTap();
    if (index >= STEPS.length - 1){ finish(); return; }
    index += 1;
    placeStep();
  }

  function finish(){
    const e = els();
    Storage.Prefs.setSeenGuideTour(true);
    if (e.overlay){
      e.overlay.classList.remove('tour-visible');
      e.overlay.setAttribute('aria-hidden', 'true');
    }
    if (e.tooltip) e.tooltip.classList.remove('tour-tooltip-visible');
    active = false;
  }

  function start(){
    if (active) return;
    const e = els();
    if (!e.overlay) return;
    active = true;
    index = 0;
    e.overlay.classList.add('tour-visible');
    e.overlay.setAttribute('aria-hidden', 'false');
    // Small delay so layout (e.g. the shell just became visible, or a
    // page navigation just fired) settles before measuring rects.
    window.setTimeout(placeStep, 80);
  }

  function bind(){
    const e = els();
    if (!e.overlay) return;
    if (e.nextBtn) e.nextBtn.addEventListener('click', next);
    if (e.skipBtn) e.skipBtn.addEventListener('click', finish);
    window.addEventListener('resize', () => { if (active) placeStep(); });
  }

  return { bind, start };
})();

// Matches the App/Storage/I18n pattern: app.js checks `window.Onboarding`
// / `window.GuideTour` before calling in, and top-level `const` doesn't
// auto-attach to `window` the way `var`/function declarations do.
window.Onboarding = Onboarding;
window.GuideTour = GuideTour;
