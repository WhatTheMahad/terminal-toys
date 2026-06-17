#!/usr/bin/env node
'use strict';

const { c, sleep, pick, sample, line } = require('../lib/ui');
const data = require('../lib/data/procrastinator.json');

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;
  const count = 4;

  line();
  line(c.bold('  Before working today:'));
  line();

  for (const task of sample(data.tasks, count)) {
    line('  ' + c.gray('□') + ' ' + task);
    if (!fast) await sleep(180);
  }

  line();
  line(c.dim('  ' + pick(data.closers)));
  line();
}

main();
