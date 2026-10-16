# Lesson backlog

The plan for every Daily Crit lesson. Each entry uses the same fields, in the same order, as the `LESSONS` entries in `index.html`, so a lesson can be pasted straight in when it's built. `CLAUDE.md` has the full build guide.

## Rules for every lesson

1. **Title** is the plain-language problem, the way someone would say it in a crit ("This form is way too long"), not the principle's name.
2. **`phrases`** lists 4 to 6 other ways people describe the same problem. Search matches on these as well as the title, tags and synonyms.
3. **`tags`** are the formal principle names, written the way they appear on the site. The first tag is the primary principle the lesson teaches; the rest are related.
4. **One problem per lesson.** `problems` holds a single id from `PROBLEMS`. If two lessons share a primary principle, their bad UI examples must be different (noted on each entry below).

Slugs never change, since they're URLs. Only titles follow rule 1.

## Built

Lessons 1 and 2 are already in `index.html`. The titles and `phrases` below are proposals; `index.html` still has the original titles and the original multi-problem lists.

### 1. Too many choices for one simple task

```js
{ n:1, slug:'decision-overload', title:'Too many choices for one simple task', theme:'choices', status:'live', frame:'Export sheet',
  tags:['Hick’s law','Smart defaults','Progressive disclosure'],
  problems:['too-many-options'], screens:['settings','dialogs'],
  synonyms:'overwhelming overwhelmed choice overload too many choices options complex complicated simplify export share sheet',
  phrases:['people freeze on this screen','there are too many settings','nobody knows which option to pick','how do I simplify a busy settings screen','it takes forever to save a photo'] }
```

Bad UI: a photo export sheet with 14 options. Fix: keep the one choice people care about (size) and hide the rest behind More options.

### 2. This form is way too long

```js
{ n:2, slug:'chunking', title:'This form is way too long', theme:'choices', status:'draft', frame:'Sign-up form',
  tags:['Chunking','Goal-gradient effect','Form design'],
  problems:['abandon-form'], screens:['sign-up','forms'],
  synonyms:'long form multi-step multistep wizard stepper steps registration register signup abandonment drop-off dropoff conversion fields',
  phrases:['people quit my sign-up form','too many fields on one page','registration drop-off is high','should I split this form into steps','users bail before they finish signing up'] }
```

Bad UI: 15 sign-up fields on one screen. Fix: three short steps with a progress bar.

## Next five (proposed)

Full entries, ready to build. Tooltips follow the writing rules in `CLAUDE.md`.

### 3. Every choice starts blank

```js
{ n:3, slug:'smart-defaults', title:'Every choice starts blank', theme:'choices', status:'planned', frame:'Checkout',
  lede:'Every blank choice is a small decision people have to stop and make. Preselect the answer most people would pick, and let everyone else change it.',
  tags:['Smart defaults','Default effect','Hick’s law'],
  problems:['slow-decisions'], screens:['checkout','forms'],
  synonyms:'default preselected preset prefilled prefill autofill',
  phrases:['why do I have to pick all of this myself','nothing is selected on checkout','the pay button stays grey','people take ages to get through checkout','what should be selected by default'],
  steps:{
    before:{ anchor:'#g-delivery', label:'The problem', title:'6 choices before you can pay',
      body:'Shipping speed, country, gift wrap: nothing is selected, and Pay stays grey until every one is answered. Most people want the same answers, but each has to be picked by hand.',
      cta:'Show the fix' },
    after:{ anchor:'#g-delivery', label:'The fix', title:'Preselect what most people pick',
      body:'In this example, order data showed 9 in 10 people chose standard shipping to their own country. Those are now preselected, so most people just check and pay. Anyone can still change them.',
      cta:'See the problem again' }
  }}
```

Different from lesson 1, which also uses smart defaults: lesson 1 removes options from an export sheet; this one keeps every option on a checkout and only preselects them.

### 4. Making people remember what the app knows

```js
{ n:4, slug:'recognition-over-recall', title:'Making people remember what the app knows', theme:'choices', status:'planned', frame:'Send money',
  lede:'Remembering is harder than recognizing. If the app already knows something, show it, instead of asking people to recall it.',
  tags:['Recognition over recall','Cognitive load'],
  problems:['forget-info'], screens:['forms'],
  synonyms:'memory remember recent history autocomplete recents suggestions',
  phrases:['people have to look things up to use the app','users keep retyping the same thing','I have to remember the account number','show recent items instead of asking again','people forget what to type'],
  steps:{
    before:{ anchor:'#g-recipient', label:'The problem', title:'17 digits typed from memory',
      body:'To pay someone they’ve paid before, people retype a routing and account number. Most have to leave the app to look them up, and one wrong digit sends money to the wrong place.',
      cta:'Show the fix' },
    after:{ anchor:'#recents', label:'The fix', title:'Pick from people you’ve paid',
      body:'Recent recipients appear as names and faces, so people recognize who they want instead of recalling numbers. Adding someone new is still one tap away.',
      cta:'See the problem again' }
  }}
```

### 5. New users have to sit through a tour first

