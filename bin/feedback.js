#!/usr/bin/env node
'use strict';

const { exec } = require('child_process');
const { c, line, box } = require('../lib/ui');

const REPO = 'https://github.com/WhatTheMahad/terminal-toys';

line();
line(box([
  c.bold('  Enjoying terminal-toys?'),
  '',
  '  ⭐ ' + c.brightYellow('Star on GitHub') + '   ' + c.gray(REPO),
  '  💬 ' + c.brightCyan('Tell me your favorite command') + '   ' + c.gray(REPO + '/discussions'),
  '  🐛 ' + c.brightRed('Report a bug') + '   ' + c.gray(REPO + '/issues/new'),
], { color: 'magenta' }));
line();

if (process.argv.includes('--star') && process.platform === 'darwin') {
  exec('open "' + REPO + '"');
  line(c.dim('  Opening GitHub...'));
  line();
} else {
  line(c.dim('  (run `feedback --star` to open the repo)'));
  line();
}
