#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

const csvPath = '/Users/hiromu/Downloads/celebrity_face_image_urls_filled.csv'
const imageMapPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'celebrities-images.json',
)

console.log('📖 Reading CSV file...')
const csvData = fs.readFileSync(csvPath, 'utf-8')
const lines = csvData.trim().split('\n').slice(1) // Skip header

const records = lines.map((line) => {
  const parts = line.split(',', 2)
  if (parts.length < 2) return null
  return {
    name: parts[0].trim(),
    direct_image_url: parts[1].trim(),
  }
}).filter((r): r is NonNullable<typeof r> => r !== null)

console.log('🔄 Loading existing image map...')
const imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf-8')) as Record<
  string,
  string | null
>

let merged = 0
let updated = 0

console.log('🔀 Merging CSV data...')
for (const record of records) {
  const name = record.name?.trim()
  const imageUrl = record.direct_image_url?.trim()

  if (!name || !imageUrl) continue

  if (imageMap[name] === null) {
    imageMap[name] = imageUrl
    merged++
  } else if (imageMap[name] && imageMap[name] !== imageUrl) {
    // 既に URL がある場合は更新しない
    updated++
  }
}

console.log(`\n✅ Merge complete!`)
console.log(`📊 Merged (null → URL): ${merged}`)
console.log(`📝 Already had URL: ${updated}`)

const totalImages = Object.values(imageMap).filter((v) => v !== null).length
const successRate = Math.round((totalImages / Object.keys(imageMap).length) * 100)

console.log(`\n📈 Final success rate: ${totalImages}/${Object.keys(imageMap).length} (${successRate}%)`)

fs.writeFileSync(imageMapPath, JSON.stringify(imageMap, null, 2))
console.log(`\n💾 Updated: ${imageMapPath}`)
