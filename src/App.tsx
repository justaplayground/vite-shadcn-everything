import { Route, Routes } from 'react-router-dom'
import { ContextProviders } from '@/contexts/ContextProviders'

// inject pages
import MaintenancePage from '@/pages/system/maintanance'
import NotFoundPage from '@/pages/system/not-found'
import HomePage from '@/pages/home'
import ScannerPage from '@/pages/demo/scanner'
import DefaultLayout from './layouts/default'
import BlankLayout from './layouts/blank'

export default function App() {
  return (
    <ContextProviders>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/demo" element={<BlankLayout />}>
          <Route path="scanner" element={<ScannerPage />} />
        </Route>
      </Routes>
    </ContextProviders>
  )
}
