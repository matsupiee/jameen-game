import { drizzle } from 'drizzle-orm/d1'
import { celebrities, quizzes, quizCelebrities } from './schema'
import { scandalCelebrities, goodCelebrities } from './celebrities-data'

type Celebrity = {
  name: string
  profile?: string | null
  category: 'good' | 'criminal' | 'scandal'
  scandalSummary?: string | null
  sourceUrl?: string | null
  imageUrl?: string | null
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export async function seed(db: ReturnType<typeof drizzle>) {
  console.log('🌱 Seeding celebrities data...')

  // ステップ1: スキャンダル側と良好側のデータを統合
  const allCelebrities: Celebrity[] = []

  // スキャンダル側 (100人)
  for (const scandal of scandalCelebrities) {
    allCelebrities.push({
      name: scandal.name,
      profile: scandal.profile,
      category: scandal.category,
      scandalSummary: scandal.scandalSummary,
      sourceUrl: scandal.sourceUrl || null,
      imageUrl: null, // 後で手動で追加予定
    })
  }

  // クリーン側 (100人)
  for (const good of goodCelebrities) {
    allCelebrities.push({
      name: good.name,
      profile: good.profile,
      category: 'good',
      scandalSummary: null,
      sourceUrl: null,
      imageUrl: null,
    })
  }

  // ステップ2: celebrities テーブルにデータを投入
  console.log(`📝 Inserting ${allCelebrities.length} celebrities...`)
  const insertedCelebrities = await db
    .insert(celebrities)
    .values(allCelebrities)
    .returning()

  console.log(`✅ Inserted ${insertedCelebrities.length} celebrities`)

  // ステップ3: クイズセットを20個作成（各セット10人）
  console.log('📝 Creating quiz sets...')
  const quizTitles = Array.from({ length: 20 }, (_, i) => ({
    title: `クイズセット ${i + 1}`,
    description: `芸能人クイズ - セット${i + 1}`,
  }))

  const insertedQuizzes = await db.insert(quizzes).values(quizTitles).returning()

  console.log(`✅ Created ${insertedQuizzes.length} quiz sets`)

  // ステップ4: quiz_celebrities にデータを紐付け
  // 各セットにカテゴリのバランスを取りながら10人を割り当てる
  console.log('🔗 Linking celebrities to quiz sets...')

  const criminalCelebrities = insertedCelebrities.filter((c: any) => c.category === 'criminal')
  const scandalOnlyCelebrities = insertedCelebrities.filter((c: any) => c.category === 'scandal')
  const goodOnlyCelebrities = insertedCelebrities.filter((c: any) => c.category === 'good')

  const quizCelebsData: Array<{
    quizId: number
    celebrityId: number
    position: number
  }> = []

  // 20セット × 10人 = 200人を配置
  let crimeIdx = 0
  let scandalIdx = 0
  let goodIdx = 0

  const shuffledCrime = shuffle(criminalCelebrities)
  const shuffledScandal = shuffle(scandalOnlyCelebrities)
  const shuffledGood = shuffle(goodOnlyCelebrities)

  for (let quizId = 1; quizId <= insertedQuizzes.length; quizId++) {
    // 各セットにバランス良く配置
    // 内訳: 犯罪者2人、不祥事3人、善人5人
    const positions = [
      // 犯罪者 2人
      shuffledCrime[(crimeIdx++) % shuffledCrime.length],
      shuffledCrime[(crimeIdx++) % shuffledCrime.length],
      // 不祥事 3人
      shuffledScandal[(scandalIdx++) % shuffledScandal.length],
      shuffledScandal[(scandalIdx++) % shuffledScandal.length],
      shuffledScandal[(scandalIdx++) % shuffledScandal.length],
      // 善人 5人
      shuffledGood[(goodIdx++) % shuffledGood.length],
      shuffledGood[(goodIdx++) % shuffledGood.length],
      shuffledGood[(goodIdx++) % shuffledGood.length],
      shuffledGood[(goodIdx++) % shuffledGood.length],
      shuffledGood[(goodIdx++) % shuffledGood.length],
    ]

    // ポジションをシャッフル
    const shuffledPositions = shuffle(positions)

    for (let pos = 0; pos < shuffledPositions.length; pos++) {
      const quiz = insertedQuizzes.find((q: any) => q.id === quizId)
      if (quiz) {
        quizCelebsData.push({
          quizId: quiz.id,
          celebrityId: shuffledPositions[pos].id,
          position: pos + 1,
        })
      }
    }
  }

  await db.insert(quizCelebrities).values(quizCelebsData)

  console.log(`✅ Linked ${quizCelebsData.length} celebrity-quiz relationships`)
  console.log('🎉 Seeding complete!')
}
