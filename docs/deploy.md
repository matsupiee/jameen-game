# リモート環境（Cloudflare）の管理

本番は Cloudflare Workers（アプリ）+ D1（DB）+ R2（芸能人の画像）で動いている。

| リソース | 名前                                            | 設定場所                                    |
| -------- | ----------------------------------------------- | ------------------------------------------- |
| Worker   | `jameen-game`                                   | `apps/web/wrangler.jsonc` の `name`         |
| D1       | `jameen-game`（バインディング `DB`）            | `apps/web/wrangler.jsonc` の `d1_databases` |
| R2       | `jameen-game-images`（バインディング `IMAGES`） | `apps/web/wrangler.jsonc` の `r2_buckets`   |

コマンドはリポジトリのルートで実行する。`wrangler` を直接使うときだけ `apps/web` で実行する。

## 初回セットアップ

### 1. Cloudflare にログイン

```sh
cd apps/web
bunx wrangler login
bunx wrangler whoami   # Account ID を控えておく
```

### 2. D1 を作成

```sh
bunx wrangler d1 create jameen-game
```

発行された ID を `apps/web/wrangler.jsonc` の `database_id` に設定してコミットする（秘密情報ではない）。
`00000000-...` のままではデプロイ・リモートシードができない。

ビルド時に `wrangler.jsonc` の内容が `apps/web/dist` に焼き込まれ、以降の `wrangler` コマンドもそれを使う。
ID を変えたら必ずビルドし直すこと（`bun run deploy` ならビルドからやり直す）。

### 3. R2 バケットを作成

```sh
bunx wrangler r2 bucket create jameen-game-images
```

R2 を初めて使うアカウントは、先にダッシュボードで R2 を有効にする（支払い情報の登録が必要）。
バケットは公開設定にしない。画像は Worker の `/images/$` ルートが R2 から読んで配信する。

### 4. テーブルを作成

```sh
cd ../..
bun run db:migrate:remote
```

### 5. 認証用のシークレットを設定

better-auth（匿名ログイン）がセッションの署名に使う。32文字以上のランダムな文字列にする。

```sh
cd apps/web
openssl rand -base64 32 | bunx wrangler secret put BETTER_AUTH_SECRET
cd ../..
```

変更すると全員のセッションが無効になり、次のアクセスで新しい匿名ユーザーが作られる（過去のスコアとの紐付けが切れる）。

### 6. シード用の API トークンを用意

ダッシュボード → My Profile → API Tokens → Create Token → Custom token で、次の権限を付けて作成する。

- Account / D1 / Edit
- Account / Workers R2 Storage / Edit

```sh
cp packages/db/.env.example packages/db/.env
```

`packages/db/.env`（git には入らない）に設定する。

```
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
```

### 7. データと画像を投入

```sh
bun seed --remote --yes
```

画像は `celebrities-data.ts` の `imageSourceUrl` からダウンロードして R2 に保存する。
保存ずみの画像は再ダウンロードしない。取得に失敗した芸能人は画像なしになり、失敗した URL が表示される。

### 8. デプロイ

```sh
bun run deploy
```

表示される `https://jameen-game.<サブドメイン>.workers.dev` が公開 URL。
独自ドメインはダッシュボードの Workers & Pages → `jameen-game` → Settings → Domains & Routes から追加する。

## 日常の運用

| やりたいこと         | 手順                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| コードの変更を反映   | `bun run deploy`                                                       |
| スキーマを変更       | `bun run db:generate` → `bun run db:migrate:remote` → `bun run deploy` |
| 芸能人データを変更   | `bun seed --remote --yes`                                              |
| 画像なしで素早く投入 | `bun seed --remote --yes --skip-images`                                |
| 画像だけ入れ直す     | `bun seed --remote --images-only`（クイズ・ランキングは消えない）      |

**`bun seed --remote` は本番のデータをすべて消して作り直す（ランキングも消える）。**
そのため `--yes` を付けないと実行されない。

スキーマ変更は、マイグレーションを先に適用してからデプロイする。
逆の順番だと、新しいコードが存在しない列を参照してエラーになる。

## 中身を確認する

```sh
cd apps/web
bunx wrangler d1 execute DB --remote --command "select count(*) from celebrities"
bunx wrangler d1 migrations list DB --remote   # 適用ずみのマイグレーション
bunx wrangler r2 object get jameen-game-images/celebrities/<キー> --remote --file out.jpg
bunx wrangler tail                             # 本番のログをリアルタイムで見る
```

ダッシュボードの Storage & Databases から D1 のテーブルや R2 のオブジェクトも見られる。

## トラブルシューティング

| 症状                                   | 原因・対処                                                  |
| -------------------------------------- | ----------------------------------------------------------- |
| `database_id に … 設定してください`    | `wrangler.jsonc` の `database_id` が未設定                  |
| 本番で `no such table`                 | `bun run db:migrate:remote` を実行していない                |
| リモートシードで 401 / 403             | API トークンの権限（D1・R2 の Edit）か Account ID の誤り    |
| デプロイで R2 バケットがないと言われる | バケットを作成していない                                    |
| ID を変えたのに古い ID で動く          | 変更前のビルドが残っている。`bun run deploy` でビルドし直す |
| 写真が出ない                           | `bun seed --remote` の出力で画像が保存できているか確認する  |
