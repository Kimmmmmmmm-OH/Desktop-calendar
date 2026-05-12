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
    root.style.setProperty('--text-primary', '#2a2a38');
    root.style.setProperty('--text-secondary', '#5a5868');
    root.style.setProperty('--text-muted', '#8a8898');
    root.style.setProperty('--border', 'rgba(0,0,0,0.08)');
    root.style.setProperty('--border-strong', 'rgba(0,0,0,0.14)');
    root.style.setProperty('--shadow', '0 2px 20px rgba(0,0,0,0.12)');
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
  gold:   { bgH: 240, bgS: 15, bgL: 12, fgH: 40, fgS: 40, fgL: 62 },
  blue:   { bgH: 215, bgS: 20, bgL: 12, fgH: 205, fgS: 40, fgL: 58 },
  purple: { bgH: 260, bgS: 18, bgL: 12, fgH: 270, fgS: 35, fgL: 60 },
  green:  { bgH: 160, bgS: 15, bgL: 12, fgH: 140, fgS: 30, fgL: 52 },
  light:  { bgH: 240, bgS: 10, bgL: 92, fgH: 220, fgS: 50, fgL: 45 },
  default: { bgH: 240, bgS: 15, bgL: 12, fgH: 40, fgS: 40, fgL: 62 }
};

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

function toggleTodoPanel() {
  const section = document.getElementById('todo-section');
  section.classList.toggle('collapsed');
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

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const titleEl = document.getElementById('current-month-year');
  titleEl.textContent = `${currentYear}年 ${currentMonth}月`;

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
        const todosWrap = document.createElement('div');
        todosWrap.classList.add('cell-todos');
        const maxShow = 2;
        const shown = dayTodos.slice(0, maxShow);
        for (const t of shown) {
          const tEl = document.createElement('span');
          tEl.classList.add('cell-todo');
          if (t.completed) tEl.classList.add('completed');
          tEl.textContent = t.text;
          todosWrap.appendChild(tEl);
        }
        if (dayTodos.length > maxShow) {
          const more = document.createElement('span');
          more.classList.add('cell-more');
          more.textContent = `+${dayTodos.length - maxShow} 更多`;
          more.addEventListener('click', (ev) => {
            ev.stopPropagation();
            openDetailView(currentYear, currentMonth, solarDay);
          });
          todosWrap.appendChild(more);
        }
        cell.appendChild(todosWrap);
      }
    }

    if (!isOtherMonth) {
      cell.addEventListener('click', () => selectDate(currentYear, currentMonth, solarDay));
    }

    cell.title = formatDateCN(currentYear, currentMonth, solarDay);
    grid.appendChild(cell);
  }
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
  renderTodoList();
}

function toggleTodo(key, id) {
  if (!todos[key]) return;
  const todo = todos[key].find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderCalendar();
    renderTodoList();
  }
}

function deleteTodo(key, id) {
  if (!todos[key]) return;
  todos[key] = todos[key].filter(t => t.id !== id);
  if (todos[key].length === 0) delete todos[key];
  saveTodos();
  renderCalendar();
  renderTodoList();
}

function clearCompleted(key) {
  if (!todos[key]) return;
  todos[key] = todos[key].filter(t => !t.completed);
  if (todos[key].length === 0) delete todos[key];
  saveTodos();
  renderCalendar();
  renderTodoList();
}

