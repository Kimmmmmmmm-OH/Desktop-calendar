let hideTimer = null;
let currentDateKey = null;

function render(data) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  currentDateKey = data.dateKey;
  const root = document.documentElement;
  root.style.setProperty('--bg', data.theme.bg);
  root.style.setProperty('--border', data.theme.border);
  root.style.setProperty('--border-light', data.theme.borderLight);
  root.style.setProperty('--accent', data.theme.accent);
  root.style.setProperty('--text', data.theme.text);
  root.style.setProperty('--text-muted', data.theme.textMuted);
  root.style.setProperty('--accent-green', data.theme.accentGreen);

  const tooltip = document.getElementById('tooltip');
  const header = document.getElementById('tooltip-header');
  const list = document.getElementById('tooltip-list');
  tooltip.classList.remove('visible');
  header.textContent = data.header;
  list.innerHTML = '';

  if (data.items.length === 0) {
    list.innerHTML = '<div class="tooltip-empty">暂无待办事项</div>';
  } else {
    for (const item of data.items) {
      const el = document.createElement('div');
      el.className = 'tooltip-item' + (item.completed ? ' completed' : '');
      el.textContent = item.text;
      list.appendChild(el);
    }
  }

  requestAnimationFrame(() => {
    tooltip.classList.add('visible');
    const height = document.documentElement.scrollHeight;
    if (window.tooltipAPI) window.tooltipAPI.sendResize(height);
  });
}

if (window.tooltipAPI) {
  window.tooltipAPI.onTooltipData((data) => render(data));
}

document.getElementById('tooltip').addEventListener('click', () => {
  if (currentDateKey && window.tooltipAPI) {
    window.tooltipAPI.sendClick(currentDateKey);
  }
});

let isMouseInside = false;

function startHideTimer() {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (window.tooltipAPI) window.tooltipAPI.sendHideRequest();
  }, 3000);
}

function cancelHideTimer() {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
}

document.addEventListener('mouseenter', () => {
  isMouseInside = true;
  cancelHideTimer();
});

document.addEventListener('mouseleave', () => {
  isMouseInside = false;
  startHideTimer();
});

if (window.tooltipAPI) {
  window.tooltipAPI.onStartTimer(() => {
    if (!isMouseInside) startHideTimer();
  });
  window.tooltipAPI.onCancelTimer(() => {
    cancelHideTimer();
  });
}
