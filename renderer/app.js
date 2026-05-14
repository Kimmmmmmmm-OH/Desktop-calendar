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
  } else {
    root.style.setProperty('--text-primary', '#e8e6e3');
    root.style.setProperty('--text-secondary', '#9a98a0');
    root.style.setProperty('--text-muted', '#6a6870');
    root.style.setProperty('--border', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--border-strong', 'rgba(255,255,255,0.14)');
    root.style.setProperty('--shadow', '0 2px 20px rgba(0,0,0,0.4)');
  }
}

const PRESETS = {
  default: { bgH: 0, bgS: 0, bgL: 96, fgH: 0, fgS: 0, fgL: 12 },
  gold:   { bgH: 240, bgS: 15, bgL: 12, fgH: 40, fgS: 40, fgL: 62 },
  blue:   { bgH: 215, bgS: 20, bgL: 12, fgH: 205, fgS: 40, fgL: 58 },
  purple: { bgH: 260, bgS: 18, bgL: 12, fgH: 270, fgS: 35, fgL: 60 },
  green:  { bgH: 160, bgS: 15, bgL: 12, fgH: 140, fgS: 30, fgL: 52 },
  light:  { bgH: 0, bgS: 0, bgL: 98, fgH: 0, fgS: 0, fgL: 18 }
};

const SYSTEM_FONTS = [
  'Microsoft YaHei', 'PingFang SC', 'SimSun', 'SimHei',
  'KaiTi', 'FangSong', 'DengXian', 'YouYuan',
  'Microsoft JhengHei', 'Helvetica Neue', 'Arial',
  'Segoe UI', 'Consolas', 'Courier New', 'Georgia',
  'Times New Roman', 'Verdana', 'Tahoma'
];

function applyPreset(name) {
  const p = PRESETS[name] || PRESETS['default'];
  document.getElementById('bg-hue-slider').value = p.bgH;
  document.getElementById('bg-sat-slider').value = p.bgS;
  document.getElementById('bg-light-slider').value = p.bgL;
  document.getElementById('fg-hue-slider').value = p.fgH;
  document.getElementById('fg-sat-slider').value = p.fgS;
  document.getElementById('fg-light-slider').value = p.fgL;
  updateAllSliderLabels();
  applyColors(p.bgH, p.bgS, p.bgL, p.fgH, p.fgS, p.fgL);
}

async function resetAllSettings() {
  // 1. 颜色预设（极简白）
  applyPreset('default');

  // 2. 背景不透明度
  document.getElementById('bg-opacity-slider').value = 92;
  document.getElementById('bg-opacity-value').textContent = '92%';

  // 3. 字体不透明度
  document.getElementById('text-opacity-slider').value = 100;
  applyTextOpacity(100);

  // 4. 字体
  populateFontSelect('Microsoft YaHei');
  applyFontFamily('Microsoft YaHei');

  // 5. 字号
  document.getElementById('month-font-slider').value = 72;
  applyMonthFontSize(72);
  document.getElementById('year-font-slider').value = 18;
  applyYearFontSize(18);
  document.getElementById('date-font-slider').value = 22;
  applyDateFontSize(22);
  document.getElementById('weekday-font-slider').value = 13;
  applyWeekdayFontSize(13);
  document.getElementById('lunar-font-slider').value = 12;
  applyLunarFontSize(12);

  // 6. 待办圆点
  document.getElementById('todo-dot-color').value = '#111111';
  document.documentElement.style.setProperty('--todo-dot-color', '#111111');
  document.getElementById('todo-dot-size-slider').value = 5;
  applyTodoDotSize(5);

  // 7. 开关状态
  document.getElementById('toggle-ontop').checked = true;
  document.getElementById('toggle-autostart').checked = false;
  document.getElementById('toggle-titlebar').checked = false;
  applyTitlebarHide(false);

  // 8. 背景图
  applyBackgroundImage('');
  document.getElementById('btn-clear-bg-image').classList.add('hidden');

  // 9. 备忘录
  document.getElementById('memo-font-slider').value = 14;
  document.getElementById('memo-font-value').textContent = '14px';
  document.getElementById('memo-textarea').style.fontSize = '14px';
  document.getElementById('memo-text-color').value = '#111111';
  document.getElementById('memo-textarea').style.color = '#111111';

  // 10. 保存所有设置
  if (window.electronAPI) {
    await window.electronAPI.setAutoStart(false);
    await window.electronAPI.saveSettings({
      bgOpacity: 0.92,
      textOpacity: 1.0,
      fontFamily: 'Microsoft YaHei',
      bgHue: 0, bgSat: 0, bgLight: 96,
      fgHue: 0, fgSat: 0, fgLight: 12,
      monthFontSize: 72,
      yearFontSize: 18,
      dateFontSize: 22,
      weekdayFontSize: 13,
      lunarFontSize: 12,
      todoDotColor: '#111111',
      todoDotSize: 5,
      alwaysOnTop: true,
      autoStart: false,
      titlebarHidden: false,
      backgroundImage: '',
      memoFontSize: 14,
      memoTextColor: '#111111'
    });
  }
}

