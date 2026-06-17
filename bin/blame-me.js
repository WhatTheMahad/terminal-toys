#!/usr/bin/env node
'use strict';

const { c, sleep, pick, line, box } = require('../lib/ui');
const data = require('../lib/data/blame.json');

async function main() {
  const subject = process.argv
    .slice(2)
    .filter((a) => !a.startsWith('-'))
    .join(' ')
    .trim();

  line();
  process.stdout.write('  ' + c.dim('investigating' + (subject ? ' "' + subject + '"' : '')));
  if (process.stdout.isTTY && !process.argv.includes('--fast')) {
    for (let i = 0; i < 3; i++) {
      await sleep(450);
      process.stdout.write(c.dim('.'));
    }
  }
  process.stdout.write('\n\n');

  const culprit = pick(data.who);
  line(box([
    c.gray('  It was not your fault.'),
    '',
    c.bold('  The real culprit: ') + c.brightRed(culprit) + '.',
    '',
    c.green('  ' + pick(data.verdicts)),
  ], { color: 'red' }));
  line();
}

main();
