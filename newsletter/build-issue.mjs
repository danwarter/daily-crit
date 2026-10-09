#!/usr/bin/env node
// Builds one issue of "The weekly crit" from the lesson data in ../index.html.
//
//   node newsletter/build-issue.mjs                 build the next issue
//   node newsletter/build-issue.mjs --feature 8     pick the featured lesson
//   node newsletter/build-issue.mjs --from 8 --to 14 --issue 1 --date "Oct 12"
//   node newsletter/build-issue.mjs --draft         also create a draft in Buttondown
//   node newsletter/build-issue.mjs --mark-sent     record the issue in state.json
//
// Output: newsletter/issues/issue-NN.html (paste-ready for Buttondown, Markdown mode)
//         newsletter/img/NN-slug-before.png and -after.png (served from dailycrit.app once on main)
//
// "This week's lessons" are the live lessons numbered after state.json's lastLesson.
// The first run (lastLesson 0) takes the latest seven. Nothing is ever sent from here:
// --draft only creates a draft for you to review and send in Buttondown.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SITE = 'https://dailycrit.app';
const STATE_FILE = join(HERE, 'state.json');
const FIRST_RUN_COUNT = 7;
const PEEK_COUNT = 3;

// ---------- arguments ----------
const argv = process.argv.slice(2);
const flag = name => argv.includes('--' + name);
const opt = name => { const i = argv.indexOf('--' + name); return i > -1 ? argv[i + 1] : undefined; };
const num = name => { const v = opt(name); if (v === undefined) return undefined; const n = Number(v); if (!Number.isInteger(n)) fail(`--${name} needs a whole number`); return n; };
function fail(msg) { console.error('build-issue: ' + msg); process.exit(1); }

// ---------- lesson data ----------
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const start = html.indexOf('const THEMES');
const lessonsAt = html.indexOf('const LESSONS');
const end = html.indexOf('\n];', lessonsAt);
if (start < 0 || lessonsAt < 0 || end < 0) fail('could not find THEMES…LESSONS in index.html');
const { PROBLEMS, SCREENS, LESSONS } = vm.runInNewContext(html.slice(start, end + 3) + '\n;({ PROBLEMS, SCREENS, LESSONS })');

const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : { lastIssue: 0, lastLesson: 0 };
const live = LESSONS.filter(l => l.status === 'live').sort((a, b) => a.n - b.n);
if (!live.length) fail('no live lessons');

const to = num('to') ?? live.at(-1).n;
const from = num('from') ?? (state.lastLesson ? state.lastLesson + 1 : Math.max(live[0].n, live.at(-1).n - FIRST_RUN_COUNT + 1));
const week = live.filter(l => l.n >= from && l.n <= to);
if (!week.length) { console.log(`No new live lessons after lesson ${state.lastLesson}. Nothing to build.`); process.exit(0); }

const featuredN = num('feature') ?? week.at(-1).n;
const featured = week.find(l => l.n === featuredN) || fail(`lesson ${featuredN} is not a live lesson between ${from} and ${to}`);
const others = week.filter(l => l !== featured);
const peek = LESSONS.filter(l => l.status !== 'live' && l.n > to).sort((a, b) => a.n - b.n).slice(0, PEEK_COUNT);
const issue = num('issue') ?? state.lastIssue + 1;
const date = opt('date') ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ---------- helpers ----------
const pad = n => String(n).padStart(2, '0');
const slugify = s => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Escape for HTML and turn every non-ASCII character into an entity, so the email survives any encoding.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  .replace(/[^\x00-\x7F]/gu, c => `&#${c.codePointAt(0)};`);
const lessonUrl = l => `${SITE}/#/lessons/${l.slug}`;
const imgName = (l, s) => `${pad(l.n)}-${l.slug}-${s}.png`;
const imgUrl = (l, s) => `${SITE}/newsletter/img/${imgName(l, s)}`;

