const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('tooltipAPI', {
  onTooltipData: (cb) => ipcRenderer.on('tooltip-data', (_, data) => cb(data)),
  sendResize: (height) => ipcRenderer.send('tooltip-resize', height),
  sendClick: (dateKey) => ipcRenderer.send('tooltip-clicked', dateKey),
  sendHideRequest: () => ipcRenderer.send('tooltip-hide-request'),
  onStartTimer: (cb) => ipcRenderer.on('start-tooltip-timer', cb),
  onCancelTimer: (cb) => ipcRenderer.on('cancel-tooltip-timer', cb)
});
