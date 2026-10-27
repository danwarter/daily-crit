# Accounts: build spec

Free accounts for Daily Crit: save lessons, keep lesson progress, keep flashcard progress, and join The weekly crit in one tap. No quizzes, certificates or payments yet, but the data model leaves room for a paid plan later.

Read `CLAUDE.md` first. Everything here follows its rules: one `index.html`, no build step, hash routing, the existing design system, 375px / desktop / dark mode.

---

## 1. Principles

1. **Reading never needs an account.** Every lesson, principle page, search and flashcard round works signed out, exactly as today.
2. **Guest first.** Saving, progress and flashcard results work signed out too, stored in the browser. An account is how you keep them across devices and browsers, not the price of using them.
3. **Ask at the moment of value.** The first time a guest saves a lesson, show a small inline nudge ("Saved on this device. Create a free account to keep it everywhere."). No signup modals, no walls, no popups on arrival.
4. **Newsletter is opt-in.** A checkbox at signup, unchecked by default, and a toggle on the account page.
5. **Behind a flag.** Visitors see no account UI until the flag is turned on for everyone.
6. **Paywall-ready, not paywalled.** Every profile has a `plan` (`free` for now). Nothing reads it yet.

---

## 2. Stack

- **Supabase** for auth and data (Postgres + row-level security). Edge Functions for the two things that need secrets: the Buttondown sync and account deletion.
- **supabase-js v2** loaded from jsDelivr as an ES module, and only when the flag is on, so the page stays light for everyone else:
  ```js
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  ```
- **Sign-in methods:** email magic link and Google. Sign in with Apple can come later with an iOS app.
- **Custom SMTP** for auth emails. Supabase's built-in email sender is rate-limited to a handful of emails an hour and is meant for testing, so set up Resend (or Postmark) before the flag goes public. Send from something like `hello@dailycrit.app`.
- The Supabase URL and publishable (anon) key go in `index.html` as constants next to `NEWSLETTER_URL`. They are public by design; row-level security is what protects the data. The service-role key and `BUTTONDOWN_API_KEY` live only in Edge Function secrets, never in the repo.

---

## 3. Feature flag

```js
// ?flag=accounts turns it on for this browser, ?flag=-accounts turns it off.
const FLAGS = (() => {
  const p = new URLSearchParams(location.search).get('flag');
  try {
    if (p) p.split(',').forEach(f => f.startsWith('-')
      ? localStorage.removeItem('dc:flag:' + f.slice(1))
      : localStorage.setItem('dc:flag:' + f, '1'));
    return { accounts: localStorage.getItem('dc:flag:accounts') === '1' };
  } catch { return { accounts: false }; }
})();
```

- The flag goes in the query string, before the hash: `https://dailycrit.app/?flag=accounts#/lessons`.
- With the flag off: no Supabase script loads, no Save buttons, no "Sign in" link, no `#/me` route, no guest storage writes. The site behaves exactly as it does today.
- Launching means changing the default to `true`, then deleting the flag code a few weeks later.

---

## 4. Data model

Lessons and principles live in `index.html`, not the database, so rows reference them by **slug**. Slugs are now permanent: never rename a live lesson's or principle's slug. If one ever must change, add an entry to a `SLUG_ALIASES` map and resolve through it when reading saved data.

### Migration: `supabase/migrations/0001_accounts.sql`

