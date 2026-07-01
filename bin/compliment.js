#!/usr/bin/env node
'use strict';

// The wholesome counterpart to git-roast.

const { c, sleep, sample, line, box } = require('../lib/ui');
const compliments = require('../lib/data/compliments.json');

async function main() {
  const args = process.argv.slice(2);
  let count = 1;
  const nIndex = args.indexOf('-n');
  if (nIndex !== -1 && args[nIndex + 1]) count = parseInt(args[nIndex + 1], 10) || 1;
  else {
    const countFlag = args.find((a) => /^--?\d+$/.test(a));
    if (countFlag) count = parseInt(countFlag.replace(/\D/g, ''), 10) || 1;
  }
  count = Math.min(Math.max(count, 1), compliments.length);

  line();
  line(c.bold('  💚 A compliment, just for you:'));
  line();

  for (const nice of sample(compliments, count)) {
    line(box([c.brightGreen(nice)], { color: 'green' }));
    if (count > 1) await sleep(0);
  }
  line();
}

main();
