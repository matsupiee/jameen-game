#!/usr/bin/env node

/**
 * Drizzle ORM を使用したデータベースシードスクリプト
 *
 * 実行方法:
 *   ローカル開発: bun run scripts/seed-db.ts
 *   リモート本番: bun run scripts/seed-db.ts --remote
 *
 * 注: マイグレーションが完了していることを前提とします
 */

import { drizzle } from 'drizzle-orm/d1'
import { seed } from '../src/db/seed'

async function main() {
  const isRemote = process.argv.includes('--remote')

  console.log(`🔍 Seeding to ${isRemote ? 'remote' : 'local'} D1 database...`)

  // Cloudflare Workers の環境でのバインディング
  // ローカル開発環境では、wrangler が自動的に WASM/SQLite をセットアップ
  if (typeof globalThis !== 'undefined' && 'DB' in globalThis) {
    // CloudflareWorkers 環境
    const db = drizzle(globalThis.DB as any)
    await seed(db)
  } else {
    console.error('❌ D1 database binding not found')
    console.error('   Make sure to run this from the Wrangler development environment')
    console.error('   or in a Worker context.')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
