import { unstable_readConfig } from 'wrangler'

export const WEB_DIR = new URL('../../../apps/web/', import.meta.url).pathname

/** apps/web/wrangler.jsonc から D1 の database_id と R2 のバケット名を読む */
export function readBindings() {
  // wrangler の型定義からは Config 型を引けないので、使う部分だけ型を付ける
  const config: {
    d1_databases: { binding: string; database_id?: string }[]
    r2_buckets: { binding: string; bucket_name?: string }[]
  } = unstable_readConfig({ config: `${WEB_DIR}wrangler.jsonc` }, { hideWarnings: true })
  const databaseId = config.d1_databases.find((d) => d.binding === 'DB')?.database_id
  const bucketName = config.r2_buckets.find((b) => b.binding === 'IMAGES')?.bucket_name
  if (!databaseId || /^0{8}-/.test(databaseId)) {
    throw new Error(
      'apps/web/wrangler.jsonc の database_id に `wrangler d1 create jameen-game` で発行した ID を設定してください',
    )
  }
  if (!bucketName) throw new Error('apps/web/wrangler.jsonc に R2 バケット（IMAGES）がありません')
  return { databaseId, bucketName }
}