```js
{ n:5, slug:'progressive-onboarding', title:'New users have to sit through a tour first', theme:'choices', status:'planned', frame:'Welcome',
  lede:'People open a new app to do something, not to learn it. Teach each feature at the moment someone reaches for it.',
  tags:['Paradox of the active user','Progressive disclosure','Just-in-time learning'],
  problems:['drop-onboarding'], screens:['onboarding'],
  synonyms:'tutorial walkthrough first run welcome intro carousel tour coach mark tooltip',
  phrases:['everyone skips the tutorial','new users drop off after sign-up','our welcome carousel is not working','people do not know where anything is','how do I teach a new app without a tour'],
  steps:{
    before:{ anchor:'#tour', label:'The problem', title:'5 screens before the app opens',
      body:'A welcome tour explains features nobody has needed yet. Most people swipe through without reading, then still don’t know where things are.',
      cta:'Show the fix' },
    after:{ anchor:'#first-tip', label:'The fix', title:'One tip, right when it’s needed',
      body:'In this example, user interviews showed people skipped the tour to get started. Now they land in the app, and a single tip appears the first time they reach for a feature.',
      cta:'See the problem again' }
  }}
```

Lesson 1 lists progressive disclosure as a related tag; here the primary principle is different and the screen is a welcome tour, not a settings sheet. The site's existing coach-mark styles can draw the tip.

### 6. The screen is blank, so it looks broken

```js
{ n:6, slug:'empty-states', title:'The screen is blank, so it looks broken', theme:'choices', status:'planned', frame:'Tasks',
  lede:'A blank screen looks like an error to someone new. Use it to explain what goes here and how to add the first thing.',
  tags:['Empty states','Visibility of system status'],
  problems:['looks-broken'], screens:['feeds'],
  synonyms:'empty blank nothing zero state first use no data no results',
  phrases:['new users see an empty screen','people think the app is broken','nothing shows up the first time','what should a page say when there is no data','users do not know what to do first'],
  steps:{
    before:{ anchor:'#empty-msg', label:'The problem', title:'“No items” and nothing else',
      body:'A new user opens their list and sees two grey words. They can’t tell whether something failed to load or what they’re supposed to do next.',
      cta:'Show the fix' },
    after:{ anchor:'#add-first', label:'The fix', title:'Explain it, then offer a first step',
      body:'The list says what goes here and offers one clear first step. A blank screen is a chance to teach, not a dead end.',
      cta:'See the problem again' }
  }}
```

### 7. There are too many tabs to find anything

```js
{ n:7, slug:'navigation-overload', title:'There are too many tabs to find anything', theme:'choices', status:'planned', frame:'Shop',
  lede:'Every extra menu item makes all the others a little harder to find. Keep the few that people use most in view, and group the rest.',
  tags:['Hick’s law','Information architecture','Serial position effect'],
  problems:['lost-in-nav'], screens:['navigation'],
  synonyms:'menu tab bar tabbar tabs more tab overflow sidebar hamburger information architecture ia navigation bar nav bottom icons crowded hidden',
  phrases:['people cannot find things in the menu','our tab bar is crowded','too many icons at the bottom','users get lost in the app','how many tabs is too many','too much is hidden under the more tab'],
  steps:{
    before:{ anchor:'#more-list', label:'The problem', title:'8 places hidden behind More',
      body:'The app outgrew its tab bar, so the extras sit behind a More tab. To find Orders, people have to guess it isn’t a tab, then scan a flat list of eight.',
      cta:'Show the fix' },
    after:{ anchor:'#tabbar', label:'The fix', title:'4 tabs people actually use',
      body:'In this example, analytics showed four destinations got most visits. They stay as tabs, and Account sorts the rest into two short groups. Fewer choices means faster finding: that’s Hick’s law.',
      cta:'See the problem again' }
  }}
```

Same primary principle as lesson 1, with a different bad UI: an iOS More tab hiding eight destinations in a flat list, instead of an export sheet. iOS shows at most five tabs, so an overloaded tab bar really looks like this.

## Later

`lede`, `frame` and `steps` get written when each lesson is built.

### 8. Too many buttons look like the main one

```js
{ n:8, slug:'one-primary-action', title:'Too many buttons look like the main one', theme:'hierarchy', status:'live', frame:'Cart',
  lede:'When every button shouts, people have to read them all to find the one that matters. Make the main action look different, and let the rest step back.',
  tags:['Von Restorff effect','Visual hierarchy','Hick’s law'],
  problems:['miss-main-action'], screens:['checkout'],
  synonyms:'cta call to action primary secondary tertiary button buttons competing filled solid outline ghost text link emphasis stand out checkout cart isolation effect',
  phrases:['people cannot find the checkout button','every button is blue','users click the wrong button','which button should stand out','our main call to action gets ignored','all the buttons look the same'],
  steps:{
    before:{ anchor:'#actions', label:'The problem', title:'4 blue buttons, 1 that matters',
      body:'Apply coupon, Check out, Save for later and Keep shopping all look the same. To finish the order, people have to stop and read every label.',
      cta:'Show the fix' },
    after:{ anchor:'#actions', label:'The fix', title:'1 filled button, 3 quiet links',
      body:'Check out is the only filled button, so the eye lands on it first. The others become text links: still there, no longer competing. That’s the Von Restorff effect.',
      cta:'See the problem again' }
  }}
```

Bad UI: a cart whose bottom bar has Apply coupon, Check out, Save for later and Keep shopping, all as filled blue buttons. Fix: one filled Check out button, the rest as text links. Built with the new restyle primitive (`data-bad` / `data-good`).

### 9. Labels look like they belong to the wrong field

