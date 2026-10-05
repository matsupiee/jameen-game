#!/usr/bin/env node

/**
 * 複数ソースから画像URLを取得（最終的な試み）
 * - ニュースサイト
 * - YouTube チャンネルページ
 * - IMDb
 * - Pixabay / Unsplash
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
const failedList = fs
  .readFileSync(failedListPath, 'utf-8')
  .split('\n')
  .filter((line) => line.trim())

console.log(`🔍 Attempting multi-source extraction for ${failedList.length} remaining celebrities...\n`)

let updated = 0
let still_failed = 0

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

    // og:image
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
    if (ogMatch && ogMatch[1] && ogMatch[1].startsWith('http')) {
      return ogMatch[1]
    }

    // twitter:image
    const twitterMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i)
    if (twitterMatch && twitterMatch[1] && twitterMatch[1].startsWith('http')) {
      return twitterMatch[1]
    }

    return null
  } catch {
    return null
  }
}

async function fetchImageForCelebrity(name: string): Promise<string | null> {
  // 既に取得済みならスキップ
  if (imageMap[name]) return null

  // 1. YouTube
  let imageUrl = await extractOgImage(`https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`)
  if (imageUrl) return imageUrl

  // 2. IMDb
  imageUrl = await extractOgImage(`https://www.imdb.com/find?q=${encodeURIComponent(name)}&s=nm`)
  if (imageUrl) return imageUrl

  // 3. Twitter
  imageUrl = await extractOgImage(`https://twitter.com/search?q=${encodeURIComponent(name)}&f=user`)
  if (imageUrl) return imageUrl

  // 4. Instagram
  try {
    imageUrl = await extractOgImage(`https://www.instagram.com/web/search/topsearch/?query=${encodeURIComponent(name)}`)
    if (imageUrl) return imageUrl
  } catch {}

  // 5. Pixabay
  imageUrl = await extractOgImage(
    `https://pixabay.com/images/search/${encodeURIComponent(name)}/`,
  )
  if (imageUrl) return imageUrl

  // 6. ニュース記事
  imageUrl = await extractOgImage(`https://www.google.com/news/search?q=${encodeURIComponent(name)}`)
  if (imageUrl) return imageUrl

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
    await new Promise((resolve) => setTimeout(resolve, 150))
  }

  console.log(`\n✅ Multi-source extraction complete!`)
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
    console.log(`\n🎉 ALL CELEBRITIES HAVE IMAGES! 🎉`)
  }
}

main().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
