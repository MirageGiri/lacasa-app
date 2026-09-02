import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/screens/Home'
import ModuleDetail from '@/screens/ModuleDetail'
import ItemDetail from '@/screens/ItemDetail'
import Quiz from '@/screens/Quiz'
import Goals from '@/screens/Goals'
import Ask from '@/screens/Ask'
import Profile from '@/screens/Profile'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="module/:moduleId" element={<ModuleDetail />} />
        <Route path="module/:moduleId/item/:itemId" element={<ItemDetail />} />
        <Route path="module/:moduleId/quiz" element={<Quiz />} />
        <Route path="goals" element={<Goals />} />
        <Route path="ask" element={<Ask />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
