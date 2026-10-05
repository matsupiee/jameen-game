#!/usr/bin/env node

/**
 * celebrities-images.json から画像URL を celebrities テーブルに更新するスクリプト
 *
 * 前提条件:
 *   1. scripts/fetch-images.ts を実行して celebrities-images.json を生成
 *   2. データベースが初期化されている
 *
 * 実行方法:
 *   bun scripts/update-images.ts
 */

import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { celebrities } from '../src/db/schema'
import { getDb } from '../src/server/db'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
  // 画像URL のマッピングを読み込み
  const imageMappingPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'celebrities-images.json')

  if (!fs.existsSync(imageMappingPath)) {
    console.error('❌ celebrities-images.json not found!')
    console.error(`   First run: bun scripts/fetch-images.ts`)
    process.exit(1)
  }

  const imageMapping = JSON.parse(fs.readFileSync(imageMappingPath, 'utf-8')) as Record<string, string | null>

  console.log('🖼️  Updating celebrity images in database...\n')

  // Cloudflare Workers 環境でのみ実行可能
  if (typeof globalThis !== 'undefined' && 'DB' in globalThis) {
    const db = drizzle(globalThis.DB as any)

    let updated = 0
    let skipped = 0

    for (const [name, imageUrl] of Object.entries(imageMapping)) {
      if (!imageUrl) {
        skipped++
        continue
      }

      try {
        const result = await db
          .update(celebrities)
          .set({ imageUrl })
          .where(eq(celebrities.name, name))

        updated++
        console.log(`✅ Updated: ${name}`)
      } catch (error) {
        console.error(`❌ Failed to update ${name}:`, error)
      }
    }

    console.log(`\n📊 Results: ${updated} updated, ${skipped} skipped (no image)`)
  } else {
    console.error('❌ D1 database binding not found')
    console.error('   This script must be run in a Cloudflare Workers context')
    console.error('   Try running via: POST /api/update-images')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
