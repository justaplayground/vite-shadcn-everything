import { useRoutes } from 'react-router-dom'
import { ROUTES } from './routes'

// function flattenPages(pages: DataRouteObject[]): any[] {
//   return pages.reduce((flatten, page) => {
//     if (page.element) flatten.push({ path: page.path, element: page.element })
//     if (page.children) {
//     }
//     return flatten
//   }, [])
// }

export function AppRouter() {
  const element = useRoutes(
    ROUTES.map(({ layout, pages }) => {
      return {
        element: layout,
        children: pages,
      }
    })
  )

  return element
}