function updateAllSliderLabels() {
  document.getElementById('bg-hue-value').textContent = document.getElementById('bg-hue-slider').value + '°';
  document.getElementById('bg-sat-value').textContent = document.getElementById('bg-sat-slider').value + '%';
  document.getElementById('bg-light-value').textContent = document.getElementById('bg-light-slider').value + '%';
  document.getElementById('fg-hue-value').textContent = document.getElementById('fg-hue-slider').value + '°';
  document.getElementById('fg-sat-value').textContent = document.getElementById('fg-sat-slider').value + '%';
  document.getElementById('fg-light-value').textContent = document.getElementById('fg-light-slider').value + '%';
}

async function saveColors(bgH, bgS, bgL, fgH, fgS, fgL) {
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ bgHue: bgH, bgSat: bgS, bgLight: bgL, fgHue: fgH, fgSat: fgS, fgLight: fgL });
  }
}

function applyTitlebarHide(hidden) {
  const bar = document.getElementById('title-bar');
  if (hidden) {
    bar.classList.add('auto-hide');
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
      });
      zone.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(() => {
          bar.classList.remove('show');
          hideTimer = null;
        }, 3000);
      });
    }
  } else {
    bar.classList.remove('auto-hide', 'show');
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
        const total = dayTodos.length;
        let pending = 0;
        for (const t of dayTodos) if (!t.completed) pending++;

        const dotsToRender = total <= 3 ? total : 3;
        const solidCount = total <= 3 ? pending : Math.min(pending, 3);
        for (let i = 0; i < dotsToRender; i++) {
          const dot = document.createElement('span');
          dot.className = 'todo-dot' + (i < solidCount ? '' : ' completed');
          dotsWrap.appendChild(dot);
        }
        if (total > 3) {
          const plus = document.createElement('span');
          plus.className = 'todo-dot-more';
          plus.textContent = '+';
          dotsWrap.appendChild(plus);
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
      el.textContent = t.text;
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
  const nextTodoId = getMaxTodoId() + 1;
  todos[key].push({
    id: nextTodoId,
    text: text.trim(),
    completed: false,
    createdAt: Date.now()
  });
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
  document.getElementById('month-font-value').textContent = px + 'px';
}

function applyYearFontSize(px) {
  document.documentElement.style.setProperty('--year-font-size', px + 'px');
  document.getElementById('year-font-value').textContent = px + 'px';
}

function applyDateFontSize(px) {
  document.documentElement.style.setProperty('--date-font-size', px + 'px');
  document.getElementById('date-font-value').textContent = px + 'px';
}

function applyLunarFontSize(px) {
  document.documentElement.style.setProperty('--lunar-font-size', px + 'px');
  document.getElementById('lunar-font-value').textContent = px + 'px';
}

function applyWeekdayFontSize(px) {
  document.documentElement.style.setProperty('--weekday-font-size', px + 'px');
  document.getElementById('weekday-font-value').textContent = px + 'px';
}

function applyTodoDotSize(px) {
  document.documentElement.style.setProperty('--todo-dot-size', px + 'px');
  document.getElementById('todo-dot-size-value').textContent = px + 'px';
}

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name === 'gold' ? '' : name);
  // For gold theme, remove attribute to use default :root values
  if (name === 'gold') document.documentElement.removeAttribute('data-theme');
}

