import { Route, Routes } from 'react-router-dom'
import { ContextProviders } from '@/contexts/ContextProviders'

// inject pages
import Home from '@/pages/home'
import Scanner from '@/pages/demo/scanner'

export default function App() {
  return (
    <ContextProviders>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        {/* Add more Route here */}
      </Routes>
    </ContextProviders>
  )
}
