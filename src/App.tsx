import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/screens/Home'
import ModuleDetail from '@/screens/ModuleDetail'
import ItemDetail from '@/screens/ItemDetail'
import Quiz from '@/screens/Quiz'
import Goals from '@/screens/Goals'
import Ask from '@/screens/Ask'
import Profile from '@/screens/Profile'
import ModuleComplete from '@/screens/ModuleComplete'
import Storybook from '@/screens/Storybook'
import StoryReader from '@/screens/StoryReader'

export default function App() {
  return (
    <Routes>
      {/* The story reader sits outside Layout on purpose: reading mode has no
          tab bar and its own warm ground. */}
      <Route path="story/:storyId" element={<StoryReader />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="module/:moduleId" element={<ModuleDetail />} />
        <Route path="module/:moduleId/item/:itemId" element={<ItemDetail />} />
        <Route path="module/:moduleId/quiz" element={<Quiz />} />
        <Route path="module/:moduleId/done" element={<ModuleComplete />} />
        <Route path="stories" element={<Storybook />} />
        <Route path="goals" element={<Goals />} />
        <Route path="ask" element={<Ask />} />
        <Route path="profile" element={<Profile />} />
        {/* Anything unrecognised goes home rather than rendering a blank
            page — stale bookmarks and mistyped deep links are normal in an
            installed PWA, and a white screen offers no way out. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
