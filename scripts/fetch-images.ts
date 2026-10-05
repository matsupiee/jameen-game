#!/usr/bin/env node

/**
 * Wikipedia から著名人の画像 URL を取得してデータベースに追加するスクリプト
 *
 * 実行方法:
 *   bun scripts/fetch-images.ts
 *
 * 出力:
 *   - celebrities-images.json (画像URL のマッピング)
 *   - celebrities-images.csv (CSVフォーマット)
 */

import { scandalCelebrities, goodCelebrities } from '../src/db/celebrities-data'
import * as fs from 'fs'
import * as path from 'path'

// Wikipedia API を使用して画像 URL を取得
async function fetchWikipediaImage(name: string): Promise<string | null> {
  try {
    // Wikipedia の検索 API を使用
    const searchUrl = new URL('https://ja.wikipedia.org/w/api.php')
    searchUrl.searchParams.set('action', 'query')
    searchUrl.searchParams.set('format', 'json')
    searchUrl.searchParams.set('srsearch', name)
    searchUrl.searchParams.set('srnamespace', '0')
    searchUrl.searchParams.set('srlimit', '1')

    const searchRes = await fetch(searchUrl.toString())
    if (!searchRes.ok) {
      return null
    }

    const searchText = await searchRes.text()
    let searchData: any
    try {
      searchData = JSON.parse(searchText)
    } catch {
      return null
    }

    if (!searchData.query?.search?.[0]) {
      return null
    }

    const pageTitle = searchData.query.search[0].title

    // ページのメタデータを取得して画像URLを探す
    const pageUrl = new URL('https://ja.wikipedia.org/w/api.php')
    pageUrl.searchParams.set('action', 'query')
    pageUrl.searchParams.set('format', 'json')
    pageUrl.searchParams.set('titles', pageTitle)
    pageUrl.searchParams.set('prop', 'pageimages|pageterms')
    pageUrl.searchParams.set('pithumbsize', '250')
    pageUrl.searchParams.set('redirects', '1')

    const pageRes = await fetch(pageUrl.toString())
    if (!pageRes.ok) {
      return null
    }

    const pageText = await pageRes.text()
    let pageData: any
    try {
      pageData = JSON.parse(pageText)
    } catch {
      return null
    }

    const pages = pageData.query?.pages || {}
    for (const pageId in pages) {
      const page = pages[pageId]
      if (page.thumbnail?.source) {
        return page.thumbnail.source
      }
    }

    return null
  } catch (error) {
    return null
  }
}

// Wikidata から画像 URL を取得（バックアップ）
async function fetchWikidataImage(name: string): Promise<string | null> {
  try {
    const searchUrl = new URL('https://www.wikidata.org/w/api.php')
    searchUrl.searchParams.set('action', 'wbsearchentities')
    searchUrl.searchParams.set('search', name)
    searchUrl.searchParams.set('language', 'ja')
    searchUrl.searchParams.set('format', 'json')

    const searchRes = await fetch(searchUrl.toString())
    if (!searchRes.ok) {
      return null
    }

    const searchText = await searchRes.text()
    let searchData: any
    try {
      searchData = JSON.parse(searchText)
    } catch {
      return null
    }

    const entity = searchData.search?.[0]
    if (!entity?.id) {
      return null
    }

    const entityUrl = new URL('https://www.wikidata.org/w/api.php')
    entityUrl.searchParams.set('action', 'wbgetentities')
    entityUrl.searchParams.set('ids', entity.id)
    entityUrl.searchParams.set('props', 'claims')
    entityUrl.searchParams.set('format', 'json')

    const entityRes = await fetch(entityUrl.toString())
    if (!entityRes.ok) {
      return null
    }

    const entityText = await entityRes.text()
    let entityData: any
    try {
      entityData = JSON.parse(entityText)
    } catch {
      return null
    }

    const claims = entityData.entities[entity.id]?.claims || {}
    const imageProps = claims['P18'] || [] // P18 は画像のプロパティ

    if (imageProps.length > 0) {
      const filename = imageProps[0].mainsnak.datavalue.value
      // Commons ファイルから URL を構築
      const encoded = encodeURIComponent(filename.replace(/ /g, '_'))
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`
    }

    return null
  } catch (error) {
    return null
  }
}

async function main() {
  console.log('🖼️  Fetching celebrity images from Wikipedia...\n')

  const allCelebrities = [
    ...scandalCelebrities.map((c) => ({ ...c, name: c.name })),
    ...goodCelebrities.map((c) => ({ ...c, name: c.name })),
  ]

  const results: Array<{
    name: string
    imageUrl: string | null
  }> = []

  // API レート制限を避けるため、順序待ち付きで処理
  for (let i = 0; i < allCelebrities.length; i++) {
    const celebrity = allCelebrities[i]
    // 10人ごとに進捗を表示
    if ((i + 1) % 10 === 0) {
      console.log(`[${i + 1}/${allCelebrities.length}] Processing...`)
    }

    let imageUrl = await fetchWikipediaImage(celebrity.name)

    if (!imageUrl) {
      imageUrl = await fetchWikidataImage(celebrity.name)
    }

    results.push({
      name: celebrity.name,
      imageUrl: imageUrl || null,
    })

    // API への負荷を軽減するため、少し待機
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  // 結果をまとめる
  console.log('\n✅ Image fetching complete!\n')

  const successCount = results.filter((r) => r.imageUrl).length
  console.log(
    `📊 Results: ${successCount}/${results.length} images found (${Math.round((successCount / results.length) * 100)}%)`,
  )

  // 結果を JSON で出力（celebrities-data.ts の更新用）
  const imageMap: Record<string, string | null> = {}
  results.forEach((r) => {
    imageMap[r.name] = r.imageUrl
  })

  // ファイルに保存
  const outputDir = path.dirname(new URL(import.meta.url).pathname)
  const jsonPath = path.join(outputDir, 'celebrities-images.json')
  const csvPath = path.join(outputDir, 'celebrities-images.csv')

  fs.writeFileSync(jsonPath, JSON.stringify(imageMap, null, 2))
  console.log(`\n💾 JSON results saved to: ${jsonPath}`)

  // CSV形式でも出力（スプレッドシート用）
  const csvContent = ['Name,ImageURL', ...results.map((r) => `"${r.name}","${r.imageUrl || ''}"`)]
    .join('\n')
  fs.writeFileSync(csvPath, csvContent)
  console.log(`💾 CSV results saved to: ${csvPath}`)

  console.log('\n📋 Sample image URLs:')
  results
    .filter((r) => r.imageUrl)
    .slice(0, 5)
    .forEach((r) => {
      console.log(`  ${r.name}: ${r.imageUrl}`)
    })
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