```sql
-- Profiles: one row per user, created by trigger.
create table public.profiles (
  id                   uuid primary key references auth.users(id) on delete cascade,
  created_at           timestamptz not null default now(),
  newsletter_opt_in    boolean not null default false,
  newsletter_synced_at timestamptz,
  plan                 text not null default 'free' check (plan in ('free', 'pro')),
  plan_updated_at      timestamptz
);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Saved lessons.
create table public.saved_lessons (
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  saved_at    timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

-- Lesson progress. A lesson counts as done once the fix has been seen.
create table public.lesson_progress (
  user_id         uuid not null references auth.users(id) on delete cascade,
  lesson_slug     text not null,
  first_viewed_at timestamptz not null default now(),
  fix_seen_at     timestamptz,
  updated_at      timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

-- Flashcard progress, one row per principle (Leitner boxes 0-5).
create table public.card_progress (
  user_id          uuid not null references auth.users(id) on delete cascade,
  principle_slug   text not null,
  box              smallint not null default 0 check (box between 0 and 5),
  seen             integer  not null default 0,
  known            integer  not null default 0,
  last_result      text check (last_result in ('yes', 'no')),
  last_reviewed_at timestamptz,
  due_at           timestamptz,
  primary key (user_id, principle_slug)
);

-- Row-level security: people only ever see and change their own rows.
alter table public.profiles        enable row level security;
alter table public.saved_lessons   enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.card_progress   enable row level security;

-- Profiles are read-only from the browser. Edge Functions (service role) write
-- newsletter_opt_in and, later, plan, so nobody can upgrade themselves.
create policy "own profile: read" on public.profiles
  for select using ((select auth.uid()) = id);

create policy "own saves" on public.saved_lessons
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own lesson progress" on public.lesson_progress
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own card progress" on public.card_progress
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
```

### Flashcard scheduling (Leitner)

- "Got it": `box = min(box + 1, 5)`, `known += 1`. "Still learning": `box = 0`. Both: `seen += 1`, `last_result`, `last_reviewed_at = now`.
- `due_at = now + [0, 1, 2, 4, 8, 16][box]` days.
- This phase only **stores** it and shows Known / Learning counts. A "Due today" deck is a later, small addition that reads `due_at`.
- Undo (Z) must also undo the stored result: keep the previous record on `study.hist` and restore it.

---

## 5. Client architecture

Add one small module to the script, after the data section: **`store`**. Every feature talks to `store`; only `store` talks to localStorage and Supabase.

```js
store.isSaved(slug)            store.toggleSave(slug)
store.lessonProgress(slug)     store.markViewed(slug)     store.markFixSeen(slug)
store.card(principleSlug)      store.recordCard(principleSlug, 'yes' | 'no')   store.undoCard(principleSlug, prev)
store.user                     store.plan                 store.on('change', fn)
```

### Guest storage

- One localStorage key, `dc:v1`, holding `{ saved: {slug: savedAt}, progress: {slug: {firstViewedAt, fixSeenAt}}, cards: {slug: {...}} }`.
- Wrap every read and write in try/catch (private windows can throw). If storage fails, features still work for the visit.

### Signed in

- localStorage stays as a cache. Writes are optimistic: update the cache and the UI immediately, then upsert to Supabase. On failure, keep the change locally and retry on the next page load.
- On load with a session: fetch the user's three tables in parallel, replace the cache, re-render whatever's on screen.
- On sign-out: clear `dc:v1` so the next person on a shared computer doesn't see it.

### Guest → account merge (runs once, right after first sign-in on a device)

- **Saved:** union of guest and account saves, keeping the earlier `saved_at`.
- **Progress:** earliest `first_viewed_at`; earliest non-null `fix_seen_at`.
- **Cards:** keep whichever record has the later `last_reviewed_at`.
- Upsert the merged result, then mark the device merged (`dc:merged:<userId>`).

### Hooks into existing code

- **Lesson page (`pageLesson` / `mount`):** call `store.markViewed(slug)` where `lesson_view` is tracked; call `store.markFixSeen(slug)` where `fix_played` is tracked (the first time the lesson reaches After).
- **Flashcards (`pagePrinciples` cards mode):** record each yes/no through `store.recordCard`; restore on undo.
- **Save buttons:** on the lesson page (near the title), and a small bookmark on lesson tiles and list rows.
- **Progress marks:** a quiet check on tiles and unit pages for lessons with `fix_seen_at`; a "X of N" count on each unit page. Use muted ink, not the accent.

---

## 6. Auth flow (watch out: hash routing)

Supabase's default email flow puts tokens in the URL hash, which collides with the hash router. Use **PKCE**, which returns a `?code=` query parameter instead.

```js
const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
```

1. Before sending a magic link or starting Google sign-in, save the current route: `localStorage['dc:return'] = location.hash || '#/'`.
2. `emailRedirectTo` / `redirectTo`: `location.origin + '/'` (the site root, no hash).
3. On load, if the URL has `?code=`, let supabase-js exchange it; then `history.replaceState(null, '', '/' + (stored return route))` and call `route()`.
4. Allowed redirect URLs in Supabase: `https://dailycrit.app/**`, the Vercel preview pattern for this project, and `http://localhost:*/**`.

