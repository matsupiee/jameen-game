#!/usr/bin/env node

/**
 * Wikipedia ページから直接画像URLを抽出するスクリプト
 *
 * v1 の API 検索ベースから、直接ページアクセスベースに変更
 */

import { scandalCelebrities, goodCelebrities } from '../src/db/celebrities-data'
import * as fs from 'fs'
import * as path from 'path'

// 人物ごとのWikipediaページ名マッピング（手動で対応させる）
const wikipediaPageMappings: Record<string, string> = {
  '清原和博': '清原和博',
  '成宮寛貴': '成宮寛貴',
  'ベッキー': 'ベッキー',
  '川谷絵音': '川谷絵音',
  'ボビー・オロゴン': 'ボビー・オロゴン',
  'ASKA': 'ASKA',
  '沢尻エリカ': '沢尻エリカ',
  '伊勢谷友介': '伊勢谷友介',
  'ピエール瀧': 'ピエール瀧',
  '酒井法子': '酒井法子',
  '槇原敬之': '槇原敬之',
  '永山絢斗': '永山絢斗',
  '綾瀬はるか': '綾瀬はるか',
  '新垣結衣': '新垣結衣',
  '星野源': '星野源',
  '吉高由里子': '吉高由里子',
  '長澤まさみ': '長澤まさみ',
  '石原さとみ': '石原さとみ',
  '菅田将暉': '菅田将暉',
  '小松菜奈': '小松菜奈',
  '神木隆之介': '神木隆之介',
  '芦田愛菜': '芦田愛菜',
  '鈴木福': '鈴木福',
  '天海祐希': '天海祐希',
  '阿部寛': '阿部寛',
  '堺雅人': '堺雅人',
  '菅野美穂': '菅野美穂',
  '北川景子': '北川景子',
  'DAIGO': 'DAIGO',
  '川口春奈': '川口春奈',
  '橋本環奈': '橋本環奈',
  '広瀬すず': '広瀬すず',
  '浜辺美波': '浜辺美波',
  '吉沢亮': '吉沢亮',
  '山﨑賢人': '山崎賢人',
  '松坂桃李': '松坂桃李',
  '戸田恵梨香': '戸田恵梨香',
  '米津玄師': '米津玄師',
  'あいみょん': 'あいみょん',
  '藤井風': '藤井風',
  '福山雅治': '福山雅治',
  'MISIA': 'MISIA',
  '平井堅': '平井堅',
}

async function fetchImageFromWikipediaPage(pageTitle: string): Promise<string | null> {
  try {
    // Wikipedia API でページの画像を取得
    const url = new URL('https://ja.wikipedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('titles', pageTitle)
    url.searchParams.set('prop', 'pageimages')
    url.searchParams.set('pithumbsize', '300')

    const res = await fetch(url.toString())
    if (!res.ok) return null

    const text = await res.text()
    let data: any
    try {
      data = JSON.parse(text)
    } catch {
      return null
    }

    const pages = data.query?.pages || {}
    for (const pageId in pages) {
      const page = pages[pageId]
      if (page.thumbnail?.source) {
        return page.thumbnail.source
      }
    }

    return null
  } catch {
    return null
  }
}

async function main() {
  console.log('🖼️  Fetching celebrity images (v2 - Direct page access)...\n')

  const allCelebrities = [
    ...scandalCelebrities.map((c) => ({ ...c, name: c.name })),
    ...goodCelebrities.map((c) => ({ ...c, name: c.name })),
  ]

  const results: Array<{ name: string; imageUrl: string | null }> = []
  let successCount = 0

  for (let i = 0; i < allCelebrities.length; i++) {
    const celebrity = allCelebrities[i]

    // 10人ごとに進捗を表示
    if ((i + 1) % 20 === 0) {
      console.log(`[${i + 1}/${allCelebrities.length}] Processing... (${successCount} found)`)
    }

    // Wikipedia ページ名を取得（マッピングから、または名前そのままを使用）
    const pageTitle = wikipediaPageMappings[celebrity.name] || celebrity.name

    let imageUrl = await fetchImageFromWikipediaPage(pageTitle)

    if (imageUrl) {
      successCount++
    }

    results.push({
      name: celebrity.name,
      imageUrl: imageUrl || null,
    })

    // レート制限対策
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  console.log('\n✅ Image fetching complete!')

  const successRate = Math.round((successCount / results.length) * 100)
  console.log(`📊 Results: ${successCount}/${results.length} images found (${successRate}%)`)

  // 結果を JSON で出力
  const imageMap: Record<string, string | null> = {}
  results.forEach((r) => {
    imageMap[r.name] = r.imageUrl
  })

  const outputDir = path.dirname(new URL(import.meta.url).pathname)
  const jsonPath = path.join(outputDir, 'celebrities-images.json')
  const csvPath = path.join(outputDir, 'celebrities-images.csv')

  fs.writeFileSync(jsonPath, JSON.stringify(imageMap, null, 2))
  console.log(`\n💾 JSON results saved to: ${jsonPath}`)

  // CSV形式でも出力
  const csvContent = ['Name,ImageURL', ...results.map((r) => `"${r.name}","${r.imageUrl || ''}"`)]
    .join('\n')
  fs.writeFileSync(csvPath, csvContent)
  console.log(`💾 CSV results saved to: ${csvPath}`)

  // 成功した例を表示
  console.log('\n📋 Successfully fetched images:')
  results
    .filter((r) => r.imageUrl)
    .slice(0, 10)
    .forEach((r) => {
      console.log(`  ✓ ${r.name}`)
    })

  if (successCount === 0) {
    console.log(
      '\n⚠️  No images were successfully fetched. This may indicate:',
    )
    console.log('   - Wikipedia API connectivity issues')
    console.log('   - Person names not matching Wikipedia page titles')
    console.log('   - Wikipedia pages without images')
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
