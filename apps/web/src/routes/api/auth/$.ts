import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/server/auth'

// better-auth のエンドポイント（/api/auth/sign-in/anonymous、/api/auth/get-session など）
export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
})
