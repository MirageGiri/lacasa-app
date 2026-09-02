# LA CASA App

Healthy-habits education for families, rebuilt from the LA CASA Glide prototype.
Web app first, wrapped for the iOS and Android stores with Capacitor when you're
ready — one codebase either way.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

It runs with **no backend and no account**: progress, goals and quiz results
save to the device. That's deliberate, so you can hand a phone to the hospital
team today.

```bash
npm run build        # production build into dist/
npm run preview      # serve that build locally
```

## Turn on sync (Supabase)

1. Create a Supabase project.
2. Run `supabase/migrations/0001_init.sql` in the SQL editor.
3. Copy `.env.example` to `.env` and fill in both values.

Row-level security is on for every table: a family can only ever read and
write its own rows, and `profiles.role` separates `family` from `staff`/`admin`
— the distinction the prototype's empty Role column never made.

## Ship to the app stores

```bash
npm run build
npx cap add ios          # needs macOS + Xcode
npx cap add android      # needs Android Studio
npx cap sync
npx cap open ios
```

Nothing in `src/` changes. The pieces already in place for this:

- `base: './'` in `vite.config.ts` so assets resolve from a `file://` origin
- `HashRouter` so deep links and reloads work inside the native shell
- `env(safe-area-inset-*)` padding for the notch and home indicator
- a service worker, so the curriculum works offline
- `capacitor.config.ts` pointing at `dist/`

## Structure

```
src/content/     the curriculum — 7 modules, 29 lessons, quizzes, goals
                 every string carries { en, es }
src/i18n/        language context + interface strings
src/state/       progress, goals, quiz results
src/lib/         supabase client, storage, chat provider interface
src/screens/     Home, ModuleDetail, ItemDetail, Quiz, Goals, Ask, Profile
supabase/        SQL migration with row-level security
```

## Content status

The 34 Glide rows became 29 lessons — three sets of duplicate cards
(two "Sugary Drinks", two "How to Understand Food Labels", four "How Much Water
Do We Need?") were merged, since identically-titled cards read as a bug.

Seven lessons are marked `needsSourceCopy: true` in `src/content/items.ts`.
Those are the cards whose Glide text was truncated or still placeholder — they
show a "Content coming soon" badge in the app so nothing looks finished when it
isn't. Search that flag to find them.

**Every Spanish string is a draft awaiting clinical review.** While
`SHOW_DRAFT_BADGES` is true in `src/components/ui.tsx`, Spanish lessons carry a
visible reviewer badge. Set it to `false` for the family-facing release.

## The chat assistant

`src/lib/chatProvider.ts` defines the interface the Ask screen talks to. Today
it resolves to the staff answer queue. To add the Copilot/Azure OpenAI
assistant, implement the provider against a Supabase edge function — the model
key and the system prompt stay server-side, never in the client. The file
carries the sketch and the guardrails the prompt needs.