Known PKCE limit: a magic link must be opened in the same browser that requested it. If the exchange fails, show: "Open the link in the same browser you signed in from, or send a new one."

---

## 7. Screens and copy

All of it uses the existing tokens, Outfit Black for page titles only, Space Grotesk for everything else, and the accent sparingly.

### Header
- Signed out: a "Sign in" text link at the end of `.site-nav` and in `#mnav`.
- Signed in: "My Crit" in the same spot (no avatar needed).

### Sign-in sheet
A sheet (bottom sheet at 375px, centered panel on desktop), not a new page.
- Title: "Keep your progress"
- Line: "Save lessons and flashcard progress across devices. Free, and the lessons stay free."
- "Continue with Google" button
- Divider, then email field + "Email me a sign-in link"
- Checkbox, unchecked: "Also send me The weekly crit, one email a week"
- Small print: "No password. We'll email you a link." + link to Privacy
- After sending: "Check your inbox. The link signs you in on this browser."

### Guest nudge after first save
Inline, under the Save button, once per device: "Saved on this device. **Create a free account** to keep it everywhere." Dismissible; never shown again after dismissal or sign-in.

### `#/me` (My Crit)
1. **Saved:** saved lessons as the existing lesson rows, newest first. Empty state: "Lessons you save show up here."
2. **Progress:** "You've seen the fix in X of N lessons", then one row per unit with X of N and a thin bar.
3. **Flashcards:** Known / Learning counts, and a "Study your learning cards" button that opens `#/principles/cards` with only box-0 cards.
4. **Account:** email, newsletter toggle, Sign out, Delete account (type-to-confirm dialog, red button).

Add `#/me` to the router, behind the flag. Signed out, `#/me` shows the sign-in sheet's content in-page.

### `#/privacy`
Plain-language page: what's stored (email, saves, progress, flashcard results), why, that Google Analytics is used (already true), that the newsletter is separate and handled by Buttondown, how to delete an account, and a contact email. Link it from the footer, the sign-in sheet and About.

---

## 8. Edge Functions

Both verify the caller's JWT and take the email from the auth user, never from the request body.

### `newsletter`
- `POST { opt_in: boolean }`
- `opt_in: true`: create the subscriber in Buttondown with the tag `account`; treat "already subscribed" as success. Buttondown may still send its own confirmation email depending on the newsletter's double opt-in setting; that's fine.
- `opt_in: false`: unsubscribe them in Buttondown.
- Update `profiles.newsletter_opt_in` and `newsletter_synced_at`.
- Check Buttondown's current API docs for the exact endpoint and field names before writing it. Reuse the existing `BUTTONDOWN_API_KEY`.
- Called from signup (if the box was ticked) and from the toggle on `#/me`.

### `delete-account`
- `POST {}` → `auth.admin.deleteUser(userId)` with the service role; the foreign keys cascade.
- Does **not** unsubscribe from the newsletter; the dialog says so: "This deletes your account and progress. The weekly crit is separate; unsubscribe from any issue."

---

## 9. Analytics

New GA events through the existing `track()`, with no personal info:
`sign_up` (method), `login` (method), `save_lesson` / `unsave_lesson` (lesson_slug), `guest_nudge_shown`, `guest_nudge_clicked`, `newsletter_opt_in` (source: signup | account).

---

## 10. Build order

Each phase ships on its own branch with a Vercel preview, and merges behind the flag.

**Phase 0 — Setup (Dan, with help)**
- [ ] Create the Supabase project; note URL and publishable key.
- [ ] Run the migration.
- [ ] Turn on the email provider (magic link) and Google; set up the Google OAuth client.
- [ ] Set up Resend (or Postmark) as custom SMTP; brand the magic-link email (subject: "Your Daily Crit sign-in link").
- [ ] Add the redirect URLs from section 6.
- [ ] Add Edge Function secrets: `BUTTONDOWN_API_KEY`.

