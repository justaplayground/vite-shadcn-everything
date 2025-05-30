import { Route, Routes } from 'react-router-dom'
import { ContextProviders } from '@/contexts/ContextProviders'

// inject pages
import Home from '@/pages/home'
import Maintenance from '@/pages/system/Maintanance'
import Scanner from '@/pages/demo/scanner'

export default function App() {
  return (
    <ContextProviders>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/demo">
          <Route path="scanner" element={<Scanner />} />
        </Route>
      </Routes>
    </ContextProviders>
  )
}
