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
{ n:21, slug:'dead-ends', title:'An error stops people with no way forward', theme:'feedback', status:'ready', frame:'Bag',
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
{ n:22, slug:'fitts-law', title:'The buttons are too small to hit', theme:'interaction', status:'ready', frame:'Cart',
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
{ n:23, slug:'thumb-zone', title:'I can’t reach the button with one hand', theme:'interaction', status:'ready', frame:'New post',
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
{ n:24, slug:'color-alone', title:'Red and green are the only difference', theme:'interaction', status:'ready', frame:'Orders',
  lede:'Plenty of people can’t tell red from green, and in bright sun almost nobody can. When color is the only difference between two states, add a word or an icon that says it too.',
  tags:['Use of color (WCAG 1.4.1)','Redundant coding'],
  problems:['states-look-same'], screens:['dashboards'],
  synonyms:'accessibility accessible a11y wcag color colour blind blindness colorblind colourblind deuteranopia protanopia red green dot dots traffic light status statuses badge badges pill label icon chart charts legend orders dashboard failed success error grayscale greyscale',
  phrases:['colorblind users cannot tell which ones failed','the status only shows as a colored dot','is red and green enough','people cannot see the difference between states','how do I make status accessible','failed orders look the same as shipped ones'],
  steps:{
    before:{ anchor:'#orders', label:'The problem', title:'Shipped or failed? Only color says',
      body:'Each order’s status is just a green or red dot. To the roughly 1 in 12 men with red-green color blindness, the dots look alike, so failed orders slip by.',
      cta:'Show the fix' },
    after:{ anchor:'#orders', label:'The fix', title:'An icon and a word for every status',
      body:'Every status now says Shipped or Failed, with its own icon, and the color only backs it up. Color is no longer the only cue, as WCAG’s use of color rule requires.',
      cta:'See the problem again' }
  }}
```

Bad UI: a store's Orders screen where four orders show their status only as a green or red dot, with a color-only legend above the list. Fix: each dot becomes a tinted pill with an icon and a word (a check and "Shipped", an alert and "Failed"), and the legend goes. Built with text swap (`.swap.end`); new kit pieces `.sdot`, `.spill` (add `.fail`), `.legend`, and a `--ios-green-text` color token.

### 25. The hint disappears as soon as people start typing

```js
{ n:25, slug:'labels-not-placeholders', title:'The hint disappears as soon as people start typing', theme:'interaction', status:'ready', frame:'Log in',
  lede:'Placeholder text looks like a label until people start typing, and then it’s gone. Put a real label above each field, so people can always check what it wants.',
  tags:['Labels or instructions (WCAG 3.3.2)','Recognition over recall'],
  problems:['forget-info'], screens:['forms','sign-up'],
  synonyms:'placeholder placeholders label labels input inputs field fields text box grey gray hint hints vanish vanishes disappear disappears floating label accessibility a11y wcag login log in sign in signin email username password form',
  phrases:['people forget what the field was for','placeholder text vanishes','users cannot check what they entered','are placeholders enough as labels','the grey text looks already filled in','the hint goes away when I type'],
  steps:{
    before:{ anchor:'#login', label:'The problem', title:'Typed in, and the label is gone',
      body:'The grey hint was the field’s only label, and it vanished at the first keystroke. Was this box for an email or a username? Nothing is left to check.',
      cta:'Show the fix' },
    after:{ anchor:'#login', label:'The fix', title:'A label above every field',
      body:'Each label sits above its field and stays put while typing, so people can always check what it wants. WCAG requires labels or instructions for input; a lasting, visible label is the most usable way.',
      cta:'See the problem again' }
  }}
```

Bad UI: a Log In screen whose Email and Password boxes are labeled only by placeholder text. The mock types "dana.kim" with the drawn keyboard, and the hint is gone, so nothing says the box wanted an email. Fix: a visible label above each box; the mock types "dana.kim@hey.com" and the labels stay put. Shares the `forget-info` problem with lesson 4, whose primary principle (recognition over recall) and bad UI (a send-money form) are different. Built with collapse/expand for the labels, a `.swap.wide` per field (one input per state) and restyle (new `.fgap`, which spaces label-less boxes apart).

### 26. People don't realize it's tappable

```js
{ n:26, slug:'affordance', title:'People don’t realize it’s tappable', theme:'interaction', status:'ready', frame:'Listing',
  lede:'People only tap what looks tappable. If a button looks like plain text, or a row that opens looks just like one that doesn’t, most people never try it.',
  tags:['Signifiers','Affordance'],
  problems:['unclear-buttons'], screens:['navigation'],
  synonyms:'affordance affordances signifier signifiers clickable tappable tap click flat design button buttons link links chevron arrow disclosure row rows cell cells looks like text plain text grey gray hidden discoverable discoverability listing marketplace edit share',
  phrases:['nobody clicks the link','people do not know it is a button','users miss that the card opens','flat design is confusing people','how do I show something is clickable','nobody taps the row'],
  steps:{
    before:{ anchor:'#listing', label:'The problem', title:'4 things to tap, none look it',
      body:'Edit and Share are grey text, just like the date, and the Offers and Messages rows have no arrow. In this example, sellers missed offers because nothing said those rows open.',
      cta:'Show the fix' },
    after:{ anchor:'#listing', label:'The fix', title:'Buttons look like buttons, rows show arrows',
      body:'Edit and Share now look like buttons, and each row that opens gets a chevron. Views doesn’t open, so it gets none. Nothing new became tappable: these signifiers just show what already could be.',
      cta:'See the problem again' }
  }}
```

Bad UI: a marketplace "Your Listing" screen (a walnut desk lamp) where Edit and Share are grey text in the same line as "Listed Oct 12", and the Offers, Messages and Views rows all look the same, though only the first two open. Fix: Edit listing and Share become tinted buttons, and chevrons fade in on Offers and Messages only. Shares the `unclear-buttons` problem with lesson 13, whose primary principle (consistency) and bad UI (a filter sheet) are different. Built with text swap, collapse/expand and restyle; new kit pieces `.tlink`, `.unseen` and `.primary.tint`.

### 27. OK, Submit, Yes: what does this button do?

```js
{ n:27, slug:'clear-labels', title:'OK, Submit, Yes: what does this button do?', theme:'interaction', status:'ready', frame:'Subscription',
    lede:'People often decide from the buttons as much as the question above them. Label each button with what it does, like Stay Subscribed, so the choice is clear at a glance.',
    tags:['Descriptive labels','Match between system and the real world'],
    problems:['unclear-buttons'], screens:['dialogs','checkout'],
    synonyms:'microcopy ux writing ok submit yes no cancel wording copy label labels button buttons vague generic verb verbs action alert alerts dialog confirm confirmation subscription subscribe unsubscribe keep plain language',
    phrases:['people are not sure what OK means here','users cancel when they meant to keep','the button wording is vague','what should the button say','yes and no are confusing in this dialog','people tap cancel and nothing gets canceled'],
    steps:{
      before:{ anchor:'#ask-a-box', place:'above', label:'The problem', title:'Cancel keeps it, OK cancels it',
        body:'The question is about canceling, and the buttons answer with Cancel and OK. When people skim the dialog, the buttons carry the meaning, so someone who taps Cancel to cancel stays subscribed.',
        cta:'Show the fix' },
      after:{ anchor:'#ask-b-box', place:'above', label:'The fix', title:'Each button names its action',
        body:'Stay Subscribed and Cancel Subscription each say what happens next, so they make sense even when the question is skimmed. These are descriptive labels; using the task’s words instead of OK also helps.',
        cta:'See the problem again' }
    }}
```

Bad UI: a music app's Subscription screen (Tempo Premium, $10.99 a month). The mock taps Cancel Subscription, and an alert asks “Cancel subscription?” with Cancel and OK, where Cancel keeps the subscription and OK ends it. Fix: the same alert with stacked Stay Subscribed and Cancel Subscription (red) buttons. OK or Cancel Subscription really cancels: the row goes and a note says Premium stays on until Nov 3. Shares the `unclear-buttons` problem with lessons 13 and 26, whose primary principles (consistency, signifiers) and bad UI (a filter sheet, a listing) are different. Built with modal (`data-ask` alerts, one per state, opened by an autoplay tap on a `.swap.wide` row); new kit pieces `.alert-btns.vert` (stacked alert buttons) and `.modal.low` (seats the dialog low so the tooltip fits above it).

### 28. The no button tries to guilt people

```js
{ n:28, slug:'confirmshaming', title:'The no button tries to guilt people', theme:'interaction', status:'ready', frame:'Shop',
    lede:'Guilt-trip wording on a decline button might win a few extra sign-ups, but it can make people feel manipulated. Make the case for yes, and let no be a plain no.',
    tags:['Confirmshaming'],
    problems:['feel-tricked'], screens:['dialogs','sign-up'],
    synonyms:'dark pattern dark patterns guilt guilt-trip shame shaming manipulative manipulation pushy opt out opt-out decline no thanks popup discount coupon offer promo email signup newsletter unsubscribe deceptive passive aggressive',
    phrases:['our opt-out link sounds passive-aggressive','users feel manipulated','no thanks I hate saving money','is this a dark pattern','people are annoyed by the decline wording','the decline link makes people feel bad'],
    steps:{
      before:{ anchor:'#offer', label:'The problem', title:'7 words of guilt just to say no',
        body:'To turn down the discount, people have to tap “I don’t like saving money.” That’s confirmshaming: it uses guilt to push people toward yes, and it may leave them annoyed at the brand.',
        cta:'Show the fix' },
      after:{ anchor:'#offer', label:'The fix', title:'Just “No Thanks”',
        body:'“No Thanks” removes the shaming, so declining costs nothing. A fully honest choice also needs truthful offer terms and clear ways to accept or refuse.',
        cta:'See the problem again' }
    }}
```

Bad UI: a plant shop's home screen with a 15%-off email offer sheet docked at the bottom, whose decline button reads “No thanks, I don’t like saving money.” Fix: the same sheet with a plain “No Thanks”; the offer itself doesn’t change. Either button dismisses the sheet. Built with text swap inside a `.dock`; new kit piece `.promo` (an offer sheet's centered heading and line).

## Units 5–20 (planned)

Lessons 29–124 continue the curriculum: four more parts of four units each, six lessons per unit. These are already in `LESSONS` as `status:'planned'`. Each entry below has the title, tags, problem, screens, synonyms and phrases; `lede`, `frame` and `steps` get written when the lesson is built. The Bad UI and Fix lines are starting points: change the scenario if the two tooltips don't come easily.

When a lesson reuses a principle that is already another lesson's primary tag, its bad UI must be different (rule 4). Those are lessons 54 (Chunking), 65 (Jakob’s law), 75 (Visibility of system status), 78 (User control and freedom), 81 (Information architecture), 90 (Error prevention) and 93 (Smart defaults); each uses a new screen and scenario.

| Part | Units | Lessons |
| --- | --- | --- |
| 2. Visual design foundations | 5–8 | 29–52 |
| 3. The mind | 9–12 | 53–76 |
| 4. Flows and structure | 13–16 | 77–100 |
| 5. Words, access and ethics | 17–20 | 101–124 |

Credits for principle pages: the Unit 20 pattern names come from Harry Brignull’s deceptive patterns typology (deceptive.design); lesson 60 echoes Nunes and Drèze’s endowed progress study and lesson 62 Buell and Norton’s labor illusion study. Write every definition and tooltip in your own words.

## Unit 5: Type and readability

Making text easy to read: size, spacing, emphasis and fonts.

### 29. The text is too small to read comfortably

```js
{ n:29, slug:'type-scale', title:'The text is too small to read comfortably', theme:'type', status:'ready', frame:'Recipe',
    lede:'Small, pale text makes people work for every word, and sizes only a pixel apart blur together. Start body text around 17px with good contrast, and step the other sizes clearly apart.',
    tags:['Type scale','Legibility'], problems:['hard-to-read'], screens:['reading'],
    synonyms:'font size text size small tiny typography type scale body text 12px 17px readable legibility headings hierarchy recipe',
    phrases:['the text is too small','people squint at the screen','what font size should body text be','all the text looks the same size','how many font sizes should I use'],
    steps:{
      before:{ anchor:'#rc-top', label:'The problem', title:'Five text sizes, all 11 to 15px',
        body:'Body text is 12px and pale grey, and the title and headings are only a few pixels bigger. People squint to read it, and nothing shows where one part ends and the next begins.',
        cta:'Show the fix' },
      after:{ anchor:'#rc-top', label:'The fix', title:'A four-step scale: 28, 20, 17, 13px',
        body:'Body text is now 17px and black, with clear steps from title to caption. The recipe is easier to read, and the type scale makes it quick to scan.',
        cta:'See the problem again' }
    }}
```

Bad UI: a recipe screen (Lemon ricotta pancakes) with five text sizes from 11 to 15px, and body text at 12px grey. Fix: 17px body text on a four-step scale (28px title, 20px heading, 17px body, 13px caption). The ingredient ticks work in both states. Built with restyle; new kit pieces `.rd` (reading surface with `.rd-t`, `.rd-h`, `.rd-b`, `.rd-p`, `.rd-c`, `.rd-i`) and the restyle classes `.fs11` to `.fs15` and `.faint`.

### 30. The lines are crammed together

```js
{ n:30, slug:'line-height', title:'The lines are crammed together', theme:'type', status:'ready', frame:'Article',
    lede:'When lines sit right on top of each other, a paragraph turns into one dark block and eyes slip to the wrong line. Start with about 1.5 line height and a little space between paragraphs, then adjust for your font and line length.',
    tags:['Line height'], problems:['hard-to-read'], screens:['reading'],
    synonyms:'line height leading line spacing tight cramped dense paragraph article readability typography',
    phrases:['the paragraphs feel dense','people lose their place reading','text lines are too close','what line height should I use','long text is tiring to read'],
    steps:{
      before:{ anchor:'#art-p1', label:'The problem', title:'Line height 1.0, lines nearly touching',
        body:'Each line sits right on the one below, and paragraphs run together. When the eye jumps back to start a new line, it can easily land on the wrong one.',
        cta:'Show the fix' },
      after:{ anchor:'#art-p1', label:'The fix', title:'1.5 line height, space between paragraphs',
        body:'Same words, font and size. About 1.5 line height plus space between paragraphs is a good starting point, so the eye finds each next line. Tune it for your font and line length.',
        cta:'See the problem again' }
    }}
```

Bad UI: a reader app's article (Why tomatoes split) with lines at 1.0 line height and no space between paragraphs. Fix: 1.5 line height and 14px between paragraphs; same words, font and size. Shares the `hard-to-read` problem with lesson 29, whose primary principle (type scale) and bad UI (a recipe) are different. Built with restyle, which now glides line height too; new restyle class `.tight`.

### 31. Everything is shouting in capitals

```js
{ n:31, slug:'all-caps', title:'Everything is shouting in capitals', theme:'type', status:'ready', frame:'Delivery notice',
    lede:'When every word is in bold capitals, a message shouts and nothing in it stands out. Write in sentence case, and save bold for the few words people must not miss.',
    tags:['Typographic emphasis'], problems:['hard-to-read'], screens:['dialogs'],
    synonyms:'all caps uppercase capitals bold shouting emphasis sentence case title case notice alert warning loud',
    phrases:['everything is in capital letters','the notice feels like it is yelling','nothing stands out because everything is bold','should buttons be uppercase','all caps is hard to read'],
    steps:{
      before:{ anchor:'#notice', place:'above', label:'The problem', title:'Every word in bold capitals',
        body:'When the whole notice is in bold capitals, nothing stands out, and it\u2019s tiring to read. The one detail people need, the new delivery date, gets lost in the noise.',
        cta:'Show the fix' },
      after:{ anchor:'#notice', place:'above', label:'The fix', title:'Sentence case, one phrase in bold',
        body:'Emphasis only works when it\u2019s rare. In sentence case the notice reads calmly, and the new date, the only bold words in the message, is what people see first.',
        cta:'See the problem again' }
    }}
```

Bad UI: an order-delay alert over an Orders screen, with the title, message and buttons all in bold capitals, so the new delivery date is lost. Fix: sentence case, with only the new date (Thursday, Oct 29) in bold. Built with restyle and the modal (`.modal.low`, tooltip above); new restyle class `.shout`.

### 32. Four fonts on one screen

```js
{ n:32, slug:'typeface-pairing', title:'Four fonts on one screen', theme:'type', status:'ready', frame:'Invite',
    lede:'Every typeface has its own voice, and four on one screen talk over each other. Most screens need one or two, with size and weight doing the work of hierarchy.',
    tags:['Typeface pairing','Consistency and standards'], problems:['cluttered'], screens:['dashboards'],
    synonyms:'fonts font typeface typefaces pairing mixing serif sans script slab family weights typography invite event',
    phrases:['the screen uses too many fonts','which fonts go together','the design feels chaotic','how many typefaces should an app use','the text styles do not match'],
    steps:{
      before:{ anchor:'#inv-head', label:'The problem', title:'Script, slab, serif and sans in one card',
        body:'Each font has its own personality, so four of them pull the invite in four directions. It looks chaotic, and no font has a clear job.',
        cta:'Show the fix' },
      after:{ anchor:'#inv-head', label:'The fix', title:'One family; size and weight do the work',
        body:'One typeface keeps the invite calm, and size and weight set the order: a big bold title, a semibold date, then regular details. If you pair two fonts, give each a clear job.',
        cta:'See the problem again' }
    }}
```

Bad UI: a garden party invite whose title is a script, date a slab serif, location an italic display serif and body a sans serif. Fix: one type family, with hierarchy from size and weight (28px bold title, 17px semibold date, 15px grey location, 17px body). Built with restyle; new restyle classes `.ff-script`, `.ff-slab`, `.ff-serif` (Pacifico, Roboto Slab and Playfair Display, added to the Google Fonts link), and new kit pieces `.card.inset`, `.cover` and `.rd-s`.

### 33. The prices in the list don’t line up

```js
{ n:33, slug:'tabular-figures', title:'The prices in the list don\u2019t line up', theme:'type', status:'ready', frame:'Spending',
    lede:'When amounts start at the left and each digit has its own width, a column of prices zigzags. Give every amount the same format (like two decimal places), right-align them and turn on tabular figures (tabular-nums in CSS), so digits line up place by place.',
    tags:['Tabular figures','Alignment'], problems:['numbers-unclear'], screens:['feeds','data'],
    synonyms:'numbers digits prices amounts tabular figures tabular-nums monospaced numerals right align decimal column expenses list money',
    phrases:['the numbers do not line up','hard to compare prices in a list','amounts look jagged','should numbers be right aligned','the decimal points are all over the place'],
    steps:{
      before:{ anchor:'#bills', label:'The problem', title:'Decimal points zigzag down the list',
        body:'The amounts start at the left, so their decimal points zigzag, and digits of different widths make it worse. To see which bill is bigger, people have to read every number.',
        cta:'Show the fix' },
      after:{ anchor:'#bills', label:'The fix', title:'Right-aligned, with tabular figures',
        body:'Tabular figures give every digit the same width. With cents on every amount, right alignment then lines up the decimal points, so the size of each amount shows at a glance.',
        cta:'See the problem again' }
    }}
```

Bad UI: a monthly budget with bills and everyday spending, amounts left-aligned in proportional digits, so the decimal points zigzag. Fix: right-aligned amounts in tabular figures. Built with restyle, which now glides flex-grow; new kit pieces `.num` (amount column) with a `.push` spacer that restyles to `.grow`, and the restyle class `.prop`.

### 34. The key detail gets cut off with “…”

```js
  { n:34, slug:'truncation', title:'The key detail gets cut off with “…”', theme:'type', status:'ready', frame:'Deliveries',
    lede:'A one-line preview that ends in “…” often cuts off the very detail people opened the app for. Put the key detail first, and let important text wrap to a second line before you cut it.',
    tags:['Truncation','Front-loading'], problems:['skim-past'], screens:['feeds'],
    synonyms:'truncate truncated ellipsis cut off dots overflow text wrap long text preview notification list row',
    phrases:['the important part gets cut off','the text ends with dots','people cannot see the full message','when should text truncate','the date is hidden behind an ellipsis'],
    steps:{
      before:{ anchor:'#dl', label:'The problem', title:'3 updates, every key detail cut off',
        body:'Each update fits on one line and ends in \u201c\u2026\u201d, right before the delivery day, the drop-off spot or the signature request. To learn anything, people have to open every order.',
        cta:'Show the fix' },
      after:{ anchor:'#dl', label:'The fix', title:'Key detail first, two lines to fit',
        body:'Each update now leads with what changed, and the text wraps to a second line before it\u2019s cut. If it still runs long, keep everything people need ahead of the cutoff.',
        cta:'See the problem again' }
    }}
```

Bad UI: a Deliveries list whose one-line updates end in “…” right before the delivery day, the drop-off spot or the signature request. Fix: each update leads with the key detail in bold and wraps to two lines before it’s cut. Built with collapse/expand (a clipped and a wrapped version of each line); new kit pieces `.txt` (a row’s text column), `.clip` (one line with an ellipsis), `.clamp2` (two lines, then an ellipsis) and `.sub b`.

## Unit 6: Color and contrast

Using color to guide the eye and carry meaning, without leaving anyone out.

### 35. The grey text is hard to read

```js
  { n:35, slug:'contrast-minimum', title:'The grey text is hard to read', theme:'color', status:'ready', frame:'Backup settings',
    lede:'Pale grey looks tidy on a big monitor, but on a phone in daylight, or for someone with low vision, it fades away. Normal-size text needs a contrast ratio of at least 4.5:1 against its background.',
    tags:['Contrast minimum (WCAG 1.4.3)'], problems:['hard-to-read'], screens:['settings'],
    synonyms:'contrast ratio light grey gray pale faint low contrast accessibility a11y wcag 4.5 readable text color',
    phrases:['the light grey text is hard to read','people cannot read the small print','is my text contrast high enough','the text is too faint','what contrast ratio do I need'],
    steps:{
      before:{ anchor:'#cell-row', label:'The problem', title:'Light grey text at 2.3:1 contrast',
        body:'The descriptions are pale grey on white, far below the 4.5:1 minimum for normal-size text. In bright light, or with low vision, the warning about data charges is easy to miss.',
        cta:'Show the fix' },
      after:{ anchor:'#cell-row', label:'The fix', title:'Darker grey at 5.2:1, still secondary',
        body:'The descriptions now pass the 4.5:1 minimum, and they still read as secondary because they\u2019re smaller and greyer than the labels. Check the ratio with a contrast tool, not by eye.',
        cta:'See the problem again' }
    }}
```

Bad UI: Backup settings with descriptions in pale grey on white (#ACACAC, 2.3:1), including a warning about cellular data charges. Fix: the same descriptions in a darker grey (#6C6C70, 5.2:1; #98989D on dark), still quieter than the labels. Built with restyle; new kit piece `.desc` (a secondary line under a row label) and restyle class `.lowc`, with new color tokens `--ios-faint` and `--ios-2aa`.

### 36. So many colors that nothing stands out

```js
  { n:36, slug:'color-restraint', title:'So many colors that nothing stands out', theme:'color', status:'ready', frame:'Shop dashboard',
    lede:'Color draws the eye, but only when it\u2019s rare. Keep most of a screen neutral and save strong color for the one thing that needs attention, so it\u2019s the first thing people see.',
    tags:['Color restraint','Von Restorff effect'], problems:['cluttered'], screens:['dashboards'],
    synonyms:'colors colourful rainbow too many colors accent palette loud busy dashboard tiles highlight alert stand out',
    phrases:['the screen is too colorful','nothing stands out','every card is a different color','how many colors should I use','people miss the alert'],
    steps:{
      before:{ anchor:'#board', label:'The problem', title:'7 tiles in 7 bright colors',
        body:'Every tile has its own bright color, so the one that needs action, 3 late orders, looks like just another tile. When everything is colorful, nothing stands out.',
        cta:'Show the fix' },
      after:{ anchor:'#late', label:'The fix', title:'Calm tiles, strong color only for the alert',
        body:'Now the late orders are the only tile filled with strong color, so they stand out at a glance. That\u2019s the Von Restorff effect: when one thing looks different from everything around it, people notice it.',
        cta:'See the problem again' }
    }}
```

Bad UI: a shop dashboard where every tile has its own bright color, so the red “3 orders late” alert blends in. Fix: white tiles whose small icons keep a soft tint of their color, with the alert the only tile filled with strong color. Built with restyle; new kit pieces `.board`, `.mt` (a dashboard tile; `.mt.wide`, `.mt.alarm`) and restyle class `.loud`, with new color token `--ios-alarm` (white text at 5.4:1).

### 37. Blue means tap, except when it doesn’t

```js
  { n:37, slug:'semantic-color', title:'Blue means tap, except when it doesn\u2019t', theme:'color', status:'ready', frame:'Storage settings',
    lede:'Blue is the color people expect to tap. Give it to headings, icons and plain numbers too, and it stops meaning anything: people tap things that do nothing and miss the real links.',
    tags:['Semantic color','Consistency and standards'], problems:['unclear-buttons'], screens:['settings'],
    synonyms:'blue link color tappable clickable meaning semantic tint accent headings decoration interactive color system',
    phrases:['people tap blue text that does nothing','which colors mean clickable','the brand color is everywhere','users cannot tell links from headings','what should the accent color be used for'],
    steps:{
      before:{ anchor:'#usage', label:'The problem', title:'14 blue things, only 4 can be tapped',
        body:'Headings, icons and storage numbers are the same blue as the links. People tap 84 GB expecting details and nothing happens, while Manage Storage looks like everything else.',
        cta:'Show the fix' },
      after:{ anchor:'#manage', label:'The fix', title:'Blue only on what you can tap',
        body:'Headings, icons and numbers are now black or grey, so blue is left for the 4 links. When blue consistently means “tap here,” people learn it once and trust it on every screen.',
        cta:'See the problem again' }
    }}
```

Bad UI: Storage settings where section headings, row icons and storage numbers are all the same blue as the links, so 14 things are blue and only 4 can be tapped; the mock taps 84 GB and nothing happens. Fix: headings, icons and numbers go grey or black, and blue is left for Manage Storage, Learn More, Change Plan and the back button. Built with restyle; new kit pieces `.gl` (a grey leading line icon) and restyle class `.tint` (tappable blue).

### 38. The text disappears into the photo

```js
  { n:38, slug:'text-over-images', title:'The text disappears into the photo', theme:'color', status:'ready', frame:'Travel feed',
    lede:'White text can vanish where a photo is bright, like sky, sand or snow, and you rarely know which photo will be behind it. A soft dark fade under the text keeps it readable on most images.',
    tags:['Figure-ground','Contrast'], problems:['hard-to-read'], screens:['feeds'],
    synonyms:'text on image photo background overlay scrim gradient white text hero banner card travel legibility',
    phrases:['the white text is hard to read on the photo','the title gets lost in the image','how do I put text on a photo','the hero text has no contrast','text over images is unreadable'],
    steps:{
      before:{ anchor:'#hero-1', label:'The problem', title:'White text on pale sand and snow',
        body:'The titles sit on the brightest part of each photo, at about 1.2:1 contrast. On sand and snow they almost disappear, and every new photo is a gamble.',
        cta:'Show the fix' },
      after:{ anchor:'#hero-1', label:'The fix', title:'A soft dark fade behind the text',
        body:'A gradient darkens just the bottom of each photo, giving the white text a darker, more consistent background. That\u2019s figure-ground: text needs a clear background to read as text.',
        cta:'See the problem again' }
    }}
```

Bad UI: a travel feed whose white titles sit on pale sand and snow (about 1.2:1). Fix: a dark gradient fades in over the bottom of each photo, behind the text (about 5:1 under the title). Built with restyle; new kit pieces `.hero` (a photo card with an SVG illustration), `.cap` (its caption), `.scrim` (restyle to `.on`) and `.hero-meta`.

### 39. Spending shows up in green

```js
  { n:39, slug:'color-conventions', title:'Spending shows up in green', theme:'color', status:'ready', frame:'Checking account',
    lede:'People bring color meanings with them. With money, green usually means money in and red means money out, so flipping them makes a bad week look good. (Some markets, like Chinese stock markets, use red for gains, so match your audience.)',
    tags:['Mental models','Match between system and the real world'], problems:['numbers-unclear'], screens:['dashboards'],
    synonyms:'red green money spending income budget convention meaning color meaning negative positive finance bank',
    phrases:['people misread their spending','the colors mean the opposite of what people expect','should money out be red','users think they earned money','the budget colors are confusing'],
    steps:{
      before:{ anchor:'#tx', label:'The problem', title:'Spending in green, income in red',
        body:'Every expense is green and the paycheck is red, so a week that lost money looks like a win. People have to read every row to see that $176.20 actually left.',
        cta:'Show the fix' },
      after:{ anchor:'#tx', label:'The fix', title:'Green and a plus mean money in',
        body:'Income is green with a plus, spending has a minus, and the week\u2019s loss is red, matching what people know from banks. The signs carry the meaning too, so color isn\u2019t the only clue.',
        cta:'See the problem again' }
    }}
```

Bad UI: a checking account where the rent and groceries show in green and the paycheck in red, so a week that lost $176.20 shows a big green $176.20. Fix: income green with a plus, spending with a minus in the label color, and the week’s net loss red with a minus. Built with restyle and text swap; new restyle classes `.gain` and `.loss` (green and red text that pass 4.5:1).

### 40. Dark mode looks like a photo negative

```js
{ n:40, slug:'dark-mode', title:'Dark mode looks like a photo negative', theme:'color', status:'planned',
    tags:['Elevation','Dark mode design'], problems:['hard-to-read'], screens:['settings'],
    synonyms:'dark mode dark theme night black background neon saturated colors shadows elevation surfaces glare',
    phrases:['dark mode is hard on the eyes','our dark theme looks harsh','the cards disappear in dark mode','how do I design dark mode','the colors glow too much on black'] }
```

Bad UI: Pure black screens with neon accents and no way to tell cards from the background. Fix: Layered dark greys for surfaces, lighter as they rise, and a softer accent color.

## Unit 7: Space and grouping

How spacing and shape tell people what belongs together.

### 41. Everything is crammed together

```js
{ n:41, slug:'white-space', title:'Everything is crammed together', theme:'space', status:'planned',
    tags:['White space','Cognitive load'], problems:['cluttered'], screens:['checkout'],
    synonyms:'white space whitespace breathing room margins padding crowded cramped dense busy cluttered product page',
    phrases:['the screen feels crowded','there is no breathing room','everything is squeezed together','how much padding should I use','the page feels overwhelming'] }
```

Bad UI: A product page packed edge to edge, with no gaps between sections. Fix: Wider margins and clear gaps between sections; nothing removed, all easier to scan.

### 42. Things that look alike do different things

```js
{ n:42, slug:'similarity', title:'Things that look alike do different things', theme:'space', status:'planned',
    tags:['Law of similarity'], problems:['wrong-taps'], screens:['feeds','search'],
    synonyms:'similarity same style chips buttons filters tags gestalt look alike lookalike pills toggle action',
    phrases:['people tap the filter thinking it is a button','the chips and buttons look the same','users do not know which pills are filters','same style different behavior','people mix up tags and actions'] }
```

Bad UI: Filter chips and action buttons drawn as identical pills in one row. Fix: Filters look like chips and actions look like buttons, so each style means one thing.

### 43. The steps don’t look connected

```js
{ n:43, slug:'uniform-connectedness', title:'The steps don\u2019t look connected', theme:'space', status:'planned',
    tags:['Uniform connectedness'], problems:['hard-to-follow'], screens:['checkout'],
    synonyms:'connected steps timeline tracker order tracking progress stepper line dots stages delivery status gestalt',
    phrases:['people cannot tell what stage the order is in','the steps look like separate things','how do I show a sequence','the tracker is confusing','users do not see the progress'] }
```

Bad UI: Order tracking shown as four loose dots with labels, with nothing tying them together. Fix: A line joins the dots, and finished steps are filled in, so it reads as one journey.

### 44. People don’t realize there’s more to swipe

```js
{ n:44, slug:'false-floor', title:'People don\u2019t realize there\u2019s more to swipe', theme:'space', status:'planned',
    tags:['Law of closure','False floor'], problems:['skim-past'], screens:['feeds'],
    synonyms:'carousel swipe scroll horizontal peek more content hidden cut off edge illusion of completeness cards',
    phrases:['nobody swipes the carousel','people do not know there is more','users think the list ends','how do I show there is more to scroll','the extra cards get no views'] }
```

Bad UI: A carousel whose cards end flush with the screen edge, so it looks complete. Fix: The next card peeks in from the edge, hinting that there is more to swipe.

### 45. The spacing is all over the place

```js
{ n:45, slug:'spacing-system', title:'The spacing is all over the place', theme:'space', status:'planned',
    tags:['Spacing system'], problems:['cluttered'], screens:['settings'],
    synonyms:'spacing 8 point grid 8pt scale gaps padding margins inconsistent random uneven rhythm tokens system',
    phrases:['the spacing feels random','every gap is a different size','how do I pick spacing values','the layout feels uneven','what is an 8 point grid'] }
```

Bad UI: A settings screen with gaps of 7, 13, 22 and 9px, shown with pink guides. Fix: Every gap snaps to a scale of 8, 16 and 24px, and the rhythm evens out.

### 46. The sheet blends into the page behind it

```js
{ n:46, slug:'figure-ground', title:'The sheet blends into the page behind it', theme:'space', status:'planned',
    tags:['Figure-ground','Elevation'], problems:['hard-to-follow'], screens:['dialogs'],
    synonyms:'sheet modal bottom sheet layer shadow dim overlay background foreground depth elevation popup',
    phrases:['people do not notice the sheet opened','the popup blends into the page','users tap the page behind the sheet','how do I show a layer on top','the modal looks flat'] }
```

Bad UI: A flat white sheet slides up over a white screen with no shadow or dimming. Fix: The page behind dims and the sheet gets a soft shadow, so it clearly sits on top.

## Unit 8: Icons, images and polish

The visual details that make a screen clear and worth trusting.

### 47. Nobody knows what these icons mean

```js
{ n:47, slug:'icon-labels', title:'Nobody knows what these icons mean', theme:'polish', status:'planned',
    tags:['Icon labels','Recognition over recall'], problems:['unclear-buttons'], screens:['navigation'],
    synonyms:'icons icon only labels toolbar mystery meat glyphs symbols ambiguous captions text labels',
    phrases:['people do not know what the icons do','users guess what each icon means','should icons have labels','the toolbar is confusing','nobody uses the icon buttons'] }
```

Bad UI: A toolbar of six icon-only buttons with no labels. Fix: The same icons with short text labels underneath.

### 48. The icons look like they’re from different apps

```js
{ n:48, slug:'icon-consistency', title:'The icons look like they\u2019re from different apps', theme:'polish', status:'planned',
    tags:['Visual consistency'], problems:['cluttered'], screens:['navigation'],
    synonyms:'icons icon set style outline filled stroke emoji mismatched inconsistent tab bar sf symbols',
    phrases:['the icons do not match','our icons look mismatched','some icons are filled and some are outlined','the app looks thrown together','should icons be outline or filled'] }
```

Bad UI: A tab bar mixing outline icons, filled icons and an emoji. Fix: One icon set at one stroke weight.

### 49. Which tab am I on?

```js
{ n:49, slug:'selected-state', title:'Which tab am I on?', theme:'polish', status:'planned',
    tags:['Selected state','Visibility of system status'], problems:['lost-in-nav'], screens:['navigation'],
    synonyms:'selected active current tab state highlight tab bar where am I indicator filled tint',
    phrases:['people do not know which tab is open','the current tab is not highlighted','users lose track of where they are','how do I show the selected tab','all the tabs look the same'] }
```

Bad UI: Five identical grey tabs, with nothing marking the current one. Fix: The current tab is filled and tinted with the accent color.

### 50. The photos are all different shapes

```js
{ n:50, slug:'aspect-ratio', title:'The photos are all different shapes', theme:'polish', status:'planned',
    tags:['Aspect ratio','Grid systems'], problems:['cluttered'], screens:['feeds'],
    synonyms:'images photos thumbnails crop cropping aspect ratio square grid gallery product tiles ragged uneven',
    phrases:['the product grid looks messy','the thumbnails are different sizes','how should I crop images','the gallery looks uneven','photos break the layout'] }
```

Bad UI: A product grid where each photo keeps its own shape, so rows are ragged. Fix: Every photo cropped to one ratio, so the grid lines up.

### 51. The detailed icon turns to mush when small

```js
{ n:51, slug:'pragnanz', title:'The detailed icon turns to mush when small', theme:'polish', status:'planned',
    tags:['Law of Prägnanz'], problems:['unclear-buttons'], screens:['navigation'],
    synonyms:'pragnanz simplicity simple icon detail small size blurry illustration shapes legible recognizable',
    phrases:['the icons are hard to recognize','the icon looks blurry when small','how detailed should an icon be','people cannot tell the icons apart','our illustrations do not read at small size'] }
```

Bad UI: Shortcut icons packed with tiny detail that blurs together at small size. Fix: Simple, bold shapes that read at a glance.

### 52. It works, but nobody trusts it

```js
{ n:52, slug:'aesthetic-usability', title:'It works, but nobody trusts it', theme:'polish', status:'planned',
    tags:['Aesthetic-usability effect'], problems:['dont-trust'], screens:['checkout'],
    synonyms:'polish polished pretty looks trust trustworthy professional sloppy rough corner radius shadows visual quality',
    phrases:['people do not trust our app','the app looks cheap','does visual design really matter','users think it is a scam','it works but looks unfinished'] }
```

Bad UI: A working payment screen with mixed corner radii, shadows and fonts. Fix: The same screen and the same flow, with consistent styling.

## Unit 9: Memory and attention

Designing for what people can hold in their heads and what they actually notice.

### 53. People have to memorize a code from another app

```js
{ n:53, slug:'working-memory', title:'People have to memorize a code from another app', theme:'memory', status:'planned',
    tags:['Working memory','Cognitive load'], problems:['forget-info'], screens:['sign-up'],
    synonyms:'verification code one time code otp sms text message 2fa autofill paste remember memorize switch apps',
    phrases:['people forget the code before they type it','users switch apps to get the code','the code boxes do not allow paste','how do I make verification easier','typing a code from a text is annoying'] }
```

Bad UI: Six separate code boxes that can’t be pasted into, so people flip to Messages and back. Fix: One code field that offers the code from Messages above the keyboard.

### 54. The confirmation code is impossible to read back

```js
{ n:54, slug:'chunking-codes', title:'The confirmation code is impossible to read back', theme:'memory', status:'planned',
    tags:['Chunking','Miller\u2019s law'], problems:['forget-info'], screens:['checkout'],
    synonyms:'confirmation code booking reference number long string read aloud groups spaces chunk 7 plus minus 2',
    phrases:['people misread the booking code','the reference number is hard to copy down','long codes are hard to read','how should I display a long number','customers read the code wrong on the phone'] }
```

Bad UI: A booking confirmation showing one unbroken ten-character code. Fix: The code broken into short groups with spaces; the tooltip notes how often 7±2 is misquoted.

### 55. People forget they never finished setting up

```js
{ n:55, slug:'zeigarnik', title:'People forget they never finished setting up', theme:'memory', status:'planned',
    tags:['Zeigarnik effect'], problems:['quit-midway'], screens:['onboarding','dashboards'],
    synonyms:'unfinished incomplete setup profile completion checklist progress reminder finish later open loop',
    phrases:['people never finish their profile','users skip setup and forget','how do I get people to complete setup','half the accounts are incomplete','nobody comes back to finish'] }
```

Bad UI: A half-finished profile with no trace of it on the home screen. Fix: A small “2 of 4 done” card on Home that opens the next step.

### 56. The change happened where nobody was looking

```js
{ n:56, slug:'change-blindness', title:'The change happened where nobody was looking', theme:'memory', status:'planned',
    tags:['Change blindness'], problems:['unsure-it-worked'], screens:['checkout'],
    synonyms:'add to cart bag badge count change notice confirmation toast feedback subtle unnoticed',
    phrases:['people do not notice the item was added','users tap add to cart twice','nothing seems to happen when I add','how do I show something changed','the cart count changes but nobody sees it'] }
```

Bad UI: Add to Bag only changes a tiny number in the corner, far from the button. Fix: The badge pops and a short confirmation appears right by the button.

### 57. The warning is right there, and people still miss it

```js
{ n:57, slug:'selective-attention', title:'The warning is right there, and people still miss it', theme:'memory', status:'planned',
    tags:['Selective attention'], problems:['skim-past'], screens:['checkout'],
    synonyms:'warning alert notice ignored missed attention banner top inline near action address checkout tunnel vision',
    phrases:['people miss the warning','users ignore the banner at the top','the important message gets overlooked','where should a warning go','people do not see the error until too late'] }
```

Bad UI: An address warning styled like a promo banner at the top of checkout. Fix: A short inline note right beside the Pay button, where attention already is.

### 58. Too much to compare at once

```js
{ n:58, slug:'compare-at-once', title:'Too much to compare at once', theme:'memory', status:'planned',
    tags:['Cognitive load','Recognition over recall'], problems:['slow-decisions'], screens:['pricing'],
    synonyms:'compare comparison plans pricing table side by side differences features paragraphs choose plan',
    phrases:['people cannot compare the plans','users keep scrolling back and forth','how do I show plan differences','the pricing page is confusing','it is hard to see what each plan includes'] }
```

Bad UI: Three plans described in separate paragraphs, one after another. Fix: A side-by-side table, with the rows that differ highlighted.

## Unit 10: Motivation and momentum

What keeps people going, and what makes them want to come back.

### 59. The ending leaves a flat taste

```js
{ n:59, slug:'peak-end', title:'The ending leaves a flat taste', theme:'motivation', status:'planned',
    tags:['Peak-end rule'], problems:['lose-motivation'], screens:['checkout'],
    synonyms:'order confirmation success screen receipt ending last impression delight thank you done finish',
    phrases:['the confirmation screen feels cold','people are unsure what happens next','how should a success screen look','the end of checkout is boring','users do not feel good after ordering'] }
```

Bad UI: A plain receipt that leads with “Order #4471” and a list of SKUs. Fix: A warm confirmation that leads with what people care about: when it arrives.

### 60. The rewards card starts at zero

```js
{ n:60, slug:'endowed-progress', title:'The rewards card starts at zero', theme:'motivation', status:'planned',
    tags:['Endowed progress effect','Goal-gradient effect'], problems:['lose-motivation'], screens:['dashboards'],
    synonyms:'loyalty rewards punch card stamps points progress head start motivation finish goal',
    phrases:['nobody finishes the rewards card','people give up on the loyalty program','how do I motivate repeat visits','progress starting at zero feels hopeless','the rewards feel too far away'] }
```

Bad UI: A coffee rewards card that starts at 0 of 10 stamps. Fix: A card that starts at 2 of 12, with two stamps already given.

### 61. One missed day wipes out the whole streak

```js
{ n:61, slug:'loss-aversion', title:'One missed day wipes out the whole streak', theme:'motivation', status:'planned',
    tags:['Loss aversion','Forgiveness'], problems:['lose-motivation'], screens:['dashboards'],
    synonyms:'streak streaks habit missed day reset zero freeze lost progress daily goal motivation quit',
    phrases:['people quit after losing their streak','one missed day resets everything','users feel punished','how do I keep people motivated after a break','the streak makes people anxious'] }
```

Bad UI: “Streak lost: 0 days” after a 41-day run. Fix: A streak freeze covers the missed day, and the 41 days stay.

### 62. The result shows up too fast to trust

```js
{ n:62, slug:'labor-illusion', title:'The result shows up too fast to trust', theme:'motivation', status:'planned',
    tags:['Labor illusion'], problems:['dont-trust'], screens:['search'],
    synonyms:'too fast instant results trust effort working searching progress loading flights search show the work',
    phrases:['people do not trust the instant result','users think the search did nothing','results appear too quickly','how do I show the app is working hard','the answer feels made up'] }
```

Bad UI: Flight results that appear instantly, with no sign of what was checked. Fix: A short step that shows the search at work (airlines checked, prices compared) before the results.

### 63. The app asks for everything before giving anything

```js
{ n:63, slug:'lazy-registration', title:'The app asks for everything before giving anything', theme:'motivation', status:'planned',
    tags:['Reciprocity','Lazy registration'], problems:['drop-onboarding'], screens:['sign-up','onboarding'],
    synonyms:'sign up wall login wall forced account registration browse first guest value first create account later',
    phrases:['people leave at the sign up screen','users have to create an account first','can people try the app before signing up','the login wall kills downloads','we ask for too much up front'] }
```

Bad UI: A sign-up wall on first launch, before people have seen anything. Fix: People browse freely, and are asked to sign up only when they save something.

### 64. The big ask comes out of nowhere

```js
{ n:64, slug:'foot-in-the-door', title:'The big ask comes out of nowhere', theme:'motivation', status:'planned',
    tags:['Foot-in-the-door technique'], problems:['feel-tricked'], screens:['dialogs'],
    synonyms:'review request rating prompt big ask small ask survey feedback write a review timing commitment',
    phrases:['nobody writes a review','the review prompt annoys people','when should I ask for a rating','people dismiss our survey','the ask feels too big'] }
```

Bad UI: A request to write a full review on day one. Fix: A one-tap rating after a success, with the written review as an optional next step.

## Unit 11: Expectations and mental models

Working with what people already expect, and taking on the complexity for them.

### 65. Swiping does the opposite of what people expect

```js
{ n:65, slug:'mental-models', title:'Swiping does the opposite of what people expect', theme:'expectations', status:'planned',
    tags:['Jakob\u2019s law','Mental models'], problems:['accidental-delete'], screens:['feeds'],
    synonyms:'swipe swipe actions gestures left right delete archive mail convention expectations platform',
    phrases:['people delete things when they meant to archive','the swipe does the wrong thing','users expect it to work like other apps','which direction should swipe delete','our gestures are backwards'] }
```

Bad UI: A mail list where swiping left archives and swiping right deletes. Fix: Swipe actions that match iOS Mail.

### 66. The app makes people do its math

```js
{ n:66, slug:'teslers-law', title:'The app makes people do its math', theme:'expectations', status:'planned',
    tags:['Tesler\u2019s law'], problems:['form-errors'], screens:['forms'],
    synonyms:'complexity calculation math split bill share divide automatic conservation of complexity work for the user',
    phrases:['people get the math wrong','users have to calculate it themselves','why does the app not do this for me','splitting the bill is a pain','the form asks people to work things out'] }
```

Bad UI: A split-the-bill screen where people work out and type in each share. Fix: The app divides the total, and people adjust a share only if they need to.

### 67. The form rejects how people naturally type

```js
{ n:67, slug:'postels-law', title:'The form rejects how people naturally type', theme:'expectations', status:'planned',
    tags:['Postel\u2019s law'], problems:['form-errors'], screens:['forms'],
    synonyms:'phone number format formatting parentheses dashes spaces strict validation rejected input flexible liberal',
    phrases:['the form rejects my phone number','people get errors for spaces and dashes','why is the format so strict','users do not know what format to use','the field is too picky'] }
```

Bad UI: A phone field that rejects “(916) 555-0142” and demands digits only. Fix: The field accepts any common format and tidies it up itself.

### 68. Two ways to do the same thing, and they differ

```js
{ n:68, slug:'occams-razor', title:'Two ways to do the same thing, and they differ', theme:'expectations', status:'planned',
    tags:['Occam\u2019s razor'], problems:['unclear-buttons'], screens:['dialogs'],
    synonyms:'duplicate redundant share menu toolbar long press options simplify one way multiple paths',
    phrases:['there are too many ways to share','the two share buttons do different things','people are unsure which option to use','should there be one way to do this','our menus repeat each other'] }
```

Bad UI: Share in the toolbar, in a menu and on long-press, each with a different set of options. Fix: One Share, the same everywhere it appears.

### 69. The tools people use daily are buried with the rest

```js
{ n:69, slug:'pareto-principle', title:'The tools people use daily are buried with the rest', theme:'expectations', status:'planned',
    tags:['Pareto principle'], problems:['too-many-options'], screens:['settings'],
    synonyms:'80 20 rule pareto most used features tools toolbar editor prioritize frequent rare buried',
    phrases:['people cannot find the tools they use most','every tool gets the same space','how do I prioritize features','the editor is overwhelming','most people only use two tools'] }
```

Bad UI: A photo editor with 12 equal tool buttons. Fix: Crop and Adjust up front, with the rest under More.

### 70. Regulars repeat the same 9 taps every week

```js
{ n:70, slug:'shortcuts', title:'Regulars repeat the same 9 taps every week', theme:'expectations', status:'planned',
    tags:['Flexibility and efficiency of use'], problems:['feels-slow'], screens:['checkout'],
    synonyms:'shortcut shortcuts accelerator reorder repeat order power users frequent regulars quick action',
    phrases:['regular customers redo the same order every week','power users want a faster way','how do I add shortcuts','reordering takes too many taps','returning users are slowed down'] }
```

Bad UI: Rebuilding last week’s grocery order one item at a time. Fix: A one-tap Reorder for a past order, with the full flow still there.

## Unit 12: Speed and motion

How fast an app feels, and motion that explains instead of decorates.

### 71. The screen jumps while people are reading

```js
{ n:71, slug:'layout-shift', title:'The screen jumps while people are reading', theme:'speed', status:'planned',
    tags:['Layout stability','Fitts\u2019s law'], problems:['wrong-taps'], screens:['feeds'],
    synonyms:'layout shift jump jumping content moves loading banner ad push down misclick cls reserve space',
    phrases:['the page jumps as it loads','people tap the wrong thing when it moves','content shifts while I read','how do I stop the layout jumping','a banner pushes everything down'] }
```

Bad UI: A late-loading banner pushes the list down just as the mock taps a row, so it opens the wrong one. Fix: The banner’s space is held from the start, so nothing moves.

### 72. A spinner for every load

```js
{ n:72, slug:'skeleton-screens', title:'A spinner for every load', theme:'speed', status:'planned',
    tags:['Skeleton screens','Perceived performance'], problems:['feels-slow'], screens:['feeds'],
    synonyms:'spinner loading skeleton placeholder shimmer blank screen wait perceived speed load state',
    phrases:['the app always shows a spinner','loading feels slow','what should show while content loads','the blank screen while loading looks broken','people stare at a spinner'] }
```

Bad UI: A centered spinner on an empty feed every time it loads. Fix: Grey placeholder shapes in the layout of the feed, filled in as content arrives.

### 73. Things just pop in and vanish

```js
{ n:73, slug:'purposeful-motion', title:'Things just pop in and vanish', theme:'speed', status:'planned',
    tags:['Purposeful motion','Common fate'], problems:['hard-to-follow'], screens:['feeds'],
    synonyms:'animation motion transition delete remove list jump pop vanish slide continuity',
    phrases:['the list jumps when I delete something','people lose track of what changed','should I animate changes','items vanish without warning','the screen changes too suddenly'] }
```

Bad UI: A deleted row disappears instantly, and the rows below jump up. Fix: The row collapses and the rows below slide up together.

### 74. The animation is slow and showy

```js
{ n:74, slug:'motion-duration', title:'The animation is slow and showy', theme:'speed', status:'planned',
    tags:['Doherty threshold','Motion duration'], problems:['feels-slow'], screens:['dialogs'],
    synonyms:'animation speed duration slow bouncy spring ease timing milliseconds transition sheet',
    phrases:['the animations feel slow','people wait for the transition to finish','how long should an animation be','our sheet bounces too much','the motion gets in the way'] }
```

Bad UI: A sheet that takes nearly a second to bounce into place. Fix: A quick, smooth slide that finishes in about a quarter of a second.

### 75. The wait has no end in sight

```js
{ n:75, slug:'progress-indicators', title:'The wait has no end in sight', theme:'speed', status:'planned',
    tags:['Visibility of system status','Progress indicators'], problems:['feels-slow'], screens:['feeds'],
    synonyms:'upload progress bar percentage time left determinate indeterminate spinner waiting long task',
    phrases:['people do not know how long the upload will take','the spinner goes on forever','users cancel long uploads','should I use a progress bar or spinner','how do I show time remaining'] }
```

Bad UI: A video upload that shows a spinner for 30 seconds. Fix: A progress bar with the time left.

### 76. The motion makes some people dizzy

```js
{ n:76, slug:'reduced-motion', title:'The motion makes some people dizzy', theme:'speed', status:'planned',
    tags:['Animation from interactions (WCAG 2.3.3)'], problems:['excluded'], screens:['settings'],
    synonyms:'reduce motion reduced motion vestibular dizzy nausea parallax zoom animation accessibility a11y crossfade',
    phrases:['the animations make people feel sick','how do I support reduce motion','some users turn off animations','is parallax bad for accessibility','the zoom transitions are too much'] }
```

Bad UI: Zooming, parallax screen transitions that play even with Reduce Motion turned on. Fix: A simple crossfade when Reduce Motion is on.

## Unit 13: Navigation and wayfinding

Helping people know where they are, where they can go and how to get back.

### 77. People don’t know where they are

```js
{ n:77, slug:'wayfinding', title:'People don\u2019t know where they are', theme:'wayfinding', status:'planned',
    tags:['Wayfinding'], problems:['lost-in-nav'], screens:['navigation','settings'],
    synonyms:'where am I page title back button label breadcrumb context deep navigation lost location',
    phrases:['people get lost deep in the app','every screen is titled details','users do not know where back goes','how do I show where people are','the titles are too vague'] }
```

Bad UI: Three screens deep, every title says “Details” and every back button says “Back”. Fix: Specific titles and back labels that name the screen people came from.

### 78. Going back loses everything

```js
{ n:78, slug:'state-preservation', title:'Going back loses everything', theme:'wayfinding', status:'planned',
    tags:['User control and freedom','State preservation'], problems:['lost-in-nav'], screens:['search','navigation'],
    synonyms:'back button filters reset scroll position lost state preserve remember list detail return',
    phrases:['my filters reset when I go back','the list jumps to the top after going back','people lose their place','how do I keep scroll position','going back starts everything over'] }
```

Bad UI: Back from a product resets the filters and scrolls the list to the top. Fix: The list comes back exactly as people left it.

### 79. The main features hide behind a hamburger

```js
{ n:79, slug:'discoverability', title:'The main features hide behind a hamburger', theme:'wayfinding', status:'planned',
    tags:['Discoverability'], problems:['lost-in-nav'], screens:['navigation'],
    synonyms:'hamburger menu side menu drawer hidden navigation tab bar discoverable out of sight',
    phrases:['nobody opens the menu','people do not find the main features','should I use a hamburger menu','features are hidden in the drawer','users do not know what the app can do'] }
```

Bad UI: A hamburger menu hiding the app’s four main areas. Fix: A tab bar that shows all four.

### 80. The menu labels don’t say what’s behind them

```js
{ n:80, slug:'information-scent', title:'The menu labels don\u2019t say what\u2019s behind them', theme:'wayfinding', status:'planned',
    tags:['Information scent'], problems:['lost-in-nav'], screens:['navigation'],
    synonyms:'menu labels vague names navigation words clear labels guess click wrong section',
    phrases:['people open the wrong section','the menu names are vague','users guess where things are','how should I name menu items','nobody knows what resources means'] }
```

Bad UI: A menu with “Resources”, “Solutions” and “Hub”. Fix: Labels that say what’s inside: “Help articles”, “Pricing”, “Your files”.

### 81. One long settings list with no groups

```js
{ n:81, slug:'grouping-settings', title:'One long settings list with no groups', theme:'wayfinding', status:'planned',
    tags:['Information architecture','Common region'], problems:['too-many-options'], screens:['settings'],
    synonyms:'settings list long flat groups sections headers categories organize card sorting',
    phrases:['the settings list is too long','people cannot find a setting','how should I group settings','everything is in one list','users scroll forever to find options'] }
```

Bad UI: Eighteen settings in one flat list. Fix: Five labeled sections, each in its own group.

### 82. People dig five levels deep to change one thing

```js
{ n:82, slug:'breadth-vs-depth', title:'People dig five levels deep to change one thing', theme:'wayfinding', status:'planned',
    tags:['Breadth vs. depth'], problems:['lost-in-nav'], screens:['settings','navigation'],
    synonyms:'deep navigation levels nested menus drill down flat hierarchy taps buried settings',
    phrases:['the setting is buried too deep','people give up digging through menus','how many levels should navigation have','too many taps to change one thing','our menus are nested too deep'] }
```

Bad UI: Settings, then Account, Privacy, Sharing, Photos and finally Location. Fix: The same choice two levels down.

## Unit 14: Search, lists and data

Finding things, comparing them and making numbers make sense.

### 83. One typo and search finds nothing

```js
{ n:83, slug:'error-tolerance', title:'One typo and search finds nothing', theme:'data', status:'planned',
    tags:['Error tolerance','Empty states'], problems:['cant-find'], screens:['search'],
    synonyms:'search typo misspelling no results zero results fuzzy did you mean spelling correction',
    phrases:['search shows no results for a typo','people misspell and get nothing','how should search handle typos','our no results page is a dead end','users give up on search'] }
```

Bad UI: A search for “sneekers” that returns “0 results”. Fix: Results for “sneakers”, with a note saying what was searched.

### 84. People open every result to compare them

```js
{ n:84, slug:'information-foraging', title:'People open every result to compare them', theme:'data', status:'planned',
    tags:['Information foraging'], problems:['slow-decisions'], screens:['search'],
    synonyms:'results list cards compare price rating distance details pogo sticking hotel listing summary',
    phrases:['people open every result','users go back and forth between results','what should a result card show','comparing results takes forever','the price is only on the detail page'] }
```

Bad UI: A hotel list showing names and photos, with prices only inside each one. Fix: Price, rating and distance on every card.

### 85. The chart needs a legend to decode

```js
{ n:85, slug:'direct-labeling', title:'The chart needs a legend to decode', theme:'data', status:'planned',
    tags:['Direct labeling'], problems:['numbers-unclear'], screens:['data'],
    synonyms:'chart graph legend labels line chart colors series data visualization dataviz',
    phrases:['people cannot read the chart','users match colors to the legend','how should I label a chart','the legend is confusing','which line is which'] }
```

Bad UI: A four-line chart with a color legend underneath. Fix: Each line labeled at its end, and no legend.

### 86. The table is a wall of lines and numbers

```js
{ n:86, slug:'data-ink', title:'The table is a wall of lines and numbers', theme:'data', status:'planned',
    tags:['Data-ink ratio'], problems:['numbers-unclear'], screens:['data'],
    synonyms:'table grid gridlines borders numbers data dense spreadsheet clean minimal right align',
    phrases:['the table is hard to read','there are too many lines in the table','how should I design a data table','the numbers are hard to scan','our table looks like a spreadsheet'] }
```

Bad UI: A table with heavy gridlines on every cell and centered numbers. Fix: Light row rules only, with numbers right-aligned.

### 87. The big number means nothing on its own

```js
{ n:87, slug:'data-context', title:'The big number means nothing on its own', theme:'data', status:'planned',
    tags:['Comparison and context'], problems:['numbers-unclear'], screens:['dashboards'],
    synonyms:'metric number stat context goal comparison yesterday trend kpi dashboard steps fitness',
    phrases:['people do not know if the number is good','the stat has no context','how do I make a metric meaningful','users ignore the dashboard numbers','is this number high or low'] }
```

Bad UI: A fitness screen showing “8,412 steps” and nothing else. Fix: “8,412 of 10,000”, plus how it compares with yesterday.

### 88. Endless scroll and no way back to that one thing

```js
{ n:88, slug:'infinite-scroll', title:'Endless scroll and no way back to that one thing', theme:'data', status:'planned',
    tags:['Wayfinding','Infinite scroll'], problems:['cant-find'], screens:['feeds','search'],
    synonyms:'infinite scroll endless list pagination history find again group by month search older items',
    phrases:['people cannot find an old order','the list never ends','should I use infinite scroll','users scroll forever to find something','there is no way to jump back'] }
```

Bad UI: Order history as one endless list. Fix: Orders grouped by month, with a search field at the top.

## Unit 15: Permissions, notifications and setup

Asking for access and attention at the right moment, and getting people started.

### 89. The app asks for every permission on launch

```js
{ n:89, slug:'permission-priming', title:'The app asks for every permission on launch', theme:'permissions', status:'planned',
    tags:['Permission priming','Just-in-time learning'], problems:['tune-out-alerts'], screens:['notifications','onboarding'],
    synonyms:'permissions camera location contacts prompt allow deny launch ask context explain priming',
    phrases:['people deny every permission','users say no to the camera','when should I ask for permissions','too many prompts on first launch','how do I get people to allow access'] }
```

Bad UI: Location, camera and contacts prompts in a row on first launch. Fix: Camera access asked for when people tap Scan, with one line on why.

### 90. People can’t see what they’re typing

```js
{ n:90, slug:'show-password', title:'People can\u2019t see what they\u2019re typing', theme:'permissions', status:'planned',
    tags:['Error prevention','Form design'], problems:['form-errors'], screens:['sign-up'],
    synonyms:'password show password hide mask confirm password typo retype sign up login visibility toggle',
    phrases:['people mistype their password','confirm password annoys users','should I add a show password button','users get locked out after sign up','typing a hidden password is hard'] }
```

Bad UI: A hidden password typed twice in “Password” and “Confirm password”. Fix: One password field with a Show button.

### 91. Every notification sounds urgent

```js
{ n:91, slug:'alert-fatigue', title:'Every notification sounds urgent', theme:'permissions', status:'planned',
    tags:['Alert fatigue','Signal-to-noise ratio'], problems:['tune-out-alerts'], screens:['notifications'],
    synonyms:'notifications push alerts urgent marketing spam important ignored turned off priority',
    phrases:['people turn off our notifications','users ignore every alert','promos look like warnings','how many notifications is too many','the important alert gets ignored'] }
```

Bad UI: Sale notifications styled exactly like a fraud alert. Fix: Only real alerts look urgent; promos are quiet.

### 92. Notifications are all or nothing

```js
{ n:92, slug:'granular-control', title:'Notifications are all or nothing', theme:'permissions', status:'planned',
    tags:['Granular control','User control and freedom'], problems:['tune-out-alerts'], screens:['notifications','settings'],
    synonyms:'notification settings categories switch toggle mute promos orders preferences opt out',
    phrases:['people turn off all notifications','users want to mute just promos','how should notification settings work','there is only one switch','people miss order updates after muting'] }
```

Bad UI: One switch for every notification the app sends. Fix: Categories, so people can mute promos and keep order updates.

### 93. Setup asks questions people can’t answer yet

```js
{ n:93, slug:'defer-setup', title:'Setup asks questions people can\u2019t answer yet', theme:'permissions', status:'planned',
    tags:['Smart defaults','Paradox of the active user'], problems:['drop-onboarding'], screens:['onboarding'],
    synonyms:'onboarding questions setup quiz preferences goals units defaults later skip configure',
    phrases:['people drop off during setup questions','users do not know what to answer','should onboarding ask questions','setup takes too long','how do I shorten onboarding'] }
```

Bad UI: Six onboarding questions about goals, units and targets before the app opens. Fix: The app opens with sensible defaults, adjustable later.

### 94. Nothing to try until you build it yourself

```js
{ n:94, slug:'templates', title:'Nothing to try until you build it yourself', theme:'permissions', status:'planned',
    tags:['Blank page problem','Templates'], problems:['drop-onboarding'], screens:['onboarding'],
    synonyms:'templates starter examples sample blank page start from scratch empty budget first use',
    phrases:['people do not know where to start','starting from scratch is daunting','should I offer templates','new users stare at an empty screen','nobody creates their first one'] }
```

Bad UI: An empty budget with one button: “Create category”. Fix: Three starter templates to pick from, plus a blank option.

## Unit 16: Real-world states

Designing for offline moments, long names, big text and other languages.

### 95. Offline, and the app just spins

```js
{ n:95, slug:'offline-states', title:'Offline, and the app just spins', theme:'edge-cases', status:'planned',
    tags:['Offline states','Visibility of system status'], problems:['unsure-it-worked'], screens:['feeds','errors'],
    synonyms:'offline no connection no internet spinner queue send later retry network airplane mode',
    phrases:['the app spins forever with no signal','people do not know if it sent','what should happen offline','users lose messages when offline','the app does not say it is offline'] }
```

Bad UI: Send spins forever while the phone is offline. Fix: The message is queued, with a note that it will send when the phone is back online.

### 96. Real names break the layout

```js
{ n:96, slug:'real-content', title:'Real names break the layout', theme:'edge-cases', status:'planned',
    tags:['Design for real content'], problems:['looks-broken'], screens:['settings'],
    synonyms:'long names real data edge cases overflow wrap lorem ipsum placeholder content layout breaks',
    phrases:['long names break the layout','the design only works with short text','text overflows the card','how do I design for real content','the layout breaks with real data'] }
```

Bad UI: A profile designed for “Jane Doe” that overflows with a long hyphenated name. Fix: The header wraps the name cleanly onto two lines.

### 97. Bigger text breaks the screen

```js
{ n:97, slug:'dynamic-type', title:'Bigger text breaks the screen', theme:'edge-cases', status:'planned',
    tags:['Resize text (WCAG 1.4.4)','Dynamic Type'], problems:['excluded'], screens:['checkout','settings'],
    synonyms:'dynamic type text size larger text accessibility a11y zoom font scaling cut off truncated buttons',
    phrases:['the layout breaks with large text','buttons get cut off at bigger font sizes','how do I support dynamic type','people with large text cannot use the app','text overlaps when enlarged'] }
```

Bad UI: At a large text size, buttons cut off their labels and overlap. Fix: The layout reflows and stacks, so everything still fits.

### 98. “1 items” and “0 new messages”

```js
{ n:98, slug:'zero-one-many', title:'“1 items” and “0 new messages”', theme:'edge-cases', status:'planned',
    tags:['Edge states','Microcopy'], problems:['confusing-words'], screens:['feeds'],
    synonyms:'plural pluralization 1 items zero none empty count copy wording edge case grammar',
    phrases:['the app says 1 items','we show 0 new messages','how do I handle plurals','the counts read awkwardly','copy breaks at zero'] }
```

Bad UI: Copy written only for “many”: “1 items in your bag”, “0 new messages”. Fix: Wording for zero, one and many, and nothing at all when there’s nothing new.

### 99. Timestamps people have to do math on

```js
{ n:99, slug:'human-readable-time', title:'Timestamps people have to do math on', theme:'edge-cases', status:'planned',
    tags:['Human-readable formats','Match between system and the real world'], problems:['numbers-unclear'], screens:['feeds'],
    synonyms:'timestamp date time format relative ago utc iso readable minutes hours',
    phrases:['the dates are hard to read','people do not understand the timestamp','should I show relative time','users convert time zones in their head','how should I format dates'] }
```

Bad UI: Messages stamped “2026-10-24T13:02Z”. Fix: “2 min ago”, switching to a plain date once a message is older.

### 100. The button breaks in another language

```js
{ n:100, slug:'text-expansion', title:'The button breaks in another language', theme:'edge-cases', status:'planned',
    tags:['Internationalization','Text expansion'], problems:['looks-broken'], screens:['checkout'],
    synonyms:'localization translation german longer text i18n l10n button width cropped language',
    phrases:['translated text does not fit','the German labels get cut off','how do I design for translation','buttons break in other languages','text gets longer when translated'] }
```

Bad UI: German labels cropped inside fixed-width buttons. Fix: Buttons that size to their labels, wrapping when they need to.

## Unit 17: Writing for interfaces

The words on the screen: clear, plain and consistent.

### 101. The error message blames the person

```js
{ n:101, slug:'error-messages', title:'The error message blames the person', theme:'writing', status:'planned',
    tags:['Error messages','Voice and tone'], problems:['confusing-words'], screens:['forms','errors'],
    synonyms:'error message wording invalid illegal blame tone voice how to fix helpful copy',
    phrases:['our error messages sound rude','people do not know how to fix the error','what should an error message say','the error blames the user','invalid input means nothing'] }
```

Bad UI: “Invalid input. Illegal value entered.” Fix: A plain message that says what went wrong and how to fix it.

### 102. Five links all say “Learn more”

```js
{ n:102, slug:'link-purpose', title:'Five links all say “Learn more”', theme:'writing', status:'planned',
    tags:['Link purpose (WCAG 2.4.4)','Descriptive labels'], problems:['unclear-buttons'], screens:['settings'],
    synonyms:'learn more click here read more link text vague generic accessibility screen reader descriptive',
    phrases:['every link says learn more','people do not know where links go','what should link text say','screen readers read the same link five times','click here is vague'] }
```

Bad UI: A help screen with five links that all read “Learn more”. Fix: Each link says where it goes.

### 103. The setting uses a double negative

```js
{ n:103, slug:'plain-language', title:'The setting uses a double negative', theme:'writing', status:'planned',
    tags:['Plain language'], problems:['confusing-words'], screens:['settings'],
    synonyms:'double negative wording toggle setting confusing disable enable plain language clear copy',
    phrases:['people turn the setting the wrong way','the toggle wording is confusing','what does disable off mean','users misread the setting','how do I word a toggle'] }
```

Bad UI: A switch labeled “Don’t disable auto-lock”, set to Off. Fix: “Auto-Lock”, set to On.

### 104. The most important word comes last

```js
{ n:104, slug:'front-loading', title:'The most important word comes last', theme:'writing', status:'planned',
    tags:['Front-loading','Inverted pyramid'], problems:['skim-past'], screens:['notifications'],
    synonyms:'front load headline notification first words important first wording preview skim',
    phrases:['people miss the important part of the message','the notification buries the point','what should come first in a message','users skim past alerts','the key word is at the end'] }
```

Bad UI: A notification that starts “Due to scheduled maintenance…” and ends with “your payment failed”. Fix: “Payment failed: $40” first, the reason after.

### 105. Internal jargon on the screen

```js
{ n:105, slug:'internal-jargon', title:'Internal jargon on the screen', theme:'writing', status:'planned',
    tags:['Match between system and the real world'], problems:['confusing-words'], screens:['checkout'],
    synonyms:'jargon internal terms technical words status order tracking plain language customer words sku',
    phrases:['customers do not understand the status','the app uses our internal words','what does fulfillment pending mean','support gets questions about the wording','the status messages are too technical'] }
```

Bad UI: An order status that reads “Fulfillment pending: SKU allocation”. Fix: “Packing your order”.

### 106. Cart, bag and basket on three screens

```js
{ n:106, slug:'consistent-terminology', title:'Cart, bag and basket on three screens', theme:'writing', status:'planned',
    tags:['Consistent terminology','Consistency and standards'], problems:['confusing-words'], screens:['checkout'],
    synonyms:'terminology words naming inconsistent cart bag basket remove delete discard glossary copy',
    phrases:['we call the same thing different names','people think cart and bag are different','how do I keep wording consistent','remove and delete mean different things','our copy is inconsistent'] }
```

Bad UI: One shopping flow that says cart, bag and basket, plus Remove, Delete and Discard. Fix: One word for each thing, everywhere.

## Unit 18: Accessibility beyond color

Making screens work with screen readers, captions, time limits and gestures.

### 107. The screen reader says “button, button, button”

```js
{ n:107, slug:'accessible-names', title:'The screen reader says “button, button, button”', theme:'access', status:'planned',
    tags:['Name, role, value (WCAG 4.1.2)'], problems:['excluded'], screens:['feeds'],
    synonyms:'screen reader voiceover talkback accessibility label aria label icon button blind a11y unlabeled',
    phrases:['voiceover just says button','icon buttons have no labels','how do I label buttons for screen readers','blind users cannot use our app','what is an accessible name'] }
```

Bad UI: Icon-only actions that VoiceOver reads as “button”. Fix: Each one reads its action: “Like”, “Share”, “More”.

### 108. The focus jumps around the screen

```js
{ n:108, slug:'focus-order', title:'The focus jumps around the screen', theme:'access', status:'planned',
    tags:['Focus order (WCAG 2.4.3)'], problems:['excluded'], screens:['forms'],
    synonyms:'focus order reading order tab order voiceover keyboard navigation accessibility a11y jumps',
    phrases:['the screen reader jumps around','the focus order is wrong','how should focus move through a form','keyboard users get lost','voiceover reads things out of order'] }
```

Bad UI: The VoiceOver focus ring zigzags across a form. Fix: Focus follows the reading order, top to bottom.

### 109. The photo says nothing without sight

```js
{ n:109, slug:'alt-text', title:'The photo says nothing without sight', theme:'access', status:'planned',
    tags:['Non-text content (WCAG 1.1.1)'], problems:['excluded'], screens:['checkout'],
    synonyms:'alt text image description screen reader voiceover accessibility a11y photo blind product image',
    phrases:['our images have no alt text','the screen reader reads the file name','what should alt text say','blind users miss the product photos','how do I describe an image'] }
```

Bad UI: A product photo that VoiceOver reads as “IMG_4471.jpg”. Fix: A short description of what the photo shows.

### 110. The video has no captions

```js
{ n:110, slug:'captions', title:'The video has no captions', theme:'access', status:'planned',
    tags:['Captions (WCAG 1.2.2)'], problems:['excluded'], screens:['feeds'],
    synonyms:'captions subtitles video audio deaf hard of hearing muted autoplay accessibility a11y',
    phrases:['people watch videos on mute','our videos have no captions','deaf users miss the video','should videos have subtitles','autoplay videos make no sense without sound'] }
```

Bad UI: A muted autoplay video of someone talking, with no captions. Fix: Captions on by default.

### 111. The timer runs out before people finish

```js
{ n:111, slug:'adjustable-timing', title:'The timer runs out before people finish', theme:'access', status:'planned',
    tags:['Timing adjustable (WCAG 2.2.1)'], problems:['excluded'], screens:['checkout'],
    synonyms:'timer timeout countdown session expired time limit checkout tickets extend more time accessibility',
    phrases:['the checkout timed out','people run out of time','how long should a time limit be','users get kicked out mid purchase','can people get more time'] }
```

Bad UI: A ticket checkout that drops people when its 2-minute timer runs out. Fix: A warning before time runs out, with a button to add more time.

### 112. Swiping is the only way to do it

```js
{ n:112, slug:'gesture-alternatives', title:'Swiping is the only way to do it', theme:'access', status:'planned',
    tags:['Pointer gestures (WCAG 2.5.1)','Signifiers'], problems:['excluded'], screens:['feeds'],
    synonyms:'swipe gesture only hidden alternative button edit delete accessibility motor a11y discoverability',
    phrases:['people do not know you can swipe','the only way to delete is a swipe','do gestures need a button too','some users cannot swipe','hidden gestures confuse people'] }
```

Bad UI: A list where swiping is the only way to delete. Fix: An Edit button that does the same thing.

## Unit 19: Persuasion done right

Behavioral science that helps people decide, without pushing them.

### 113. People can’t tell if anyone else uses this

```js
{ n:113, slug:'social-proof', title:'People can\u2019t tell if anyone else uses this', theme:'persuasion', status:'planned',
    tags:['Social proof'], problems:['dont-trust'], screens:['checkout'],
    synonyms:'reviews ratings stars social proof trust testimonials how many people popular product page',
    phrases:['people hesitate to buy','nobody trusts a product with no reviews','where should ratings go','users want to know others bought it','how do I build trust on a product page'] }
```

Bad UI: A product page with nothing to show anyone else has bought or liked it. Fix: Its real star rating and review count, beside the price.

### 114. The yearly price looks scary

```js
{ n:114, slug:'framing', title:'The yearly price looks scary', theme:'persuasion', status:'planned',
    tags:['Framing effect','Anchoring'], problems:['slow-decisions'], screens:['pricing'],
    synonyms:'pricing annual yearly monthly price framing per month save discount subscription plan anchor',
    phrases:['nobody picks the yearly plan','the annual price scares people','how should I show yearly pricing','people do not see the savings','monthly or yearly price display'] }
```

Bad UI: A yearly plan shown only as “$119.99”, beside a monthly plan at “$9.99/mo”. Fix: “$10/mo, billed yearly”, with the savings stated.

### 115. Three plans and none stands out

```js
{ n:115, slug:'choice-architecture', title:'Three plans and none stands out', theme:'persuasion', status:'planned',
    tags:['Choice architecture','Von Restorff effect'], problems:['slow-decisions'], screens:['pricing'],
    synonyms:'plans pricing tiers recommended most popular highlight choose plan cards decision',
    phrases:['people cannot decide between plans','all the plans look the same','should I highlight a plan','users pick the cheapest by default','how do I guide plan choice'] }
```

Bad UI: Three identical plan cards side by side. Fix: The plan most people pick is marked and raised slightly.

### 116. The upgrade pitch comes at the worst moment

```js
{ n:116, slug:'contextual-timing', title:'The upgrade pitch comes at the worst moment', theme:'persuasion', status:'planned',
    tags:['Contextual timing','Peak-end rule'], problems:['feel-tricked'], screens:['pricing','errors'],
    synonyms:'upgrade paywall upsell timing moment pitch premium after error success offer',
    phrases:['the paywall appears at the worst time','people hate our upgrade prompt','when should I show an upgrade','users feel pushed to pay','the upsell interrupts people'] }
```

Bad UI: An upgrade paywall that appears right after an error. Fix: The offer appears after a success, when the app has just proved its worth.

### 117. People don’t care about a playlist they didn’t make

```js
{ n:117, slug:'ikea-effect', title:'People don\u2019t care about a playlist they didn\u2019t make', theme:'persuasion', status:'planned',
    tags:['IKEA effect'], problems:['lose-motivation'], screens:['onboarding'],
    synonyms:'personalize customize ownership generated playlist pick choose effort invest ikea',
    phrases:['people ignore the generated playlist','users do not feel ownership','should people customize first','nobody returns to the recommendations','how do I get people invested'] }
```

Bad UI: A playlist generated entirely by the app. Fix: People pick three artists first, then the app builds the playlist around them.

### 118. People set a goal and forget it

```js
{ n:118, slug:'commitment', title:'People set a goal and forget it', theme:'persuasion', status:'planned',
    tags:['Commitment and consistency','Goal-gradient effect'], problems:['lose-motivation'], screens:['dashboards'],
    synonyms:'goal savings commitment reason date first step habit forget abandon motivation',
    phrases:['people set goals and never return','savings goals get abandoned','how do I help people stick to goals','users forget their goal','goals feel like just a number'] }
```

Bad UI: A savings goal that is just a number. Fix: A goal with a reason, a date and a first deposit.

## Unit 20: Dark patterns to avoid

Tricks that win a click and lose trust, and the honest version of each.

### 119. Cancelling takes six screens

```js
{ n:119, slug:'roach-motel', title:'Cancelling takes six screens', theme:'dark-patterns', status:'planned',
    tags:['Roach motel'], problems:['feel-tricked'], screens:['settings'],
    synonyms:'cancel subscription hard to cancel obstruction unsubscribe retention flow dark pattern click to cancel',
    phrases:['it is impossible to cancel','people complain about cancelling','how many steps should cancelling take','users feel trapped','cancel flow is too long'] }
```

Bad UI: A six-screen cancel flow full of offers and “Are you sure?” steps. Fix: One screen to cancel, as easy as signing up.

### 120. Something was added to the order without asking

```js
{ n:120, slug:'sneak-into-basket', title:'Something was added to the order without asking', theme:'dark-patterns', status:'planned',
    tags:['Sneak into basket'], problems:['feel-tricked'], screens:['checkout'],
    synonyms:'pre checked preselected add on insurance protection plan extra charge opt out dark pattern',
    phrases:['an extra was added to my order','people pay for things they did not choose','is a pre checked add on ok','customers ask for refunds on add ons','users feel tricked at checkout'] }
```

Bad UI: A $4.99 protection plan checked by default at checkout. Fix: The plan offered as an unchecked option.

### 121. The real price appears at the last step

```js
{ n:121, slug:'hidden-costs', title:'The real price appears at the last step', theme:'dark-patterns', status:'planned',
    tags:['Hidden costs','Drip pricing'], problems:['feel-tricked'], screens:['checkout','pricing'],
    synonyms:'fees service fee hidden fees drip pricing total price surprise checkout tickets all in price',
    phrases:['the price jumps at checkout','people abandon when fees appear','should I show the total up front','users feel misled by fees','surprise charges at the end'] }
```

Bad UI: Tickets listed at $45 that become $63.80 at the final step. Fix: The all-in price from the first screen.

### 122. The countdown resets every visit

```js
{ n:122, slug:'false-urgency', title:'The countdown resets every visit', theme:'dark-patterns', status:'planned',
    tags:['False urgency'], problems:['feel-tricked'], screens:['checkout'],
    synonyms:'countdown timer fake urgency scarcity only 2 left limited time pressure dark pattern',
    phrases:['the timer is fake','people feel rushed to buy','is a countdown timer ok','users notice the sale never ends','fake scarcity damages trust'] }
```

Bad UI: “Offer ends in 09:59”, starting again on every visit. Fix: No fake timer; a real end date, or none at all.

### 123. The checkbox wording is a trick

```js
{ n:123, slug:'trick-questions', title:'The checkbox wording is a trick', theme:'dark-patterns', status:'planned',
    tags:['Trick questions'], problems:['feel-tricked'], screens:['sign-up'],
    synonyms:'checkbox wording opt in opt out confusing marketing emails consent double negative dark pattern',
    phrases:['people get emails they did not want','the opt out checkbox is confusing','users cannot tell what the checkbox means','how should consent checkboxes be worded','unchecking subscribes people'] }
```

Bad UI: A sign-up checkbox worded so that leaving it alone signs people up for marketing. Fix: A plain “Send me deals” box, unchecked.

### 124. The ad looks like a real result

```js
{ n:124, slug:'disguised-ads', title:'The ad looks like a real result', theme:'dark-patterns', status:'planned',
    tags:['Disguised ads'], problems:['feel-tricked'], screens:['search'],
    synonyms:'ads sponsored promoted advertisement search results native ads labeled disguised dark pattern',
    phrases:['people click ads by mistake','sponsored results look organic','how should ads be labeled','users feel tricked by promoted items','the first result is an ad'] }
```

Bad UI: A sponsored product styled exactly like the first search result. Fix: The same product clearly labeled “Sponsored”.