**Phase 1 — Guest features (no accounts yet)**
- [ ] `FLAGS` and the `store` module with localStorage only.
- [ ] Save buttons on lessons, tiles and rows.
- [ ] `markViewed` / `markFixSeen` and progress marks on tiles and unit pages.
- [ ] Flashcard results persist (including undo).
- [ ] A bare `#/me` showing saved lessons and progress.

**Phase 2 — Sign in**
- [ ] Lazy-load supabase-js when the flag is on.
- [ ] Sign-in sheet, magic link + Google, PKCE return-route handling.
- [ ] Header shows "Sign in" / "My Crit"; sign out clears the cache.

**Phase 3 — Sync**
- [ ] Load server state on sign-in and page load; optimistic writes with retry.
- [ ] One-time guest → account merge.
- [ ] Guest nudge after first save.

**Phase 4 — My Crit, newsletter, privacy**
- [ ] Full `#/me` (saved, progress, flashcards, account).
- [ ] `newsletter` Edge Function, signup checkbox, account toggle.
- [ ] `delete-account` Edge Function and dialog.
- [ ] `#/privacy` page and links.
- [ ] Analytics events.

**Phase 5 — QA, then launch**
- [ ] Run the checklist below on a preview, then on production with the flag.
- [ ] Use it yourself for a week.
- [ ] Flip the flag default to on.

---

## 11. QA checklist

- [ ] Flag off: no network request to Supabase, no new UI, nothing in localStorage beyond today's.
- [ ] Guest: save, unsave, progress marks and flashcard results survive a reload.
- [ ] Magic link from a lesson page lands back on that same lesson, signed in.
- [ ] Google sign-in lands back on the same page.
- [ ] Magic link opened in a different browser shows the friendly error.
- [ ] Guest data merges into an existing account without duplicates or losses.
- [ ] Two devices: save on one, reload the other, it's there.
- [ ] Signed in, offline: saving still works and syncs on next load.
- [ ] RLS: with one user's session, selecting or updating another user's rows returns nothing / fails. Updating `profiles.plan` from the browser fails.
- [ ] Newsletter: ticked box creates a Buttondown subscriber tagged `account`; unticked doesn't; toggle off unsubscribes.
- [ ] Delete account removes the user and all their rows.
- [ ] 375px, desktop, dark mode, keyboard-only, `prefers-reduced-motion`.
- [ ] A private window (storage blocked) doesn't throw.

---

## 12. Changes to CLAUDE.md

This build bends a few current rules on purpose. Update `CLAUDE.md` in the same PR as Phase 2:

- **Constraints → external resources:** add Supabase (API + auth) and jsDelivr (supabase-js), loaded only when accounts are on, and Google's sign-in page.
- **Constraints → newsletter:** the bottom-of-page card stays a plain form post to Buttondown. The account checkbox is different: it goes through the `newsletter` Edge Function and Buttondown's authenticated API, not the public subscribe address, so the "don't `fetch` the subscribe address" rule still holds.
- **Map of index.html:** add the `store` module, the auth code, `#/me` and `#/privacy`.
- **Analytics:** list the new events from section 9.
- **New rule:** lesson and principle slugs are also keys in saved user data, which is one more reason never to rename them.

---

## 13. Later: when a paywall comes

Not part of this build, but worth knowing now:

- `profiles.plan` and `plan_updated_at` exist. Only a service-role function (e.g. a Stripe webhook) will ever write them.
- **Client-side gating isn't real gating.** Every lesson template currently ships inside the public `index.html`, so hiding content in the UI won't stop anyone reading it. Gating the archive later means serving paid lessons from somewhere that checks `plan` (a Supabase table or function behind RLS, or the planned Astro build with server-side checks). Plan the Astro migration with that in mind.
- Quizzes and certificates can reuse `lesson_progress` and add their own tables.

---

## 14. Open questions for Dan

1. Google sign-in in v1, or magic link only to start?
2. Is "seen the fix" the right definition of a finished lesson?
3. "My Crit" as the name for the account page?
4. Should deleting an account also unsubscribe from the newsletter?
5. Note: Supabase pauses free projects after about a week with no activity. Fine once people use it, but it can catch you out during flag testing.