function startEditTodo(key, id) {
  const todo = todos[key].find(t => t.id === id);
  if (!todo) return;

  const list = document.getElementById('todo-list');
  const editRow = document.getElementById('todo-edit-row');
  const editInput = document.getElementById('todo-edit-input');

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

function saveEditTodo() {
  const editInput = document.getElementById('todo-edit-input');
  const editRow = document.getElementById('todo-edit-row');
  const key = editInput.dataset.editKey;
  const id = parseInt(editInput.dataset.editId);
  const newText = editInput.value.trim();

  editRow.classList.add('hidden');
  delete editInput.dataset.editKey;
  delete editInput.dataset.editId;

  const list = document.getElementById('todo-list');
  const items = list.querySelectorAll('.todo-item');
  for (const item of items) {
    item.classList.remove('editing');
  }

  if (!newText || !todos[key]) return;
  const todo = todos[key].find(t => t.id === id);
  if (todo) {
    todo.text = newText;
    saveTodos();
    renderTodoList();
  }
}

function cancelEditTodo() {
  const editRow = document.getElementById('todo-edit-row');
  const editInput = document.getElementById('todo-edit-input');
  editRow.classList.add('hidden');
  delete editInput.dataset.editKey;
  delete editInput.dataset.editId;

  const list = document.getElementById('todo-list');
  const items = list.querySelectorAll('.todo-item');
  for (const item of items) {
    item.classList.remove('editing');
  }
}

function renderTodoList() {
  const list = document.getElementById('todo-list');
  const label = document.getElementById('selected-date-label');
  const inputRow = document.getElementById('todo-input-row');
  const editRow = document.getElementById('todo-edit-row');
  const clearBtn = document.getElementById('btn-clear-completed');
  const countEl = document.getElementById('todo-count');

  inputRow.classList.add('hidden');
  editRow.classList.add('hidden');

  if (!selectedDate) {
    label.textContent = '选择日期查看待办';
    list.innerHTML = '<div class="todo-empty">点击日历中的日期查看待办事项</div>';
    clearBtn.classList.add('hidden');
    countEl.textContent = '';
    return;
  }

  const key = getSelectedDateKey();
  label.textContent = formatDateCN(selectedDate.year, selectedDate.month, selectedDate.day) + ' 待办';

  const dayTodos = todos[key] || [];

  const total = dayTodos.length;
  const completed = dayTodos.filter(t => t.completed).length;
  const pending = total - completed;
  if (total > 0) {
    countEl.textContent = `${pending} 待办 / ${completed} 已完成`;
  } else {
    countEl.textContent = '';
  }

  if (completed > 0) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }

  if (dayTodos.length === 0) {
    list.innerHTML = '<div class="todo-empty">暂无待办，点击 + 添加</div>';
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
    checkbox.addEventListener('click', () => toggleTodo(key, todo.id));

    const text = document.createElement('span');
    text.classList.add('todo-text');
    text.textContent = todo.text;

    item.addEventListener('dblclick', (e) => {
      if (e.target === checkbox || e.target.classList.contains('todo-delete')) return;
      startEditTodo(key, todo.id);
    });

    const delBtn = document.createElement('button');
    delBtn.classList.add('todo-delete');
    delBtn.textContent = '✕';
    delBtn.title = '删除';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(key, todo.id);
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(delBtn);
    list.appendChild(item);
  }
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

function applyDateFontSize(px) {
  document.documentElement.style.setProperty('--date-font-size', px + 'px');
  document.documentElement.style.setProperty('--lunar-font-size', Math.max(5, Math.round(px * 0.5)) + 'px');
  document.getElementById('date-font-value').textContent = px + 'px';
}

function applyWeekdayFontSize(px) {
  document.documentElement.style.setProperty('--weekday-font-size', px + 'px');
  document.getElementById('weekday-font-value').textContent = px + 'px';
}

function applyCellTodoFontSize(px) {
  document.documentElement.style.setProperty('--cell-todo-font-size', px + 'px');
  document.getElementById('cell-todo-font-value').textContent = px + 'px';
}

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name === 'gold' ? '' : name);
  // For gold theme, remove attribute to use default :root values
  if (name === 'gold') document.documentElement.removeAttribute('data-theme');
}

async function loadSettings() {
  if (window.electronAPI) {
    const s = await window.electronAPI.getSettings();
    document.getElementById('transparency-slider').value = Math.round((s.transparency || 0.92) * 100);
    document.getElementById('transparency-value').textContent = Math.round((s.transparency || 0.92) * 100) + '%';
    const bgH = s.bgHue !== undefined ? s.bgHue : 240;
    const bgS = s.bgSat !== undefined ? s.bgSat : 15;
    const bgL = s.bgLight !== undefined ? s.bgLight : 12;
    const fgH = s.fgHue !== undefined ? s.fgHue : 40;
    const fgS = s.fgSat !== undefined ? s.fgSat : 40;
    const fgL = s.fgLight !== undefined ? s.fgLight : 62;
    document.getElementById('bg-hue-slider').value = bgH;
    document.getElementById('bg-sat-slider').value = bgS;
    document.getElementById('bg-light-slider').value = bgL;
    document.getElementById('fg-hue-slider').value = fgH;
    document.getElementById('fg-sat-slider').value = fgS;
    document.getElementById('fg-light-slider').value = fgL;
    updateAllSliderLabels();
    applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
    const mf = s.monthFontSize || 17;
    const df = s.dateFontSize || 14;
    const wf = s.weekdayFontSize || 10;
    const cf = s.cellTodoFontSize || 7;
    document.getElementById('month-font-slider').value = mf;
    document.getElementById('date-font-slider').value = df;
    document.getElementById('weekday-font-slider').value = wf;
    document.getElementById('cell-todo-font-slider').value = cf;
    applyMonthFontSize(mf);
    applyDateFontSize(df);
    applyWeekdayFontSize(wf);
    applyCellTodoFontSize(cf);
    document.getElementById('toggle-ontop').checked = s.alwaysOnTop !== false;
    document.getElementById('toggle-autostart').checked = s.autoStart === true;
    document.getElementById('toggle-titlebar').checked = s.titlebarHidden === true;
    const cellColor = s.cellTodoColor || '#9a98a0';
    document.getElementById('cell-todo-color').value = cellColor;
    document.documentElement.style.setProperty('--cell-todo-color', cellColor);
    const cellBold = s.cellTodoBold === true;
    document.getElementById('toggle-cell-todo-bold').checked = cellBold;
    document.documentElement.style.setProperty('--cell-todo-weight', cellBold ? 'bold' : 'normal');
    if (s.titlebarHidden) applyTitlebarHide(true);
    if (s.todoHidden) {
      document.getElementById('todo-section').classList.add('collapsed');
    }
    if (s.memoText) {
      document.getElementById('memo-textarea').value = s.memoText;
    }
    const mfs = s.memoFontSize || 14;
    document.getElementById('memo-font-slider').value = mfs;
    document.getElementById('memo-font-value').textContent = mfs + 'px';
    document.getElementById('memo-textarea').style.fontSize = mfs + 'px';
    const memoColor = s.memoTextColor || '#e8e6e3';
    document.getElementById('memo-text-color').value = memoColor;
    document.getElementById('memo-textarea').style.color = memoColor;
    if (s.isPinned) {
      document.getElementById('btn-pin').classList.add('active');
      document.getElementById('title-bar').classList.add('no-drag');
    }
  }
}

