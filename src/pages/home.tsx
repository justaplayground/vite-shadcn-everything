import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { demoPages } from '@/routes'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
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
      <main className="bg-muted flex flex-col items-center justify-start px-4 py-8 gap-8 flex-1">
        <div className="w-full max-w-3xl">
          <CardTitle className="text-3xl text-primary">Welcome to</CardTitle>
          <CardTitle className="text-xl text-secondary">the Shadcn/UI Playground.</CardTitle>
          <CardDescription className="mt-4 text-foreground">
            Explore interactive UI component demos and best practices.
          </CardDescription>
        </div>

        {/* Introduction Section */}
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-xl ">About This Project</CardTitle>
            <CardDescription className="italic">
              A React + Vite based sandbox for trying out UI ideas and implementation patterns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Welcome to <strong>My Playground</strong> — a collection of hands-on demonstrations
              using modern UI components. This project is built with <code>React</code> and{' '}
              <code>Vite</code>, and utilizes <code>shadcn/ui</code> for rapid interface
              prototyping.
            </p>
            <p>
              The goal is to explore various libraries and patterns, integrate them into real-world
              UI layouts, and provide examples that can be reused or extended for production-ready
              features.
            </p>
            <p>
              Navigate to the demo pages above to see how components behave and interact under
              different configurations.
            </p>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col items-center gap-6 ">
            <p className="text-center text-muted-foreground">
              This application showcases real-world usage of Shadcn/UI components and other frontend
              packages.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {demoPages.map((page) => (
                <Button
                  key={page.path}
                  className="w-full"
                  onClick={() => (window.location.href = page.path)}
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

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
