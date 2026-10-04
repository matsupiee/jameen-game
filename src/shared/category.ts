/** 芸能人の分類。クイズの選択肢であり、正解データでもある */
export const CATEGORIES = ['good', 'criminal', 'scandal'] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABEL: Record<Category, string> = {
  good: '善人',
  criminal: '犯罪者',
  scandal: '不祥事（犯罪ではない）',
}

/** 結果表示などの狭い場所で使う短い名前 */
export const CATEGORY_SHORT: Record<Category, string> = {
  good: '善人',
  criminal: '犯罪者',
  scandal: '不祥事',
}

export const CATEGORY_HINT: Record<Category, string> = {
  good: '不祥事なし',
  criminal: '逮捕・有罪など、法に触れた',
  scandal: '犯罪ではないが、騒動を起こした',
}

export function isCategory(value: unknown): value is Category {
  return typeof value === 'string' && (CATEGORIES as readonly string[]).includes(value)
}