async function updateTransparency(val) {
  const opacity = val / 100;
  document.getElementById('transparency-value').textContent = val + '%';
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ transparency: opacity });
  }
}

async function updateMonthFontSize(val) {
  const px = parseInt(val);
  applyMonthFontSize(px);
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ monthFontSize: px });
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
      updateMiniView();
    } else {
      app.classList.remove('mini-mode');
      btn.classList.remove('active');
      // Restore calendar view in case detail view was open before mini mode
      document.getElementById('calendar-header').style.display = '';
      document.getElementById('weekday-header').style.display = '';
      document.getElementById('calendar-grid').style.display = '';
      document.getElementById('todo-section').style.display = '';
      document.getElementById('btn-prev-month').style.display = '';
      document.getElementById('btn-next-month').style.display = '';
      document.getElementById('mini-mode-btn').style.display = '';
      document.getElementById('settings-float-btn').style.display = '';
      renderCalendar();
      renderTodoList();
    }
    isMiniMode = inMini;
  }
}

function updateMiniView() {
  const today = getToday();
  const weekdays = ['日','一','二','三','四','五','六'];
  const d = new Date(today.year, today.month - 1, today.day);
  document.getElementById('mini-month').textContent = today.month + '月';
  document.getElementById('mini-day').textContent = today.day;
  document.getElementById('mini-weekday').textContent = '周' + weekdays[d.getDay()];
}

/* --- Detail View --- */

let detailKey = null;

