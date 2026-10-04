import type { Category } from '../shared/category'

export type Answer = { celebrityId: number; answer: Category }

export type Question = { celebrityId: number; category: Category }

export type GradeResult = {
  celebrityId: number
  answer: Category
  correct: boolean
}

export class InvalidAnswersError extends Error {}

/**
 * 回答をクイズの出題内容と突き合わせて採点する。
 * 出題されたすべての芸能人に、ちょうど1回ずつ回答していることを要求する。
 */
export function grade(questions: Question[], answers: Answer[]) {
  if (answers.length !== questions.length) {
    throw new InvalidAnswersError('回答数がクイズの問題数と一致しません')
  }
  const answerById = new Map<number, Category>()
  for (const a of answers) {
    if (answerById.has(a.celebrityId)) {
      throw new InvalidAnswersError('同じ芸能人への回答が重複しています')
    }
    answerById.set(a.celebrityId, a.answer)
  }

  const results: GradeResult[] = questions.map((q) => {
    const answer = answerById.get(q.celebrityId)
    if (answer === undefined) {
      throw new InvalidAnswersError('このクイズに含まれない芸能人への回答です')
    }
    return { celebrityId: q.celebrityId, answer, correct: answer === q.category }
  })

  return { score: results.filter((r) => r.correct).length, results }
}
