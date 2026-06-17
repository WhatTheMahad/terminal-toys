#!/usr/bin/env node
'use strict';

const { c, sleep, pick, line } = require('../lib/ui');

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const options = args.length >= 2 ? args : ['heads', 'tails'];

  const faces = ['◜', '◝', '◞', '◟'];
  if (process.stdout.isTTY && !process.argv.includes('--fast')) {
    line();
    for (let i = 0; i < 14; i++) {
      process.stdout.write('\r  ' + c.yellow(faces[i % faces.length]) + ' flipping...');
      await sleep(60 + i * 8);
    }
    process.stdout.write('\r' + ' '.repeat(24) + '\r');
  }

  const winner = pick(options);
  line('  ' + c.bold(c.brightGreen(winner.toUpperCase())));
  line();
}

main();
