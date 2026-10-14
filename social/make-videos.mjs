// Makes 9:16 social videos (1080x1920 MP4) from live Daily Crit lessons.
//
//   node social/make-videos.mjs                 every live lesson
//   node social/make-videos.mjs 15 16           just these lesson numbers
//   node social/make-videos.mjs --ready         include lessons waiting for release
//
// Each video plays the real lesson from index.html, shot like a motion piece:
//   1. Title card: the problem in plain words, word by word.
//   2. The phone rises in and the flawed screen plays itself, with a slow push-in.
//   3. The camera pushes in on the Before tooltip so it's readable on a phone.
//   4. A blue "The fix" wipe, then the screen morphs into the fix (the lesson's own animation).
//   5. The camera pushes in on the After tooltip.
//   6. End card: the principle and dailycrit.app.
// No sound: add music from the platform's own library when posting.
// Output: social/out/NN-slug.mp4 plus NN-slug.txt (a ready-to-paste caption).
//
// Setup once: cd social && npm install   (needs ffmpeg on the PATH)
// CHROMIUM_PATH=/path/to/chrome uses a specific Chromium build.

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

// ---------- the 9:16 stage: 540x960 CSS px, captured at 3x and scaled to 1080x1920 ----------
const W = 540, H = 960;
const SLOT = { x: 100, y: 250 };          // where the 340x660 phone sits in the wide shot
const VIEW = { cx: 270, cy: 590, w: 496, h: 610 };   // the area a close-up frames (below the headline)

