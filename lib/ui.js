'use strict';

// Tiny zero-dependency terminal UI helpers shared by every toy.

const useColor =
  process.stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== 'dumb';

const codes = {
  reset: 0,
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  blink: 5,
  inverse: 7,
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  gray: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
};

function wrap(name, str) {
  if (!useColor) return String(str);
  return `\x1b[${codes[name]}m${str}\x1b[0m`;
}

// c.red('hi'), c.bold('hi'), etc.
const c = {};
for (const name of Object.keys(codes)) {
  if (name === 'reset') continue;
  c[name] = (str) => wrap(name, str);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

// Typewriter effect. Honors --fast / piped output (skips the delay).
async function type(str, delay = 22) {
  const instant = !process.stdout.isTTY || process.argv.includes('--fast');
  if (instant) {
    process.stdout.write(str + '\n');
    return;
  }
  for (const char of str) {
    process.stdout.write(char);
    if (char !== ' ') await sleep(delay);
  }
  process.stdout.write('\n');
}

function line(str = '') {
  process.stdout.write(str + '\n');
}

const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

// Visible column width, counting emoji / wide glyphs as 2 columns.
function displayWidth(s) {
  let w = 0;
  for (const ch of stripAnsi(s)) {
    const cp = ch.codePointAt(0);
    const wide =
      cp >= 0x1100 &&
      (cp <= 0x115f || // Hangul Jamo
        (cp >= 0x2600 && cp <= 0x27bf) || // misc symbols + dingbats
        (cp >= 0x1f000 && cp <= 0x1faff) || // emoji
        (cp >= 0x2e80 && cp <= 0xa4cf) || // CJK
        (cp >= 0xac00 && cp <= 0xd7a3) || // Hangul syllables
        (cp >= 0xf900 && cp <= 0xfaff) || // CJK compat
        (cp >= 0xfe30 && cp <= 0xfe4f) || // CJK compat forms
        (cp >= 0xff00 && cp <= 0xff60)); // fullwidth forms
    w += wide ? 2 : ch === '️' ? 0 : 1;
  }
  return w;
}

// Draw a rounded box around an array of (already-colored) lines.
function box(lines, { padding = 1, color = 'gray' } = {}) {
  const width = Math.max(...lines.map((l) => displayWidth(l)));
  const pad = ' '.repeat(padding);
  const horizontal = '─'.repeat(width + padding * 2);
  const top = c[color]('╭' + horizontal + '╮');
  const bottom = c[color]('╰' + horizontal + '╯');
  const body = lines.map((l) => {
    const visible = displayWidth(l);
    const fill = ' '.repeat(width - visible);
    return c[color]('│') + pad + l + fill + pad + c[color]('│');
  });
  return [top, ...body, bottom].join('\n');
}

module.exports = { c, sleep, pick, shuffle, sample, type, line, box, useColor };
