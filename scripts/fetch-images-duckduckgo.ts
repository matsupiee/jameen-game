#!/usr/bin/env node

/**
 * DuckDuckGo 画像検索から著名人の画像URLを取得
 * DuckDuckGo は Google より簡単にスクレイピング可能
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

console.log(`📸 Fetching images for ${failedList.length} celebrities from DuckDuckGo...\n`)

let updated = 0
let failed = 0

for (let i = 0; i < failedList.length; i++) {
  const name = failedList[i]

  if ((i + 1) % 20 === 0 || (i + 1) === failedList.length) {
    console.log(`[${i + 1}/${failedList.length}] Processing... (${updated} updated, ${failed} failed)`)
  }

  try {
    // DuckDuckGo Image Search API
    const query = encodeURIComponent(name)
    const apiUrl = `https://duckduckgo.com/?q=${query}&iax=images&ia=images`

    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    })

    if (!res.ok) {
      failed++
      continue
    }

    const html = await res.text()

    // DuckDuckGo の画像データを JSON から抽出
    // DDG は window.ddg_data に画像情報を保存している
    const jsonMatch = html.match(/"image":"([^"]+)"/i)
    if (jsonMatch && jsonMatch[1]) {
      let imageUrl = jsonMatch[1]
      // エスケープされた URL をデコード
      imageUrl = imageUrl.replace(/\\\//g, '/')

      if (imageUrl.startsWith('http')) {
        imageMap[name] = imageUrl
        updated++
        continue
      }
    }

    // 別のパターン: og:image メタタグから抽出
    const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
    if (ogMatch && ogMatch[1]) {
      imageMap[name] = ogMatch[1]
      updated++
      continue
    }

    // Bing Image Search API を試す
    const bingQuery = encodeURIComponent(`${name}`)
    const bingUrl = `https://www.bing.com/images/search?q=${bingQuery}`

    const bingRes = await fetch(bingUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (bingRes.ok) {
      const bingHtml = await bingRes.text()
      const bingMatch = bingHtml.match(/"murl":"([^"]+\.(?:jpg|jpeg|png|gif|webp))"/i)
      if (bingMatch && bingMatch[1]) {
        const bingImageUrl = bingMatch[1].replace(/\\\//g, '/')
        if (bingImageUrl.startsWith('http')) {
          imageMap[name] = bingImageUrl
          updated++
          continue
        }
      }
    }

    failed++
  } catch (error) {
    failed++
  }

  // レート制限対策
  await new Promise((resolve) => setTimeout(resolve, 300))
}

console.log(`\n✅ Image search complete!`)
console.log(`📊 Updated: ${updated}/${failedList.length}`)
console.log(`❌ Failed: ${failed}/${failedList.length}`)

// 最終的な成功率を計算
const totalImages = Object.values(imageMap).filter((v) => v !== null).length
const successRate = Math.round((totalImages / Object.keys(imageMap).length) * 100)
console.log(`\n📈 Final success rate: ${totalImages}/${Object.keys(imageMap).length} (${successRate}%)`)

// ファイルに保存
fs.writeFileSync(imageMapPath, JSON.stringify(imageMap, null, 2))
console.log(`\n💾 Updated: ${imageMapPath}`)

// 残りの失敗リストを更新
const stillFailed = Object.entries(imageMap)
  .filter(([_, url]) => url === null)
  .map(([name]) => name)

if (stillFailed.length > 0) {
  fs.writeFileSync(failedListPath, stillFailed.join('\n'))
  console.log(`📝 Still failing: ${stillFailed.length} celebrities`)
}