```js
{ n:9, slug:'proximity', title:'Labels look like they belong to the wrong field', theme:'hierarchy', status:'live', frame:'Shipping address',
  lede:'People decide what belongs together by how close things sit. When a label is as close to the wrong field as to its own, they guess, and sometimes guess wrong.',
  tags:['Law of proximity','Common region'],
  problems:['form-errors'], screens:['forms'],
  synonyms:'gestalt spacing space whitespace white group grouping related label labels field fields input box gap margin padding close together far apart address wrong',
  phrases:['people type in the wrong box','I cannot tell which label goes with which field','the spacing on this form is off','related things are too far apart','how much space between form fields','users fill in the wrong field'],
  steps:{
    before:{ anchor:'#city-pair', label:'The problem', title:'18px above, 18px below',
      body:'Each label sits exactly between two boxes. Does \u201cCity\u201d name the one above or the one below? In this example, session recordings showed people typing their city into the wrong one.',
      cta:'Show the fix' },
    after:{ anchor:'#city-pair', label:'The fix', title:'28px above, 6px below',
      body:'Now each label hugs the box it names, with a wider gap before the next pair. Things that sit close together look like they belong together: that\u2019s the law of proximity.',
      cta:'See the problem again' }
  }}
```

Bad UI: a shipping address form where every label sits 18px from the box above and 18px from its own box, so it is unclear which box “City” names. Fix: labels 6px from their own box, 28px from the box above. Built with restyle, which now animates spacing too (`.stack`, `.flabel`, `.fbox`).

### 10. Everything on the screen looks equally important

```js
{ n:10, slug:'visual-hierarchy', title:'Everything on the screen looks equally important', theme:'hierarchy', status:'live', frame:'Bank home',
  lede:'When everything on a screen is the same size and weight, people have to read it all to find what they came for. Make the most important thing the biggest, and let the rest step back.',
  tags:['Visual hierarchy','Contrast'],
  problems:['cluttered'], screens:['dashboards'],
  synonyms:'emphasis contrast size weight focus attention bank banking balance account home screen big number type scale font size bold muted grey gray quiet loud promo banner cards',
  phrases:['nothing stands out','I do not know where to look first','the dashboard is a mess','everything is the same size','how do I make the important part pop','people cannot find their balance'],
  steps:{
    before:{ anchor:'#cards', label:'The problem', title:'Your balance, in 14px grey',
      body:'It\u2019s the reason people open the app, yet it looks just like the ad and the tip below it. Every card asks for the same attention, so nothing gets it first.',
      cta:'Show the fix' },
    after:{ anchor:'#cards', label:'The fix', title:'40px balance, quieter everything else',
      body:'The balance is big and bold, so the eye lands there first. The promo and tip shrink to quiet grey rows. Size and contrast set the reading order: that\u2019s visual hierarchy.',
      cta:'See the problem again' }
  }}
```

Bad UI: a banking home screen where the balance, a Gold card promo and an autopay tip are three identical cards, each a bold title over a small grey line, so the balance is just "$2,481.20" in 14px grey. Fix: the balance grows to 40px black with a small label above it; the promo and tip lose their colored icons and second lines and become quiet grey rows. Built with restyle, which now animates type size and width too (`.huge`, `.kicker`, `.quiet`, `.ri.mute`, `.ri.gone`).

### 11. Nobody reads this wall of text

```js
{ n:11, slug:'scannable-text', title:'Nobody reads this wall of text', theme:'hierarchy', status:'live', frame:'What\u2019s new sheet',
  lede:'People skim screens; they rarely read them. If the one thing they need is buried in a paragraph, they\u2019ll miss it. Lead with it, then break the rest into short, labeled lines.',
  tags:['F-shaped reading pattern','Inverted pyramid'],
  problems:['skim-past'], screens:['onboarding'],
  synonyms:'reading read wall of text copy copywriting headings heading f-pattern long text paragraphs paragraph skim skimming scan scanning bold summary bullet bullets whats new release notes update changelog announcement',
  phrases:['people do not read the instructions','users skip the important part','this text is too long','how do I get people to read this','they miss the key detail in the paragraph','nobody reads our release notes'],
  steps:{
    before:{ anchor:'#deadline', label:'The problem', title:'1 deadline, buried 79 words deep',
      body:'The one thing people must do, sign in by Oct 31, sits mid-paragraph. People skim the first lines and the left edge, so in this example most tapped Continue without seeing it.',
      cta:'Show the fix' },
    after:{ anchor:'#notes', label:'The fix', title:'The deadline first, then 3 short lines',
      body:'What people must do comes first, in bold, and each change gets a heading and one line. That\u2019s the inverted pyramid: the point first, the details after.',
      cta:'See the problem again' }
  }}
```

Bad UI: a "What's New" sheet written as three dense paragraphs (146 words), with the one thing people must do, sign in again by Oct 31 or syncing stops, buried 79 words in. Fix: that action leads as a bold card with a Sign In button, and each change becomes a heading with one short line. Built with collapse/expand; added `.bigtitle`, `.para` and `.feat`.

### 12. The layout looks messy and I can't say why