const STAGE_CSS = `
html,body{overflow:hidden!important;background:var(--page)!important}
body>*:not(#stage){visibility:hidden!important}
#stage{position:fixed;inset:0;z-index:99;visibility:visible;overflow:hidden;background:var(--page);
  font-family:"Space Grotesk",system-ui,sans-serif;color:var(--ink)}
.vs-bg{position:absolute;inset:-40px;background-image:radial-gradient(var(--dots) 1.3px,transparent 1.3px);
  background-size:18px 18px;animation:vs-drift 30s linear infinite}
@keyframes vs-drift{to{transform:translate(18px,36px)}}
.vs-glow{position:absolute;left:50%;top:58%;width:760px;height:760px;margin:-380px 0 0 -380px;border-radius:50%;
  background:radial-gradient(closest-side,rgba(43,43,255,.13),rgba(43,43,255,0));opacity:0;transition:opacity 1.2s ease}
.vs-glow.vs-on{opacity:1}
#cam{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0}
.vs-slot{position:absolute;left:${SLOT.x}px;top:${SLOT.y}px;opacity:0;transform:translateY(140px) scale(.92)}
.vs-slot.vs-in{opacity:1;transform:none;transition:opacity .5s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.vs-slot.vs-out{opacity:0;transform:translateY(60px) scale(.94);transition:opacity .5s ease,transform .8s cubic-bezier(.7,0,.84,0)}
.vs-slot .phone{width:340px!important}
.vs-fade{position:absolute;left:0;right:0;top:0;height:300px;z-index:5;pointer-events:none;
  background:linear-gradient(var(--page) 74%,rgba(239,239,239,0));opacity:0;transition:opacity .6s ease}
.vs-fade.vs-on{opacity:1}
.vs-top{position:absolute;top:34px;left:32px;right:32px;z-index:6;display:flex;justify-content:space-between;align-items:center;
  opacity:0;transform:translateY(-12px);transition:opacity .6s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.vs-top.vs-on{opacity:1;transform:none}
.vs-logo{font-family:Outfit;font-weight:900;font-size:21px;letter-spacing:-.02em}
.vs-logo b{color:var(--accent)}
.vs-num{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 11px;border-radius:999px;
  box-shadow:inset 0 0 0 1.5px var(--ink)}
.vs-head{position:absolute;left:34px;right:34px;z-index:6;text-align:center;top:300px;
  transition:top .9s cubic-bezier(.65,0,.35,1)}
.vs-head.vs-bar{top:88px}
.vs-head.vs-title{animation:vs-breathe 2.4s cubic-bezier(.16,1,.3,1) both}
@keyframes vs-breathe{from{transform:scale(.94)}to{transform:scale(1)}}
.vs-head .vs-kick{animation:vs-pop .6s cubic-bezier(.34,1.56,.64,1) both}
@keyframes vs-pop{from{transform:scale(.6);opacity:0}}
.vs-gone .vs-kick{opacity:0;transform:scale(.8);transition:opacity .3s ease,transform .3s ease}
.vs-kick{display:inline-block;font-size:15px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  padding:7px 14px;border-radius:999px;background:var(--ink);color:var(--page);margin-bottom:16px;
  transition:background .3s ease,transform .5s cubic-bezier(.16,1,.3,1)}
.vs-kick.vs-fix{background:var(--accent);color:#fff}
.vs-big{font-family:Outfit;font-weight:900;line-height:1.02;letter-spacing:-.03em;font-size:58px;text-wrap:balance;
  transition:font-size .9s cubic-bezier(.65,0,.35,1)}
.vs-bar .vs-big{font-size:34px}
.vs-w{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .02em .08em;margin-bottom:-.08em}
.vs-wi{display:inline-block;transform:translateY(110%);animation:vs-rise .8s cubic-bezier(.16,1,.3,1) forwards}
.vs-gone .vs-wi{animation:vs-sink .35s cubic-bezier(.7,0,.84,0) forwards}
@keyframes vs-rise{to{transform:none}}
@keyframes vs-sink{from{transform:none}to{transform:translateY(-110%)}}
.vs-wipe{position:absolute;inset:0;z-index:10;background:var(--accent);color:#fff;display:grid;place-items:center;
  transform:translateX(-101%);font-family:Outfit;font-weight:900;font-size:76px;letter-spacing:-.03em}
.vs-wipe span{transform:translateX(-60px);opacity:0}
.vs-wipe.vs-cover{transform:none;transition:transform .42s cubic-bezier(.65,0,.35,1)}
.vs-wipe.vs-cover span{transform:none;opacity:1;transition:transform .5s .12s cubic-bezier(.16,1,.3,1),opacity .3s .12s ease}
.vs-wipe.vs-exit{transform:translateX(101%);transition:transform .5s cubic-bezier(.65,0,.35,1)}
.vs-wipe.vs-exit span{transform:translateX(60px);opacity:0;transition:transform .5s cubic-bezier(.65,0,.35,1),opacity .25s ease}
.vs-end{position:absolute;inset:0;z-index:8;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:14px;padding:0 40px;text-align:center;pointer-events:none}
.vs-end .vs-lbl{font-size:17px;font-weight:500;color:var(--ink-2);opacity:0;transition:opacity .6s ease}
.vs-end .vs-p{font-family:Outfit;font-weight:900;font-size:60px;line-height:1;letter-spacing:-.035em;text-wrap:balance}
.vs-end .vs-line{width:0;height:6px;border-radius:3px;background:var(--accent);margin:12px 0;transition:width .7s .5s cubic-bezier(.16,1,.3,1)}
.vs-end .vs-url{font-size:26px;font-weight:700;opacity:0;transform:translateY(10px);transition:opacity .5s .8s ease,transform .7s .8s cubic-bezier(.16,1,.3,1)}
.vs-end .vs-sub{font-size:17px;color:var(--ink-2);opacity:0;transition:opacity .5s 1.05s ease}
.vs-end.vs-on .vs-lbl,.vs-end.vs-on .vs-url,.vs-end.vs-on .vs-sub{opacity:1;transform:none}
.vs-end.vs-on .vs-line{width:64px}
.tip-close,.canvas-hint{display:none!important}
`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

function stageHTML(l){
  return `<div id="stage">
    <div class="vs-bg"></div><div class="vs-glow"></div>
    <div id="cam"><div class="vs-slot"></div></div>
    <div class="vs-fade"></div>
    <div class="vs-top"><span class="vs-logo">Daily Crit<b>.</b></span><span class="vs-num">Lesson ${l.n}</span></div>
    <div class="vs-head"><span class="vs-kick">Spot the problem</span><div class="vs-big"></div></div>
    <div class="vs-end"><span class="vs-lbl">The principle</span><div class="vs-p"></div>
      <div class="vs-line"></div><div class="vs-url">dailycrit.app</div><div class="vs-sub">One UX lesson a day, in real UI</div></div>
    <div class="vs-wipe"><span>The fix</span></div>
  </div>`;
}

