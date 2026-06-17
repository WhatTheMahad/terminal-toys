#!/usr/bin/env node
'use strict';

const { c, sleep, pick, line, box } = require('../lib/ui');
const data = require('../lib/data/panic.json');

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;
  line();

  // Escalating scream.
  const widths = [8, 16, 28, 44, 60];
  for (const w of widths) {
    line('  ' + c.brightRed('A'.repeat(w)));
    if (!fast) await sleep(140);
  }
  line();

  // Diagnostic.
  process.stdout.write('  ' + c.dim(pick(data.diagnostics)));
  if (!fast) {
    for (let i = 0; i < 4; i++) {
      await sleep(400);
      process.stdout.write(c.dim('.'));
    }
  }
  process.stdout.write('\n');
  line(c.dim('  Diagnostic complete.'));
  line();

  const verdict = pick(data.verdicts);
  line(box([
    c[verdict.color](c.bold('  ' + verdict.label)),
    '',
    c.gray('  ' + verdict.note),
  ], { color: verdict.color }));
  line();
}

main();
