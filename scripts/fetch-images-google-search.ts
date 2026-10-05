#!/usr/bin/env node

/**
 * Google 画像検索から著名人の画像URLを取得するスクリプト
 *
 * 既に取得済みのもの以外、Google Images から取得を試みる
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

console.log(`📸 Fetching images for ${failedList.length} remaining celebrities from Google Images...\n`)

let updated = 0
let failed = 0

for (let i = 0; i < failedList.length; i++) {
  const name = failedList[i]

  if ((i + 1) % 20 === 0 || (i + 1) === failedList.length) {
    console.log(`[${i + 1}/${failedList.length}] Processing... (${updated} updated, ${failed} failed)`)
  }

  // Google Images 検索のURL を構築
  const query = encodeURIComponent(`${name} wikipedia`)
  const googleImagesUrl = `https://www.google.com/search?q=${query}&tbm=isch&safe=off`

  try {
    // Google Images のページを fetch
    const res = await fetch(googleImagesUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!res.ok) {
      failed++
      continue
    }

    const html = await res.text()

    // JSON-LD形式の画像データを抽出
    const jsonMatch = html.match(/"image":"([^"]+)"/g)
    if (jsonMatch && jsonMatch.length > 0) {
      // 最初の画像URLを取得
      const urlMatch = jsonMatch[0].match(/"image":"([^"]+)"/)
      if (urlMatch && urlMatch[1]) {
        let imageUrl = urlMatch[1]

        // URLをデコード
        try {
          imageUrl = JSON.parse(`"${imageUrl}"`)
        } catch {
          // Already decoded
        }

        // 有効そうなURLかチェック
        if (imageUrl.startsWith('http') && imageUrl.includes('.')) {
          imageMap[name] = imageUrl
          updated++
        } else {
          failed++
        }
      }
    } else {
      // 別の方法: script タグから画像データを抽出
      const scriptMatch = html.match(/,"ou":"([^"]+)"/)
      if (scriptMatch && scriptMatch[1]) {
        imageMap[name] = scriptMatch[1]
        updated++
      } else {
        failed++
      }
    }
  } catch (error) {
    failed++
  }

  // レート制限と IP ブロック対策
  await new Promise((resolve) => setTimeout(resolve, 500))
}

console.log(`\n✅ Google Images search complete!`)
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
