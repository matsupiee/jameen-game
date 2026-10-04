import { createFileRoute, Link } from '@tanstack/react-router'
import { listQuizzes } from '#/server/quiz'

export const Route = createFileRoute('/')({
  loader: () => listQuizzes(),
  component: Home,
})

function Home() {
  const quizzes = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-black">この人、善人？ それとも…</h1>
        <p className="text-ink/80">
          ジャミーンに芸能人の写真を見せて、その人が
          <span className="font-bold text-nashi">善人</span>・
          <span className="font-bold text-ari">犯罪者</span>・
          <span className="font-bold text-fusho">不祥事を起こしたが犯罪ではない人</span>
          のどれかを当てよう。回答するとすぐに正解が分かります。10問中、何問正解できるか競おう。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">クイズを選ぶ</h2>
        {quizzes.length === 0 && (
          <p className="text-muted">
            クイズがまだありません。<code>bun run db:seed:local</code> でサンプルを投入できます。
          </p>
        )}
        <ul className="space-y-3">
          {quizzes.map((q) => (
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
                  className="rounded-xl bg-gold px-4 py-2 text-sm font-bold text-night no-underline"
                >
                  挑戦
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
