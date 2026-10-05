import { createFileRoute, Link } from '@tanstack/react-router'
import { GENRE_LABELS, GENRES } from '@jameen/db/genre'
import { listQuizzes } from '#/server/quiz'

export const Route = createFileRoute('/')({
  loader: () => listQuizzes(),
  component: Home,
})

function Home() {
  const quizzes = Route.useLoaderData()
  const groups = GENRES.map((genre) => ({
    genre,
    quizzes: quizzes.filter((q) => q.genre === genre),
  })).filter((g) => g.quizzes.length > 0)

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-black">この人、善人？ それとも…</h1>
        <p className="text-ink/80">
          ジャミーンに芸能人の写真を見せて、その人が善人・犯罪者・不祥事を起こしたが犯罪ではない人のどれかを当てよう。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">クイズを選ぶ</h2>
        {quizzes.length === 0 && (
          <p className="text-muted">
            クイズがまだありません。<code>bun run db:seed:local</code> でサンプルを投入できます。
          </p>
        )}
        {groups.map((g) => (
          <div key={g.genre} className="space-y-3">
            <h3 className="font-bold text-ink/80">{GENRE_LABELS[g.genre]}編</h3>
            <ul className="space-y-3">
              {g.quizzes.map((q) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-4 ring-1 ring-line"
                >
                  <div className="min-w-0">
                    <p className="truncate font-bold">{q.title}</p>
                    {q.description && <p className="text-sm text-muted">{q.description}</p>}
                    <p className="mt-1 text-xs text-dim">
                      {q.questionCount}問 ・ {q.playCount}回プレイ
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      to="/ranking/$quizId"
                      params={{ quizId: String(q.id) }}
                      className="rounded-xl px-3 py-2 text-sm text-ink/80 ring-1 ring-line no-underline"
                    >
                      ランキング
                    </Link>
                    <Link
                      to="/quiz/$quizId"
                      params={{ quizId: String(q.id) }}
                      className="rounded-xl bg-crimson px-4 py-2 text-sm font-bold text-ink no-underline"
                    >
                      挑戦
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
