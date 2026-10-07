import { createFileRoute } from '@tanstack/react-router'
import { listCelebrities } from '#/server/celebrity'
import { seo } from '#/shared/seo'

// 登録済みの著名人を確認するためのページ。トップページからの導線はなく、検索エンジンにも載せない
export const Route = createFileRoute('/celebrities')({
  loader: () => listCelebrities(),
  head: () => seo({ title: '著名人リスト', path: '/celebrities', noindex: true }),
  component: CelebritiesPage,
})

function CelebritiesPage() {
  const celebrities = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">
        著名人リスト{' '}
        <span className="text-base font-bold text-muted">（{celebrities.length}人）</span>
      </h1>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {celebrities.map((c) => (
          <li key={c.id} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
            <div className="aspect-square bg-night">
              {c.imageUrl ? (
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-dim">
                  画像なし
                </div>
              )}
            </div>
            <div className="space-y-1 px-3 py-2">
              <p className="font-bold">{c.name}</p>
              {c.profile && <p className="text-sm text-muted">{c.profile}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