async function loadSettings() {
  if (window.electronAPI) {
    const s = await window.electronAPI.getSettings();
    const bgOpacity = s.bgOpacity ?? s.transparency ?? 0.92;
    document.getElementById('bg-opacity-slider').value = Math.round(bgOpacity * 100);
    document.getElementById('bg-opacity-value').textContent = Math.round(bgOpacity * 100) + '%';

    const textOpacity = (s.textOpacity !== undefined ? s.textOpacity : 1.0);
    document.getElementById('text-opacity-slider').value = Math.round(textOpacity * 100);
    applyTextOpacity(Math.round(textOpacity * 100));

    const fontFamily = s.fontFamily || SYSTEM_FONTS[0];
    populateFontSelect(fontFamily);
    applyFontFamily(fontFamily);

    const bgImage = s.backgroundImage || '';
    if (bgImage) {
      applyBackgroundImage(bgImage);
      document.getElementById('btn-clear-bg-image').classList.remove('hidden');
    }
    const bgH = s.bgHue !== undefined ? s.bgHue : 0;
    const bgS = s.bgSat !== undefined ? s.bgSat : 0;
    const bgL = s.bgLight !== undefined ? s.bgLight : 96;
    const fgH = s.fgHue !== undefined ? s.fgHue : 0;
    const fgS = s.fgSat !== undefined ? s.fgSat : 0;
    const fgL = s.fgLight !== undefined ? s.fgLight : 12;
    document.getElementById('bg-hue-slider').value = bgH;
    document.getElementById('bg-sat-slider').value = bgS;
    document.getElementById('bg-light-slider').value = bgL;
    document.getElementById('fg-hue-slider').value = fgH;
    document.getElementById('fg-sat-slider').value = fgS;
    document.getElementById('fg-light-slider').value = fgL;
    updateAllSliderLabels();
    applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
    const mf = s.monthFontSize || 72;
    const yf = s.yearFontSize || 18;
    const df = s.dateFontSize || 22;
    const wf = s.weekdayFontSize || 13;
    document.getElementById('month-font-slider').value = mf;
    document.getElementById('year-font-slider').value = yf;
    document.getElementById('date-font-slider').value = df;
    document.getElementById('weekday-font-slider').value = wf;
    applyMonthFontSize(mf);
    applyYearFontSize(yf);
    applyDateFontSize(df);
    applyWeekdayFontSize(wf);
    const lf = s.lunarFontSize || Math.max(10, Math.round(df * 0.55));
    document.getElementById('lunar-font-slider').value = lf;
    applyLunarFontSize(lf);
    document.getElementById('toggle-ontop').checked = s.alwaysOnTop !== false;
    document.getElementById('toggle-autostart').checked = s.autoStart === true;
    document.getElementById('toggle-titlebar').checked = s.titlebarHidden === true;
    const dotColor = s.todoDotColor || '#111111';
    document.getElementById('todo-dot-color').value = dotColor;
    document.documentElement.style.setProperty('--todo-dot-color', dotColor);
    const dotSize = s.todoDotSize || 5;
    document.getElementById('todo-dot-size-slider').value = dotSize;
    applyTodoDotSize(dotSize);
    if (s.titlebarHidden) applyTitlebarHide(true);
    if (s.memoText) {
      document.getElementById('memo-textarea').value = s.memoText;
    }
    const mfs = s.memoFontSize || 14;
    document.getElementById('memo-font-slider').value = mfs;
    document.getElementById('memo-font-value').textContent = mfs + 'px';
    document.getElementById('memo-textarea').style.fontSize = mfs + 'px';
    const memoColor = s.memoTextColor || '#111111';
    document.getElementById('memo-text-color').value = memoColor;
    document.getElementById('memo-textarea').style.color = memoColor;
    if (s.isPinned) {
      document.getElementById('btn-pin').classList.add('active');
      document.getElementById('title-bar').classList.add('no-drag');
    }
  }
}

function applyTextOpacity(val) {
  const opacityVal = (val / 100).toFixed(2);
  document.documentElement.style.setProperty('--text-opacity', opacityVal);
  document.getElementById('text-opacity-value').textContent = val + '%';
}

async function updateTextOpacity(val) {
  applyTextOpacity(val);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ textOpacity: val / 100 });
  }
}

async function updateBgOpacity(val) {
  document.getElementById('bg-opacity-value').textContent = val + '%';
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ bgOpacity: val / 100 });
  }
}

function applyFontFamily(family) {
  document.body.style.fontFamily = `"${family}", "${SYSTEM_FONTS[0]}", sans-serif`;
}

async function updateFontFamily(family) {
  applyFontFamily(family);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ fontFamily: family });
  }
}

