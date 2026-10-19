/* =========================================================
   MY FLOUS — CATEGORIES
   Manage Categories screen (list / add / edit / delete, icon
   picker, color picker) plus the small Confirm dialog it
   shares with Backup import/export. Data lives in
   Storage.Categories (js/storage.js); this file is UI only.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   CONFIRM DIALOG — shared by category delete + backup import
   --------------------------------------------------------- */
const Confirm = (() => {
  let onOk = null;

  function show({ title, message, okText = 'Confirm', onConfirm }){
    qs('#confirm-title').textContent = title;
    qs('#confirm-message').textContent = message;
    qs('#confirm-ok-btn').textContent = okText;
    onOk = onConfirm;
    qs('#confirm-overlay').classList.add('confirm-open');
  }

  function hide(){
    qs('#confirm-overlay').classList.remove('confirm-open');
    onOk = null;
  }

  function bind(){
    qs('#confirm-cancel-btn').addEventListener('click', hide);
    qs('#confirm-ok-btn').addEventListener('click', () => {
      const fn = onOk;
      hide();
      if (fn) fn();
    });
  }

  return { show, hide, bind };
})();

/* ---------------------------------------------------------
   CATEGORY MANAGER — the "Manage Categories" bottom sheet
   --------------------------------------------------------- */