// ---------- runs inside the page: camera, transitions, and the measuring fix ----------
function director(cfg){
  const { W, H, SLOT, VIEW } = cfg;
  const $ = s => document.querySelector(s);
  const cam = $('#cam');
  window.__camS = 1;
  // The lesson engine positions its tooltip from differences between element rectangles.
  // Inside the zoomed camera those come back scaled, so report them in unscaled CSS pixels.
  const gbcr = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function(){
    const r = gbcr.call(this), s = window.__camS;
    if (s === 1 || !cam.contains(this)) return r;
    return new DOMRect(r.x / s, r.y / s, r.width / s, r.height / s);
  };
  // Camera: put cam-space point (fx, fy) at screen point (VIEW.cx, cy) at scale s.
  let cur = { fx: W / 2, fy: SLOT.y + 330, s: 1, cy: SLOT.y + 330 }, raf = 0;
  const apply = c => {
    window.__camS = c.s;
    cam.style.transform = `translate(${VIEW.cx - c.s * c.fx}px, ${c.cy - c.s * c.fy}px) scale(${c.s})`;
  };
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const camTo = (to, ms, fn = ease) => new Promise(res => {
    cancelAnimationFrame(raf);
    const from = { ...cur }, t0 = performance.now();
    const step = now => {
      const k = ms ? Math.min(1, (now - t0) / ms) : 1, e = fn(k);
      for (const key in to) cur[key] = from[key] + (to[key] - from[key]) * e;
      apply(cur);
      if (k < 1) raf = requestAnimationFrame(step); else res();
    };
    raf = requestAnimationFrame(step);
  });
  const wide = { fx: W / 2, fy: SLOT.y + 330, s: 1, cy: SLOT.y + 330 + 8 };
  const phone = () => $('#cam .phone');
  // Frame the highlighted element and its tooltip together, as big as fits.
  function focus(){
    const p = phone(), ring = p.querySelector('.ring'), tip = p.querySelector('.tip');
    const box = [ring, tip].map(el => ({ x: el.offsetLeft, y: el.offsetTop, r: el.offsetLeft + el.offsetWidth, b: el.offsetTop + el.offsetHeight }));
    const x0 = Math.max(Math.min(...box.map(b => b.x)), 0), x1 = Math.min(Math.max(...box.map(b => b.r)), 340);
    const y0 = Math.min(...box.map(b => b.y)), y1 = Math.max(...box.map(b => b.b));
    const bw = x1 - x0 + 24, bh = y1 - y0 + 28;
    const s = Math.max(1.15, Math.min(VIEW.w / bw, VIEW.h / bh, 1.75));
    // Keep the close-up centered on the phone sideways unless the box needs otherwise.
    const fx = SLOT.x + Math.min(Math.max((x0 + x1) / 2, 170 - (s - 1) * 60), 170 + (s - 1) * 60);
    return { fx, fy: SLOT.y + (y0 + y1) / 2, s, cy: VIEW.cy };
  }
  function words(el, text, delay = 0){
    el.innerHTML = text.split(' ').map((w, i) =>
      `<span class="vs-w"><span class="vs-wi" style="animation-delay:${delay + i * 70}ms">${w.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span></span>`).join(' ');
  }
  // Move the lesson's phone onto the stage the moment it mounts.
  new MutationObserver((_, mo) => {
    const ph = document.querySelector('.lesson-mod .phone');
    if (!ph) return;
    $('.vs-slot').appendChild(ph); mo.disconnect();
    requestAnimationFrame(() => $('.vs-slot').classList.add('vs-in'));
  }).observe(document.body, { childList: true, subtree: true });
  apply(cur);

  const wait = ms => new Promise(r => setTimeout(r, ms));
  window.__vid = {
    async intro(title){ $('.vs-head').classList.add('vs-title'); words($('.vs-big'), title, 250); await wait(2100); },
    async enter(slug){
      $('.vs-head').classList.add('vs-bar'); $('.vs-fade').classList.add('vs-on'); $('.vs-top').classList.add('vs-on');
      $('.vs-glow').classList.add('vs-on');
      await wait(250);
      location.hash = '#/lessons/' + slug;
      camTo({ ...wide, s: 1.1, fy: wide.fy + 30 }, 9000, t => 1 - Math.pow(1 - t, 2));  // slow push-in while it plays
    },
    async closeUp(){ const f = focus(); await camTo(f, 1200); camTo({ ...f, s: f.s * 1.035 }, 6000, t => t); },
    async fix(principle){
      const wipe = $('.vs-wipe');
      wipe.classList.add('vs-cover'); await wait(560);
      // Hidden behind the wipe: swap the headline and cut back to the wide shot.
      $('.vs-kick').textContent = 'The fix'; $('.vs-kick').classList.add('vs-fix');
      words($('.vs-big'), principle, 350);
      cancelAnimationFrame(raf); cur = { ...wide }; apply(cur);
      await wait(140);
      wipe.classList.remove('vs-cover'); wipe.classList.add('vs-exit');
      await wait(120);
      phone().querySelector('.tip .cta').click();   // the lesson's own morph plays as the wipe leaves
      camTo({ ...wide, s: 1.06 }, 2600);
      await wait(400);
    },
    async end(principle){
      $('.vs-head').classList.add('vs-gone'); $('.vs-top').classList.remove('vs-on'); $('.vs-fade').classList.remove('vs-on');
      camTo({ ...cur, s: cur.s * .9 }, 900);
      $('.vs-slot').classList.remove('vs-in'); $('.vs-slot').classList.add('vs-out');
      await wait(500);
      words($('.vs-end .vs-p'), principle, 0);
      $('.vs-end').classList.add('vs-on');
      await wait(2900);
    }
  };
}

