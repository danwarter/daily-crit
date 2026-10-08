# Daily Crit

Daily Crit (dailycrit.app) teaches UX design principles with real-looking UI. Each lesson shows a flawed screen, a tooltip explains the problem, the screen animates into a fixed version, and a second tooltip explains the fix and names the principle.

Two kinds of visitors:
1. **Daily learners** watch today's crit, then browse other lessons.
2. **Problem-solvers** arrive with a problem in plain words ("people quit my sign-up form") and leave with a named principle they can cite in a design review.

Newsletter: **The weekly crit**, one email a week with this week's lessons and a peek at next week's. It runs on Buttondown; the signup card's form address is `NEWSLETTER_URL` near the top of the script.

## Current state

- The entire site is one file: `index.html`. No build step, no framework.
- Hash routing (`#/lessons/slug`, `#/find?q=`, etc.).
- Hosted on Vercel from this GitHub repo. A push to `main` deploys to production. Other branches get preview URLs; use them for drafts.
- Plan: 30 lessons over 30 days, then keep growing. After the 30 days, migrate to Astro (or similar) so every lesson, problem and principle has a real, indexable URL.

## Map of index.html

In order:
1. `<style>`: design tokens, header, home, lesson module and canvas, tiles, lists, find page, newsletter card, command palette, device/phone, transition primitives, iOS kit, coach marks, responsive rules.
2. Header markup and command palette markup.
3. `<template id="tpl-SLUG">` blocks: one per built lesson, containing that lesson's screen.
4. `<script>`, in this order:
   - **Data:** `THEMES`, `PROBLEM_GROUPS`, `PROBLEMS`, `SCREENS`, `LESSONS`, `PRINCIPLES`
   - **Search:** stopwords, stemming, weighted index, `search()`
   - **Lesson engine:** `mount()` / `unmount()`, which handle the before/after state, tooltip, highlight ring, "?" beacon, arrow keys and mock UI interactions
   - **Render helpers and pages:** `pageHome`, `pageLesson`, `pageFind`, `pageProblem`, `pageScreen`, `pageTheme`, `pageTag`, `pageAbout`
   - **Command palette** (⌘K, `/`, or any `[data-palette]` element)
   - **Router**

Most daily work touches only two places: the lesson's entry in `LESSONS` and its `<template>`, plus a `PRINCIPLES` definition for any new tag.

## Design system

**Colors** (CSS variables in `:root`, dark-mode values alongside):
- Page `#EFEFEF`, surface `#FFFFFF`, ink `#000000`, muted `#8A8A8A`, chip `#E8E8E8`
- Accent (electric blue) `#2B2BFF` (`#5A5AFF` in dark mode)
- The iOS mock inside the phone uses Apple system colors (`--ios-*`), so it reads as a real app, separate from the lesson layer.

**Type:**
- **Outfit Black (900)** for the biggest headings only: lesson titles, page titles, tile numbers, the wordmark, big pager numbers.
- **Space Grotesk** (400/500/700) for everything else, including tooltips.
- The iOS mock uses the system font stack.

**Principles:**
- Calm, simple, designer-workspace feel. The phone sits on a dotted canvas like a frame in a design file.
- One accent color, used sparingly: live status, the highlight ring, links on hover.
- Motion is purposeful. Use the `--ease` curve. Respect `prefers-reduced-motion` (already handled globally).
- Must work at 375px wide, on desktop, and in dark mode.

## Anatomy of a lesson

### 1. Data entry in `LESSONS`