const CategoryManager = (() => {

  const ICON_CHOICES = [
    'food', 'transport', 'coffee', 'shopping', 'entertainment', 'university',
    'books', 'bills', 'medicine', 'clothing', 'electronics', 'other',
    'scholarship', 'parents', 'salary', 'freelance', 'gift', 'investment',
    'home', 'phone', 'travel', 'pet', 'sport', 'music', 'health'
  ];

  let activeType = 'expense';
  let editingId = null;
  let selectedIcon = 'other';
  let selectedColor = CATEGORY_COLORS[0];
  let isOpen = false;

  function els(){
    return {
      overlay:      qs('#cat-modal-overlay'),
      sheet:        qs('#cat-modal-sheet'),
      listView:     qs('#cat-list-view'),
      editorView:   qs('#cat-editor-view'),
      tabs:         qsa('.cat-type-tab'),
      list:         qs('#cat-list'),
      addTrigger:   qs('#cat-add-trigger'),
      closeBtn:     qs('#cat-modal-close'),
      editorTitle:  qs('#cat-editor-title'),
      editorForm:   qs('#cat-editor-form'),
      nameInput:    qs('#cat-editor-name'),
      nameError:    qs('#cat-editor-name-error'),
      iconPicker:   qs('#cat-icon-picker'),
      colorPicker:  qs('#cat-color-picker'),
      previewIcon:  qs('#cat-editor-preview-icon'),
      previewSvg:   qs('#cat-editor-preview-svg'),
      deleteBtn:    qs('#cat-editor-delete'),
      backBtn:      qs('#cat-editor-back'),
      editorClose:  qs('#cat-editor-close')
    };
  }

  /* -------- open / close -------- */
  function open(type = 'expense'){
    activeType = type;
    const e = els();
    if (!e.overlay) return;

    showListView();
    renderList();

    e.overlay.classList.add('modal-open');
    e.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    window.requestAnimationFrame(() => e.sheet.classList.add('sheet-in'));
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

  /* -------- list view -------- */
  function showListView(){
    const e = els();
    e.listView.style.display = '';
    e.editorView.style.display = 'none';
    e.tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.catType === activeType));
  }

  function renderList(){
    const e = els();
    const categories = Storage.Categories.getAll(activeType);

    e.list.innerHTML = categories.map(cat => {
      const usage = Storage.Categories.usageCount(activeType, cat.id);
      const canDelete = !cat.isProtected;
      return `
        <div class="cat-row" data-cat-id="${cat.id}">
          <div class="cat-row-icon" style="color:${cat.color}; background:${cat.color}24;">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_LIBRARY[cat.icon] || ICON_LIBRARY.default}</svg>
          </div>
          <div class="cat-row-name">${escapeHTML(cat.name)}</div>
          ${cat.isDefault ? '<span class="cat-row-default-badge">Default</span>' : ''}
          <div class="cat-row-actions">
            <button type="button" class="cat-row-btn cat-edit-btn" data-edit-cat="${cat.id}" aria-label="Edit ${escapeHTML(cat.name)}">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
            </button>
            <button type="button" class="cat-row-btn cat-delete-btn" data-delete-cat="${cat.id}" data-usage="${usage}" aria-label="Delete ${escapeHTML(cat.name)}" ${canDelete ? '' : 'disabled'}>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${TRASH_ICON_PATH}</svg>
            </button>
          </div>
        </div>`;
    }).join('');

    updateCounts();
  }

  function updateCounts(){
    const expenseCountEl = qs('#expense-cat-count');
    const incomeCountEl = qs('#income-cat-count');
    if (expenseCountEl) expenseCountEl.textContent = Storage.Categories.getAll('expense').length;
    if (incomeCountEl) incomeCountEl.textContent = Storage.Categories.getAll('income').length;
  }

  function switchType(type){
    activeType = type;
    showListView();
    renderList();
  }

  /* -------- editor view (add / edit) -------- */
  function renderPickers(){
    const e = els();

    e.iconPicker.innerHTML = ICON_CHOICES.map(key => `
      <button type="button" class="icon-picker-btn${key === selectedIcon ? ' active' : ''}" data-icon="${key}" aria-label="${key}">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_LIBRARY[key]}</svg>
      </button>
    `).join('');

    e.colorPicker.innerHTML = CATEGORY_COLORS.map(color => `
      <button type="button" class="color-picker-btn${color === selectedColor ? ' active' : ''}" data-color="${color}" style="background:${color};" aria-label="${color}"></button>
    `).join('');

    updatePreview();
  }

  function updatePreview(){
    const e = els();
    e.previewIcon.style.color = selectedColor;
    e.previewIcon.style.background = `${selectedColor}24`;
    e.previewSvg.innerHTML = ICON_LIBRARY[selectedIcon] || ICON_LIBRARY.default;
  }

  function openEditor(category = null){
    const e = els();
    editingId = category ? category.id : null;
    selectedIcon = category ? category.icon : 'other';
    selectedColor = category ? category.color : CATEGORY_COLORS[0];

    const editTitleKey = category ? 'categories.editCategory' : 'categories.addCategory';
    e.editorTitle.textContent = window.I18n ? window.I18n.t(editTitleKey) : editTitleKey;
    e.nameInput.value = category ? category.name : '';
    e.nameError.textContent = '';
    e.nameInput.classList.remove('field-invalid');
    e.deleteBtn.style.display = (category && !category.isProtected) ? '' : 'none';

    renderPickers();

    e.listView.style.display = 'none';
    e.editorView.style.display = '';
    window.setTimeout(() => e.nameInput.focus({ preventScroll: true }), 150);
  }

  function closeEditor(){
    showListView();
    renderList();
  }

  function handleSave(evt){
    evt.preventDefault();
    const e = els();
    const name = e.nameInput.value.trim();

    if (!name){
      e.nameInput.classList.add('field-invalid');
      e.nameError.textContent = 'Enter a category name';
      return;
    }

    const payload = { name, icon: selectedIcon, color: selectedColor };
    const result = editingId
      ? Storage.Categories.update(activeType, editingId, payload)
      : Storage.Categories.add(activeType, payload);

    if (!result){
      e.nameInput.classList.add('field-invalid');
      e.nameError.textContent = 'That name is already used';
      return;
    }

    hapticTap();
    Toast.show(editingId ? 'Category updated' : 'Category added', 'success');
    closeEditor();
  }

  function handleDeleteClick(id, usage){
    const cat = Storage.Categories.getById(activeType, id);
    if (!cat) return;

    const message = usage > 0
      ? `"${cat.name}" is used by ${usage} transaction${usage === 1 ? '' : 's'}. They'll be moved to "Other" if you delete it.`
      : `Delete "${cat.name}"? This can't be undone.`;

    Confirm.show({
      title: 'Delete category?',
      message,
      okText: 'Delete',
      onConfirm: () => {
        const result = Storage.Categories.remove(activeType, id);
        if (result.ok){
          hapticTap();
          Toast.show(
            result.reassigned > 0 ? `Category deleted · ${result.reassigned} moved to Other` : 'Category deleted',
            'info'
          );
          renderList();
          if (window.App) App.renderDashboard();
          if (window.History) History.render();
          if (window.Statistics) Statistics.render();
        }
      }
    });
  }

  /* -------- bind -------- */
  function bind(){
    const e = els();
    if (!e.overlay) return;

    qsa('[data-manage-categories]').forEach(el => {
      el.addEventListener('click', () => { hapticTap(); open(el.dataset.manageCategories); });
    });

    e.tabs.forEach(tab => {
      tab.addEventListener('click', () => { hapticTap(); switchType(tab.dataset.catType); });
    });

    e.closeBtn.addEventListener('click', close);
    qsa('[data-cat-modal-close]').forEach(el => el.addEventListener('click', close));

    e.addTrigger.addEventListener('click', () => { hapticTap(); openEditor(null); });
    e.backBtn.addEventListener('click', () => { hapticTap(); closeEditor(); });
    e.editorClose.addEventListener('click', close);

    e.list.addEventListener('click', (evt) => {
      const editBtn = evt.target.closest('[data-edit-cat]');
      if (editBtn){
        hapticTap();
        const cat = Storage.Categories.getById(activeType, editBtn.dataset.editCat);
        if (cat) openEditor(cat);
        return;
      }
      const deleteBtn = evt.target.closest('[data-delete-cat]');
      if (deleteBtn && !deleteBtn.disabled){
        hapticTap();
        handleDeleteClick(deleteBtn.dataset.deleteCat, Number(deleteBtn.dataset.usage) || 0);
      }
    });

    e.iconPicker.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.icon-picker-btn');
      if (!btn) return;
      hapticTap();
      selectedIcon = btn.dataset.icon;
      qsa('.icon-picker-btn', e.iconPicker).forEach(b => b.classList.toggle('active', b === btn));
      updatePreview();
    });

    e.colorPicker.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.color-picker-btn');
      if (!btn) return;
      hapticTap();
      selectedColor = btn.dataset.color;
      qsa('.color-picker-btn', e.colorPicker).forEach(b => b.classList.toggle('active', b === btn));
      updatePreview();
    });

    e.editorForm.addEventListener('submit', handleSave);

    e.deleteBtn.addEventListener('click', () => {
      if (!editingId) return;
      const usage = Storage.Categories.usageCount(activeType, editingId);
      handleDeleteClick(editingId, usage);
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && isOpen) close();
    });
  }

  return { open, close, bind, updateCounts };
})();

