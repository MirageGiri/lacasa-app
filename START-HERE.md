# Start here

```bash
cd lacasa-app
npm install      # first time only, a minute or two
npm run dev
```

Then open http://localhost:5173.

VS Code will offer four extension recommendations when you open the folder —
the Tailwind one is the useful one; it gives you class autocomplete.

Nothing else is needed. No account, no database, no API keys: progress, goals
and quiz results save to the browser. See README.md for turning on Supabase
sync and for building the iOS/Android apps.

## Where things are

| I want to change… | Open |
|---|---|
| The lesson text, English or Spanish | `src/content/items.ts` |
| Module names and colors | `src/content/modules.ts` |
| Quiz questions | `src/content/quizzes.ts` |
| The goals families can pick | `src/content/goals.ts` |
| Buttons, tabs, labels | `src/i18n/strings.ts` |
| Colors and type | `src/index.css` |
| A screen's layout | `src/screens/` |
