import { describe, expect, test } from 'bun:test'
import { grade, InvalidAnswersError } from './grade'

const questions = [
  { celebrityId: 1, category: 'good' as const },
  { celebrityId: 2, category: 'criminal' as const },
  { celebrityId: 3, category: 'scandal' as const },
]

describe('grade', () => {
  test('全問正解で満点になる', () => {
    const { score, results } = grade(questions, [
      { celebrityId: 1, answer: 'good' },
      { celebrityId: 2, answer: 'criminal' },
      { celebrityId: 3, answer: 'scandal' },
    ])
    expect(score).toBe(3)
    expect(results.map((r) => r.correct)).toEqual([true, true, true])
  })

  test('全問不正解で0点になる', () => {
    const { score } = grade(questions, [
      { celebrityId: 1, answer: 'criminal' },
      { celebrityId: 2, answer: 'scandal' },
      { celebrityId: 3, answer: 'good' },
    ])
    expect(score).toBe(0)
  })

  test('犯罪者と不祥事（犯罪ではない）は別の選択肢として区別される', () => {
    const { score, results } = grade(questions, [
      { celebrityId: 1, answer: 'good' },
      { celebrityId: 2, answer: 'scandal' },
      { celebrityId: 3, answer: 'criminal' },
    ])
    expect(score).toBe(1)
    expect(results.map((r) => r.correct)).toEqual([true, false, false])
  })

  test('回答の順序が出題順と異なっても正しく採点される', () => {
    const { score, results } = grade(questions, [
      { celebrityId: 3, answer: 'scandal' },
      { celebrityId: 1, answer: 'criminal' },
      { celebrityId: 2, answer: 'criminal' },
    ])
    expect(score).toBe(2)
    // 結果は出題順で返る
    expect(results).toEqual([
      { celebrityId: 1, answer: 'criminal', correct: false },
      { celebrityId: 2, answer: 'criminal', correct: true },
      { celebrityId: 3, answer: 'scandal', correct: true },
    ])
  })

  test('回答数が足りないとエラーになる', () => {
    expect(() => grade(questions, [{ celebrityId: 1, answer: 'good' }])).toThrow(
      InvalidAnswersError,
    )
  })

  test('回答が重複しているとエラーになる（全問正解の水増しを防ぐ）', () => {
    expect(() =>
      grade(questions, [
        { celebrityId: 1, answer: 'good' },
        { celebrityId: 1, answer: 'good' },
        { celebrityId: 3, answer: 'scandal' },
      ]),
    ).toThrow(InvalidAnswersError)
  })

  test('出題されていない芸能人への回答はエラーになる', () => {
    expect(() =>
      grade(questions, [
        { celebrityId: 1, answer: 'good' },
        { celebrityId: 2, answer: 'criminal' },
        { celebrityId: 99, answer: 'scandal' },
      ]),
    ).toThrow(InvalidAnswersError)
  })
})
