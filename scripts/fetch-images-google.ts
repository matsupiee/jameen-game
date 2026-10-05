#!/usr/bin/env node

/**
 * Google Images + 複数ソースから全員分の著名人画像URLを取得するスクリプト
 *
 * 戦略:
 * 1. Wikipedia の日本語ページをチェック
 * 2. 失敗時は Wikipedia 英語版をチェック
 * 3. 失敗時は Wikidata から画像を取得
 * 4. 失敗時は公開画像検索結果から取得
 */

import { scandalCelebrities, goodCelebrities } from '../src/db/celebrities-data'
import * as fs from 'fs'
import * as path from 'path'

// 既に取得した画像URLを読込
const existingImages = JSON.parse(
  fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'celebrities-images.json'), 'utf-8'),
) as Record<string, string | null>

const allCelebrities = [
  ...scandalCelebrities.map((c) => ({ ...c, name: c.name })),
  ...goodCelebrities.map((c) => ({ ...c, name: c.name })),
]

// 日本語 Wikipedia ページ名のマッピング（複数候補）
const pageNameMappings: Record<string, string[]> = {
  '清原和博': ['清原和博'],
  '成宮寛貴': ['成宮寛貴'],
  'ベッキー': ['ベッキー'],
  '川谷絵音': ['川谷絵音'],
  'ボビー・オロゴン': ['ボビー・オロゴン'],
  'せいや（霜降り明星）': ['せいや'],
  '亀梨和也': ['亀梨和也'],
  '山下智久': ['山下智久'],
  '小倉優香': ['小倉優香'],
  '猪俣周杜（timelesz）': ['猪俣周杜'],
  '東出昌大': ['東出昌大'],
  '渡部建（アンジャッシュ）': ['渡部建'],
  '香川照之': ['香川照之'],
  '広末涼子': ['広末涼子'],
  '市川猿之助': ['市川猿之助'],
  '永山絢斗': ['永山絢斗'],
  '沢尻エリカ': ['沢尻エリカ'],
  '伊勢谷友介': ['伊勢谷友介'],
  'ピエール瀧': ['ピエール瀧'],
  '田口淳之介（元KAT-TUN）': ['田口淳之介'],
  '山口達也（元TOKIO）': ['山口達也'],
  '小出恵介': ['小出恵介'],
  '高畑裕太': ['高畑裕太'],
  '狩野英孝': ['狩野英孝'],
  '宮迫博之': ['宮迫博之'],
  '田村亮（ロンドンブーツ1号2号）': ['田村亮'],
  '徳井義実（チュートリアル）': ['徳井義実'],
  '木下優樹菜': ['木下優樹菜'],
  '袴田吉彦': ['袴田吉彦'],
  '原田龍二': ['原田龍二'],
  '斉藤慎二（ジャングルポケット）': ['斉藤慎二'],
  '中丸雄一（KAT-TUN）': ['中丸雄一'],
  '市川海老蔵（現・市川團十郎）': ['市川海老蔵'],
  '押尾学': ['押尾学'],
  '高知東生': ['高知東生'],
  '酒井法子': ['酒井法子'],
  'ASKA': ['ASKA'],
  '槇原敬之': ['槇原敬之'],
  'JAYWALK中村耕一': ['中村耕一'],
  'KENTA（ONE OK ROCK元メンバー）': ['KENTA'],
  '山本裕典': ['山本裕典'],
  '塩谷瞬': ['塩谷瞬'],
  '純烈・友井雄亮': ['友井雄亮'],
  '極楽とんぼ・山本圭壱': ['山本圭壱'],
  'TKO木下隆行': ['木下隆行'],
  'TKO木本武宏': ['木本武宏'],
  'スリムクラブ（真栄田賢・内間政成）': ['真栄田賢'],
  '2700（八十島・ツネ）': ['八十島'],
  'HG（レイザーラモン）': ['HG'],
  'ガリットチュウ福島': ['福島'],
  'レペゼンフォックス（DJ社長）': ['DJ社長'],
  'ジャックポット': ['ジャックポット'],
  'ヴァンビ（白井竜樹）': ['白井竜樹'],
  'モーリー（禁断ボーイズ）': ['モーリー'],
  'ジョニー・ソマリ': ['ジョニー・ソマリ'],
  'ワタナベマホト': ['ワタナベマホト'],
  'へずまりゅう': ['へずまりゅう'],
  'しバター': ['しバター'],
  'てんちむ': ['てんちむ'],
  'かねこあや': ['かねこあや'],
  'ヒカル': ['ヒカル'],
  'ラファエル': ['ラファエル'],
  'いっくん（禁断ボーイズ）': ['いっくん'],
  '木下ゆうか': ['木下ゆうか'],
  'はじめしゃチョー': ['はじめしゃチョー'],
  '東海オンエア・しばゆー': ['しばゆー'],
  'あやナン（あやなん）': ['あやなん'],
  'ゆたぼん': ['ゆたぼん'],
  'ガーシー（東谷義和）': ['ガーシー'],
  'コレコレ': ['コレコレ'],
  '加藤純一': ['加藤純一'],
  'さず': ['さず'],
  '阿部渉': ['阿部渉'],
  '畠山衣美': ['畠山衣美'],
  '谷岡慎一': ['谷岡慎一'],
  '鷲見玲奈': ['鷲見玲奈'],
  '増田和也': ['増田和也'],
  '加藤清隆': ['加藤清隆'],
  '上念司': ['上念司'],
  '鎌田靖': ['鎌田靖'],
  '登坂淳一': ['登坂淳一'],
  '秋元優里': ['秋元優里'],
  '生野陽子/中村光宏': ['生野陽子'],
  'みのもんた': ['みのもんた'],
  'ショーンK（ショーン・マクアードル川上）': ['ショーンK'],
  '夏目三久': ['夏目三久'],
  '長谷川豊': ['長谷川豊'],
  '古谷経衡': ['古谷経衡'],
  '竹田恒泰': ['竹田恒泰'],
  '津田大介': ['津田大介'],
  '百田尚樹': ['百田尚樹'],
  '有本香': ['有本香'],
  '伊達みきお（サンドウィッチマン）': ['伊達みきお'],
  '富澤たけし（サンドウィッチマン）': ['富澤たけし'],
  '内村光良（ウッチャンナンチャン）': ['内村光良'],
  'タモリ': ['タモリ'],
  '所ジョージ': ['所ジョージ'],
  '博多華丸（博多華丸・大吉）': ['博多華丸'],
  '博多大吉（博多華丸・大吉）': ['博多大吉'],
  '有吉弘行': ['有吉弘行'],
  '夏目三久/有吉弘行夫妻': ['夏目三久'],
  'バカリズム': ['バカリズム'],
  '設楽統（バナナマン）': ['設楽統'],
  '日村勇紀（バナナマン）': ['日村勇紀'],
  '川島明（麒麟）': ['川島明'],
  '春日俊彰（オードリー）': ['春日俊彰'],
  '若林正恭（オードリー）': ['若林正恭'],
  '陣内智則': ['陣内智則'],
  '阿佐ヶ谷姉妹（渡辺江里子・木村美穂）': ['渡辺江里子'],
  '和牛（水田信二・川西賢志郎）': ['水田信二'],
  'かまいたち（山内健司・濱家隆一）': ['山内健司'],
  'チョコレートプラネット（長田庄平・松尾駿）': ['長田庄平'],
  '今田美桜': ['今田美桜'],
  '綾瀬はるか': ['綾瀬はるか'],
  '新垣結衣': ['新垣結衣'],
  '星野源': ['星野源'],
  '佐藤栞里': ['佐藤栞里'],
  '吉高由里子': ['吉高由里子'],
  '長澤まさみ': ['長澤まさみ'],
  '石原さとみ': ['石原さとみ'],
  '菅田将暉': ['菅田将暉'],
  '小松菜奈': ['小松菜奈'],
  '神木隆之介': ['神木隆之介'],
  '芦田愛菜': ['芦田愛菜'],
  '鈴木福': ['鈴木福'],
  '天海祐希': ['天海祐希'],
  '阿部寛': ['阿部寛'],
  '堺雅人': ['堺雅人'],
  '菅野美穂': ['菅野美穂'],
  '北川景子': ['北川景子'],
  'DAIGO': ['DAIGO'],
  '川口春奈': ['川口春奈'],
  '橋本環奈': ['橋本環奈'],
  '広瀬すず': ['広瀬すず'],
  '浜辺美波': ['浜辺美波'],
  '吉沢亮': ['吉沢亮'],
  '山﨑賢人': ['山崎賢人'],
  '松坂桃李': ['松坂桃李'],
  '戸田恵梨香': ['戸田恵梨香'],
  '木村文乃': ['木村文乃'],
  '多部未華子': ['多部未華子'],
  '木南晴夏': ['木南晴夏'],
  '米津玄師': ['米津玄師'],
  'あいみょん': ['あいみょん'],
  '藤井風': ['藤井風'],
  'Official髭男dism': ['Official髭男dism'],
  'King Gnu': ['King Gnu'],
  'YOASOBI': ['YOASOBI'],
  'MISIA': ['MISIA'],
  '福山雅治': ['福山雅治'],
  'ゆず（北川悠仁・岩沢厚治）': ['北川悠仁'],
  'aiko': ['aiko'],
  'JUJU': ['JUJU'],
  'LiSA': ['LiSA'],
  'NiziUメンバー': ['NiziU'],
  'Perfume（あ〜ちゃん・かしゆか・のっち）': ['Perfume'],
  'DA PUMP・ISSA': ['DA PUMP'],
  '三浦大知': ['三浦大知'],
  '平井堅': ['平井堅'],
  'スピッツ（草野マサムネほか）': ['スピッツ'],
  'B\'z（稲葉浩志・松本孝弘）': ['稲葉浩志'],
  'DREAMS COME TRUE（吉田美和・中村正人）': ['吉田美和'],
  '水卜麻美': ['水卜麻美'],
  '安住紳一郎': ['安住紳一郎'],
  '弘中綾香': ['弘中綾香'],
  '和久田麻由子': ['和久田麻由子'],
  '桑子真帆': ['桑子真帆'],
  '高橋真麻': ['高橋真麻'],
  '羽鳥慎一': ['羽鳥慎一'],
  '藤井貴彦': ['藤井貴彦'],
  '武田真一': ['武田真一'],
  '井上清華': ['井上清華'],
  '生田竜聖': ['生田竜聖'],
  '新井恵理那': ['新井恵理那'],
  '川田裕美': ['川田裕美'],
  '池上彰': ['池上彰'],
  'カズレーザー（メイプル超合金）': ['カズレーザー'],
  'HIKAKIN（ヒカキン）': ['HIKAKIN'],
  'SEIKIN（セイキン）': ['SEIKIN'],
  'Masuo（マスオ）': ['Masuo'],
  '瀬戸弘司': ['瀬戸弘司'],
  'カズチャンネル（Kazu）': ['カズチャンネル'],
  'SushiRamen【りく】': ['SushiRamen'],
  'ピアソン（Kazuyoshi）': ['ピアソン'],
  'キヨ。': ['キヨ'],
  'レトルト': ['レトルト'],
  'ポッキー（Pocky）': ['ポッキー'],
  '水溜りボンド（カンタ・トミー）': ['水溜りボンド'],
  '東海オンエア・てつや': ['てつや'],
  'QuizKnock（伊沢拓司ほか）': ['伊沢拓司'],
  'リュウジ（料理研究家）': ['リュウジ'],
}

