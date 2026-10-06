import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

export const SITE_NAME = 'ジャミーンゲーム'
export const SITE_DESCRIPTION =
  '芸能人の写真を見て、その人が善人・犯罪者・不祥事を起こしたが犯罪ではない人のどれかを当てるクイズゲーム。10問で何問見抜けるか、ランキングで競おう。'
export const SHARE_HASHTAG = 'ジャミーンゲーム'
const OG_IMAGE_PATH = '/og.png'

// OGP や canonical は絶対 URL が必要。独自ドメインと workers.dev のどちらで配信しても動くよう、リクエストから決める
export const getSiteOrigin = createIsomorphicFn()
  .server(() => new URL(getRequest().url).origin)
  .client(() => window.location.origin)

/**
 * ページごとの title・description・OGP・canonical・robots をまとめて作る。
 * 子ルートの meta は親の同名の meta を上書きする。canonical は link で重複を消せないので各ルートで1回だけ付ける
 */
export function seo({
  title,
  description = SITE_DESCRIPTION,
  path,
  noindex = false,
}: {
  title?: string
  description?: string
  path: string
  noindex?: boolean
}) {
  const origin = getSiteOrigin()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | 善悪を見抜け！`
  const url = `${origin}${path}`
  const image = `${origin}${OG_IMAGE_PATH}`

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { name: 'robots', content: noindex ? 'noindex' : 'index, follow' },
      { property: 'og:type', content: path === '/' ? 'website' : 'article' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${SITE_NAME} - 善悪を見抜け！` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: noindex ? [] : [{ rel: 'canonical', href: url }],
  }
}
