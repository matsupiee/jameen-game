import { createFileRoute } from '@tanstack/react-router'

// noindex のページ（/celebrities など）はクロールを禁止しない。禁止すると noindex を読んでもらえず、URL だけ検索結果に残りうる
export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin
        const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${origin}/sitemap.xml`, ''].join(
          '\n',
        )
        return new Response(body, {
          headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
