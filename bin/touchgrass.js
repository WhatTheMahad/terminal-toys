#!/usr/bin/env node
'use strict';

const os = require('os');
const { execSync, exec } = require('child_process');
const { c, sleep, pick, line, box } = require('../lib/ui');

function safe(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

function commitsToday() {
  const out = safe('git log --since=midnight --oneline 2>/dev/null');
  if (!out) return null;
  return out.split('\n').filter(Boolean).length;
}

function terminalSessions() {
  // Logged-in shell sessions (best-effort, cross-platform-ish).
  const who = safe('who');
  if (who) return who.split('\n').filter(Boolean).length;
  return null;
}

function shellProcesses() {
  const out = safe('ps -A -o comm 2>/dev/null');
  if (!out) return null;
  const shells = ['zsh', 'bash', 'fish', 'sh', 'node', 'tmux'];
  return out
    .split('\n')
    .filter((l) => shells.some((s) => l.endsWith('/' + s) || l === s)).length;
}

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;
  const go = process.argv.includes('--go');

  line();
  process.stdout.write('  ' + c.dim('running system analysis'));
  if (!fast) {
    for (let i = 0; i < 4; i++) {
      await sleep(380);
      process.stdout.write(c.dim('.'));
    }
  }
  process.stdout.write('\n\n');

  const uptimeHours = (os.uptime() / 3600).toFixed(1);
  const loadShells = shellProcesses();
  const sessions = terminalSessions();
  const commits = commitsToday();
  const mem = Math.round((1 - os.freemem() / os.totalmem()) * 100);

  const stats = [];
  stats.push(`${c.brightCyan(uptimeHours + 'h')} since your machine last rested`);
  if (loadShells != null) stats.push(`${c.brightCyan(loadShells)} shell/terminal processes alive`);
  if (sessions != null) stats.push(`${c.brightCyan(sessions)} active login session(s)`);
  if (commits != null) stats.push(`${c.brightCyan(commits)} git commit(s) today`);
  stats.push(`${c.brightCyan(mem + '%')} of your RAM held hostage`);

  line(c.bold('  System analysis complete.'));
  line();
  line('  You have:');
  for (const s of stats) line('   ' + c.gray('-') + ' ' + s);
  line();

  const verdict =
    commits > 8 || Number(uptimeHours) > 48
      ? 'It is time. The grass misses you.'
      : pick([
          'Prescription: go outside.',
          'Prescription: locate a window. Then a door.',
          'Prescription: sunlight, 1 dose, taken externally.',
          'Prescription: touch one (1) blade of grass.',
        ]);

  line(box([
    c.brightGreen(c.bold('  ' + verdict)),
    '',
    c.gray('  Nearest park: ') + c.underline('https://www.google.com/maps/search/park+near+me'),
  ], { color: 'green' }));
  line();

  if (go && process.platform === 'darwin') {
    exec('open "https://www.google.com/maps/search/park+near+me"');
    line(c.dim('  Opening directions to the outdoors...'));
    line();
  } else {
    line(c.dim('  (run `touchgrass --go` to open the map)'));
    line();
  }
}

main();