```js
{ n:12, slug:'alignment', title:'The layout looks messy and I can’t say why', theme:'hierarchy', status:'live', frame:'Profile',
  lede:'When things almost line up, a screen looks messy even if nobody can say why. Pick one edge and start everything on it, and the same content suddenly looks deliberate.',
  tags:['Alignment','Grid systems'],
  problems:['cluttered'], screens:['settings'],
  synonyms:'grid layout messy edges uneven ragged align aligned alignment line up lined up left edge margin margins padding indent indented sloppy tidy neat clean profile column columns guides',
  phrases:['it looks off but I do not know why','the screen feels sloppy','things do not line up','why does this look unprofessional','how do I tidy up a layout'],
  steps:{
    before:{ anchor:'#profile', label:'The problem', title:'4 left edges, a few pixels apart',
      body:'The name, bio, follower count and buttons each start at a different spot (the pink lines). Nobody can say what\u2019s wrong, but the ragged edge makes the profile feel sloppy.',
      cta:'Show the fix' },
    after:{ anchor:'#profile', label:'The fix', title:'Everything on 1 shared edge',
      body:'Every block now starts on the same line, so the eye runs straight down it and the screen feels calm. That\u2019s alignment: fewer edges, less visual noise.',
      cta:'See the problem again' }
  }}
```

Bad UI: a social profile where the name, bio, follower line and buttons start 14, 6, 24 and 0px off the screen margin, with pink layout guides marking each edge. Fix: every block glides onto one shared edge and the four guides merge into one. Built with restyle; added `.shift`, `.guides`/`.guide`, `.ptop`, `.meta`, `.primary.outline`, `.utabs` and `.post`.

### 13. The same kind of control works differently on one screen

```js
{ n:13, slug:'consistency', title:'The same kind of control works differently on one screen', theme:'hierarchy', status:'live', frame:'Filter sheet',
  lede:'When the same kind of choice looks different every time, people need to think about each one. Use one control for one job, and one button to finish, and the screen explains itself.',
  tags:['Consistency and standards','Jakob’s law'],
  problems:['unclear-buttons'], screens:['dialogs'],
  synonyms:'consistent consistency inconsistent patterns standards design system mixed controls toggle toggles switch switches checkbox checkboxes segmented yes no filter filters sheet apply done save conventions familiar same',
  phrases:['every screen does it differently','people are not sure how to turn this on','we use toggles and checkboxes for the same thing','users expect it to work like other apps','why is Save in a different place here'],
  steps:{
    before:{ anchor:'#filters', label:'The problem', title:'4 yes/no filters, 3 kinds of control',
      body:'A switch, a checkbox and a Yes/No toggle do the same job, so every row needs figuring out. And Done and Apply both close the sheet. Which one saves?',
      cta:'Show the fix' },
    after:{ anchor:'#filters', label:'The fix', title:'1 kind of control, 1 button',
      body:'Every yes/no filter is now a switch, like in iOS Settings, and one button shows the results. This creates consistency and follows Jakob\u2019s Law by using familiar interaction patterns.',
      cta:'See the problem again' }
  }}
```

Bad UI: a restaurant app's filter sheet where four yes/no filters use a switch, two checkboxes and a Yes/No segmented control, with Done in the nav bar and Apply at the bottom. Fix: every filter becomes a switch, Done disappears, and the bottom button reads "Show 38 places". Sort by keeps its own control because it's a different kind of choice. Built with text swap; swaps can now hold controls (`.swap.end`), and `.tick` takes `data-before`/`data-after`.

### 14. People close the popup without reading it

```js
{ n:14, slug:'interruptions', title:'People close the popup without reading it', theme:'hierarchy', status:'live', frame:'Feed',
  lede:'Every popup teaches people to close the next one faster. Ask for ratings and permissions at a moment that earns them, and explain a new feature where it lives, so the message that matters gets read.',
  tags:['Banner blindness','Habituation'],
  problems:['skim-past'], screens:['dialogs','feeds'],
  synonyms:'modal modals popup popups pop-up pop-ups interstitial alert alerts dialog banner blindness annoying ignored ignore dismiss dismissed close closed reflex autopilot announcement announce new feature whats new rate us rating review notifications permission prompt',
  phrases:['nobody reads our announcement','people tap X straight away','users ignore the banner','our popups are annoying people','how do I tell people about a new feature','too many modals when the app opens'],
  steps:{
    before:{ anchor:'#popups', label:'The problem', title:'3 popups before the feed',
      body:'Rate us, then allow notifications, then this. By the third popup, people tap OK on reflex and miss the one that matters.',
      cta:'Show the fix' },
    after:{ anchor:'#cf-tip', label:'The fix', title:'1 note, next to the feature',
      body:'No popups, just a note by Your story, where the feature works. People tune out anything that looks like a popup (banner blindness), but they read this.',
      cta:'See the problem again' }
  }}
```

Bad UI: a photo app's feed that opens with three dialogs in a row: a "Rate us" prompt, the iOS notifications permission alert, then "New: Close Friends." The first two tap themselves closed a second apart (`data-auto`), the way people dismiss them on reflex, and the tooltip points at the third, still open. Fix: no dialogs; a small in-app note under the story row, pointing at Your story, explains Close Friends where it's used. Built with a new modal primitive (`.modal` holding `.alert` dialogs, dismissed one at a time) and new kit pieces `.stories`, `.photo`, `.apptip.left` and `.nav .brand`.

### 15. People can't tell if it worked

