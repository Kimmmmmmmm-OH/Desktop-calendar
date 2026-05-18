# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

桌面日历清单 — 基于 Electron 的 Windows 桌面日历和待办事项小组件。透明无边框窗口，支持农历显示、HSL 动态主题、抽屉式面板、系统托盘最小化。

## 常用命令

```bash
npm start          # 开发运行（electron .）
npm run build      # 打包 Windows 便携版（electron-builder）
node -c main.js    # 语法检查主进程
node -c preload.js # 语法检查预加载脚本
```

没有测试、lint 或类型检查配置。

## 架构

```
main.js          — Electron 主进程：窗口管理、系统托盘、IPC 处理、设置/待办持久化
preload.js       — contextBridge 桥接，向渲染进程暴露 electronAPI
renderer/
  index.html     — 静态 DOM 结构（日历网格、面板、标题栏、待办区域）
  style.css      — 全部样式，CSS 变量驱动主题色和字体大小
  app.js         — 全部渲染进程逻辑（~1160 行）
```

### 主进程 (main.js)

- **窗口**：无边框透明 `BrowserWindow`，默认 380×620，右下角定位。支持置顶、可调整大小、钉在桌面（锁定尺寸/位置）
- **系统托盘**：右键菜单（显示/隐藏、置顶切换、开机自启切换、退出），双击切换可见性
- **持久化**：`settings.json` 和 `todos.json` 通过 `fs.readFileSync`/`writeFileSync` 直接读写，路径在 `app.getPath('userData')`
- **面板扩展**：`panel-state-changed` IPC 处理器通过 `setBounds()` 向外扩展窗口以容纳侧滑面板，`baseWindowBounds` 保存未扩展时的尺寸，`suppressBoundsSave` 防止扩展状态被写入设置
- **开机自启**：通过 VBScript 在启动文件夹创建 `.lnk` 快捷方式
- `createWindow()` 返回 settings 对象，供 `app.whenReady()` 复用

### 预加载 (preload.js)

通过 `contextBridge.exposeInMainWorld('electronAPI', {...})` 暴露 14 个 IPC 方法。渲染进程通过 `window.electronAPI` 调用，无法直接访问 Node API。

### 渲染进程 (renderer/app.js)

单一 JS 文件，模块化结构：

1. **农历模块**（第 1-184 行）：hex 编码的 `LUNAR_INFO` 数组，`solarToLunar()` 通过位运算转换公历到农历，节假日查找，节气计算
2. **颜色引擎**（第 186-233 行）：`hslToRgb()`、`applyColors()` 设置 CSS 变量、`PRESETS` 预设主题、`applyPreset()` 预设应用
3. **日历渲染**（第 320-445 行）：`renderCalendar()` 用 `grid-auto-rows: 1fr` 构建 CSS Grid 日历，每格包含公历日期、农历日期、节假日和行内待办项。`cellLunar` 变量缓存 `solarToLunar()` 结果，每格只需调用一次
4. **待办管理**（第 294-593 行）：以 `YYYY-MM-DD` 为 key 的 todos 对象，CRUD 操作，内联编辑
5. **面板管理**（第 852-893 行）：左侧设置面板、右侧备忘录面板，通过 `panel-state-changed` IPC 与主进程通信实现窗口扩展
6. **初始化**（第 894-1160 行）：`init()` 加载设置、待办、渲染日历、绑定事件监听器

### CSS (style.css)

以 `:root` CSS 变量驱动主题：`--bg-primary`、`--accent`、`--text-primary` 等 HSL 和 RGB 变量，以及 `--month-font-size`、`--date-font-size` 等字体大小变量。JS 在运行时通过 `document.documentElement.style.setProperty()` 修改这些变量。

## 关键注意事项

- **桌面日历清单**是用户明确指定的产品名称，不能更改
- 设置保存通过各滑块/开关的 `change`/`input` 事件直接触发 `saveSettings()`，无需手动点击保存按钮（部分极端情况例外）
- 农历数据 `LUNAR_INFO` 年份范围约为 1900-2100，`solarToLunar()` 的参数默认值由 `Date` 上的 `getXXXX` 调用构成，依赖全局 `Date` API；不要在非浏览器宿主中直接调用（除非提供 Date polyfill）
- 面板打开时会扩展窗口边界，关闭时恢复。`suppressBoundsSave` 确保扩展状态不被持久化
