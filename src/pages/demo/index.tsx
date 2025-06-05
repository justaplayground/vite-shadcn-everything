import { demoPages } from '@/constants'
import ezmove from '@/components/shared/animation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function DemoPage() {
  return (
    <main className="bg-muted flex flex-col items-center justify-start px-4 py-8 gap-8 flex-1">
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
