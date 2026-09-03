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
| The storybook stories | `src/content/stories.ts` |
| Storybook illustrations | `src/components/StoryArt.tsx` |
| Tab bar / icons | `src/components/icons.tsx` |
| The welcome + language screen | `src/screens/Welcome.tsx` |

## Seeing the welcome screen again

It only shows on first launch. To get it back, run this in the browser console
and reload:

```js
localStorage.removeItem('lacasa.welcomed')
```