/* ---------------------------------------------------------
   BACKUP — export all app data to a JSON file, or restore
   from a previously exported file.
   --------------------------------------------------------- */
const Backup = (() => {

  function exportBackup(){
    const payload = Storage.Backup.exportData();
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `myflous-backup-${dateStamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    Toast.show('Backup exported', 'success');
  }

  function handleFileSelected(evt){
    const file = evt.target.files && evt.target.files[0];
    evt.target.value = ''; // allow re-selecting the same file later
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      let payload;
      try {
        payload = JSON.parse(reader.result);
      } catch (err){
        Toast.show('That file isn\'t a valid backup', 'info');
        return;
      }

      Confirm.show({
        title: 'Restore backup?',
        message: 'This replaces your current accounts, transactions and categories with the backup\'s data.',
        okText: 'Restore',
        onConfirm: () => {
          const result = Storage.Backup.importData(payload);
          if (result.ok){
            Toast.show('Backup restored', 'success');
            window.setTimeout(() => window.location.reload(), 900);
          } else {
            Toast.show('That file isn\'t a valid backup', 'info');
          }
        }
      });
    };
    reader.readAsText(file);
  }

  function bind(){
    const exportBtn = qs('#export-backup-btn');
    const importBtn = qs('#import-backup-btn');
    const fileInput = qs('#import-backup-input');
    if (exportBtn) exportBtn.addEventListener('click', () => { hapticTap(); exportBackup(); });
    if (importBtn && fileInput){
      importBtn.addEventListener('click', () => { hapticTap(); fileInput.click(); });
      fileInput.addEventListener('change', handleFileSelected);
    }
  }

  return { bind, exportBackup };
})();

function initCategorySystem(){
  Confirm.bind();
  CategoryManager.bind();
  CategoryManager.updateCounts();
  Backup.bind();
}
