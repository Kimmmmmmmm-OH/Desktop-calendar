/**
 * 图标生成脚本 — 生成桌面日历清单的 PNG 和 ICO 图标
 *
 * 设计：现代简约日历页
 *   - 圆角方形主体
 *   - 顶部珊瑚红标题栏（约 28% 高度）
 *   - 白色/浅色内容区带大号日期数字
 *   - 标题栏两侧有装订环
 *   - 右下角轻微阴影
 *
 * 用法：node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// ============================================================
// 颜色定义
// ============================================================
const COLORS = {
  headerBg:   [234, 85, 85],    // 珊瑚红 #ea5555
  headerBgDark: [210, 65, 65],  // 深红（阴影侧）
  bodyBg:     [255, 255, 255],  // 白色
  bodyBgDark: [240, 240, 240],  // 浅灰（阴影侧）
  ring:       [180, 50, 50],    // 装订环颜色
  ringHole:   [245, 245, 245],  // 环孔颜色（同背景）
  textDark:   [50, 50, 50],     // 日期数字颜色
  shadow:     [0, 0, 0],        // 阴影
  bgHole:     [0, 0, 0],        // 透明区域占位
};

// ============================================================
// 绘制函数：在指定尺寸下绘制日历图标像素
// ============================================================

// 16x16 像素级精确日历图标（托盘用）— 含装订环，与大图标一致
function drawCalendarIcon16() {
  const S = 16;
  const pixels = Buffer.alloc(S * S * 4, 0);

  // R=红色标题栏, W=白色内容区, D=深色日期, O=环孔(深色), ·=透明
  const grid = [
    // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
    ['·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·'], // 0
    ['·','·','·','R','R','R','R','R','R','R','R','R','R','·','·','·'], // 1
    ['·','·','R','R','R','R','R','R','R','R','R','R','R','R','·','·'], // 2
    ['·','R','R','R','O','R','R','R','R','R','R','O','R','R','R','·'], // 3  环在col4,11
    ['·','R','R','R','O','R','R','R','R','R','R','O','R','R','R','·'], // 4
    ['·','R','R','R','O','R','R','R','R','R','R','O','R','R','R','·'], // 5
    ['·','W','W','W','O','W','W','W','W','W','W','O','W','W','W','·'], // 6  环影入内容区
    ['·','W','W','W','O','W','W','W','W','W','W','O','W','W','W','·'], // 7
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 8
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 9
    ['·','W','W','W','W','W','D','D','D','D','W','W','W','W','W','·'], // 10
    ['·','W','W','W','W','W','D','D','D','D','W','W','W','W','W','·'], // 11
    ['·','W','W','W','W','W','W','D','D','W','W','W','W','W','W','·'], // 12
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 13
    ['·','·','W','W','W','W','W','W','W','W','W','W','W','W','·','·'], // 14
    ['·','·','·','·','W','W','W','W','W','W','W','W','·','·','·','·'], // 15
  ];

  const colorMap = {
    'R': COLORS.headerBg,
    'W': COLORS.bodyBg,
    'D': COLORS.textDark,
    'O': COLORS.ring,          // 环孔颜色（深红棕）
  };

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const cell = grid[y][x];
      if (cell === '·') {
        pixels[i + 3] = 0;
      } else {
        const c = colorMap[cell];
        setPixel(pixels, i, c[0], c[1], c[2], 255);
      }
    }
  }

  return pixels;
}

// 24x24 像素级日历图标 — 含装订环，与大图标一致
function drawCalendarIcon24() {
  const S = 24;
  const pixels = Buffer.alloc(S * S * 4, 0);

  // R=红色标题栏, W=白色内容区, D=深色日期, O=环孔, ·=透明
  const grid = [
    // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
    ['·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·'], // 0
    ['·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·'], // 1
    ['·','·','·','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','·','·','·'], // 2
    ['·','·','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','·','·'], // 3
    ['·','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','R','·'], // 4
    ['·','R','R','R','O','O','R','R','R','R','R','R','R','R','R','R','O','O','R','R','R','R','R','·'], // 5  环在4-5,17-18
    ['·','R','R','R','O','O','R','R','R','R','R','R','R','R','R','R','O','O','R','R','R','R','R','·'], // 6
    ['·','W','W','W','O','O','W','W','W','W','W','W','W','W','W','W','O','O','W','W','W','W','W','·'], // 7  环影入内容
    ['·','W','W','W','O','O','W','W','W','W','W','W','W','W','W','W','O','O','W','W','W','W','W','·'], // 8
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 9
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 10
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 11
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 12
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 13
    ['·','W','W','W','W','W','W','W','D','D','D','D','D','D','W','W','W','W','W','W','W','W','W','·'], // 14
    ['·','W','W','W','W','W','W','D','D','D','D','D','D','D','D','W','W','W','W','W','W','W','W','·'], // 15
    ['·','W','W','W','W','W','D','D','D','D','D','D','D','D','D','D','W','W','W','W','W','W','W','·'], // 16
    ['·','W','W','W','W','W','W','D','D','D','D','D','D','D','D','W','W','W','W','W','W','W','W','·'], // 17
    ['·','W','W','W','W','W','W','W','D','D','D','D','D','D','W','W','W','W','W','W','W','W','W','·'], // 18
    ['·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·'], // 19
    ['·','·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·','·'], // 20
    ['·','·','·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·','·','·'], // 21
    ['·','·','·','·','·','W','W','W','W','W','W','W','W','W','W','W','W','W','W','·','·','·','·','·'], // 22
    ['·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·','·'], // 23
  ];

  const colorMap = {
    'R': COLORS.headerBg,
    'W': COLORS.bodyBg,
    'D': COLORS.textDark,
    'O': COLORS.ring,
  };

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const cell = grid[y][x];
      if (cell === '·') {
        pixels[i + 3] = 0;
      } else {
        const c = colorMap[cell];
        setPixel(pixels, i, c[0], c[1], c[2], 255);
      }
    }
  }

  return pixels;
}

function drawCalendarIcon(size) {
  // 小尺寸用像素级精确设计
  if (size <= 16) return drawCalendarIcon16();
  if (size <= 24) return drawCalendarIcon24();

  const pixels = Buffer.alloc(size * size * 4, 0); // RGBA
  const S = size;

  // 缩放参数
  const margin = Math.max(1, Math.round(S * 0.06));       // 外边距
  const radius = Math.max(2, Math.round(S * 0.13));       // 圆角半径
  const headerH = Math.round((S - margin * 2) * 0.28);    // 标题栏高度
  const ringR = Math.max(2, Math.round(S * 0.09));        // 装订环半径
  const ringY = margin + Math.round(headerH * 0.42);       // 环的 Y 坐标
  const ringLeftX = margin + Math.round((S - margin * 2) * 0.2);   // 左环 X
  const ringRightX = S - margin - Math.round((S - margin * 2) * 0.2); // 右环 X

  // 日历主体区域
  const bodyLeft = margin;
  const bodyTop = margin;
  const bodyRight = S - margin;
  const bodyBottom = S - margin;

  // 日期数字大小
  const fontSize = Math.round(S * 0.45);

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;

      // 检查是否在日历主体圆角矩形内
      const inBody = isInRoundedRect(x, y, bodyLeft, bodyTop, bodyRight - bodyLeft, bodyBottom - bodyTop, radius);

      if (!inBody) {
        pixels[i + 3] = 0;
        continue;
      }

      // 判断是否在标题栏区域
      const inHeader = y >= bodyTop && y <= bodyTop + headerH &&
        isInRoundedRectTop(x, y, bodyLeft, bodyTop, bodyRight - bodyLeft, headerH, radius);

      if (inHeader) {
        setPixel(pixels, i, COLORS.headerBg[0], COLORS.headerBg[1], COLORS.headerBg[2], 255);
      } else if (y <= bodyTop + headerH) {
        setPixel(pixels, i, COLORS.bodyBg[0], COLORS.bodyBg[1], COLORS.bodyBg[2], 255);
      } else {
        // 内容区：白色，右下角加轻微阴影
        const shadowDist = Math.max(0, Math.max(
          (x - (bodyRight - S * 0.15)) / (S * 0.15),
          (y - (bodyBottom - S * 0.15)) / (S * 0.15)
        ));
        const shadowAlpha = Math.round(shadowDist * 25);
        const r = Math.min(255, COLORS.bodyBg[0] - shadowAlpha);
        const g = Math.min(255, COLORS.bodyBg[1] - shadowAlpha);
        const b = Math.min(255, COLORS.bodyBg[2] - shadowAlpha);
        setPixel(pixels, i, r, g, b, 255);
      }

      // 绘制装订环
      const distToLeftRing = Math.sqrt((x - ringLeftX) ** 2 + (y - ringY) ** 2);
      const distToRightRing = Math.sqrt((x - ringRightX) ** 2 + (y - ringY) ** 2);

      if (distToLeftRing <= ringR || distToRightRing <= ringR) {
        const dist = Math.min(distToLeftRing, distToRightRing);
        if (dist > ringR - Math.max(1, Math.round(S * 0.03))) {
          setPixel(pixels, i, COLORS.ring[0], COLORS.ring[1], COLORS.ring[2], 255);
        } else {
          setPixel(pixels, i, COLORS.headerBg[0], COLORS.headerBg[1], COLORS.headerBg[2], 255);
        }
      }
    }
  }

  // 在大尺寸图标上绘制日期数字 (>= 32px)
  if (S >= 32) {
    drawDateNumber(pixels, S, margin, headerH, '6', fontSize);
  }

  return pixels;
}

// ============================================================
// 在内容区绘制日期数字
// ============================================================
function drawDateNumber(pixels, S, margin, headerH, char, fontSize) {
  const bodyTop = margin + headerH;
  const bodyBottom = S - margin;
  const bodyLeft = margin;
  const bodyRight = S - margin;
  const bodyH = bodyBottom - bodyTop;
  const bodyW = bodyRight - bodyLeft;

  // 数字居中
  const cx = Math.round(bodyLeft + bodyW / 2);
  const cy = Math.round(bodyTop + bodyH * 0.55); // 略微偏下

  if (char === '·') {
    // 画一个粗点
    const dotR = Math.max(2, Math.round(S * 0.08));
    for (let y = cy - dotR; y <= cy + dotR; y++) {
      for (let x = cx - dotR; x <= cx + dotR; x++) {
        if (x >= 0 && x < S && y >= 0 && y < S) {
          const i = (y * S + x) * 4;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (dist <= dotR && pixels[i + 3] === 255) {
            setPixel(pixels, i, COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2], 240);
          }
        }
      }
    }
    return;
  }

  // 简化的 7-segment 风格数字 "6"
  const digitW = Math.round(fontSize * 0.55);
  const digitH = fontSize;
  const thick = Math.max(2, Math.round(fontSize * 0.14));

  const left = cx - Math.round(digitW / 2);
  const top = cy - Math.round(digitH / 2);

  // 数字 "6" 的形状（简化像素绘制）
  // 顶部横线
  fillRect(pixels, S, left, top, digitW, thick, COLORS.textDark, 240);
  // 左侧竖线（上半）
  fillRect(pixels, S, left, top, thick, Math.round(digitH / 2), COLORS.textDark, 240);
  // 中间横线
  fillRect(pixels, S, left, top + Math.round(digitH / 2) - Math.round(thick / 2), digitW, thick, COLORS.textDark, 240);
  // 左侧竖线（下半）
  fillRect(pixels, S, left, top + Math.round(digitH / 2), thick, Math.round(digitH / 2), COLORS.textDark, 240);
  // 底部横线
  fillRect(pixels, S, left, top + digitH - thick, digitW, thick, COLORS.textDark, 240);
  // 右侧竖线（下半）
  fillRect(pixels, S, left + digitW - thick, top + Math.round(digitH / 2), thick, Math.round(digitH / 2), COLORS.textDark, 240);
}

function fillRect(pixels, S, x, y, w, h, color, alpha) {
  const x0 = Math.max(0, Math.round(x));
  const y0 = Math.max(0, Math.round(y));
  const x1 = Math.min(S, Math.round(x + w));
  const y1 = Math.min(S, Math.round(y + h));
  for (let py = y0; py < y1; py++) {
    for (let px = x0; px < x1; px++) {
      const i = (py * S + px) * 4;
      if (pixels[i + 3] === 255) {
        setPixel(pixels, i, color[0], color[1], color[2], Math.min(255, alpha));
      }
    }
  }
}

// ============================================================
// 工具函数
// ============================================================
function setPixel(pixels, offset, r, g, b, a) {
  pixels[offset] = r;
  pixels[offset + 1] = g;
  pixels[offset + 2] = b;
  pixels[offset + 3] = a;
}

function isInRoundedRect(x, y, rx, ry, rw, rh, radius) {
  const left = rx;
  const right = rx + rw;
  const top = ry;
  const bottom = ry + rh;

  if (x < left || x >= right || y < top || y >= bottom) return false;

  // 检查四个角的圆角
  if (x < left + radius && y < top + radius) {
    const dx = left + radius - x;
    const dy = top + radius - y;
    return (dx * dx + dy * dy) <= radius * radius;
  }
  if (x >= right - radius && y < top + radius) {
    const dx = x - (right - radius);
    const dy = top + radius - y;
    return (dx * dx + dy * dy) <= radius * radius;
  }
  if (x < left + radius && y >= bottom - radius) {
    const dx = left + radius - x;
    const dy = y - (bottom - radius);
    return (dx * dx + dy * dy) <= radius * radius;
  }
  if (x >= right - radius && y >= bottom - radius) {
    const dx = x - (right - radius);
    const dy = y - (bottom - radius);
    return (dx * dx + dy * dy) <= radius * radius;
  }

  return true;
}

// 仅检查顶部圆角的矩形（用于标题栏）
function isInRoundedRectTop(x, y, rx, ry, rw, rh, radius) {
  const left = rx;
  const right = rx + rw;
  const top = ry;

  if (x < left || x >= right || y < top || y >= ry + rh) return false;

  if (x < left + radius && y < top + radius) {
    const dx = left + radius - x;
    const dy = top + radius - y;
    return (dx * dx + dy * dy) <= radius * radius;
  }
  if (x >= right - radius && y < top + radius) {
    const dx = x - (right - radius);
    const dy = top + radius - y;
    return (dx * dx + dy * dy) <= radius * radius;
  }

  return true;
}

// ============================================================
// PNG 编码器
// ============================================================
function createPNG(width, height, pixels) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // IDAT: raw image data with filter byte (0 = None) per row, then deflate
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width * 4)] = 0; // filter: None
    pixels.copy(rawData, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idat = createChunk('IDAT', compressed);

  // IEND
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);

  const crc = crc32(crcData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 查找表
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
})();

function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ============================================================
// ICO 编码器（内嵌 PNG）
// ============================================================
function createICO(pngBuffers) {
  // pngBuffers: [{ width, height, buffer }]
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);   // reserved
  header.writeUInt16LE(1, 2);   // type: ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count

  const dirEntries = [];
  let imageOffset = 6 + pngBuffers.length * 16;

  for (const entry of pngBuffers) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(entry.width === 256 ? 0 : entry.width, 0);   // width (0 means 256)
    dir.writeUInt8(entry.height === 256 ? 0 : entry.height, 1);  // height (0 means 256)
    dir.writeUInt8(0, 2);  // palette
    dir.writeUInt8(0, 3);  // reserved
    dir.writeUInt16LE(1, 4);  // planes
    dir.writeUInt16LE(32, 6); // bpp
    dir.writeUInt32LE(entry.buffer.length, 8); // size
    dir.writeUInt32LE(imageOffset, 12); // offset
    dirEntries.push(dir);
    imageOffset += entry.buffer.length;
  }

  const imageData = pngBuffers.map(e => e.buffer);
  return Buffer.concat([header, ...dirEntries, ...imageData]);
}

// ============================================================
// 主流程
// ============================================================
function main() {
  console.log('🎨 生成桌面日历清单图标...\n');

  // 确保 assets 目录存在
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // 生成各尺寸 PNG
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const pngEntries = [];

  for (const size of sizes) {
    const pixels = drawCalendarIcon(size);
    const pngBuffer = createPNG(size, size, pixels);
    const pngPath = path.join(ASSETS_DIR, `icon-${size}.png`);
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`  ✓ icon-${size}.png  (${size}x${size}, ${pngBuffer.length} bytes)`);

    pngEntries.push({ width: size, height: size, buffer: pngBuffer });
  }

  // 生成主 PNG（256x256，用于窗口图标）
  const mainPng = pngEntries.find(e => e.width === 256);
  fs.writeFileSync(path.join(ASSETS_DIR, 'icon.png'), mainPng.buffer);

  // 生成 ICO（包含 16, 24, 32, 48, 64, 128, 256）
  const icoBuffer = createICO(pngEntries);
  fs.writeFileSync(path.join(ASSETS_DIR, 'icon.ico'), icoBuffer);
  console.log(`\n  ✓ icon.ico  (${pngEntries.length} sizes, ${icoBuffer.length} bytes)`);

  // 保存 SVG 源文件
  const svg = createSVG();
  fs.writeFileSync(path.join(ASSETS_DIR, 'icon.svg'), svg);
  console.log(`  ✓ icon.svg  (source design)`);

  console.log('\n✅ 图标生成完成！');
}

// ============================================================
// SVG 源文件（矢量设计稿）
// ============================================================
function createSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ea5555"/>
      <stop offset="100%" stop-color="#d23d3d"/>
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f5f5f5"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- 日历主体 -->
  <rect x="16" y="16" width="224" height="224" rx="32" ry="32"
        fill="url(#bodyGrad)" filter="url(#shadow)"/>

  <!-- 标题栏 -->
  <path d="M16,48 A32,32 0 0,1 48,16 L208,16 A32,32 0 0,1 240,48 L240,88 L16,88 Z"
        fill="url(#headerGrad)"/>

  <!-- 装订环 -->
  <circle cx="60" cy="52" r="20" fill="none" stroke="#b43232" stroke-width="6"/>
  <circle cx="60" cy="52" r="10" fill="#ea5555"/>
  <circle cx="196" cy="52" r="20" fill="none" stroke="#b43232" stroke-width="6"/>
  <circle cx="196" cy="52" r="10" fill="#ea5555"/>

  <!-- 日期数字 "6" -->
  <text x="128" y="170" text-anchor="middle"
        font-family="Segoe UI, Microsoft YaHei, sans-serif"
        font-size="100" font-weight="900" fill="#2d2d2d">6</text>
</svg>`;
}

main();
