import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/theme/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider storageKey="app-theme">
      <Toaster position="top-right" expand={true} richColors closeButton />
      {/* Adjust the basename as needed */}
      <BrowserRouter basename={'/'}>{children}</BrowserRouter>
    </ThemeProvider>
  )
}
