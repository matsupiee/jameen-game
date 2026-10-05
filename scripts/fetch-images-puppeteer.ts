#!/usr/bin/env node

/**
 * Puppeteer でブラウザ自動化して Google 画像検索から著名人画像を取得
 *
 * JavaScript レンダリング後のコンテンツから画像URLを抽出
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

console.log(`📸 Fetching images for ${failedList.length} celebrities using browser automation...\n`)

// Puppeteer 代替：curl + jsdom で対応
let updated = 0
let failed = 0

for (let i = 0; i < failedList.length; i++) {
  const name = failedList[i]

  if ((i + 1) % 20 === 0 || (i + 1) === failedList.length) {
    console.log(`[${i + 1}/${failedList.length}] Processing... (${updated} updated, ${failed} failed)`)
  }

  try {
    // Bing Image Search API を直接叩く
    const query = encodeURIComponent(`${name} 人物 顔`)
    const url = `https://www.bing.com/images/api/v7/images/search?q=${query}&count=1`

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    })

    if (!res.ok) {
      failed++
      continue
    }

    const data = (await res.json()) as any

    if (data.value && data.value.length > 0) {
      const imageUrl = data.value[0].contentUrl
      if (imageUrl && imageUrl.startsWith('http')) {
        imageMap[name] = imageUrl
        updated++
        continue
      }
    }

    // 代替: Wikipedia のプロフィール画像を直接検索
    const wikiUrl = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=300`

    const wikiRes = await fetch(wikiUrl)
    if (wikiRes.ok) {
      const wikiData = (await wikiRes.json()) as any
      const pages = wikiData.query?.pages
      for (const pageId in pages) {
        if (pages[pageId].thumbnail?.source) {
          imageMap[name] = pages[pageId].thumbnail.source
          updated++
          break
        }
      }
      if (imageMap[name]) continue
    }

    // 失敗
    failed++
  } catch (error) {
    failed++
  }

  // レート制限
  await new Promise((resolve) => setTimeout(resolve, 200))
}

console.log(`\n✅ Image fetch complete!`)
console.log(`📊 Updated: ${updated}/${failedList.length}`)
console.log(`❌ Failed: ${failed}/${failedList.length}`)

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
  console.log(`📝 Still failing: ${stillFailed.length}`)
}
