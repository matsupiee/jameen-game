# 技術スタックの選定と採点のサーバー側実行

> 注: 採点の方式（まとめて採点・スワイプUI・2択）は `2026-10-05-three-choice-quiz-with-instant-reveal.md` で変更された。技術スタックと「正解をクライアントに渡さない」方針は引き続き有効。

## 背景

芸能人10人を1セットとし、「不祥事を起こしたことがあるか」を右/左スワイプで回答、セットごとの正解数を競うゲームを新規に作る。
フロント・バックを1つのコードベースで扱い、ローカルは Vite、本番は Cloudflare で動かしたい。

## 決定内容

- フルスタックフレームワーク: TanStack Start（React）。サーバー関数（`createServerFn`）でバックエンドを兼ねる
- ローカル開発: Vite + `@cloudflare/vite-plugin`（miniflare 上のローカル D1 を使用）
- デプロイ: Cloudflare Workers（`wrangler deploy`）
- DB: Cloudflare D1 + Drizzle ORM（スキーマは `src/db/schema.ts`、マイグレーションは drizzle-kit で生成し `wrangler d1 migrations apply` で適用）
- パッケージ管理/ランタイム: bun
- Lint/Format: oxlint / oxfmt
- 採点はサーバー側で行う。出題 API（`getQuiz`）は正解・解説を返さず、回答送信後（`gradeQuiz`）に初めて返す。
  スコア登録（`submitScore`）はクライアントから点数を受け取らず、回答を再採点して保存する

## 理由

- TanStack Start は Cloudflare Vite プラグイン対応済みで、ローカルと本番の差を最小にできる
- D1 は Workers と同一基盤でバインディング経由に直接アクセスでき、無料枠でランキング程度の規模には十分
- 正解をクライアントに渡すとブラウザの開発者ツールで全問正解できてしまい、ランキングが成立しない

## 却下した選択肢

- Next.js + OpenNext: 指定スタック（TanStack Start）から外れる
- 1枚スワイプするたびにサーバーへ問い合わせて即時判定: 通信待ちでスワイプのテンポが落ちる。10問まとめて採点する方式にした
- クライアント側で採点してスコアを送信: 改ざん可能なため不採用

## 影響

- スワイプ中は正解が分からないため、1枚ごとの即時フィードバックはなく、結果画面でまとめて解説を表示する
- 回答の重複・欠落・範囲外IDは `src/server/grade.ts` でエラーにする（`grade.test.ts` で検証）
- 同一端末からの連続投稿などの不正対策（レート制限、Turnstile 等）は未対応
