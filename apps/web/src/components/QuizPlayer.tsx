import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CATEGORIES,
  CATEGORY_HINT,
  CATEGORY_LABEL,
  CATEGORY_SHORT,
  type Category,
} from '#/shared/category'
import { checkAnswer } from '#/server/quiz'
import { Jameen, type Expression } from './Jameen'

export type QuizCelebrity = {
  id: number
  name: string
  profile: string | null
  imageUrl: string | null
}

export type Reveal = Awaited<ReturnType<typeof checkAnswer>>

export type AnswerRecord = { celebrityId: number; answer: Category } & Reveal

// 正解カテゴリごとのジャミーンの表情
const EXPRESSION_BY_CATEGORY: Record<Category, Expression> = {
  good: 'smile',
  criminal: 'hide',
  scandal: 'uneasy',
}

const SPEECH: Record<Expression, string> = {
  idle: 'この人は…どんな人かな？',
  smile: 'わぁ、いい人！',
  hide: 'やだ…見せないで！',
  uneasy: 'うーん…',
}

const CATEGORY_TEXT_COLOR: Record<Category, string> = {
  good: 'text-nashi',
  criminal: 'text-ari',
  scandal: 'text-fusho',
}

const CATEGORY_RING: Record<Category, string> = {
  good: 'ring-nashi/50 hover:ring-nashi',
  criminal: 'ring-ari/50 hover:ring-ari',
  scandal: 'ring-fusho/50 hover:ring-fusho',
}

// 写真に画像がないときの背景。砂漠の色味を切り替えて単調さを避ける
const PLACEHOLDER_GRADIENTS = [
  'from-[#2b1a0e] via-[#8a4a1f] to-[#e0a458]',
  'from-[#0d1b2a] via-[#1b3a57] to-[#c98b4d]',
  'from-[#1a1410] via-[#5a3a1c] to-[#c9a45c]',
  'from-[#10151c] via-[#2c3e50] to-[#7d6b52]',
  'from-[#2a0f0b] via-[#7a2a1a] to-[#d98b4f]',
  'from-[#0f0f0f] via-[#3b2f20] to-[#a88a5a]',
]

type Phase = 'choosing' | 'checking' | 'revealed'

export function QuizPlayer({
  quizId,
  celebrities,
  onFinish,
}: {
  quizId: number
  celebrities: QuizCelebrity[]
  onFinish: (records: AnswerRecord[]) => void
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('choosing')
  const [picked, setPicked] = useState<Category | null>(null)
  const [reveal, setReveal] = useState<Reveal | null>(null)
  const [records, setRecords] = useState<AnswerRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  // state の更新は次の描画まで反映されないため、連打による二重送信を防ぐガードは ref で持つ
  const busy = useRef(false)

  const current = celebrities[index]
  const isLast = index + 1 >= celebrities.length

  const choose = useCallback(
    async (answer: Category) => {
      if (!current || busy.current) return
      busy.current = true
      setPhase('checking')
      setPicked(answer)
      setError(null)
      try {
        const result = await checkAnswer({ data: { quizId, celebrityId: current.id, answer } })
        setReveal(result)
        setPhase('revealed')
      } catch (e) {
        setError(e instanceof Error ? e.message : '判定に失敗しました')
        setPhase('choosing')
        setPicked(null)
        busy.current = false
      }
    },
    [current, quizId],
  )

  const next = useCallback(() => {
    if (phase !== 'revealed' || !current || !picked || !reveal) return
    const nextRecords = [...records, { celebrityId: current.id, answer: picked, ...reveal }]
    setRecords(nextRecords)
    busy.current = false
    if (isLast) {
      onFinish(nextRecords)
      return
    }
    setIndex(index + 1)
    setPhase('choosing')
    setPicked(null)
    setReveal(null)
  }, [current, index, isLast, onFinish, phase, picked, records, reveal])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === '2' || e.key === '3')
        void choose(CATEGORIES[Number(e.key) - 1])
      if (e.key === 'Enter') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, next])

  if (!current) return null

  const expression: Expression =
    phase === 'revealed' && reveal ? EXPRESSION_BY_CATEGORY[reveal.category] : 'idle'
  const speech = phase === 'checking' ? '…じー…' : SPEECH[expression]
  const correctCount = records.filter((r) => r.correct).length + (reveal?.correct ? 1 : 0)

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <Progress
        total={celebrities.length}
        index={index}
        records={records}
        currentCorrect={phase === 'revealed' ? (reveal?.correct ?? null) : null}
        correctCount={correctCount}
      />

      {/* ジャミーンに写真を見せる場面 */}
      <div className="relative h-[min(50vh,25rem)] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-sand/30">
        <DesertScene />
        <Photo key={current.id} celebrity={current} />
        <Jameen expression={expression} className="absolute right-0 bottom-0 h-[56%]" />
        <p
          aria-live="polite"
          className="absolute bottom-3 left-3 max-w-[46%] rounded-2xl rounded-br-sm bg-white/95 px-3 py-2 font-serif text-sm font-bold text-[#2a1d12] shadow-lg"
        >
          {speech}
        </p>
      </div>

      {/* 回答前は3択、回答後は正解の発表（ジャミーンの表情とは別の情報として出す） */}
      {phase === 'revealed' && reveal && picked ? (
        <RevealPanel reveal={reveal} picked={picked} isLast={isLast} onNext={next} />
      ) : (
        <div className="space-y-2">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              type="button"
              disabled={phase === 'checking'}
              onClick={() => void choose(c)}
              className={`flex w-full items-center gap-3 rounded-xl bg-surface px-4 py-3 text-left ring-1 transition active:scale-[0.98] disabled:opacity-50 ${CATEGORY_RING[c]}`}
            >
              <kbd className="font-display text-xs text-dim">{i + 1}</kbd>
              <span className="min-w-0 flex-1">
                <span className={`block font-serif text-lg font-bold ${CATEGORY_TEXT_COLOR[c]}`}>
                  {CATEGORY_LABEL[c]}
                </span>
                <span className="block text-xs text-muted">{CATEGORY_HINT[c]}</span>
              </span>
            </button>
          ))}
          {error && <p className="text-sm text-ari">{error}</p>}
        </div>
      )}
    </div>
  )
}

