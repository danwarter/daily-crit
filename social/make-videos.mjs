// Makes 9:16 social videos (1080x1920 MP4) from live Daily Crit lessons.
//
//   node social/make-videos.mjs                 every live lesson
//   node social/make-videos.mjs 15 16           just these lesson numbers
//   node social/make-videos.mjs --ready         include lessons waiting for release
//
// Each video plays the real lesson from index.html: a "Spot the problem" hook over the
// flawed screen and its tooltip, the transition to the fix and its tooltip, then an end card.
// No sound: add music from the platform's own library when posting.
// Output: social/out/NN-slug.mp4 plus NN-slug.txt (a ready-to-paste caption).
//
// Setup once: cd social && npm install   (needs ffmpeg on the PATH)

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(HERE, 'out');
const require = createRequire(import.meta.url);
const FPS = 30;

const args = process.argv.slice(2);
const wanted = args.filter(a => /^\d+$/.test(a)).map(Number);
const includeReady = args.includes('--ready');

// ---------- lessons ----------
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const LESSONS = Function('return [' + html.match(/const LESSONS = \[([\s\S]*?)\n\];/)[1] + ']')();
const list = LESSONS.filter(l => l.steps && (l.status === 'live' || (includeReady && l.status === 'ready')))
  .filter(l => !wanted.length || wanted.includes(l.n));
if (!list.length) { console.log('No matching lessons.'); process.exit(0); }

// ---------- brand fonts, served locally (Google Fonts may be unreachable while rendering) ----------
const font = (pkg, file) => readFileSync(join(dirname(require.resolve(pkg + '/package.json')), 'files', file));
const FONTS = {
  'sg-400.woff2': font('@fontsource/space-grotesk', 'space-grotesk-latin-400-normal.woff2'),
  'sg-500.woff2': font('@fontsource/space-grotesk', 'space-grotesk-latin-500-normal.woff2'),
  'sg-700.woff2': font('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff2'),
  'outfit-900.woff2': font('@fontsource/outfit', 'outfit-latin-900-normal.woff2'),
};
const ORIGIN = 'https://render.dailycrit.test';   // not dailycrit.app, so analytics stays off
const FONT_CSS = `
@font-face{font-family:"Space Grotesk";font-weight:400;src:url(${ORIGIN}/_f/sg-400.woff2)}
@font-face{font-family:"Space Grotesk";font-weight:500;src:url(${ORIGIN}/_f/sg-500.woff2)}
@font-face{font-family:"Space Grotesk";font-weight:700;src:url(${ORIGIN}/_f/sg-700.woff2)}
@font-face{font-family:"Outfit";font-weight:900;src:url(${ORIGIN}/_f/outfit-900.woff2)}`;

// ---------- the 9:16 stage (540x960 CSS px, rendered at 2x) ----------
const STAGE_CSS = `
html,body{overflow:hidden!important;background:var(--page)!important}
body>*:not(#stage){visibility:hidden!important}
#stage{position:fixed;inset:0;z-index:99;visibility:visible;background:var(--page);
  background-image:radial-gradient(var(--dots) 1.2px,transparent 1.2px);background-size:18px 18px;
  font-family:"Space Grotesk",system-ui,sans-serif;color:var(--ink)}
#stage .vs-brand{position:absolute;top:34px;left:0;right:0;text-align:center;font-family:Outfit;font-weight:900;font-size:22px;letter-spacing:-.02em}
#stage .vs-brand b{color:var(--accent)}
#stage .vs-head{position:absolute;top:84px;left:30px;right:30px;height:120px;text-align:center}
#stage .vs-h{position:absolute;inset:0;transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1)}
#stage .vs-h.vs-off{opacity:0;transform:translateY(10px)}
#stage .vs-kick{display:inline-block;font-size:15px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  padding:6px 13px;border-radius:999px;background:var(--ink);color:var(--page);margin-bottom:12px}
#stage .vs-kick.vs-fix{background:var(--accent);color:#fff}
#stage .vs-big{font-family:Outfit;font-weight:900;font-size:33px;line-height:1.04;letter-spacing:-.025em;text-wrap:balance}
#stage .vs-slot{position:absolute;top:228px;left:100px}
#stage .vs-slot .phone{width:340px!important}
#stage .vs-foot{position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:15px;font-weight:500;color:var(--ink-2)}
#stage .vs-end{position:absolute;inset:0;z-index:20;background:var(--page);display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:16px;padding:0 44px;text-align:center;opacity:0;transition:opacity .5s ease}
#stage .vs-end.vs-on{opacity:1}
#stage .vs-end .vs-lbl{font-size:16px;font-weight:500;color:var(--ink-2)}
#stage .vs-end .vs-p{font-family:Outfit;font-weight:900;font-size:46px;line-height:1;letter-spacing:-.03em;text-wrap:balance}
#stage .vs-end .vs-line{width:56px;height:5px;border-radius:3px;background:var(--accent);margin:10px 0}
#stage .vs-end .vs-url{font-size:22px;font-weight:700}
#stage .vs-end .vs-sub{font-size:16px;color:var(--ink-2)}
.tip-close,.canvas-hint{display:none!important}
`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

