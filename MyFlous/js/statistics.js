/* =========================================================
   MY FLOUS — STATISTICS
   Phase 4: reads the same Storage ledger the Dashboard and
   History use, and renders every chart as hand-built, animated
   SVG — no chart libraries. Bars/lines/donut segments are drawn
   at their resting state first, then animated to their real
   values on the next frame via CSS transitions, so the whole
   page "grows in" whenever it's opened.
   ========================================================= */

'use strict';

const Statistics = (() => {

  const MONTHS_BACK = 6;

  /* ---------------------------------------------------------
     DATE HELPERS
     --------------------------------------------------------- */
  function sameMonth(iso, ref){
    const d = new Date(iso);
    return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
  }

  function sameDay(iso, ref){
    const d = new Date(iso);
    return d.toDateString() === ref.toDateString();
  }

  function lastNMonths(n){
    const now = new Date();
    const out = [];
    for (let i = n - 1; i >= 0; i--){
      out.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
    }
    return out;
  }

  function lastNDays(n){
    const now = new Date();
    const out = [];
    for (let i = n - 1; i >= 0; i--){
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);
      out.push(d);
    }
    return out;
  }

  function round3(n){ return Math.round((Number(n) || 0) * 1000) / 1000; }

  /** Maps the active app language to a BCP-47 locale for date formatting. */
  function currentLocale(){
    const lang = window.I18n ? window.I18n.getLanguage() : 'en';
    return { en: 'en-US', fr: 'fr-FR', ar: 'ar-SA' }[lang] || 'en-US';
  }

  /* ---------------------------------------------------------
     DATA AGGREGATION (pure functions over Storage.Transactions)
     --------------------------------------------------------- */

  /** Income + expense totals for each of the last N months. */
  function monthlySeries(){
    const months = lastNMonths(MONTHS_BACK);
    const txs = Storage.Transactions.getAll();
    const locale = currentLocale();
    return months.map(m => {
      const income = txs
        .filter(t => t.type === 'income' && sameMonth(t.date, m))
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);
      const expense = txs
        .filter(t => t.type === 'expense' && sameMonth(t.date, m))
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);
      return {
        label: m.toLocaleDateString(locale, { month: 'short' }),
        income: round3(income),
        expense: round3(expense)
      };
    });
  }

  /**
   * Reconstructs the Savings account's running balance across the
   * last N months from transfer transactions, anchored to the
   * account's real current balance (so the final point always
   * matches the Savings account card on the Dashboard).
   */
  function savingsSeries(){
    const months = lastNMonths(MONTHS_BACK);
    const txs = Storage.Transactions.getAll();

    const netByMonth = months.map(m =>
      txs
        .filter(t => t.type === 'transfer' && sameMonth(t.date, m))
        .reduce((s, t) => {
          if (t.toAccount === 'savings') return s + (Number(t.amount) || 0);
          if (t.fromAccount === 'savings') return s - (Number(t.amount) || 0);
          return s;
        }, 0)
    );

    const currentSavings = Storage.Accounts.getBalance('savings');
    const totalNet = netByMonth.reduce((a, b) => a + b, 0);
    let running = currentSavings - totalNet;

    return months.map((m, i) => {
      running += netByMonth[i];
      return { label: m.toLocaleDateString(currentLocale(), { month: 'short' }), value: round3(running) };
    });
  }

  /** Expense breakdown by category for the current calendar month. */
  function expenseCategoriesThisMonth(){
    const now = new Date();
    const txs = Storage.Transactions.getAll().filter(t => t.type === 'expense' && sameMonth(t.date, now));

    const totals = {};
    txs.forEach(t => {
      const name = t.category || 'Other';
      totals[name] = (totals[name] || 0) + (Number(t.amount) || 0);
    });

    const total = round3(Object.values(totals).reduce((a, b) => a + b, 0));

    const list = Object.entries(totals)
      .map(([name, amount]) => {
        const meta = Storage.Categories.findByName('expense', name);
        return {
          name,
          amount: round3(amount),
          pct: total > 0 ? (amount / total) * 100 : 0,
          color: meta ? meta.color : '#7A7A82',
          icon: meta ? meta.icon : 'other'
        };
      })
      .sort((a, b) => b.amount - a.amount);

    return { list, total };
  }

  /** Daily expense totals for the last 7 days. */
  function weeklySeries(){
    const days = lastNDays(7);
    const txs = Storage.Transactions.getAll();
    return days.map(d => {
      const total = txs
        .filter(t => t.type === 'expense' && sameDay(t.date, d))
        .reduce((s, t) => s + (Number(t.amount) || 0), 0);
      return {
        label: d.toLocaleDateString(currentLocale(), { weekday: 'short' }).slice(0, 3),
        value: round3(total)
      };
    });
  }

  /* ---------------------------------------------------------
     SVG CHART BUILDERS
     Each builder returns markup with elements at their RESTING
     state (0 height / 0 dasharray / collapsed path). A matching
     "play" function then flips them to their real values one
     frame later so the CSS transition actually animates.
     --------------------------------------------------------- */

  function niceAmount(v){
    const n = Number(v) || 0;
    if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toFixed(n < 10 && n > 0 ? 1 : 0);
  }

  function buildBarChart(data, opts = {}){
    const { barColor = 'var(--accent)', formatValue = niceAmount } = opts;
    const width = 320, height = 168;
    const padTop = 22, padBottom = 24, padSide = 8, gap = 10;
    const chartH = height - padTop - padBottom;
    const n = Math.max(data.length, 1);
    const barW = Math.max(((width - padSide * 2) - gap * (n - 1)) / n, 4);
    const max = Math.max(...data.map(d => d.value), 0) || 1;
    const baseline = height - padBottom;

    let bars = '', labels = '', values = '';
    data.forEach((d, i) => {
      const x = padSide + i * (barW + gap);
      const h = (d.value / max) * chartH;
      const y = baseline - h;
      const cx = x + barW / 2;
      const color = d.color || barColor;

      bars += `<rect class="bar-rect" data-final-y="${y.toFixed(1)}" data-final-h="${Math.max(h, 0).toFixed(1)}"
        x="${x.toFixed(1)}" y="${baseline}" width="${barW.toFixed(1)}" height="0" rx="5" fill="${color}"></rect>`;

      labels += `<text x="${cx.toFixed(1)}" y="${height - 6}" class="chart-axis-label" text-anchor="middle">${escapeHTML(d.label)}</text>`;

      if (d.value > 0){
        values += `<text class="bar-value-label" data-final-y="${(y - 6).toFixed(1)}"
          x="${cx.toFixed(1)}" y="${baseline - 6}" text-anchor="middle">${formatValue(d.value)}</text>`;
      }
    });

    return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Bar chart">${bars}${labels}${values}</svg>`;
  }

  function playBarChart(container){
    const svg = qs('svg', container);
    if (!svg) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      qsa('.bar-rect', svg).forEach(rect => {
        rect.setAttribute('y', rect.dataset.finalY);
        rect.setAttribute('height', rect.dataset.finalH);
      });
      qsa('.bar-value-label', svg).forEach(t => {
        t.setAttribute('y', t.dataset.finalY);
        t.classList.add('is-visible');
      });
    }));
  }

  function buildLineChart(points, opts = {}){
    const { stroke = 'var(--success)', gradientId = 'lineGradient' } = opts;
    const width = 320, height = 168;
    const padTop = 20, padBottom = 24, padSide = 12;
    const chartW = width - padSide * 2;
    const chartH = height - padTop - padBottom;

    const values = points.map(p => p.value);
    const max = Math.max(...values, 0);
    const min = Math.min(...values, 0);
    const range = (max - min) || 1;
    const n = points.length;
    const stepX = n > 1 ? chartW / (n - 1) : 0;

    const coords = points.map((p, i) => ({
      x: padSide + i * stepX,
      y: padTop + chartH - ((p.value - min) / range) * chartH,
      label: p.label,
      value: p.value
    }));

    const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const baseY = (padTop + chartH).toFixed(1);
    const areaPath = `${linePath} L${coords[coords.length - 1].x.toFixed(1)},${baseY} L${coords[0].x.toFixed(1)},${baseY} Z`;

    const dots = coords.map(c => `<circle class="line-dot" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5"></circle>`).join('');
    const labels = coords.map(c =>
      `<text x="${c.x.toFixed(1)}" y="${height - 6}" class="chart-axis-label" text-anchor="middle">${escapeHTML(c.label)}</text>`
    ).join('');

    return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${stroke}" stop-opacity="0.32"></stop>
          <stop offset="100%" stop-color="${stroke}" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <path class="line-area" d="${areaPath}" fill="url(#${gradientId})"></path>
      <path class="line-stroke" d="${linePath}" fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
      ${dots}
      ${labels}
    </svg>`;
  }

  function playLineChart(container){
    const svg = qs('svg', container);
    if (!svg) return;
    const path = qs('.line-stroke', svg);
    const area = qs('.line-area', svg);

    if (path){
      try {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      } catch (_) {
        // getTotalLength isn't available in every environment; the
        // line still renders correctly, it just won't "draw" in.
      }
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (path) path.style.strokeDashoffset = '0';
      if (area) area.classList.add('is-visible');
      qsa('.line-dot', svg).forEach(dot => dot.classList.add('is-visible'));
    }));
  }

  function buildDonutChart(segments, total, opts = {}){
    const { size = 176, thickness = 24 } = opts;
    const r = (size - thickness) / 2;
    const c = size / 2;
    const circumference = 2 * Math.PI * r;

    if (!segments.length || total <= 0){
      return `<div class="donut-empty">
        <svg viewBox="0 0 ${size} ${size}" class="chart-svg donut-svg" role="img" aria-label="No expense data">
          <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${thickness}"></circle>
        </svg>
        <p>No expenses logged this month yet — add one to see the breakdown.</p>
      </div>`;
    }

    let acc = 0;
    const segs = segments.map(seg => {
      const dash = (seg.pct / 100) * circumference;
      const gap = circumference - dash;
      const rotation = (acc / 100) * 360 - 90;
      acc += seg.pct;
      return `<circle class="donut-seg" cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${seg.color}"
        stroke-width="${thickness}" stroke-dasharray="0 ${circumference.toFixed(2)}"
        data-final-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}"
        transform="rotate(${rotation.toFixed(2)} ${c} ${c})"></circle>`;
    }).join('');

    const legend = segments.map(seg => `
      <li class="legend-row">
        <span class="legend-dot" style="background:${seg.color}"></span>
        <span class="legend-name">${escapeHTML(seg.name)}</span>
        <span class="legend-pct">${seg.pct.toFixed(0)}%</span>
        <span class="legend-amount">${formatCurrency(seg.amount)}</span>
      </li>`).join('');

    return `<div class="donut-wrap">
      <svg viewBox="0 0 ${size} ${size}" class="chart-svg donut-svg" role="img" aria-label="Expense categories">
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${thickness}"></circle>
        ${segs}
        <text x="${c}" y="${c - 5}" class="donut-center-value" text-anchor="middle">${niceAmount(total)}</text>
        <text x="${c}" y="${c + 15}" class="donut-center-label" text-anchor="middle">${Storage.Prefs.getCurrency()} spent</text>
      </svg>
      <ul class="donut-legend">${legend}</ul>
    </div>`;
  }

  function playDonutChart(container){
    const svg = qs('svg', container);
    if (!svg) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      qsa('.donut-seg', svg).forEach(seg => {
        seg.setAttribute('stroke-dasharray', seg.dataset.finalDasharray);
      });
    }));
  }

  /* ---------------------------------------------------------
     SECTION RENDERERS
     --------------------------------------------------------- */

  function renderHighlightCards(catData){
    const stats = Storage.DashboardStats.getStats();
    const { list } = catData;

    const nameEl = qs('#stat-biggest-category');
    const subEl = qs('#stat-biggest-category-sub');
    if (nameEl && subEl){
      if (list.length){
        const top = list[0];
        nameEl.textContent = top.name;
        subEl.textContent = `${formatCurrency(top.amount)} · ${top.pct.toFixed(0)}% of spending`;
      } else {
        nameEl.textContent = '—';
        subEl.textContent = 'No expenses yet';
      }
    }

    const savingRate = stats.income > 0 ? clamp((stats.saved / stats.income) * 100, 0, 100) : 0;
    const rateEl = qs('#stat-saving-rate');
    const rateSubEl = qs('#stat-saving-rate-sub');
    if (rateEl) rateEl.textContent = `${savingRate.toFixed(0)}%`;
    if (rateSubEl){
      rateSubEl.textContent = stats.income > 0
        ? 'of income saved this month'
        : 'no income logged this month';
    }
  }

  function renderMonthlyCharts(series){
    const incomeContainer = qs('#chart-monthly-income');
    const expenseContainer = qs('#chart-monthly-expense');
    if (!incomeContainer || !expenseContainer) return;

    const incomeData = series.map(m => ({ label: m.label, value: m.income }));
    const expenseData = series.map(m => ({ label: m.label, value: m.expense }));

    incomeContainer.innerHTML = buildBarChart(incomeData, { barColor: 'var(--success)' });
    expenseContainer.innerHTML = buildBarChart(expenseData, { barColor: 'var(--danger)' });

    playBarChart(incomeContainer);
    playBarChart(expenseContainer);
  }

  function renderSavingsChart(points){
    const container = qs('#chart-savings-growth');
    if (!container) return;
    container.innerHTML = buildLineChart(points, { stroke: 'var(--success)', gradientId: 'savingsGrowthGradient' });
    playLineChart(container);
  }

  function renderCategoriesChart(catData){
    const container = qs('#chart-expense-categories');
    if (!container) return;
    container.innerHTML = buildDonutChart(catData.list, catData.total);
    playDonutChart(container);
  }

  function renderWeeklyChart(days){
    const container = qs('#chart-weekly-spending');
    if (!container) return;
    container.innerHTML = buildBarChart(days, { barColor: 'var(--danger)' });
    playBarChart(container);
  }

  function renderMonthlyReport(series, catData){
    const container = qs('#monthly-report-card');
    if (!container) return;

    const t = window.I18n ? window.I18n.t : (k => k);
    const locale = currentLocale();

    const stats = Storage.DashboardStats.getStats();
    const thisMonth = series[series.length - 1];
    const lastMonth = series.length > 1 ? series[series.length - 2] : null;
    const monthName = new Date().toLocaleDateString(locale, { month: 'long' });
    const topCategory = catData.list.length ? catData.list[0] : null;
    const savingRate = stats.income > 0 ? clamp((stats.saved / stats.income) * 100, 0, 100) : 0;

    let trendLine;
    if (!lastMonth || lastMonth.expense <= 0){
      trendLine = t('report.firstMonth');
    } else {
      const change = ((thisMonth.expense - lastMonth.expense) / lastMonth.expense) * 100;
      if (change > 0.5){
        trendLine = t('report.spendingUp').replace('{pct}', change.toFixed(0)).replace('{month}', lastMonth.label);
      } else if (change < -0.5){
        trendLine = t('report.spendingDown').replace('{pct}', Math.abs(change).toFixed(0)).replace('{month}', lastMonth.label);
      } else {
        trendLine = t('report.spendingFlat').replace('{month}', lastMonth.label);
      }
    }

    const summaryParts = [
      t('report.summary')
        .replace('{month}', `<b>${monthName}</b>`)
        .replace('{income}', `<b>${formatCurrency(stats.income)}</b>`)
        .replace('{expenses}', `<b>${formatCurrency(stats.expenses)}</b>`)
        .replace('{remaining}', `<b>${formatCurrency(stats.remaining)}</b>`),
      topCategory
        ? ` ${t('report.topCategory').replace('{category}', `<b>${escapeHTML(topCategory.name)}</b>`).replace('{pct}', topCategory.pct.toFixed(0))}`
        : '',
      ` ${trendLine}`
    ];

    container.innerHTML = `
      <p class="report-summary">${summaryParts.join('')}</p>
      <div class="report-rows">
        <div class="report-row"><span>${t('report.totalIncome')}</span><b class="pos">+${formatCurrency(stats.income)}</b></div>
        <div class="report-row"><span>${t('report.totalExpenses')}</span><b class="neg">-${formatCurrency(stats.expenses)}</b></div>
        <div class="report-row"><span>${t('report.movedToSavings')}</span><b>${formatCurrency(stats.saved)}</b></div>
        <div class="report-row"><span>${t('report.remainingBalance')}</span><b>${formatCurrency(stats.remaining)}</b></div>
        <div class="report-row"><span>${t('stats.savingRate')}</span><b>${savingRate.toFixed(0)}%</b></div>
      </div>
    `;
  }

  /* ---------------------------------------------------------
     PUBLIC ENTRY POINT
     --------------------------------------------------------- */
  function render(){
    const statsPage = qs('.page[data-page="statistics"]');
    if (!statsPage) return;

    const series = monthlySeries();
    const catData = expenseCategoriesThisMonth();
    const savingsPoints = savingsSeries();
    const weekly = weeklySeries();

    renderHighlightCards(catData);
    renderMonthlyCharts(series);
    renderSavingsChart(savingsPoints);
    renderCategoriesChart(catData);
    renderWeeklyChart(weekly);
    renderMonthlyReport(series, catData);
  }

  return { render };
})();

// See the matching note in app.js: `const` doesn't auto-attach to
// `window`, and transactions.js/app.js check `window.Statistics`
// before calling back into it to refresh charts live.
window.Statistics = Statistics;
