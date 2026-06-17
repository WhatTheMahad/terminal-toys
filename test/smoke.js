'use strict';

// Minimal smoke test: every toy must run with --fast and exit 0.
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const binDir = path.join(__dirname, '..', 'bin');
const bins = fs.readdirSync(binDir).filter((f) => f.endsWith('.js'));

const invocations = {
  'coinflip.js': ['pizza', 'burger'],
  'decision.js': ['pizza', 'burger'],
  'oracle.js': ['should i ship it'],
  'scream.js': ['5'],
};

let failed = 0;
for (const bin of bins) {
  const args = [path.join(binDir, bin), '--fast', ...(invocations[bin] || [])];
  try {
    execFileSync('node', args, { stdio: 'pipe', timeout: 15000 });
    console.log('  ok   ' + bin);
  } catch (err) {
    failed++;
    console.error('  FAIL ' + bin + ' -> ' + (err.message || err));
  }
}

if (failed) {
  console.error('\n' + failed + ' toy(s) failed.');
  process.exit(1);
}
console.log('\nAll ' + bins.length + ' toys ran clean.');
