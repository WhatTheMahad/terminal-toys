#!/usr/bin/env node
'use strict';

const { c, sleep, pick, line, box } = require('../lib/ui');
const data = require('../lib/data/oracle.json');

async function main() {
  const question = process.argv
    .slice(2)
    .filter((a) => !a.startsWith('-'))
    .join(' ')
    .trim();

  line();
  line(c.magenta('       . * .'));
  line(c.magenta('     *  🔮  *') + (question ? c.gray('   "' + question + '"') : ''));
  line(c.magenta('       . * .'));
  line();

  if (process.stdout.isTTY && !process.argv.includes('--fast')) {
    process.stdout.write('  ' + c.dim('the oracle peers into the mist'));
    for (let i = 0; i < 3; i++) {
      await sleep(500);
      process.stdout.write(c.dim('.'));
    }
    process.stdout.write('\n\n');
  }

  // Slightly weighted toward decisive answers; the maybes are the spice.
  const roll = Math.random();
  const bucket = roll < 0.4 ? 'yes' : roll < 0.8 ? 'no' : 'maybe';
  const answer = pick(data[bucket]);
  const color = bucket === 'yes' ? 'brightGreen' : bucket === 'no' ? 'brightRed' : 'brightYellow';

  line(box([c[color](c.bold(answer))], { color: 'magenta' }));
  line();
}

main();
