import { index, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { CATEGORIES } from './category'

export const celebrities = sqliteTable('celebrities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  // 肩書き（例: 俳優、お笑い芸人）
  profile: text('profile'),
  // 正解: 善人 / 犯罪者 / 不祥事（犯罪ではない）
  category: text('category', { enum: CATEGORIES }).notNull(),
  // 回答後に表示する解説。善人以外は事実を簡潔に書く
  scandalSummary: text('scandal_summary'),
  // 解説の根拠となる出典URL
  sourceUrl: text('source_url'),
  imageUrl: text('image_url'),
})

export const quizzes = sqliteTable('quizzes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// 1クイズ = 芸能人10人
export const quizCelebrities = sqliteTable(
  'quiz_celebrities',
  {
    quizId: integer('quiz_id')
      .notNull()
      .references(() => quizzes.id, { onDelete: 'cascade' }),
    celebrityId: integer('celebrity_id')
      .notNull()
      .references(() => celebrities.id, { onDelete: 'cascade' }),
    position: integer('position').notNull(),
  },
  (t) => [primaryKey({ columns: [t.quizId, t.celebrityId] })],
)

export const scores = sqliteTable(
  'scores',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    quizId: integer('quiz_id')
      .notNull()
      .references(() => quizzes.id, { onDelete: 'cascade' }),
    playerName: text('player_name').notNull(),
    score: integer('score').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index('scores_quiz_score_idx').on(t.quizId, t.score)],
)
