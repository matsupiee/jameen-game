import { sql } from 'drizzle-orm'
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import type * as schema from '../src/schema'
import { celebrities, quizCelebrities, quizzes, scores } from '../src/schema'
import { goodCelebrities, scandalCelebrities } from './celebrities-data'
import { storeImages, type ImageStore } from './images'

// ローカルの D1 バインディングと、リモート D1 への HTTP 接続のどちらでも流せるようにする
// oxlint-disable-next-line typescript/no-explicit-any
export type SeedDatabase = BaseSQLiteDatabase<'async', any, typeof schema>

const QUIZ_COUNT = 20

// 1セット10人の内訳
const PER_QUIZ = { criminal: 2, scandal: 3, good: 5 } as const

// D1 は1文あたりのバインドパラメータが100個までなので小分けに入れる
const CHUNK_SIZE = 10

function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr
}

function chunk<T>(array: readonly T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, (i + 1) * size),
  )
}

/**
 * シードデータを投入する。images を渡すと画像を R2 に保存してそのパスを使い、
 * 渡さなければ画像なしで投入する。
 * 何度実行しても同じ状態になるよう、既存データ（ランキングを含む）は消してから作り直す。
 */
export async function seed(db: SeedDatabase, { images }: { images?: ImageStore } = {}) {
  const source = [...scandalCelebrities, ...goodCelebrities]
  const imagePaths = images
    ? await storeImages(
        images,
        source.flatMap((c) => ('imageSourceUrl' in c ? [c.imageSourceUrl] : [])),
      )
    : new Map<string, string>()
  const imageUrl = (c: (typeof source)[number]) =>
    ('imageSourceUrl' in c && imagePaths.get(c.imageSourceUrl)) || null

  console.log('🧹 Clearing existing data...')
  await db.delete(scores)
  await db.delete(quizCelebrities)
  await db.delete(quizzes)
  await db.delete(celebrities)
  // クイズの URL（/quiz/1 など）が実行のたびに変わらないよう、ID の採番も戻す
  await db.run(sql`delete from sqlite_sequence where name in ('celebrities', 'quizzes', 'scores')`)

  const allCelebrities: (typeof celebrities.$inferInsert)[] = [
    ...scandalCelebrities.map((c) => ({
      name: c.name,
      profile: c.profile,
      category: c.category,
      scandalSummary: c.scandalSummary,
      sourceUrl: c.sourceUrl || null,
      imageUrl: imageUrl(c),
    })),
    ...goodCelebrities.map((c) => ({
      name: c.name,
      profile: c.profile,
      category: 'good' as const,
      imageUrl: imageUrl(c),
    })),
  ]

  console.log(`📝 Inserting ${allCelebrities.length} celebrities...`)
  const inserted: { id: number; category: (typeof allCelebrities)[number]['category'] }[] = []
  for (const rows of chunk(allCelebrities, CHUNK_SIZE)) {
    inserted.push(
      ...(await db
        .insert(celebrities)
        .values(rows)
        .returning({ id: celebrities.id, category: celebrities.category })),
    )
  }

  console.log(`📝 Creating ${QUIZ_COUNT} quiz sets...`)
  const insertedQuizzes = await db
    .insert(quizzes)
    .values(
      Array.from({ length: QUIZ_COUNT }, (_, i) => ({
        title: `クイズセット ${i + 1}`,
        description: `芸能人クイズ - セット${i + 1}`,
      })),
    )
    .returning({ id: quizzes.id })

  // カテゴリごとにシャッフルした芸能人を順番に配り、各セットのバランスを揃える
  const pools = {
    criminal: shuffle(inserted.filter((c) => c.category === 'criminal')),
    scandal: shuffle(inserted.filter((c) => c.category === 'scandal')),
    good: shuffle(inserted.filter((c) => c.category === 'good')),
  }
  const cursors = { criminal: 0, scandal: 0, good: 0 }
  const draw = (category: keyof typeof pools) => {
    const pool = pools[category]
    return pool[cursors[category]++ % pool.length]!
  }

  const links = insertedQuizzes.flatMap((quiz) => {
    const members = (Object.keys(PER_QUIZ) as (keyof typeof PER_QUIZ)[]).flatMap((category) =>
      Array.from({ length: PER_QUIZ[category] }, () => draw(category)),
    )
    return shuffle(members).map((c, i) => ({
      quizId: quiz.id,
      celebrityId: c.id,
      position: i + 1,
    }))
  })

  console.log('🔗 Linking celebrities to quiz sets...')
  for (const rows of chunk(links, CHUNK_SIZE * 2)) {
    await db.insert(quizCelebrities).values(rows)
  }

  console.log(
    `🎉 Seeded ${inserted.length} celebrities (${imagePaths.size} images), ${insertedQuizzes.length} quizzes, ${links.length} links`,
  )
}