function populateFontSelect(selectedFont) {
  const select = document.getElementById('font-family-select');
  select.innerHTML = '';
  for (const font of SYSTEM_FONTS) {
    const opt = document.createElement('option');
    opt.value = font;
    opt.textContent = font;
    if (font === selectedFont) opt.selected = true;
    select.appendChild(opt);
  }
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

async function chooseBackgroundImage() {
  if (!window.electronAPI) return;
  const dataUrl = await window.electronAPI.openFileDialog();
  if (dataUrl) {
    applyBackgroundImage(dataUrl);
    await window.electronAPI.saveSettings({ backgroundImage: dataUrl });
    document.getElementById('btn-clear-bg-image').classList.remove('hidden');
  }
}

async function clearBackgroundImage() {
  applyBackgroundImage('');
  document.getElementById('btn-clear-bg-image').classList.add('hidden');
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ backgroundImage: '' });
  }
}

async function updateMonthFontSize(val) {
  const px = parseInt(val);
  applyMonthFontSize(px);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ monthFontSize: px });
  }
}

async function updateYearFontSize(val) {
  const px = parseInt(val);
  applyYearFontSize(px);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ yearFontSize: px });
  }
}

async function updateDateFontSize(val) {
  const px = parseInt(val);
  applyDateFontSize(px);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ dateFontSize: px });
  }
}

async function updateTheme(name) {
  applyTheme(name);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ theme: name });
  }
}

async function toggleAlwaysOnTop(enabled) {
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ alwaysOnTop: enabled });
  }
}

async function toggleAutoStart(enabled) {
  if (window.electronAPI) {
    await window.electronAPI.setAutoStart(enabled);
  }
}

/* ================================================================
   PANEL MANAGEMENT (slide-out panels)
   ================================================================ */

async function openPanel(id) {
  const panel = document.getElementById(id);
  const overlay = document.getElementById('panel-overlay');
  const leftOpen = document.getElementById('settings-panel').classList.contains('open') || id === 'settings-panel';
  const rightOpen = document.getElementById('memo-panel').classList.contains('open') || id === 'memo-panel';

  // Expand window FIRST so panel slides into already-expanded space
  if (window.electronAPI && window.electronAPI.panelStateChanged) {
    await window.electronAPI.panelStateChanged({ leftOpen, rightOpen, leftWidth: 280, rightWidth: 260 });
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
        leftOpen: document.getElementById('settings-panel').classList.contains('open'),
        rightOpen: document.getElementById('memo-panel').classList.contains('open'),
        leftWidth: 280,
        rightWidth: 260
      });
    }
  }, 220);
}

function closeAllPanels() {
  closePanel('settings-panel');
  closePanel('memo-panel');
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  if (panel.classList.contains('open')) {
    closePanel(id);
  } else {
    if (id === 'settings-panel') closePanel('memo-panel');
    if (id === 'memo-panel') closePanel('settings-panel');
    openPanel(id);
  }
}

/* ================================================================
   EVENT HANDLERS & INITIALIZATION
   ================================================================ */

/* --- Mini Mode --- */

let isMiniMode = false;
let miniFirstHover = false;

