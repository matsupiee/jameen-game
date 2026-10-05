import { getPlatformProxy } from 'wrangler'
import { createDb } from '../src'
import type { ImageStore } from './images'
import { WEB_DIR } from './wrangler-config'

/** apps/web の `bun run dev` と同じローカル D1・R2 につなぐ */
export async function connectLocal() {
  const { env, dispose } = await getPlatformProxy<{ DB: D1Database; IMAGES: R2Bucket }>({
    configPath: `${WEB_DIR}wrangler.jsonc`,
    // persist を省略すると実行ディレクトリ（packages/db）に作られてしまうので、web と同じ場所を指す
    persist: { path: `${WEB_DIR}.wrangler/state/v3` },
  })
  const images: ImageStore = {
    exists: async (key) => (await env.IMAGES.head(key)) !== null,
    put: async (key, body, contentType) => {
      await env.IMAGES.put(key, body, { httpMetadata: { contentType } })
    },
  }
  return { db: createDb(env.DB), images, dispose }
}
