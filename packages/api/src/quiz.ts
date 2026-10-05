import { asc, desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import type { Database } from '@jameen/db'
import { CATEGORIES } from '@jameen/db/category'
import { celebrities, quizCelebrities, quizzes, scores } from '@jameen/db/schema'
import { grade, InvalidAnswersError } from './grade'

const PLAYER_NAME_MAX = 20

const categorySchema = z.enum(CATEGORIES)

export const quizIdSchema = z.object({ quizId: z.number().int().positive() })

export const checkAnswerSchema = quizIdSchema.extend({
  celebrityId: z.number().int().positive(),
  answer: categorySchema,
})

export const submitScoreSchema = quizIdSchema.extend({
  answers: z.array(z.object({ celebrityId: z.number().int().positive(), answer: categorySchema })),
  playerName: z.string().trim().min(1).max(PLAYER_NAME_MAX),
})

async function loadQuestions(db: Database, quizId: number) {
  return db
    .select({
      id: celebrities.id,
      name: celebrities.name,
      profile: celebrities.profile,
      imageUrl: celebrities.imageUrl,
      category: celebrities.category,
      scandalSummary: celebrities.scandalSummary,
      sourceUrl: celebrities.sourceUrl,
    })
    .from(quizCelebrities)
    .innerJoin(celebrities, eq(quizCelebrities.celebrityId, celebrities.id))
    .where(eq(quizCelebrities.quizId, quizId))
    .orderBy(asc(quizCelebrities.position))
}

export async function listQuizzes(db: Database) {
  return db
    .select({
      id: quizzes.id,
      title: quizzes.title,
      description: quizzes.description,
      genre: quizzes.genre,
      questionCount: sql<number>`(select count(*) from ${quizCelebrities} where ${quizCelebrities.quizId} = ${quizzes.id})`,
      playCount: sql<number>`(select count(*) from ${scores} where ${scores.quizId} = ${quizzes.id})`,
    })
    .from(quizzes)
    .orderBy(asc(quizzes.id))
}

/** 出題用。正解（category）や解説はここでは返さない。 */
export async function getQuiz(db: Database, data: z.infer<typeof quizIdSchema>) {
  const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, data.quizId))
  if (!quiz) throw new Error('クイズが見つかりません')
  const questions = await loadQuestions(db, data.quizId)
  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    celebrities: questions.map(({ id, name, profile, imageUrl }) => ({
      id,
      name,
      profile,
      imageUrl,
    })),
  }
}

/**
 * 1問ごとの即時判定。回答した芸能人1人分の正解と解説だけを返す。
 * 他の問題の正解は漏らさない。
 */
export async function checkAnswer(db: Database, data: z.infer<typeof checkAnswerSchema>) {
  const questions = await loadQuestions(db, data.quizId)
  const q = questions.find((x) => x.id === data.celebrityId)
  if (!q) throw new Error('このクイズに含まれない芸能人です')
  return {
    correct: data.answer === q.category,
    category: q.category,
    scandalSummary: q.scandalSummary,
    sourceUrl: q.sourceUrl,
  }
}

/** 回答を再採点したうえでランキングに登録する。スコアはクライアントから受け取らない。 */
export async function submitScore(db: Database, data: z.infer<typeof submitScoreSchema>) {
  const questions = await loadQuestions(db, data.quizId)
  if (questions.length === 0) throw new Error('クイズが見つかりません')
  let score: number
  try {
    ;({ score } = grade(
      questions.map((q) => ({ celebrityId: q.id, category: q.category })),
      data.answers,
    ))
  } catch (e) {
    if (e instanceof InvalidAnswersError) throw new Error(e.message)
    throw e
  }
  const [row] = await db
    .insert(scores)
    .values({ quizId: data.quizId, playerName: data.playerName, score })
    .returning({ id: scores.id })
  return { id: row.id, score }
}

export async function getRanking(db: Database, data: z.infer<typeof quizIdSchema>) {
  const [quiz] = await db
    .select({ id: quizzes.id, title: quizzes.title })
    .from(quizzes)
    .where(eq(quizzes.id, data.quizId))
  if (!quiz) throw new Error('クイズが見つかりません')
  const rows = await db
    .select({
      id: scores.id,
      playerName: scores.playerName,
      score: scores.score,
      createdAt: scores.createdAt,
    })
    .from(scores)
    .where(eq(scores.quizId, data.quizId))
    // 同点は先に達成した人を上位にする
    .orderBy(desc(scores.score), asc(scores.createdAt), asc(scores.id))
    .limit(50)
  return { quiz, ranking: rows.map((r) => ({ ...r, createdAt: r.createdAt.getTime() })) }
}
