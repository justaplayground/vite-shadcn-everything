import type { RouteObject } from 'react-router-dom'
import type { JSX } from 'react'
import DefaultLayout from '@/layouts/default'
import BlankLayout from '@/layouts/blank'

import HomePage from '@/pages/home'
import MaintenancePage from '@/pages/system/maintanance'
import NotFoundPage from '@/pages/system/not-found'
import DemoPage from '@/pages/demo'
import QRScanPage from '@/pages/demo/code-scanner'
import CodeGeneratePage from '@/pages/demo/code-generator'

type RouteGroup = {
  layout: JSX.Element
  pages: RouteObject[]
}

export const ROUTES: RouteGroup[] = [
  {
    layout: <DefaultLayout />,
    pages: [
      { id: 'home', path: '/', element: <HomePage /> },
      { id: 'maintenance', path: '/maintenance', element: <MaintenancePage /> },
      { id: 'not-found', path: '/not-found', element: <NotFoundPage /> },
    ],
  },
  {
    layout: <BlankLayout />,
    pages: [
      {
        id: 'demo',
        path: '/demo',
        // element: <DemoPage />,
        children: [
          { id: 'demo-list', path: '', element: <DemoPage /> },
          { id: 'qr-scan', path: 'code-scanner', element: <QRScanPage /> },
          { id: 'qr-generate', path: 'code-generator', element: <CodeGeneratePage /> },
          // { id: 'demo-not-found', path: '*', element: <NotFoundPage /> },
          // { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]
