#!/usr/bin/env node
'use strict';

const { c, sleep, line } = require('../lib/ui');

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;
  // Optional intensity: `scream 5`
  const arg = process.argv.slice(2).find((a) => /^\d+$/.test(a));
  const intensity = arg ? Math.min(Math.max(parseInt(arg, 10), 1), 12) : 7;

  const colors = ['white', 'brightYellow', 'yellow', 'brightRed', 'red'];
  line();
  for (let i = 1; i <= intensity; i++) {
    const len = i * 6;
    const color = colors[Math.min(i - 1, colors.length - 1)];
    line(c[color]('A'.repeat(len)) + (i === intensity ? c[color]('!!!') : ''));
    if (!fast) await sleep(110);
  }
  line();
  line(c.dim('  (feel better? me neither.)'));
  line();
}

main();
