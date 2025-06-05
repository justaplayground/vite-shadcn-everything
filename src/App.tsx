import { ContextProviders } from '@/contexts/ContextProviders'
import { AppRouter } from './router/app-router'

export default function App() {
  return (
    <ContextProviders>
      <AppRouter />
    </ContextProviders>
  )
}
