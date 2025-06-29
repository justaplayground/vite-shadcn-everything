import { demoPages } from '@/constants'
import ezmove from '@/components/shared/animation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className="bg-muted flex flex-col items-center justify-start px-4 py-8 gap-8 flex-1">
      <div className="w-full max-w-3xl">
        <ezmove.fade.up>
          <CardTitle className="text-3xl text-primary">Welcome to</CardTitle>
        </ezmove.fade.up>
        <ezmove.fade.up options={{ transition: { delay: 0.1 } }}>
          <CardTitle className="text-xl text-secondary">the Shadcn/UI Playground.</CardTitle>
        </ezmove.fade.up>
        <ezmove.fade.up options={{ transition: { delay: 0.2 } }}>
          <CardDescription className="mt-4 text-foreground">
            Explore interactive UI component demos and best practices.
          </CardDescription>
        </ezmove.fade.up>
      </div>

      {/* Introduction Section */}
      <ezmove.fade.up options={{ transition: { delay: 0.3 } }}>
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
      </ezmove.fade.up>

      {/* Hero Section */}
      <ezmove.fade.up options={{ transition: { delay: 0.4 } }}>
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col items-center gap-6 ">
            <p className="text-center text-muted-foreground">
              This application showcases real-world usage of Shadcn/UI components and other frontend
              packages.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {demoPages.map((page, i) => (
                <Button
                  key={page.name + i}
                  className="w-full"
                  onClick={() => (window.location.href = page.path)}
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </ezmove.fade.up>
    </main>
  )
}
