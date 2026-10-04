import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => <p className="text-muted">ページが見つかりません。</p>,
    defaultErrorComponent: ({ error }) => (
      <p className="text-ari">
        エラーが発生しました: {error instanceof Error ? error.message : String(error)}
      </p>
    ),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
