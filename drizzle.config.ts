import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  // wrangler d1 migrations のデフォルト(migrations/)に合わせる
  out: './migrations',
})
