import { HeadContent, Link, Scripts, createRootRoute, useMatch } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { name: 'theme-color', content: '#0b0907' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,900&family=Montserrat:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

// クイズ画面・ランキング画面は戻るボタン付きの専用ヘッダーを自前で出すので、ロゴのヘッダーは出さない
function SiteHeader() {
  const isQuiz = useMatch({ from: '/quiz/$quizId', shouldThrow: false })
  const isRanking = useMatch({ from: '/ranking/$quizId', shouldThrow: false })
  if (isQuiz || isRanking) return null

  return (
    <header className="mb-6 border-b border-line pt-5 pb-4 text-center">
      <Link to="/" className="inline-block no-underline" aria-label="ジャミーンゲーム">
        <span className="logo-sub block">ジャミーンゲーム</span>
        <span className="logo-main block">JAMEEN</span>
      </Link>
    </header>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="mx-auto min-h-screen max-w-2xl px-4 pb-10">
          <SiteHeader />
          {children}
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