async function toggleMiniMode() {
  if (window.electronAPI && window.electronAPI.toggleMiniMode) {
    const app = document.getElementById('app');
    const btn = document.getElementById('mini-mode-btn');

    // Immediately hide all panels without animation
    ['settings-panel', 'memo-panel'].forEach(id => {
      const p = document.getElementById(id);
      p.classList.remove('open');
      p.classList.add('hidden');
    });
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
      app.classList.add('mini-mode');
      btn.classList.add('active');
      miniFirstHover = true;
      // Ensure mini view is visible and preview state is reset
      const miniView = document.getElementById('mini-view');
      miniView.classList.remove('hidden');
      miniView.style.display = 'flex';
      const icon = document.getElementById('mini-calendar-icon');
      icon.classList.remove('expanded');
      app.classList.remove('mini-expanded');
      updateMiniView();
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
  const weekdays = ['日','一','二','三','四','五','六'];
  const d = new Date(today.year, today.month - 1, today.day);
  document.getElementById('mini-month').textContent = MONTH_NAMES_EN[today.month - 1].slice(0, 3);
  document.getElementById('mini-day').textContent = today.day;
  document.getElementById('mini-weekday').textContent = '周' + weekdays[d.getDay()];
}

function expandMiniPreview() {
  const icon = document.getElementById('mini-calendar-icon');
  const today = getToday();
  const lunar = solarToLunar(today.year, today.month, today.day);
  const key = dateKey(today.year, today.month, today.day);
  const dayTodos = todos[key] || [];
  const holiday = getLunarHoliday(lunar) || getSolarHoliday(today.month, today.day);
  const lunarDisplay = getLunarDateDisplay(lunar);

  // Populate subheader: weekday + lunar date + holiday
  const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
  const d = new Date(today.year, today.month - 1, today.day);
  const subEl = icon.querySelector('.mini-preview-subheader');
  const parts = [weekdays[d.getDay()], lunarDisplay];
  if (holiday) parts.push(holiday);
  subEl.textContent = parts.join(' · ');

  // Populate preview list
  const listEl = icon.querySelector('.mini-preview-list');
  listEl.innerHTML = '';
  if (dayTodos.length === 0) {
    listEl.innerHTML = '<div class="mini-preview-empty">今日暂无待办<br>点击此处添加</div>';
  } else {
    const sorted = [...dayTodos].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
    for (const t of sorted) {
      const item = document.createElement('div');
      item.className = 'mini-preview-item' + (t.completed ? ' completed' : '');
      item.textContent = t.text;
      listEl.appendChild(item);
    }
  }

  // Expand window to fit preview content, then let icon fill it
  if (window.electronAPI && window.electronAPI.setMiniExpanded) {
    window.electronAPI.setMiniExpanded({ expanded: true, width: 296, height: 420 });
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

function openDetailView(y, m, d) {
  hideDateTooltip();
  selectedDate = { year: y, month: m, day: d };
  detailKey = dateKey(y, m, d);
  closeAllPanels();
  renderCalendar();
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

  const sorted = [...dayTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  list.innerHTML = '';
  for (const todo of sorted) {
    const item = document.createElement('div');
    item.classList.add('todo-item');
    item.dataset.todoId = String(todo.id);
    if (todo.completed) item.classList.add('completed');

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
    togglePanel('settings-panel');
  });
  document.getElementById('btn-settings-close').addEventListener('click', () => {
    closePanel('settings-panel');
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
    }, 3000);
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

  const oldSettingsBtn = document.getElementById('btn-settings');
  if (oldSettingsBtn) {
    oldSettingsBtn.addEventListener('click', () => {
      togglePanel('settings-panel');
    });
  }

  document.getElementById('btn-memo').addEventListener('click', () => {
    togglePanel('memo-panel');
  });
  document.getElementById('btn-memo-close').addEventListener('click', () => {
    closePanel('memo-panel');
  });

  document.getElementById('panel-overlay').addEventListener('click', () => {
    closeAllPanels();
  });
  document.getElementById('bg-opacity-slider').addEventListener('input', (e) => {
    updateBgOpacity(parseInt(e.target.value));
  });
  document.getElementById('text-opacity-slider').addEventListener('input', (e) => {
    updateTextOpacity(parseInt(e.target.value));
  });
  document.getElementById('font-family-select').addEventListener('change', (e) => {
    updateFontFamily(e.target.value);
  });
  document.getElementById('btn-choose-bg-image').addEventListener('click', () => {
    chooseBackgroundImage();
  });
  document.getElementById('btn-clear-bg-image').addEventListener('click', () => {
    clearBackgroundImage();
  });
  document.getElementById('month-font-slider').addEventListener('input', (e) => {
    document.getElementById('month-font-value').textContent = e.target.value + 'px';
    updateMonthFontSize(parseInt(e.target.value));
  });
  document.getElementById('year-font-slider').addEventListener('input', (e) => {
    document.getElementById('year-font-value').textContent = e.target.value + 'px';
    updateYearFontSize(parseInt(e.target.value));
  });
  document.getElementById('date-font-slider').addEventListener('input', (e) => {
    document.getElementById('date-font-value').textContent = e.target.value + 'px';
    updateDateFontSize(parseInt(e.target.value));
  });
  document.getElementById('weekday-font-slider').addEventListener('input', (e) => {
    document.getElementById('weekday-font-value').textContent = e.target.value + 'px';
    applyWeekdayFontSize(parseInt(e.target.value));
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ weekdayFontSize: parseInt(e.target.value) });
    }
  });
  document.getElementById('lunar-font-slider').addEventListener('input', (e) => {
    document.getElementById('lunar-font-value').textContent = e.target.value + 'px';
    applyLunarFontSize(parseInt(e.target.value));
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ lunarFontSize: parseInt(e.target.value) });
    }
  });

  document.getElementById('todo-dot-color').addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--todo-dot-color', color);
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ todoDotColor: color });
    }
  });

  document.getElementById('todo-dot-size-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('todo-dot-size-value').textContent = val + 'px';
    applyTodoDotSize(val);
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ todoDotSize: val });
    }
  });

  document.getElementById('memo-font-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('memo-font-value').textContent = val + 'px';
    document.getElementById('memo-textarea').style.fontSize = val + 'px';
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ memoFontSize: val });
    }
  });

  let memoTimeout;
  document.getElementById('memo-textarea').addEventListener('input', (e) => {
    clearTimeout(memoTimeout);
    memoTimeout = setTimeout(() => {
      if (window.electronAPI) {
        window.electronAPI.saveSettings({ memoText: e.target.value });
      }
    }, 500);
  });

  document.getElementById('memo-text-color').addEventListener('input', (e) => {
    const color = e.target.value;
    document.getElementById('memo-textarea').style.color = color;
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ memoTextColor: color });
    }
  });

  const hslSliders = ['bg-hue','bg-sat','bg-light','fg-hue','fg-sat','fg-light'];
  for (const id of hslSliders) {
    document.getElementById(id + '-slider').addEventListener('input', () => {
      updateAllSliderLabels();
      const bgH = parseInt(document.getElementById('bg-hue-slider').value);
      const bgS = parseInt(document.getElementById('bg-sat-slider').value);
      const bgL = parseInt(document.getElementById('bg-light-slider').value);
      const fgH = parseInt(document.getElementById('fg-hue-slider').value);
      const fgS = parseInt(document.getElementById('fg-sat-slider').value);
      const fgL = parseInt(document.getElementById('fg-light-slider').value);
      applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
      saveColors(bgH, bgS, bgL, fgH, fgS, fgL);
    });
  }

  document.querySelectorAll('.preset-btn').forEach(btn => {
    if (btn.classList.contains('preset-reset')) {
      btn.addEventListener('click', resetAllSettings);
    } else {
      btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
    }
  });

  document.getElementById('btn-save-settings').addEventListener('click', async () => {
    const settings = {
      bgOpacity: parseInt(document.getElementById('bg-opacity-slider').value) / 100,
      textOpacity: parseInt(document.getElementById('text-opacity-slider').value) / 100,
      fontFamily: document.getElementById('font-family-select').value,
      bgHue: parseInt(document.getElementById('bg-hue-slider').value),
      bgSat: parseInt(document.getElementById('bg-sat-slider').value),
      bgLight: parseInt(document.getElementById('bg-light-slider').value),
      fgHue: parseInt(document.getElementById('fg-hue-slider').value),
      fgSat: parseInt(document.getElementById('fg-sat-slider').value),
      fgLight: parseInt(document.getElementById('fg-light-slider').value),
      monthFontSize: parseInt(document.getElementById('month-font-slider').value),
      yearFontSize: parseInt(document.getElementById('year-font-slider').value),
      dateFontSize: parseInt(document.getElementById('date-font-slider').value),
      weekdayFontSize: parseInt(document.getElementById('weekday-font-slider').value),
      lunarFontSize: parseInt(document.getElementById('lunar-font-slider').value),
      todoDotColor: document.getElementById('todo-dot-color').value,
      todoDotSize: parseInt(document.getElementById('todo-dot-size-slider').value),
      alwaysOnTop: document.getElementById('toggle-ontop').checked,
      autoStart: document.getElementById('toggle-autostart').checked,
      titlebarHidden: document.getElementById('toggle-titlebar').checked
    };
    if (window.electronAPI) {
      await window.electronAPI.saveSettings(settings);
      const fb = document.getElementById('save-settings-feedback');
      fb.classList.remove('hidden');
      fb.classList.add('flash-once');
      setTimeout(() => {
        fb.classList.add('hidden');
        fb.classList.remove('flash-once');
      }, 1000);
    }
  });

  document.getElementById('toggle-ontop').addEventListener('change', (e) => {
    toggleAlwaysOnTop(e.target.checked);
  });
  document.getElementById('toggle-autostart').addEventListener('change', (e) => {
    toggleAutoStart(e.target.checked);
  });
  document.getElementById('toggle-titlebar').addEventListener('change', async (e) => {
    applyTitlebarHide(e.target.checked);
    if (window.electronAPI) {
      await window.electronAPI.saveSettings({ titlebarHidden: e.target.checked });
    }
  });

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
        ['settings-panel', 'memo-panel'].forEach(id => {
          document.getElementById(id).classList.add('hidden');
          document.getElementById(id).classList.remove('open');
        });
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
