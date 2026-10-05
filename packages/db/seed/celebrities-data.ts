// imageSourceUrl は画像のダウンロード元。シード時に R2 へ保存し、DB にはその配信パスを入れる

// スキャンダル側のデータ（100人）
export const scandalCelebrities = [
  {
    name: '清原和博',
    profile: '元アスリート/タレント',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反容疑で逮捕',
    sourceUrl: 'https://ja.wikipedia.org/wiki/清原和博',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Kazuhiro_Kiyohara_19901013.jpg/330px-Kazuhiro_Kiyohara_19901013.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '成宮寛貴',
    profile: '元俳優',
    category: 'scandal' as const,
    scandalSummary: '薬物疑惑報道に伴い芸能界引退',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Hiroki_Narimiya_IMG_3289-2_20150412.JPG/330px-Hiroki_Narimiya_IMG_3289-2_20150412.JPG?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: 'ベッキー',
    profile: 'タレント',
    category: 'scandal' as const,
    scandalSummary: '不倫報道による出演番組・CM全降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://livedoor.blogimg.jp/masashi44444444-japanesebeautifu/imgs/a/6/a6aa7ba2.png',
  },
  {
    name: '川谷絵音',
    profile: 'ミュージシャン',
    category: 'scandal' as const,
    scandalSummary: '不倫報道',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/f0/Enon_Kawatani,_2015.jpg?utm_source=en.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'ボビー・オロゴン',
    profile: 'タレント',
    category: 'criminal' as const,
    scandalSummary: '暴行容疑（DV）で現行犯逮捕',
    sourceUrl: '',
    imageSourceUrl: 'https://www.saitama-np.co.jp/upload/images_old/201911140202-3.jpg',
  },
  {
    name: 'せいや（霜降り明星）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: 'オンライン会議ツールでの露出報道',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shimofuri-Myojo_Seiya_20190110.jpg/330px-Shimofuri-Myojo_Seiya_20190110.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '亀梨和也',
    profile: 'アーティスト',
    category: 'scandal' as const,
    scandalSummary: '未成年者との酒席同席問題（厳重注意）',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Kamenashi_Kazuya_from_%22The_Dogs_of_Karma%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578073440%29.jpg/330px-Kamenashi_Kazuya_from_%22The_Dogs_of_Karma%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578073440%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '山下智久',
    profile: '俳優/アーティスト',
    category: 'scandal' as const,
    scandalSummary: '未成年者との酒席同席問題（一定期間の活動自粛）',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Tomohisa_Yamashita_%28%E5%B1%B1%E4%B8%8B_%E6%99%BA%E4%B9%85%29_05.jpg/330px-Tomohisa_Yamashita_%28%E5%B1%B1%E4%B8%8B_%E6%99%BA%E4%B9%85%29_05.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '小倉優香',
    profile: 'タレント',
    category: 'scandal' as const,
    scandalSummary: '生放送番組内での降板直訴による所属事務所退所',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/29/小倉優香.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '猪俣周杜（timelesz）',
    profile: 'アーティスト',
    category: 'criminal' as const,
    scandalSummary: '知人女性への傷害容疑で逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://ogre.natalie.mu/media/news/owarai/2025/0629/inomatashuto_art202506.jpg?imdensity=1&imwidth=468',
  },
  {
    name: '東出昌大',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '女性関係・不倫報道に伴うCM契約解除および事務所契約解除',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Higashide_Masahiro_from_%22Satoshi-_A_Move_for_Tomorrow%22_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2016_%2832831024483%29.jpg/330px-Higashide_Masahiro_from_%22Satoshi-_A_Move_for_Tomorrow%22_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2016_%2832831024483%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '渡部建（アンジャッシュ）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '複数女性との不倫スキャンダルによる活動自粛',
    sourceUrl: '',
    imageSourceUrl: 'https://cdn.asagei.com/asajo/uploads/2020/06/20200612_asajo_watabe.jpg',
  },
  {
    name: '香川照之',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '過去の性加害・ハラスメント報道に伴う番組・CM降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Ichikawa_Chusha_IX_Teruyuki_Kagawa_IMG_3004r_20160109.JPG/330px-Ichikawa_Chusha_IX_Teruyuki_Kagawa_IMG_3004r_20160109.JPG?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '広末涼子',
    profile: '女優',
    category: 'scandal' as const,
    scandalSummary: '不倫報道に伴う無期限謹慎処分および事務所退所',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Hirosue_Ryoko_from_%222_Women%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2022_%2852460524722%29.jpg/330px-Hirosue_Ryoko_from_%222_Women%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2022_%2852460524722%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '市川猿之助',
    profile: '歌舞伎役者/俳優',
    category: 'criminal' as const,
    scandalSummary: '自殺幇助容疑による逮捕・有罪判決',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Masahiko_Kinoshi_cropped_1_Masahiko_Kinoshi_201011.jpg?utm_source=en.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '永山絢斗',
    profile: '俳優',
    category: 'criminal' as const,
    scandalSummary: '大麻取締法違反容疑による逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://spice.eplus.jp/images/zBGeIUzeDqwejVs48f7SaEn0n8oD6gLoqqyEdQMMwNHPGb4GPwMCoQPbVR5oJZgr',
  },
  {
    name: '沢尻エリカ',
    profile: '女優',
    category: 'criminal' as const,
    scandalSummary: '麻薬取締法違反容疑による逮捕',
    sourceUrl: '',
    imageSourceUrl: 'https://cdn.asagei.com/asajo/uploads/2019/12/20191209_asajo_sawajiri.jpg',
  },
  {
    name: '伊勢谷友介',
    profile: '俳優',
    category: 'criminal' as const,
    scandalSummary: '大麻取締法違反容疑による逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Toyota_MARK_X_ZiO_発表会_-_伊勢谷友介.jpg/960px-Toyota_MARK_X_ZiO_発表会_-_伊勢谷友介.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: 'ピエール瀧',
    profile: 'ミュージシャン/俳優',
    category: 'criminal' as const,
    scandalSummary: '麻薬取締法違反容疑による逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Pierre_Taki_-_Denki_Groove_-_countdownjapan-dec29-2011b.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '田口淳之介（元KAT-TUN）',
    profile: 'アーティスト',
    category: 'criminal' as const,
    scandalSummary: '大麻取締法違反容疑による逮捕',
    sourceUrl: '',
    imageSourceUrl: 'https://images.entertainment.ie/person/w780_1X7PDQH5hZVQr56v0jIQGFmXBR7.jpg',
  },
  {
    name: '山口達也（元TOKIO）',
    profile: 'アーティスト',
    category: 'criminal' as const,
    scandalSummary: '強制わいせつ容疑での書類送検および芸能界引退',
    sourceUrl: '',
    imageSourceUrl:
      'https://contents.oricon.co.jp/upimg/news/2362000/2361976/20230328_113956_p_o_27736302.jpg',
  },
  {
    name: '小出恵介',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '未成年者との不適切交際報道による活動停止',
    sourceUrl: '',
    imageSourceUrl:
      'https://rhythmediatalent.jp/wp-content/uploads/2023/12/y4oIbqhD-scaled-1-1024x768.jpeg',
  },
  {
    name: '高畑裕太',
    profile: '元俳優',
    category: 'criminal' as const,
    scandalSummary: '暴行容疑での逮捕（示談成立・不起訴）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%AB%98%E7%95%91%E8%A3%95%E5%A4%AA%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '狩野英孝',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '淫行疑惑報道に伴う謹慎処分',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Eiko_Kano.png/330px-Eiko_Kano.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '宮迫博之',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題に伴う吉本興業との契約解除',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/%E4%B8%B2%E3%82%AB%E3%83%84%E5%AE%AE%E8%BF%AB20200718_183644.jpg/330px-%E4%B8%B2%E3%82%AB%E3%83%84%E5%AE%AE%E8%BF%AB20200718_183644.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '田村亮（ロンドンブーツ1号2号）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題に伴う謹慎処分',
    sourceUrl: '',
    imageSourceUrl:
      'https://ogre.natalie.mu/media/news/owarai/2020/0424/londonboots1gou2gou-ryo_art.jpg?imdensity=1&impolicy=hq&imwidth=1460',
  },
  {
    name: '徳井義実（チュートリアル）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '巨額申告漏れ・所得隠し問題による活動自粛',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%BE%B3%E4%BA%95%E7%BE%A9%E5%AE%9F%EF%BC%88%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '木下優樹菜',
    profile: '元タレント',
    category: 'scandal' as const,
    scandalSummary: '恫喝ダイレクトメッセージ騒動に伴う芸能界引退',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/32/%E6%9C%A8%E4%B8%8B%E5%84%AA%E6%A8%B9%E8%8F%9C.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
  },
  {
    name: '袴田吉彦',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '不倫報道（アパホテル不倫）',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Gthumb.svg/330px-Gthumb.svg.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '原田龍二',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '複数ファンとの不倫報道',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Ryuji_Harada_in_2017.jpg/330px-Ryuji_Harada_in_2017.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '斉藤慎二（ジャングルポケット）',
    profile: 'お笑い芸人',
    category: 'criminal' as const,
    scandalSummary: '女性問題・不同意性交容疑等での書類送検・グループ脱退',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%96%89%E8%97%A4%E6%85%8E%E4%BA%8C%EF%BC%88%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%9D%E3%82%B1%E3%83%83%E3%83%88%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '中丸雄一（KAT-TUN）',
    profile: 'アーティスト',
    category: 'scandal' as const,
    scandalSummary: '密会・不倫疑惑報道に伴う謹慎',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E4%B8%AD%E4%B8%B8%E9%9B%84%E4%B8%80%EF%BC%88KAT-TUN%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '市川海老蔵（現・市川團十郎）',
    profile: '歌舞伎役者',
    category: 'scandal' as const,
    scandalSummary: '西麻布での暴行被災トラブル（2010年）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%B8%82%E5%B7%9D%E6%B5%B7%E8%80%81%E8%94%B5%EF%BC%88%E7%8F%BE%E3%83%BB%E5%B8%82%E5%B7%9D%E5%9C%98%E5%8D%81%E9%83%8E%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '押尾学',
    profile: '元俳優',
    category: 'criminal' as const,
    scandalSummary: '保護責任者遺棄致死罪および麻薬取締法違反で実刑判決（2010年判決）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%8A%BC%E5%B0%BE%E5%AD%A6%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '高知東生',
    profile: '元俳優',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反容疑で逮捕',
    sourceUrl: '',
    imageSourceUrl: 'https://i.daily.jp/gossip/2020/09/10/Images/d_13681743.jpg',
  },
  {
    name: '酒井法子',
    profile: '元女優/歌手',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反での起訴・判決（2010年代の活動影響）',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Sakai_Noriko-groink2000.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'ASKA',
    profile: 'ミュージシャン',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反容疑で逮捕',
    sourceUrl: '',
    imageSourceUrl: 'https://www.fujitv.co.jp/FNS/2023/img23/aska.jpg',
  },
  {
    name: '槇原敬之',
    profile: 'シンガーソングライター',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反容疑で再逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Noriyuki_Makihara_TIME_TRAVELING_1.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'JAYWALK中村耕一',
    profile: 'ミュージシャン',
    category: 'criminal' as const,
    scandalSummary: '覚醒剤取締法違反容疑で逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://fc.ismcdn.jp/mwimgs/0/d/1500wm/img_0d3aefdc89b7155c65ff35fcece61db83633236.jpg',
  },
  {
    name: 'KENTA（ONE OK ROCK元メンバー）',
    profile: 'アーティスト',
    category: 'scandal' as const,
    scandalSummary: '各種コンプライアンス問題',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=KENTA%EF%BC%88ONE%20OK%20ROCK%E5%85%83%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '山本裕典',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '契約違反・素行不良に伴う事務所契約解除',
    sourceUrl: '',
    imageSourceUrl:
      'https://jprime.ismcdn.jp/mwimgs/9/2/-/img_92359881026b511231f12be35ded6d80637428.jpg',
  },
  {
    name: '塩谷瞬',
    profile: '俳優',
    category: 'scandal' as const,
    scandalSummary: '二股交際騒動',
    sourceUrl: '',
    imageSourceUrl: 'https://news.j-wave.co.jp/images/board/20230623_PLAYITLOUD.jpg',
  },
  {
    name: '純烈・友井雄亮',
    profile: '元歌手',
    category: 'scandal' as const,
    scandalSummary: '過去のDV・金銭トラブル報道による芸能界引退',
    sourceUrl: '',
    imageSourceUrl: 'https://pbs.twimg.com/media/DwnZaGKVYAEQUtP.jpg',
  },
  {
    name: '極楽とんぼ・山本圭壱',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '過去の不祥事による長期活動休止からの復帰期トラブル',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%A5%B5%E6%A5%BD%E3%81%A8%E3%82%93%E3%81%BC%E3%83%BB%E5%B1%B1%E6%9C%AC%E5%9C%AD%E5%A3%B1%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'TKO木下隆行',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '後輩芸人へのパワハラ騒動に伴う事務所退所',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=TKO%E6%9C%A8%E4%B8%8B%E9%9A%86%E8%A1%8C%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'TKO木本武宏',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '巨額投資・金銭トラブル報道による活動自粛',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=TKO%E6%9C%A8%E6%9C%AC%E6%AD%A6%E5%AE%8F%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'スリムクラブ（真栄田賢・内間政成）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題による無期限謹慎',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%B9%E3%83%AA%E3%83%A0%E3%82%AF%E3%83%A9%E3%83%96%EF%BC%88%E7%9C%9F%E6%A0%84%E7%94%B0%E8%B3%A2%E3%83%BB%E5%86%85%E9%96%93%E6%94%BF%E6%88%90%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '2700（八十島・ツネ）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題による謹慎',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=2700%EF%BC%88%E5%85%AB%E5%8D%81%E5%B3%B6%E3%83%BB%E3%83%84%E3%83%8D%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'HG（レイザーラモン）',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題による謹慎',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=HG%EF%BC%88%E3%83%AC%E3%82%A4%E3%82%B6%E3%83%BC%E3%83%A9%E3%83%A2%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ガリットチュウ福島',
    profile: 'お笑い芸人',
    category: 'scandal' as const,
    scandalSummary: '闇営業問題による謹慎',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%AC%E3%83%AA%E3%83%83%E3%83%88%E3%83%81%E3%83%A5%E3%82%A6%E7%A6%8F%E5%B3%B6%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'レペゼンフォックス（DJ社長）',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: 'パワハラ捏造自作自演騒動',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%AC%E3%83%9A%E3%82%BC%E3%83%B3%E3%83%95%E3%82%A9%E3%83%83%E3%82%AF%E3%82%B9%EF%BC%88DJ%E7%A4%BE%E9%95%B7%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ジャックポット',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '街頭ドッキリによる警察沙汰',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%B8%E3%83%A3%E3%83%83%E3%82%AF%E3%83%9D%E3%83%83%E3%83%88%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ヴァンビ（白井竜樹）',
    profile: 'YouTuber',
    category: 'criminal' as const,
    scandalSummary: '女性への粗暴行為（東京都迷惑防止条例違反容疑）で現行犯逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%93%EF%BC%88%E7%99%BD%E4%BA%95%E7%AB%9C%E6%A8%B9%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'モーリー（禁断ボーイズ）',
    profile: '元YouTuber',
    category: 'criminal' as const,
    scandalSummary: '売春防止法違反容疑で逮捕',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%A2%E3%83%BC%E3%83%AA%E3%83%BC%EF%BC%88%E7%A6%81%E6%96%AD%E3%83%9C%E3%83%BC%E3%82%A4%E3%82%BA%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ジョニー・ソマリ',
    profile: '配信者',
    category: 'criminal' as const,
    scandalSummary: '建造物侵入・迷惑行為防止条例違反で逮捕・有罪判決',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Johnny_Somali_in_military-like_gear.jpg/330px-Johnny_Somali_in_military-like_gear.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: 'ワタナベマホト',
    profile: '元YouTuber',
    category: 'criminal' as const,
    scandalSummary: '児童買春・ポルノ禁止法違反容疑で逮捕・芸能界引退',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%AF%E3%82%BF%E3%83%8A%E3%83%99%E3%83%9E%E3%83%9B%E3%83%88%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'へずまりゅう',
    profile: '元YouTuber',
    category: 'criminal' as const,
    scandalSummary: '威力業務妨害・窃盗罪等で逮捕・有罪判決',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/34/へずまりゅう（cropped）.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'しバター',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '街頭迷惑撮影およびRIZIN八百長疑惑騒動',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%97%E3%83%90%E3%82%BF%E3%83%BC%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'てんちむ',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: 'ナイトブラ虚偽PR騒動・返金トラブル',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/27/Tenchimu_2019.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'かねこあや',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '裁判・泥沼訴訟トラブル',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%8B%E3%81%AD%E3%81%93%E3%81%82%E3%82%84%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ヒカル',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: 'VALU騒動（インサイダー取引疑念による大炎上）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%92%E3%82%AB%E3%83%AB%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ラファエル',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: 'VALU騒動・BAN対応',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Arcángel_San_Rafael_(Bartolomé_Román).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'いっくん（禁断ボーイズ）',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: 'VALU騒動',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%84%E3%81%A3%E3%81%8F%E3%82%93%EF%BC%88%E7%A6%81%E6%96%AD%E3%83%9C%E3%83%BC%E3%82%A4%E3%82%BA%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '木下ゆうか',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '恋愛トラブル・二股暴露被害騒動',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Yuka_Kinoshita.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'はじめしゃチョー',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '過去の二股交際報道に伴う活動休止',
    sourceUrl: '',
  },
  {
    name: '東海オンエア・しばゆー',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '夫婦間泥沼暴露・SNS爆破騒動',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%9D%B1%E6%B5%B7%E3%82%AA%E3%83%B3%E3%82%A8%E3%82%A2%E3%83%BB%E3%81%97%E3%81%B0%E3%82%86%E3%83%BC%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'あやナン（あやなん）',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '離婚騒動・SNS暴走炎上',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%82%E3%82%84%E3%83%8A%E3%83%B3%EF%BC%88%E3%81%82%E3%82%84%E3%81%AA%E3%82%93%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ゆたぼん',
    profile: 'YouTuber',
    category: 'scandal' as const,
    scandalSummary: '不登校動画およびトラック購入クラファン返金問題等',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/ゆたぼんに会ってきた【英検・留学・高卒認定試験】.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'ガーシー（東谷義和）',
    profile: '元YouTuber/元議員',
    category: 'criminal' as const,
    scandalSummary: '著名人に対する脅迫罪等で逮捕・有罪判決',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%AC%E3%83%BC%E3%82%B7%E3%83%BC%EF%BC%88%E6%9D%B1%E8%B0%B7%E7%BE%A9%E5%92%8C%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'コレコレ',
    profile: '配信者',
    category: 'scandal' as const,
    scandalSummary: '配信内の取り扱いネタを巡る法的リスク・訴訟等',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%B3%E3%83%AC%E3%82%B3%E3%83%AC%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '加藤純一',
    profile: '配信者',
    category: 'scandal' as const,
    scandalSummary: '不倫疑惑暴露・差別的発言炎上',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/93/Katojunichi_2023.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'さず',
    profile: '配信者',
    category: 'scandal' as const,
    scandalSummary: '多目的トイレ内不適切撮影（迷惑行為防止条例違反・建造物侵入容疑で書類送検）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%95%E3%81%9A%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '阿部渉',
    profile: '元NHKアナウンサー',
    category: 'scandal' as const,
    scandalSummary: '局内不倫報道・番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%98%BF%E9%83%A8%E6%B8%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '畠山衣美',
    profile: 'NHKアナウンサー',
    category: 'scandal' as const,
    scandalSummary: '同局職員との不倫スキャンダル報道',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%95%A0%E5%B1%B1%E8%A1%A3%E7%BE%8E%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '谷岡慎一',
    profile: 'フジテレビアナウンサー',
    category: 'scandal' as const,
    scandalSummary: '重大コンプライアンス違反疑惑に伴う部署異動・番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E8%B0%B7%E5%B2%A1%E6%85%8E%E4%B8%80%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '鷲見玲奈',
    profile: 'フリーアナウンサー',
    category: 'scandal' as const,
    scandalSummary: 'テレビ東京在職時の不倫疑惑報道（本人は完全否定）',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%B7%B2%E8%A6%8B%E7%8E%B2%E5%A5%88%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '増田和也',
    profile: '元テレビ東京アナウンサー',
    category: 'scandal' as const,
    scandalSummary: '不倫疑惑報道に伴うアナウンス部離脱',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%A2%97%E7%94%B0%E5%92%8C%E4%B9%9F%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '加藤清隆',
    profile: 'コメンテーター',
    category: 'scandal' as const,
    scandalSummary: 'SNS上でのリツイートによる名誉毀損訴訟・敗訴',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%8A%A0%E8%97%A4%E6%B8%85%E9%9A%86%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '上念司',
    profile: 'コメンテーター',
    category: 'scandal' as const,
    scandalSummary: '番組発言・ネット炎上問題に伴う番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E4%B8%8A%E5%BF%B5%E5%8F%B8%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '鎌田靖',
    profile: 'コメンテーター',
    category: 'scandal' as const,
    scandalSummary: 'コメンテーター降板事例',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%8E%8C%E7%94%B0%E9%9D%96%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '登坂淳一',
    profile: 'フリーアナウンサー',
    category: 'scandal' as const,
    scandalSummary: 'NHK在職時代のハラスメント報道によるニュース番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%99%BB%E5%9D%82%E6%B7%B3%E4%B8%80%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '秋元優里',
    profile: '元フジテレビアナウンサー',
    category: 'scandal' as const,
    scandalSummary: '竹林不倫報道に伴うアナウンス室離脱',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%A7%8B%E5%85%83%E5%84%AA%E9%87%8C%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '生野陽子/中村光宏',
    profile: 'アナウンサー',
    category: 'scandal' as const,
    scandalSummary: '社内恋愛・過度なメディア追及問題',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%94%9F%E9%87%8E%E9%99%BD%E5%AD%90/%E4%B8%AD%E6%9D%91%E5%85%89%E5%AE%8F%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'みのもんた',
    profile: '司会者/タレント',
    category: 'scandal' as const,
    scandalSummary: '次男の逮捕に伴う報道番組自主降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%BF%E3%81%AE%E3%82%82%E3%82%93%E3%81%9F%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ショーンK（ショーン・マクアードル川上）',
    profile: 'タレント/コメンテーター',
    category: 'scandal' as const,
    scandalSummary: '学歴・経歴詐称報道による全番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%B3K%EF%BC%88%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%B3%E3%83%BB%E3%83%9E%E3%82%AF%E3%82%A2%E3%83%BC%E3%83%89%E3%83%AB%E5%B7%9D%E4%B8%8A%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '夏目三久',
    profile: '元アナウンサー',
    category: 'scandal' as const,
    scandalSummary: '写真流出騒動（2000年代末〜2010年代初頭）による番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%A4%8F%E7%9B%AE%E4%B8%89%E4%B9%85%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '長谷川豊',
    profile: '元アナウンサー',
    category: 'scandal' as const,
    scandalSummary: '人工透析患者に対するブログ不適切記述による全番組降板',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Yutaka_Hasegawa_2019.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '古谷経衡',
    profile: '評論家',
    category: 'scandal' as const,
    scandalSummary: 'ネット論争・言論トラブル',
    sourceUrl: '',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%8F%A4%E8%B0%B7%E7%B5%8C%E8%A1%A1%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '竹田恒泰',
    profile: 'タレント/評論家',
    category: 'scandal' as const,
    scandalSummary: '訴訟トラブル・言論炎上',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/69/Obihiro_base_takeda_tsuneyasu.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '津田大介',
    profile: 'ジャーナリスト',
    category: 'scandal' as const,
    scandalSummary: 'あいちトリエンナーレ展示を巡る炎上・脅迫問題',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Tsuda_Daisuke,_Japanese_journalist.jpg/1280px-Tsuda_Daisuke,_Japanese_journalist.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '百田尚樹',
    profile: '作家/言論人',
    category: 'scandal' as const,
    scandalSummary: 'SNS発言に関する炎上・訴訟等',
    sourceUrl: '',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Naoki_Hyakuta_cropped_1_Jun_Tsushima_and_Naoki_Hyakuta_20260617.jpg/960px-Naoki_Hyakuta_cropped_1_Jun_Tsushima_and_Naoki_Hyakuta_20260617.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '有本香',
    profile: 'ジャーナリスト',
    category: 'scandal' as const,
    scandalSummary: '言論を巡るネット上の対立・炎上',
    sourceUrl: '',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/da/Kaori_Arimoto_20250712.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
] as const

// クリーン側のデータ（100人）
export const goodCelebrities = [
  {
    name: '伊達みきお（サンドウィッチマン）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E4%BC%8A%E9%81%94%E3%81%BF%E3%81%8D%E3%81%8A%EF%BC%88%E3%82%B5%E3%83%B3%E3%83%89%E3%82%A6%E3%82%A3%E3%83%83%E3%83%81%E3%83%9E%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '富澤たけし（サンドウィッチマン）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%AF%8C%E6%BE%A4%E3%81%9F%E3%81%91%E3%81%97%EF%BC%88%E3%82%B5%E3%83%B3%E3%83%89%E3%82%A6%E3%82%A3%E3%83%83%E3%83%81%E3%83%9E%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '内村光良（ウッチャンナンチャン）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%86%85%E6%9D%91%E5%85%89%E8%89%AF%EF%BC%88%E3%82%A6%E3%83%83%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8A%E3%83%B3%E3%83%81%E3%83%A3%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'タモリ',
    profile: '司会者',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%BF%E3%83%A2%E3%83%AA%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '所ジョージ',
    profile: 'タレント',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%89%80%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B8%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '博多華丸（博多華丸・大吉）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%8D%9A%E5%A4%9A%E8%8F%AF%E4%B8%B8%EF%BC%88%E5%8D%9A%E5%A4%9A%E8%8F%AF%E4%B8%B8%E3%83%BB%E5%A4%A7%E5%90%89%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '博多大吉（博多華丸・大吉）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%8D%9A%E5%A4%9A%E5%A4%A7%E5%90%89%EF%BC%88%E5%8D%9A%E5%A4%9A%E8%8F%AF%E4%B8%B8%E3%83%BB%E5%A4%A7%E5%90%89%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '有吉弘行',
    profile: 'タレント',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Replace_this_image_JA.svg/330px-Replace_this_image_JA.svg.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '夏目三久/有吉弘行夫妻',
    profile: 'タレント',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%A4%8F%E7%9B%AE%E4%B8%89%E4%B9%85/%E6%9C%89%E5%90%89%E5%BC%98%E8%A1%8C%E5%A4%AB%E5%A6%BB%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'バカリズム',
    profile: 'お笑い芸人/脚本家',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%90%E3%82%AB%E3%83%AA%E3%82%BA%E3%83%A0%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '設楽統（バナナマン）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E8%A8%AD%E6%A5%BD%E7%B5%B1%EF%BC%88%E3%83%90%E3%83%8A%E3%83%8A%E3%83%9E%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '日村勇紀（バナナマン）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%97%A5%E6%9D%91%E5%8B%87%E7%B4%80%EF%BC%88%E3%83%90%E3%83%8A%E3%83%8A%E3%83%9E%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '川島明（麒麟）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%B7%9D%E5%B3%B6%E6%98%8E%EF%BC%88%E9%BA%92%E9%BA%9F%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '春日俊彰（オードリー）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%98%A5%E6%97%A5%E4%BF%8A%E5%BD%B0%EF%BC%88%E3%82%AA%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '若林正恭（オードリー）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E8%8B%A5%E6%9E%97%E6%AD%A3%E6%81%AD%EF%BC%88%E3%82%AA%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '陣内智則',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%99%A3%E5%86%85%E6%99%BA%E5%89%87%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '阿佐ヶ谷姉妹（渡辺江里子・木村美穂）',
    profile: 'タレント',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%98%BF%E4%BD%90%E3%83%B6%E8%B0%B7%E5%A7%89%E5%A6%B9%EF%BC%88%E6%B8%A1%E8%BE%BA%E6%B1%9F%E9%87%8C%E5%AD%90%E3%83%BB%E6%9C%A8%E6%9D%91%E7%BE%8E%E7%A9%82%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '和牛（水田信二・川西賢志郎）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%92%8C%E7%89%9B%EF%BC%88%E6%B0%B4%E7%94%B0%E4%BF%A1%E4%BA%8C%E3%83%BB%E5%B7%9D%E8%A5%BF%E8%B3%A2%E5%BF%97%E9%83%8E%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'かまいたち（山内健司・濱家隆一）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%8B%E3%81%BE%E3%81%84%E3%81%9F%E3%81%A1%EF%BC%88%E5%B1%B1%E5%86%85%E5%81%A5%E5%8F%B8%E3%83%BB%E6%BF%B1%E5%AE%B6%E9%9A%86%E4%B8%80%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'チョコレートプラネット（長田庄平・松尾駿）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%81%E3%83%A7%E3%82%B3%E3%83%AC%E3%83%BC%E3%83%88%E3%83%97%E3%83%A9%E3%83%8D%E3%83%83%E3%83%88%EF%BC%88%E9%95%B7%E7%94%B0%E5%BA%84%E5%B9%B3%E3%83%BB%E6%9D%BE%E5%B0%BE%E9%A7%BF%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '今田美桜',
    profile: 'タレント',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nagoya_PARCO_seen_from_Otsu-dori.jpg?width=300',
  },
  {
    name: '綾瀬はるか',
    profile: '女優',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Ayase_Haruka_from_%22Route29%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_(54576966862).jpg?width=300',
  },
  {
    name: '新垣結衣',
    profile: '女優',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Aragaki_Yui_from_%22(Ab)normal_Desire%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_(53348431124)_(cropped).jpg?width=300',
  },
  {
    name: '星野源',
    profile: 'ミュージシャン/俳優',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gen_hoshino.jpg?width=300',
  },
  {
    name: '佐藤栞里',
    profile: 'タレント',
    imageSourceUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shiori_Sato_in_2024.png?width=300',
  },
  {
    name: '吉高由里子',
    profile: '女優',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/52/Yuriko_Yoshitaka_from_acrofan.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '長澤まさみ',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/11R_Tokyo_Yushun_%28Japanese_Derby%29_%28G1%2C_3yo%29_Turf_2400m_at_Tokyo_racecourse_winners%27_celemony_%E8%A1%A8%E5%BD%B0%E5%BC%8F_%2852931958413%29_Masami_Nagasawa.jpg/330px-11R_Tokyo_Yushun_%28Japanese_Derby%29_%28G1%2C_3yo%29_Turf_2400m_at_Tokyo_racecourse_winners%27_celemony_%E8%A1%A8%E5%BD%B0%E5%BC%8F_%2852931958413%29_Masami_Nagasawa.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '石原さとみ',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Godzilla_Resurgence_World_Premiere_Red_Carpet_Ishihara_Satomi_%28cropped%29.jpg/330px-Godzilla_Resurgence_World_Premiere_Red_Carpet_Ishihara_Satomi_%28cropped%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '菅田将暉',
    profile: '俳優/歌手',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Suda_Masaki_from_%22Sunset_Sunrise%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854576992127%29.jpg/330px-Suda_Masaki_from_%22Sunset_Sunrise%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854576992127%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '小松菜奈',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Nana_Komatsu_of_Exit_8_at_2025_Cannes_Red_Carpet.jpg/330px-Nana_Komatsu_of_Exit_8_at_2025_Cannes_Red_Carpet.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '神木隆之介',
    profile: '俳優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Kamiki_Ryunosuke_from_%22Godzilla_Minus_One%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_%2853348227359%29_%28cropped%29.jpg/330px-Kamiki_Ryunosuke_from_%22Godzilla_Minus_One%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_%2853348227359%29_%28cropped%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '芦田愛菜',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Mana_Ashida_2020.jpg/330px-Mana_Ashida_2020.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '鈴木福',
    profile: '俳優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/%E9%88%B4%E6%9C%A8%E7%A6%8F%E3%80%8E%E3%82%AB%E3%83%A9%E3%83%80%E6%8E%A2%E3%81%97_THE_LAST_NIGHT%E3%80%8F%E3%83%88%E3%83%BC%E3%82%AF%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B8_%E6%B8%8B%E8%B0%B7%E3%82%A2%E3%82%AA%E3%83%8F%E3%83%AB2.0%E7%A5%AD_2025_%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%AB%8B%E5%AE%AE%E4%B8%8B%E5%85%AC%E5%9C%92_2025%E5%B9%B48%E6%9C%8816%E6%97%A5%E3%81%AE%E6%B8%8B%E8%B0%B7_202508161858_DSCN5347.jpg/330px-thumbnail.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '天海祐希',
    profile: '女優',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%A4%A9%E6%B5%B7%E7%A5%90%E5%B8%8C%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '阿部寛',
    profile: '俳優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Abe_Hiroshi_from_%22Legend_of_the_Demon_Cat%22_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2017_%2825332258907%29.jpg/330px-Abe_Hiroshi_from_%22Legend_of_the_Demon_Cat%22_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2017_%2825332258907%29.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '堺雅人',
    profile: '俳優',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b5/Masato_Sakai_International_Drama_Festival_in_Tokyo_2014_2.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
  },
  {
    name: '菅野美穂',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/27th_Tokyo_International_Film_Festival_Miho_Kanno.jpg/960px-27th_Tokyo_International_Film_Festival_Miho_Kanno.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '北川景子',
    profile: '女優',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Kitagawa_Keiko_"Something_Like_Something_Like_It"_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_(22430199775).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'DAIGO',
    profile: 'タレント',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/DAIGO_Naito.jpg/960px-DAIGO_Naito.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '川口春奈',
    profile: '女優',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/37/Haruna_Kawaguchi_20230623.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '橋本環奈',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Hashimoto_Kanna_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2017_(39304102215)_(cropped).jpg/960px-Hashimoto_Kanna_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2017_(39304102215)_(cropped).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '広瀬すず',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/MKr377554_Suzu_Hirose_(A_Pale_View_of_Hills,_Cannes_2025).jpg/960px-MKr377554_Suzu_Hirose_(A_Pale_View_of_Hills,_Cannes_2025).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '浜辺美波',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Hamabe_Minami_from_"Godzilla_Minus_One"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_(53347905526)_(cropped).jpg/1280px-Hamabe_Minami_from_"Godzilla_Minus_One"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_(53347905526)_(cropped).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '吉沢亮',
    profile: '俳優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Yoshizawa_Ryo_from_"Family"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_(53348335033).jpg/960px-Yoshizawa_Ryo_from_"Family"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2023_(53348335033).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '山﨑賢人',
    profile: '俳優',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%B1%B1%EF%A8%91%E8%B3%A2%E4%BA%BA%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '松坂桃李',
    profile: '俳優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Matsuzaka_Tori_from_"Snowflowers_Seeds_of_Hope"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_(54577942059).jpg/960px-Matsuzaka_Tori_from_"Snowflowers_Seeds_of_Hope"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_(54577942059).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '戸田恵梨香',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Toda_Erika_from_"Motherhood"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2022_(52461621178).jpg/1280px-Toda_Erika_from_"Motherhood"_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2022_(52461621178).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '木村文乃',
    profile: '女優',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Fumino_Kimura_(cropped).jpg/960px-Fumino_Kimura_(cropped).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: '多部未華子',
    profile: '女優',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%A4%9A%E9%83%A8%E6%9C%AA%E8%8F%AF%E5%AD%90%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '木南晴夏',
    profile: '女優',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%9C%A8%E5%8D%97%E6%99%B4%E5%A4%8F%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '米津玄師',
    profile: 'ミュージシャン',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Replace_this_image_JA.svg/1280px-Replace_this_image_JA.svg.png?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: 'あいみょん',
    profile: 'シンガーソングライター',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%81%82%E3%81%84%E3%81%BF%E3%82%87%E3%82%93%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '藤井風',
    profile: 'シンガーソングライター',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Fujii_Kaze_performing_during_Best_Of_Fujii_Kaze_2020-2024_Asia_Tour_in_Axiata_Arena_Kuala_Lumpur_(cropped)_(2).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'Official髭男dism',
    profile: 'ロックバンド',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=Official%E9%AB%AD%E7%94%B7dism%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'King Gnu',
    profile: 'ロックバンド',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=King%20Gnu%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'YOASOBI',
    profile: 'ユニット',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Yoasobi.jpg/960px-Yoasobi.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: 'MISIA',
    profile: 'シンガー',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/72/MISIA_20191006-2_(cropped).jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '福山雅治',
    profile: 'シンガーソングライター/俳優',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/97/Fukuyama_Masaharu_in_Taipei,_2013_cropped_2.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'ゆず（北川悠仁・岩沢厚治）',
    profile: 'フォークデュオ',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%86%E3%81%9A%EF%BC%88%E5%8C%97%E5%B7%9D%E6%82%A0%E4%BB%81%E3%83%BB%E5%B2%A9%E6%B2%A2%E5%8E%9A%E6%B2%BB%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'aiko',
    profile: 'シンガーソングライター',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=aiko%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'JUJU',
    profile: 'シンガー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=JUJU%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'LiSA',
    profile: 'シンガー',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/LiSA_by_Gage_Skidmore.jpg/960px-LiSA_by_Gage_Skidmore.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail',
  },
  {
    name: 'NiziUメンバー',
    profile: 'アイドルグループ',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=NiziU%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'Perfume（あ〜ちゃん・かしゆか・のっち）',
    profile: 'テクノポップユニット',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=Perfume%EF%BC%88%E3%81%82%E3%80%9C%E3%81%A1%E3%82%83%E3%82%93%E3%83%BB%E3%81%8B%E3%81%97%E3%82%86%E3%81%8B%E3%83%BB%E3%81%AE%E3%81%A3%E3%81%A1%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'DA PUMP・ISSA',
    profile: 'ダンスボーカルグループ',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=DA%20PUMP%E3%83%BBISSA%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '三浦大知',
    profile: 'ダンサー/シンガー',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/MTV_VMAJ_2014_023_%E4%B8%89%E6%B5%A6%E5%A4%A7%E7%9F%A5.jpg/330px-MTV_VMAJ_2014_023_%E4%B8%89%E6%B5%A6%E5%A4%A7%E7%9F%A5.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: '平井堅',
    profile: 'シンガー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%B9%B3%E4%BA%95%E5%A0%85%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'スピッツ（草野マサムネほか）',
    profile: 'ロックバンド',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%B9%E3%83%94%E3%83%83%E3%83%84%EF%BC%88%E8%8D%89%E9%87%8E%E3%83%9E%E3%82%B5%E3%83%A0%E3%83%8D%E3%81%BB%E3%81%8B%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: "B'z（稲葉浩志・松本孝弘）",
    profile: 'ロックユニット',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=B%27z%EF%BC%88%E7%A8%B2%E8%91%89%E6%B5%A9%E5%BF%97%E3%83%BB%E6%9D%BE%E6%9C%AC%E5%AD%9D%E5%BC%98%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'DREAMS COME TRUE（吉田美和・中村正人）',
    profile: 'ポップユニット',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=DREAMS%20COME%20TRUE%EF%BC%88%E5%90%89%E7%94%B0%E7%BE%8E%E5%92%8C%E3%83%BB%E4%B8%AD%E6%9D%91%E6%AD%A3%E4%BA%BA%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '水卜麻美',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%B0%B4%E5%8D%9C%E9%BA%BB%E7%BE%8E%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '安住紳一郎',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%AE%89%E4%BD%8F%E7%B4%B3%E4%B8%80%E9%83%8E%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '弘中綾香',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%BC%98%E4%B8%AD%E7%B6%BE%E9%A6%99%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '和久田麻由子',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Mayuko_Wakuda.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: '桑子真帆',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%A1%91%E5%AD%90%E7%9C%9F%E5%B8%86%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '高橋真麻',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E9%AB%98%E6%A9%8B%E7%9C%9F%E9%BA%BB%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '羽鳥慎一',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%BE%BD%E9%B3%A5%E6%85%8E%E4%B8%80%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '藤井貴彦',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E8%97%A4%E4%BA%95%E8%B2%B4%E5%BD%A6%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '武田真一',
    profile: 'フリーアナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%AD%A6%E7%94%B0%E7%9C%9F%E4%B8%80%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '井上清華',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E4%BA%95%E4%B8%8A%E6%B8%85%E8%8F%AF%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '生田竜聖',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E7%94%9F%E7%94%B0%E7%AB%9C%E8%81%96%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '新井恵理那',
    profile: 'フリーアナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%96%B0%E4%BA%95%E6%81%B5%E7%90%86%E9%82%A3%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '川田裕美',
    profile: 'アナウンサー',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E5%B7%9D%E7%94%B0%E8%A3%95%E7%BE%8E%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '池上彰',
    profile: 'ジャーナリスト',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/IkegamiAkiraDyor.jpg/330px-IkegamiAkiraDyor.jpg?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
  {
    name: 'カズレーザー（メイプル超合金）',
    profile: 'お笑い芸人',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%AB%E3%82%BA%E3%83%AC%E3%83%BC%E3%82%B6%E3%83%BC%EF%BC%88%E3%83%A1%E3%82%A4%E3%83%97%E3%83%AB%E8%B6%85%E5%90%88%E9%87%91%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'HIKAKIN（ヒカキン）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=HIKAKIN%EF%BC%88%E3%83%92%E3%82%AB%E3%82%AD%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'SEIKIN（セイキン）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=SEIKIN%EF%BC%88%E3%82%BB%E3%82%A4%E3%82%AD%E3%83%B3%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'Masuo（マスオ）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=Masuo%EF%BC%88%E3%83%9E%E3%82%B9%E3%82%AA%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '瀬戸弘司',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/%E7%80%AC%E6%88%B8%E5%BC%98%E5%8F%B8.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled',
  },
  {
    name: 'カズチャンネル（Kazu）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%AB%E3%82%BA%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB%EF%BC%88Kazu%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'SushiRamen【りく】',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=SushiRamen%E3%80%90%E3%82%8A%E3%81%8F%E3%80%91%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'ピアソン（Kazuyoshi）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%94%E3%82%A2%E3%82%BD%E3%83%B3%EF%BC%88Kazuyoshi%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'キヨ。',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%82%AD%E3%83%A8%E3%80%82%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: 'レトルト',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/84/My_retort.jpg?utm_source=ja.wikipedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail_unscaled',
  },
  {
    name: 'ポッキー（Pocky）',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E3%83%9D%E3%83%83%E3%82%AD%E3%83%BC%EF%BC%88Pocky%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '水溜りボンド（カンタ・トミー）',
    profile: 'YouTuberユニット',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%B0%B4%E6%BA%9C%E3%82%8A%E3%83%9C%E3%83%B3%E3%83%89%EF%BC%88%E3%82%AB%E3%83%B3%E3%82%BF%E3%83%BB%E3%83%88%E3%83%9F%E3%83%BC%EF%BC%89%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  {
    name: '東海オンエア・てつや',
    profile: 'YouTuber',
    imageSourceUrl:
      'https://tse1.mm.bing.net/th?q=%E6%9D%B1%E6%B5%B7%E3%82%AA%E3%83%B3%E3%82%A8%E3%82%A2%E3%83%BB%E3%81%A6%E3%81%A4%E3%82%84%20%E9%A1%94%E5%86%99%E7%9C%9F&w=500&h=700&c=7',
  },
  { name: 'QuizKnock（伊沢拓司ほか）', profile: 'YouTubeチャンネル' },
  {
    name: 'リュウジ（料理研究家）',
    profile: 'YouTuber/料理研究家',
    imageSourceUrl:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94.png/330px-%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94.png?utm_source=ja.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
  },
] as const