```js
{ n:3, slug:'smart-defaults', title:'Every choice starts blank', theme:'choices', status:'draft', frame:'Checkout',
  lede:'One or two sentences, plain language, why this matters.',
  tags:['Smart defaults','Hick\u2019s law'],               // principles; primary first; each becomes a tag page
  problems:['slow-decisions'],                           // one id from PROBLEMS
  screens:['checkout','settings'],                       // ids from SCREENS
  synonyms:'default preselected preset',                 // words people might search
  phrases:['nothing is selected on checkout', '…'],      // 4-6 ways people describe the problem
  steps:{
    before:{ anchor:'#some-id', label:'The problem', title:'…', body:'…', cta:'Show the fix' },
    after:{  anchor:'#other-id', label:'The fix',    title:'…', body:'…', cta:'See the problem again' }
  }}
```

- `title` is the plain-language problem, the way someone would say it in a crit ("This form is way too long"), not the principle's name.
- `tags` are formal principle names. The first is the primary principle the lesson teaches; the rest are related.
- Every tag needs a definition in `PRINCIPLES`, keyed by the tag's slug (`'hicks-law'`). It shows under the title on the principle page, above the lesson count. Write one or two plain-language sentences, about 25 words: what the principle says, not how a lesson uses it. Before adding one, check that the tag isn't already defined.
- Write apostrophes in tags as `\u2019` (`'Hick\u2019s law'`) so the name displays the same everywhere.
- `problems` holds one id: one problem per lesson. If two lessons share a primary principle, their bad UI examples must be different.
- `phrases` lists 4 to 6 other ways people phrase the same problem. Search matches on them.
- `status` moves `planned` → `draft` → `live`. The highest-numbered `live` lesson is automatically "Today's crit" on the home page.
- `frame` is the canvas label ("Export sheet / Before").
- Planned lessons already exist in `LESSONS` with `problems`, `screens`, `synonyms` and `phrases` filled in. `BACKLOG.md` holds the plan for each one: title, tags, single problem, phrases and the bad UI example, plus full drafts for the next few. Building one means copying its backlog entry (title, `tags`, `problems`), then adding `lede`, `frame` and `steps`, plus its template.
- Only add a new entry to `PROBLEMS` or `SCREENS` if nothing existing fits. Problems are written from the user's point of view, in plain language: "People abandon a long form," not "Form abandonment."

### 2. Screen template

```html
<template id="tpl-smart-defaults">
  <div class="nav"><span class="cancel">Cancel</span><span class="title">Checkout</span><span></span></div>
  <div class="screen">
    … rows, cards, buttons …
  </div>
</template>
```

**Transition primitive: collapse/expand.** Wrap each element that changes in `.c`, with a direct child `<div>`:
- `class="c bad-only"` shows only in Before
- `class="c good-only"` shows only in After
- `class="c"` (no modifier) is shared and always visible
- `style="--d:N"` staggers timing; use 0 to 4 in reading order

**Transition primitive: collapse/expand sideways.** Inside a flex row (like a tab bar), add `cx` plus `bad-only` or `good-only` to an item, with `--d` for stagger. It shrinks to zero width or grows in, and its neighbors widen to fill the gap.

**Transition primitive: text swap.** Swap text between states:

```html
<span class="swap"><span class="sa">Before text</span><span class="sb">After text</span></span>
```

**Transition primitive: restyle.** Change how an element looks or how much space it keeps around it (emphasis, contrast, spacing). Put the classes it wears in each state in `data-bad` and `data-good` (either can be empty), with `--d` for stagger. The engine swaps them on every state change; colors, shadow and opacity fade across, and margin, padding, gap, font size and width glide, so restyle can also re-space a layout (spacing, proximity) or change emphasis (hierarchy). Example: `<button class="primary" data-bad="" data-good="plain">` turns a filled button into a text link.

