import { createServerFn } from '@tanstack/react-start'
import * as quiz from '@jameen/api/quiz'
import { getSessionUser } from './auth'
import { getDb } from './db'

export const listQuizzes = createServerFn({ method: 'GET' }).handler(() =>
  quiz.listQuizzes(getDb()),
)

export const getQuiz = createServerFn({ method: 'GET' })
  .validator(quiz.quizIdSchema)
  .handler(({ data }) => quiz.getQuiz(getDb(), data))

export const checkAnswer = createServerFn({ method: 'POST' })
  .validator(quiz.checkAnswerSchema)
  .handler(({ data }) => quiz.checkAnswer(getDb(), data))

export const submitScore = createServerFn({ method: 'POST' })
  .validator(quiz.submitScoreSchema)
  .handler(async ({ data }) => {
    const user = await getSessionUser()
    return quiz.submitScore(getDb(), data, user?.id ?? null)
  })

export const getRanking = createServerFn({ method: 'GET' })
  .validator(quiz.quizIdSchema)
  .handler(({ data }) => quiz.getRanking(getDb(), data))
