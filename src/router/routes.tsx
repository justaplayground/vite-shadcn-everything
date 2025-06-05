import type { RouteObject } from 'react-router-dom'
import type { JSX } from 'react'
import DefaultLayout from '@/layouts/default'
import BlankLayout from '@/layouts/blank'

import HomePage from '@/pages/home'
import MaintenancePage from '@/pages/system/maintanance'
import NotFoundPage from '@/pages/system/not-found'
import DemoPage from '@/pages/demo'
import ScannerPage from '@/pages/demo/scanner'

type RouteGroup = {
  layout: JSX.Element
  pages: RouteObject[]
}

export const ROUTES: RouteGroup[] = [
  {
    layout: <BlankLayout />,
    pages: [
      {
        path: '/demo',
        element: <DemoPage />,
        children: [
          { id: 'demo-scanner', path: 'scanner', element: <ScannerPage /> },
          // { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    layout: <DefaultLayout />,
    pages: [
      { path: '/', element: <HomePage /> },
      { path: '/maintenance', element: <MaintenancePage /> },
      { path: '/not-found', element: <NotFoundPage /> },
    ],
  },
]
