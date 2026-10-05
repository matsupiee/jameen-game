import { sql } from 'drizzle-orm'
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core'
import type { Category } from '../src/category'
import type * as schema from '../src/schema'
import { celebrities, quizCelebrities, quizzes, scores } from '../src/schema'
import { GENRE_LABELS, GENRES, type Genre } from '../src/genre'
import { goodCelebrities, scandalCelebrities } from './celebrities-data'
import { genreOf } from './genres'
import { storeImages, type ImageStore } from './images'

// ローカルの D1 バインディングと、リモート D1 への HTTP 接続のどちらでも流せるようにする
// oxlint-disable-next-line typescript/no-explicit-any
export type SeedDatabase = BaseSQLiteDatabase<'async', any, typeof schema>

const QUIZ_SIZE = 10

// ジャンルを問わず全員から出題する MIX 編のセット数
const MIX_QUIZ_COUNT = 5

// MIX 編の1セット10人の内訳
const PER_QUIZ = { criminal: 2, scandal: 3, good: 5 } as const

const CATEGORY_ORDER = ['criminal', 'scandal', 'good'] as const

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

  const allCelebrities = [
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
  ] satisfies (typeof celebrities.$inferInsert)[]

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
  const members = inserted.map((c, i) => ({ ...c, genre: genreOf(allCelebrities[i]!.profile) }))

  const sets = [
    ...GENRES.filter((genre) => genre !== 'mix').flatMap((genre) =>
      genreSets(members.filter((c) => c.genre === genre)).map((m) => ({ genre, members: m })),
    ),
    ...mixSets(inserted).map((m) => ({ genre: 'mix' as const, members: m })),
  ]

  console.log(`📝 Creating ${sets.length} quiz sets...`)
  const numbers = new Map<Genre, number>()
  const insertedQuizzes = await db
    .insert(quizzes)
    .values(
      sets.map(({ genre }) => {
        const n = (numbers.get(genre) ?? 0) + 1
        numbers.set(genre, n)
        return {
          genre,
          title: `${GENRE_LABELS[genre]}編${n}`,
          description:
            genre === 'mix'
              ? 'いろんなジャンルの芸能人から出題'
              : `${GENRE_LABELS[genre]}だけで出題`,
        }
      }),
    )
    .returning({ id: quizzes.id })

  const links = insertedQuizzes.flatMap((quiz, i) =>
    shuffle(sets[i]!.members).map((c, j) => ({
      quizId: quiz.id,
      celebrityId: c.id,
      position: j + 1,
    })),
  )

  console.log('🔗 Linking celebrities to quiz sets...')
  for (const rows of chunk(links, CHUNK_SIZE * 2)) {
    await db.insert(quizCelebrities).values(rows)
  }

  console.log(
    `🎉 Seeded ${inserted.length} celebrities (${imagePaths.size} images), ${insertedQuizzes.length} quizzes, ${links.length} links`,
  )
}

type Member = { id: number; category: Category }

/**
 * 1ジャンルの芸能人を、重複なしで10人ずつのセットに分ける（端数の人は MIX 編でだけ出題される）。
 * 犯罪者・不祥事・善人の順に各セットへ1人ずつ配るので、どのセットも内訳がほぼ揃い、
 * 端数として外れるのは善人から優先される。
 */
export function genreSets<T extends Member>(pool: readonly T[]): T[][] {
  const setCount = Math.floor(pool.length / QUIZ_SIZE)
  const dealt = CATEGORY_ORDER.flatMap((category) =>
    shuffle(pool.filter((c) => c.category === category)),
  ).slice(0, setCount * QUIZ_SIZE)
  return Array.from({ length: setCount }, (_, i) => dealt.filter((_, j) => j % setCount === i))
}

/** 全ジャンルから、カテゴリごとにシャッフルした芸能人を順番に配って内訳を PER_QUIZ に揃える */
function mixSets<T extends Member>(pool: readonly T[]): T[][] {
  const pools = {
    criminal: shuffle(pool.filter((c) => c.category === 'criminal')),
    scandal: shuffle(pool.filter((c) => c.category === 'scandal')),
    good: shuffle(pool.filter((c) => c.category === 'good')),
  }
  const cursors = { criminal: 0, scandal: 0, good: 0 }
  const draw = (category: Category) => {
    const p = pools[category]
    return p[cursors[category]++ % p.length]!
  }
  return Array.from({ length: MIX_QUIZ_COUNT }, () =>
    CATEGORY_ORDER.flatMap((category) =>
      Array.from({ length: PER_QUIZ[category] }, () => draw(category)),
    ),
  )
}
