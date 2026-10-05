#!/usr/bin/env node

/**
 * celebrities-images.json の データを celebrities-data.ts に統合するスクリプト（v2）
 *
 * celebrities-data.ts を再構築して、取得した画像URLを含める
 */

import { scandalCelebrities, goodCelebrities } from '../src/db/celebrities-data'
import * as fs from 'fs'
import * as path from 'path'

const jsonPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'celebrities-images.json',
)

// celebrities-images.json を読込
const imageMapping = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as Record<string, string | null>

console.log('🔄 Integrating image URLs...\n')

let updated = 0

// スキャンダル側にimageUrlを追加
const updatedScandalCelebrities = scandalCelebrities.map((c) => ({
  ...c,
  imageUrl: imageMapping[c.name] || undefined,
}))

// クリーン側にimageUrlを追加
const updatedGoodCelebrities = goodCelebrities.map((c) => ({
  ...c,
  imageUrl: imageMapping[c.name] || undefined,
}))

// TypeScript コードを生成
const scandalCode = updatedScandalCelebrities
  .map(
    (c) => `  {
    name: '${c.name.replace(/'/g, "\\'")}',
    profile: '${c.profile.replace(/'/g, "\\'")}',
    category: '${c.category}' as const,
    scandalSummary: '${c.scandalSummary?.replace(/'/g, "\\'") || ''}',
    sourceUrl: '${c.sourceUrl?.replace(/'/g, "\\'") || ''}',${c.imageUrl ? `\n    imageUrl: '${c.imageUrl}',` : ''}
  }`,
  )
  .join(',\n')

const goodCode = updatedGoodCelebrities
  .map(
    (c) => `  { name: '${c.name.replace(/'/g, "\\'")}', profile: '${c.profile?.replace(/'/g, "\\'") || ''}',${c.imageUrl ? ` imageUrl: '${c.imageUrl}'` : ''} }`,
  )
  .join(',\n')

const output = `// スキャンダル側のデータ（100人）
export const scandalCelebrities = [
${scandalCode}
] as const;

// クリーン側のデータ（100人）
export const goodCelebrities = [
${goodCode}
] as const;
`

const dataPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../src/db/celebrities-data.ts')
fs.writeFileSync(dataPath, output)

// 成功数をカウント
const successCount = Object.values(imageMapping).filter((v) => v !== null).length
console.log(`✅ Integration complete!`)
console.log(`📊 ${successCount} images included in the data`)
console.log(`💾 Updated: ${dataPath}`)
