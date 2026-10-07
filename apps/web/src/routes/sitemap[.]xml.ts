import { createFileRoute } from '@tanstack/react-router'
import * as quiz from '@jameen/api/quiz'
import { getDb } from '#/server/db'

// 検索結果に出したいトップとクイズのページだけを載せる。ランキング・著名人リストは noindex なので載せない
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const quizzes = await quiz.listQuizzes(getDb())
        const urls = ['/', ...quizzes.map((q) => `/quiz/${q.id}`)]
        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map((path) => `  <url><loc>${origin}${path}</loc></url>`),
          '</urlset>',
          '',
        ].join('\n')
        return new Response(body, {
          headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
