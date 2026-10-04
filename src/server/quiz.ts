import { createServerFn } from '@tanstack/react-start'
import { asc, desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { celebrities, quizCelebrities, quizzes, scores } from '#/db/schema'
import { CATEGORIES } from '#/shared/category'
import { getDb } from './db'
import { grade, InvalidAnswersError } from './grade'

const quizIdSchema = z.object({ quizId: z.number().int().positive() })

const categorySchema = z.enum(CATEGORIES)

const answersSchema = z.array(
  z.object({ celebrityId: z.number().int().positive(), answer: categorySchema }),
)

const PLAYER_NAME_MAX = 20

async function loadQuestions(quizId: number) {
  return getDb()
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

export const listQuizzes = createServerFn({ method: 'GET' }).handler(async () => {
  const db = getDb()
  return db
    .select({
      id: quizzes.id,
      title: quizzes.title,
      description: quizzes.description,
      questionCount: sql<number>`(select count(*) from ${quizCelebrities} where ${quizCelebrities.quizId} = ${quizzes.id})`,
      playCount: sql<number>`(select count(*) from ${scores} where ${scores.quizId} = ${quizzes.id})`,
    })
    .from(quizzes)
    .orderBy(desc(quizzes.id))
})

/** 出題用。正解（category）や解説はここでは返さない。 */
export const getQuiz = createServerFn({ method: 'GET' })
  .validator(quizIdSchema)
  .handler(async ({ data }) => {
    const [quiz] = await getDb().select().from(quizzes).where(eq(quizzes.id, data.quizId))
    if (!quiz) throw new Error('クイズが見つかりません')
    const questions = await loadQuestions(data.quizId)
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
  })

/**
 * 1問ごとの即時判定。回答した芸能人1人分の正解と解説だけを返す。
 * 他の問題の正解は漏らさない。
 */
export const checkAnswer = createServerFn({ method: 'POST' })
  .validator(
    quizIdSchema.extend({ celebrityId: z.number().int().positive(), answer: categorySchema }),
  )
  .handler(async ({ data }) => {
    const questions = await loadQuestions(data.quizId)
    const q = questions.find((x) => x.id === data.celebrityId)
    if (!q) throw new Error('このクイズに含まれない芸能人です')
    return {
      correct: data.answer === q.category,
      category: q.category,
      scandalSummary: q.scandalSummary,
      sourceUrl: q.sourceUrl,
    }
  })

/** 回答を再採点したうえでランキングに登録する。スコアはクライアントから受け取らない。 */
export const submitScore = createServerFn({ method: 'POST' })
  .validator(
    quizIdSchema.extend({
      answers: answersSchema,
      playerName: z.string().trim().min(1).max(PLAYER_NAME_MAX),
    }),
  )
  .handler(async ({ data }) => {
    const questions = await loadQuestions(data.quizId)
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
    const [row] = await getDb()
      .insert(scores)
      .values({ quizId: data.quizId, playerName: data.playerName, score })
      .returning({ id: scores.id })
    return { id: row.id, score }
  })

export const getRanking = createServerFn({ method: 'GET' })
  .validator(quizIdSchema)
  .handler(async ({ data }) => {
    const db = getDb()
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
  })
