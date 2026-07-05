const LUNAR_INFO = [
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x16a95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
  0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
  0x092e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
  0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
  0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
  0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a4d0,0x0d150,0x0f252,
  0x0d520
];

const SOLAR_TERM = [
  '小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨',
  '立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑',
  '白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至'
];

// Base solar term dates (approximate for year 2000, adjusted per year)
const SOLAR_TERM_BASE = [
  5,20,4,19,6,21,5,20,6,21,6,22,7,23,7,23,
  8,23,8,23,7,22,7,22
];

const LUNAR_MONTH_NAMES = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
const LUNAR_DAY_NAMES = [
  '','初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
  '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
  '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'
];

const LUNAR_HOLIDAYS = {
  '1-1': '春节',
  '1-2': '春节',
  '1-3': '春节',
  '1-4': '春节',
  '1-5': '春节',
  '1-6': '春节',
  '1-15': '元宵',
  '5-5': '端午',
  '7-7': '七夕',
  '7-15': '中元',
  '8-15': '中秋',
  '9-9': '重阳',
  '12-30': '除夕',
  '12-29': '除夕'
};

const SOLAR_HOLIDAYS = {
  '1-1': '元旦',
  '2-14': '情人节',
  '3-8': '妇女节',
  '4-4': '清明',
  '4-5': '清明',
  '5-1': '劳动节',
  '5-4': '青年节',
  '6-1': '儿童节',
  '8-1': '建军节',
  '9-10': '教师节',
  '10-1': '国庆节',
  '12-25': '圣诞节'
};

function getLunarYearDays(y) {
  let sum = 348; // 12 months * 29 days = 348
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
  }
  return sum + getLeapMonthDays(y);
}

function getLeapMonth(y) {
  return LUNAR_INFO[y - 1900] & 0xf;
}

