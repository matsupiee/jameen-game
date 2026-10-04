# ジャミーンゲーム

芸能人10人で1セット。案内役の少女「ジャミーン」に写真を見せて、その人が
**善人 / 犯罪者 / 不祥事を起こしたが犯罪ではない人** のどれかを当てるゲームです。
回答するとすぐに正解が発表され、ジャミーンが表情（笑顔 / 顔を隠して嫌がる / 浮かない顔）で反応します。
セットごとの正解数でランキングを競います。キーボードは `1` `2` `3` で回答、`Enter` で次へ。

## スタック

TanStack Start / Cloudflare Workers + D1 / Drizzle / bun / oxlint / oxfmt（ローカル開発は Vite）

## セットアップ

```sh
bun install
bun run db:migrate:local   # ローカルD1にテーブル作成
bun run db:seed:local      # サンプルデータ投入（すべて架空の人物）
bun run dev                # http://localhost:3000（使用中なら次のポート）
```

## スクリプト

| コマンド                                                   | 内容                                              |
| ---------------------------------------------------------- | ------------------------------------------------- |
| `bun run dev`                                              | 開発サーバー（Vite + ローカルD1）                 |
| `bun run build` / `bun run deploy`                         | ビルド / ビルドしてデプロイ                       |
| `bun run lint` / `bun run format` / `bun run format:check` | oxlint / oxfmt                                    |
| `bun run typecheck` / `bun test`                           | 型チェック / テスト                               |
| `bun run db:generate`                                      | `src/db/schema.ts` の変更からマイグレーション生成 |
| `bun run db:migrate:local` / `db:migrate:remote`           | マイグレーション適用                              |
| `bun run cf-typegen`                                       | `wrangler.jsonc` 変更後に型を再生成               |

## デプロイ（Cloudflare）

1. `bunx wrangler d1 create jameen-game` で D1 を作成し、発行された `database_id` を `wrangler.jsonc` に設定
2. `bun run db:migrate:remote`
3. `bun run deploy`

## 問題データについて

`db/seed.sql` は動作確認用の**架空の人物**です。実在の芸能人を登録する場合:

- 不祥事の内容は報道等で裏付けのある事実だけを `scandal_summary` に簡潔に書き、`source_url` に出典を入れる
- 「不祥事なし」の判定は誤りが名誉毀損につながりうるため、慎重に確認する
- `category` は `good`（善人）/ `criminal`（犯罪者）/ `scandal`（不祥事だが犯罪ではない）。逮捕・有罪など法に触れたものだけを `criminal` にする
- 1クイズ = `quiz_celebrities` に紐づく芸能人10人

## 設計メモ

正解は出題時にクライアントへ送らず、1問回答するごとにサーバーがその1人分だけ判定して返します。ランキング登録時は回答を再採点します。詳細は `docs/adr/` を参照。
