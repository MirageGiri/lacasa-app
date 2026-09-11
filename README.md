# LA CASA App

A bilingual health-education app for families, built for the LA CASA program at
UAMS. Seven modules on healthy eating, sugar, hydration and physical activity —
in Spanish and English, with progress tracking, goal setting and knowledge checks.

Rebuilt from a Glide prototype. It runs as a web app today and is set up to ship
to the iOS and Android app stores from the same codebase.

**Status: pre-release.** Not published to families. Some content is still
awaiting the LA CASA team — see [What still needs a human](#what-still-needs-a-human).

---

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

No account, no database, no API keys. Progress, goals and quiz results save to
the device, which is what makes it demoable on any phone straight away.

```bash
npm run build        # production build into dist/
npm run preview      # serve that build
```

## What's in it

| | |
|---|---|
| **7 modules, 29 lessons** | Healthy eating · ultra-processed foods · food servings · fruits and vegetables · sugar · hydration · physical activity |
| **Fully bilingual** | Every string carries `en` and `es`. Language is chosen on the welcome screen, before anything else, and can be switched from any screen. |
| **Progress** | Per-lesson, per-module and overall; "continue where you left off" |
| **Goals** | 15 goals drawn from the modules, with daily check-ins and streaks |
| **Quizzes** | 15 questions across the seven modules, with explanations |
| **Children's storybook** | A reading mode with read-aloud narration in both languages |
| **Ask** | An FAQ plus a question box, ready to become a staff answer queue |

## How it's built

React 19 + TypeScript + Vite, styled with Tailwind 4. A few decisions worth
knowing before you change things:

- **Content is code.** The curriculum lives in `src/content/` as typed data, not
  in a database. That keeps the app fully usable offline, and makes a content
  change a reviewable pull request rather than an untracked edit to a spreadsheet.
- **Bilingual by construction.** `{ en, es }` is baked into the content types, so
  a lesson without Spanish is a type error, not a silent gap.
- **Supabase is optional.** With no environment variables the app runs entirely
  on device storage. Set them and sign-in and cross-device sync turn on. The
  schema, with row-level security on every table, is in `supabase/migrations/`.
- **One design system.** Colors, type, radius and motion are tokens in
  `src/index.css`; the reasoning behind them is in
  `design-system/la-casa/MASTER.md`, generated with the
  [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill
  (installed at `.claude/skills/ui-ux-pro-max`) and reconciled with this app.
  Icons are SVG components in `src/components/icons.tsx` — no emoji as icons.
- **Store-ready.** Relative asset paths, hash routing, safe-area insets and a
  service worker are all in place so `npx cap add ios` works without touching
  `src/`.

```
src/content/     the curriculum — modules, lessons, quizzes, goals, stories
src/i18n/        language context and interface strings
src/state/       progress, goals, quiz results
src/lib/         supabase client, device storage, chat provider, speech
src/screens/     Welcome, Home, ModuleDetail, ItemDetail, Quiz, Goals,
                 Storybook, StoryReader, Ask, Profile
supabase/        SQL migration with row-level security
design-system/   design rules the UI follows (read MASTER.md before UI work)
```

`START-HERE.md` maps "I want to change X" to the file that does it.

## Turning on accounts and sync

1. Create a Supabase project.
2. Run `supabase/migrations/0001_init.sql` in its SQL editor.
3. Copy `.env.example` to `.env` and fill in both values.

`profiles.role` separates `family` from `staff` and `admin`; a family can only
ever read and write its own rows.

> **Before any pilot with real families:** decide whether anything users enter
> counts as PHI. If this is a research or clinical project, the Supabase account
> likely needs a BAA in place first. That is a question for UAMS, not a code change.

## What still needs a human

- **Two lessons have no real copy.** Flagged `needsSourceCopy: true` in
  `src/content/items.ts` and badged in the app: *Balanced Dish* (Module 3), which
  is placeholder text inherited from the prototype, and *Other types of sugar*
  (Module 5), which is one unfinished line.
- **All Spanish is an unreviewed draft.** While `SHOW_DRAFT_BADGES` is `true` in
  `src/components/ui.tsx`, Spanish lessons show a reviewer badge. Turn it off only
  once clinical staff have signed off.
- **Two lessons disagree on daily water amounts.** Module 5 gives men 15 cups a
  day, Module 6 gives 8. Both came from the prototype; they are probably total
  water versus drinking water, but the app doesn't say so. Needs a clinical
  decision, not a code fix.
- **No photography.** Lesson images from the prototype have not been carried
  over, and the storybook illustrations are SVG placeholders.
- **Modules 2, 3 and 7 have one lesson each.** Thin in the prototype, thin here.
- **Read-aloud uses the browser's speech synthesis.** It works offline in both
  languages today; recorded narration by a native speaker would be better and can
  replace it without touching the reader.

## Roadmap

Sign-in against Supabase · a staff view of cohort progress · replacing the Ask
queue with an assistant grounded in this curriculum (the provider interface for
that is already in `src/lib/chatProvider.ts`) · real story pages and audio.

## Credits

Built for the LA CASA program at the University of Arkansas for Medical Sciences.
Curriculum content is theirs; this repository is the application around it.
