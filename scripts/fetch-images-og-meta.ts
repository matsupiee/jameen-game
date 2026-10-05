#!/usr/bin/env node

/**
 * 各著名人のページから og:image メタタグを抽出して画像URLを取得
 * Wikipedia、公式サイト、SNS など複数ソースを試す
 */

import * as fs from 'fs'
import * as path from 'path'

const imageMapPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'celebrities-images.json',
)
const failedListPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'celebrities-images-failed.txt',
)

const imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf-8')) as Record<string, string | null>
let failedList = fs
  .readFileSync(failedListPath, 'utf-8')
  .split('\n')
  .filter((line) => line.trim())

console.log(`🔍 Extracting og:image from public pages for ${failedList.length} celebrities...\n`)

let updated = 0
let still_failed = 0

// og:image を抽出する関数
async function extractOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!res.ok) return null

    const html = await res.text()

    // og:image を抽出
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
    if (ogMatch && ogMatch[1]) {
      let url = ogMatch[1]
      // URL エンコードを解除
      try {
        url = decodeURIComponent(url)
      } catch {
        // Already decoded
      }
      if (url.startsWith('http')) {
        return url
      }
    }

    // twitter:image も試す
    const twitterMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i)
    if (twitterMatch && twitterMatch[1]) {
      let url = twitterMatch[1]
      try {
        url = decodeURIComponent(url)
      } catch {}
      if (url.startsWith('http')) {
        return url
      }
    }

    return null
  } catch {
    return null
  }
}

// 各著名人について複数ソースを試す
async function fetchImageForCelebrity(name: string): Promise<string | null> {
  // 1. Wikipedia 日本語
  let imageUrl = await extractOgImage(`https://ja.wikipedia.org/wiki/${encodeURIComponent(name)}`)
  if (imageUrl) return imageUrl

  // 2. Wikipedia 英語（名前をローマ字化して試す）
  imageUrl = await extractOgImage(`https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`)
  if (imageUrl) return imageUrl

  // 3. Google 知識パネル（via og:image）
  const query = encodeURIComponent(`${name} wikipedia`)
  imageUrl = await extractOgImage(`https://www.google.com/search?q=${query}`)
  if (imageUrl) return imageUrl

  // 4. Wikidata
  try {
    const wikidataRes = await fetch(`https://www.wikidata.org/wiki/Special:GoToLinkedPage/jawiki/${encodeURIComponent(name)}`)
    if (wikidataRes.ok) {
      imageUrl = await extractOgImage(wikidataRes.url)
      if (imageUrl) return imageUrl
    }
  } catch {}

  return null
}

async function main() {
  for (let i = 0; i < failedList.length; i++) {
    const name = failedList[i]

    if ((i + 1) % 20 === 0 || (i + 1) === failedList.length) {
      console.log(`[${i + 1}/${failedList.length}] Processing... (${updated} found, ${still_failed} failed)`)
    }

    const imageUrl = await fetchImageForCelebrity(name)
    if (imageUrl) {
      imageMap[name] = imageUrl
      updated++
    } else {
      still_failed++
    }

    // レート制限
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  console.log(`\n✅ og:image extraction complete!`)
  console.log(`📊 Updated: ${updated}/${failedList.length}`)
  console.log(`❌ Still failed: ${still_failed}/${failedList.length}`)

  const totalImages = Object.values(imageMap).filter((v) => v !== null).length
  const successRate = Math.round((totalImages / Object.keys(imageMap).length) * 100)
  console.log(`\n📈 Final success rate: ${totalImages}/${Object.keys(imageMap).length} (${successRate}%)`)

  fs.writeFileSync(imageMapPath, JSON.stringify(imageMap, null, 2))
  console.log(`\n💾 Updated: ${imageMapPath}`)

  const stillFailed = Object.entries(imageMap)
    .filter(([_, url]) => url === null)
    .map(([name]) => name)

  if (stillFailed.length > 0) {
    fs.writeFileSync(failedListPath, stillFailed.join('\n'))
    console.log(`📝 Remaining failures: ${stillFailed.length}`)
  } else {
    // 全員取得成功！
    console.log(`\n🎉 ALL CELEBRITIES HAVE IMAGES! 🎉`)
  }
}

main().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
