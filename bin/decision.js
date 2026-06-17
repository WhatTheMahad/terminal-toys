#!/usr/bin/env node
'use strict';

// The decision isn't the output. The reaction is.

const { c, sleep, pick, line } = require('../lib/ui');

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));

  if (args.length < 2) {
    line(c.gray('Usage: decision <option> <option> [more options...]'));
    line(c.gray('Example: decision pizza burger'));
    process.exit(0);
  }

  line();
  process.stdout.write('  ' + c.dim('deciding'));
  if (process.stdout.isTTY && !process.argv.includes('--fast')) {
    for (let i = 0; i < 3; i++) {
      await sleep(450);
      process.stdout.write(c.dim('.'));
    }
  }
  process.stdout.write('\n\n');

  const winner = pick(args);
  line('  ' + c.bold(c.brightCyan(winner)));
  line();

  // The pause. Let it sit.
  await sleep(process.argv.includes('--fast') ? 0 : 3000);

  const others = args.filter((a) => a !== winner);
  const wanted = others.length ? pick(others) : winner;
  line(c.gray('  Your face looked disappointed.'));
  await sleep(process.argv.includes('--fast') ? 0 : 900);
  line(c.gray(`  You wanted ${wanted}.`));
  await sleep(process.argv.includes('--fast') ? 0 : 900);
  line();
  line(c.dim('  Now you know. Go get ' + wanted + '.'));
  line();
}

main();
