import { Link, Outlet } from 'react-router-dom'

export default function BlankLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      {/* <footer className="px-8 py-4 flex justify-center items-center border-t">
        <p className="text-sm">
          © Powered by{' '}
          <Link to="#" className="font-bold text-primary">
            Giang, N.T.
          </Link>
        </p>
      </footer> */}
    </div>
  )
}