```js
{ n:15, slug:'system-status', title:'People can’t tell if it worked', theme:'feedback', status:'ready', frame:'Order review',
  lede:'When a tap gets no response, people assume it didn’t work and tap again. Show that something is happening straight away, then say clearly when it’s done.',
  tags:['Visibility of system status','Feedback'],
  problems:['unsure-it-worked'], screens:['checkout'],
  synonyms:'loading spinner progress indicator feedback waiting wait slow saved save sent submitted submit know whether confirmation confirm response responsive frozen stuck hang double tap twice duplicate charged place order pay payment',
  phrases:['people tap the button twice','did my order go through','users get duplicate orders','nothing happens when I tap pay','how do I show something is loading'],
  steps:{
    before:{ anchor:'#place', label:'The problem', title:'3 seconds, no sign it worked',
      body:'Place Order looks the same while the payment goes through, so people tap it again. In this example, the second tap placed a second order.',
      cta:'Show the fix' },
    after:{ anchor:'#place', label:'The fix', title:'1 tap, 1 order, a clear answer',
      body:'The button shows it’s working straight away and ignores extra taps, then the screen confirms the order. Keeping people informed like this is called visibility of system status.',
      cta:'See the problem again' }
  }}
```

Bad UI: an order review screen whose Place Order button looks exactly the same for the three seconds the payment takes. The mock taps it twice by itself, and the screen then reports "2 orders placed. Your card was charged 2 times." (every extra tap by hand adds another). Fix: the same three seconds, but the button turns into a spinner reading "Placing order…" on the first tap and ignores the second. When it finishes, an "Order placed" confirmation opens at the top and the button becomes the next step, a tappable "View Order". Built with three new primitives: wait (`data-wait`, with `silent` set by restyle), reveal (`.c.later`, `data-then`, `data-taps`) and the autoplay script (`data-play-before` / `data-play-after`).

### 16. One wrong tap and it's gone

```js
{ n:16, slug:'undo', title:'One wrong tap and it’s gone', theme:'feedback', status:'ready', frame:'Inbox',
  lede:'People tap through “Are you sure?” on reflex, so the dialog slows down every delete and still doesn’t stop the wrong one. Let the action happen, and make it easy to take back.',
  tags:['User control and freedom','Forgiveness','Habituation'],
  problems:['accidental-delete'], screens:['feeds'],
  synonyms:'confirm confirmation dialog undo delete deleted remove removed are you sure trash bin restore recover reverse reversible mistake accident accidental toast snackbar email mail inbox message archive lost',
  phrases:['people delete things by accident','users click yes without reading','are you sure dialogs do not work','how do I let people undo','I lost something I did not mean to delete'],
  steps:{
    before:{ anchor:'#sure-box', label:'The problem', title:'1 dialog for every delete',
      body:'People clear dozens of messages a day, so tapping Delete becomes a reflex. When they pick the wrong message, they confirm that one without reading too.',
      cta:'Show the fix' },
    after:{ anchor:'#undo-toast', label:'The fix', title:'0 dialogs, 1 Undo button',
      body:'The message goes straight away, and Undo brings it back if it was the wrong one. A mistake now costs one tap, not a lost message. That’s user control and freedom.',
      cta:'See the problem again' }
  }}
```

Bad UI: a mail inbox with a trash button on every row, each one asking "Are you sure?". The mock deletes a promo and confirms on reflex, then taps the trash on a boarding pass, and the tooltip points at that second dialog. Fix: no dialog; the message goes at once and a "Message deleted / Undo" toast brings it back. Habituation is lesson 14's primary principle; here it is only a related tag, and the screen and bad UI are different. Built with the modal primitive plus new pieces: `.alert.ask` opened by `data-ask` and confirmed by `data-ok`, `.toast` with `data-toast` / `data-undo`, and `.alert-btns .danger`. Each row holds two trash buttons in a `.swap.end`, one per state.

### 17. People only find out what's wrong after they submit

```js
{ n:17, slug:'inline-errors', title:'People only find out what’s wrong after they submit', theme:'feedback', status:'ready', frame:'Create account',
  lede:'An error at the end of a form sends people hunting for what went wrong. Check each field as they finish it, and say what to fix right where the mistake is.',
  tags:['Inline validation','Error recovery'],
  problems:['form-errors'], screens:['sign-up'],
  synonyms:'validation validate error errors message messages invalid inline field fields red banner submit submitted cleared clears wiped password email sign up signup register wrong mistake fix retype',
  phrases:['users get an error after filling everything in','people cannot tell which field is wrong','the error message is at the top','the form clears when there is a mistake','where should error messages go'],
  steps:{
    before:{ anchor:'#form-area', label:'The problem', title:'2 mistakes, 1 vague banner',
      body:'Only after tapping Create Account do people learn something’s wrong, not what or where. And the password they typed has been cleared, so they start that again too.',
      cta:'Show the fix' },
    after:{ anchor:'#signup', label:'The fix', title:'1 note under each wrong field',
      body:'Each field is checked when people leave it, and the note right below says how to fix it. Nothing gets cleared. That’s inline validation.',
      cta:'See the problem again' }
  }}
```

