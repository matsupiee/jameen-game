// 芸能人の画像を元の URL からダウンロードして R2 に保存する。
// R2 のキーはダウンロード元 URL のハッシュなので、保存ずみの画像は再ダウンロードしない。
// 保存した画像は apps/web の /images/$ ルートが配信する。

export type ImageStore = {
  exists(key: string): Promise<boolean>
  put(key: string, body: ArrayBuffer, contentType: string): Promise<void>
}

const KEY_PREFIX = 'celebrities/'

// apps/web/src/routes/images/$.ts が R2 のキーをこのパスの後ろで受け取る
const ROUTE_PREFIX = '/images/'

const CONCURRENCY = 8

// User-Agent がないと Wikimedia などに拒否される
const USER_AGENT = 'jameen-game-seed/1.0 (https://github.com/matsupiee/jameen-game)'

async function keyFor(sourceUrl: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(sourceUrl))
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
  return `${KEY_PREFIX}${hex.slice(0, 32)}`
}

async function download(sourceUrl: string) {
  const res = await fetch(sourceUrl, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.startsWith('image/')) throw new Error(`画像ではありません (${contentType})`)
  return { body: await res.arrayBuffer(), contentType }
}

/**
 * ダウンロード元 URL → 配信パスの対応を返す。
 * 取得できなかった画像は対応に含めない（その芸能人は画像なしになる）。
 */
export async function storeImages(store: ImageStore, sourceUrls: readonly string[]) {
  const unique = [...new Set(sourceUrls)]
  const paths = new Map<string, string>()
  let uploaded = 0
  const failed: string[] = []

  let next = 0
  const worker = async () => {
    while (next < unique.length) {
      const sourceUrl = unique[next++]!
      const key = await keyFor(sourceUrl)
      try {
        if (!(await store.exists(key))) {
          const { body, contentType } = await download(sourceUrl)
          await store.put(key, body, contentType)
          uploaded++
        }
        paths.set(sourceUrl, `${ROUTE_PREFIX}${key}`)
      } catch (e) {
        failed.push(`${sourceUrl}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  console.log(
    `🖼️  Images: ${paths.size - uploaded} already stored, ${uploaded} uploaded, ${failed.length} failed`,
  )
  for (const f of failed) console.warn(`   ⚠️  ${f}`)
  return paths
}
