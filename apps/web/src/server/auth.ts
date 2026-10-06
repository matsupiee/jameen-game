import { env } from 'cloudflare:workers'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import * as schema from '@jameen/db/schema'
import { getDb } from './db'

// 会員登録なしで遊べるよう、初回アクセス時に匿名ユーザーとしてログインさせる（src/lib/auth-client.ts）。
// メール等でのログインを追加したら、anonymous() の onLinkAccount で匿名ユーザーのスコアを引き継ぐ
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(getDb(), { provider: 'sqlite', schema }),
  // tanstackStartCookies はサーバー関数から呼んだときに Set-Cookie を反映させるため、最後に置く
  plugins: [anonymous({ generateName: () => 'ゲスト' }), tanstackStartCookies()],
})

/** サーバー関数から、リクエストのクッキーに対応するログイン中のユーザーを取得する */
export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  return session?.user ?? null
}