Bad UI: a create-account form with an email missing its ending and a six-character password. The mock taps Create Account, and one red banner ("Something went wrong") appears at the top while the password is wiped. Fix: each field is checked when people leave it, with a red outline and a short note underneath saying how to fix it; nothing is cleared. The form really validates, so people can fix both fields and create the account in either state. Shares the `form-errors` problem with lesson 9, whose primary principle and bad UI are different (label spacing). Built with a new form check primitive (`data-submit`, `data-err`, `data-wipe`, `live` set by restyle), reveal, and new kit pieces `.banner`, `.ferr` and `.fbox.bad`.

### 18. The form lets people type things it will reject

```js
{ n:18, slug:'error-prevention', title:'The form lets people type things it will reject', theme:'feedback', status:'ready', frame:'Payment',
  lede:'Every format rule people have to guess is a mistake waiting to happen. Instead of rejecting what they type, shape the field so it only accepts the right format.',
  tags:['Error prevention','Constraints','Poka-yoke'],
  problems:['form-errors'], screens:['checkout'],
  synonyms:'constraint constraints picker format formats input mask masks mistakes card credit debit number expiry expiration date cvc cvv security code spaces keyboard keypad numeric invalid rejected reject pay payment checkout',
  phrases:['people enter the date in the wrong format','users keep getting invalid input','how do I stop typos in forms','card details get rejected','the wrong keyboard shows up'],
  steps:{
    before:{ anchor:'#pay-area', label:'The problem', title:'2 normal answers, both rejected',
      body:'The full keyboard lets people type the card and date their own way, with spaces or as “July 27”. Both are right, but Pay rejects them for not matching this form’s format.',
      cta:'Show the fix' },
    after:{ anchor:'#card-form', label:'The fix', title:'0 formats to guess',
      body:'The card fields bring up a number pad and space the digits for you, and the date is a picker. Format mistakes are ruled out, though the card still gets checked. That’s error prevention.',
      cta:'See the problem again' }
  }}
```

