import { asc } from 'drizzle-orm'
import type { Database } from '@jameen/db'
import { celebrities } from '@jameen/db/schema'

/** 確認用の著名人一覧。写真・名前・プロフィールだけ返す。 */
export async function listCelebrities(db: Database) {
  return db
    .select({
      id: celebrities.id,
      name: celebrities.name,
      profile: celebrities.profile,
      imageUrl: celebrities.imageUrl,
    })
    .from(celebrities)
    .orderBy(asc(celebrities.id))
}
