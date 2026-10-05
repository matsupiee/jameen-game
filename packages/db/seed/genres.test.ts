import { describe, expect, test } from 'bun:test'
import { goodCelebrities, scandalCelebrities } from './celebrities-data'
import { genreOf } from './genres'

describe('genreOf', () => {
  test.each([
    ['女優', 'actress'],
    ['元女優/歌手', 'actress'],
    ['俳優', 'actor'],
    ['元俳優', 'actor'],
    ['歌舞伎役者', 'actor'],
    ['俳優/アーティスト', 'actor'],
    ['お笑い芸人/脚本家', 'comedian'],
    ['YouTuber', 'youtuber'],
    ['元YouTuber/元議員', 'youtuber'],
    ['YouTuberユニット', 'youtuber'],
    ['配信者', 'youtuber'],
    ['ミュージシャン/俳優', 'artist'],
    ['シンガーソングライター', 'artist'],
    ['ロックバンド', 'artist'],
    ['アイドルグループ', 'artist'],
    ['タレント', 'talent'],
    ['フリーアナウンサー', 'talent'],
    ['元アスリート/タレント', 'talent'],
  ] as const)('%s → %s', (profile, genre) => {
    expect(genreOf(profile)).toBe(genre)
  })

  test('どのジャンルも1セット（10人）以上作れる', () => {
    const counts = new Map<string, number>()
    for (const c of [...scandalCelebrities, ...goodCelebrities]) {
      const genre = genreOf(c.profile)
      counts.set(genre, (counts.get(genre) ?? 0) + 1)
    }
    for (const genre of ['actress', 'actor', 'comedian', 'youtuber', 'talent', 'artist']) {
      expect(counts.get(genre) ?? 0).toBeGreaterThanOrEqual(10)
    }
  })
})
