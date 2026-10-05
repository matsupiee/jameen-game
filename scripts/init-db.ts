#!/usr/bin/env node
import { resolve } from 'path'
import { execSync } from 'child_process'

const dbPath = resolve(process.cwd(), '.wrangler/state/d1')

console.log('🚀 Initializing local D1 database...')
console.log(`📍 Database path: ${dbPath}`)

try {
  console.log('📝 Running migrations...')
  execSync('bun run db:migrate:local', { stdio: 'inherit' })

  console.log('✅ Database initialized successfully!')
} catch (error) {
  console.error('❌ Failed to initialize database:', error)
  process.exit(1)
}
