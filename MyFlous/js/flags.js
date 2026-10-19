/* =========================================================
   MY FLOUS — COUNTRY FLAGS
   Simplified geometric SVG flags for every country in
   COUNTRY_LIST (js/utils.js), drawn in the same style as the
   language-switcher flags in js/i18n.js: flat rects/shapes on
   a 30x20 viewBox, no photographic detail. Keyed by lowercase
   ISO 3166-1 alpha-2 code (see COUNTRY_ISO in js/utils.js).
   ========================================================= */

'use strict';

const COUNTRY_FLAGS = {
  // Afghanistan
  af: `<rect x="0.00" width="10.00" height="20" fill="#000000"/><rect x="10.00" width="10.00" height="20" fill="#D2232C"/><rect x="20.00" width="10.00" height="20" fill="#007A3D"/>`,
  // Albania
  al: `<rect width="30" height="20" fill="#E41E20"/><circle cx="15" cy="10" r="2.6" fill="#000000"/>`,
  // Algeria
  dz: `<rect x="0.00" width="15.00" height="20" fill="#006233"/><rect x="15.00" width="15.00" height="20" fill="#FFFFFF"/><circle cx="15" cy="10" r="3" fill="#D21034"/><circle cx="16.26" cy="10" r="2.46" fill="#FFFFFF"/><circle cx="19.95" cy="10" r="0.96" fill="#D21034"/>`,
  // Andorra
  ad: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2" fill="#C89B3C"/>`,
  // Angola
  ao: `<rect y="0.00" width="30" height="10.00" fill="#CC092F"/><rect y="10.00" width="30" height="10.00" fill="#000000"/><circle cx="15" cy="10" r="2.2" fill="#FCD116"/>`,
  // Antigua and Barbuda
  ag: `<rect y="0.00" width="30" height="4.00" fill="#000000"/><rect y="4.00" width="30" height="12.00" fill="#0072C6"/><rect y="16.00" width="30" height="4.00" fill="#FFFFFF"/><polygon points="0,20 15,20 15,4 0,14" fill="#CE1126"/><polygon points="30,20 15,20 15,4 30,14" fill="#CE1126"/><polygon points="8,13 15,4 22,13" fill="#FF6600"/>`,
  // Argentina
  ar: `<rect y="0.00" width="30" height="6.67" fill="#74ACDF"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#74ACDF"/><circle cx="15" cy="10" r="2" fill="#F6B40E"/>`,
  // Armenia
  am: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#FF8200"/>`,
  // Australia
  au: `<rect width="30" height="20" fill="#00247D"/><rect width="15" height="10" fill="#012169"/><line x1="0" y1="0" x2="15" y2="10" stroke="#fff" stroke-width="1"/><line x1="15" y1="0" x2="0" y2="10" stroke="#fff" stroke-width="1"/><circle cx="21" cy="15" r="2" fill="#FFFFFF"/><circle cx="24" cy="6" r="1.4" fill="#FFFFFF"/><circle cx="21" cy="10" r="1.2" fill="#FFFFFF"/><circle cx="26" cy="11" r="1.2" fill="#FFFFFF"/>`,
  // Austria
  at: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/>`,
  // Azerbaijan
  az: `<rect y="0.00" width="30" height="6.67" fill="#41B6E6"/><rect y="6.67" width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><circle cx="15" cy="10" r="2.6" fill="#FFFFFF"/><circle cx="16.09" cy="10" r="2.13" fill="#CE1126"/><circle cx="19.29" cy="10" r="0.83" fill="#FFFFFF"/>`,
  // Bahamas
  bs: `<rect y="0.00" width="30" height="6.67" fill="#00778B"/><rect y="6.67" width="30" height="6.67" fill="#FAE042"/><rect y="13.33" width="30" height="6.67" fill="#00778B"/><polygon points="0,0 0,20 11,10" fill="#000000"/>`,
  // Bahrain
  bh: `<rect x="0.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="10.00" width="20.00" height="20" fill="#D2232C"/>`,
  // Bangladesh
  bd: `<rect width="30" height="20" fill="#006233"/><circle cx="13" cy="10" r="4" fill="#F42A41"/>`,
  // Barbados
  bb: `<rect x="0.00" width="10.00" height="20" fill="#00247D"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#00247D"/><polygon points="15,5 13,15 17,15" fill="#000000"/>`,
  // Belarus
  by: `<rect y="0.00" width="30" height="13.33" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><rect x="0" width="2" height="20" fill="#FFFFFF"/>`,
  // Belgium
  be: `<rect x="0.00" width="10.00" height="20" fill="#000000"/><rect x="10.00" width="10.00" height="20" fill="#FAE042"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Belize
  bz: `<rect y="0.00" width="30" height="2.50" fill="#CE1126"/><rect y="2.50" width="30" height="15.00" fill="#0038A8"/><rect y="17.50" width="30" height="2.50" fill="#CE1126"/><circle cx="15" cy="10" r="3" fill="#FFFFFF"/>`,
  // Benin
  bj: `<rect width="12" height="20" fill="#006233"/><rect x="12" width="18" height="10" fill="#FCD116"/><rect x="12" y="10" width="18" height="10" fill="#CE1126"/>`,
  // Bhutan
  bt: `<rect width="30" height="20" fill="#FF4E12"/><polygon points="0,0 30,0 0,20" fill="#FFC726"/><polygon points="4,15 8,9 12,15" fill="#FFFFFF"/>`,
  // Bolivia
  bo: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FCD116"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/>`,
  // Bosnia and Herzegovina
  ba: `<rect width="30" height="20" fill="#0A3D91"/><polygon points="0,0 12,0 30,18 30,20 18,20 0,2" fill="#FCD116"/><circle cx="4.0" cy="3.0" r="0.6" fill="#FFFFFF"/><circle cx="6.6" cy="5.6" r="0.6" fill="#FFFFFF"/><circle cx="9.2" cy="8.2" r="0.6" fill="#FFFFFF"/><circle cx="11.8" cy="10.8" r="0.6" fill="#FFFFFF"/><circle cx="14.4" cy="13.4" r="0.6" fill="#FFFFFF"/><circle cx="17.0" cy="16.0" r="0.6" fill="#FFFFFF"/>`,
  // Botswana
  bw: `<rect y="0.00" width="30" height="7.69" fill="#41B6E6"/><rect y="7.69" width="30" height="1.15" fill="#FFFFFF"/><rect y="8.85" width="30" height="2.31" fill="#000000"/><rect y="11.15" width="30" height="1.15" fill="#FFFFFF"/><rect y="12.31" width="30" height="7.69" fill="#41B6E6"/>`,
  // Brazil
  br: `<rect width="30" height="20" fill="#009739"/><polygon points="15,3 28,10 15,17 2,10" fill="#FCD116"/><circle cx="15" cy="10" r="3" fill="#012169"/>`,
  // Brunei
  bn: `<rect width="30" height="20" fill="#FCD116"/><rect y="7" width="30" height="1.4" fill="#FFFFFF"/><rect y="8.4" width="30" height="1.4" fill="#000000"/><circle cx="15" cy="10" r="2.4" fill="#C8102E"/>`,
  // Bulgaria
  bg: `<rect y="0.00" width="30" height="6.67" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#00966E"/><rect y="13.33" width="30" height="6.67" fill="#D2232C"/>`,
  // Burkina Faso
  bf: `<rect y="0.00" width="30" height="10.00" fill="#CE1126"/><rect y="10.00" width="30" height="10.00" fill="#007A3D"/><circle cx="15" cy="10" r="2" fill="#FCD116"/>`,
  // Burundi
  bi: `<rect width="30" height="20" fill="#FFFFFF"/><polygon points="0,0 15,10 0,20" fill="#CE1126"/><polygon points="30,0 15,10 30,20" fill="#CE1126"/><polygon points="0,0 15,10 30,0" fill="#007A3D"/><polygon points="0,20 15,10 30,20" fill="#007A3D"/><circle cx="15" cy="10" r="2.2" fill="#FFFFFF"/><circle cx="14" cy="9.3" r="0.6" fill="#00A651"/><circle cx="16" cy="9.3" r="0.6" fill="#00A651"/><circle cx="15" cy="11" r="0.6" fill="#00A651"/>`,
  // Cabo Verde
  cv: `<rect y="0.00" width="30" height="9.23" fill="#0038A8"/><rect y="9.23" width="30" height="1.85" fill="#FFFFFF"/><rect y="11.08" width="30" height="0.92" fill="#CE1126"/><rect y="12.00" width="30" height="1.85" fill="#FFFFFF"/><rect y="13.85" width="30" height="6.15" fill="#0038A8"/><circle cx="9.0" cy="11" r="0.5" fill="#FCD116"/><circle cx="10.6" cy="11" r="0.5" fill="#FCD116"/><circle cx="12.2" cy="11" r="0.5" fill="#FCD116"/><circle cx="13.8" cy="11" r="0.5" fill="#FCD116"/><circle cx="15.4" cy="11" r="0.5" fill="#FCD116"/><circle cx="17.0" cy="11" r="0.5" fill="#FCD116"/><circle cx="18.6" cy="11" r="0.5" fill="#FCD116"/><circle cx="20.200000000000003" cy="11" r="0.5" fill="#FCD116"/><circle cx="21.8" cy="11" r="0.5" fill="#FCD116"/><circle cx="23.4" cy="11" r="0.5" fill="#FCD116"/>`,
  // Cambodia
  kh: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="10.00" fill="#0038A8"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/><rect x="12" y="6" width="6" height="8" fill="#FFFFFF"/>`,
  // Cameroon
  cm: `<rect x="0.00" width="10.00" height="20" fill="#006233"/><rect x="10.00" width="10.00" height="20" fill="#CE1126"/><rect x="20.00" width="10.00" height="20" fill="#FCD116"/><circle cx="15" cy="10" r="1" fill="#FCD116"/>`,
  // Canada
  ca: `<rect x="0.00" width="7.50" height="20" fill="#CE1126"/><rect x="7.50" width="15.00" height="20" fill="#FFFFFF"/><rect x="22.50" width="7.50" height="20" fill="#CE1126"/><polygon points="15,7 17.2,10 15,13 12.8,10" fill="#CE1126"/>`,
  // Central African Republic
  cf: `<rect y="0.00" width="30" height="4.00" fill="#0038A8"/><rect y="4.00" width="30" height="4.00" fill="#FFFFFF"/><rect y="8.00" width="30" height="4.00" fill="#007A3D"/><rect y="12.00" width="30" height="4.00" fill="#FCD116"/><rect y="16.00" width="30" height="4.00" fill="#CE1126"/><rect x="14" width="2" height="20" fill="#CE1126"/><circle cx="4" cy="3" r="0.8" fill="#FCD116"/>`,
  // Chad
  td: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Chile
  cl: `<rect width="12" height="10" fill="#0038A8"/><rect y="10" width="30" height="10" fill="#CE1126"/><rect x="12" width="18" height="10" fill="#FFFFFF"/><circle cx="6" cy="5" r="1.6" fill="#FFFFFF"/>`,
  // China
  cn: `<rect width="30" height="20" fill="#D2232C"/><circle cx="6" cy="5" r="1.8" fill="#FCD116"/><circle cx="11" cy="2.6" r="0.7" fill="#FCD116"/><circle cx="12.6" cy="4.8" r="0.7" fill="#FCD116"/><circle cx="12" cy="7.4" r="0.7" fill="#FCD116"/><circle cx="10" cy="9" r="0.7" fill="#FCD116"/>`,
  // Colombia
  co: `<rect y="0.00" width="30" height="10.00" fill="#FCD116"/><rect y="10.00" width="30" height="5.00" fill="#0038A8"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/>`,
  // Comoros
  km: `<rect y="0.00" width="30" height="5.00" fill="#FFC61E"/><rect y="5.00" width="30" height="5.00" fill="#FFFFFF"/><rect y="10.00" width="30" height="5.00" fill="#CE1126"/><rect y="15.00" width="30" height="5.00" fill="#3A75C4"/><polygon points="0,0 10,0 0,20 0,20" fill="#007A3D"/><polygon points="0,0 0,20 10,20" fill="#007A3D"/><circle cx="4.5" cy="10" r="2.4" fill="#FFFFFF"/><circle cx="5.51" cy="10" r="1.97" fill="#007A3D"/><circle cx="8.46" cy="10" r="0.77" fill="#FFFFFF"/>`,
  // Congo (Democratic Republic of the)
  cd: `<rect width="30" height="20" fill="#007FFF"/><polygon points="0,20 0,14 30,0 30,6" fill="#F7D618"/><polygon points="0,20 0,15 30,1 30,5" fill="#D2232C"/><circle cx="7" cy="5" r="1.6" fill="#FCD116"/>`,
  // Congo (Republic of the)
  cg: `<rect width="30" height="20" fill="#FCD116"/><polygon points="0,0 21,0 0,20" fill="#006233"/><polygon points="30,0 30,20 9,20" fill="#D2232C"/>`,
  // Costa Rica
  cr: `<rect y="0.00" width="30" height="3.33" fill="#0038A8"/><rect y="3.33" width="30" height="3.33" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="3.33" fill="#FFFFFF"/><rect y="16.67" width="30" height="3.33" fill="#0038A8"/>`,
  // Croatia
  hr: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#0038A8"/><rect x="12" y="6" width="6" height="8" fill="#FFFFFF" stroke="#CE1126" stroke-width="0.4"/>`,
  // Cuba
  cu: `<rect y="0.00" width="30" height="4.00" fill="#0038A8"/><rect y="4.00" width="30" height="4.00" fill="#FFFFFF"/><rect y="8.00" width="30" height="4.00" fill="#0038A8"/><rect y="12.00" width="30" height="4.00" fill="#FFFFFF"/><rect y="16.00" width="30" height="4.00" fill="#0038A8"/><polygon points="0,0 0,20 13,10" fill="#D2232C"/><circle cx="5" cy="10" r="1.6" fill="#FFFFFF"/>`,
  // Cyprus
  cy: `<rect width="30" height="20" fill="#FFFFFF"/><path d="M10,13 Q15,7 20,13 Q15,15 10,13Z" fill="#D57800"/>`,
  // Czechia
  cz: `<rect y="0.00" width="30" height="10.00" fill="#FFFFFF"/><rect y="10.00" width="30" height="10.00" fill="#D2232C"/><polygon points="0,0 0,20 13,10" fill="#0038A8"/>`,
  // Denmark
  dk: `<rect width="30" height="20" fill="#CE1126"/><rect x="11" width="3" height="20" fill="#FFFFFF"/><rect y="8.50" width="30" height="3" fill="#FFFFFF"/>`,
  // Djibouti
  dj: `<rect y="0.00" width="30" height="10.00" fill="#6AB2E7"/><rect y="10.00" width="30" height="10.00" fill="#12AD2B"/><polygon points="0,0 0,20 13,10" fill="#FFFFFF"/><circle cx="6" cy="10" r="1.6" fill="#D7141A"/>`,
  // Dominica
  dm: `<rect width="30" height="20" fill="#007A3D"/><circle cx="15" cy="10" r="4" fill="#FCD116"/><circle cx="15" cy="10" r="2.6" fill="#7B3F00"/><circle cx="13" cy="8" r="0.6" fill="#FFFFFF"/>`,
  // Dominican Republic
  do: `<rect width="30" height="20" fill="#0038A8"/><rect width="30" height="20" fill="#CE1126" opacity="0"/><rect y="0" width="14" height="8.5" fill="#0038A8"/><rect x="16" width="14" height="8.5" fill="#CE1126"/><rect y="11.5" width="14" height="8.5" fill="#CE1126"/><rect x="16" y="11.5" width="14" height="8.5" fill="#0038A8"/><rect x="13" width="4" height="20" fill="#FFFFFF"/><rect y="8.5" width="30" height="3" fill="#FFFFFF"/>`,
  // Ecuador
  ec: `<rect y="0.00" width="30" height="10.00" fill="#FCD116"/><rect y="10.00" width="30" height="5.00" fill="#0038A8"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/><circle cx="15" cy="10" r="2" fill="#8B5E3C"/>`,
  // Egypt
  eg: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#000000"/><circle cx="15" cy="10" r="1.8" fill="#C09300"/>`,
  // El Salvador
  sv: `<rect y="0.00" width="30" height="6.67" fill="#0038A8"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#0038A8"/><circle cx="15" cy="10" r="1.8" fill="#0047AB"/>`,
  // Equatorial Guinea
  gq: `<rect y="0.00" width="30" height="6.67" fill="#3E9A00"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#E32118"/><polygon points="0,0 0,20 9,10" fill="#0073CF"/><circle cx="15" cy="10" r="2" fill="#C8A951"/>`,
  // Eritrea
  er: `<polygon points="0,0 30,0 0,20" fill="#4189DD"/><polygon points="30,0 30,20 0,20" fill="#12AD2B"/><polygon points="0,0 30,0 0,20" fill="#D21034" opacity="0"/><circle cx="15" cy="10" r="2" fill="#FCD116"/>`,
  // Estonia
  ee: `<rect y="0.00" width="30" height="6.67" fill="#0038A8"/><rect y="6.67" width="30" height="6.67" fill="#000000"/><rect y="13.33" width="30" height="6.67" fill="#FFFFFF"/>`,
  // Eswatini
  sz: `<rect y="0.00" width="30" height="5.00" fill="#0038A8"/><rect y="5.00" width="30" height="1.25" fill="#FCD116"/><rect y="6.25" width="30" height="7.50" fill="#CE1126"/><rect y="13.75" width="30" height="1.25" fill="#FCD116"/><rect y="15.00" width="30" height="5.00" fill="#0038A8"/><circle cx="15" cy="10" r="2.4" fill="#3D3D3D"/>`,
  // Ethiopia
  et: `<rect y="0.00" width="30" height="6.67" fill="#006233"/><rect y="6.67" width="30" height="6.67" fill="#FCD116"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><circle cx="15" cy="10" r="2.2" fill="#0F47AF"/>`,
  // Fiji
  fj: `<rect width="30" height="20" fill="#41B6E6"/><rect width="13" height="10" fill="#012169"/>`,
  // Finland
  fi: `<rect width="30" height="20" fill="#FFFFFF"/><rect x="11" width="3" height="20" fill="#0038A8"/><rect y="8.50" width="30" height="3" fill="#0038A8"/>`,
  // France
  fr: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Gabon
  ga: `<rect y="0.00" width="30" height="6.67" fill="#007A3D"/><rect y="6.67" width="30" height="6.67" fill="#FCD116"/><rect y="13.33" width="30" height="6.67" fill="#0038A8"/>`,
  // Gambia
  gm: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/>`,
  // Georgia
  ge: `<rect width="30" height="20" fill="#FFFFFF"/><rect x="12" width="6" height="20" fill="#CE1126"/><rect y="7" width="30" height="6" fill="#CE1126"/><g transform="translate(2,2)"><rect width="2" height="2" fill="none" stroke="#CE1126" stroke-width="0.5"/></g><g transform="translate(26,2)"><rect width="2" height="2" fill="none" stroke="#CE1126" stroke-width="0.5"/></g><g transform="translate(2,16)"><rect width="2" height="2" fill="none" stroke="#CE1126" stroke-width="0.5"/></g><g transform="translate(26,16)"><rect width="2" height="2" fill="none" stroke="#CE1126" stroke-width="0.5"/></g>`,
  // Germany
  de: `<rect y="0.00" width="30" height="6.67" fill="#000000"/><rect y="6.67" width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#FCD116"/>`,
  // Ghana
  gh: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FCD116"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><circle cx="15" cy="10" r="1.4" fill="#000000"/>`,
  // Greece
  gr: `<rect y="0.00" width="30" height="2.22" fill="#0038A8"/><rect y="2.22" width="30" height="2.22" fill="#FFFFFF"/><rect y="4.44" width="30" height="2.22" fill="#0038A8"/><rect y="6.67" width="30" height="2.22" fill="#FFFFFF"/><rect y="8.89" width="30" height="2.22" fill="#0038A8"/><rect y="11.11" width="30" height="2.22" fill="#FFFFFF"/><rect y="13.33" width="30" height="2.22" fill="#0038A8"/><rect y="15.56" width="30" height="2.22" fill="#FFFFFF"/><rect y="17.78" width="30" height="2.22" fill="#0038A8"/><rect width="10" height="9" fill="#0038A8"/><rect x="3.6" width="2.6" height="9" fill="#FFFFFF"/><rect y="3.6" width="10" height="2.6" fill="#FFFFFF"/>`,
  // Grenada
  gd: `<rect width="30" height="20" fill="#CE1126"/><polygon points="0,0 30,0 15,10" fill="#FCD116"/><polygon points="0,20 30,20 15,10" fill="#FCD116"/><polygon points="0,0 0,20 15,10" fill="#006233"/><polygon points="30,0 30,20 15,10" fill="#006233"/><circle cx="15" cy="10" r="2" fill="#CE1126"/>`,
  // Guatemala
  gt: `<rect x="0.00" width="10.00" height="20" fill="#418FDE"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#418FDE"/>`,
  // Guinea
  gn: `<rect x="0.00" width="10.00" height="20" fill="#CE1126"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#007A3D"/>`,
  // Guinea-Bissau
  gw: `<rect width="10" height="20" fill="#CE1126"/><rect x="10" width="20" height="10" fill="#FCD116"/><rect x="10" y="10" width="20" height="10" fill="#006233"/><circle cx="5" cy="10" r="1.6" fill="#000000"/>`,
  // Guyana
  gy: `<rect width="30" height="20" fill="#009E49"/><polygon points="0,0 0,20 20,10" fill="#FCD116"/><polygon points="0,0 0,20 12,10" fill="#000000"/><polygon points="0,3 0,17 16,10" fill="#FCD116"/><polygon points="0,5 0,15 10,10" fill="#CE1126"/>`,
  // Haiti
  ht: `<rect y="0.00" width="30" height="10.00" fill="#0038A8"/><rect y="10.00" width="30" height="10.00" fill="#CE1126"/><circle cx="15" cy="10" r="2.6" fill="#FFFFFF"/>`,
  // Holy See
  va: `<rect x="0.00" width="15.00" height="20" fill="#FCD116"/><rect x="15.00" width="15.00" height="20" fill="#FFFFFF"/><circle cx="22" cy="10" r="2" fill="#C89B3C"/>`,
  // Honduras
  hn: `<rect y="0.00" width="30" height="6.67" fill="#418FDE"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#418FDE"/><circle cx="12" cy="9" r="0.6" fill="#418FDE"/><circle cx="15" cy="8" r="0.6" fill="#418FDE"/><circle cx="18" cy="9" r="0.6" fill="#418FDE"/><circle cx="13" cy="11.5" r="0.6" fill="#418FDE"/><circle cx="17" cy="11.5" r="0.6" fill="#418FDE"/>`,
  // Hungary
  hu: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/>`,
  // Iceland
  is: `<rect width="30" height="20" fill="#0038A8"/><rect x="10" width="4.5" height="20" fill="#FFFFFF"/><rect y="8" width="30" height="4.5" fill="#FFFFFF"/><rect x="11.3" width="2" height="20" fill="#CE1126"/><rect y="9.2" width="30" height="2" fill="#CE1126"/>`,
  // India
  in: `<rect y="0.00" width="30" height="6.67" fill="#FF8200"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><circle cx="15" cy="10" r="1.6" fill="#000080"/>`,
  // Indonesia
  id: `<rect y="0.00" width="30" height="10.00" fill="#CE1126"/><rect y="10.00" width="30" height="10.00" fill="#FFFFFF"/>`,
  // Iran
  ir: `<rect y="0.00" width="30" height="6.67" fill="#006233"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#D2232C"/><circle cx="15" cy="10" r="1.8" fill="#DA0000"/>`,
  // Iraq
  iq: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#000000"/><text x="15" y="11.5" font-size="3" fill="#006233" text-anchor="middle"></text><circle cx="15" cy="10" r="1" fill="#006233"/>`,
  // Ireland
  ie: `<rect x="0.00" width="10.00" height="20" fill="#007A3D"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#FF8200"/>`,
  // Italy
  it: `<rect x="0.00" width="10.00" height="20" fill="#007A3D"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Jamaica
  jm: `<rect width="30" height="20" fill="#FCD116"/><polygon points="0,0 15,10 0,20" fill="#000000"/><polygon points="30,0 15,10 30,20" fill="#000000"/><polygon points="0,0 15,10 30,0" fill="#006233"/><polygon points="0,20 15,10 30,20" fill="#006233"/>`,
  // Japan
  jp: `<rect width="30" height="20" fill="#FFFFFF"/><circle cx="15" cy="10" r="4" fill="#D2232C"/>`,
  // Jordan
  jo: `<rect y="0.00" width="30" height="6.67" fill="#000000"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#00732F"/><polygon points="0,0 0,20 13,10" fill="#CE1126"/><circle cx="5" cy="10" r="1.2" fill="#FFFFFF"/>`,
  // Kazakhstan
  kz: `<rect width="30" height="20" fill="#418FDE"/><rect width="30" height="20" fill="#418FDE"/><line x1="17.60" y1="8.00" x2="19.20" y2="8.00" stroke="#FCD116" stroke-width="1"/><line x1="17.25" y1="9.30" x2="18.64" y2="10.10" stroke="#FCD116" stroke-width="1"/><line x1="16.30" y1="10.25" x2="17.10" y2="11.64" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="10.60" x2="15.00" y2="12.20" stroke="#FCD116" stroke-width="1"/><line x1="13.70" y1="10.25" x2="12.90" y2="11.64" stroke="#FCD116" stroke-width="1"/><line x1="12.75" y1="9.30" x2="11.36" y2="10.10" stroke="#FCD116" stroke-width="1"/><line x1="12.40" y1="8.00" x2="10.80" y2="8.00" stroke="#FCD116" stroke-width="1"/><line x1="12.75" y1="6.70" x2="11.36" y2="5.90" stroke="#FCD116" stroke-width="1"/><line x1="13.70" y1="5.75" x2="12.90" y2="4.36" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="5.40" x2="15.00" y2="3.80" stroke="#FCD116" stroke-width="1"/><line x1="16.30" y1="5.75" x2="17.10" y2="4.36" stroke="#FCD116" stroke-width="1"/><line x1="17.25" y1="6.70" x2="18.64" y2="5.90" stroke="#FCD116" stroke-width="1"/><circle cx="15" cy="8" r="2.6" fill="#FCD116"/>`,
  // Kenya
  ke: `<rect y="0.00" width="30" height="6.06" fill="#000000"/><rect y="6.06" width="30" height="0.91" fill="#FFFFFF"/><rect y="6.97" width="30" height="6.06" fill="#CE1126"/><rect y="13.03" width="30" height="0.91" fill="#FFFFFF"/><rect y="13.94" width="30" height="6.06" fill="#007A3D"/><polygon points="10,10 12,7 18,7 20,10 18,13 12,13" fill="#FFFFFF" stroke="#000" stroke-width="0.3"/>`,
  // Kiribati
  ki: `<rect y="0.00" width="30" height="7.69" fill="#CE1126"/><rect y="7.69" width="30" height="12.31" fill="#0038A8"/><rect width="30" height="20" fill="#CE1126"/><line x1="16.60" y1="8.00" x2="17.60" y2="8.00" stroke="#FCD116" stroke-width="1"/><line x1="16.13" y1="9.13" x2="16.84" y2="9.84" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="9.60" x2="15.00" y2="10.60" stroke="#FCD116" stroke-width="1"/><line x1="13.87" y1="9.13" x2="13.16" y2="9.84" stroke="#FCD116" stroke-width="1"/><line x1="13.40" y1="8.00" x2="12.40" y2="8.00" stroke="#FCD116" stroke-width="1"/><line x1="13.87" y1="6.87" x2="13.16" y2="6.16" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="6.40" x2="15.00" y2="5.40" stroke="#FCD116" stroke-width="1"/><line x1="16.13" y1="6.87" x2="16.84" y2="6.16" stroke="#FCD116" stroke-width="1"/><circle cx="15" cy="8" r="1.6" fill="#FCD116"/>`,
  // Kuwait
  kw: `<rect y="0.00" width="30" height="6.67" fill="#007A3D"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><polygon points="0,0 0,20 8,13.3 8,6.7" fill="#000000"/>`,
  // Kyrgyzstan
  kg: `<rect width="30" height="20" fill="#CE1126"/><rect width="30" height="20" fill="#CE1126"/><line x1="18.00" y1="10.00" x2="19.20" y2="10.00" stroke="#FCD116" stroke-width="1"/><line x1="17.12" y1="12.12" x2="17.97" y2="12.97" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="13.00" x2="15.00" y2="14.20" stroke="#FCD116" stroke-width="1"/><line x1="12.88" y1="12.12" x2="12.03" y2="12.97" stroke="#FCD116" stroke-width="1"/><line x1="12.00" y1="10.00" x2="10.80" y2="10.00" stroke="#FCD116" stroke-width="1"/><line x1="12.88" y1="7.88" x2="12.03" y2="7.03" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="7.00" x2="15.00" y2="5.80" stroke="#FCD116" stroke-width="1"/><line x1="17.12" y1="7.88" x2="17.97" y2="7.03" stroke="#FCD116" stroke-width="1"/><circle cx="15" cy="10" r="3" fill="#FCD116"/>`,
  // Laos
  la: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="10.00" fill="#0038A8"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/><circle cx="15" cy="10" r="2.6" fill="#FFFFFF"/>`,
  // Latvia
  lv: `<rect y="0.00" width="30" height="9.09" fill="#A2192A"/><rect y="9.09" width="30" height="1.82" fill="#FFFFFF"/><rect y="10.91" width="30" height="9.09" fill="#A2192A"/>`,
  // Lebanon
  lb: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="10.00" fill="#FFFFFF"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/><polygon points="15,7 13,13 17,13" fill="#006233"/><rect x="13.6" y="9" width="2.8" height="4" fill="#006233"/>`,
  // Lesotho
  ls: `<rect y="0.00" width="30" height="5.00" fill="#0038A8"/><rect y="5.00" width="30" height="10.00" fill="#FFFFFF"/><rect y="15.00" width="30" height="5.00" fill="#007A3D"/><path d="M13,13 L15,7 L17,13 Z" fill="#000000"/>`,
  // Liberia
  lr: `<rect y="0.00" width="30" height="2.86" fill="#CE1126"/><rect y="2.86" width="30" height="2.86" fill="#FFFFFF"/><rect y="5.71" width="30" height="2.86" fill="#CE1126"/><rect y="8.57" width="30" height="2.86" fill="#FFFFFF"/><rect y="11.43" width="30" height="2.86" fill="#CE1126"/><rect y="14.29" width="30" height="2.86" fill="#FFFFFF"/><rect y="17.14" width="30" height="2.86" fill="#CE1126"/><rect width="13" height="10" fill="#0038A8"/><circle cx="6.5" cy="5" r="1.6" fill="#FFFFFF"/>`,
  // Libya
  ly: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="10.00" fill="#000000"/><rect y="15.00" width="30" height="5.00" fill="#007A3D"/><circle cx="15" cy="10" r="2" fill="#FFFFFF"/><circle cx="15.84" cy="10" r="1.64" fill="#000000"/><circle cx="18.30" cy="10" r="0.64" fill="#FFFFFF"/>`,
  // Liechtenstein
  li: `<rect y="0.00" width="30" height="10.00" fill="#0038A8"/><rect y="10.00" width="30" height="10.00" fill="#CE1126"/><rect x="3" y="2" width="4" height="3" fill="#FCD116"/>`,
  // Lithuania
  lt: `<rect y="0.00" width="30" height="6.67" fill="#FCD116"/><rect y="6.67" width="30" height="6.67" fill="#007A3D"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/>`,
  // Luxembourg
  lu: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#41B6E6"/>`,
  // Madagascar
  mg: `<rect width="10" height="20" fill="#FFFFFF"/><rect x="10" width="20" height="10" fill="#CE1126"/><rect x="10" y="10" width="20" height="10" fill="#006233"/>`,
  // Malawi
  mw: `<rect y="0.00" width="30" height="6.67" fill="#000000"/><rect y="6.67" width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><rect width="30" height="20" fill="#000000"/><line x1="17.00" y1="3.30" x2="18.40" y2="3.30" stroke="#CE1126" stroke-width="1"/><line x1="16.62" y1="4.48" x2="17.75" y2="5.30" stroke="#CE1126" stroke-width="1"/><line x1="15.62" y1="5.20" x2="16.05" y2="6.53" stroke="#CE1126" stroke-width="1"/><line x1="14.38" y1="5.20" x2="13.95" y2="6.53" stroke="#CE1126" stroke-width="1"/><line x1="13.38" y1="4.48" x2="12.25" y2="5.30" stroke="#CE1126" stroke-width="1"/><line x1="13.00" y1="3.30" x2="11.60" y2="3.30" stroke="#CE1126" stroke-width="1"/><line x1="13.38" y1="2.12" x2="12.25" y2="1.30" stroke="#CE1126" stroke-width="1"/><line x1="14.38" y1="1.40" x2="13.95" y2="0.07" stroke="#CE1126" stroke-width="1"/><line x1="15.62" y1="1.40" x2="16.05" y2="0.07" stroke="#CE1126" stroke-width="1"/><line x1="16.62" y1="2.12" x2="17.75" y2="1.30" stroke="#CE1126" stroke-width="1"/><circle cx="15" cy="3.3" r="2" fill="#CE1126"/>`,
  // Malaysia
  my: `<rect y="0.00" width="30" height="1.43" fill="#CE1126"/><rect y="1.43" width="30" height="1.43" fill="#CE1126"/><rect y="2.86" width="30" height="1.43" fill="#CE1126"/><rect y="4.29" width="30" height="1.43" fill="#CE1126"/><rect y="5.71" width="30" height="1.43" fill="#CE1126"/><rect y="7.14" width="30" height="1.43" fill="#CE1126"/><rect y="8.57" width="30" height="1.43" fill="#CE1126"/><rect y="10.00" width="30" height="1.43" fill="#FFFFFF"/><rect y="11.43" width="30" height="1.43" fill="#FFFFFF"/><rect y="12.86" width="30" height="1.43" fill="#FFFFFF"/><rect y="14.29" width="30" height="1.43" fill="#FFFFFF"/><rect y="15.71" width="30" height="1.43" fill="#FFFFFF"/><rect y="17.14" width="30" height="1.43" fill="#FFFFFF"/><rect y="18.57" width="30" height="1.43" fill="#FFFFFF"/><rect width="15" height="10" fill="#0038A8"/><circle cx="6" cy="5" r="1.8" fill="#FCD116"/><circle cx="6.76" cy="5" r="1.48" fill="#0038A8"/><circle cx="8.97" cy="5" r="0.58" fill="#FCD116"/>`,
  // Maldives
  mv: `<rect width="30" height="20" fill="#CE1126"/><rect x="3" y="2.5" width="24" height="15" fill="#006233"/><circle cx="15" cy="10" r="2.6" fill="#FFFFFF"/><circle cx="16.09" cy="10" r="2.13" fill="#006233"/>`,
  // Mali
  ml: `<rect x="0.00" width="10.00" height="20" fill="#006233"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Malta
  mt: `<rect x="0.00" width="15.00" height="20" fill="#FFFFFF"/><rect x="15.00" width="15.00" height="20" fill="#CE1126"/><rect x="0.6" y="0.6" width="4" height="4" fill="#8C8C8C"/>`,
  // Marshall Islands
  mh: `<rect width="30" height="20" fill="#0038A8"/><polygon points="0,20 30,0 30,4 0,20" fill="#FF8200"/><polygon points="0,20 30,3 30,5.5 0,20" fill="#FFFFFF"/><circle cx="6" cy="4" r="1.6" fill="#FFFFFF"/>`,
  // Mauritania
  mr: `<rect width="30" height="20" fill="#006233"/><circle cx="15" cy="9" r="2.4" fill="#FCD116"/><circle cx="16.01" cy="9" r="1.97" fill="#006233"/><circle cx="18.96" cy="9" r="0.77" fill="#FCD116"/><rect y="0" width="30" height="1.6" fill="#CE1126"/><rect y="18.4" width="30" height="1.6" fill="#CE1126"/>`,
  // Mauritius
  mu: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="5.00" fill="#0038A8"/><rect y="10.00" width="30" height="5.00" fill="#FCD116"/><rect y="15.00" width="30" height="5.00" fill="#007A3D"/>`,
  // Mexico
  mx: `<rect x="0.00" width="10.00" height="20" fill="#006233"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2.4" fill="#8B5E3C"/>`,
  // Micronesia
  fm: `<rect width="30" height="20" fill="#418FDE"/><circle cx="11" cy="7" r="0.8" fill="#FFFFFF"/><circle cx="19" cy="7" r="0.8" fill="#FFFFFF"/><circle cx="11" cy="13" r="0.8" fill="#FFFFFF"/><circle cx="19" cy="13" r="0.8" fill="#FFFFFF"/>`,
  // Moldova
  md: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="1.6" fill="#A0522D"/>`,
  // Monaco
  mc: `<rect y="0.00" width="30" height="10.00" fill="#CE1126"/><rect y="10.00" width="30" height="10.00" fill="#FFFFFF"/>`,
  // Mongolia
  mn: `<rect x="0.00" width="10.00" height="20" fill="#CE1126"/><rect x="10.00" width="10.00" height="20" fill="#0038A8"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/><circle cx="5" cy="10" r="1.6" fill="#FCD116"/>`,
  // Montenegro
  me: `<rect width="30" height="20" fill="#D4AF37"/><rect x="1.4" y="1.4" width="27.20" height="17.20" fill="#C40308"/><circle cx="15" cy="10" r="2.4" fill="#FCD116"/>`,
  // Morocco
  ma: `<rect width="30" height="20" fill="#CE1126"/><polygon points="15,7 16,9.4 18.5,9.4 16.5,11 17.3,13.4 15,11.9 12.7,13.4 13.5,11 11.5,9.4 14,9.4" fill="none" stroke="#006233" stroke-width="0.6"/>`,
  // Mozambique
  mz: `<rect y="0.00" width="30" height="6.25" fill="#006233"/><rect y="6.25" width="30" height="0.62" fill="#FFFFFF"/><rect y="6.88" width="30" height="6.25" fill="#000000"/><rect y="13.12" width="30" height="0.62" fill="#FFFFFF"/><rect y="13.75" width="30" height="6.25" fill="#CE1126"/><polygon points="0,0 0,20 12,10" fill="#CE1126"/><circle cx="6" cy="10" r="1.6" fill="#FCD116"/>`,
  // Myanmar
  mm: `<rect y="0.00" width="30" height="6.67" fill="#FCD116"/><rect y="6.67" width="30" height="6.67" fill="#007A3D"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><circle cx="15" cy="10" r="1.8" fill="#FFFFFF"/>`,
  // Namibia
  na: `<polygon points="0,0 30,20 0,20" fill="#006233"/><polygon points="0,0 30,0 30,20" fill="#003580"/><polygon points="0,0 30,20" fill="none" stroke="#CE1126" stroke-width="1.4"/><rect width="30" height="20" fill="#003580"/><line x1="10.00" y1="6.00" x2="11.00" y2="6.00" stroke="#FCD116" stroke-width="1"/><line x1="9.41" y1="7.41" x2="10.12" y2="8.12" stroke="#FCD116" stroke-width="1"/><line x1="8.00" y1="8.00" x2="8.00" y2="9.00" stroke="#FCD116" stroke-width="1"/><line x1="6.59" y1="7.41" x2="5.88" y2="8.12" stroke="#FCD116" stroke-width="1"/><line x1="6.00" y1="6.00" x2="5.00" y2="6.00" stroke="#FCD116" stroke-width="1"/><line x1="6.59" y1="4.59" x2="5.88" y2="3.88" stroke="#FCD116" stroke-width="1"/><line x1="8.00" y1="4.00" x2="8.00" y2="3.00" stroke="#FCD116" stroke-width="1"/><line x1="9.41" y1="4.59" x2="10.12" y2="3.88" stroke="#FCD116" stroke-width="1"/><circle cx="8" cy="6" r="2" fill="#FCD116"/>`,
  // Nauru
  nr: `<rect width="30" height="20" fill="#002B7F"/><rect y="9.4" width="30" height="1.2" fill="#FCD116"/><circle cx="7" cy="15" r="1.4" fill="#FFFFFF"/>`,
  // Nepal
  np: `<rect width="30" height="20" fill="#DC143C"/><polygon points="2,2 2,18 18,10" fill="none" stroke="#003893" stroke-width="1"/><circle cx="8" cy="7" r="1.2" fill="#FFFFFF"/>`,
  // Netherlands
  nl: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#0038A8"/>`,
  // New Zealand
  nz: `<rect width="30" height="20" fill="#00247D"/><rect width="13" height="10" fill="#012169"/><circle cx="20" cy="5" r="0.7" fill="#CC142B"/><circle cx="24" cy="8" r="0.7" fill="#CC142B"/><circle cx="21" cy="13" r="0.7" fill="#CC142B"/><circle cx="26" cy="14" r="0.7" fill="#CC142B"/>`,
  // Nicaragua
  ni: `<rect y="0.00" width="30" height="6.67" fill="#0038A8"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#0038A8"/><circle cx="15" cy="10" r="1.8" fill="#0067C6"/>`,
  // Niger
  ne: `<rect y="0.00" width="30" height="6.67" fill="#FF8200"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#007A3D"/><circle cx="15" cy="10" r="1.6" fill="#FF8200"/>`,
  // Nigeria
  ng: `<rect x="0.00" width="10.00" height="20" fill="#006233"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#006233"/>`,
  // North Korea
  kp: `<rect y="0.00" width="30" height="3.57" fill="#0038A8"/><rect y="3.57" width="30" height="1.07" fill="#FFFFFF"/><rect y="4.64" width="30" height="10.71" fill="#CE1126"/><rect y="15.36" width="30" height="1.07" fill="#FFFFFF"/><rect y="16.43" width="30" height="3.57" fill="#0038A8"/><circle cx="8" cy="10" r="2" fill="#FFFFFF"/><circle cx="8" cy="10" r="1.2" fill="#ED1C27"/>`,
  // North Macedonia
  mk: `<rect width="30" height="20" fill="#CE1126"/><line x1="17.40" y1="10.00" x2="22.40" y2="10.00" stroke="#FCD116" stroke-width="1"/><line x1="16.70" y1="11.70" x2="20.23" y2="15.23" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="12.40" x2="15.00" y2="17.40" stroke="#FCD116" stroke-width="1"/><line x1="13.30" y1="11.70" x2="9.77" y2="15.23" stroke="#FCD116" stroke-width="1"/><line x1="12.60" y1="10.00" x2="7.60" y2="10.00" stroke="#FCD116" stroke-width="1"/><line x1="13.30" y1="8.30" x2="9.77" y2="4.77" stroke="#FCD116" stroke-width="1"/><line x1="15.00" y1="7.60" x2="15.00" y2="2.60" stroke="#FCD116" stroke-width="1"/><line x1="16.70" y1="8.30" x2="20.23" y2="4.77" stroke="#FCD116" stroke-width="1"/><circle cx="15" cy="10" r="2.4" fill="#FCD116"/>`,
  // Norway
  no: `<rect width="30" height="20" fill="#CE1126"/><rect x="10" width="4.4" height="20" fill="#FFFFFF"/><rect y="7.8" width="30" height="4.4" fill="#FFFFFF"/><rect x="11.2" width="2" height="20" fill="#0038A8"/><rect y="9" width="30" height="2" fill="#0038A8"/>`,
  // Oman
  om: `<rect y="0.00" width="30" height="6.67" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#006233"/><rect width="8" height="20" fill="#CE1126"/>`,
  // Pakistan
  pk: `<rect width="8" height="20" fill="#FFFFFF"/><rect x="8" width="22" height="20" fill="#006233"/><circle cx="20" cy="10" r="2.6" fill="#FFFFFF"/><circle cx="21.09" cy="10" r="2.13" fill="#006233"/><circle cx="24.29" cy="10" r="0.83" fill="#FFFFFF"/>`,
  // Palau
  pw: `<rect width="30" height="20" fill="#41B6E6"/><circle cx="12" cy="10" r="4.6" fill="#FCD116"/>`,
  // Palestine
  ps: `<rect y="0.00" width="30" height="6.67" fill="#000000"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#006233"/><polygon points="0,0 0,20 13,10" fill="#CE1126"/>`,
  // Panama
  pa: `<rect width="15" height="10" fill="#FFFFFF"/><rect x="15" width="15" height="10" fill="#CE1126"/><rect y="10" width="15" height="10" fill="#0038A8"/><rect x="15" y="10" width="15" height="10" fill="#FFFFFF"/><circle cx="7.5" cy="5" r="1.4" fill="#0038A8"/><circle cx="22.5" cy="15" r="1.4" fill="#CE1126"/>`,
  // Papua New Guinea
  pg: `<polygon points="0,0 30,0 0,20" fill="#CE1126"/><polygon points="30,0 30,20 0,20" fill="#000000"/><circle cx="23" cy="4" r="0.6" fill="#FFFFFF"/><circle cx="25" cy="7" r="0.6" fill="#FFFFFF"/><circle cx="24" cy="11" r="0.6" fill="#FFFFFF"/><circle cx="21" cy="15" r="0.6" fill="#FFFFFF"/><circle cx="26" cy="15" r="0.6" fill="#FFFFFF"/>`,
  // Paraguay
  py: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#00247D"/><circle cx="15" cy="10" r="1.6" fill="#FCD116"/>`,
  // Peru
  pe: `<rect x="0.00" width="10.00" height="20" fill="#CE1126"/><rect x="10.00" width="10.00" height="20" fill="#FFFFFF"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Philippines
  ph: `<rect y="0.00" width="30" height="10.00" fill="#0038A8"/><rect y="10.00" width="30" height="10.00" fill="#CE1126"/><polygon points="0,0 0,20 12,10" fill="#FFFFFF"/><circle cx="5" cy="10" r="1.6" fill="#FCD116"/>`,
  // Poland
  pl: `<rect y="0.00" width="30" height="10.00" fill="#FFFFFF"/><rect y="10.00" width="30" height="10.00" fill="#CE1126"/>`,
  // Portugal
  pt: `<rect x="0.00" width="11.25" height="20" fill="#006233"/><rect x="11.25" width="18.75" height="20" fill="#CE1126"/><circle cx="12" cy="10" r="2" fill="#FCD116"/>`,
  // Qatar
  qa: `<rect x="0.00" width="7.50" height="20" fill="#FFFFFF"/><rect x="7.50" width="22.50" height="20" fill="#8D1B3D"/>`,
  // Romania
  ro: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/>`,
  // Russia
  ru: `<rect y="0.00" width="30" height="6.67" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/>`,
  // Rwanda
  rw: `<rect y="0.00" width="30" height="13.04" fill="#41B6E6"/><rect y="13.04" width="30" height="2.61" fill="#FCD116"/><rect y="15.65" width="30" height="4.35" fill="#006233"/><rect width="30" height="20" fill="#41B6E6"/><line x1="23.80" y1="5.00" x2="24.80" y2="5.00" stroke="#FCD116" stroke-width="1"/><line x1="23.74" y1="5.47" x2="24.70" y2="5.72" stroke="#FCD116" stroke-width="1"/><line x1="23.56" y1="5.90" x2="24.42" y2="6.40" stroke="#FCD116" stroke-width="1"/><line x1="23.27" y1="6.27" x2="23.98" y2="6.98" stroke="#FCD116" stroke-width="1"/><line x1="22.90" y1="6.56" x2="23.40" y2="7.42" stroke="#FCD116" stroke-width="1"/><line x1="22.47" y1="6.74" x2="22.72" y2="7.70" stroke="#FCD116" stroke-width="1"/><line x1="22.00" y1="6.80" x2="22.00" y2="7.80" stroke="#FCD116" stroke-width="1"/><line x1="21.53" y1="6.74" x2="21.28" y2="7.70" stroke="#FCD116" stroke-width="1"/><line x1="21.10" y1="6.56" x2="20.60" y2="7.42" stroke="#FCD116" stroke-width="1"/><line x1="20.73" y1="6.27" x2="20.02" y2="6.98" stroke="#FCD116" stroke-width="1"/><line x1="20.44" y1="5.90" x2="19.58" y2="6.40" stroke="#FCD116" stroke-width="1"/><line x1="20.26" y1="5.47" x2="19.30" y2="5.72" stroke="#FCD116" stroke-width="1"/><line x1="20.20" y1="5.00" x2="19.20" y2="5.00" stroke="#FCD116" stroke-width="1"/><line x1="20.26" y1="4.53" x2="19.30" y2="4.28" stroke="#FCD116" stroke-width="1"/><line x1="20.44" y1="4.10" x2="19.58" y2="3.60" stroke="#FCD116" stroke-width="1"/><line x1="20.73" y1="3.73" x2="20.02" y2="3.02" stroke="#FCD116" stroke-width="1"/><line x1="21.10" y1="3.44" x2="20.60" y2="2.58" stroke="#FCD116" stroke-width="1"/><line x1="21.53" y1="3.26" x2="21.28" y2="2.30" stroke="#FCD116" stroke-width="1"/><line x1="22.00" y1="3.20" x2="22.00" y2="2.20" stroke="#FCD116" stroke-width="1"/><line x1="22.47" y1="3.26" x2="22.72" y2="2.30" stroke="#FCD116" stroke-width="1"/><line x1="22.90" y1="3.44" x2="23.40" y2="2.58" stroke="#FCD116" stroke-width="1"/><line x1="23.27" y1="3.73" x2="23.98" y2="3.02" stroke="#FCD116" stroke-width="1"/><line x1="23.56" y1="4.10" x2="24.42" y2="3.60" stroke="#FCD116" stroke-width="1"/><line x1="23.74" y1="4.53" x2="24.70" y2="4.28" stroke="#FCD116" stroke-width="1"/><circle cx="22" cy="5" r="1.8" fill="#FCD116"/>`,
  // Saint Kitts and Nevis
  kn: `<polygon points="0,0 30,0 0,20" fill="#006233"/><polygon points="30,0 30,20 0,20" fill="#CE1126"/><polygon points="0,0 30,0 0,7" fill="#006233" opacity="0"/><polygon points="0,0 30,20" fill="none" stroke="#FCD116" stroke-width="1.6"/><circle cx="7" cy="5" r="0.8" fill="#FFFFFF"/><circle cx="10" cy="6.5" r="0.8" fill="#FFFFFF"/>`,
  // Saint Lucia
  lc: `<rect width="30" height="20" fill="#41B6E6"/><polygon points="15,4 10,17 20,17" fill="#000000"/><polygon points="15,7 12,17 18,17" fill="#FFC61E"/>`,
  // Saint Vincent and the Grenadines
  vc: `<rect x="0.00" width="10.00" height="20" fill="#0038A8"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#006233"/><circle cx="13.5" cy="10" r="1" fill="#006233"/><circle cx="15" cy="10" r="1" fill="#006233"/><circle cx="16.5" cy="10" r="1" fill="#006233"/>`,
  // Samoa
  ws: `<rect width="30" height="20" fill="#CE1126"/><rect width="12" height="10" fill="#0038A8"/><circle cx="4" cy="2.5" r="0.7" fill="#FFFFFF"/><circle cx="7" cy="3.5" r="0.7" fill="#FFFFFF"/><circle cx="9" cy="6" r="0.7" fill="#FFFFFF"/><circle cx="5" cy="6.5" r="0.7" fill="#FFFFFF"/><circle cx="6" cy="4.8" r="0.7" fill="#FFFFFF"/>`,
  // San Marino
  sm: `<rect y="0.00" width="30" height="10.00" fill="#41B6E6"/><rect y="10.00" width="30" height="10.00" fill="#FFFFFF"/><circle cx="15" cy="10" r="2" fill="#000000"/>`,
  // Sao Tome and Principe
  st: `<rect y="0.00" width="30" height="5.00" fill="#006233"/><rect y="5.00" width="30" height="10.00" fill="#FCD116"/><rect y="15.00" width="30" height="5.00" fill="#006233"/><polygon points="0,0 0,20 8,10" fill="#CE1126"/><circle cx="14" cy="10" r="0.7" fill="#000000"/><circle cx="17" cy="10" r="0.7" fill="#000000"/>`,
  // Saudi Arabia
  sa: `<rect width="30" height="20" fill="#006233"/><rect y="15" width="30" height="1.6" fill="#FFFFFF"/>`,
  // Senegal
  sn: `<rect x="0.00" width="10.00" height="20" fill="#006233"/><rect x="10.00" width="10.00" height="20" fill="#FCD116"/><rect x="20.00" width="10.00" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="1.4" fill="#006233"/>`,
  // Serbia
  rs: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#FFFFFF"/><circle cx="8" cy="8" r="1.8" fill="#0C4076"/>`,
  // Seychelles
  sc: `<polygon points="0,20 0,0 30,20" fill="#0038A8"/><polygon points="0,0 8,0 30,20 22,20" fill="#FCD116"/><polygon points="8,0 16,0 30,20 22,20" fill="#D62828" opacity="0"/><polygon points="16,0 24,0 30,20 30,20" fill="#FFFFFF" opacity="0"/>`,
  // Sierra Leone
  sl: `<rect y="0.00" width="30" height="6.67" fill="#006233"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#41B6E6"/>`,
  // Singapore
  sg: `<rect y="0.00" width="30" height="10.00" fill="#CE1126"/><rect y="10.00" width="30" height="10.00" fill="#FFFFFF"/><circle cx="7" cy="5" r="2" fill="#FFFFFF"/><circle cx="7.84" cy="5" r="1.64" fill="#CE1126"/><circle cx="11" cy="3" r="0.6" fill="#FFFFFF"/><circle cx="13" cy="5" r="0.6" fill="#FFFFFF"/><circle cx="12.5" cy="7.5" r="0.6" fill="#FFFFFF"/><circle cx="9.5" cy="7.5" r="0.6" fill="#FFFFFF"/><circle cx="9" cy="5" r="0.6" fill="#FFFFFF"/>`,
  // Slovakia
  sk: `<rect y="0.00" width="30" height="6.67" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/>`,
  // Slovenia
  si: `<rect y="0.00" width="30" height="6.67" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><circle cx="6" cy="6" r="1.4" fill="#FFD700"/>`,
  // Solomon Islands
  sb: `<polygon points="0,0 30,20 0,20" fill="#006233"/><polygon points="0,0 30,0 30,20" fill="#0038A8"/><polygon points="0,0 30,20" fill="none" stroke="#FCD116" stroke-width="1.4"/><circle cx="6" cy="4" r="0.6" fill="#FFFFFF"/><circle cx="4" cy="6" r="0.6" fill="#FFFFFF"/><circle cx="6" cy="8" r="0.6" fill="#FFFFFF"/><circle cx="8" cy="6" r="0.6" fill="#FFFFFF"/><circle cx="6" cy="6" r="0.6" fill="#FFFFFF"/>`,
  // Somalia
  so: `<rect width="30" height="20" fill="#41B6E6"/><circle cx="15" cy="10" r="2.2" fill="#FFFFFF"/>`,
  // South Africa
  za: `<rect width="30" height="20" fill="#FFFFFF"/><rect y="0" width="30" height="9" fill="#CE1126"/><rect y="11" width="30" height="9" fill="#0038A8"/><polygon points="0,0 0,20 13,10" fill="#006233"/><polygon points="0,0 13,10 0,20" fill="none"/><polygon points="0,2 0,18 11,10" fill="#FCD116"/><polygon points="0,4 0,16 9,10" fill="#000000"/>`,
  // South Korea
  kr: `<rect width="30" height="20" fill="#FFFFFF"/><circle cx="15" cy="10" r="3" fill="#C60C30"/><path d="M12,10 A3,3 0 0,1 18,10 A1.5,1.5 0 0,0 15,10 A1.5,1.5 0 0,1 12,10Z" fill="#003478"/>`,
  // South Sudan
  ss: `<rect y="0.00" width="30" height="5.88" fill="#000000"/><rect y="5.88" width="30" height="1.18" fill="#FFFFFF"/><rect y="7.06" width="30" height="5.88" fill="#CE1126"/><rect y="12.94" width="30" height="1.18" fill="#FFFFFF"/><rect y="14.12" width="30" height="5.88" fill="#006233"/><polygon points="0,0 0,20 13,10" fill="#0F47AF"/><circle cx="6" cy="10" r="1.4" fill="#FCD116"/>`,
  // Spain
  es: `<rect y="0.00" width="30" height="5.00" fill="#CE1126"/><rect y="5.00" width="30" height="10.00" fill="#FCD116"/><rect y="15.00" width="30" height="5.00" fill="#CE1126"/>`,
  // Sri Lanka
  lk: `<rect width="6" height="20" fill="#006233"/><rect x="6" width="6" height="20" fill="#FF8200"/><rect x="12" width="18" height="20" fill="#8D2B2B"/><circle cx="21" cy="10" r="2.2" fill="#FCD116"/>`,
  // Sudan
  sd: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#000000"/><polygon points="0,0 0,20 12,10" fill="#006233"/>`,
  // Suriname
  sr: `<rect y="0.00" width="30" height="4.17" fill="#007A3D"/><rect y="4.17" width="30" height="1.67" fill="#FFFFFF"/><rect y="5.83" width="30" height="8.33" fill="#CE1126"/><rect y="14.17" width="30" height="1.67" fill="#FFFFFF"/><rect y="15.83" width="30" height="4.17" fill="#007A3D"/><circle cx="15" cy="10" r="1.6" fill="#FCD116"/>`,
  // Sweden
  se: `<rect width="30" height="20" fill="#0038A8"/><rect x="11" width="3" height="20" fill="#FCD116"/><rect y="8.50" width="30" height="3" fill="#FCD116"/>`,
  // Switzerland
  ch: `<rect width="30" height="20" fill="#CE1126"/><rect x="12.50" width="5" height="20" fill="#FFFFFF"/><rect y="7.50" width="30" height="5" fill="#FFFFFF"/>`,
  // Syria
  sy: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#000000"/><circle cx="12" cy="10" r="1" fill="#006233"/><circle cx="15" cy="10" r="1" fill="#006233"/><circle cx="18" cy="10" r="1" fill="#006233"/>`,
  // Taiwan
  tw: `<rect width="30" height="20" fill="#FE0000"/><rect width="14" height="10" fill="#000095"/><rect width="30" height="20" fill="#000095"/><line x1="9.00" y1="5.00" x2="10.20" y2="5.00" stroke="#FFFFFF" stroke-width="1"/><line x1="8.73" y1="6.00" x2="9.77" y2="6.60" stroke="#FFFFFF" stroke-width="1"/><line x1="8.00" y1="6.73" x2="8.60" y2="7.77" stroke="#FFFFFF" stroke-width="1"/><line x1="7.00" y1="7.00" x2="7.00" y2="8.20" stroke="#FFFFFF" stroke-width="1"/><line x1="6.00" y1="6.73" x2="5.40" y2="7.77" stroke="#FFFFFF" stroke-width="1"/><line x1="5.27" y1="6.00" x2="4.23" y2="6.60" stroke="#FFFFFF" stroke-width="1"/><line x1="5.00" y1="5.00" x2="3.80" y2="5.00" stroke="#FFFFFF" stroke-width="1"/><line x1="5.27" y1="4.00" x2="4.23" y2="3.40" stroke="#FFFFFF" stroke-width="1"/><line x1="6.00" y1="3.27" x2="5.40" y2="2.23" stroke="#FFFFFF" stroke-width="1"/><line x1="7.00" y1="3.00" x2="7.00" y2="1.80" stroke="#FFFFFF" stroke-width="1"/><line x1="8.00" y1="3.27" x2="8.60" y2="2.23" stroke="#FFFFFF" stroke-width="1"/><line x1="8.73" y1="4.00" x2="9.77" y2="3.40" stroke="#FFFFFF" stroke-width="1"/><circle cx="7" cy="5" r="2" fill="#FFFFFF"/>`,
  // Tajikistan
  tj: `<rect y="0.00" width="30" height="5.71" fill="#CE1126"/><rect y="5.71" width="30" height="8.57" fill="#FFFFFF"/><rect y="14.29" width="30" height="5.71" fill="#007A3D"/><circle cx="15" cy="10" r="2" fill="#FCD116"/>`,
  // Tanzania
  tz: `<polygon points="0,0 30,20 0,20" fill="#006233"/><polygon points="0,0 30,0 30,20" fill="#41B6E6"/><line x1="0" y1="0" x2="30" y2="20" stroke="#FCD116" stroke-width="3"/><line x1="0" y1="0" x2="30" y2="20" stroke="#000000" stroke-width="1.4"/>`,
  // Thailand
  th: `<rect y="0.00" width="30" height="3.33" fill="#CE1126"/><rect y="3.33" width="30" height="3.33" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="3.33" fill="#FFFFFF"/><rect y="16.67" width="30" height="3.33" fill="#CE1126"/>`,
  // Timor-Leste
  tl: `<rect width="30" height="20" fill="#006233"/><polygon points="0,0 0,20 20,10" fill="#DC241F"/><polygon points="0,0 0,20 10,10" fill="#FFC726"/><circle cx="4" cy="10" r="1.2" fill="#FFFFFF"/>`,
  // Togo
  tg: `<rect y="0.00" width="30" height="4.00" fill="#006233"/><rect y="4.00" width="30" height="4.00" fill="#FCD116"/><rect y="8.00" width="30" height="4.00" fill="#006233"/><rect y="12.00" width="30" height="4.00" fill="#FCD116"/><rect y="16.00" width="30" height="4.00" fill="#006233"/><rect width="10" height="12" fill="#CE1126"/><circle cx="5" cy="6" r="1.6" fill="#FFFFFF"/>`,
  // Tonga
  to: `<rect width="30" height="20" fill="#CE1126"/><rect width="12" height="10" fill="#FFFFFF"/><line x1="4" y1="3" x2="8" y2="7" stroke="#CE1126" stroke-width="1.2"/><line x1="8" y1="3" x2="4" y2="7" stroke="#CE1126" stroke-width="1.2"/><line x1="6" y1="2" x2="6" y2="8" stroke="#CE1126" stroke-width="1.2"/><line x1="3" y1="5" x2="9" y2="5" stroke="#CE1126" stroke-width="1.2"/>`,
  // Trinidad and Tobago
  tt: `<rect width="30" height="20" fill="#DA121A"/><polygon points="0,0 9,0 0,15" fill="#FFFFFF"/><polygon points="0,0 7,0 0,11.6" fill="#000000"/><polygon points="30,20 21,20 30,5" fill="#FFFFFF"/><polygon points="30,20 23,20 30,8.4" fill="#000000"/>`,
  // Tunisia
  tn: `<rect width="30" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="4" fill="#FFFFFF"/><circle cx="15" cy="10" r="2" fill="#CE1126"/><circle cx="15.84" cy="10" r="1.64" fill="#FFFFFF"/><circle cx="18.30" cy="10" r="0.64" fill="#CE1126"/>`,
  // Turkey
  tr: `<rect width="30" height="20" fill="#CE1126"/><circle cx="13" cy="10" r="2.6" fill="#FFFFFF"/><circle cx="14.09" cy="10" r="2.13" fill="#CE1126"/><circle cx="17.29" cy="10" r="0.83" fill="#FFFFFF"/>`,
  // Turkmenistan
  tm: `<rect width="26" height="20" fill="#00843D"/><rect x="26" width="4" height="20" fill="#FFFFFF"/><circle cx="20" cy="10" r="2" fill="#FFFFFF"/><circle cx="20.84" cy="10" r="1.64" fill="#00843D"/><circle cx="23.30" cy="10" r="0.64" fill="#FFFFFF"/>`,
  // Tuvalu
  tv: `<rect width="30" height="20" fill="#41B6E6"/><rect width="12" height="10" fill="#012169"/><circle cx="18" cy="4" r="0.6" fill="#FCD116"/><circle cx="22" cy="3" r="0.6" fill="#FCD116"/><circle cx="26" cy="5" r="0.6" fill="#FCD116"/><circle cx="24" cy="9" r="0.6" fill="#FCD116"/><circle cx="20" cy="10" r="0.6" fill="#FCD116"/><circle cx="16" cy="8" r="0.6" fill="#FCD116"/><circle cx="22" cy="13" r="0.6" fill="#FCD116"/>`,
  // Uganda
  ug: `<rect y="0.00" width="30" height="3.33" fill="#000000"/><rect y="3.33" width="30" height="3.33" fill="#FCD116"/><rect y="6.67" width="30" height="3.33" fill="#CE1126"/><rect y="10.00" width="30" height="3.33" fill="#000000"/><rect y="13.33" width="30" height="3.33" fill="#FCD116"/><rect y="16.67" width="30" height="3.33" fill="#CE1126"/><circle cx="15" cy="10" r="3" fill="#FFFFFF"/>`,
  // Ukraine
  ua: `<rect y="0.00" width="30" height="10.00" fill="#0038A8"/><rect y="10.00" width="30" height="10.00" fill="#FCD116"/>`,
  // United Arab Emirates
  ae: `<rect x="8" width="22" height="6.67" fill="#006233"/><rect x="8" y="6.67" width="22" height="6.67" fill="#FFFFFF"/><rect x="8" y="13.34" width="22" height="6.66" fill="#000000"/><rect width="8" height="20" fill="#FF0000"/>`,
  // United Kingdom
  gb: `<rect width="30" height="20" fill="#012169"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#CF142B" stroke-width="1.6"/><path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6.6"/><path d="M15,0 V20 M0,10 H30" stroke="#CF142B" stroke-width="4"/>`,
  // United States
  us: `<rect y="0.00" width="30" height="1.54" fill="#CE1126"/><rect y="1.54" width="30" height="1.54" fill="#FFFFFF"/><rect y="3.08" width="30" height="1.54" fill="#CE1126"/><rect y="4.62" width="30" height="1.54" fill="#FFFFFF"/><rect y="6.15" width="30" height="1.54" fill="#CE1126"/><rect y="7.69" width="30" height="1.54" fill="#FFFFFF"/><rect y="9.23" width="30" height="1.54" fill="#CE1126"/><rect y="10.77" width="30" height="1.54" fill="#FFFFFF"/><rect y="12.31" width="30" height="1.54" fill="#CE1126"/><rect y="13.85" width="30" height="1.54" fill="#FFFFFF"/><rect y="15.38" width="30" height="1.54" fill="#CE1126"/><rect y="16.92" width="30" height="1.54" fill="#FFFFFF"/><rect y="18.46" width="30" height="1.54" fill="#CE1126"/><rect width="13" height="10.8" fill="#012169"/><circle cx="2.6" cy="2.0" r="0.5" fill="#FFFFFF"/><circle cx="5.300000000000001" cy="2.0" r="0.5" fill="#FFFFFF"/><circle cx="8.0" cy="2.0" r="0.5" fill="#FFFFFF"/><circle cx="10.700000000000001" cy="2.0" r="0.5" fill="#FFFFFF"/><circle cx="2.6" cy="4.7" r="0.5" fill="#FFFFFF"/><circle cx="5.300000000000001" cy="4.7" r="0.5" fill="#FFFFFF"/><circle cx="8.0" cy="4.7" r="0.5" fill="#FFFFFF"/><circle cx="10.700000000000001" cy="4.7" r="0.5" fill="#FFFFFF"/><circle cx="2.6" cy="7.4" r="0.5" fill="#FFFFFF"/><circle cx="5.300000000000001" cy="7.4" r="0.5" fill="#FFFFFF"/><circle cx="8.0" cy="7.4" r="0.5" fill="#FFFFFF"/><circle cx="10.700000000000001" cy="7.4" r="0.5" fill="#FFFFFF"/>`,
  // Uruguay
  uy: `<rect width="30" height="20" fill="#FFFFFF"/><rect y="0.0" width="30" height="1.1" fill="#418FDE"/><rect y="2.2" width="30" height="1.1" fill="#418FDE"/><rect y="4.4" width="30" height="1.1" fill="#418FDE"/><rect y="6.6" width="30" height="1.1" fill="#418FDE"/><rect y="8.8" width="30" height="1.1" fill="#418FDE"/><rect y="11.0" width="30" height="1.1" fill="#418FDE"/><rect y="13.2" width="30" height="1.1" fill="#418FDE"/><rect y="15.4" width="30" height="1.1" fill="#418FDE"/><rect y="17.6" width="30" height="1.1" fill="#418FDE"/><rect width="10" height="11" fill="#FFFFFF"/><rect width="30" height="20" fill="#FFFFFF"/><line x1="6.80" y1="5.50" x2="7.80" y2="5.50" stroke="#FCD116" stroke-width="1"/><line x1="6.27" y1="6.77" x2="6.98" y2="7.48" stroke="#FCD116" stroke-width="1"/><line x1="5.00" y1="7.30" x2="5.00" y2="8.30" stroke="#FCD116" stroke-width="1"/><line x1="3.73" y1="6.77" x2="3.02" y2="7.48" stroke="#FCD116" stroke-width="1"/><line x1="3.20" y1="5.50" x2="2.20" y2="5.50" stroke="#FCD116" stroke-width="1"/><line x1="3.73" y1="4.23" x2="3.02" y2="3.52" stroke="#FCD116" stroke-width="1"/><line x1="5.00" y1="3.70" x2="5.00" y2="2.70" stroke="#FCD116" stroke-width="1"/><line x1="6.27" y1="4.23" x2="6.98" y2="3.52" stroke="#FCD116" stroke-width="1"/><circle cx="5" cy="5.5" r="1.8" fill="#FCD116"/>`,
  // Uzbekistan
  uz: `<rect y="0.00" width="30" height="6.67" fill="#418FDE"/><rect y="6.67" width="30" height="0.67" fill="#CE1126"/><rect y="7.33" width="30" height="5.33" fill="#FFFFFF"/><rect y="12.67" width="30" height="0.67" fill="#CE1126"/><rect y="13.33" width="30" height="6.67" fill="#006233"/><circle cx="6" cy="4" r="1.6" fill="#FFFFFF"/><circle cx="6.67" cy="4" r="1.31" fill="#418FDE"/><circle cx="9.0" cy="4" r="0.4" fill="#FFFFFF"/><circle cx="10.6" cy="4" r="0.4" fill="#FFFFFF"/><circle cx="12.2" cy="4" r="0.4" fill="#FFFFFF"/><circle cx="13.8" cy="4" r="0.4" fill="#FFFFFF"/><circle cx="15.4" cy="4" r="0.4" fill="#FFFFFF"/><circle cx="17.0" cy="4" r="0.4" fill="#FFFFFF"/>`,
  // Vanuatu
  vu: `<polygon points="0,0 30,20 0,20" fill="#009543"/><polygon points="0,0 30,0 30,20" fill="#000000"/><polygon points="0,0 30,20" fill="none" stroke="#CE1126" stroke-width="2.4"/><polygon points="0,0 30,20" fill="none" stroke="#FCD116" stroke-width="1"/><polygon points="0,7 0,13 6,10" fill="#FCD116"/>`,
  // Venezuela
  ve: `<rect y="0.00" width="30" height="6.67" fill="#FCD116"/><rect y="6.67" width="30" height="6.67" fill="#0038A8"/><rect y="13.33" width="30" height="6.67" fill="#CE1126"/><circle cx="8.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="10.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="12.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="14.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="16.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="18.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="20.0" cy="6.6" r="0.5" fill="#FFFFFF"/><circle cx="22.0" cy="6.6" r="0.5" fill="#FFFFFF"/>`,
  // Vietnam
  vn: `<rect width="30" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2.4" fill="#FCD116"/>`,
  // Yemen
  ye: `<rect y="0.00" width="30" height="6.67" fill="#CE1126"/><rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/><rect y="13.33" width="30" height="6.67" fill="#000000"/>`,
  // Zambia
  zm: `<rect width="30" height="20" fill="#006233"/><rect x="20" width="10" height="20" fill="none"/><rect x="21" y="0" width="2.6" height="20" fill="#CE1126"/><rect x="24" width="2.6" height="20" fill="#000000"/><rect x="27" width="2.6" height="20" fill="#FF8200"/><circle cx="15" cy="6" r="1.6" fill="#FF8200"/>`,
  // Zimbabwe
  zw: `<rect y="0.00" width="30" height="4.00" fill="#006233"/><rect y="4.00" width="30" height="1.60" fill="#FCD116"/><rect y="5.60" width="30" height="1.60" fill="#CE1126"/><rect y="7.20" width="30" height="5.60" fill="#000000"/><rect y="12.80" width="30" height="1.60" fill="#CE1126"/><rect y="14.40" width="30" height="1.60" fill="#FCD116"/><rect y="16.00" width="30" height="4.00" fill="#006233"/><polygon points="0,0 0,20 12,10" fill="#FFFFFF"/><circle cx="5" cy="10" r="2" fill="#000000"/><circle cx="5" cy="10" r="1" fill="#FCD116"/>`,
};

/** Full <svg> markup (viewBox 0 0 30 20) for a country's flag, by canonical COUNTRY_LIST name. */
function getCountryFlagSVG(englishName){
  const iso = (typeof COUNTRY_ISO !== 'undefined' && COUNTRY_ISO[englishName]) || '';
  const inner = COUNTRY_FLAGS[iso.toLowerCase()];
  if (!inner) return '';
  return `<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
