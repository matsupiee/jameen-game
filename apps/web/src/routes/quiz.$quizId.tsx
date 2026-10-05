import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { QuizPlayer, type AnswerRecord } from '#/components/QuizPlayer'
import { CATEGORY_LABEL, CATEGORY_SHORT } from '#/shared/category'
import { getQuiz, submitScore } from '#/server/quiz'

const NAME_KEY = 'jameen-game:player-name'

export const Route = createFileRoute('/quiz/$quizId')({
  loader: ({ params }) => getQuiz({ data: { quizId: Number(params.quizId) } }),
  component: QuizPage,
})

function QuizPage() {
  const quiz = Route.useLoaderData()
  const [records, setRecords] = useState<AnswerRecord[] | null>(null)
  // 「もう一度」でプレイヤーを作り直すためのキー
  const [round, setRound] = useState(0)

  const finish = (r: AnswerRecord[]) => {
    setRecords(r)
    window.scrollTo({ top: 0 })
  }

  const retry = () => {
    setRecords(null)
    setRound((r) => r + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">{quiz.title}</h1>
        {quiz.description && <p className="text-muted">{quiz.description}</p>}
      </div>

      {records ? (
        <Result quizId={quiz.id} celebrities={quiz.celebrities} records={records} onRetry={retry} />
      ) : (
        <QuizPlayer key={round} quizId={quiz.id} celebrities={quiz.celebrities} onFinish={finish} />
      )}
    </div>
  )
}

function Result({
  quizId,
  celebrities,
  records,
  onRetry,
}: {
  quizId: number
  celebrities: { id: number; name: string }[]
  records: AnswerRecord[]
  onRetry: () => void
}) {
  const navigate = useNavigate()
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem(NAME_KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const score = records.filter((r) => r.correct).length
  const nameById = new Map(celebrities.map((c) => [c.id, c.name]))

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveError(null)
    try {
      await submitScore({
        data: {
          quizId,
          playerName,
          answers: records.map((r) => ({ celebrityId: r.celebrityId, answer: r.answer })),
        },
      })
      try {
        localStorage.setItem(NAME_KEY, playerName.trim())
      } catch {
        // 保存できなくても登録自体は成功しているので無視する
      }
      await navigate({ to: '/ranking/$quizId', params: { quizId: String(quizId) } })
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '登録に失敗しました')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-surface p-6 text-center ring-1 ring-line">
        <p className="text-muted">結果</p>
        <p className="text-gold text-6xl font-black">
          {score}
          <span className="text-2xl text-muted"> / {records.length}</span>
        </p>
      </div>

      <form onSubmit={register} className="flex gap-2">
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
          required
          placeholder="ニックネーム（20文字まで）"
          className="min-w-0 flex-1 rounded-xl bg-surface px-4 py-3 ring-1 ring-line outline-none focus:ring-sand"
        />
        <button
          type="submit"
          disabled={saving || playerName.trim() === ''}
          className="bg-crimson rounded-xl px-4 py-3 font-bold text-ink disabled:opacity-50"
        >
          ランキングに登録
        </button>
      </form>
      {saveError && <p className="text-ari">{saveError}</p>}

      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.celebrityId} className="rounded-2xl bg-surface p-4 ring-1 ring-line">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">{nameById.get(r.celebrityId)}</p>
              <p className={r.correct ? 'font-bold text-nashi' : 'font-bold text-ari'}>
                {r.correct ? '○ 正解' : '× 不正解'}
              </p>
            </div>
            <p className="text-sm text-muted">
              正解: {CATEGORY_LABEL[r.category]} / あなた: {CATEGORY_SHORT[r.answer]}
            </p>
            {r.scandalSummary && <p className="mt-2 text-sm text-ink/80">{r.scandalSummary}</p>}
            {r.sourceUrl && (
              <a
                href={r.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-sand underline"
              >
                出典
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 rounded-xl bg-surface py-3 font-bold text-ink ring-1 ring-line"
        >
          もう一度
        </button>
        <Link
          to="/ranking/$quizId"
          params={{ quizId: String(quizId) }}
          className="flex-1 rounded-xl bg-surface py-3 text-center font-bold text-ink no-underline ring-1 ring-line"
        >
          ランキングを見る
        </Link>
      </div>
    </div>
  )
}
