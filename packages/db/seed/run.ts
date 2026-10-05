// ローカル D1（apps/web の `bun run dev` が使うもの）にシードデータを投入する。
//
//   bun seed
//
// 事前に `bun run db:migrate:local` でテーブルを作っておくこと。
import { getPlatformProxy } from 'wrangler'
import { createDb } from '../src'
import { seed } from './index'

const webDir = new URL('../../../apps/web/', import.meta.url).pathname

const { env, dispose } = await getPlatformProxy<{ DB: D1Database }>({
  configPath: `${webDir}wrangler.jsonc`,
  // persist を省略すると実行ディレクトリ（packages/db）に作られてしまうので、web と同じ場所を指す
  persist: { path: `${webDir}.wrangler/state/v3` },
})

try {
  await seed(createDb(env.DB))
} finally {
  await dispose()
}
