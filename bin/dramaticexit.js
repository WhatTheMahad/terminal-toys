#!/usr/bin/env node
'use strict';

const { c, sleep, pick, type, line } = require('../lib/ui');
const data = require('../lib/data/dramaticexit.json');

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;
  const monologue = pick(data.monologues);

  line();
  for (const l of monologue) {
    await type('  ' + c.italic(c.cyan(l)), 32);
    if (!fast) await sleep(700);
  }
  if (!fast) await sleep(600);
  line();
  line(c.dim(c.gray('  ' + pick(data.signoffs))));
  line();
}

main();
