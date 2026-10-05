import type { Genre } from '../src/genre'

type CelebrityGenre = Exclude<Genre, 'mix'>

// 肩書きのキーワードからジャンルを決める。上から順に判定し、どれにも当たらなければタレント
const RULES: [CelebrityGenre, RegExp][] = [
  ['actress', /女優/],
  ['comedian', /お笑い/],
  ['youtuber', /YouTube|配信者/],
  ['actor', /俳優|歌舞伎/],
  ['artist', /アーティスト|ミュージシャン|シンガー|歌手|バンド|ユニット|グループ|デュオ|ダンサー/],
]

/**
 * 肩書き（例: 「俳優/アーティスト」）から、その芸能人を出題するジャンルを決める。
 * 肩書きが複数あるときは最初のものを本業とみなす。
 */
export function genreOf(profile: string): CelebrityGenre {
  const main = profile.split('/')[0]!
  return RULES.find(([, pattern]) => pattern.test(main))?.[0] ?? 'talent'
}
