#!/usr/bin/env node

/**
 * celebrities-images.json の データを celebrities-data.ts に統合するスクリプト
 */

import * as fs from 'fs'
import * as path from 'path'

const jsonPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'celebrities-images.json')
const dataPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '../src/db/celebrities-data.ts',
)

// celebrities-images.json を読込
const imageMapping = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as Record<string, string | null>

// celebrities-data.ts を読込
let dataContent = fs.readFileSync(dataPath, 'utf-8')

console.log('🔄 Integrating image URLs into celebrities-data.ts...\n')

let updated = 0
let skipped = 0

// 各人物について imageUrl を更新
for (const [name, imageUrl] of Object.entries(imageMapping)) {
  if (!imageUrl) {
    skipped++
    continue
  }

  // name を含むエントリを探す
  const nameRegex = new RegExp(`name: ['"]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`)
  if (!nameRegex.test(dataContent)) {
    console.log(`⚠️  Not found: ${name}`)
    continue
  }

  // sourceUrl の次の行に imageUrl フィールドを追加
  // または既存の imageUrl を更新
  const sourceUrlPattern = new RegExp(`(name: ['"]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"],\\s*profile: .+?,\\s*category: 'good',)`)

  if (sourceUrlPattern.test(dataContent)) {
    // good カテゴリの人物（画像URLなし）
    dataContent = dataContent.replace(
      sourceUrlPattern,
      `$1\n    imageUrl: '${imageUrl}',`,
    )
    updated++
    console.log(`✅ Updated: ${name}`)
  } else {
    // scandal/criminal カテゴリの人物（既に scandal_summary と sourceUrl がある）
    const fullPattern = new RegExp(
      `(name: ['"]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"],.*?sourceUrl: '.*?',)(\\s*})`,
      's',
    )
    if (fullPattern.test(dataContent)) {
      dataContent = dataContent.replace(
        fullPattern,
        `$1\n    imageUrl: '${imageUrl}',\n  $2`,
      )
      updated++
      console.log(`✅ Updated: ${name}`)
    }
  }
}

// 更新されたファイルを保存
fs.writeFileSync(dataPath, dataContent)

console.log(`\n📊 Results: ${updated} updated, ${skipped} skipped (no image URL)`)
console.log(`💾 Updated: ${dataPath}`)