function getLeapMonthDays(y) {
  if (getLeapMonth(y)) {
    return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

function getLunarMonthDays(y, m) {
  return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarToLunar(y, m, d) {
  // Calculate days from 1900-01-31 (which was lunar 1900-1-1)
  let offset = 0;
  for (let i = 1900; i < y; i++) {
    offset += getSolarYearDays(i);
  }
  for (let i = 1; i < m; i++) {
    offset += getSolarMonthDays(y, i);
  }
  offset += d - 1;
  offset -= 30; // Base: 1900-01-31 is lunar 1900-1-1

  if (offset < 0) return { year: 1899, month: 12, day: 31 + offset + 1, isLeap: false };

  let ly = 1900;
  let days = getLunarYearDays(ly);
  while (ly < 2100 && offset >= days) {
    offset -= days;
    ly++;
    days = getLunarYearDays(ly);
  }

  let lm = 1;
  let leap = getLeapMonth(ly);
  let isLeap = false;
  days = getLunarMonthDays(ly, lm);
  while (lm <= 12 && offset >= days) {
    offset -= days;
    if (leap > 0 && lm === leap) {
      days = getLeapMonthDays(ly);
      if (offset < days) {
        isLeap = true;
        break;
      }
      offset -= days;
    }
    lm++;
    days = getLunarMonthDays(ly, lm);
  }

  let ld = offset + 1;

  // Check if it's actually lunar month 12 day 29 or 30 (for 除夕 handling)
  // This handles edge cases
  return { year: ly, month: lm, day: ld, isLeap: isLeap };
}

function getSolarYearDays(y) {
  if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) return 366;
  return 365;
}

function getSolarMonthDays(y, m) {
  if (m === 2) return (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) ? 29 : 28;
  const m31 = [1,3,5,7,8,10,12];
  return m31.includes(m) ? 31 : 30;
}

function getLunarDayName(day) {
  return LUNAR_DAY_NAMES[day] || '';
}

function getLunarMonthName(month, isLeap) {
  return (isLeap ? '闰' : '') + LUNAR_MONTH_NAMES[month - 1] + '月';
}

function getLunarDateDisplay(lunar) {
  if (lunar.day === 1) {
    return getLunarMonthName(lunar.month, lunar.isLeap);
  }
  return getLunarDayName(lunar.day);
}

function getLunarHoliday(lunar) {
  const key = lunar.month + '-' + lunar.day;
  return LUNAR_HOLIDAYS[key] || null;
}

function getSolarHoliday(m, d) {
  const key = m + '-' + d;
  return SOLAR_HOLIDAYS[key] || null;
}

/* ================================================================
   COLOR ENGINE
   ================================================================ */

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}

function applyColors(bgH, bgS, bgL, fgH, fgS, fgL) {
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', `hsl(${bgH}, ${bgS}%, ${bgL}%)`);
  root.style.setProperty('--bg-secondary', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 4, 95)}%)`);
  root.style.setProperty('--bg-tertiary', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 8, 95)}%)`);
  root.style.setProperty('--bg-hover', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 14, 95)}%)`);
  root.style.setProperty('--bg-primary-rgb', hslToRgb(bgH, bgS, bgL));
  root.style.setProperty('--accent', `hsl(${fgH}, ${fgS}%, ${fgL}%)`);
  root.style.setProperty('--accent-light', `hsl(${fgH}, ${fgS}%, ${Math.min(fgL + 10, 95)}%)`);
  root.style.setProperty('--accent-dark', `hsl(${fgH}, ${fgS}%, ${Math.max(fgL - 10, 5)}%)`);
  root.style.setProperty('--accent-rgb', hslToRgb(fgH, fgS, fgL));

  const isLight = bgL > 50;
  if (isLight) {
    root.style.setProperty('--text-primary', '#111111');
    root.style.setProperty('--text-secondary', '#555555');
    root.style.setProperty('--text-muted', '#888888');
    root.style.setProperty('--border', 'rgba(0,0,0,0.06)');
    root.style.setProperty('--border-strong', 'rgba(0,0,0,0.1)');
    root.style.setProperty('--shadow', '0 2px 12px rgba(0,0,0,0.06)');
    root.style.setProperty('--mini-card-bg', 'rgba(255, 255, 255, 0.55)');
    root.style.setProperty('--mini-card-hover', 'rgba(255, 255, 255, 0.85)');
  } else {
    root.style.setProperty('--text-primary', '#e8e6e3');
    root.style.setProperty('--text-secondary', '#9a98a0');
    root.style.setProperty('--text-muted', '#6a6870');
    root.style.setProperty('--border', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--border-strong', 'rgba(255,255,255,0.14)');
    root.style.setProperty('--shadow', '0 2px 20px rgba(0,0,0,0.4)');
    root.style.setProperty('--mini-card-bg', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--mini-card-hover', 'rgba(255, 255, 255, 0.14)');
  }
}

const SYSTEM_FONTS = [
  'Microsoft YaHei', 'PingFang SC', 'SimSun', 'SimHei',
  'KaiTi', 'FangSong', 'DengXian', 'YouYuan',
  'Microsoft JhengHei', 'Helvetica Neue', 'Arial',
  'Segoe UI', 'Consolas', 'Courier New', 'Georgia',
  'Times New Roman', 'Verdana', 'Tahoma'
];

const TODO_CATEGORIES = [
  { id: 'event',         label: '事件',   color: '#2563eb', icon: 'calendar' },
  { id: 'life',          label: '生活',   color: '#f4b400', icon: 'home' },
  { id: 'love',          label: '爱情',   color: '#ff4081', icon: 'heart' },
  { id: 'birthday',      label: '生日',   color: '#e53935', icon: 'cake' },
  { id: 'festival',      label: '节日',   color: '#ff9800', icon: 'star' },
  { id: 'entertainment', label: '娱乐',   color: '#7c4dff', icon: 'disc' },
  { id: 'study',         label: '学习',   color: '#0891b2', icon: 'gradcap' },
  { id: 'work',          label: '工作',   color: '#0d9488', icon: 'briefcase' },
  { id: 'sport',         label: '运动',   color: '#4caf50', icon: 'run' }
];

const ICON_SVGS = {
  calendar:  '<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 6h14V5H5v4z"/><path d="M7 1h2v4H7zM15 1h2v4h-2z"/>',
  home:      '<path d="M12 2L2 12h3v9h6v-6h2v6h6v-9h3L12 2z"/>',
  heart:     '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>',
  cake:      '<path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6z"/><path d="M7 10a2 2 0 0 1 4 0 2 2 0 0 1 4 0 2 2 0 0 1 4 0v4H7v-4z"/><path d="M11 5h2v5h-2z"/><path d="M12 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>',
  star:      '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  rocket:    '<path d="M12 2c-2 2-4 5-4 9 0 2 1 4 2 5v6h4v-6c1-1 2-3 2-5 0-4-2-7-4-9z"/>',
  disc:      '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill-rule="evenodd"/>',
  gradcap:   '<path d="M12 2L2 8l10 5 10-5-10-5zM4 10v6l8 4 8-4v-6l-8 4-8-4z"/>',
  briefcase: '<path d="M2 7h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7zm14-2V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1h8z"/>',
  cloud:     '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  droplet:   '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  diamond:   '<path d="M12 22L2 8l4-6h12l4 6-10 14z"/>',
  coffee:    '<path d="M18 8h1a4 4 0 0 1 0 8h-1V8zM2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
  tag:       '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>',
  mail:      '<path d="M22 8v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8l10 6 10-6zM4 4h16l-8 5-8-5z"/>',
  folder:    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z"/>',
  filetext:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>',
  image:     '<path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14zM5 15l4-4 3 3 5-5 2 2v5H5z"/>',
  map:       '<path d="M8 2l-7 4v16l7-4 8 4 7-4V2l-7 4-8-4zm0 16V6l8-4v12l-8 4z"/>',
  glasses:   '<path d="M2 14v-2a1 1 0 0 1 1-1h1a4 4 0 1 1 0 8H3a1 1 0 0 1-1-1v-4zm18 0v-2a1 1 0 0 0-1-1h-1a4 4 0 1 0 0 8h1a1 1 0 0 0 1-1v-4zM10 15h4"/>',
  trophy:    '<path d="M5 2h14v6a6 6 0 0 1-12 0V2zm-3 2a2 2 0 0 0 2 2h1V4H2zm20 0a2 2 0 0 1-2 2h-1V4h3zM4 20h16v2H4v-2z"/>',
  clock:     '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4v6l4 2-1 1.5-5-2.5V6h2z"/>',
  plane:     '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 16.5V13.5l8 2.5z"/>',
  shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  zap:       '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  bell:      '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM12 22a2 2 0 0 0 1.73-1H10.27A2 2 0 0 0 12 22z"/>',
  pen:       '<path d="M17.5 2.5l4 4L8 20l-6 2 2-6 13.5-13.5z"/>',
  moon:      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  music:     '<path d="M9 18V5l12-2v13a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3zM6 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>',
  camera:    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11zm-11-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>',
  car:       '<path d="M5 11l2-5h10l2 5v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7zm4 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm6 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>',
  anchor:    '<path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 2 2.83V18a4 4 0 0 1-3-1.5l-1 1.5a6 6 0 0 0 10 0l-1-1.5a4 4 0 0 1-3 1.5V7.83A3 3 0 0 0 15 5a3 3 0 0 0-3-3z"/>',
  flag:      '<path d="M4 22V2l2 1s3-1 5 1 5 1 5 1v10s-3 0-5-2-5 0-5 0v9H4z"/>',
  run:       '<circle cx="14" cy="4" r="2"/><path d="M11 22l1-6 2 2v5h2v-7l-2-2 1-3c1 1 2.5 2 4.5 2h1.5v-2h-1c-1.2 0-2.3-.5-3-1.3l-1.2-1.3c-.8-.8-1.8-1.4-3-1.4-.4 0-.7 0-1.1.2L9 8.5 7 11l2 2-2 5-2 4h2l1.5-3L11 22z"/>'
};

const CUSTOM_CATEGORY_COLORS = [
  '#e07a5f', '#3d405b', '#81b29a', '#f2cc8f',
  '#98c1d9', '#ee6c4d', '#293241', '#e0fbfc',
  '#e36414', '#0f4c5c', '#5f0f40', '#9a031e',
  '#fb8b24', '#52b788', '#1d3557', '#7b2cbf'
];
const ALPHA_BG = '33';
const ALPHA_BG_COMPLETED = '14';

let selectedCategory = 'event';
let categoryColors = {};
let customCategories = [];

// resetAllSettings, updateAllSliderLabels, saveColors, applyPreset moved to settings.js

function applyTitlebarHide(hidden) {
  const bar = document.getElementById('title-bar');
  const miniBtn = document.getElementById('mini-mode-btn');
  const settingsBtn = document.getElementById('settings-float-btn');

  if (hidden) {
    bar.classList.add('auto-hide');
    if (miniBtn) miniBtn.classList.add('auto-hide');
    if (settingsBtn) settingsBtn.classList.add('auto-hide');

    let zone = document.getElementById('title-bar-hover-zone');
    if (!zone) {
      zone = document.createElement('div');
      zone.id = 'title-bar-hover-zone';
      bar.parentNode.insertBefore(zone, bar);
    }
    zone.classList.add('active');
    if (!zone.dataset.listeners) {
      zone.dataset.listeners = '1';
      let hideTimer = null;
      zone.addEventListener('mouseenter', () => {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        bar.classList.add('show');
        if (miniBtn) miniBtn.classList.add('show');
        if (settingsBtn) settingsBtn.classList.add('show');
      });
      zone.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(() => {
          bar.classList.remove('show');
          if (miniBtn) miniBtn.classList.remove('show');
          if (settingsBtn) settingsBtn.classList.remove('show');
          hideTimer = null;
        }, 3000);
      });
    }
  } else {
    bar.classList.remove('auto-hide', 'show');
    if (miniBtn) { miniBtn.classList.remove('auto-hide', 'show'); }
    if (settingsBtn) { settingsBtn.classList.remove('auto-hide', 'show'); }
    const zone = document.getElementById('title-bar-hover-zone');
    if (zone) zone.classList.remove('active');
  }
}

/* ================================================================
   CALENDAR UI MODULE
   ================================================================ */

let currentYear, currentMonth;
let selectedDate = null; // { year, month, day }
let todos = {}; // key: 'YYYY-MM-DD' -> [{ id, text, completed, createdAt }]

function dateKey(y, m, d) {
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return { year: y, month: m, day: d };
}

function formatDateCN(y, m, d) {
  return `${y}年${m}月${d}日`;
}

function getToday() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

function isToday(y, m, d) {
  const t = getToday();
  return y === t.year && m === t.month && d === t.day;
}

const MONTH_NAMES_EN = [
  'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
  'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'
];
const WEEKDAY_NAMES_EN = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const WEEKDAY_NAMES_CN = ['日','一','二','三','四','五','六'];

// 按时间排序待办：已完成排最后，有时间排前面按开始时间升序，冇时间按创建时间降序
function sortTodosByTime(dayTodos) {
  return [...dayTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const aHasTime = !!(a.startTime || a.endTime);
    const bHasTime = !!(b.startTime || b.endTime);
    if (aHasTime !== bHasTime) return aHasTime ? -1 : 1;
    if (aHasTime && bHasTime) {
      const aTime = a.startTime || a.endTime || '99:99';
      const bTime = b.startTime || b.endTime || '99:99';
      return aTime.localeCompare(bTime);
    }
    return b.createdAt - a.createdAt;
  });
}

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  document.getElementById('current-year').textContent = currentYear;
  document.getElementById('current-month').textContent = MONTH_NAMES_EN[currentMonth - 1];

  grid.innerHTML = '';

  const today = getToday();
  const todayBtn = document.getElementById('btn-today');
  if (currentYear === today.year && currentMonth === today.month) {
    todayBtn.style.opacity = '0';
    todayBtn.style.visibility = 'hidden';
  } else {
    todayBtn.style.opacity = '';
    todayBtn.style.visibility = '';
  }

  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0=Sun
  const daysInMonth = getSolarMonthDays(currentYear, currentMonth);
  const daysInPrevMonth = getSolarMonthDays(currentYear, currentMonth === 1 ? 12 : currentMonth - 1);
  const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');

    let solarDay, lunarMonth, lunarYear, isOtherMonth, cellLunar;

    if (i < firstDay) {
      solarDay = daysInPrevMonth - firstDay + i + 1;
      isOtherMonth = true;
      cellLunar = solarToLunar(prevMonthYear, prevMonth, solarDay);
      lunarMonth = cellLunar.month;
      lunarYear = cellLunar.year;
    } else if (i >= firstDay + daysInMonth) {
      solarDay = i - firstDay - daysInMonth + 1;
      isOtherMonth = true;
      const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      cellLunar = solarToLunar(nextMonthYear, nextMonth, solarDay);
      lunarMonth = cellLunar.month;
      lunarYear = cellLunar.year;
    } else {
      solarDay = i - firstDay + 1;
      isOtherMonth = false;
      cellLunar = solarToLunar(currentYear, currentMonth, solarDay);
      lunarMonth = cellLunar.month;
      lunarYear = cellLunar.year;
    }

    if (isOtherMonth) cell.classList.add('other-month');

    const dayOfWeek = i % 7;
    if (dayOfWeek === 0 || dayOfWeek === 6) cell.classList.add('weekend');

    if (!isOtherMonth && currentYear === today.year && currentMonth === today.month && solarDay === today.day) {
      cell.classList.add('today');
    }

    if (selectedDate && selectedDate.year === currentYear &&
        selectedDate.month === currentMonth && selectedDate.day === solarDay && !isOtherMonth) {
      cell.classList.add('selected');
    }

    const solarSpan = document.createElement('span');
    solarSpan.classList.add('solar-date');
    solarSpan.textContent = solarDay;
    cell.appendChild(solarSpan);

    const lunarDateDisplay = document.createElement('span');
    lunarDateDisplay.classList.add('lunar-date');

    let holidayText = '';
    if (!isOtherMonth) {
      const lunarHoliday = getLunarHoliday(cellLunar);
      const solarHoliday = getSolarHoliday(currentMonth, solarDay);

      if (lunarHoliday) {
        holidayText = lunarHoliday;
        lunarDateDisplay.classList.add('holiday');
        cell.classList.add('holiday-cell');
      } else if (solarHoliday) {
        holidayText = solarHoliday;
        lunarDateDisplay.classList.add('holiday');
        cell.classList.add('holiday-cell');
      }

      lunarDateDisplay.textContent = holidayText || getLunarDateDisplay(cellLunar);
    } else {
      lunarDateDisplay.textContent = getLunarDateDisplay(cellLunar);
    }

    cell.appendChild(lunarDateDisplay);

    if (!isOtherMonth) {
      const key = dateKey(currentYear, currentMonth, solarDay);
      const dayTodos = todos[key];
      if (dayTodos && dayTodos.length > 0) {
        const dotsWrap = document.createElement('div');
        dotsWrap.classList.add('todo-dots');
        // 按分类去重：每个分类只显示一个 logo
        // 只有当该分类所有待办都完成时，logo 才变灰
        const catMap = new Map(); // catId -> { cat, allCompleted }
        for (const t of dayTodos) {
          const catId = t.category || 'event';
          if (!catMap.has(catId)) {
            catMap.set(catId, { cat: getCategoryById(catId), allCompleted: true });
          }
          if (!t.completed) {
            catMap.get(catId).allCompleted = false;
          }
        }

        const uniqueCats = [...catMap.values()];
        const visible = uniqueCats.slice(0, 10);
        const totalCats = uniqueCats.length;

        for (let i = 0; i < visible.length; i++) {
          const { cat, allCompleted } = visible[i];
          const catId = cat?.id || 'event';
          const color = allCompleted ? '#a0a0a0' : getCategoryColor(catId);
          const dot = document.createElement('span');
          dot.classList.add('todo-dot');
          if (allCompleted) dot.classList.add('completed');
          const svg = createIconSVG(cat?.icon || 'calendar',
            'calc(var(--todo-dot-size) + 2px)', color);
          dot.appendChild(svg);
          if (totalCats > 10 && i === visible.length - 1) {
            dot.style.position = 'relative';
            const plus = document.createElement('span');
            plus.className = 'todo-dot-more';
            plus.textContent = '+';
            plus.style.position = 'absolute';
            plus.style.left = '100%';
            plus.style.top = '50%';
            plus.style.transform = 'translateY(-50%)';
            plus.style.marginLeft = '1px';
            dot.appendChild(plus);
          }
          dotsWrap.appendChild(dot);
        }
        cell.appendChild(dotsWrap);
      }
    }

    if (!isOtherMonth) {
      cell.addEventListener('click', () => selectDate(currentYear, currentMonth, solarDay));
      cell.addEventListener('mouseenter', (e) => showDateTooltip(e.currentTarget, currentYear, currentMonth, solarDay, cellLunar));
      cell.addEventListener('mouseleave', hideDateTooltip);
    }

    cell.title = formatDateCN(currentYear, currentMonth, solarDay);
    grid.appendChild(cell);
  }
}

/* --------------- Inline DOM Tooltip --------------- */
let tooltipHideTimer = null;
let currentTooltipKey = null;

function showDateTooltip(anchorEl, y, m, d, lunar) {
  const holiday = getLunarHoliday(lunar) || getSolarHoliday(m, d);
  const header = formatDateCN(y, m, d) + (holiday ? ' · ' + holiday : '');
  const key = dateKey(y, m, d);
  currentTooltipKey = key;
  const dayTodos = todos[key] || [];

  const tooltip = document.getElementById('date-tooltip');
  const tooltipHeader = tooltip.querySelector('.date-tooltip-header');
  const tooltipList = tooltip.querySelector('.date-tooltip-list');

  tooltipHeader.textContent = header;
  tooltipList.innerHTML = '';

  if (dayTodos.length === 0) {
    tooltipList.innerHTML = '<div class="date-tooltip-empty">暂无待办事项</div>';
  } else {
    for (const t of dayTodos) {
      const el = document.createElement('div');
      el.className = 'date-tooltip-item' + (t.completed ? ' completed' : '');
      const catId = t.category || 'event';
      const cat = getCategoryById(catId);
      const catColor = t.completed ? '#a0a0a0' : getCategoryColor(catId);

      el.appendChild(buildCatInfo(cat, 13, 'date-tooltip-cat-info', catColor));
      const text = document.createElement('span');
      text.className = 'date-tooltip-text';
      text.textContent = t.text;
      el.appendChild(text);

      const alpha = t.completed ? ALPHA_BG_COMPLETED : ALPHA_BG;
      el.style.backgroundColor = hexAlpha(getCategoryColor(catId), alpha);
      tooltipList.appendChild(el);
    }
  }

  // Position tooltip near the cell, using cell center as transform-origin
  const appRect = document.getElementById('app').getBoundingClientRect();
  const cellRect = anchorEl.getBoundingClientRect();
  const relX = cellRect.left - appRect.left;
  const relY = cellRect.top - appRect.top;

  // Default placement: to the right of the cell
  let left = relX + cellRect.width + 8;
  let top = relY;

  // Boundary checks within the app container
  const tooltipW = 220;
  const tooltipH = Math.min(180, 30 + dayTodos.length * 22);
  if (left + tooltipW > appRect.width - 8) {
    left = relX - tooltipW - 8;
  }
  if (top + tooltipH > appRect.height - 8) {
    top = appRect.height - tooltipH - 8;
  }
  if (top < 8) top = 8;
  if (left < 8) left = 8;

  // Set transform-origin to the cell center so it appears to grow from the cell
  const originX = relX + cellRect.width / 2 - left;
  const originY = relY + cellRect.height / 2 - top;
  tooltip.style.transformOrigin = `${originX}px ${originY}px`;
  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';

  tooltip.classList.remove('hidden');
  // Force reflow
  void tooltip.offsetWidth;
  tooltip.classList.add('visible');

  if (tooltipHideTimer) {
    clearTimeout(tooltipHideTimer);
    tooltipHideTimer = null;
  }
}

function hideDateTooltip() {
  const tooltip = document.getElementById('date-tooltip');
  if (!tooltip) return;
  tooltip.classList.remove('visible');
  tooltipHideTimer = setTimeout(() => {
    tooltip.classList.add('hidden');
    currentTooltipKey = null;
  }, 250);
}

function navigateMonth(delta) {
  currentMonth += delta;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  } else if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  renderCalendar();
}

function selectDate(y, m, d) {
  openDetailView(y, m, d);
}

/* ================================================================
   TODO MANAGEMENT MODULE
   ================================================================ */

function getSelectedDateKey() {
  if (!selectedDate) return null;
  return dateKey(selectedDate.year, selectedDate.month, selectedDate.day);
}

function getMaxTodoId() {
  let max = 0;
  for (const key in todos) {
    for (const t of todos[key]) {
      if (t.id > max) max = t.id;
    }
  }
  return max;
}

function addTodo(text) {
  const key = getSelectedDateKey();
  if (!key) return;

  if (!todos[key]) todos[key] = [];

  // 获取基准 ID
  const baseId = getMaxTodoId() + 1;
  let idOffset = 0;

  const now = Date.now();
  const baseTodo = {
    text: text.trim(),
    completed: false,
    createdAt: now,
    category: selectedCategory || 'event',
    startTime: pendingStartTime,
    endTime: pendingEndTime
  };

  // 创建当前日期的待办（附带重复信息以便显示）
  const firstTodo = { id: baseId + idOffset, ...baseTodo };
  idOffset++;
  if (pendingRepeat && pendingRepeat.weekdays.length > 0) {
    firstTodo.repeat = {
      weekdays: [...pendingRepeat.weekdays],
      weeks: pendingRepeat.weeks
    };
  }
  todos[key].push(firstTodo);

  // 处理重复：根据选中的星期几在后续周创建待办
  if (pendingRepeat && pendingRepeat.weekdays.length > 0) {
    const baseDate = parseDateKey(key);
    const baseDayOfWeek = new Date(baseDate.year, baseDate.month - 1, baseDate.day).getDay();
    const targetWeekdays = pendingRepeat.weekdays;
    const totalWeeks = pendingRepeat.weeks;
    const currentDate = new Date(baseDate.year, baseDate.month - 1, baseDate.day);

    for (let w = 1; w <= totalWeeks; w++) {
      for (const targetDow of targetWeekdays) {
        if (w === 1 && targetDow === baseDayOfWeek) continue;
        const dayOffset = (w - 1) * 7 + (targetDow - baseDayOfWeek);
        if (dayOffset <= 0) continue;

        const targetDate = new Date(currentDate);
        targetDate.setDate(targetDate.getDate() + dayOffset);

        const targetKey = dateKey(targetDate.getFullYear(), targetDate.getMonth() + 1, targetDate.getDate());
        if (!todos[targetKey]) todos[targetKey] = [];
        todos[targetKey].push({
          id: baseId + idOffset,
          ...baseTodo
        });
        idOffset++;
      }
    }
  }

  // 重置暂存状态
  resetPendingState();
  saveTodos();
  renderCalendar();
}

function toggleTodo(key, id) {
  if (!todos[key]) return;
  const todo = todos[key].find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderCalendar();
  }
}

function deleteTodo(key, id) {
  if (!todos[key]) return;
  todos[key] = todos[key].filter(t => t.id !== id);
  if (todos[key].length === 0) delete todos[key];
  saveTodos();
  renderCalendar();
}

function clearCompleted(key) {
  if (!todos[key]) return;
  todos[key] = todos[key].filter(t => !t.completed);
  if (todos[key].length === 0) delete todos[key];
  saveTodos();
  renderCalendar();
}

async function saveTodos() {
  if (window.electronAPI) {
    await window.electronAPI.saveTodos(todos);
  }
}

async function loadTodos() {
  if (window.electronAPI) {
    todos = await window.electronAPI.getTodos();
  }
  if (!todos || typeof todos !== 'object') todos = {};
}

/* ================================================================
   SETTINGS MANAGEMENT
   ================================================================ */

function applyMonthFontSize(px) {
  document.documentElement.style.setProperty('--month-font-size', px + 'px');
}

function applyYearFontSize(px) {
  document.documentElement.style.setProperty('--year-font-size', px + 'px');
}

function applyDateFontSize(px) {
  document.documentElement.style.setProperty('--date-font-size', px + 'px');
}

function applyLunarFontSize(px) {
  document.documentElement.style.setProperty('--lunar-font-size', px + 'px');
}

function applyWeekdayFontSize(px) {
  document.documentElement.style.setProperty('--weekday-font-size', px + 'px');
}

function applyTodoDotSize(px) {
  document.documentElement.style.setProperty('--todo-dot-size', px + 'px');
}

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name === 'gold' ? '' : name);
  // For gold theme, remove attribute to use default :root values
  if (name === 'gold') document.documentElement.removeAttribute('data-theme');
}

async function loadSettings() {
  if (window.electronAPI) {
    const s = await window.electronAPI.getSettings();

    const textOpacity = (s.textOpacity !== undefined ? s.textOpacity : 1.0);
    applyTextOpacity(Math.round(textOpacity * 100));

    const fontFamily = s.fontFamily || SYSTEM_FONTS[0];
    applyFontFamily(fontFamily);

    const bgImage = s.backgroundImage || '';
    if (bgImage) applyBackgroundImage(bgImage);

    const bgH = s.bgHue !== undefined ? s.bgHue : 0;
    const bgS = s.bgSat !== undefined ? s.bgSat : 0;
    const bgL = s.bgLight !== undefined ? s.bgLight : 96;
    const fgH = s.fgHue !== undefined ? s.fgHue : 0;
    const fgS = s.fgSat !== undefined ? s.fgSat : 0;
    const fgL = s.fgLight !== undefined ? s.fgLight : 12;
    applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
    if (s.categoryColors) categoryColors = s.categoryColors;
    if (s.customCategories) customCategories = s.customCategories;

    applyMonthFontSize(s.monthFontSize || 72);
    applyYearFontSize(s.yearFontSize || 18);
    applyDateFontSize(s.dateFontSize || 22);
    applyWeekdayFontSize(s.weekdayFontSize || 15);
    applyLunarFontSize(s.lunarFontSize || 15);

    document.documentElement.style.setProperty('--todo-dot-color', s.todoDotColor || '#111111');
    applyTodoDotSize(s.todoDotSize || 8);

    if (s.titlebarHidden) applyTitlebarHide(true);

    // C01 要求：启动时不固定到桌面，唔好读取已保存的 isPinned 视觉状态
    // pin 按钮由用户手动点击切换，唔会在启动时自动激活

    // 恢复迷你模式状态（如果上次关闭时处于迷你模式）
    // 需要用 setTimeout 确保 DOM 同 calendar 已经完全渲染
    if (s.isMiniMode && !isMiniMode) {
      setTimeout(() => applyMiniModeUI(), 100);
    }
  }
}

function applyTextOpacity(val) {
  const opacityVal = (val / 100).toFixed(2);
  document.documentElement.style.setProperty('--text-opacity', opacityVal);
}

function applyFontFamily(family) {
  document.body.style.fontFamily = `"${family}", "${SYSTEM_FONTS[0]}", sans-serif`;
}

function applyBackgroundImage(dataUrl) {
  const app = document.getElementById('app');
  if (dataUrl) {
    app.style.backgroundImage = `url(${dataUrl})`;
    app.classList.add('has-bg-image');
  } else {
    app.style.backgroundImage = '';
    app.classList.remove('has-bg-image');
  }
}

/* ================================================================
   PANEL MANAGEMENT (slide-out panels)
   ================================================================ */

async function openPanel(id) {
  const panel = document.getElementById(id);
  const overlay = document.getElementById('panel-overlay');

  if (window.electronAPI && window.electronAPI.panelStateChanged) {
    await window.electronAPI.panelStateChanged({ leftOpen: false, rightOpen: true, leftWidth: 0, rightWidth: 260 });
  }

  panel.classList.remove('hidden');
  void panel.offsetWidth;
  panel.classList.add('open');
  overlay.classList.remove('hidden');

  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });
}

function closePanel(id) {
  const panel = document.getElementById(id);
  const overlay = document.getElementById('panel-overlay');

  panel.classList.remove('open');
  overlay.classList.remove('active');

  setTimeout(() => {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');

    if (window.electronAPI && window.electronAPI.panelStateChanged) {
      window.electronAPI.panelStateChanged({
        leftOpen: false,
        rightOpen: false,
        leftWidth: 0,
        rightWidth: 260
      });
    }
  }, 220);
}

function closeAllPanels() {
  if (document.getElementById('search-panel').classList.contains('open')) closeSearchPanel();
  if (document.getElementById('stats-panel').classList.contains('open')) closeStatsPanel();
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  if (panel.classList.contains('open')) {
    closePanel(id);
  } else {
    if (id === 'search-panel') openSearchPanel();
  }
}

/* ================================================================
   SEARCH PANEL (检索待办)
   ================================================================ */

let searchResults = []; // { key, todo, dateStr }
let selectedSearchItems = new Set(); // Set of 'key|todoId'

function openSearchPanel() {
  // 初始化分类下拉
  const catSelect = document.getElementById('search-category');
  catSelect.innerHTML = '<option value="">全部分类</option>';
  for (const cat of TODO_CATEGORIES) {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.label;
    catSelect.appendChild(opt);
  }
  for (const cat of customCategories) {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.label;
    catSelect.appendChild(opt);
  }

  document.getElementById('search-text').value = '';
  searchResults = [];
  selectedSearchItems = new Set();
  document.getElementById('search-results').innerHTML = '<div class="search-empty">输入关键词或选择分类开始检索</div>';
  document.getElementById('search-batch-bar').classList.add('hidden');

  // 复用现有面板系统，但宽度需要 300
  if (window.electronAPI && window.electronAPI.panelStateChanged) {
    window.electronAPI.panelStateChanged({ leftOpen: false, rightOpen: true, leftWidth: 0, rightWidth: 300 });
  }
  const panel = document.getElementById('search-panel');
  const overlay = document.getElementById('panel-overlay');
  panel.classList.remove('hidden');
  void panel.offsetWidth;
  panel.classList.add('open');
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => { overlay.classList.add('active'); });
}

function closeSearchPanel() {
  const panel = document.getElementById('search-panel');
  const overlay = document.getElementById('panel-overlay');
  panel.classList.remove('open');
  overlay.classList.remove('active');
  setTimeout(() => {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');
    if (window.electronAPI && window.electronAPI.panelStateChanged) {
      window.electronAPI.panelStateChanged({ leftOpen: false, rightOpen: false, leftWidth: 0, rightWidth: 300 });
    }
  }, 220);
}

function performSearch() {
  const catFilter = document.getElementById('search-category').value;
  const textFilter = document.getElementById('search-text').value.trim().toLowerCase();
  const statusFilter = document.getElementById('search-status').value;

  if (!catFilter && !textFilter && !statusFilter) {
    searchResults = [];
    selectedSearchItems = new Set();
    renderSearchResults();
    return;
  }

  searchResults = [];
  selectedSearchItems = new Set();

  for (const key in todos) {
    const dayTodos = todos[key];
    if (!dayTodos || dayTodos.length === 0) continue;
    const { year, month, day } = parseDateKey(key);
    const dateStr = `${month}月${day}日`;
    for (const todo of dayTodos) {
      // 分类筛选
      if (catFilter && todo.category !== catFilter) continue;
      // 文字筛选
      if (textFilter && !todo.text.toLowerCase().includes(textFilter)) continue;
      // 完成状态筛选
      if (statusFilter === 'completed' && !todo.completed) continue;
      if (statusFilter === 'uncompleted' && todo.completed) continue;
      searchResults.push({ key, todo, dateStr });
    }
  }

  // 按日期排序（最近嘅排前面）
  searchResults.sort((a, b) => {
    if (a.key !== b.key) return b.key.localeCompare(a.key);
    // 同日期：有时间嘅排前面
    const aHas = !!(a.todo.startTime || a.todo.endTime);
    const bHas = !!(b.todo.startTime || b.todo.endTime);
    if (aHas !== bHas) return aHas ? -1 : 1;
    if (aHas) return (a.todo.startTime || a.todo.endTime).localeCompare(b.todo.startTime || b.todo.endTime);
    return b.todo.createdAt - a.todo.createdAt;
  });

  renderSearchResults();
}

function renderSearchResults() {
  const container = document.getElementById('search-results');
  const batchBar = document.getElementById('search-batch-bar');
  const countEl = document.getElementById('search-batch-count');

  if (searchResults.length === 0) {
    container.innerHTML = '<div class="search-empty">无匹配结果</div>';
    batchBar.classList.add('hidden');
    return;
  }

  container.innerHTML = '';
  for (const item of searchResults) {
    const uid = `${item.key}|${item.todo.id}`;
    const isSelected = selectedSearchItems.has(uid);
    const cat = getCategoryById(item.todo.category || 'event');
    const catColor = getCategoryColor(item.todo.category || 'event');
    const timeStr = item.todo.startTime
      ? (item.todo.startTime + (item.todo.endTime ? ' - ' + item.todo.endTime : ''))
      : '';

    const el = document.createElement('div');
    el.className = 'search-result-item'
      + (isSelected ? ' selected' : '')
      + (item.todo.completed ? ' completed' : '');
    el.dataset.uid = uid;

    const cb = document.createElement('div');
    cb.className = 'search-result-checkbox';
    el.appendChild(cb);

    const catBadge = document.createElement('span');
    catBadge.className = 'search-result-cat';
    catBadge.textContent = cat?.label || '事件';
    catBadge.style.backgroundColor = hexAlpha(catColor, '33');
    catBadge.style.color = catColor;
    el.appendChild(catBadge);

    const textEl = document.createElement('span');
    textEl.className = 'search-result-text';
    textEl.textContent = item.todo.text;
    textEl.title = item.todo.text;
    el.appendChild(textEl);

    if (timeStr) {
      const timeEl = document.createElement('span');
      timeEl.className = 'search-result-time';
      timeEl.textContent = timeStr;
      el.appendChild(timeEl);
    }

    const dateEl = document.createElement('span');
    dateEl.className = 'search-result-date';
    dateEl.textContent = item.dateStr;
    el.appendChild(dateEl);

    container.appendChild(el);
  }

  // 更新批量操作栏
  batchBar.classList.remove('hidden');
  _updateBatchBarDOM();
}

// 搜索容器事件委托（单击切换选中）
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('search-results');
  if (container) {
    container.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (!item || e.target.closest('button')) return;
      toggleSearchItem(item.dataset.uid, item);
    });
  }
});

function toggleSearchItem(uid, el) {
  if (selectedSearchItems.has(uid)) {
    selectedSearchItems.delete(uid);
    if (el) el.classList.remove('selected');
  } else {
    selectedSearchItems.add(uid);
    if (el) el.classList.add('selected');
  }
  _updateBatchBarDOM();
}

function _updateBatchBarDOM() {
  document.getElementById('search-batch-count').textContent =
    `已选 ${selectedSearchItems.size} / ${searchResults.length}`;
  document.getElementById('search-check-all').checked =
    selectedSearchItems.size === searchResults.length && searchResults.length > 0;
}

function toggleSelectAll() {
  const checkAll = document.getElementById('search-check-all');
  if (checkAll.checked) {
    for (const item of searchResults) {
      selectedSearchItems.add(`${item.key}|${item.todo.id}`);
    }
  } else {
    selectedSearchItems.clear();
  }
  // 原地更新 DOM class，避免全量重建
  const items = document.querySelectorAll('#search-results .search-result-item');
  items.forEach(el => {
    el.classList.toggle('selected', selectedSearchItems.has(el.dataset.uid));
  });
  _updateBatchBarDOM();
}

function batchDeleteSelected() {
  if (selectedSearchItems.size === 0) return;
  if (!confirm(`确认删除 ${selectedSearchItems.size} 个待办事项？此操作不可撤销。`)) return;

  for (const uid of selectedSearchItems) {
    const [key, idStr] = uid.split('|');
    const id = parseInt(idStr);
    if (todos[key]) {
      todos[key] = todos[key].filter(t => t.id !== id);
      if (todos[key].length === 0) delete todos[key];
    }
  }

  saveTodos();
  renderCalendar();
  // 刷新搜索结果（移除已删除项）
  selectedSearchItems.clear();
  performSearch();
}

function batchCompleteSelected() {
  if (selectedSearchItems.size === 0) return;
  // 判断全部已选是否都已完成 → 切换为未完成；否则全部标记为已完成
  let allCompleted = true;
  for (const uid of selectedSearchItems) {
    const [key, idStr] = uid.split('|');
    const id = parseInt(idStr);
    const todo = todos[key]?.find(t => t.id === id);
    if (todo && !todo.completed) { allCompleted = false; break; }
  }
  const newState = !allCompleted;
  for (const uid of selectedSearchItems) {
    const [key, idStr] = uid.split('|');
    const id = parseInt(idStr);
    if (todos[key]) {
      const todo = todos[key].find(t => t.id === id);
      if (todo) todo.completed = newState;
    }
  }
  saveTodos();
  renderCalendar();
  selectedSearchItems.clear();
  performSearch();
}

let pendingBatchCatId = null; // 批量修改暂存分类

function openBatchEditPopup() {
  if (selectedSearchItems.size === 0) return;
  const popup = document.getElementById('batch-edit-popup');
  document.getElementById('batch-edit-count').textContent = selectedSearchItems.size;
  document.getElementById('batch-edit-text').value = '';
  pendingBatchCatId = null;

  // 渲染分类列表
  const list = document.getElementById('batch-category-list');
  list.innerHTML = '';
  for (const cat of TODO_CATEGORIES) {
    list.appendChild(buildBatchCatItem(cat));
  }
  if (customCategories.length > 0) {
    for (const cat of customCategories) {
      list.appendChild(buildBatchCatItem(cat));
    }
  }

  popup.classList.remove('hidden');
  document.getElementById('batch-edit-text').focus();
}

function buildBatchCatItem(cat) {
  const color = getCategoryColor(cat.id);
  const item = document.createElement('div');
  item.className = 'batch-cat-item';
  item.dataset.catId = cat.id;
  item.style.color = color;

  const iconWrap = document.createElement('div');
  iconWrap.className = 'popup-icon-wrap';
  iconWrap.style.background = hexAlpha(color, '14');
  iconWrap.appendChild(createIconSVG(cat.icon, 14, color));
  item.appendChild(iconWrap);

  const label = document.createElement('span');
  label.textContent = cat.label;
  item.appendChild(label);

  item.addEventListener('click', () => {
    // 切换选中分类
    const catList = document.getElementById('batch-category-list');
    const prev = catList.querySelector('.batch-cat-item.selected');
    if (prev) prev.classList.remove('selected');
    if (pendingBatchCatId === cat.id) {
      pendingBatchCatId = null;
    } else {
      item.classList.add('selected');
      pendingBatchCatId = cat.id;
    }
  });
  return item;
}

function applyBatchEdit() {
  const newText = document.getElementById('batch-edit-text').value.trim();
  const newCatId = pendingBatchCatId;

  if (!newText && !newCatId) {
    // 冇任何修改，直接关闭
    document.getElementById('batch-edit-popup').classList.add('hidden');
    return;
  }

  for (const uid of selectedSearchItems) {
    const [key, idStr] = uid.split('|');
    const id = parseInt(idStr);
    if (todos[key]) {
      const todo = todos[key].find(t => t.id === id);
      if (todo) {
        if (newText) todo.text = newText;
        if (newCatId) todo.category = newCatId;
      }
    }
  }

  document.getElementById('batch-edit-popup').classList.add('hidden');
  saveTodos();
  renderCalendar();
  selectedSearchItems.clear();
  performSearch();
}

function closeBatchEditPopup() {
  document.getElementById('batch-edit-popup').classList.add('hidden');
  pendingBatchCatId = null;
}

function toggleSearchPanel() {
  const panel = document.getElementById('search-panel');
  if (panel.classList.contains('open')) {
    closeSearchPanel();
  } else {
    if (document.getElementById('stats-panel').classList.contains('open')) closeStatsPanel();
    openSearchPanel();
  }
}

/* ================================================================
   STATS PANEL (统计窗口)
   ================================================================ */

function openStatsPanel() {
  // 初始化年份下拉（当前年 ±5 年）
  const now = new Date();
  const curYear = now.getFullYear();
  const yearSelect = document.getElementById('stats-year');
  yearSelect.innerHTML = '';
  for (let y = curYear - 5; y <= curYear + 1; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y + '年';
    if (y === curYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }
  document.getElementById('stats-month').value = now.getMonth() + 1;

  const panel = document.getElementById('stats-panel');
  const overlay = document.getElementById('panel-overlay');

  if (window.electronAPI && window.electronAPI.panelStateChanged) {
    window.electronAPI.panelStateChanged({ leftOpen: false, rightOpen: true, leftWidth: 0, rightWidth: 300 });
  }
  panel.classList.remove('hidden');
  void panel.offsetWidth;
  panel.classList.add('open');
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => { overlay.classList.add('active'); });

  renderStats();
}

function closeStatsPanel() {
  const panel = document.getElementById('stats-panel');
  const overlay = document.getElementById('panel-overlay');
  panel.classList.remove('open');
  overlay.classList.remove('active');
  setTimeout(() => {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');
    if (window.electronAPI && window.electronAPI.panelStateChanged) {
      window.electronAPI.panelStateChanged({ leftOpen: false, rightOpen: false, leftWidth: 0, rightWidth: 300 });
    }
  }, 220);
}

function toggleStatsPanel() {
  const panel = document.getElementById('stats-panel');
  if (panel.classList.contains('open')) {
    closeStatsPanel();
  } else {
    if (document.getElementById('search-panel').classList.contains('open')) closeSearchPanel();
    openStatsPanel();
  }
}

function renderStats() {
  const year = parseInt(document.getElementById('stats-year').value);
  const month = document.getElementById('stats-month').value;
  const monthNum = month ? parseInt(month) : null;

  // 统计各分类：{ catId: { total, completed, items: [{text,completed,dateStr,timeStr}] } }
  const stats = {};
  for (const key in todos) {
    const { year: y, month: m, day: d } = parseDateKey(key);
    if (y !== year) continue;
    if (monthNum && m !== monthNum) continue;

    const dayTodos = todos[key];
    if (!dayTodos) continue;
    for (const t of dayTodos) {
      const catId = t.category || 'event';
      if (!stats[catId]) stats[catId] = { total: 0, completed: 0, items: [] };
      stats[catId].total++;
      if (t.completed) stats[catId].completed++;
      stats[catId].items.push({
        text: t.text,
        completed: t.completed,
        timeStr: t.startTime ? (t.startTime + (t.endTime ? ' - ' + t.endTime : '')) : '',
        day: d
      });
    }
  }

  const list = document.getElementById('stats-list');
  const totalRow = document.getElementById('stats-total');

  if (Object.keys(stats).length === 0) {
    list.innerHTML = '<div class="stats-empty">该时段无待办事项</div>';
    totalRow.classList.add('hidden');
    return;
  }

  const sorted = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);

  list.innerHTML = '';
  let grandTotal = 0, grandCompleted = 0;

  for (const [catId, s] of sorted) {
    grandTotal += s.total;
    grandCompleted += s.completed;
    const rate = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
    const cat = getCategoryById(catId);
    const color = getCategoryColor(catId);

    // 主行容器
    const wrapper = document.createElement('div');
    wrapper.className = 'stats-cat-group';

    const row = document.createElement('div');
    row.className = 'stats-row';
    if (rate >= 100) row.classList.add('all-done');

    // 展开/收合箭头
    const toggle = document.createElement('button');
    toggle.className = 'stats-toggle';
    toggle.innerHTML = '▶';
    toggle.title = '展开详情';
    row.appendChild(toggle);

    // 分类名 + 图标
    const catEl = document.createElement('div');
    catEl.className = 'stats-row-cat';
    catEl.style.color = color;
    catEl.appendChild(createIconSVG(cat?.icon || 'calendar', 14, color));
    const label = document.createElement('span');
    label.textContent = cat?.label || '事件';
    catEl.appendChild(label);
    row.appendChild(catEl);

    // 进度条
    const barWrap = document.createElement('div');
    barWrap.className = 'stats-bar-wrap';
    const barFill = document.createElement('div');
    barFill.className = 'stats-bar-fill';
    barFill.style.width = rate + '%';
    barFill.style.backgroundColor = color;
    barWrap.appendChild(barFill);
    row.appendChild(barWrap);

    // 数量
    const countEl = document.createElement('span');
    countEl.className = 'stats-row-count';
    countEl.textContent = `${s.completed}/${s.total}`;
    row.appendChild(countEl);

    // 完成率 — 颜色跟随分类色
    const rateEl = document.createElement('span');
    rateEl.className = 'stats-row-rate';
    rateEl.textContent = rate + '%';
    rateEl.style.color = color;
    if (rate >= 100) {
      rateEl.classList.add('rate-full');
      // 100% 高亮背景用该分类颜色
      row.style.setProperty('--highlight-color', color);
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('viewBox', '0 0 24 24');
      star.setAttribute('width', '15');
      star.setAttribute('height', '15');
      star.style.fill = '#f59e0b';
      star.style.marginLeft = '2px';
      star.style.flexShrink = '0';
      star.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
      rateEl.appendChild(star);
    }
    row.appendChild(rateEl);

    wrapper.appendChild(row);

    // 详情子列表（默认隐藏）— 按文字合并同名事项
    const detail = document.createElement('div');
    detail.className = 'stats-detail hidden';

    // 按 text 合并：{ text: { total, completed, times: [], days: [] } }
    const merged = {};
    for (const item of s.items) {
      const key = item.text;
      if (!merged[key]) merged[key] = { total: 0, completed: 0 };
      merged[key].total++;
      if (item.completed) merged[key].completed++;
    }

    const mergedList = Object.entries(merged).sort((a, b) => {
      if (a[1].completed !== b[1].completed) return a[1].completed ? 1 : -1;
      return b[1].total - a[1].total;
    });

    for (const [text, m] of mergedList) {
      const mRate = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0;
      const mCompleted = m.completed === m.total;

      const di = document.createElement('div');
      di.className = 'stats-detail-item' + (mCompleted ? ' completed' : '');
      di.style.color = color;

      const dot = document.createElement('span');
      dot.className = 'stats-detail-dot';
      dot.style.backgroundColor = mCompleted ? '#9e9e9e' : color;
      di.appendChild(dot);

      const txt = document.createElement('span');
      txt.className = 'stats-detail-text';
      txt.textContent = text + (m.total > 1 ? ` (×${m.total})` : '');
      di.appendChild(txt);

      const itemRate = document.createElement('span');
      itemRate.className = 'stats-detail-rate';
      itemRate.textContent = mRate + '%';
      di.appendChild(itemRate);

      const cnt = document.createElement('span');
      cnt.className = 'stats-detail-count';
      cnt.textContent = `${m.completed}/${m.total}`;
      di.appendChild(cnt);

      detail.appendChild(di);
    }
    wrapper.appendChild(detail);

    // 点击箭头或行切换展开
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !detail.classList.contains('hidden');
      detail.classList.toggle('hidden', isOpen);
      toggle.textContent = isOpen ? '▶' : '▼';
      toggle.title = isOpen ? '展开详情' : '收起详情';
    });

    list.appendChild(wrapper);
  }

  // 合计行
  const totalRate = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;
  document.getElementById('stats-total-count').textContent = `${grandCompleted}/${grandTotal}`;
  document.getElementById('stats-total-rate').textContent = totalRate + '%';
  totalRow.classList.remove('hidden');
}

/* ================================================================
   EVENT HANDLERS & INITIALIZATION
   ================================================================ */

/* --- Mini Mode --- */

let isMiniMode = false;
let miniFirstHover = false;

// 仅应用迷你模式 UI（CSS class + 视图切换），唔触发 IPC
// 用于启动时恢复迷你模式状态
function applyMiniModeUI() {
  const app = document.getElementById('app');
  const btn = document.getElementById('mini-mode-btn');
  const miniView = document.getElementById('mini-view');
  const icon = document.getElementById('mini-calendar-icon');

  isMiniMode = true;
  miniFirstHover = true;
  app.classList.add('mini-mode');
  btn.classList.add('active');
  miniView.classList.remove('hidden');
  miniView.style.display = 'flex';
  icon.classList.remove('expanded');
  app.classList.remove('mini-expanded');
  updateMiniView();
}

async function toggleMiniMode() {
  if (window.electronAPI && window.electronAPI.toggleMiniMode) {
    const app = document.getElementById('app');
    const btn = document.getElementById('mini-mode-btn');

    // Immediately hide all panels without animation
    // 关闭所有面板
    const overlay = document.getElementById('panel-overlay');
    overlay.classList.remove('active');
    overlay.classList.add('hidden');

    // Close detail view immediately
    const dv = document.getElementById('detail-view');
    if (!dv.classList.contains('hidden')) {
      dv.classList.add('hidden');
      dv.classList.remove('detail-exit');
    }

    // Restore window bounds before entering mini mode
    if (window.electronAPI.panelStateChanged) {
      await window.electronAPI.panelStateChanged({
        leftOpen: false, rightOpen: false, leftWidth: 280, rightWidth: 260
      });
    }
    // Small delay to let main process finish bounds restore
    await new Promise(r => setTimeout(r, 50));

    const inMini = await window.electronAPI.toggleMiniMode();

    if (inMini) {
      applyMiniModeUI();
    } else {
      app.classList.remove('mini-mode');
      btn.classList.remove('active');
      // Restore mini-view layout styles and hide it
      const miniView = document.getElementById('mini-view');
      miniView.classList.add('hidden');
      miniView.style.display = 'none';
      miniView.style.alignItems = '';
      miniView.style.justifyContent = '';
      miniView.style.padding = '';
      // Collapse any expanded preview state
      const icon = document.getElementById('mini-calendar-icon');
      icon.classList.remove('expanded');
      app.classList.remove('mini-expanded');
      // Clear preview list to prevent layout leakage on next entry
      const listEl = icon.querySelector('.mini-preview-list');
      if (listEl) listEl.innerHTML = '';
      // Restore calendar view in case detail view was open before mini mode
      document.getElementById('calendar-header').style.display = '';
      document.getElementById('weekday-header').style.display = '';
      document.getElementById('calendar-grid').style.display = '';
      document.getElementById('btn-prev-month').style.display = '';
      document.getElementById('btn-next-month').style.display = '';
      document.getElementById('mini-mode-btn').style.display = '';
      document.getElementById('settings-float-btn').style.display = '';
      renderCalendar();
    }
    isMiniMode = inMini;
  }
}

function updateMiniView() {
  const today = getToday();
  const d = new Date(today.year, today.month - 1, today.day);
  document.getElementById('mini-month').textContent = MONTH_NAMES_EN[today.month - 1].slice(0, 3);
  document.getElementById('mini-day').textContent = today.day;
  document.getElementById('mini-weekday').textContent = '周' + WEEKDAY_NAMES_CN[d.getDay()];
  document.getElementById('mini-weekday-en').textContent = WEEKDAY_NAMES_EN[d.getDay()];
}

function expandMiniPreview() {
  const icon = document.getElementById('mini-calendar-icon');
  const today = getToday();
  const lunar = solarToLunar(today.year, today.month, today.day);
  const key = dateKey(today.year, today.month, today.day);
  const dayTodos = todos[key] || [];
  const holiday = getLunarHoliday(lunar) || getSolarHoliday(today.month, today.day);
  const lunarDisplay = getLunarDateDisplay(lunar);

  // Populate subheader: holiday only (no weekday / lunar)
  const subEl = icon.querySelector('.mini-preview-subheader');
  subEl.textContent = holiday || '';

  // Populate preview list
  const listEl = icon.querySelector('.mini-preview-list');
  listEl.innerHTML = '';
  if (dayTodos.length === 0) {
    listEl.innerHTML = '<div class="mini-preview-empty">今日暂无待办<br>点击此处添加</div>';
  } else {
    const sorted = sortTodosByTime(dayTodos);
    for (const t of sorted) {
      const item = document.createElement('div');
      item.className = 'mini-preview-item' + (t.completed ? ' completed' : '');
      const catId = t.category || 'event';
      const cat = getCategoryById(catId);
      const catColor = t.completed ? '#a0a0a0' : getCategoryColor(catId);

      item.appendChild(buildCatInfo(cat, 14, 'mini-preview-cat-info', catColor));
      const text = document.createElement('span');
      text.className = 'mini-preview-text';
      text.textContent = t.text;
      item.appendChild(text);

      const alpha = t.completed ? ALPHA_BG_COMPLETED : ALPHA_BG;
      item.style.backgroundColor = hexAlpha(getCategoryColor(catId), alpha);
      listEl.appendChild(item);
    }
  }

  // Expand window to fit preview content, then let icon fill it
  if (window.electronAPI && window.electronAPI.setMiniExpanded) {
    window.electronAPI.setMiniExpanded({ expanded: true, width: 380, height: 460 });
  }

  // Let icon become the window itself — app recedes
  document.getElementById('app').classList.add('mini-expanded');
  icon.classList.add('expanded');
}

function collapseMiniPreview() {
  const icon = document.getElementById('mini-calendar-icon');
  icon.classList.remove('expanded');

  // Wait for CSS shrink animation to finish, then restore app frame + shrink window
  setTimeout(() => {
    document.getElementById('app').classList.remove('mini-expanded');
    if (window.electronAPI && window.electronAPI.setMiniExpanded) {
      window.electronAPI.setMiniExpanded({ expanded: false });
    }
    // Clear preview content after collapse so it doesn't leak into next mini-mode entry
    const listEl = icon.querySelector('.mini-preview-list');
    if (listEl) listEl.innerHTML = '';
    const subEl = icon.querySelector('.mini-preview-subheader');
    if (subEl) subEl.textContent = '';
  }, 420);
}

/* --- Detail View --- */

let detailKey = null;
let pendingStartTime = null; // 'HH:mm' or null
let pendingEndTime = null;   // 'HH:mm' or null
let pendingRepeat = null;    // { weekdays: number[], weeks: number } or null

function resetPendingState() {
  pendingStartTime = null;
  pendingEndTime = null;
  pendingRepeat = null;
  updateTimePickUI();
  updateRepeatBtnUI();
}

function updateTimePickUI() {
  const pick = document.getElementById('detail-time-pick');
  if (!pick) return;
  if (pendingStartTime || pendingEndTime) {
    pick.classList.add('has-time');
    pick.title = pendingStartTime && pendingEndTime
      ? `${pendingStartTime} - ${pendingEndTime}`
      : pendingStartTime ? `开始 ${pendingStartTime}` : `结束 ${pendingEndTime}`;
  } else {
    pick.classList.remove('has-time');
    pick.title = '设置时间（可选）';
  }
}

function updateRepeatBtnUI() {
  const btn = document.getElementById('btn-detail-repeat');
  if (!btn) return;
  if (pendingRepeat && pendingRepeat.weekdays.length > 0) {
    btn.classList.add('has-repeat');
    const days = pendingRepeat.weekdays.map(d => WEEKDAY_NAMES_CN[d]).join('、');
    btn.title = `重复：每${days}，共${pendingRepeat.weeks}周`;
  } else {
    btn.classList.remove('has-repeat');
    btn.title = '重复事项';
  }
}

/* --- Time Picker --- */

function openTimePicker() {
  const popup = document.getElementById('time-picker-popup');
  if (!popup) return;
  document.getElementById('time-start').value = pendingStartTime || '';
  document.getElementById('time-end').value = pendingEndTime || '';
  document.getElementById('time-error').classList.add('hidden');
  popup.classList.remove('hidden');
}

function closeTimePicker() {
  document.getElementById('time-picker-popup').classList.add('hidden');
}

function confirmTimePicker() {
  const start = document.getElementById('time-start').value || null;
  const end = document.getElementById('time-end').value || null;
  if (start && end && start > end) {
    document.getElementById('time-error').classList.remove('hidden');
    return;
  }
  document.getElementById('time-error').classList.add('hidden');
  pendingStartTime = start;
  pendingEndTime = end;
  updateTimePickUI();
  closeTimePicker();
}

function clearTimePicker() {
  document.getElementById('time-start').value = '';
  document.getElementById('time-end').value = '';
  document.getElementById('time-error').classList.add('hidden');
  pendingStartTime = null;
  pendingEndTime = null;
  updateTimePickUI();
  closeTimePicker();
}

/* --- Repeat Popup --- */

function openRepeatPopup() {
  const popup = document.getElementById('repeat-popup');
  if (!popup) return;
  // 恢复已保存的重复设定
  if (pendingRepeat) {
    document.getElementById('repeat-weeks').value = pendingRepeat.weeks;
    const checks = document.querySelectorAll('#repeat-weekdays input[type=checkbox]');
    checks.forEach(cb => {
      cb.checked = pendingRepeat.weekdays.includes(parseInt(cb.value));
    });
  } else {
    document.getElementById('repeat-weeks').value = 4;
    const checks = document.querySelectorAll('#repeat-weekdays input[type=checkbox]');
    checks.forEach(cb => { cb.checked = false; });
  }
  popup.classList.remove('hidden');
}

function closeRepeatPopup() {
  document.getElementById('repeat-popup').classList.add('hidden');
}

function confirmRepeat() {
  const checks = document.querySelectorAll('#repeat-weekdays input[type=checkbox]:checked');
  const weekdays = Array.from(checks).map(cb => parseInt(cb.value));
  const weeks = parseInt(document.getElementById('repeat-weeks').value) || 1;

  if (weekdays.length === 0) {
    pendingRepeat = null;
  } else {
    pendingRepeat = {
      weekdays: weekdays.sort((a, b) => a - b),
      weeks: Math.max(1, Math.min(52, weeks))
    };
  }
  updateRepeatBtnUI();
  closeRepeatPopup();
}

function openDetailView(y, m, d) {
  hideDateTooltip();
  selectedDate = { year: y, month: m, day: d };
  detailKey = dateKey(y, m, d);
  selectedCategory = 'event';
  resetPendingState();
  closeAllPanels();
  renderCalendar();
  renderCategorySelector();
  document.getElementById('detail-view').classList.remove('hidden');
  // Hide calendar navigation
  document.getElementById('calendar-header').style.display = 'none';
  document.getElementById('weekday-header').style.display = 'none';
  document.getElementById('calendar-grid').style.display = 'none';
  document.getElementById('btn-prev-month').style.display = 'none';
  document.getElementById('btn-next-month').style.display = 'none';
  // Hide floating buttons in detail view
  document.getElementById('mini-mode-btn').style.display = 'none';
  document.getElementById('settings-float-btn').style.display = 'none';
  renderDetailTodos();
}

function closeDetailView() {
  const dv = document.getElementById('detail-view');
  closeCategoryPopup();
  dv.classList.add('detail-exit');
  setTimeout(() => {
    dv.classList.add('hidden');
    dv.classList.remove('detail-exit');
    document.getElementById('calendar-header').style.display = '';
    document.getElementById('weekday-header').style.display = '';
    document.getElementById('calendar-grid').style.display = '';
    document.getElementById('btn-prev-month').style.display = '';
    document.getElementById('btn-next-month').style.display = '';
    // Restore floating buttons
    document.getElementById('mini-mode-btn').style.display = '';
    document.getElementById('settings-float-btn').style.display = '';
    renderCalendar();
  }, 200);
}

function getCategoryById(catId) {
  if (!catId) return TODO_CATEGORIES[0];
  return TODO_CATEGORIES.find(c => c.id === catId)
    || customCategories.find(c => c.id === catId);
}

function getCategoryColor(catId) {
  if (!catId) return TODO_CATEGORIES[0].color;
  return (categoryColors && categoryColors[catId])
    || getCategoryById(catId)?.color
    || TODO_CATEGORIES[0].color;
}

function getCategoryIcon(catId) {
  if (!catId) return 'calendar';
  return getCategoryById(catId)?.icon || 'calendar';
}

function hexAlpha(color, alphaHex) {
  return color + alphaHex;
}

function buildCatInfo(cat, iconSize, containerClass, catColor, labelColor) {
  const catInfo = document.createElement('div');
  catInfo.className = containerClass;
  const catIcon = createIconSVG(cat?.icon || 'calendar', iconSize, catColor);
  const catLabel = document.createElement('span');
  catLabel.textContent = cat?.label || '事件';
  if (labelColor) catLabel.style.color = labelColor;
  catInfo.appendChild(catIcon);
  catInfo.appendChild(catLabel);
  return catInfo;
}

function createIconSVG(iconKey, size, color) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.style.fill = color;
  svg.style.stroke = 'rgba(0,0,0,0.08)';
  svg.style.strokeWidth = '0.5';
  svg.innerHTML = ICON_SVGS[iconKey] || ICON_SVGS.calendar;
  return svg;
}

function renderCategorySelector() {
  const container = document.getElementById('detail-category-pick');
  if (!container) return;
  container.innerHTML = '';

  const catId = selectedCategory || 'event';
  const cat = getCategoryById(catId) || TODO_CATEGORIES[0];

  const btn = document.createElement('div');
  btn.className = 'category-trigger';
  btn.title = cat.label;
  btn.style.borderColor = getCategoryColor(catId);

  const svg = createIconSVG(cat.icon, 20, getCategoryColor(catId));
  btn.appendChild(svg);
  btn.addEventListener('click', openCategoryPopup);
  container.appendChild(btn);

  const label = document.createElement('span');
  label.className = 'category-trigger-label';
  label.textContent = cat.label;
  label.style.color = getCategoryColor(catId);
  container.appendChild(label);
}

function buildCategoryPopupItem(cat, isCustom) {
  const color = getCategoryColor(cat.id);
  const item = document.createElement('div');
  item.className = 'category-popup-item' + (selectedCategory === cat.id ? ' selected' : '');

  const iconWrap = document.createElement('div');
  iconWrap.className = 'popup-icon-wrap';
  iconWrap.style.background = hexAlpha(color, '14');
  const iconSvg = createIconSVG(cat.icon, 18, color);
  iconWrap.appendChild(iconSvg);
  item.appendChild(iconWrap);

  const label = document.createElement('span');
  label.className = 'popup-label';
  label.textContent = cat.label;
  item.appendChild(label);

  // Color dot — for both predefined and custom categories
  const colorDot = document.createElement('span');
  colorDot.className = 'popup-color';
  colorDot.style.backgroundColor = color;
  colorDot.title = '修改颜色';
  colorDot.addEventListener('click', (e) => {
    e.stopPropagation();
    const input = document.createElement('input');
    input.type = 'color'; input.value = color;
    input.style.position = 'fixed'; input.style.visibility = 'hidden';
    document.body.appendChild(input);
    input.addEventListener('change', () => {
      if (isCustom) {
        const idx = customCategories.findIndex(c => c.id === cat.id);
        if (idx !== -1) {
          customCategories[idx].color = input.value;
          if (window.electronAPI) {
            window.electronAPI.saveSettings({ customCategories: [...customCategories] });
          }
        }
      } else {
        categoryColors[cat.id] = input.value;
        if (window.electronAPI) {
          window.electronAPI.saveSettings({ categoryColors: { ...categoryColors } });
        }
      }
      renderCategorySelector();
      renderDetailTodos();
      renderCalendar();
      if (document.body.contains(input)) document.body.removeChild(input);
    });
    input.addEventListener('blur', () => { if (document.body.contains(input)) document.body.removeChild(input); });
    input.addEventListener('keydown', (e2) => {
      if (e2.key === 'Escape' && document.body.contains(input)) document.body.removeChild(input);
    });
    input.click();
  });
  item.appendChild(colorDot);

  if (isCustom) {
    const delBtn = document.createElement('span');
    delBtn.className = 'popup-delete';
    delBtn.textContent = '✕';
    delBtn.title = '删除分类';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      customCategories = customCategories.filter(c => c.id !== cat.id);
      if (selectedCategory === cat.id) {
        selectedCategory = 'event';
        renderCategorySelector();
      }
      if (window.electronAPI) {
        window.electronAPI.saveSettings({ customCategories: [...customCategories] });
      }
      renderCalendar();
      renderDetailTodos();
      openCategoryPopup();
    });
    item.appendChild(delBtn);
  }

  item.addEventListener('click', () => {
    selectedCategory = cat.id;
    renderCategorySelector();
    closeCategoryPopup();
  });
  return item;
}

function openCategoryPopup() {
  const popup = document.getElementById('category-popup');
  const list = document.getElementById('category-popup-list');
  if (!popup || !list) return;
  list.innerHTML = '';

  for (const cat of TODO_CATEGORIES) {
    list.appendChild(buildCategoryPopupItem(cat, false));
  }

  if (customCategories.length > 0) {
    const sep = document.createElement('div');
    sep.className = 'category-popup-sep';
    list.appendChild(sep);
    for (const cat of customCategories) {
      list.appendChild(buildCategoryPopupItem(cat, true));
    }
  }

  const addItem = document.createElement('div');
  addItem.className = 'category-popup-item category-popup-add';
  addItem.innerHTML = '<span class="popup-add-icon">+</span><span class="popup-label">添加自定义分类</span>';
  addItem.addEventListener('click', openCustomCategoryPopup);
  list.appendChild(addItem);

  popup.classList.remove('hidden');
}

function closeCategoryPopup() {
  const popup = document.getElementById('category-popup');
  if (popup) popup.classList.add('hidden');
}

/* --- Custom Category Popup --- */
let customCatSelectedIcon = null;

function openCustomCategoryPopup() {
  closeCategoryPopup();
  const popup = document.getElementById('custom-category-popup');
  const input = document.getElementById('custom-cat-name');
  const grid = document.getElementById('custom-cat-icons');
  const colorInput = document.getElementById('custom-cat-color');
  const colorHex = document.getElementById('custom-cat-color-hex');
  if (!popup || !grid) return;

  input.value = '';
  customCatSelectedIcon = null;
  grid.innerHTML = '';

  // Default color from cycle
  const colorIndex = customCategories.length % CUSTOM_CATEGORY_COLORS.length;
  const defaultColor = CUSTOM_CATEGORY_COLORS[colorIndex];
  if (colorInput) {
    colorInput.value = defaultColor;
    if (colorHex) colorHex.textContent = defaultColor;
  }

  const iconKeys = Object.keys(ICON_SVGS);
  for (const key of iconKeys) {
    const item = document.createElement('div');
    item.className = 'icon-grid-item';
    item.dataset.icon = key;
    const svg = createIconSVG(key, 20, 'var(--text-secondary)');
    item.appendChild(svg);
    item.addEventListener('click', () => {
      customCatSelectedIcon = key;
      grid.querySelectorAll('.icon-grid-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
    });
    grid.appendChild(item);
  }

  popup.classList.remove('hidden');
  input.focus();
}

function closeCustomCategoryPopup() {
  const popup = document.getElementById('custom-category-popup');
  if (popup) popup.classList.add('hidden');
}

function saveCustomCategory() {
  const input = document.getElementById('custom-cat-name');
  const name = input.value.trim();
  if (!name) return;
  if (!customCatSelectedIcon) customCatSelectedIcon = 'calendar';

  const colorInput = document.getElementById('custom-cat-color');
  const chosenColor = colorInput ? colorInput.value : CUSTOM_CATEGORY_COLORS[customCategories.length % CUSTOM_CATEGORY_COLORS.length];

  const newCat = {
    id: 'custom-' + Date.now(),
    label: name,
    icon: customCatSelectedIcon,
    color: chosenColor
  };
  customCategories.push(newCat);

  if (window.electronAPI) {
    window.electronAPI.saveSettings({ customCategories: [...customCategories] });
  }

  selectedCategory = newCat.id;
  renderCategorySelector();
  closeCustomCategoryPopup();
}

function renderDetailTodos() {
  const list = document.getElementById('detail-todo-list');
  const dateLabel = document.getElementById('detail-date-label');
  const lunarLabel = document.getElementById('detail-lunar-label');
  const countEl = document.getElementById('detail-todo-count');
  const editRow = document.getElementById('detail-todo-edit-row');

  editRow.classList.add('hidden');

  if (!selectedDate) { list.innerHTML = '<div class="detail-empty">请选择日期</div>'; return; }

  const lunar = solarToLunar(selectedDate.year, selectedDate.month, selectedDate.day);
  dateLabel.textContent = formatDateCN(selectedDate.year, selectedDate.month, selectedDate.day);
  const holidayLabel = getLunarHoliday(lunar) || getSolarHoliday(selectedDate.month, selectedDate.day);
  lunarLabel.textContent = holidayLabel || getLunarDateDisplay(lunar);
  if (holidayLabel) lunarLabel.style.fontWeight = '600';
  else lunarLabel.style.fontWeight = '';

  const key = getSelectedDateKey();
  const dayTodos = todos[key] || [];
  const total = dayTodos.length;
  const completed = dayTodos.filter(t => t.completed).length;
  countEl.textContent = total > 0 ? `${total - completed} 待办 / ${completed} 已完成` : '';

  if (dayTodos.length === 0) {
    list.innerHTML = '<div class="detail-empty">暂无待办事项<br>在下方输入框中添加</div>';
    return;
  }

  const sorted = sortTodosByTime(dayTodos);

  list.innerHTML = '';
  for (const todo of sorted) {
    const item = document.createElement('div');
    item.classList.add('todo-item');
    item.dataset.todoId = String(todo.id);
    if (todo.completed) item.classList.add('completed');

    const catId = todo.category || 'event';
    const cat = getCategoryById(catId);
    const isCompleted = todo.completed;
    const catColor = isCompleted ? '#a0a0a0' : getCategoryColor(catId);

    // Category background color
    item.style.backgroundColor = hexAlpha(catColor, ALPHA_BG);
    if (isCompleted) {
      item.style.opacity = '0.5';
    }

    item.appendChild(buildCatInfo(cat, 14, 'todo-cat-info', catColor, catColor));

    const checkbox = document.createElement('span');
    checkbox.classList.add('todo-checkbox');
    checkbox.addEventListener('click', () => {
      toggleTodo(key, todo.id);
      renderDetailTodos();
      renderCalendar();
    });

    const text = document.createElement('span');
    text.classList.add('todo-text');
    text.textContent = todo.text;

    item.addEventListener('dblclick', (e) => {
      if (e.target === checkbox || e.target.classList.contains('todo-delete')) return;
      startDetailEdit(key, todo.id);
    });

    const delBtn = document.createElement('button');
    delBtn.classList.add('todo-delete');
    delBtn.textContent = '✕';
    delBtn.title = '删除';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(key, todo.id);
      renderDetailTodos();
      renderCalendar();
    });

    item.appendChild(checkbox);
    item.appendChild(text);

    // 时间标记
    if (todo.startTime || todo.endTime) {
      const timeBadge = document.createElement('span');
      timeBadge.classList.add('todo-time-badge');
      const s = todo.startTime || '--:--';
      const e = todo.endTime || '--:--';
      timeBadge.textContent = `${s} - ${e}`;
      item.appendChild(timeBadge);
    }

    // 重复标记（显示在待办列表中，唔会喺详情重新渲染时重新读取 pending 数据）
    // repeat 数据已嵌入 todo 对象，所以呢度唔需要额外处理
    // 但如果想标示「呢个系重复事项」，可以检查 todo 是否有 repeat 属性
    if (todo.repeat) {
      const repeatBadge = document.createElement('span');
      repeatBadge.classList.add('todo-repeat-badge');
      const days = todo.repeat.weekdays.map(d => WEEKDAY_NAMES_CN[d]).join('');
      repeatBadge.textContent = `↻${days}×${todo.repeat.weeks}`;
      repeatBadge.title = `每${days}重复，共${todo.repeat.weeks}周`;
      item.appendChild(repeatBadge);
    }

    item.appendChild(delBtn);
    list.appendChild(item);
  }
}

/* --- Detail edit functions --- */

function startDetailEdit(key, id) {
  const todo = todos[key].find(t => t.id === id);
  if (!todo) return;

  const list = document.getElementById('detail-todo-list');
  const editRow = document.getElementById('detail-todo-edit-row');
  const editInput = document.getElementById('detail-todo-edit-input');

  const items = list.querySelectorAll('.todo-item');
  for (const item of items) {
    if (item.dataset.todoId === String(id)) {
      item.classList.add('editing');
      break;
    }
  }

  editInput.value = todo.text;
  editInput.dataset.editKey = key;
  editInput.dataset.editId = String(id);
  editRow.classList.remove('hidden');
  editInput.focus();
  editInput.select();
}

function saveDetailEdit() {
  const editInput = document.getElementById('detail-todo-edit-input');
  const editRow = document.getElementById('detail-todo-edit-row');
  const key = editInput.dataset.editKey;
  const id = parseInt(editInput.dataset.editId);
  const newText = editInput.value.trim();

  editRow.classList.add('hidden');
  delete editInput.dataset.editKey;
  delete editInput.dataset.editId;

  const list = document.getElementById('detail-todo-list');
  const items = list.querySelectorAll('.todo-item');
  for (const item of items) item.classList.remove('editing');

  if (!newText || !todos[key]) return;
  const todo = todos[key].find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    saveTodos();
    renderDetailTodos();
  }
}

function cancelDetailEdit() {
  const editRow = document.getElementById('detail-todo-edit-row');
  const editInput = document.getElementById('detail-todo-edit-input');
  editRow.classList.add('hidden');
  delete editInput.dataset.editKey;
  delete editInput.dataset.editId;

  const list = document.getElementById('detail-todo-list');
  const items = list.querySelectorAll('.todo-item');
  for (const item of items) item.classList.remove('editing');
}

/* ================================================================
   EVENT HANDLERS & INITIALIZATION
   ================================================================ */

function init() {
  const today = getToday();
  currentYear = today.year;
  currentMonth = today.month;

  document.getElementById('btn-prev-month').addEventListener('click', () => navigateMonth(-1));
  document.getElementById('btn-next-month').addEventListener('click', () => navigateMonth(1));
  document.getElementById('btn-today').addEventListener('click', () => {
    const t = getToday();
    currentYear = t.year;
    currentMonth = t.month;
    selectedDate = { year: t.year, month: t.month, day: t.day };
    renderCalendar();
  });

  document.getElementById('settings-float-btn').addEventListener('click', () => {
    if (window.electronAPI) {
      window.electronAPI.openSettings();
    }
  });

  // Window maximize / restore state for border-radius
  if (window.electronAPI && window.electronAPI.onWindowState) {
    window.electronAPI.onWindowState((state) => {
      document.getElementById('app').classList.toggle('maximized', state === 'maximized');
    });
  }

  // Mini mode
  document.getElementById('mini-mode-btn').addEventListener('click', toggleMiniMode);
  // Mini view drag logic — JavaScript-driven so the whole mini window is draggable
  const miniDragState = {
    active: false,
    hasMoved: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    suppressClick: false
  };
  const miniView = document.getElementById('mini-view');
  miniView.addEventListener('mousedown', (e) => {
    if (!isMiniMode) return;
    if (e.button !== 0) return;
    miniDragState.active = true;
    miniDragState.hasMoved = false;
    miniDragState.startX = e.screenX;
    miniDragState.startY = e.screenY;
    miniDragState.lastX = e.screenX;
    miniDragState.lastY = e.screenY;
    miniDragState.suppressClick = false;
  });
  window.addEventListener('mousemove', (e) => {
    if (!miniDragState.active) return;
    const dx = e.screenX - miniDragState.startX;
    const dy = e.screenY - miniDragState.startY;
    if (!miniDragState.hasMoved) {
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        miniDragState.hasMoved = true;
      } else {
        return;
      }
    }
    const moveX = e.screenX - miniDragState.lastX;
    const moveY = e.screenY - miniDragState.lastY;
    miniDragState.lastX = e.screenX;
    miniDragState.lastY = e.screenY;
    if (window.electronAPI && window.electronAPI.moveWindowBy) {
      window.electronAPI.moveWindowBy(Math.round(moveX), Math.round(moveY));
    }
  });
  window.addEventListener('mouseup', () => {
    if (!miniDragState.active) return;
    if (miniDragState.hasMoved) {
      miniDragState.suppressClick = true;
    } else {
      // Treat as a click: toggle mini mode when clicking the unexpanded icon
      const icon = document.getElementById('mini-calendar-icon');
      if (!icon.classList.contains('expanded')) {
        toggleMiniMode();
      }
    }
    miniDragState.active = false;
  });
  // Capture click to suppress it after a drag
  miniView.addEventListener('click', (e) => {
    if (miniDragState.suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      miniDragState.suppressClick = false;
    }
  }, true);

  // Mini mode — expand icon into preview on hover
  let miniExpandTimer = null;
  let miniCollapseTimer = null;
  const miniCalendarIcon = document.getElementById('mini-calendar-icon');
  miniCalendarIcon.addEventListener('mouseenter', () => {
    if (miniFirstHover) {
      miniFirstHover = false;
      return;
    }
    if (miniCollapseTimer) { clearTimeout(miniCollapseTimer); miniCollapseTimer = null; }
    if (miniCalendarIcon.classList.contains('expanded')) return;
    miniExpandTimer = setTimeout(() => {
      expandMiniPreview();
      miniExpandTimer = null;
    }, 1000);
  });
  miniCalendarIcon.addEventListener('mouseleave', () => {
    if (miniExpandTimer) { clearTimeout(miniExpandTimer); miniExpandTimer = null; }
    if (!miniCalendarIcon.classList.contains('expanded')) return;
    miniCollapseTimer = setTimeout(() => {
      if (miniDragState.active) return;
      collapseMiniPreview();
      miniCollapseTimer = null;
    }, 1000);
  });

  // Mini preview click → open detail view for today
  miniCalendarIcon.addEventListener('click', (e) => {
    if (!miniCalendarIcon.classList.contains('expanded')) return;
    e.stopPropagation();
    collapseMiniPreview();
    const today = getToday();
    toggleMiniMode().then(() => {
      openDetailView(today.year, today.month, today.day);
    });
  });

  // Listen for inline tooltip clicks to open detail view
  const dateTooltipEl = document.getElementById('date-tooltip');
  dateTooltipEl.addEventListener('click', () => {
    const key = currentTooltipKey;
    if (!key) return;
    hideDateTooltip();
    if (isMiniMode) {
      toggleMiniMode().then(() => {
        const { year, month, day } = parseDateKey(key);
        openDetailView(year, month, day);
      });
    } else {
      const { year, month, day } = parseDateKey(key);
      openDetailView(year, month, day);
    }
  });
  dateTooltipEl.addEventListener('mouseenter', () => {
    if (tooltipHideTimer) { clearTimeout(tooltipHideTimer); tooltipHideTimer = null; }
  });
  dateTooltipEl.addEventListener('mouseleave', () => {
    hideDateTooltip();
  });

  // Detail view
  document.getElementById('btn-detail-back').addEventListener('click', closeDetailView);
  document.getElementById('btn-detail-save').addEventListener('click', () => {
    const input = document.getElementById('detail-todo-input');
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
      renderDetailTodos();
    }
  });
  document.getElementById('detail-todo-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-detail-save').click();
    else if (e.key === 'Escape') { document.getElementById('detail-todo-input').value = ''; }
  });
  document.getElementById('btn-detail-save-edit').addEventListener('click', saveDetailEdit);
  document.getElementById('btn-detail-cancel-edit').addEventListener('click', cancelDetailEdit);
  document.getElementById('detail-todo-edit-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-detail-save-edit').click();
    else if (e.key === 'Escape') document.getElementById('btn-detail-cancel-edit').click();
  });

  // 时间选择器
  document.getElementById('detail-time-pick').addEventListener('click', openTimePicker);
  document.getElementById('time-picker-backdrop').addEventListener('click', closeTimePicker);
  document.getElementById('btn-time-confirm').addEventListener('click', confirmTimePicker);
  document.getElementById('btn-time-clear').addEventListener('click', clearTimePicker);
  // 实时校验时间（两个输入共用同一个校验函数）
  function validateTimeRange() {
    const start = document.getElementById('time-start').value;
    const end = document.getElementById('time-end').value;
    const errEl = document.getElementById('time-error');
    if (start && end && start > end) {
      errEl.classList.remove('hidden');
    } else {
      errEl.classList.add('hidden');
    }
  }
  document.getElementById('time-start').addEventListener('change', validateTimeRange);
  document.getElementById('time-end').addEventListener('change', validateTimeRange);

  // 重复设置
  document.getElementById('btn-detail-repeat').addEventListener('click', openRepeatPopup);
  document.getElementById('repeat-popup-backdrop').addEventListener('click', closeRepeatPopup);
  document.getElementById('btn-repeat-confirm').addEventListener('click', confirmRepeat);
  document.getElementById('btn-repeat-cancel').addEventListener('click', closeRepeatPopup);

  const catPopup = document.getElementById('category-popup');
  if (catPopup) {
    catPopup.querySelector('.category-popup-backdrop')?.addEventListener('click', closeCategoryPopup);
  }

  const customCatPopup = document.getElementById('custom-category-popup');
  if (customCatPopup) {
    customCatPopup.querySelector('.category-popup-backdrop')?.addEventListener('click', closeCustomCategoryPopup);
    document.getElementById('custom-cat-back')?.addEventListener('click', closeCustomCategoryPopup);
    document.getElementById('custom-cat-save')?.addEventListener('click', saveCustomCategory);
    document.getElementById('custom-cat-name')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveCustomCategory();
      else if (e.key === 'Escape') closeCustomCategoryPopup();
    });
    document.getElementById('custom-cat-color')?.addEventListener('input', (e) => {
      const hex = document.getElementById('custom-cat-color-hex');
      if (hex) hex.textContent = e.target.value;
    });
  }

  // 统计面板
  document.getElementById('btn-stats').addEventListener('click', () => {
    if (document.getElementById('search-panel').classList.contains('open')) closeSearchPanel();
    toggleStatsPanel();
  });
  document.getElementById('btn-stats-close').addEventListener('click', closeStatsPanel);
  document.getElementById('stats-year').addEventListener('change', renderStats);
  document.getElementById('stats-month').addEventListener('change', renderStats);

  // 搜索面板
  document.getElementById('btn-search').addEventListener('click', () => {
    if (document.getElementById('stats-panel').classList.contains('open')) closeStatsPanel();
    toggleSearchPanel();
  });
  document.getElementById('btn-search-close').addEventListener('click', closeSearchPanel);
  document.getElementById('search-category').addEventListener('change', performSearch);
  document.getElementById('search-status').addEventListener('change', performSearch);
  let searchDebounceTimer = null;
  document.getElementById('search-text').addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(performSearch, 300);
  });
  document.getElementById('search-check-all').addEventListener('change', toggleSelectAll);
  document.getElementById('btn-batch-delete').addEventListener('click', batchDeleteSelected);
  document.getElementById('btn-batch-edit').addEventListener('click', openBatchEditPopup);
  document.getElementById('btn-batch-complete').addEventListener('click', batchCompleteSelected);
  document.getElementById('batch-edit-backdrop').addEventListener('click', closeBatchEditPopup);
  document.getElementById('btn-batch-edit-cancel').addEventListener('click', closeBatchEditPopup);
  document.getElementById('btn-batch-edit-apply').addEventListener('click', applyBatchEdit);
  document.getElementById('batch-edit-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyBatchEdit();
    else if (e.key === 'Escape') closeBatchEditPopup();
  });

  document.getElementById('panel-overlay').addEventListener('click', () => {
    closeAllPanels();
  });

  // Listen for settings changes from the standalone settings window
  if (window.electronAPI && window.electronAPI.onSettingsChanged) {
    window.electronAPI.onSettingsChanged((settings) => {
      const textOpacity = (settings.textOpacity !== undefined ? settings.textOpacity : 1.0);
      applyTextOpacity(Math.round(textOpacity * 100));
      applyFontFamily(settings.fontFamily || SYSTEM_FONTS[0]);
      if (settings.backgroundImage !== undefined) {
        applyBackgroundImage(settings.backgroundImage || '');
      }
      const bgH = settings.bgHue !== undefined ? settings.bgHue : 0;
      const bgS = settings.bgSat !== undefined ? settings.bgSat : 0;
      const bgL = settings.bgLight !== undefined ? settings.bgLight : 96;
      const fgH = settings.fgHue !== undefined ? settings.fgHue : 0;
      const fgS = settings.fgSat !== undefined ? settings.fgSat : 0;
      const fgL = settings.fgLight !== undefined ? settings.fgLight : 12;
      applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
      if (settings.categoryColors !== undefined) {
        categoryColors = { ...categoryColors, ...settings.categoryColors };
        renderCalendar();
      }
      if (settings.monthFontSize !== undefined) applyMonthFontSize(settings.monthFontSize);
      if (settings.yearFontSize !== undefined) applyYearFontSize(settings.yearFontSize);
      if (settings.dateFontSize !== undefined) applyDateFontSize(settings.dateFontSize);
      if (settings.weekdayFontSize !== undefined) applyWeekdayFontSize(settings.weekdayFontSize);
      if (settings.lunarFontSize !== undefined) applyLunarFontSize(settings.lunarFontSize);
      if (settings.todoDotColor !== undefined) {
        document.documentElement.style.setProperty('--todo-dot-color', settings.todoDotColor);
      }
      if (settings.todoDotSize !== undefined) applyTodoDotSize(settings.todoDotSize);
      if (settings.titlebarHidden !== undefined) applyTitlebarHide(settings.titlebarHidden);
    });
  }

  document.getElementById('btn-pin').addEventListener('click', async () => {
    if (window.electronAPI && window.electronAPI.togglePin) {
      const pinned = await window.electronAPI.togglePin();
      document.getElementById('btn-pin').classList.toggle('active', pinned);
      document.getElementById('title-bar').classList.toggle('no-drag', pinned);
    }
  });

  document.getElementById('btn-maximize').addEventListener('click', async () => {
    if (window.electronAPI) {
      await window.electronAPI.toggleMaximize();
      // After bounds change, force-hide any overlays that might block title bar buttons
      setTimeout(() => {
        const miniView = document.getElementById('mini-view');
        if (!document.getElementById('app').classList.contains('mini-mode')) {
          miniView.classList.add('hidden');
        }
        document.getElementById('detail-view').classList.add('hidden');
        document.getElementById('panel-overlay').classList.add('hidden');
        closeAllPanels();
        // Restore calendar view in case detail view had taken over
        document.getElementById('calendar-header').style.display = '';
        document.getElementById('weekday-header').style.display = '';
        document.getElementById('calendar-grid').style.display = '';
        document.getElementById('btn-prev-month').style.display = '';
        document.getElementById('btn-next-month').style.display = '';
        document.getElementById('mini-mode-btn').style.display = '';
        document.getElementById('settings-float-btn').style.display = '';
        renderCalendar();
      }, 100);
    }
  });

  document.getElementById('btn-minimize').addEventListener('click', async () => {
    if (window.electronAPI) await window.electronAPI.minimizeToTray();
  });

  document.getElementById('btn-close').addEventListener('click', () => {
    document.getElementById('close-dialog').classList.remove('hidden');
  });

  document.getElementById('close-dialog-hide').addEventListener('click', () => {
    document.getElementById('close-dialog').classList.add('hidden');
    if (window.electronAPI) window.electronAPI.minimizeToTray();
  });
  document.getElementById('close-dialog-quit').addEventListener('click', async () => {
    if (window.electronAPI) {
      await window.electronAPI.quitApp();
    }
  });
  document.getElementById('close-dialog-cancel').addEventListener('click', () => {
    document.getElementById('close-dialog').classList.add('hidden');
  });
  document.getElementById('close-dialog-backdrop').addEventListener('click', () => {
    document.getElementById('close-dialog').classList.add('hidden');
  });

  Promise.all([loadTodos(), loadSettings()]).then(() => {
    selectedDate = { year: today.year, month: today.month, day: today.day };
    renderCalendar();
  });
}

document.addEventListener('DOMContentLoaded', init);
