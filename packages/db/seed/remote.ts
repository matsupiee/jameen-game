// Cloudflare の API 経由でリモートの D1・R2 につなぐ。
// CLOUDFLARE_ACCOUNT_ID と CLOUDFLARE_API_TOKEN（D1 と R2 の編集権限）が必要。
import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from '../src/schema'
import type { ImageStore } from './images'
import { readBindings } from './wrangler-config'

type D1RawResponse = {
  success: boolean
  errors: { message: string }[]
  result: { results: { rows: unknown[][] } }[]
}

export function connectRemote() {
  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = process.env
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID と CLOUDFLARE_API_TOKEN を設定してください')
  }
  const { databaseId, bucketName } = readBindings()
  const api = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}`
  const auth = { Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}` }

  // DOCS: https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/raw/
  const db = drizzle(
    async (sql, params, method) => {
      const res = await fetch(`${api}/d1/database/${databaseId}/raw`, {
        method: 'POST',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params }),
      })
      const body = (await res.json()) as D1RawResponse
      if (!body.success) throw new Error(body.errors.map((e) => e.message).join('\n'))
      const rows = body.result[0]?.results.rows ?? []
      return { rows: method === 'get' ? (rows[0] ?? []) : rows }
    },
    { schema },
  )

  // DOCS: https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/
  const objectUrl = (key: string) => `${api}/r2/buckets/${bucketName}/objects/${key}`
  const images: ImageStore = {
    exists: async (key) => {
      const res = await fetch(objectUrl(key), { headers: auth })
      await res.body?.cancel()
      if (res.status === 404) return false
      if (!res.ok) throw new Error(`R2 の確認に失敗しました (HTTP ${res.status})`)
      return true
    },
    put: async (key, body, contentType) => {
      const res = await fetch(objectUrl(key), {
        method: 'PUT',
        headers: { ...auth, 'Content-Type': contentType },
        body,
      })
      if (!res.ok)
        throw new Error(`R2 への保存に失敗しました (HTTP ${res.status}): ${await res.text()}`)
    },
  }

  return { db, images, dispose: async () => {} }
}