**iOS kit classes:**
- Layout: `.pad` (group spacing), `.ghead` (group header), `.card`, `.row`
- Controls: `.seg` with buttons and `aria-pressed`, `.sw` with `role="switch"` and `aria-checked`, `.primary` (main button)
- Text: `.val` with `.chev` (value with disclosure arrow), `.ph` (placeholder text), `.link`
- Special: `.preview` and `.thumb` (photo row), `.steps-head` and `.progress` (stepper)
- People and text: `.amount` (big centered amount with a caption), `.people` with buttons holding an `.avatar` (set its color with `--av`; `.avatar.add` for a "+" button), `.field` (a real text input inside a `<label class="row">`), `.hint` (small grey note under a card)
- Stacked forms: `.stack` holds `.flabel` labels (above their field, 28px above and 6px below; `.flabel.loose` spaces them evenly, 18px each side) and `<input class="field fbox">` (a full-width rounded input box)
- Lists and tips: `.tick` (round checkbox with `role="checkbox"` and `aria-checked`, toggles on tap), `.icon-btn` (a blue icon button inside a row), `.apptip` (an in-app tip card with an arrow, holding `.apptip-ic` and `.apptip-txt`), `.nav .end` (a blue right-hand nav item)
- Empty states: `.blank` (a tall, centered grey note filling the screen, the bare empty state) and `.empty` (a centered empty state holding an `.art` icon tile, an `h3` and a `p`; follow it with a `.primary`). `.nav .add` makes a right-hand nav item a large "+".
- Tabs and menus: `.lead` (groups a row's leading icon or avatar with its label) and `.ri` (a small colored icon tile for a menu row, like iOS Settings; set its color with `--art`). `.tabbar` goes after `.screen` in the template and pins to the bottom; it holds `.tabs` with `.tab` buttons (an icon `svg` plus a `span` label). Put `data-pick` and `data-before`/`data-after` (a tab's label) on `.tabs` to set the selected tab.
- Carousel: a `[data-carousel]` wrapper holding `.slides` with `.slide` children (each can use `.art` with `--art` for a colored illustration panel). People can swipe, or tap a `data-next="Next"` button to advance; it reads `data-last` on the last slide. A `.progress` and a `[data-count]` label inside the wrapper follow along. Carousels go back to the first slide on every state change.
- Mock behaviors: `data-values="A|B|C"` on a row makes it cycle values on tap, `data-pick` on a group of buttons makes them single-select (like `.seg`), `data-dismiss` on a button collapses its nearest `.c` (like closing a tip), and `data-done="Done"` on a button flashes that text when tapped. Typed `.field` text, `data-pick` selections and dismissed blocks reset on every state change.
- Buttons and carts: `.plain` turns a `.primary` or `.mini` into a blue text button; `.mini` is a small filled button for inside a row; `.pair` puts two `.primary` buttons side by side; `.pimg` is a product image tile (set its color with `--art`) and `.price` keeps prices aligned; `.dock` goes after `.screen` in the template and pins its content (like a cart's checkout buttons) to the bottom.
- Text screens: `.bigtitle` (a 30px bold centered title, like a "What's New" sheet), `.para` (a 15px body paragraph), `.feat` (a feature row: a blue `.feat-ic` icon beside a bold `b` heading and a grey `span` line).
- Emphasis (restyle targets): `.huge` (a 40px bold figure, like a balance), `.kicker` (a small grey label above it), `.quiet` (a 15px grey, regular-weight title), `.ri.mute` (a grey icon tile), `.ri.gone` (an icon tile that shrinks away), `.row.roomy` (a taller row). `.deck` stacks cards with a 12px gap.
- Preset values: `data-before` and `data-after` on a `data-values` row, a `.seg`, a `data-pick` group or a `.sw` set its value in each state (an empty value shows a blue "Choose"). Values reset on every state change and animate in. Add `data-gate` to a button to keep it disabled while any row or segmented control on the screen is unset.

**Rules:**
- Give each tooltip anchor an `id`, and make sure the anchor exists in that state (the Before anchor must not be inside a `good-only` block).
- The phone is 660px tall. A Before screen that overflows is often good, since it shows the problem. Leave about 200px below the After anchor so the tooltip fits without covering the fix. If space is tight, the engine flips the tooltip above the anchor.
- Make the mock interactive enough that people feel the friction in Before.
- If a principle can't be shown with collapse/expand or text swap (contrast, tap targets, reordering), add a new reusable primitive to the CSS and engine, such as restyle, move/resize or reorder. Never hard-code one-off behavior for a single lesson.

## Tooltip writing rules

- **Labels:** always "The problem" and "The fix."
- **Title:** specific and concrete, ideally with a number ("14 decisions to save one photo," "15 fields on one screen"). Under about 8 words.
- **Body:** one or two sentences, about 35 words maximum. Plain language. Name the principle in the After tooltip or the lesson tags.
- **Research framing:** any user research is hypothetical, so say so: "In this example, user interviews showed…" Never imply a real study.
- **CTAs:** "Show the fix" and "See the problem again."
- **Voice:** direct, friendly and confident. Explain jargon or avoid it. Don't refer to readers by career stage (no "juniors"); say "designers" or "designers early in their careers."

## Search

- Search is client-side keyword matching across title, tags, problem labels, search phrases, synonyms, screen titles, lede and tooltip text, with weights favoring the first five.
- A new lesson is searchable as soon as its fields are filled in.
- After adding a lesson, test 3 or 4 plain-language queries in the ⌘K palette and on `#/find` to confirm it shows up. Add synonyms or phrases if it doesn't.

## Daily workflow

1. Pick the next planned lesson in `BACKLOG.md`.
2. Write both tooltips first. If the problem and the fix can't each be explained in one short tooltip, change the scenario before building.
3. Choose a screen people recognize instantly (checkout, settings, sign-up, feed).
4. Build the template, then fill in the data entry with `status:'draft'`.
5. Run the checklist below.
6. Push to a branch for a preview URL, check it on a phone, then merge to `main` and set `status:'live'`.

## Checklist before publishing

- [ ] JavaScript has no syntax errors (extract the script and run `node --check`)
- [ ] Before and After both look right at 375px wide and on desktop, in light and dark mode
- [ ] Both tooltips point at the right element and don't cover the key part of the fix
- [ ] The highlight ring, "?" beacon (close the tooltip, then reopen it) and arrow keys all work
- [ ] Every tag has a `PRINCIPLES` definition, and it reads well on the tag page
- [ ] The lesson appears on the home page, in the 30-tile grid, on its theme, tag, problem and screen pages, and in search
- [ ] No horizontal page scroll on mobile

## Constraints

- Keep the site a single self-contained `index.html` until the planned Astro migration.
- External resources: Google Fonts and Google Analytics only. No other network requests, trackers or scripts.
- Analytics: Google Analytics 4, set by `GA_ID` near the top of the script, and only on dailycrit.app (not previews). The router sends a page view per hash route as a clean path (`/lessons/slug`), and searches in the palette and on `#/find` send a `search` event once typing pauses. In GA, "Page changes based on browser history events" must stay off, or every route counts twice.
- Newsletter promotion stays a quiet card at the bottom of each page. No popups or interstitials, since a site teaching good UX can't interrupt people. The only request it makes is the signup itself, when someone presses Subscribe.
- Don't rename existing slugs, problem ids or screen ids. They are URLs.

## Roadmap

- **Next transition primitives:** move/resize (Fitts's law, thumb zone), reorder (grouping).
- **Principle pages:** a page per principle with a one-line definition, origin (who, when, what research), a ready-to-use "how to say it in a review" sentence, honest limits (for example, Miller's 7±2 is often misapplied), and links to its lessons. These make search results citable.
- **Analytics:** lesson views and search terms are logged in Google Analytics. Next: review them weekly to decide what to build.
- **After 30 days:** migrate to Astro with real URLs for SEO.
- **Later:** AI help for describing a problem or critiquing a screenshot. Start with a free "copy this prompt into your AI" handoff that includes the principle catalog, and add a hosted, rate-limited option only if people use it.
