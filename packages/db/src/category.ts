/** 芸能人の分類。クイズの選択肢であり、正解データでもある */
export const CATEGORIES = ['good', 'criminal', 'scandal'] as const

export type Category = (typeof CATEGORIES)[number]
