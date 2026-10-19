/* =========================================================
   MY FLOUS — UTILS
   Small, dependency-free helper functions shared across
   the app. No frameworks, ES6+ only.
   ========================================================= */

'use strict';

/**
 * Shorthand querySelector.
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {Element|null}
 */
const qs = (selector, scope = document) => scope.querySelector(selector);

/**
 * Shorthand querySelectorAll returning a real array.
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {Element[]}
 */
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * Format a number as currency. Falls back to the person's saved
 * currency preference (Storage.Prefs) when no currency is given,
 * so every call site stays in sync with the Settings selector.
 * @param {number} amount
 * @param {string} [currency]
 * @returns {string}
 */
function formatCurrency(amount, currency){
  const value = Number.isFinite(amount) ? amount : 0;
  const curr = currency || (window.Storage ? Storage.Prefs.getCurrency() : 'TND');
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${formatted} ${curr}`;
}

/**
 * Format a Date (or ISO string) into a short human-friendly label.
 * @param {Date|string} date
 * @returns {string}
 */
function formatDate(date){
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

/**
 * Format a Date (or ISO string) into a short 24-hour time label, e.g. "14:32".
 * Used to show the device clock time a transaction was actually saved at,
 * independent of the (user-editable) transaction date.
 * @param {Date|string} date
 * @returns {string}
 */
function formatTime(date){
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
function debounce(fn, wait = 200){
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Clamp a number between min and max.
 */
function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a short unique id (good enough for local-only records).
 * @returns {string}
 */
function uid(){
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Get initials from a full name, e.g. "Rayen" -> "R".
 */
function getInitials(name = ''){
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || '?';
}

/**
 * Apply a light haptic-style feedback via the Vibration API if
 * available (real Android devices support this; harmless no-op
 * everywhere else).
 */
function hapticTap(){
  if ('vibrate' in navigator){
    try { navigator.vibrate(8); } catch (_) { /* ignore */ }
  }
}

/**
 * Wait helper for orchestrating timed UI sequences.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Minimal HTML escaping for data rendered from localStorage. */
function escapeHTML(str = ''){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Shared icon set (SVG inner-paths) keyed by category name (lowercased)
 * plus a couple of special keys ('transfer', 'default'). Used by both
 * the Dashboard "Recent transactions" preview and the full History list
 * so every part of the app draws icons the same way.
 */
const ICON_LIBRARY = {
  food:         '<path d="M7 2v8a2 2 0 0 0 4 0V2M9 10v12"/><path d="M17 2c-1.5 0-3 1.5-3 4s1.5 4 3 4v10"/>',
  transport:    '<rect x="3" y="10" width="18" height="7" rx="2"/><circle cx="7.5" cy="19" r="1.6"/><circle cx="16.5" cy="19" r="1.6"/><path d="M5 10l1.5-4h11L19 10"/>',
  coffee:       '<path d="M3 8h14v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M6 2v2M9 2v2M12 2v2"/>',
  shopping:     '<path d="M6 2l1.5 4h9L18 2"/><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M9 10a3 3 0 0 0 6 0"/>',
  entertainment:'<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M2 8h20"/><circle cx="7" cy="12" r="1"/><circle cx="11" cy="12" r="1"/>',
  university:   '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
  books:        '<path d="M4 4h6a2 2 0 0 1 2 2v14a1.5 1.5 0 0 0-1.5-1.5H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a1.5 1.5 0 0 1 1.5-1.5H20z"/>',
  bills:        '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  medicine:     '<path d="M10.5 20.5L3.5 13.5a5 5 0 1 1 7-7l7 7a5 5 0 1 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>',
  clothing:     '<path d="M8 3l4 2 4-2 4 4-3 3v11H7V10L4 7z"/>',
  electronics:  '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  other:        '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  scholarship:  '<circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/>',
  parents:      '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  salary:       '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4M2 11h20"/>',
  freelance:    '<path d="M20 7h-9a4 4 0 0 0 0 8h9"/><circle cx="7" cy="17" r="3"/>',
  gift:         '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2 0-3-1.2-3-2.5S10 3 12 4c2-1 3 .2 3 1.5S14 8 12 8z"/>',
  investment:   '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="14 6 21 6 21 13"/>',
  home:         '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  phone:        '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
  travel:       '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  pet:          '<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="1.5"/><circle cx="19" cy="13" r="1.5"/><path d="M12 14c-3 0-5 2-5 4.5S9 22 12 22s5-1 5-3.5S15 14 12 14z"/>',
  sport:        '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  music:        '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  health:       '<path d="M20.8 8.6a4.6 4.6 0 0 0-7.8-3.3L12 6.3l-1-1a4.6 4.6 0 0 0-6.5 6.5l7.5 7.5 7.5-7.5c.8-.8 1.3-1.9 1.3-3.2z"/>',
  transfer:     '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  savings:      '<path d="M19 9a3 3 0 0 0-3-3h-1.5a5.5 5.5 0 0 0-10.9 1.2C2.5 8 2 9.8 2 11c0 2.8 2 5 5 5h9a3 3 0 0 0 3-3z"/><circle cx="16" cy="11" r="1"/>',
  default:      '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
};

// Backward-compatible alias (Phase 1 name), kept in case older code paths reference it.
const CATEGORY_ICONS = ICON_LIBRARY;

/** Curated color swatches offered by the category color picker. */
const CATEGORY_COLORS = [
  '#F5B800', '#E4483A', '#1FAE73', '#3A8DE4', '#8B5CF6', '#EC4899',
  '#14B8A6', '#F97316', '#6366F1', '#64748B', '#A16207', '#06B6D4'
];

/**
 * Resolve icon + color for a transaction: prefer the live category
 * record (so custom icon/color edits show up immediately), falling
 * back to the static icon library and a neutral color.
 */
function categoryMetaFor(tx){
  if (tx.type === 'transfer') return { icon: 'transfer', color: '#3A8DE4' };
  const cat = window.Storage && Storage.Categories
    ? Storage.Categories.findByName(tx.type, tx.category)
    : null;
  if (cat) return { icon: cat.icon, color: cat.color };
  const key = (tx.category || '').toLowerCase();
  return { icon: ICON_LIBRARY[key] ? key : 'default', color: '#7A7A82' };
}

/** Resolve an icon key for a transaction: category name, else type-based fallback. */
function iconKeyFor(tx){
  return categoryMetaFor(tx).icon;
}

/** "Today" / "Yesterday" / "N days ago" relative date label. */
function formatRelativeDate(isoDate){
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = new Date().setHours(0,0,0,0) - new Date(date).setHours(0,0,0,0);
  const diffDays = Math.round(diffMs / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

/**
 * Shared "trash" icon path, reused by every delete button in the
 * app (transaction rows, history cards, category rows) so the
 * markup lives in exactly one place instead of being copy-pasted.
 */
const TRASH_ICON_PATH = '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>';

/**
 * Build a standard delete-icon button. `attrs` lets each call
 * site attach whichever data-* attribute it needs (data-delete-tx,
 * data-delete-cat, ...) without duplicating the SVG markup.
 * @param {string} label aria-label for the button
 * @param {string} attrs raw HTML attribute string, e.g. `data-delete-tx="${id}"`
 * @param {string} [extraClass]
 */
function deleteButtonHTML(label, attrs, extraClass = ''){
  return `
    <button type="button" class="tx-delete-btn ${extraClass}" ${attrs} aria-label="${label}">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${TRASH_ICON_PATH}</svg>
    </button>`;
}

/** Human label for an account key. */
function accountLabel(name){
  const labels = { cash: 'Cash', bank: 'Bank', savings: 'Savings' };
  return labels[name] || name;
}

/** Currencies offered by the Settings → Currency selector. */
const CURRENCY_OPTIONS = [
  { code: 'TND', name: 'Tunisian Dinar' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'MAD', name: 'Moroccan Dirham' },
  { code: 'EGP', name: 'Egyptian Pound' }
];

/**
 * Countries offered by the Profile "Country" picker.
 * Full alphabetical list (UN member states + Holy See + State of
 * Palestine + Taiwan), intentionally excluding Israel.
 */
const COUNTRY_LIST = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda',
  'Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize',
  'Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil',
  'Brunei','Bulgaria','Burkina Faso','Burundi',
  'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic',
  'Chad','Chile','China','Colombia','Comoros',
  'Congo (Democratic Republic of the)','Congo (Republic of the)',
  'Costa Rica','Croatia','Cuba','Cyprus','Czechia',
  'Denmark','Djibouti','Dominica','Dominican Republic',
  'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia',
  'Eswatini','Ethiopia',
  'Fiji','Finland','France',
  'Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada',
  'Guatemala','Guinea','Guinea-Bissau','Guyana',
  'Haiti','Holy See','Honduras','Hungary',
  'Iceland','India','Indonesia','Iran','Iraq','Ireland','Italy',
  'Jamaica','Japan','Jordan',
  'Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein',
  'Lithuania','Luxembourg',
  'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta',
  'Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia',
  'Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
  'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger',
  'Nigeria','North Korea','North Macedonia','Norway',
  'Oman',
  'Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay',
  'Peru','Philippines','Poland','Portugal',
  'Qatar',
  'Romania','Russia','Rwanda',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
  'Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal',
  'Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan',
  'Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga',
  'Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
  'Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uruguay','Uzbekistan',
  'Vanuatu','Venezuela','Vietnam',
  'Yemen',
  'Zambia','Zimbabwe'
];

/**
 * French display names for COUNTRY_LIST, keyed by the canonical English
 * name (which stays the value stored in the profile / onboarding state,
 * so switching languages back and forth never mutates saved data).
 * Used by CountryPicker (js/profile.js) to render the list in French.
 */
const COUNTRY_NAMES_FR = {
  'Afghanistan':'Afghanistan','Albania':'Albanie','Algeria':'Algérie','Andorra':'Andorre','Angola':'Angola',
  'Antigua and Barbuda':'Antigua-et-Barbuda','Argentina':'Argentine','Armenia':'Arménie','Australia':'Australie',
  'Austria':'Autriche','Azerbaijan':'Azerbaïdjan','Bahamas':'Bahamas','Bahrain':'Bahreïn','Bangladesh':'Bangladesh',
  'Barbados':'Barbade','Belarus':'Biélorussie','Belgium':'Belgique','Belize':'Belize','Benin':'Bénin',
  'Bhutan':'Bhoutan','Bolivia':'Bolivie','Bosnia and Herzegovina':'Bosnie-Herzégovine','Botswana':'Botswana',
  'Brazil':'Brésil','Brunei':'Brunei','Bulgaria':'Bulgarie','Burkina Faso':'Burkina Faso','Burundi':'Burundi',
  'Cabo Verde':'Cap-Vert','Cambodia':'Cambodge','Cameroon':'Cameroun','Canada':'Canada',
  'Central African Republic':'République centrafricaine','Chad':'Tchad','Chile':'Chili','China':'Chine',
  'Colombia':'Colombie','Comoros':'Comores','Congo (Democratic Republic of the)':'Congo (République démocratique du)',
  'Congo (Republic of the)':'Congo (République du)','Costa Rica':'Costa Rica','Croatia':'Croatie','Cuba':'Cuba',
  'Cyprus':'Chypre','Czechia':'Tchéquie','Denmark':'Danemark','Djibouti':'Djibouti','Dominica':'Dominique',
  'Dominican Republic':'République dominicaine','Ecuador':'Équateur','Egypt':'Égypte','El Salvador':'Salvador',
  'Equatorial Guinea':'Guinée équatoriale','Eritrea':'Érythrée','Estonia':'Estonie','Eswatini':'Eswatini',
  'Ethiopia':'Éthiopie','Fiji':'Fidji','Finland':'Finlande','France':'France','Gabon':'Gabon','Gambia':'Gambie',
  'Georgia':'Géorgie','Germany':'Allemagne','Ghana':'Ghana','Greece':'Grèce','Grenada':'Grenade',
  'Guatemala':'Guatemala','Guinea':'Guinée','Guinea-Bissau':'Guinée-Bissau','Guyana':'Guyana','Haiti':'Haïti',
  'Holy See':'Saint-Siège','Honduras':'Honduras','Hungary':'Hongrie','Iceland':'Islande','India':'Inde',
  'Indonesia':'Indonésie','Iran':'Iran','Iraq':'Irak','Ireland':'Irlande','Italy':'Italie','Jamaica':'Jamaïque',
  'Japan':'Japon','Jordan':'Jordanie','Kazakhstan':'Kazakhstan','Kenya':'Kenya','Kiribati':'Kiribati',
  'Kuwait':'Koweït','Kyrgyzstan':'Kirghizistan','Laos':'Laos','Latvia':'Lettonie','Lebanon':'Liban',
  'Lesotho':'Lesotho','Liberia':'Libéria','Libya':'Libye','Liechtenstein':'Liechtenstein','Lithuania':'Lituanie',
  'Luxembourg':'Luxembourg','Madagascar':'Madagascar','Malawi':'Malawi','Malaysia':'Malaisie','Maldives':'Maldives',
  'Mali':'Mali','Malta':'Malte','Marshall Islands':'Îles Marshall','Mauritania':'Mauritanie','Mauritius':'Maurice',
  'Mexico':'Mexique','Micronesia':'Micronésie','Moldova':'Moldavie','Monaco':'Monaco','Mongolia':'Mongolie',
  'Montenegro':'Monténégro','Morocco':'Maroc','Mozambique':'Mozambique','Myanmar':'Myanmar','Namibia':'Namibie',
  'Nauru':'Nauru','Nepal':'Népal','Netherlands':'Pays-Bas','New Zealand':'Nouvelle-Zélande','Nicaragua':'Nicaragua',
  'Niger':'Niger','Nigeria':'Nigéria','North Korea':'Corée du Nord','North Macedonia':'Macédoine du Nord',
  'Norway':'Norvège','Oman':'Oman','Pakistan':'Pakistan','Palau':'Palaos','Palestine':'Palestine',
  'Panama':'Panama','Papua New Guinea':'Papouasie-Nouvelle-Guinée','Paraguay':'Paraguay','Peru':'Pérou',
  'Philippines':'Philippines','Poland':'Pologne','Portugal':'Portugal','Qatar':'Qatar','Romania':'Roumanie',
  'Russia':'Russie','Rwanda':'Rwanda','Saint Kitts and Nevis':'Saint-Kitts-et-Nevis','Saint Lucia':'Sainte-Lucie',
  'Saint Vincent and the Grenadines':'Saint-Vincent-et-les-Grenadines','Samoa':'Samoa','San Marino':'Saint-Marin',
  'Sao Tome and Principe':'Sao Tomé-et-Principe','Saudi Arabia':'Arabie saoudite','Senegal':'Sénégal',
  'Serbia':'Serbie','Seychelles':'Seychelles','Sierra Leone':'Sierra Leone','Singapore':'Singapour',
  'Slovakia':'Slovaquie','Slovenia':'Slovénie','Solomon Islands':'Îles Salomon','Somalia':'Somalie',
  'South Africa':'Afrique du Sud','South Korea':'Corée du Sud','South Sudan':'Soudan du Sud','Spain':'Espagne',
  'Sri Lanka':'Sri Lanka','Sudan':'Soudan','Suriname':'Suriname','Sweden':'Suède','Switzerland':'Suisse',
  'Syria':'Syrie','Taiwan':'Taïwan','Tajikistan':'Tadjikistan','Tanzania':'Tanzanie','Thailand':'Thaïlande',
  'Timor-Leste':'Timor oriental','Togo':'Togo','Tonga':'Tonga','Trinidad and Tobago':'Trinité-et-Tobago',
  'Tunisia':'Tunisie','Turkey':'Turquie','Turkmenistan':'Turkménistan','Tuvalu':'Tuvalu','Uganda':'Ouganda',
  'Ukraine':'Ukraine','United Arab Emirates':'Émirats arabes unis','United Kingdom':'Royaume-Uni',
  'United States':'États-Unis','Uruguay':'Uruguay','Uzbekistan':'Ouzbékistan','Vanuatu':'Vanuatu',
  'Venezuela':'Venezuela','Vietnam':'Vietnam','Yemen':'Yémen','Zambia':'Zambie','Zimbabwe':'Zimbabwe'
};

/**
 * Display name for a canonical COUNTRY_LIST entry in the current UI
 * language. Falls back to the English (canonical) name for any language
 * without a translation table (or an unrecognized country).
 */
function getCountryDisplayName(englishName, lang){
  if (lang === 'fr') return COUNTRY_NAMES_FR[englishName] || englishName;
  return englishName;
}

/**
 * ISO 3166-1 alpha-2 code for every COUNTRY_LIST entry, keyed by the same
 * canonical English name used throughout (profile/onboarding state, the
 * French display map above, etc). Used only to render each country's flag
 * (see getCountryFlagSVG in js/flags.js) — never stored itself.
 */
const COUNTRY_ISO = {
  'Afghanistan':'AF', 'Albania':'AL', 'Algeria':'DZ', 'Andorra':'AD', 'Angola':'AO',
  'Antigua and Barbuda':'AG', 'Argentina':'AR', 'Armenia':'AM', 'Australia':'AU', 'Austria':'AT',
  'Azerbaijan':'AZ', 'Bahamas':'BS', 'Bahrain':'BH', 'Bangladesh':'BD', 'Barbados':'BB',
  'Belarus':'BY', 'Belgium':'BE', 'Belize':'BZ', 'Benin':'BJ', 'Bhutan':'BT', 'Bolivia':'BO',
  'Bosnia and Herzegovina':'BA', 'Botswana':'BW', 'Brazil':'BR', 'Brunei':'BN', 'Bulgaria':'BG',
  'Burkina Faso':'BF', 'Burundi':'BI', 'Cabo Verde':'CV', 'Cambodia':'KH', 'Cameroon':'CM',
  'Canada':'CA', 'Central African Republic':'CF', 'Chad':'TD', 'Chile':'CL', 'China':'CN',
  'Colombia':'CO', 'Comoros':'KM', 'Congo (Democratic Republic of the)':'CD',
  'Congo (Republic of the)':'CG', 'Costa Rica':'CR', 'Croatia':'HR', 'Cuba':'CU', 'Cyprus':'CY',
  'Czechia':'CZ', 'Denmark':'DK', 'Djibouti':'DJ', 'Dominica':'DM', 'Dominican Republic':'DO',
  'Ecuador':'EC', 'Egypt':'EG', 'El Salvador':'SV', 'Equatorial Guinea':'GQ', 'Eritrea':'ER',
  'Estonia':'EE', 'Eswatini':'SZ', 'Ethiopia':'ET', 'Fiji':'FJ', 'Finland':'FI', 'France':'FR',
  'Gabon':'GA', 'Gambia':'GM', 'Georgia':'GE', 'Germany':'DE', 'Ghana':'GH', 'Greece':'GR',
  'Grenada':'GD', 'Guatemala':'GT', 'Guinea':'GN', 'Guinea-Bissau':'GW', 'Guyana':'GY',
  'Haiti':'HT', 'Holy See':'VA', 'Honduras':'HN', 'Hungary':'HU', 'Iceland':'IS', 'India':'IN',
  'Indonesia':'ID', 'Iran':'IR', 'Iraq':'IQ', 'Ireland':'IE', 'Italy':'IT', 'Jamaica':'JM',
  'Japan':'JP', 'Jordan':'JO', 'Kazakhstan':'KZ', 'Kenya':'KE', 'Kiribati':'KI', 'Kuwait':'KW',
  'Kyrgyzstan':'KG', 'Laos':'LA', 'Latvia':'LV', 'Lebanon':'LB', 'Lesotho':'LS', 'Liberia':'LR',
  'Libya':'LY', 'Liechtenstein':'LI', 'Lithuania':'LT', 'Luxembourg':'LU', 'Madagascar':'MG',
  'Malawi':'MW', 'Malaysia':'MY', 'Maldives':'MV', 'Mali':'ML', 'Malta':'MT',
  'Marshall Islands':'MH', 'Mauritania':'MR', 'Mauritius':'MU', 'Mexico':'MX', 'Micronesia':'FM',
  'Moldova':'MD', 'Monaco':'MC', 'Mongolia':'MN', 'Montenegro':'ME', 'Morocco':'MA',
  'Mozambique':'MZ', 'Myanmar':'MM', 'Namibia':'NA', 'Nauru':'NR', 'Nepal':'NP',
  'Netherlands':'NL', 'New Zealand':'NZ', 'Nicaragua':'NI', 'Niger':'NE', 'Nigeria':'NG',
  'North Korea':'KP', 'North Macedonia':'MK', 'Norway':'NO', 'Oman':'OM', 'Pakistan':'PK',
  'Palau':'PW', 'Palestine':'PS', 'Panama':'PA', 'Papua New Guinea':'PG', 'Paraguay':'PY',
  'Peru':'PE', 'Philippines':'PH', 'Poland':'PL', 'Portugal':'PT', 'Qatar':'QA', 'Romania':'RO',
  'Russia':'RU', 'Rwanda':'RW', 'Saint Kitts and Nevis':'KN', 'Saint Lucia':'LC',
  'Saint Vincent and the Grenadines':'VC', 'Samoa':'WS', 'San Marino':'SM',
  'Sao Tome and Principe':'ST', 'Saudi Arabia':'SA', 'Senegal':'SN', 'Serbia':'RS',
  'Seychelles':'SC', 'Sierra Leone':'SL', 'Singapore':'SG', 'Slovakia':'SK', 'Slovenia':'SI',
  'Solomon Islands':'SB', 'Somalia':'SO', 'South Africa':'ZA', 'South Korea':'KR',
  'South Sudan':'SS', 'Spain':'ES', 'Sri Lanka':'LK', 'Sudan':'SD', 'Suriname':'SR', 'Sweden':'SE',
  'Switzerland':'CH', 'Syria':'SY', 'Taiwan':'TW', 'Tajikistan':'TJ', 'Tanzania':'TZ',
  'Thailand':'TH', 'Timor-Leste':'TL', 'Togo':'TG', 'Tonga':'TO', 'Trinidad and Tobago':'TT',
  'Tunisia':'TN', 'Turkey':'TR', 'Turkmenistan':'TM', 'Tuvalu':'TV', 'Uganda':'UG', 'Ukraine':'UA',
  'United Arab Emirates':'AE', 'United Kingdom':'GB', 'United States':'US', 'Uruguay':'UY',
  'Uzbekistan':'UZ', 'Vanuatu':'VU', 'Venezuela':'VE', 'Vietnam':'VN', 'Yemen':'YE', 'Zambia':'ZM',
  'Zimbabwe':'ZW'
};

/**
 * Turns an ISO 3166-1 alpha-2 code (e.g. "TN") into its Unicode flag emoji
 * (e.g. "🇹🇳") by mapping each letter to a Regional Indicator Symbol.
 * Kept as a lightweight fallback; the app itself renders flags as the
 * hand-drawn SVGs in js/flags.js (getCountryFlagSVG), matching the
 * language-switcher style instead of emoji.
 */
function getFlagEmoji(iso){
  if (!iso || iso.length !== 2) return '';
  const base = 0x1F1E6; // Regional Indicator Symbol Letter A
  const chars = iso.toUpperCase().split('').map(c => base + (c.charCodeAt(0) - 65));
  if (chars.some(cp => cp < base || cp > base + 25)) return '';
  return String.fromCodePoint(...chars);
}

/**
 * Flag markup for a canonical COUNTRY_LIST entry: the hand-drawn SVG from
 * js/flags.js (same simplified-geometric style as the language switcher),
 * falling back to an emoji flag, and finally to a neutral placeholder.
 */
function getCountryFlag(englishName){
  if (typeof getCountryFlagSVG === 'function'){
    const svg = getCountryFlagSVG(englishName);
    if (svg) return svg;
  }
  const iso = COUNTRY_ISO[englishName];
  return iso ? getFlagEmoji(iso) : '🏳️';
}
