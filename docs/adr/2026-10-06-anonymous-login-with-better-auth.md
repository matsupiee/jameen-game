# better-auth の匿名ログインでプレイヤーを識別する

## 背景

これまでプレイヤーを識別する仕組みがなく、ランキングのスコアは入力したニックネームだけで登録していた。
自分のスコアの履歴や、将来の会員登録（メール・SNS ログイン）につなげるために、プレイヤーを識別したい。
ただし、遊ぶ前に会員登録を求めるとゲームを始めるハードルが上がる。

## 決定内容

- 認証ライブラリは better-auth を使う。DB は既存の D1 を Drizzle アダプタ経由で使い、テーブル（`user` / `session` / `account` / `verification`）は `packages/db/src/auth-schema.ts` に置く
- anonymous プラグインで匿名ログインする。初回アクセス時にクライアント（`apps/web/src/lib/auth-client.ts` の `useAnonymousSignIn`）が自動で `signIn.anonymous()` を呼び、セッションクッキーを発行する。名前は一律「ゲスト」
- エンドポイントは `/api/auth/$` ルートで better-auth のハンドラに渡す
- ランキング登録時はサーバー側でセッションからユーザーを取り、`scores.user_id` に保存する。セッションがなくても登録はできる（`user_id` は null）

## 理由

- better-auth は TanStack Start 向けのクッキー連携（`tanstackStartCookies`）と Drizzle アダプタを持ち、Cloudflare Workers + D1 の構成にそのまま載る
- 匿名ユーザーは後からメール等のアカウントへ紐付けられる（`onLinkAccount`）ため、会員登録を追加するときにスコアを引き継げる

## 却下した選択肢

- クライアントで UUID を作って localStorage に保存: 改ざんが容易で、会員登録への移行も自前で作る必要がある
- 最初から会員登録を必須にする: 遊び始めるまでの手間が増える

## 影響

- `BETTER_AUTH_SECRET` が必要（ローカルは `apps/web/.dev.vars`、本番は `wrangler secret put`）
- クッキーを消すと別の匿名ユーザーになる。匿名ユーザーは削除されずに溜まっていく（定期削除は未対応）
- メール等のログインを追加するときは、`anonymous({ onLinkAccount })` で `scores.user_id` を新しいユーザーへ付け替える
