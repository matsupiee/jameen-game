import { createFileRoute, Link } from '@tanstack/react-router'
import { getRanking } from '#/server/quiz'
import { seo } from '#/shared/seo'

export const Route = createFileRoute('/ranking/$quizId')({
  loader: ({ params }) => getRanking({ data: { quizId: Number(params.quizId) } }),
  // ニックネームが並ぶだけのページなので検索結果には出さない。シェアされたときの OGP は付ける
  head: ({ loaderData, params }) =>
    seo({
      title: loaderData ? `${loaderData.quiz.title} ランキング` : 'ランキング',
      path: `/ranking/${params.quizId}`,
      noindex: true,
    }),
  component: RankingPage,
})

function RankingPage() {
  const { quiz, ranking } = Route.useLoaderData()

  return (
    <div className="space-y-6 pb-24">
      <header className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center border-b border-line py-2">
        <Link
          to="/"
          aria-label="クイズ一覧に戻る"
          className="-ml-2 flex size-10 items-center justify-center rounded-full text-ink no-underline hover:bg-surface"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="truncate text-center text-lg font-black">ランキング</h1>
      </header>

      <h2 className="text-2xl font-black">{quiz.title}</h2>

      {ranking.length === 0 ? (
        <p className="text-muted">まだ記録がありません。最初の挑戦者になろう！</p>
      ) : (
        <ol className="space-y-2">
          {ranking.map((r, i) => (
            <li
              key={r.id}
              className="flex items-center gap-4 rounded-2xl bg-surface px-4 py-3 ring-1 ring-line"
            >
              <span className="w-8 text-center text-lg font-black text-muted">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate font-bold">{r.playerName}</span>
              <span className="text-xl font-black">{r.score}</span>
            </li>
          ))}
        </ol>
      )}

      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-night pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <Link
            to="/quiz/$quizId"
            params={{ quizId: String(quiz.id) }}
            className="block rounded-xl bg-crimson px-5 py-3 text-center font-bold text-ink no-underline"
          >
            挑戦する
          </Link>
        </div>
      </footer>
    </div>
  )
}
