#!/usr/bin/env node
'use strict';

const { c, sleep, pick, line, box } = require('../lib/ui');
const data = require('../lib/data/luck.json');

function meter(pct) {
  const width = 20;
  const filled = Math.round((pct / 100) * width);
  const color = pct >= 70 ? 'brightGreen' : pct >= 40 ? 'brightYellow' : 'brightRed';
  return c[color]('█'.repeat(filled)) + c.gray('░'.repeat(width - filled));
}

async function main() {
  line();
  if (process.stdout.isTTY && !process.argv.includes('--fast')) {
    process.stdout.write('  ' + c.dim('rolling your luck'));
    for (let i = 0; i < 3; i++) {
      await sleep(400);
      process.stdout.write(c.dim('.'));
    }
    process.stdout.write('\n\n');
  }

  const pct = Math.floor(Math.random() * 101);
  const tier =
    pct >= 90 ? 'COSMICALLY BLESSED' :
    pct >= 70 ? 'FORTUNATE' :
    pct >= 40 ? 'AVERAGE-ISH' :
    pct >= 15 ? 'PROCEED WITH CAUTION' :
    'CURSED (but charmingly so)';

  line(box([
    c.bold('  Luck level: ' + pct + '%'),
    '  ' + meter(pct),
    '',
    c.bold(c.cyan('  ' + tier)),
    '',
    c.gray('  ' + pick(data.fortunes)),
  ], { color: 'cyan' }));
  line();
}

main();
