#!/usr/bin/env node

/**
 * Wikidata + Wikipedia から全員分の著名人画像URLを確実に取得
 *
 * Wikidata が最も包括的な画像情報を持つため、これをメイン戦略とする
 */

import { scandalCelebrities, goodCelebrities } from '../src/db/celebrities-data'
import * as fs from 'fs'
import * as path from 'path'

const existingImages = JSON.parse(
  fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'celebrities-images.json'), 'utf-8'),
) as Record<string, string | null>

const allCelebrities = [
  ...scandalCelebrities.map((c) => ({ ...c, name: c.name })),
  ...goodCelebrities.map((c) => ({ ...c, name: c.name })),
]

// Wikidata から画像を取得（英語・日本語両方で試す）
async function fetchFromWikidata(name: string, language: string = 'ja'): Promise<string | null> {
  try {
    // Wikidata エンティティを検索
    const searchUrl = new URL('https://www.wikidata.org/w/api.php')
    searchUrl.searchParams.set('action', 'wbsearchentities')
    searchUrl.searchParams.set('search', name)
    searchUrl.searchParams.set('language', language)
    searchUrl.searchParams.set('format', 'json')
    searchUrl.searchParams.set('type', 'item')

    const searchRes = await fetch(searchUrl.toString())
    if (!searchRes.ok) return null

    const searchText = await searchRes.text()
    let searchData: any
    try {
      searchData = JSON.parse(searchText)
    } catch {
      return null
    }

    const entity = searchData.search?.[0]
    if (!entity?.id) return null

    // エンティティの詳細情報を取得
    const entityUrl = new URL('https://www.wikidata.org/w/api.php')
    entityUrl.searchParams.set('action', 'wbgetentities')
    entityUrl.searchParams.set('ids', entity.id)
    entityUrl.searchParams.set('props', 'claims|labels')
    entityUrl.searchParams.set('format', 'json')

    const entityRes = await fetch(entityUrl.toString())
    if (!entityRes.ok) return null

    const entityText = await entityRes.text()
    let entityData: any
    try {
      entityData = JSON.parse(entityText)
    } catch {
      return null
    }

    const claims = entityData.entities[entity.id]?.claims || {}

    // P18: 画像
    const imageProps = claims['P18']
    if (imageProps?.length > 0) {
      const filename = imageProps[0].mainsnak.datavalue.value
      const encoded = encodeURIComponent(filename.replace(/ /g, '_'))
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=300`
    }

    // P109: 署名画像（存在する場合）
    const signatureProps = claims['P109']
    if (signatureProps?.length > 0) {
      const filename = signatureProps[0].mainsnak.datavalue.value
      const encoded = encodeURIComponent(filename.replace(/ /g, '_'))
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=300`
    }

    return null
  } catch {
    return null
  }
}

// Wikipedia の日本語ページから画像を取得
async function fetchFromWikipediaJP(name: string): Promise<string | null> {
  try {
    const url = new URL('https://ja.wikipedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('titles', name)
    url.searchParams.set('prop', 'pageimages')
    url.searchParams.set('pithumbsize', '300')

    const res = await fetch(url.toString())
    if (!res.ok) return null

    const text = await res.text()
    const data = JSON.parse(text)

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
  console.log('🖼️  Fetching ALL celebrity images (Wikidata-first strategy)...\n')

  const results: Record<string, string | null> = { ...existingImages }
  let totalSuccess = Object.values(results).filter((v) => v !== null).length
  let newlyFetched = 0

  for (let i = 0; i < allCelebrities.length; i++) {
    const celebrity = allCelebrities[i]

    // 既に取得済みならスキップ
    if (results[celebrity.name]) {
      continue
    }

    if ((i + 1) % 30 === 0 || (i + 1) === allCelebrities.length) {
      console.log(
        `[${i + 1}/${allCelebrities.length}] Processing... (${totalSuccess} total, ${newlyFetched} newly fetched)`,
      )
    }

    // 1. Wikidata (日本語)から試す
    let imageUrl = await fetchFromWikidata(celebrity.name, 'ja')

    // 2. 失敗したら Wikidata (英語)から試す
    if (!imageUrl) {
      imageUrl = await fetchFromWikidata(celebrity.name, 'en')
    }

    // 3. 失敗したら Wikipedia JP から試す
    if (!imageUrl) {
      imageUrl = await fetchFromWikipediaJP(celebrity.name)
    }

    if (imageUrl) {
      results[celebrity.name] = imageUrl
      totalSuccess++
      newlyFetched++
    } else {
      results[celebrity.name] = null
    }

    // レート制限対策
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  console.log('\n✅ Image fetching complete!')
  const successRate = Math.round((totalSuccess / allCelebrities.length) * 100)
  console.log(`📊 Total results: ${totalSuccess}/${allCelebrities.length} (${successRate}%)`)
  console.log(`📈 Newly fetched: ${newlyFetched}`)

  // ファイルに保存
  const outputDir = path.dirname(new URL(import.meta.url).pathname)
  const jsonPath = path.join(outputDir, 'celebrities-images.json')

  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))
  console.log(`\n💾 Results saved to: ${jsonPath}`)

  // 失敗した人物をリスト
  const failed = Object.entries(results).filter(([_, url]) => url === null)
  if (failed.length > 0) {
    console.log(`\n⚠️  Still failed to fetch (${failed.length}):`)
    failed.slice(0, 30).forEach(([name]) => {
      console.log(`   • ${name}`)
    })
    if (failed.length > 30) {
      console.log(`   ... and ${failed.length - 30} more`)
    }

    // 失敗リストをファイルに保存
    const failedPath = path.join(outputDir, 'celebrities-images-failed.txt')
    fs.writeFileSync(failedPath, failed.map(([name]) => name).join('\n'))
    console.log(`\n📝 Failed list saved to: ${failedPath}`)
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
