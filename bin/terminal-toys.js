#!/usr/bin/env node
'use strict';

const { c, line, box } = require('../lib/ui');
const pkg = require('../package.json');

const toys = [
  ['coinflip', 'Flip a coin, or pick between your own options', 'coinflip pizza burger'],
  ['decision', 'Decides for you, then reads your disappointed face', 'decision pizza burger'],
  ['oracle', 'Ask the mystic terminal a yes/no question', 'oracle "should i quit?"'],
  ['excuse', 'A scientifically valid reason not to work today', 'excuse'],
  ['luck', "Roll today's luck meter + a fortune", 'luck'],
  ['panic', 'Scream, then receive a professional diagnosis', 'panic'],
  ['scream', 'AAAAAAAA (with adjustable intensity)', 'scream 9'],
  ['procrastinator', 'Generate a list of things to avoid your task', 'procrastinator'],
  ['touchgrass', 'Analyzes your screen time and prescribes the outdoors', 'touchgrass'],
  ['git-roast', 'Reads your commit history and roasts you', 'git-roast'],
  ['compliment', 'The wholesome opposite of git-roast', 'compliment'],
  ['blame-me', 'Find someone (or something) else to blame', 'blame-me'],
  ['dramaticexit', 'A theatrical farewell before you log off', 'dramaticexit'],
  ['feedback', 'Like it? Star, share, or report a bug', 'feedback'],
];

line();
line(box([
  c.bold(c.brightMagenta('  🎪  terminal-toys  ') + c.dim('v' + pkg.version)),
  c.gray('  Useless commands. Maximum personality.'),
], { color: 'magenta' }));
line();

const width = Math.max(...toys.map((t) => t[0].length));
for (const [name, desc, example] of toys) {
  line('  ' + c.brightCyan(name.padEnd(width)) + '  ' + c.gray(desc));
  line('  ' + ' '.repeat(width) + '  ' + c.dim('$ ' + example));
}
line();
line(c.dim('  Add --fast to skip the animations. Contributions welcome.'));
line();