function openDetailView(y, m, d) {
  selectedDate = { year: y, month: m, day: d };
  detailKey = dateKey(y, m, d);
  closeAllPanels();
  renderCalendar();
  document.getElementById('detail-view').classList.remove('hidden');
  // Hide calendar navigation and todo section
  document.getElementById('calendar-header').style.display = 'none';
  document.getElementById('weekday-header').style.display = 'none';
  document.getElementById('calendar-grid').style.display = 'none';
  document.getElementById('todo-section').style.display = 'none';
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
    document.getElementById('todo-section').style.display = '';
    document.getElementById('btn-prev-month').style.display = '';
    document.getElementById('btn-next-month').style.display = '';
    // Restore floating buttons
    document.getElementById('mini-mode-btn').style.display = '';
    document.getElementById('settings-float-btn').style.display = '';
    renderCalendar();
    renderTodoList();
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
  if (holidayLabel) lunarLabel.style.color = 'var(--accent-red)';
  else lunarLabel.style.color = '';

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
  for (const item of items) items.classList.remove('editing');
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
    renderTodoList();
  });

  document.getElementById('settings-float-btn').addEventListener('click', () => {
    togglePanel('settings-panel');
  });
  document.getElementById('btn-settings-close').addEventListener('click', () => {
    closePanel('settings-panel');
  });

  // Mini mode
  document.getElementById('mini-mode-btn').addEventListener('click', toggleMiniMode);
  // Mini view click vs drag detection (click event won't fire with -webkit-app-region:drag)
  let miniMouseOrigin = null;
  const miniView = document.getElementById('mini-view');
  miniView.addEventListener('mousedown', (e) => { miniMouseOrigin = { x: e.screenX, y: e.screenY }; });
  miniView.addEventListener('mouseup', (e) => {
    if (miniMouseOrigin) {
      const dx = e.screenX - miniMouseOrigin.x;
      const dy = e.screenY - miniMouseOrigin.y;
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) toggleMiniMode();
      miniMouseOrigin = null;
    }
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
  document.getElementById('transparency-slider').addEventListener('input', (e) => {
    updateTransparency(parseInt(e.target.value));
  });
  document.getElementById('month-font-slider').addEventListener('input', (e) => {
    document.getElementById('month-font-value').textContent = e.target.value + 'px';
    updateMonthFontSize(parseInt(e.target.value));
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
  document.getElementById('cell-todo-font-slider').addEventListener('input', (e) => {
    document.getElementById('cell-todo-font-value').textContent = e.target.value + 'px';
    applyCellTodoFontSize(parseInt(e.target.value));
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ cellTodoFontSize: parseInt(e.target.value) });
    }
  });

  document.getElementById('cell-todo-color').addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--cell-todo-color', color);
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ cellTodoColor: color });
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
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  document.getElementById('toggle-cell-todo-bold').addEventListener('change', (e) => {
    const bold = e.target.checked;
    document.documentElement.style.setProperty('--cell-todo-weight', bold ? 'bold' : 'normal');
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ cellTodoBold: bold });
    }
  });

  document.getElementById('btn-save-settings').addEventListener('click', async () => {
    const settings = {
      transparency: parseInt(document.getElementById('transparency-slider').value) / 100,
      bgHue: parseInt(document.getElementById('bg-hue-slider').value),
      bgSat: parseInt(document.getElementById('bg-sat-slider').value),
      bgLight: parseInt(document.getElementById('bg-light-slider').value),
      fgHue: parseInt(document.getElementById('fg-hue-slider').value),
      fgSat: parseInt(document.getElementById('fg-sat-slider').value),
      fgLight: parseInt(document.getElementById('fg-light-slider').value),
      monthFontSize: parseInt(document.getElementById('month-font-slider').value),
      dateFontSize: parseInt(document.getElementById('date-font-slider').value),
      weekdayFontSize: parseInt(document.getElementById('weekday-font-slider').value),
      cellTodoFontSize: parseInt(document.getElementById('cell-todo-font-slider').value),
      cellTodoColor: document.getElementById('cell-todo-color').value,
      cellTodoBold: document.getElementById('toggle-cell-todo-bold').checked,
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
        document.getElementById('todo-section').style.display = '';
        document.getElementById('btn-prev-month').style.display = '';
        document.getElementById('btn-next-month').style.display = '';
        document.getElementById('mini-mode-btn').style.display = '';
        document.getElementById('settings-float-btn').style.display = '';
        renderCalendar();
        renderTodoList();
      }, 100);
    }
  });

  document.getElementById('btn-toggle-todo').addEventListener('click', async () => {
    const section = document.getElementById('todo-section');
    section.classList.toggle('collapsed');
    const hidden = section.classList.contains('collapsed');
    if (window.electronAPI) {
      await window.electronAPI.saveSettings({ todoHidden: hidden });
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

  document.getElementById('btn-add-todo').addEventListener('click', () => {
    if (!selectedDate) {
      const t = getToday();
      selectDate(t.year, t.month, t.day);
    }
    const inputRow = document.getElementById('todo-input-row');
    inputRow.classList.remove('hidden');
    document.getElementById('todo-input').focus();
  });

  document.getElementById('btn-save-todo').addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
      document.getElementById('todo-input-row').classList.add('hidden');
    }
  });

  document.getElementById('btn-cancel-todo').addEventListener('click', () => {
    document.getElementById('todo-input').value = '';
    document.getElementById('todo-input-row').classList.add('hidden');
  });

  document.getElementById('todo-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-save-todo').click();
    } else if (e.key === 'Escape') {
      document.getElementById('btn-cancel-todo').click();
    }
  });

  document.getElementById('todo-edit-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-save-edit').click();
    } else if (e.key === 'Escape') {
      document.getElementById('btn-cancel-edit').click();
    }
  });

  document.getElementById('btn-clear-completed').addEventListener('click', () => {
    const key = getSelectedDateKey();
    if (key) clearCompleted(key);
  });

  document.getElementById('btn-save-edit').addEventListener('click', saveEditTodo);

  document.getElementById('btn-cancel-edit').addEventListener('click', cancelEditTodo);

  Promise.all([loadTodos(), loadSettings()]).then(() => {
    selectedDate = { year: today.year, month: today.month, day: today.day };
    renderCalendar();
    renderTodoList();
  });
}

document.addEventListener('DOMContentLoaded', init);
