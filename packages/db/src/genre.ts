/** クイズセットのジャンル。並び順はトップページでの表示順 */
export const GENRES = [
  'actress',
  'actor',
  'comedian',
  'youtuber',
  'talent',
  'announcer',
  'artist',
  'mix',
] as const

export type Genre = (typeof GENRES)[number]

export const GENRE_LABELS: Record<Genre, string> = {
  actress: '女優',
  actor: '俳優',
  comedian: 'お笑い芸人',
  youtuber: 'YouTuber',
  talent: 'タレント',
  announcer: 'アナウンサー',
  artist: 'アーティスト',
  mix: 'MIX',
}