function stageHTML(l){
  return `<div id="stage">
    <div class="vs-brand">Daily Crit <b>·</b> ${l.n}</div>
    <div class="vs-head">
      <div class="vs-h" data-h="before"><span class="vs-kick">Spot the problem</span><div class="vs-big">${esc(l.title)}</div></div>
      <div class="vs-h vs-off" data-h="after"><span class="vs-kick vs-fix">The fix</span><div class="vs-big">${esc(l.tags[0])}</div></div>
    </div>
    <div class="vs-slot"></div>
    <div class="vs-foot">One UX lesson a day · dailycrit.app</div>
    <div class="vs-end"><span class="vs-lbl">Today’s principle</span><div class="vs-p">${esc(l.tags[0])}</div>
      <div class="vs-line"></div><div class="vs-url">dailycrit.app</div><div class="vs-sub">One UX lesson a day, in real UI</div></div>
  </div>`;
}

// ---------- record ----------
const exe = process.env.CHROMIUM_PATH;   // optional: a specific Chromium build
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
mkdirSync(OUT, { recursive: true });

for (const l of list) {
  const name = `${String(l.n).padStart(2, '0')}-${l.slug}`;
  const frames = join(OUT, '.frames-' + name);
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames);

  // Move the phone onto the stage the moment the lesson mounts, before its first tooltip shows.
  const p = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2,
    colorScheme: 'light', reducedMotion: 'no-preference' });
  await p.route('**/*', route => {
    const u = route.request().url();
    if (u.startsWith(ORIGIN + '/_f/')) return route.fulfill({ body: FONTS[u.split('/').pop()], contentType: 'font/woff2' });
    if (u.startsWith(ORIGIN)) return route.fulfill({ body: html, contentType: 'text/html' });
    if (u.includes('fonts.googleapis.com')) return route.fulfill({ body: FONT_CSS, contentType: 'text/css' });
    return route.abort();
  });
  await p.addInitScript(([css, h]) => {
    // Runs before the site script: as soon as the lesson's phone exists, move it onto the stage.
    const mo = new MutationObserver(() => {
      const ph = document.querySelector('.lesson-mod .phone');
      if (!ph || document.getElementById('stage')) return;
      const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      document.body.insertAdjacentHTML('beforeend', h);
      document.querySelector('#stage .vs-slot').appendChild(ph);
      mo.disconnect();
    });
    mo.observe(document, { childList: true, subtree: true });
  }, [STAGE_CSS, stageHTML(l)]);

  // Capture frames with their timestamps (Chrome sends one whenever the screen changes).
  const cdp = await p.context().newCDPSession(p);
  const shots = [];
  cdp.on('Page.screencastFrame', async f => {
    shots.push({ t: f.metadata.timestamp, data: f.data });
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await p.goto(`${ORIGIN}/#/lessons/${l.slug}`);
  await p.evaluate(() => document.fonts.ready);
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  const t0 = Date.now();
  const mark = () => (Date.now() - t0) / 1000;

  // 1. The problem: wait for the Before tooltip, then give people time to read it.
  await p.waitForSelector('#stage .phone:not(.after) .tip.show', { timeout: 30000 });
  await p.waitForTimeout(4200);
  // 2. The fix: switch the headline and press the tooltip's own "Show the fix" button.
  await p.evaluate(() => {
    document.querySelector('[data-h="before"]').classList.add('vs-off');
    document.querySelector('[data-h="after"]').classList.remove('vs-off');
    document.querySelector('.phone .tip .cta').click();
  });
  await p.waitForSelector('#stage .phone.after .tip.show', { timeout: 30000 });
  await p.waitForTimeout(4500);
  // 3. End card.
  await p.evaluate(() => document.querySelector('#stage .vs-end').classList.add('vs-on'));
  await p.waitForTimeout(2600);
  const total = mark();
  await cdp.send('Page.stopScreencast');
  await p.waitForTimeout(200);
  await p.close();

  // ---------- frames → constant 30fps MP4 ----------
  if (shots.length < 5) throw new Error(`Only ${shots.length} frames captured for ${name}`);
  const start = shots[0].t;
  let concat = '';
  shots.forEach((s, i) => {
    const f = join(frames, `${String(i).padStart(5, '0')}.jpg`);
    writeFileSync(f, Buffer.from(s.data, 'base64'));
    const next = i + 1 < shots.length ? shots[i + 1].t : start + total;
    concat += `file '${f}'\nduration ${Math.max(next - s.t, 0.001).toFixed(4)}\n`;
  });
  concat += `file '${join(frames, String(shots.length - 1).padStart(5, '0') + '.jpg')}'\n`;
  writeFileSync(join(frames, 'list.txt'), concat);
  const mp4 = join(OUT, name + '.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(frames, 'list.txt'),
    '-vf', `scale=1080:1920:flags=lanczos,fps=${FPS},format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-movflags', '+faststart', mp4]);
  rmSync(frames, { recursive: true, force: true });

  // ---------- caption ----------
  const caption = `${l.title}. Can you spot the problem before the fix plays?\n\n` +
    `The principle: ${l.tags[0]}.\n${l.steps.after.body}\n\n` +
    `One UX lesson a day, in real UI → link in bio (dailycrit.app)\n\n` +
    `#uxdesign #uidesign #productdesign #uxui #designtips #${l.tags[0].toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  writeFileSync(join(OUT, name + '.txt'), caption);
  console.log(`${name}.mp4  ${total.toFixed(1)}s  ${shots.length} frames`);
}
await browser.close();
