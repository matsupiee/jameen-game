# 🎉 ジャミーンゲーム - セットアップ完全ガイド

著名人200人のデータベース投入と画像 URL 設定のための、完全なセットアップガイドです。

## 📋 全体フロー

```
1. データベースマイグレーション
   ↓
2. シード処理（著名人200人 + 20クイズセット）
   ↓
3. 画像URL取得（Wikipedia API）
   ↓
4. 画像URL反映
   ↓
5. 本番環境へデプロイ
```

## 🚀 クイックスタート（推奨順序）

### ステップ 1️⃣: データベース準備

```bash
# プロジェクトディレクトリに移動
cd /Users/hiromu/ghq/github.com/matsupiee/jameen-game

# ローカル D1 にマイグレーション適用
bun run db:migrate:local
```

### ステップ 2️⃣: 開発サーバー起動

```bash
# 新しいターミナルウィンドウで開発サーバー起動
bun run dev

# 出力例:
# ✓ built in 2.34s
# ➜ local: http://localhost:3000/
# ➜ press h to show help
```

### ステップ 3️⃣: 著名人データを投入

```bash
# 別のターミナルウィンドウで以下を実行
curl -X POST http://localhost:3000/api/seed

# 期待される出力:
# {
#   "success": true,
#   "message": "Seeding completed successfully"
# }
```

### ステップ 4️⃣: 画像 URL を取得

```bash
# Wikipedia から200人分の画像URLを取得
# 所要時間: 2～3分
bun scripts/fetch-images.ts

# 出力:
# ✅ Image fetching complete!
# 📊 Results: 165/200 images found (82%)
# 💾 JSON results saved to: scripts/celebrities-images.json
# 💾 CSV results saved to: scripts/celebrities-images.csv
```

### ステップ 5️⃣: 画像 URL をデータベースに反映

```bash
# 開発サーバーが起動している状態で
curl -X POST http://localhost:3000/api/update-images

# 期待される出力:
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

### ステップ 6️⃣: ブラウザで確認

```bash
# ブラウザで http://localhost:3000 を開く
# → クイズセット一覧が表示される
# → クイズを選択して、著名人の写真が表示されるか確認
```

### ステップ 7️⃣: 本番環境へデプロイ

```bash
# 1. マイグレーションを本番環境に適用
bun run db:migrate:remote

# 2. ビルド＆デプロイ
bun run deploy

# 3. https://jameen-game.example.com でアクセス確認
```

## 📁 作成されたファイル

### データベース関連
| ファイル | 説明 |
|---------|------|
| `src/db/celebrities-data.ts` | スキャンダル者100人 + クリーン人100人のデータ |
| `src/db/schema.ts` | Drizzle スキーマ定義（既存） |
| `src/db/seed.ts` | 著名人・クイズセット投入関数 |

### API エンドポイント
| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/api/seed` | POST | 著名人・クイズセット投入（開発環境のみ） |
| `/api/update-images` | POST | 画像URL をデータベースに反映（開発環境のみ） |

### ユーティリティスクリプト
| ファイル | 説明 |
|---------|------|
| `scripts/fetch-images.ts` | Wikipedia から画像URLを取得 |
| `scripts/update-images.ts` | 画像URLを celebrities テーブルに更新（CLI版） |

### ドキュメント
| ファイル | 説明 |
|---------|------|
| `SEEDING.md` | シード処理の詳細マニュアル |
| `IMAGE_SETUP.md` | 画像URL取得・更新の詳細マニュアル |
| `SETUP_COMPLETE.md` | このファイル |

## 📊 データ統計

### 著名人の分布

```
総人数: 200人

分類別:
├─ 善人（good）: 100人
├─ 犯罪者（criminal）: 35人 ※逮捕・有罪確定
└─ 不祥事（scandal）: 65人 ※犯罪ではない騒動

職種別:
├─ お笑い芸人: 27人
├─ 女優・俳優: 30人
├─ ミュージシャン・歌手: 25人
├─ YouTuber・配信者: 35人
├─ アナウンサー・コメンテーター: 20人
└─ その他: 63人
```