Bad UI: a payment form whose fields all bring up the full letter keyboard. The mock taps each field and types on a drawn iOS keyboard: the card number with spaces ("4242 4242 4242 4242"), the expiry as "July 27" and the security code, then taps Done and Pay, and one red banner ("Card details are invalid") appears without saying which field. Fix: the same taps bring up a number pad for the card number (the digits space themselves as they're typed) and the security code, and a month/year wheel picker for the expiry; Pay goes through. Shares the `form-errors` problem with lessons 9 and 17, whose primary principles and bad UI are different. Built with new primitives: a drawn keyboard and wheel picker (`.kb`, `data-wheel`, and the `type` and `pick` autoplay steps), a mask (`data-mask` plus the class `mask`, set by restyle), and a form-check change: fields hidden in the current state are skipped. The expiry field and picker trade places with `.swap.wide`.

### 19. Delete sits right next to Save

```js
{ n:19, slug:'destructive-actions', title:'Delete sits right next to Save', theme:'feedback', status:'ready', frame:'Account settings',
  lede:'When the button that destroys something looks like the one people tap every day, and sits right beside it, a slip is all it takes. Make the dangerous one look dangerous, and keep it out of reach.',
  tags:['Error prevention','Fitts’s law'],
  problems:['wrong-taps'], screens:['settings'],
  synonyms:'delete remove danger dangerous destructive red irreversible delete account close account deactivate settings profile save button next to beside confirm type to confirm slip mistake accident accidental',
  phrases:['people hit delete by mistake','the dangerous button looks like the safe one','users deleted their account by accident','where should the delete button go','how do I make a destructive action safer'],
  steps:{
    before:{ anchor:'#gone-box', label:'The problem', title:'Aimed at Save, deleted the account',
      body:'Delete Account looks just like Save and sits right beside it. Here a thumb aimed at Save landed one button over, and nothing stood in the way.',
      cta:'Show the fix' },
    after:{ anchor:'#confirm-box', label:'The fix', title:'Far from Save, then typed to confirm',
      body:'Delete now sits apart from Save, and red marks it as dangerous. To go ahead, people type their username, so an accidental deletion is much less likely. That’s error prevention.',
      cta:'See the problem again' }
  }}
```

Same primary principle as lesson 18, with a different bad UI: an account settings screen (profile, notifications) with Delete Account and Save as two identical blue buttons side by side, instead of a card form. The mock taps Delete Account and an "Account deleted" alert appears straight away. Fix: Save fills the bottom bar on its own; Delete Account becomes a red row at the end of the settings, with a note on what it deletes, and its dialog asks people to type their username before Delete turns on. The mock opens that dialog. Built with collapse sideways (`.cx`), restyle (`.pair.solo`), `.alert.ask`, and a new type-to-confirm primitive (`data-match` on a `.field` in the alert, `data-needs` on its button); `data-ok` now ignores a disabled button and only carries out the asking button's `data-dismiss` when it has one. New kit pieces: `.row.red`, `.alert .field`.

### 20. The app feels slow even when it isn't

```js
{ n:20, slug:'optimistic-ui', title:'The app feels slow even when it isn’t', theme:'feedback', status:'ready', frame:'Feed',
  lede:'A spinner on every small action makes a fast app feel slow. When an action almost always works and is safe to undo, show the result straight away and let the server catch up.',
  tags:['Optimistic UI','Doherty threshold','Perceived performance'],
  problems:['unsure-it-worked'], screens:['feeds'],
  synonyms:'latency lag laggy instant instantly responsive response feels slow sluggish speed fast faster spinner loading wait waiting saved save sent liked like likes heart favorite tap tapped server request network',
  phrases:['the like button lags','people say the app is slow','there is a spinner on every tap','how do I make the app feel faster','users tap again because nothing happened'],
  steps:{
    before:{ anchor:'#like-1', label:'The problem', title:'1.2 seconds to fill a heart',
      body:'The heart waits for the server before it fills. It’s only a second, but it happens on every tap, so the whole app feels slow and people tap again.',
      cta:'Show the fix' },
    after:{ anchor:'#like-1', label:'The fix', title:'0 seconds to see the heart fill',
      body:'The heart fills the moment it’s tapped, while the request finishes in the background. A like rarely fails and is easy to undo, so if one does, the heart can simply un-fill. That’s optimistic UI.',
      cta:'See the problem again' }
  }}
```

Bad UI: a photo feed where tapping the heart swaps it for a spinner for 1.2 seconds before it fills; the mock taps, then taps again while it waits. Fix: the heart fills and the count goes up the instant it's tapped. Shares the `unsure-it-worked` problem with lesson 15, whose primary principle (visibility of system status) and bad UI (a checkout button) are different. Built with a new toggle primitive: `data-toggle` flips `aria-pressed` and the `.n` count; the class `lag` (set by restyle) with `data-lag` makes each tap wait behind a spinner first. New kit pieces: `.acts`, `.like`, `.ic`.

### 21. An error stops people with no way forward

```js
{ n:21, slug:'dead-ends', title:'An error stops people with no way forward', theme:'feedback', status:'draft', frame:'Bag',
  lede:'An error that only says something went wrong, then throws people out, ends the task for them. Say what you know, keep their work and give them a clear next step.',
  tags:['Error recovery','Information scent'],
  problems:['quit-midway'], screens:['errors','checkout'],
  synonyms:'404 not found error page broken link something went wrong dead end failed failure payment declined retry try again lost cart bag basket emptied empty error message code oops alert ok button next step',
  phrases:['people give up when they hit an error','something went wrong and then nothing','the error page has no way back','users lose their cart after an error','what should an error page say'],
  steps:{
    before:{ anchor:'#empty-bag', label:'The problem', title:'1 vague error, 0 ways forward',
      body:'“Something went wrong” doesn’t even say whether people were charged. OK is the only button, and it empties the bag, so people have to find every item again or give up.',
      cta:'Show the fix' },
    after:{ anchor:'#declined', label:'The fix', title:'2 ways forward, nothing lost',
      body:'It confirms nothing was charged and keeps the bag. Error recovery is the way forward: Retry Payment and Use Another Card each say exactly where they lead, which is information scent.',
      cta:'See the problem again' }
  }}
```

Bad UI: a bag at checkout. The mock taps Pay, an alert says only “Something went wrong / Error 1043. Please try again later.” with one OK button, and OK empties the bag. Fix: the same failed payment shows a banner above the bag saying what happened (nothing was charged, the bag is saved) and two actions inside it, Retry Payment and Use Another Card. Built with `.alert.ask` and a dismiss change: a `data-dismiss` button can now `data-then` to open `.c.later` blocks, so the bag can collapse into an empty state. Pay trades behaviors in a `.swap.wide`. New kit piece: `.banner .mini`.

### 22. The buttons are too small to hit

```js
{ n:22, slug:'fitts-law', title:'The buttons are too small to hit', theme:'interaction', status:'draft', frame:'Cart',
  lede:'A button people can see isn’t always one they can hit. Make touch targets big enough for a fingertip, and leave space between ones that do different things.',
  tags:['Fitts’s law','Touch target size'],
  problems:['wrong-taps'], screens:['checkout'],
  synonyms:'tap target touch target small buttons size distance tiny plus minus quantity stepper cart remove x close mis-tap mistap misclick finger fingertip thumb hit area spacing 44 points pixels minimum',
  phrases:['people keep missing the button','I tap the wrong one on my phone','the plus and minus are tiny','how big should a button be','fat finger mistakes'],
  steps:{
    before:{ anchor:'#cart', label:'The problem', title:'3 buttons under one fingertip',
      body:'The −, + and × are tiny and almost touching, so a fingertip covers two at once. Aiming for + here hit × instead, and the lamp left the cart.',
      cta:'Show the fix' },
    after:{ anchor:'#qty-1', label:'The fix', title:'44-point targets, space between',
      body:'Each button is now 44 points, Apple’s recommended minimum on iOS, with clear space before ×. Fitts’s law explains the gain: a bigger target is quicker to hit and harder to miss.',
      cta:'See the problem again' }
  }}
```

Bad UI: a cart whose −, + and × are 22px and almost touching; the mock taps + on the desk lamp, then aims for + again and hits ×, removing it. Fix: every control grows to 44px with clear space before ×; the mock taps + twice cleanly. Shares the `wrong-taps` problem with lesson 19, whose primary principle (error prevention) and bad UI (Delete beside Save) are different. Built with a new stepper primitive (`.qty`, `.stepper`, `data-step`) and restyle (`tiny`).

### 23. I can’t reach the button with one hand

```js
{ n:23, slug:'thumb-zone', title:'I can’t reach the button with one hand', theme:'interaction', status:'draft', frame:'New post',
  lede:'On a big phone held in one hand, the top of the screen is a stretch. Put the action people take most within easy reach of the thumb.',
  tags:['Thumb zone','Fitts’s law'],
  problems:['miss-main-action'], screens:['navigation'],
  synonyms:'reach one handed one-handed mobile bottom top thumb thumbs stretch grip corner top right nav bar navigation bar post button compose keyboard big phone large screen ergonomics sticky',
  phrases:['the main button is at the top of the screen','hard to use with one hand','people stretch to reach the button','where should buttons go on mobile','big phones make this awkward'],
  steps:{
    before:{ anchor:'#post-a', label:'The problem', title:'Typed at the bottom, Post at the top',
      body:'People hold the phone in one hand and type with a thumb near the bottom. Post sits in the far top corner, so they have to stretch or shift their grip to finish.',
      cta:'Show the fix' },
    after:{ anchor:'#post-b', place:'above', label:'The fix', title:'Post sits right by the thumb',
      body:'Post now rides on top of the keyboard, where a one-handed thumb reaches easily. That’s the thumb zone. On other screens and devices, the easy-reach spot may differ.',
      cta:'See the problem again' }
  }}
```

Bad UI: a New Post screen; the mock types with the drawn keyboard open while Post sits in the top-right of the nav bar. Fix: Post is a full-width button in a dock that rides on top of the keyboard. Different from lesson 22: the button is big enough but out of reach. Built with a new keyboard dock (`.dock.ride`, plus `.dock.bare` set by restyle for Before), a `.swap` in the nav bar, `.compose`, and a new tooltip option, `place:'above'`, so the fix tooltip doesn’t cover the keyboard.

### 24. Red and green are the only difference

```js
{ n:24, slug:'color-alone', title:'Red and green are the only difference', theme:'interaction', status:'planned',
  tags:['Use of color (WCAG 1.4.1)','Redundant coding'],
  problems:['states-look-same'], screens:['dashboards'],
  synonyms:'accessibility a11y color blind colour blind contrast status charts',
  phrases:['colorblind users cannot tell which ones failed','the status only shows as a colored dot','is red and green enough','people cannot see the difference between states','how do I make status accessible'] }
```

Bad UI: an orders dashboard where status is only a red or green dot. Fix: each status adds an icon and a word.

### 25. The hint disappears as soon as people start typing

```js
{ n:25, slug:'labels-not-placeholders', title:'The hint disappears as soon as people start typing', theme:'interaction', status:'planned',
  tags:['Labels or instructions (WCAG 3.3.2)','Recognition over recall'],
  problems:['forget-info'], screens:['forms','sign-up'],
  synonyms:'placeholder label input field accessibility floating label',
  phrases:['people forget what the field was for','placeholder text vanishes','users cannot check what they entered','are placeholders enough as labels','the grey text looks already filled in'] }
```

Bad UI: a login form where the only label is grey placeholder text that vanishes on typing. Fix: a visible label above every field.

### 26. People don't realize it's tappable

```js
{ n:26, slug:'affordance', title:'People don’t realize it’s tappable', theme:'interaction', status:'planned',
  tags:['Signifiers','Affordance'],
  problems:['unclear-buttons'], screens:['navigation'],
  synonyms:'affordance flat design clickable signifier links',
  phrases:['nobody clicks the link','people do not know it is a button','users miss that the card opens','flat design is confusing people','how do I show something is clickable'] }
```

Bad UI: a product screen where Edit and Share are grey text identical to labels, and cards that open have no chevron. Fix: buttons look like buttons, tappable rows get a chevron.

### 27. OK, Submit, Yes: what does this button do?

```js
{ n:27, slug:'clear-labels', title:'OK, Submit, Yes: what does this button do?', theme:'interaction', status:'planned',
  tags:['Descriptive labels','Match between system and the real world'],
  problems:['unclear-buttons'], screens:['dialogs'],
  synonyms:'microcopy ux writing ok submit wording copy',
  phrases:['people are not sure what OK means here','users cancel when they meant to keep','the button wording is vague','what should the button say','yes and no are confusing in this dialog'] }
```

Bad UI: "Cancel subscription? [Cancel] [OK]", where Cancel keeps the subscription. Fix: "Keep subscription" and "Cancel subscription".

### 28. The no button tries to guilt people

```js
{ n:28, slug:'confirmshaming', title:'The no button tries to guilt people', theme:'interaction', status:'planned',
  tags:['Confirmshaming','Deceptive design'],
  problems:['feel-tricked'], screens:['dialogs','sign-up'],
  synonyms:'dark pattern guilt manipulative opt out unsubscribe',
  phrases:['our opt-out link sounds passive-aggressive','users feel manipulated','no thanks I hate saving money','is this a dark pattern','people are annoyed by the decline wording'] }
```

Bad UI: a discount sheet whose decline link reads "No thanks, I don't like saving money." Fix: a plain "No thanks."

## Wrap-up

These don't teach a single problem, so rules 1 and 4 don't apply.

```js
{ n:29, slug:'spot-the-problems', title:'Spot the problems', theme:'wrap-up', status:'planned', problems:[], screens:[],
  synonyms:'quiz review practice',
  phrases:['test what I learned','ux quiz','practice spotting design problems','find the mistakes in this screen'] },
{ n:30, slug:'month-in-review', title:'The month in review', theme:'wrap-up', status:'planned', problems:[], screens:[],
  synonyms:'recap summary',
  phrases:['all the principles in one place','ux principles cheat sheet','recap of every lesson','what did the month cover'] }
```