// ---------- screenshots of the featured lesson ----------
async function shoot(lesson) {
  const { chromium } = await import('playwright').catch(() => fail('Playwright is missing. Run: cd newsletter && npm install && npx playwright install chromium'));
  mkdirSync(join(HERE, 'img'), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.goto(pathToFileURL(join(ROOT, 'index.html')).href + '#/lessons/' + lesson.slug);
  await page.waitForSelector('.phone .tip');
  await page.evaluate(() => document.fonts.ready);
  // The tooltip text goes into the email as real text, so hide the tooltip and its beacon
  // and keep the highlight ring. Clear the backgrounds behind the phone so the PNG is transparent.
  await page.addStyleTag({ content: '.tip,.beacon{visibility:hidden!important}.phone{box-shadow:0 0 0 9px var(--bezel)!important}' });
  await page.evaluate(() => { for (let el = document.querySelector('.phone').parentElement; el; el = el.parentElement) el.style.setProperty('background', 'transparent', 'important'); });
  for (const s of ['before', 'after']) {
    if (s === 'after') await page.click('.switch [data-s="after"]');
    await page.waitForSelector(`[data-lesson-root][data-state="${s}"] .ring.show`, { timeout: 20000 });
    await page.waitForTimeout(1800); // let the transition and the ring settle
    const box = await page.locator('.phone').boundingBox();
    const m = 10; // the bezel is a 9px shadow outside the element
    await page.screenshot({ path: join(HERE, 'img', imgName(lesson, s)), omitBackground: true,
      clip: { x: box.x - m, y: box.y - m, width: box.width + m * 2, height: box.height + m * 2 } });
  }
  await browser.close();
}

// ---------- email ----------
const SANS = `'Space Grotesk',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif`;
const DISPLAY = `'Outfit','Space Grotesk',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif`;
const T = `role="presentation" cellpadding="0" cellspacing="0" border="0"`;
const DOTS = `background-color:#EFEFEF;background-image:radial-gradient(#D6D6D6 1px,transparent 1px);background-size:16px 16px;`;
const rule = `<tr><td style="border-top:1px solid #DCDCDC;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>`;

const half = (l, s) => {
  const step = l.steps[s], label = s === 'before' ? 'Before' : 'After';
  return `<div style="display:inline-block;width:100%;max-width:262px;vertical-align:top;font-size:14px;">
<table ${T} width="100%"><tr><td style="padding:6px;">
<table ${T} width="100%">
<tr><td style="font-family:${SANS};font-size:12px;font-weight:500;color:#595959;padding:0 0 10px 2px;">${esc(l.frame || l.title)} / ${label}</td></tr>
<tr><td align="center" style="padding:0 0 12px 0;"><a href="${lessonUrl(l)}"><img src="${imgUrl(l, s)}" width="250" alt="${esc(label + ': ' + step.title)}" style="display:block;width:100%;max-width:250px;height:auto;border:0;"></a></td></tr>
<tr><td bgcolor="#000000" style="background:#000000;border-radius:14px;padding:14px;font-family:${SANS};">
<div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#A8A8A8;padding:0 0 6px 0;">${esc(step.label)}</div>
<div style="font-size:16px;font-weight:700;line-height:1.25;color:#FFFFFF;padding:0 0 6px 0;">${esc(step.title)}</div>
<div style="font-size:14px;line-height:1.45;color:#D9D9D9;">${esc(step.body)}</div>
</td></tr>
</table>
</td></tr></table>
</div>`;
};

const chips = l => `<table ${T}><tr>${l.tags.map((t, i) => `${i ? '<td style="width:6px;font-size:0;">&nbsp;</td>' : ''}<td bgcolor="#E8E8E8" style="background:#E8E8E8;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:500;"><a href="${SITE}/#/tags/${slugify(t)}" style="color:#000000;text-decoration:none;white-space:nowrap;">${esc(t)}</a></td>`).join('')}</tr></table>`;

const otherRows = others.map((l, i) => {
  const line = i < others.length - 1 ? 'border-bottom:1px solid #EFEFEF;' : '';
  return `<tr><td width="44" valign="top" style="padding:10px 0;${line}font-family:${DISPLAY};font-weight:900;font-size:24px;color:#000000;">${pad(l.n)}</td><td style="padding:10px 0;${line}"><a href="${lessonUrl(l)}" style="font-size:17px;font-weight:700;line-height:1.3;color:#000000;text-decoration:none;">${esc(l.title)}</a><br><span style="font-size:13px;color:#6B6B6B;">${esc(l.tags[0])}</span></td></tr>`;
}).join('\n');

const peekTiles = peek.map((l, i) => {
  const problem = PROBLEMS.find(p => p.id === (l.problems || [])[0]);
  const screen = SCREENS.find(s => s.id === (l.screens || [])[0]);
  const text = l.status === 'planned' && problem ? problem.label : l.title; // planned titles can name the principle; the problem label never does
  return `${i ? '<tr><td style="font-size:0;line-height:0;height:8px;">&nbsp;</td></tr>\n' : ''}<tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:12px;padding:14px 16px;">
<table ${T} width="100%"><tr>
<td width="48" valign="top" style="font-family:${DISPLAY};font-weight:900;font-size:26px;line-height:1;color:#6B6B6B;">${pad(l.n)}</td>
<td style="font-size:17px;font-weight:700;line-height:1.3;color:#000000;">${esc(text)}<br><span style="display:inline-block;margin-top:8px;border:1px dashed #6B6B6B;border-radius:999px;padding:4px 10px;font-size:12px;font-weight:500;color:#595959;">${screen ? esc(screen.title) + ' &middot; ' : ''}Principle: ?</span></td>
</tr></table>
</td></tr>`;
}).join('\n');

const body = `<!-- buttondown-editor-mode: plaintext -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@900&family=Space+Grotesk:wght@400;500;700&display=swap">
<table ${T} width="100%" bgcolor="#EFEFEF" style="background:#EFEFEF;"><tr><td align="center" style="padding:20px 12px;">
<table ${T} width="100%" bgcolor="#FFFFFF" style="max-width:600px;background:#FFFFFF;border-radius:20px;font-family:${SANS};color:#000000;"><tr><td style="padding:28px 24px;">
<table ${T} width="100%">
<tr><td style="padding:0 0 24px 0;">
<table ${T} width="100%"><tr>
<td style="font-family:${DISPLAY};font-weight:900;font-size:24px;letter-spacing:-0.5px;color:#000000;">Daily Crit</td>
<td align="right" style="font-size:13px;font-weight:500;color:#6B6B6B;">The weekly crit &middot; No. ${issue} &middot; ${esc(date)}</td>
</tr></table>
</td></tr>
<tr><td style="font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#2B2BFF;padding:0 0 10px 0;">This week's crit &middot; Lesson ${featured.n}</td></tr>
<tr><td style="font-family:${DISPLAY};font-weight:900;font-size:36px;line-height:1.05;letter-spacing:-1px;color:#000000;padding:0 0 12px 0;">${esc(featured.title)}</td></tr>
<tr><td style="font-size:17px;line-height:1.5;color:#000000;padding:0 0 20px 0;">${esc(featured.lede)}</td></tr>
<tr><td align="center" bgcolor="#EFEFEF" style="${DOTS}border-radius:16px;padding:8px 2px 10px 2px;font-size:0;text-align:center;">
${half(featured, 'before')}${half(featured, 'after')}
</td></tr>
<tr><td style="padding:18px 0 0 0;">${chips(featured)}</td></tr>
<tr><td style="padding:18px 0 28px 0;">
<table ${T}><tr><td bgcolor="#2B2BFF" style="background:#2B2BFF;border-radius:999px;"><a href="${lessonUrl(featured)}" style="display:inline-block;padding:14px 24px;font-size:16px;font-weight:700;color:#FFFFFF;text-decoration:none;">Watch it fix itself &rarr;</a></td></tr></table>
</td></tr>
${others.length ? `${rule}
<tr><td style="font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6B6B6B;padding:24px 0 6px 0;">Also new this week</td></tr>
<tr><td style="padding:0 0 24px 0;">
<table ${T} width="100%">
${otherRows}
</table>
</td></tr>` : ''}
${peek.length ? `${rule}
<tr><td style="font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#2B2BFF;padding:24px 0 6px 0;">Sneak peek</td></tr>
<tr><td style="font-family:${DISPLAY};font-weight:900;font-size:26px;line-height:1.1;letter-spacing:-0.5px;color:#000000;padding:0 0 6px 0;">Next week's problems</td></tr>
<tr><td style="font-size:15px;line-height:1.5;color:#595959;padding:0 0 14px 0;">${peek.length === 1 ? 'One screen' : 'Screens'} going on the canvas next. Guess the principle before the lesson names it.</td></tr>
<tr><td bgcolor="#EFEFEF" style="${DOTS}border-radius:16px;padding:12px;">
<table ${T} width="100%">
${peekTiles}
</table>
</td></tr>` : ''}
<tr><td style="font-size:13px;line-height:1.5;color:#595959;padding:20px 0 0 0;">One design crit a day, in real UI, at <a href="${SITE}" style="color:#000000;font-weight:700;">dailycrit.app</a>. Lesson screens are fictional examples.</td></tr>
</table>
</td></tr></table>
</td></tr></table>
`.replace(/\n{2,}/g, '\n') // a blank line would end the HTML block in Markdown
  // Buttondown's template (and some mail apps) force their own link colour onto <a>.
  // Mark each link's colour !important and repeat it on a <span> inside, which link rules don't touch.
  .replace(/<a ([^>]*?style="[^"]*?)color:(#[0-9A-Fa-f]{6});([^"]*")>([^<]*)<\/a>/g,
    (m, pre, color, post, text) => `<a ${pre}color:${color} !important;${post}><span style="color:${color} !important;">${text}</span></a>`);

const subject = featured.title;
const description = `${featured.lede.split(/(?<=[.!?])\s/)[0]}${others.length ? ` Plus ${others.length} more lesson${others.length > 1 ? 's' : ''}` : ''}${peek.length ? `${others.length ? ' and' : ' Plus'} a peek at next week` : ''}${others.length || peek.length ? '.' : ''}`;

// ---------- run ----------
if (!flag('no-screenshots')) await shoot(featured);
mkdirSync(join(HERE, 'issues'), { recursive: true });
const out = join(HERE, 'issues', `issue-${pad(issue)}.html`);
writeFileSync(out, body);

console.log(`Issue ${issue} (${date})`);
console.log(`  Subject:   ${subject}`);
console.log(`  Preview:   ${description}`);
console.log(`  Featured:  ${pad(featured.n)} ${featured.title}`);
console.log(`  Also new:  ${others.map(l => pad(l.n)).join(', ') || 'none'}`);
console.log(`  Peek:      ${peek.map(l => pad(l.n)).join(', ') || 'none'}`);
console.log(`  Wrote:     newsletter/issues/issue-${pad(issue)}.html`);
console.log(`  Images go live at ${SITE}/newsletter/img/ once this is on main.`);

if (flag('draft')) {
  const key = process.env.BUTTONDOWN_API_KEY || fail('--draft needs BUTTONDOWN_API_KEY in the environment');
  const res = await fetch('https://api.buttondown.com/v1/emails', {
    method: 'POST',
    headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, description, body, status: 'draft' })
  });
  if (!res.ok) fail(`Buttondown refused the draft (${res.status}): ${(await res.text()).slice(0, 300)}`);
  console.log('  Draft created in Buttondown. Review it there and send.');
}

if (flag('mark-sent')) {
  writeFileSync(STATE_FILE, JSON.stringify({ lastIssue: issue, lastLesson: to }, null, 2) + '\n');
  console.log(`  state.json: lastIssue ${issue}, lastLesson ${to}`);
}
