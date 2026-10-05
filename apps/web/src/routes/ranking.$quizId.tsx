import { createFileRoute, Link } from '@tanstack/react-router'
import { getRanking } from '#/server/quiz'

export const Route = createFileRoute('/ranking/$quizId')({
  loader: ({ params }) => getRanking({ data: { quizId: Number(params.quizId) } }),
  component: RankingPage,
})

function RankingPage() {
  const { quiz, ranking } = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">ランキング</p>
        <h1 className="text-2xl font-black">{quiz.title}</h1>
      </div>

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

      <Link
        to="/quiz/$quizId"
        params={{ quizId: String(quiz.id) }}
        className="inline-block rounded-xl bg-crimson px-5 py-3 font-bold text-ink no-underline"
      >
        挑戦する
      </Link>
    </div>
  )
}
