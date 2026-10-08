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
{ n:12, slug:'alignment', title:'The layout looks messy and I can’t say why', theme:'hierarchy', status:'draft', frame:'Profile',
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
{ n:13, slug:'consistency', title:'The same kind of control works differently on one screen', theme:'hierarchy', status:'planned',
  tags:['Consistency and standards','Jakob’s law'],
  problems:['unclear-buttons'], screens:['dialogs'],
  synonyms:'consistent patterns standards design system mixed controls',
  phrases:['every screen does it differently','people are not sure how to turn this on','we use toggles and checkboxes for the same thing','users expect it to work like other apps','why is Save in a different place here'] }
```

Bad UI: a filter sheet that mixes switches, checkboxes and segmented controls for the same yes/no choices, with both Apply and Done buttons. Fix: one control type, one button.

### 14. People close the popup without reading it

```js
{ n:14, slug:'interruptions', title:'People close the popup without reading it', theme:'hierarchy', status:'planned',
  tags:['Banner blindness','Habituation'],
  problems:['skim-past'], screens:['feeds'],
  synonyms:'modal popup pop-up interstitial banner blindness annoying',
  phrases:['nobody reads our announcement','people tap X straight away','users ignore the banner','our popups are annoying people','how do I tell people about a new feature'] }
```

Bad UI: a feed that opens with a stack of modals (rate us, notifications, new feature) that people dismiss on reflex, missing the one that matters. Fix: one small inline note, shown where the new feature lives.

### 15. People can't tell if it worked

```js
{ n:15, slug:'system-status', title:'People can’t tell if it worked', theme:'feedback', status:'planned',
  tags:['Visibility of system status','Feedback'],
  problems:['unsure-it-worked'], screens:['checkout'],
  synonyms:'loading spinner progress feedback waiting slow saved save sent submitted know whether confirmation',
  phrases:['people tap the button twice','did my order go through','users get duplicate orders','nothing happens when I tap pay','how do I show something is loading'] }
```

Bad UI: a Place order button that does nothing visible for three seconds, so people tap it again. Fix: the button shows progress, then a clear confirmation.

### 16. One wrong tap and it's gone

```js
{ n:16, slug:'undo', title:'One wrong tap and it’s gone', theme:'feedback', status:'planned',
  tags:['User control and freedom','Forgiveness','Habituation'],
  problems:['accidental-delete'], screens:['feeds'],
  synonyms:'confirm confirmation dialog undo delete remove are you sure',
  phrases:['people delete things by accident','users click yes without reading','are you sure dialogs do not work','how do I let people undo','I lost something I did not mean to delete'] }
```

Bad UI: an inbox that asks "Are you sure?" on every delete, which people confirm without reading. Fix: delete straight away and show an Undo toast.

### 17. People only find out what's wrong after they submit

```js
{ n:17, slug:'inline-errors', title:'People only find out what’s wrong after they submit', theme:'feedback', status:'planned',
  tags:['Inline validation','Error recovery'],
  problems:['form-errors'], screens:['sign-up'],
  synonyms:'validation error message invalid',
  phrases:['users get an error after filling everything in','people cannot tell which field is wrong','the error message is at the top','the form clears when there is a mistake','where should error messages go'] }
```

Bad UI: a sign-up form that shows one red banner at the top after submitting and clears the password. Fix: a short message under the field as soon as people leave it, with nothing cleared.

### 18. The form lets people type things it will reject

```js
{ n:18, slug:'error-prevention', title:'The form lets people type things it will reject', theme:'feedback', status:'planned',
  tags:['Error prevention','Constraints','Poka-yoke'],
  problems:['form-errors'], screens:['checkout'],
  synonyms:'constraint picker format input mask mistakes',
  phrases:['people enter the date in the wrong format','users keep getting invalid input','how do I stop typos in forms','card details get rejected','the wrong keyboard shows up'] }
```

Bad UI: a card form with free-text expiry and number fields that reject "July 27" or spaces only after submit. Fix: numeric keypad, input masks and an expiry picker that can't produce a wrong value.

### 19. Delete sits right next to Save

```js
{ n:19, slug:'destructive-actions', title:'Delete sits right next to Save', theme:'feedback', status:'planned',
  tags:['Error prevention','Fitts’s law'],
  problems:['wrong-taps'], screens:['settings'],
  synonyms:'delete remove danger red irreversible delete account',
  phrases:['people hit delete by mistake','the dangerous button looks like the safe one','users deleted their account by accident','where should the delete button go','how do I make a destructive action safer'] }
```

Same primary principle as lesson 18, with a different bad UI: an account settings screen with Delete account styled like Save and placed beside it, instead of a card form. Fix: Delete moved away, styled as destructive, and confirmed by typing the account name.

### 20. The app feels slow even when it isn't

```js
{ n:20, slug:'optimistic-ui', title:'The app feels slow even when it isn’t', theme:'feedback', status:'planned',
  tags:['Optimistic UI','Doherty threshold','Perceived performance'],
  problems:['unsure-it-worked'], screens:['feeds'],
  synonyms:'latency instant responsive feels slow saved save sent liked',
  phrases:['the like button lags','people say the app is slow','there is a spinner on every tap','how do I make the app feel faster','users tap again because nothing happened'] }
```

Bad UI: a feed where tapping the heart shows a spinner for a second before it fills. Fix: the heart fills instantly and quietly rolls back if the request fails.

### 21. An error stops people with no way forward

```js
{ n:21, slug:'dead-ends', title:'An error stops people with no way forward', theme:'feedback', status:'planned',
  tags:['Error recovery','Information scent'],
  problems:['quit-midway'], screens:['errors','checkout'],
  synonyms:'404 not found error page broken link something went wrong dead end',
  phrases:['people give up when they hit an error','something went wrong and then nothing','the error page has no way back','users lose their cart after an error','what should an error page say'] }
```

Bad UI: a payment error that says "Something went wrong" with only an OK button that drops people on the home screen, cart gone. Fix: says what happened, keeps the cart, and offers Try again or Use another card.

### 22. The buttons are too small to hit

```js
{ n:22, slug:'fitts-law', title:'The buttons are too small to hit', theme:'interaction', status:'planned',
  tags:['Fitts’s law','Touch target size'],
  problems:['wrong-taps'], screens:['checkout'],
  synonyms:'tap target touch target small buttons size distance',
  phrases:['people keep missing the button','I tap the wrong one on my phone','the plus and minus are tiny','how big should a button be','fat finger mistakes'] }
```

Bad UI: a cart with tiny + and − buttons and a small × right next to them. Fix: 44pt targets with space between them.

### 23. I can't reach the button with one hand

```js
{ n:23, slug:'thumb-zone', title:'I can’t reach the button with one hand', theme:'interaction', status:'planned',
  tags:['Thumb zone','Fitts’s law'],
  problems:['miss-main-action'], screens:['navigation'],
  synonyms:'reach one handed mobile bottom top',
  phrases:['the main button is at the top of the screen','hard to use with one hand','people stretch to reach the button','where should buttons go on mobile','big phones make this awkward'] }
```

Bad UI: a compose screen with Post in the top-right corner. Fix: Post as a full-width button above the keyboard. Different from lesson 22: the button is big enough but out of reach.

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
