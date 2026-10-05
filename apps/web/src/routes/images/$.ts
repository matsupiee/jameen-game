import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

// R2 に保存した芸能人の画像を配信する。キーはダウンロード元 URL のハッシュで中身が変わらないので、
// 長期間キャッシュさせる（packages/db/seed/images.ts）
export const Route = createFileRoute('/images/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const object = await env.IMAGES.get(params._splat ?? '')
        if (!object) return new Response('Not Found', { status: 404 })
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('cache-control', 'public, max-age=31536000, immutable')
        return new Response(object.body, { headers })
      },
    },
  },
})
