import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { demoPages } from '@/routes'
import { Menu } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 bg-background shadow-md flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-primary">Demonee</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="sm:ml-4">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[280px] sm:w-[320px] p-6">
            <div className="flex flex-col gap-6 h-full">
              <div>
                <h2 className="text-lg font-semibold text-primary">Demonee</h2>
                <p className="text-sm text-muted-foreground">Explore the demo pages</p>
              </div>
              <Separator />
              <nav className="flex flex-col gap-2 overflow-auto">
                {demoPages.map((page) => (
                  <Link
                    to={page.path}
                    key={page.path}
                    className="w-full px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                  >
                    {page.name}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="mt-auto text-xs text-muted-foreground">
                Built with React + Vite + Shadcn
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="px-8 py-4 flex justify-center items-center border-t">
        <p className="text-sm">
          © Powered by{' '}
          <Link to="#" className="font-bold text-primary">
            Giang, N.T.
          </Link>
        </p>
      </footer>
    </div>
  )
}
