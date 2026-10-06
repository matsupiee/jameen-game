import { useState } from 'react'
import { SHARE_HASHTAG } from '#/shared/seo'

/**
 * 結果を X・LINE でシェアするボタン。○× の並びはどの芸能人かを伏せたまま結果の雰囲気を伝える（Wordle 風）
 */
export function ShareButtons({
  quizId,
  quizTitle,
  results,
}: {
  quizId: number
  quizTitle: string
  results: boolean[]
}) {
  const [copied, setCopied] = useState(false)

  const score = results.filter(Boolean).length
  const url = `${window.location.origin}/quiz/${quizId}`
  const marks = results.map((correct) => (correct ? '⭕' : '❌')).join('')
  const message = `ジャミーンゲーム「${quizTitle}」で ${results.length}問中${score}問正解！\n${marks}\nあなたは見抜ける？`
  const fullText = `${message}\n#${SHARE_HASHTAG}\n${url}`

  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(SHARE_HASHTAG)}`
  const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(fullText)}`

  // スマホでは OS の共有シートを開き、使えなければクリップボードにコピーする
  const shareOther = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: fullText })
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // コピーできない環境では何もしない
    }
  }

  const buttonClass =
    'flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold no-underline'

  return (
    <div className="space-y-2">
      <p className="text-center text-sm text-muted">結果をシェアしよう</p>
      <div className="flex gap-2">
        <a
          href={xUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`${buttonClass} bg-black text-white ring-1 ring-line`}
        >
          <XIcon />
          ポスト
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`${buttonClass} bg-[#06c755] text-white`}
        >
          LINE
        </a>
        <button
          type="button"
          onClick={shareOther}
          className={`${buttonClass} bg-surface text-ink ring-1 ring-line`}
        >
          {copied ? 'コピーしました' : 'その他'}
        </button>
      </div>
    </div>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
