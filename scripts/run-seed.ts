#!/usr/bin/env node
import { drizzle } from 'drizzle-orm/d1'
import { seed } from '../src/db/seed'

// Local D1 database connection
const db = drizzle(
  new (await import('better-sqlite3')).default(':memory:')
)

console.log('🌱 Starting seed process...')
try {
  await seed(db)
  console.log('✅ Seed completed!')
} catch (error) {
  console.error('❌ Seed failed:', error)
  process.exit(1)
}
