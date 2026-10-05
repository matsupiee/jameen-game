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
        <h1 className="text-2xl font-black">善悪を見抜け！</h1>
        <p className="text-ink/80">
          ジャミーンに芸能人の写真を見せて、その人が善人・犯罪者・不祥事を起こしたが犯罪ではない人のどれかを当てよう。
        </p>
      </section>

      <section className="space-y-3">
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
                    <p className="mt-1 text-xs text-dim">
                      {q.questionCount}問 ・ {q.playCount}回プレイ
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      to="/quiz/$quizId"
                      params={{ quizId: String(q.id) }}
                      className="rounded-xl bg-crimson px-4 py-2 text-sm font-bold text-ink no-underline"
                    >
                      挑戦
                    </Link>
                    <Link
                      to="/ranking/$quizId"
                      params={{ quizId: String(q.id) }}
                      aria-label="ランキング"
                      title="ランキング"
                      className="flex size-9 items-center justify-center rounded-xl text-white ring-1 ring-line no-underline"
                    >
                      <CrownIcon />
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

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M2.5 7.5l5 4.5L12 4l4.5 8 5-4.5L19.5 18h-15L2.5 7.5z" />
      <rect x="4.5" y="19" width="15" height="2" rx="1" />
    </svg>
  )
}
