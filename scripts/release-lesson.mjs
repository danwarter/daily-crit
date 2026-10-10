#!/usr/bin/env node
// Releases the next finished lesson: flips the lowest-numbered lesson with status:'ready'
// to status:'live' in index.html. The daily workflow runs this and commits the change.
//
//   node scripts/release-lesson.mjs           release one lesson, once per Pacific day, from 6am
//   node scripts/release-lesson.mjs --force   release one now, ignoring the time and once-a-day checks
//   node scripts/release-lesson.mjs --check   say what would happen, change nothing
//
// On a release it prints the commit message on stdout. Everything else goes to stderr.
// It refuses to release a lesson that has no tooltip steps or no <template>, so a
// half-built lesson can't go live by accident.

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'index.html');
const ZONE = 'America/Los_Angeles';
const RELEASE_HOUR = 6;
const PREFIX = 'Release lesson';
const args = process.argv.slice(2);
const say = msg => console.error('release-lesson: ' + msg);
const stop = msg => { say(msg); process.exit(0); };
const fail = msg => { say(msg); process.exit(1); };

const pacific = d => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: ZONE, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(d).map(x => [x.type, x.value]));
  return { day: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour) };
};

if (!args.includes('--force')) {
  const now = pacific(new Date());
  if (now.hour < RELEASE_HOUR) stop(`it is before ${RELEASE_HOUR}am Pacific, nothing to do yet.`);
  let log = '';
  try { log = execFileSync('git', ['log', '-30', '--format=%cI\t%s'], { cwd: ROOT, encoding: 'utf8' }); } catch { say('could not read git history; skipping the once-a-day check.'); }
  const already = log.split('\n').some(line => { const [when, subject] = line.split('\t'); return subject?.startsWith(PREFIX) && pacific(new Date(when)).day === now.day; });
  if (already) stop('a lesson was already released today.');
}

const html = readFileSync(FILE, 'utf8');
const start = html.indexOf('const THEMES'), lessonsAt = html.indexOf('const LESSONS'), end = html.indexOf('\n];', lessonsAt);
if (start < 0 || lessonsAt < 0 || end < 0) fail('could not find the lesson data in index.html.');
const { LESSONS } = vm.runInNewContext(html.slice(start, end + 3) + '\n;({ LESSONS })');

const next = LESSONS.filter(l => l.status === 'ready').sort((a, b) => a.n - b.n)[0];
if (!next) stop('no lesson is marked ready.');
if (!next.steps?.before?.title || !next.steps?.after?.title) fail(`lesson ${next.n} is marked ready but has no tooltip steps.`);
if (!html.includes(`<template id="tpl-${next.slug}">`)) fail(`lesson ${next.n} is marked ready but has no <template id="tpl-${next.slug}">.`);

const entry = new RegExp(`(\\{ n:${next.n}, slug:'${next.slug}'[^\\n]*?status:')ready(')`);
if (html.match(new RegExp(entry, 'g'))?.length !== 1) fail(`could not find lesson ${next.n}'s status in index.html.`);
const left = LESSONS.filter(l => l.status === 'ready').length - 1;
if (args.includes('--check')) stop(`would release lesson ${next.n}: ${next.title} (${left} more ready after it).`);

writeFileSync(FILE, html.replace(entry, '$1live$2'));
say(`released lesson ${next.n}: ${next.title} (${left} more ready).`);
console.log(`${PREFIX} ${next.n}: ${next.title}`);