// ---------- record ----------
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
mkdirSync(OUT, { recursive: true });

for (const l of list) {
  const name = `${String(l.n).padStart(2, '0')}-${l.slug}`;
  const frames = join(OUT, '.frames-' + name);
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames);

  const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 3,
    colorScheme: 'light', reducedMotion: 'no-preference' });
  await p.route('**/*', route => {
    const u = route.request().url();
    if (u.startsWith(ORIGIN + '/_f/')) return route.fulfill({ body: FONTS[u.split('/').pop()], contentType: 'font/woff2' });
    if (u.startsWith(ORIGIN)) return route.fulfill({ body: html, contentType: 'text/html' });
    if (u.includes('fonts.googleapis.com')) return route.fulfill({ body: FONT_CSS, contentType: 'text/css' });
    return route.abort();
  });
  // Start on a page with no lesson, so nothing plays until the title card is done.
  await p.goto(`${ORIGIN}/#/about`);
  await p.addStyleTag({ content: STAGE_CSS });
  await p.evaluate(h => document.body.insertAdjacentHTML('beforeend', h), stageHTML(l));
  await p.evaluate(director, { W, H, SLOT, VIEW });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);

  // Capture frames with their timestamps (Chrome sends one whenever the screen changes).
  const cdp = await p.context().newCDPSession(p);
  const shots = [];
  cdp.on('Page.screencastFrame', f => {
    shots.push({ t: f.metadata.timestamp, data: f.data });
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 94, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  const t0 = Date.now();

  await p.evaluate(t => __vid.intro(t), l.title);
  await p.evaluate(s => __vid.enter(s), l.slug);
  await p.waitForSelector('#cam .phone:not(.after) .tip.show', { timeout: 30000 });
  await p.waitForTimeout(250);
  await p.evaluate(() => __vid.closeUp());
  await p.waitForTimeout(3600);                       // time to read the problem
  await p.evaluate(t => __vid.fix(t), l.tags[0]);
  await p.waitForSelector('#cam .phone.after .tip.show', { timeout: 30000 });
  await p.waitForTimeout(250);
  await p.evaluate(() => __vid.closeUp());
  await p.waitForTimeout(4000);                       // time to read the fix
  await p.evaluate(t => __vid.end(t), l.tags[0]);

  const total = (Date.now() - t0) / 1000;
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
    '-vf', `scale=1080:1920:flags=lanczos,fps=${FPS},format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
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
