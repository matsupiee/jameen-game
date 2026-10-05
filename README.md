# ジャミーンゲーム

芸能人10人で1セット。案内役の少女「ジャミーン」に写真を見せて、その人が
**善人 / 犯罪者 / 不祥事を起こしたが犯罪ではない人** のどれかを当てるゲームです。
回答するとすぐに正解が発表され、ジャミーンが表情（笑顔 / 顔を隠して嫌がる / 浮かない顔）で反応します。
セットごとの正解数でランキングを競います。キーボードは `1` `2` `3` で回答、`Enter` で次へ。

## スタック

TanStack Start / Cloudflare Workers + D1 / Drizzle / bun / Turborepo / oxlint / oxfmt（ローカル開発は Vite）

## 構成

```
apps/web          TanStack Start アプリ（画面と createServerFn のラッパー）
packages/api      サーバー処理の中身（クイズ取得・判定・採点・ランキング）
packages/db       Drizzle スキーマ・マイグレーション
packages/db/seed  シードデータ（芸能人データと投入コマンド）
packages/config   共通の tsconfig
```

## セットアップ

```sh
bun install
bun run db:migrate:local   # ローカルD1にテーブル作成
bun seed                   # シードデータ投入（画像は R2 に保存。既存データは消して作り直す）
bun run dev                # http://localhost:3000（使用中なら次のポート）
```

## スクリプト

| コマンド                                                   | 内容                                                       |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| `bun run dev`                                              | 開発サーバー（Vite + ローカルD1）                          |
| `bun run build` / `bun run deploy`                         | ビルド / ビルドしてデプロイ                                |
| `bun run lint` / `bun run format` / `bun run format:check` | oxlint / oxfmt                                             |
| `bun run typecheck` / `bun run test`                       | 型チェック / テスト                                        |
| `bun run db:generate`                                      | `packages/db/src/schema.ts` の変更からマイグレーション生成 |
| `bun run db:migrate:local` / `db:migrate:remote`           | マイグレーション適用                                       |
| `bun seed`                                                 | ローカルD1にシードデータを投入                             |
| `bun run cf-typegen`                                       | `apps/web/wrangler.jsonc` 変更後に型を再生成               |

## デプロイ（Cloudflare）

1. `bunx wrangler d1 create jameen-game` で D1 を作成し、発行された `database_id` を `apps/web/wrangler.jsonc` に設定
2. `bunx wrangler r2 bucket create jameen-game-images` で画像用の R2 バケットを作成
3. `bun run db:migrate:remote`
4. `packages/db/.env.example` を `packages/db/.env` にコピーし、`CLOUDFLARE_ACCOUNT_ID` と `CLOUDFLARE_API_TOKEN`（D1 と R2 の編集権限）を設定して `bun seed --remote --yes`
5. `bun run deploy`

`bun seed --remote` は本番のランキングも含めて全データを作り直すので注意。

## 問題データについて

シードデータは `packages/db/seed/celebrities-data.ts` にあります。`imageSourceUrl` は画像のダウンロード元で、
`bun seed` がダウンロードして R2 に保存し、`/images/...`（`apps/web/src/routes/images/$.ts` が R2 から配信）を
`image_url` に入れます。保存ずみの画像は再ダウンロードしません。取得に失敗した芸能人は画像なしになります。

実在の芸能人を登録・修正する場合:

- 不祥事の内容は報道等で裏付けのある事実だけを `scandalSummary` に簡潔に書き、`sourceUrl` に出典を入れる
- 「不祥事なし」の判定は誤りが名誉毀損につながりうるため、慎重に確認する
- `category` は `good`（善人）/ `criminal`（犯罪者）/ `scandal`（不祥事だが犯罪ではない）。逮捕・有罪など法に触れたものだけを `criminal` にする
- 1クイズ = `quiz_celebrities` に紐づく芸能人10人（シードでは犯罪者2・不祥事3・善人5をランダムに割り当てる）

## 設計メモ

正解は出題時にクライアントへ送らず、1問回答するごとにサーバーがその1人分だけ判定して返します。ランキング登録時は回答を再採点します。詳細は `docs/adr/` を参照。
