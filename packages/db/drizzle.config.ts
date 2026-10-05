import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/schema.ts',
  // apps/web/wrangler.jsonc の migrations_dir から参照する
  out: './migrations',
})
