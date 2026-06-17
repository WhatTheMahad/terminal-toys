#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const { c, sleep, pick, shuffle, line, box } = require('../lib/ui');
const roasts = require('../lib/data/roasts.json');

function safe(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  } catch {
    return null;
  }
}

function fill(template, n) {
  return template.replace('{n}', n);
}

async function main() {
  const fast = process.argv.includes('--fast') || !process.stdout.isTTY;

  const inside = safe('git rev-parse --is-inside-work-tree');
  if (!inside || inside.trim() !== 'true') {
    line();
    line(c.brightRed('  No git repo here. Nothing to roast.'));
    line(c.gray('  (Even your lack of a repo is a little disappointing.)'));
    line();
    process.exit(0);
  }

  const subjects = (safe('git log --pretty=format:%s') || '')
    .split('\n')
    .filter(Boolean);
  const authors = (safe('git log --pretty=format:%an') || '')
    .split('\n')
    .filter(Boolean);
  const hours = (safe('git log --pretty=format:%ad --date=format:%H') || '')
    .split('\n')
    .filter(Boolean)
    .map(Number);

  if (subjects.length === 0) {
    line();
    line(c.brightRed('  Zero commits. A truly blank canvas of failure.'));
    line();
    process.exit(0);
  }

  const lower = (s) => s.toLowerCase();
  const count = (re) => subjects.filter((s) => re.test(lower(s))).length;

  const wip = count(/\bwip\b|work in progress/);
  const fixes = count(/\bfix(es|ed|ing)?\b/);
  const finals = count(/\bfinal\b/);
  const typos = count(/\btypo\b/);
  const reverts = count(/^revert\b/);
  const allLower = subjects.filter((s) => s === lower(s) && /[a-z]/.test(s)).length;
  const avgLen = Math.round(subjects.reduce((a, s) => a + s.length, 0) / subjects.length);
  const nightCommits = hours.filter((h) => h >= 0 && h < 5).length;
  const nightPct = hours.length ? Math.round((nightCommits / hours.length) * 100) : 0;
  const uniqueAuthors = new Set(authors).size;

  // Build a roster of applicable burns, then pick a few.
  const burns = [];
  burns.push(pick(roasts.generic));
  if (wip >= 2) burns.push(fill(pick(roasts.wip_commits), wip));
  if (fixes >= 3) burns.push(fill(pick(roasts.fix_commits), fixes));
  if (finals >= 1) burns.push(fill(pick(roasts.final_commits), finals));
  if (typos >= 1) burns.push(fill(pick(roasts.typo_commits), typos));
  if (reverts >= 1) burns.push(fill(pick(roasts.revert_commits), reverts));
  if (allLower / subjects.length > 0.8) burns.push(pick(roasts.lowercase));
  if (avgLen < 12) burns.push(fill(pick(roasts.short_messages), avgLen));
  else if (avgLen > 70) burns.push(fill(pick(roasts.long_messages), avgLen));
  if (nightPct >= 25) burns.push(fill(pick(roasts.night_owl), nightPct));
  if (uniqueAuthors === 1) burns.push(pick(roasts.single_author));

  const chosen = shuffle(burns).slice(0, Math.min(4, burns.length));
  chosen.push(pick(roasts.compliments));

  line();
  process.stdout.write('  ' + c.dim('reading ' + subjects.length + ' commits and judging you'));
  if (!fast) {
    for (let i = 0; i < 4; i++) {
      await sleep(380);
      process.stdout.write(c.dim('.'));
    }
  }
  process.stdout.write('\n\n');

  line(c.bold(c.brightRed('  🔥 GIT ROAST 🔥')));
  line();
  for (const b of chosen) {
    line(box([c.brightYellow(b)], { color: 'red' }));
    if (!fast) await sleep(250);
  }
  line();
}

main();
