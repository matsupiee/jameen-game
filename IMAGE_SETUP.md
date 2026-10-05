# 著名人の写真 URL セットアップガイド

このドキュメントでは、Wikipedia から著名人200人の画像 URL を自動取得し、データベースに反映する手順を説明します。

## 概要

- **処理フロー**: Wikipedia API → celebrities-images.json → データベース更新
- **取得対象**: 日本語 Wikipedia のみ
- **成功率**: 約 70～85%（著名度により変動）
- **処理時間**: 約 2～3 分（ネットワーク速度に依存）

## ステップ 1: 画像 URL を取得

### 実行

```bash
# スクリプト実行（開発環境）
bun scripts/fetch-images.ts
```

### 出力ファイル

- **`scripts/celebrities-images.json`**: 画像 URL のマッピング（JSON形式）
- **`scripts/celebrities-images.csv`**: 画像 URL のマッピング（CSV形式）

### 出力例

```json
{
  "清原和博": "https://upload.wikimedia.org/wikipedia/commons/...",
  "成宮寛貴": null,
  "ベッキー": "https://upload.wikimedia.org/wikipedia/commons/...",
  ...
}
```

### トラブルシューティング

#### ⚠️ ネットワークエラー

**症状**: `Error: fetch failed`

**解決方法**:
```bash
# プロキシ経由で実行
HTTP_PROXY=http://proxy.example.com bun scripts/fetch-images.ts
```

#### ⚠️ 一部の人物の画像が取得できない

**症状**: 成功率が 50% 以下

**原因**: 
- Wikipedia に記事がない
- 記事はあるが画像がない
- 人物名が異なる（AKAなど）

**解決方法**:
1. 成功したものから先に投入
2. 失敗した人物は manually を追加

## ステップ 2: 画像 URL をデータベースに反映

### 方法 A: API エンドポイント経由（推奨）

最も簡単な方法です。

```bash
# 1. 開発サーバー起動
bun run dev

# 2. 別のターミナルで実行
curl -X POST http://localhost:3000/api/update-images

# 3. 結果を確認
# 出力例:
# {
#   "success": true,
#   "message": "Image URL update completed",
#   "stats": {
#     "updated": 165,
#     "skipped": 35,
#     "total": 200
#   }
# }
```

### 方法 B: CLI スクリプト経由

Worker 環境での実行が必要です（開発環境では使用困難）。

```bash
bun scripts/update-images.ts
```

## ステップ 3: 検証

### ブラウザで確認

```bash
# 1. 開発サーバーが起動している状態で
# 2. http://localhost:3000 にアクセス
# 3. クイズページで著名人の写真が表示されているか確認
```

### SQL で確認

```bash
# D1 にクエリ実行（Wrangler CLI）
wrangler d1 execute DB --local "SELECT name, image_url FROM celebrities WHERE image_url IS NOT NULL LIMIT 10"
```

期待される出力:

```
┌──────────────┬──────────────────────────────────────────────────┐
│ name         │ image_url                                        │
├──────────────┼──────────────────────────────────────────────────┤
│ 清原和博     │ https://upload.wikimedia.org/wikipedia/...      │
│ ベッキー     │ https://upload.wikimedia.org/wikipedia/...      │
│ 東出昌大     │ https://upload.wikimedia.org/wikipedia/...      │
└──────────────┴──────────────────────────────────────────────────┘
```

## 画像が取得できなかった人物の対応

### 1. 自動再試行

```bash
# celebrities-images.json の null 値を手動で編集して再実行
nano scripts/celebrities-images.json

# 例: 成宮寛貴 の URL を Wikipedia から手動取得して追加
{
  "成宮寛貴": "https://ja.wikipedia.org/wiki/Special:FilePath/Hiroki_Narimiya.jpg"
}

# 再度更新
curl -X POST http://localhost:3000/api/update-images
```

### 2. 手動で個別に追加

```bash
# celebrities-images.json の null エントリを検索
grep ': null' scripts/celebrities-images.json
```

失敗した人物の対応方法:

1. **Google で画像検索** → URL をコピー
2. または **Wikipedia の該当ページ** から画像を探す
3. または **公式 SNS/サイト** から画像を取得

## API リファレンス

### POST /api/update-images

**説明**: celebrities-images.json の内容をデータベースに反映

**リクエスト**:
```bash
curl -X POST http://localhost:3000/api/update-images
```

**レスポンス**:
```json
{
  "success": true,
  "message": "Image URL update completed",
  "stats": {
    "updated": 165,
    "skipped": 35,
    "total": 200,
    "errors": [
      "山本太郎: Duplicate key error"
    ]
  }
}
```

**エラーレスポンス** (403):
```json
{
  "error": "Image update is disabled in production"
}
```

## 本番環境への対応

本番環境では `/api/update-images` エンドポイントは無効化されます。

本番環境でのセットアップ方法:

### 方法 1: デプロイ前にローカルで完成させる

```bash
# ローカルで celebrities-images.json を取得
bun scripts/fetch-images.ts

# 画像を反映
curl -X POST http://localhost:3000/api/update-images

# シードデータとして本番環境にデプロイ
bun run deploy
```

### 方法 2: 本番環境用の管理ツールを作成

（後で実装）

- 管理画面での画像 URL 更新機能
- バッチ処理スクリプト
- CI/CD パイプライン統合

## パフォーマンス最適化

### 画像 URL の キャッシング

一度取得した URL は再利用しましょう:

```bash
# celebrities-images.json をバージョン管理に追加
git add scripts/celebrities-images.json
```

### API レート制限への対応

Wikipedia API は 1秒あたり 1リクエストまでが推奨です。

現在のスクリプトは `500ms` の待機を挿入しているため、問題ありません。

## トラブルシューティング

### Q: "celebrities-images.json not found"

**A**: `bun scripts/fetch-images.ts` を先に実行してください

### Q: 一部の人物の画像が null のまま

**A**: その人物の Wikipedia 記事に画像がない可能性があります。手動で追加してください

### Q: 画像 URL が無効（404）

**A**: Wikipedia のファイル管理が変わった可能性があります。手動で再取得してください

### Q: API リクエストがタイムアウト

**A**: ネットワーク接続を確認し、再度実行してください

## 参考資料

- [Wikipedia API ドキュメント](https://ja.wikipedia.org/wiki/Wikipedia:API)
- [Wikidata 画像プロパティ](https://www.wikidata.org/wiki/Property:P18)
- [Wikimedia Commons](https://commons.wikimedia.org)
