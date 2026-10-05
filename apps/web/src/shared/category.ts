import type { Category } from '@jameen/db/category'

export { CATEGORIES, type Category } from '@jameen/db/category'

/** クイズ回答時に並べる選択肢の順番 */
export const CHOICE_ORDER: readonly Category[] = ['good', 'scandal', 'criminal']

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
