// シードデータを投入する。既存データ（ランキングを含む）は消して作り直す。
//
//   bun seed                     ローカルの D1・R2（apps/web の `bun run dev` が使うもの）に投入
//   bun seed --remote --yes      リモートの D1・R2 に投入
//   bun seed --skip-images       画像を R2 に保存せず、画像なしで投入
//
// 事前に `bun run db:migrate:local`（リモートなら `db:migrate:remote`）でテーブルを作っておくこと。
// リモートには CLOUDFLARE_ACCOUNT_ID と CLOUDFLARE_API_TOKEN（D1 と R2 の編集権限）が必要。
// packages/db/.env に書いておけば bun が読み込む。
import { parseArgs } from 'node:util'
import { seed } from './index'
import { connectLocal } from './local'
import { connectRemote } from './remote'

const { values } = parseArgs({
  options: {
    remote: { type: 'boolean', default: false },
    yes: { type: 'boolean', default: false },
    'skip-images': { type: 'boolean', default: false },
  },
})

if (values.remote && !values.yes) {
  console.error(
    '⚠️  リモートの既存データ（ランキングを含む）をすべて削除して作り直します。続けるには --yes を付けてください',
  )
  process.exit(1)
}

console.log(`🌱 Seeding ${values.remote ? 'remote' : 'local'} D1 / R2...`)
const { db, images, dispose } = values.remote ? connectRemote() : await connectLocal()
try {
  await seed(db, { images: values['skip-images'] ? undefined : images })
} finally {
  await dispose()
}
