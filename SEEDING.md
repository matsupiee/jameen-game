# データベースシード処理

このドキュメントでは、ジャミーンゲーム用の著名人200人のデータをデータベースに投入する手順を説明します。

## 概要

- **著名人の総数**: 200人
- **内訳**: スキャンダル者100人（犯罪者 + 不祥事） + クリーン人100人
- **クイズセット数**: 20セット
- **各セットの構成**: 10人（犯罪者2人 + 不祥事3人 + 善人5人をランダムに配置）

## ファイル構成

```
src/db/
├── schema.ts                 # Drizzle スキーマ定義
├── celebrities-data.ts       # 著名人200人のデータ
├── seed.ts                   # シード処理のメイン関数
└── db.ts                     # データベース接続

src/routes/
└── api.seed.ts               # 開発用シードエンドポイント
```

## 実行手順

### ステップ 1: マイグレーション実行

まず、データベーススキーマがセットアップされていることを確認します。

```bash
# ローカル開発環境
bun run db:migrate:local
```

### ステップ 2: 開発サーバー起動

```bash
bun run dev
```

サーバーが起動したら、以下の URL で利用可能になります:
- UI: `http://localhost:3000`
- API: `http://localhost:3000/api/seed`

### ステップ 3: シード処理実行

開発環境で以下のコマンドを実行してシード処理をトリガーします:

```bash
# curl を使用
curl -X POST http://localhost:3000/api/seed

# または fetch を使用（JavaScript）
fetch('http://localhost:3000/api/seed', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data))
```

期待される出力:

```json
{
  "success": true,
  "message": "Seeding completed successfully"
}
```

### ステップ 4: 検証

ブラウザで `http://localhost:3000` にアクセスして、クイズセットが表示されていることを確認します。

## トラブルシューティング

### ❌ "database binding not found" エラー

**原因**: ローカル D1 が初期化されていない

**解決方法**:
```bash
bun run db:migrate:local
```

### ❌ POST リクエストが 403 エラー

**原因**: 本番環境では実行が禁止されている

**解決方法**: 開発環境でのみ実行してください
```bash
NODE_ENV=development bun run dev
```

### ❌ "Seeding failed" エラー

**原因**: データベーススキーマが不完全 または データ重複

**解決方法**:
1. 既存のデータを削除
2. マイグレーションをリセット
3. 再度マイグレーション実行

```bash
# ローカル開発環境で DB をリセット
rm -rf .wrangler/state/v3/d1/miniflare/DB_*
bun run db:migrate:local
```

## 本番環境へのデプロイ

### 前提条件

- D1 データベースが作成済み
- マイグレーションが本番環境に適用済み

### 手順

```bash
# 1. マイグレーション実行
bun run db:migrate:remote

# 2. 本番環境用のシードデータ投入
#    (本番環境では /api/seed エンドポイントは無効化)
#    代わりに、SQL スクリプトまたは専用の管理ツールを使用
```

**注**: 本番環境でのシード処理は、セキュリティ上の理由から API エンドポイント経由では実行できません。代わりに以下の方法を使用してください:

1. **Wrangler CLI で直接実行**:
   ```bash
   # SQL スクリプトを生成して実行
   bun run scripts/generate-seed-sql.ts | wrangler d1 execute DB --remote -
   ```

2. **管理画面から実行** (別途実装)

3. **CI/CD パイプラインから実行** (GitHub Actions など)

## データ構成

### カテゴリ定義

- **`good`** (善人): スキャンダルなし、信頼できる著名人
- **`criminal`** (犯罪者): 逮捕・起訴・有罪判決を受けた人物
- **`scandal`** (不祥事): 犯罪ではないが、社会的問題を起こした人物

### 画像 URL

現在、すべての著名人の `image_url` は `NULL` に設定されています。

後で以下の方法で追加できます:

```typescript
// 更新例
await db
  .update(celebrities)
  .set({ imageUrl: 'https://...' })
  .where(eq(celebrities.name, '清原和博'))
```

推奨ソース:
- Wikipedia: `https://ja.wikipedia.org/wiki/<人名>`
- 各著名人の公式サイト / SNS

## Drizzle ORM を使用した理由

1. **型安全性**: スキーマと実行時のデータ型が一致
2. **マイグレーション自動生成**: スキーマ変更から SQL を自動生成
3. **D1 統合**: Cloudflare D1 との統合が良好
4. **SQL インジェクション対策**: クエリビルダーが安全

詳細は [Drizzle ドキュメント](https://orm.drizzle.team) を参照してください。
