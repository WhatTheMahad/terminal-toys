#!/usr/bin/env node
'use strict';

const { c, sleep, sample, line, box } = require('../lib/ui');
const excuses = require('../lib/data/excuses.json');

async function main() {
  const args = process.argv.slice(2);
  const countFlag = args.find((a) => /^--?\d+$/.test(a) || /^-n\d+$/.test(a));
  let count = 1;
  const nIndex = args.indexOf('-n');
  if (nIndex !== -1 && args[nIndex + 1]) count = parseInt(args[nIndex + 1], 10) || 1;
  else if (countFlag) count = parseInt(countFlag.replace(/\D/g, ''), 10) || 1;
  count = Math.min(Math.max(count, 1), excuses.length);

  line();
  line(c.bold("  You can't work today."));
  line();

  for (const ex of sample(excuses, count)) {
    line(box([c.brightYellow(ex)], { color: 'yellow' }));
    if (count > 1) await sleep(0);
  }
  line();
}

main();