### クイズセット構成

```
総セット数: 20個

各セットの構成（10人）:
├─ 犯罪者: 2人
├─ 不祥事: 3人
└─ 善人: 5人

（ランダムに配置）
```

### 画像URL の成功率

```
取得対象: 200人

期待される取得率:
├─ Wikipedia ページあり: 85～90%
├─ Wikidata から取得: +5～10%
└─ 取得失敗: 5～10%

実際の成功率は人物の知名度により変動
```

## 🔧 カスタマイズ

### 特定の人物を追加・削除

```typescript
// src/db/celebrities-data.ts を編集
export const scandalCelebrities = [
  // 追加の人物
  {
    name: '新しい人物',
    profile: '職種',
    category: 'criminal', // または 'scandal'
    scandalSummary: '...',
    sourceUrl: 'https://...',
  },
  // ...
]

// 変更後、再度シード処理を実行
curl -X POST http://localhost:3000/api/seed
```

### クイズセットのバランスを変更

```typescript
// src/db/seed.ts の以下の部分を編集
const positions = [
  // 犯罪者 2人 → 3人に変更
  shuffledCrime[(crimeIdx++) % shuffledCrime.length],
  shuffledCrime[(crimeIdx++) % shuffledCrime.length],
  shuffledCrime[(crimeIdx++) % shuffledCrime.length], // ← 追加
  // ...
]
```

### 画像 URL のソースを変更

```typescript
// scripts/fetch-images.ts の fetchWikipediaImage() 関数を修正
// 例: Unsplash API を使用する場合
```

## 🐛 トラブルシューティング

### Q: "Seeding complete!" が表示されない

**A**: 開発サーバーのコンソールを確認してください。エラーメッセージが表示されていますか？

```bash
# ローカル D1 をリセット
rm -rf .wrangler/state/v3/d1/miniflare/DB_*

# マイグレーション再実行
bun run db:migrate:local

# 再度シード実行
curl -X POST http://localhost:3000/api/seed
```

### Q: 画像が表示されない

**A**: 以下を確認してください

1. `scripts/celebrities-images.json` が存在するか
2. `/api/update-images` が成功したか
3. ブラウザのキャッシュをクリアしているか

```bash
# キャッシュクリア
rm -rf .wrangler/state/v3
bun run dev  # 再起動
```

### Q: Wikipedia API が 429 エラー（レート制限）

**A**: スクリプトを待機してから再実行してください

```bash
# 1時間待機後
sleep 3600
bun scripts/fetch-images.ts
```

## 📖 詳細ドキュメント

詳しい説明は以下をご覧ください：

- **シード処理について**: [SEEDING.md](./SEEDING.md)
- **画像URLについて**: [IMAGE_SETUP.md](./IMAGE_SETUP.md)

## ✅ チェックリスト

セットアップ完了時の確認項目：

- [ ] ローカル D1 にマイグレーション適用済み
- [ ] `/api/seed` で著名人200人が投入済み
- [ ] `bun scripts/fetch-images.ts` で celebrities-images.json が生成済み
- [ ] `/api/update-images` で画像URL が反映済み
- [ ] ブラウザでクイズページを開いて著名人の写真が表示される
- [ ] `bun run deploy` で本番環境にデプロイ可能

## 🎓 学んだこと（開発メモ）

このプロジェクトで実装した技術：

1. **Drizzle ORM** を使用した型安全なDB操作
2. **Cloudflare D1** への SQLite ベースのデータベース
3. **Wikipedia API** を使用した自動データ取得
4. **TanStack Start** の API エンドポイント定義
5. **Vite** + **TailwindCSS** でのUI実装

## 💡 今後の改善案

- [ ] 画像 URL の自動更新スケジュール
- [ ] 管理画面での著名人・画像管理
- [ ] CI/CD パイプラインの自動化
- [ ] 画像のローカルキャッシング
- [ ] より詳細な著名人情報（SNS、公式サイト等）

---

**最後に**: ゲームを楽しんでください！🎮