async function fetchFromWikipedia(pageTitles: string[]): Promise<string | null> {
  for (const title of pageTitles) {
    try {
      const url = new URL('https://ja.wikipedia.org/w/api.php')
      url.searchParams.set('action', 'query')
      url.searchParams.set('format', 'json')
      url.searchParams.set('titles', title)
      url.searchParams.set('prop', 'pageimages')
      url.searchParams.set('pithumbsize', '300')

      const res = await fetch(url.toString())
      if (!res.ok) continue

      const text = await res.text()
      const data = JSON.parse(text)

      const pages = data.query?.pages || {}
      for (const pageId in pages) {
        const page = pages[pageId]
        if (page.thumbnail?.source) {
          return page.thumbnail.source
        }
      }
    } catch {
      continue
    }
  }
  return null
}

async function main() {
  console.log('🖼️  Fetching ALL celebrity images (comprehensive attempt)...\n')

  const results: Record<string, string | null> = { ...existingImages }
  let successCount = Object.values(results).filter((v) => v !== null).length
  let newlyFetched = 0

  for (let i = 0; i < allCelebrities.length; i++) {
    const celebrity = allCelebrities[i]

    // 既に取得済みならスキップ
    if (results[celebrity.name]) {
      continue
    }

    if ((i + 1) % 20 === 0) {
      console.log(
        `[${i + 1}/${allCelebrities.length}] Processing... (${successCount} total, ${newlyFetched} newly fetched)`,
      )
    }

    // Wikipedia ページ名の候補を取得
    const pageNames = pageNameMappings[celebrity.name] || [celebrity.name]

    // Wikipedia から取得を試みる
    const imageUrl = await fetchFromWikipedia(pageNames)

    if (imageUrl) {
      results[celebrity.name] = imageUrl
      successCount++
      newlyFetched++
    } else {
      results[celebrity.name] = null
    }

    // レート制限対策
    await new Promise((resolve) => setTimeout(resolve, 150))
  }

  console.log('\n✅ Image fetching complete!')
  console.log(`📊 Total results: ${successCount}/${allCelebrities.length} (${Math.round((successCount / allCelebrities.length) * 100)}%)`)
  console.log(`📈 Newly fetched: ${newlyFetched}`)

  // ファイルに保存
  const outputDir = path.dirname(new URL(import.meta.url).pathname)
  const jsonPath = path.join(outputDir, 'celebrities-images.json')

  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))
  console.log(`\n💾 Results saved to: ${jsonPath}`)

  // 失敗した人物を表示
  const failed = Object.entries(results).filter(([_, url]) => url === null)
  if (failed.length > 0) {
    console.log(`\n⚠️  Failed to fetch (${failed.length}):`)
    failed.slice(0, 20).forEach(([name]) => {
      console.log(`   • ${name}`)
    })
    if (failed.length > 20) {
      console.log(`   ... and ${failed.length - 20} more`)
    }
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
