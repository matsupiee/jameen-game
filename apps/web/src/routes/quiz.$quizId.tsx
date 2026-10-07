import { useEffect, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { QuizPlayer, type AnswerRecord } from '#/components/QuizPlayer'
import { ShareButtons } from '#/components/ShareButtons'
import { CATEGORY_LABEL, CATEGORY_SHORT } from '#/shared/category'
import { getQuiz, renameScore, submitScore } from '#/server/quiz'
import { generateRandomName } from '#/shared/random-name'
import { seo } from '#/shared/seo'

const NAME_KEY = 'jameen-game:player-name'

/** 保存済みのニックネームを返す。なければランダムに名前を作って保存し、次回以降も同じ名前を使う */
function loadPlayerName() {
  try {
    const saved = localStorage.getItem(NAME_KEY)
    if (saved) return saved
  } catch {
    // 読めなければ毎回ランダムな名前になるだけなので無視する
  }
  const name = generateRandomName()
  savePlayerName(name)
  return name
}

function savePlayerName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    // 保存できなくても登録自体は成功しているので無視する
  }
}

export const Route = createFileRoute('/quiz/$quizId')({
  loader: ({ params }) => getQuiz({ data: { quizId: Number(params.quizId) } }),
  head: ({ loaderData, params }) =>
    seo({
      title: loaderData?.title,
      description: loaderData
        ? `「${loaderData.title}」の${loaderData.celebrities.length}人は善人？犯罪者？不祥事あり？ジャミーンと一緒に見抜いて、何問当てられるか挑戦しよう。`
        : undefined,
      path: `/quiz/${params.quizId}`,
    }),
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
        <h1 className="truncate text-center text-lg font-black">{quiz.title}</h1>
      </header>

      {records ? (
        <Result quizId={quiz.id} quizTitle={quiz.title} celebrities={quiz.celebrities} records={records} onRetry={retry} />
      ) : (
        <QuizPlayer key={round} quizId={quiz.id} celebrities={quiz.celebrities} onFinish={finish} />
      )}
    </div>
  )
}

function Result({
  quizId,
  quizTitle,
  celebrities,
  records,
  onRetry,
}: {
  quizId: number
  quizTitle: string
  celebrities: { id: number; name: string }[]
  records: AnswerRecord[]
  onRetry: () => void
}) {
  // 自動登録したスコアのID。登録が終わるまでは null
  const [scoreId, setScoreId] = useState<number | null>(null)
  // ランキングに載っている名前と、入力欄の名前
  const [savedName, setSavedName] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  // StrictMode で effect が2回走っても、同じプレイを二重に登録しないようにする
  const submitted = useRef(false)

  const score = records.filter((r) => r.correct).length
  const nameById = new Map(celebrities.map((c) => [c.id, c.name]))

  // 結果画面を表示した時点でランキングに自動登録する
  useEffect(() => {
    if (submitted.current) return
    submitted.current = true
    const name = loadPlayerName()
    setPlayerName(name)
    submitScore({
      data: {
        quizId,
        playerName: name,
        answers: records.map((r) => ({ celebrityId: r.celebrityId, answer: r.answer })),
      },
    })
      .then((res) => {
        setScoreId(res.id)
        setSavedName(name)
      })
      .catch((err) => {
        setSaveError(err instanceof Error ? err.message : 'ランキングへの登録に失敗しました')
      })
  }, [quizId, records])

  const rename = async (e: React.FormEvent) => {
    e.preventDefault()
    if (scoreId === null) return
    setSaving(true)
    setSaveError(null)
    try {
      const row = await renameScore({ data: { scoreId, playerName } })
      setSavedName(row.playerName)
      setPlayerName(row.playerName)
      savePlayerName(row.playerName)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '名前の変更に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  const nameChanged = playerName.trim() !== '' && playerName.trim() !== savedName

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-surface p-6 text-center ring-1 ring-line">
        <p className="text-muted">結果</p>
        <p className="text-6xl font-black text-white">
          {score}
          <span className="text-2xl"> / {records.length}</span>
        </p>
      </div>

      <ShareButtons quizId={quizId} quizTitle={quizTitle} results={records.map((r) => r.correct)} />

      <div className="space-y-2">
        <p className="text-sm text-muted">
          {savedName !== null
            ? `「${savedName}」としてランキングに登録しました`
            : saveError
              ? 'ランキングに登録できませんでした'
              : 'ランキングに登録中…'}
        </p>
        <form onSubmit={rename} className="flex gap-2">
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
            required
            disabled={scoreId === null}
            aria-label="ニックネーム"
            placeholder="ニックネーム（20文字まで）"
            className="min-w-0 flex-1 rounded-xl bg-surface px-4 py-3 ring-1 ring-line outline-none focus:ring-sand disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={scoreId === null || saving || !nameChanged}
            className="bg-crimson rounded-xl px-4 py-3 font-bold text-ink disabled:opacity-50"
          >
            名前を変更
          </button>
        </form>
      </div>
      {saveError && <p className="text-ari">{saveError}</p>}

      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.celebrityId} className="rounded-2xl bg-surface p-4 ring-1 ring-line">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">{nameById.get(r.celebrityId)}</p>
              {r.correct ? (
                <CheckIcon className="size-6 shrink-0 text-white" label="正解" />
              ) : (
                <CrossIcon className="size-6 shrink-0 text-ari" label="不正解" />
              )}
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

function CheckIcon({ className, label }: { className?: string; label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
      className={className}
    >
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  )
}

function CrossIcon({ className, label }: { className?: string; label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      role="img"
      aria-label={label}
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