function Progress({
  total,
  index,
  records,
  currentCorrect,
  correctCount,
}: {
  total: number
  index: number
  records: AnswerRecord[]
  currentCorrect: boolean | null
  correctCount: number
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex flex-1 gap-1"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-label={`${index + 1} / ${total}問目`}
      >
        {Array.from({ length: total }, (_, i) => {
          const done = i < index ? records[i]?.correct : i === index ? currentCorrect : null
          const color =
            done === true
              ? 'bg-nashi'
              : done === false
                ? 'bg-ari'
                : i === index
                  ? 'bg-sand/60'
                  : 'bg-line'
          return <span key={i} className={`h-1.5 flex-1 rounded-full ${color}`} />
        })}
      </div>
      <p className="font-display text-xs tracking-widest text-muted">
        {index + 1}/{total} <span className="text-sand">○{correctCount}</span>
      </p>
    </div>
  )
}

function Photo({ celebrity }: { celebrity: QuizCelebrity }) {
  const gradient = PLACEHOLDER_GRADIENTS[celebrity.id % PLACEHOLDER_GRADIENTS.length]
  return (
    <figure className="photo-in absolute top-3 left-3 w-[58%] -rotate-3 bg-[#f4efe4] p-2 pb-1 shadow-xl shadow-black/50">
      <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${gradient}`}>
        {celebrity.imageUrl ? (
          <img
            src={celebrity.imageUrl}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-serif text-7xl font-black text-white/30"
          >
            {celebrity.name.slice(0, 1)}
          </span>
        )}
      </div>
      <figcaption className="py-1.5 text-center text-[#2a1d12]">
        <p className="font-serif text-sm leading-tight font-bold">{celebrity.name}</p>
        {celebrity.profile && <p className="text-[10px] text-[#6b5a45]">{celebrity.profile}</p>}
      </figcaption>
    </figure>
  )
}

function RevealPanel({
  reveal,
  picked,
  isLast,
  onNext,
}: {
  reveal: Reveal
  picked: Category
  isLast: boolean
  onNext: () => void
}) {
  const { correct, category } = reveal
  return (
    <div
      role="status"
      className={`space-y-3 rounded-2xl p-4 ring-1 ${correct ? 'bg-nashi/10 ring-nashi/60' : 'bg-ari/10 ring-ari/60'}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p
          className={`font-serif text-4xl font-black tracking-[0.3em] ${correct ? 'text-gold' : 'text-ari'}`}
        >
          {correct ? '正解' : '不正解'}
        </p>
        <p className="text-sm text-muted">あなたの回答: {CATEGORY_SHORT[picked]}</p>
      </div>
      <p className="text-sm">
        正解は{' '}
        <span className={`font-serif text-base font-bold ${CATEGORY_TEXT_COLOR[category]}`}>
          {CATEGORY_LABEL[category]}
        </span>
      </p>
      {reveal.scandalSummary && <p className="text-sm text-ink/80">{reveal.scandalSummary}</p>}
      {reveal.sourceUrl && (
        <a
          href={reveal.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-xs text-sand underline"
        >
          出典
        </a>
      )}
      <button
        type="button"
        onClick={onNext}
        className="bg-gold w-full rounded-xl py-3 font-bold text-night"
      >
        {isLast ? '結果を見る' : '次の写真へ'}
      </button>
    </div>
  )
}

function DesertScene() {
  return (
    <svg
      viewBox="0 0 400 420"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f6a9a" />
          <stop offset="0.55" stopColor="#e7b985" />
          <stop offset="1" stopColor="#f3d7a4" />
        </linearGradient>
      </defs>
      <rect width="400" height="420" fill="url(#scene-sky)" />
      <path
        d="M0 270 C80 240 150 262 230 250 C300 240 350 258 400 246 L400 420 L0 420 Z"
        fill="#d9a066"
      />
      <path
        d="M0 322 C90 292 170 332 260 306 C320 290 370 302 400 298 L400 420 L0 420 Z"
        fill="#c28341"
      />
      <path d="M0 382 C100 352 200 392 400 346 L400 420 L0 420 Z" fill="#a96a30" />
    </svg>
  )
}
