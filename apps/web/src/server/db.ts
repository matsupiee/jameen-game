import { env } from 'cloudflare:workers'
import { createDb } from '@jameen/db'

export function getDb() {
  return createDb(env.DB)
}
