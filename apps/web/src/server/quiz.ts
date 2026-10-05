import { createServerFn } from '@tanstack/react-start'
import * as quiz from '@jameen/api/quiz'
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
  .handler(({ data }) => quiz.submitScore(getDb(), data))

export const getRanking = createServerFn({ method: 'GET' })
  .validator(quiz.quizIdSchema)
  .handler(({ data }) => quiz.getRanking(getDb(), data))
