export type Expression = 'idle' | 'smile' | 'hide' | 'uneasy'

const ARIA_LABEL: Record<Expression, string> = {
  idle: 'ジャミーン（写真をじっと見ている）',
  smile: 'ジャミーン（笑顔）',
  hide: 'ジャミーン（両手で顔を隠して嫌がっている）',
  uneasy: 'ジャミーン（浮かない顔）',
}

const HAIR = '#17110f'
const SKIN = '#f4d3b3'
const SKIN_SHADE = '#e3b690'
const DEEL = '#d9a7a0'
const RED = '#b3382c'
const LINE = '#2a1a14'

/**
 * 案内役の少女「ジャミーン」。オリジナルのイラストで、表情を expression で切り替える。
 * 長い黒髪・白い髪飾り・赤い襟の民族衣装が特徴。
 */
export function Jameen({ expression, className }: { expression: Expression; className?: string }) {
  const hiding = expression === 'hide'

  return (
    <svg viewBox="0 0 240 264" className={className} role="img" aria-label={ARIA_LABEL[expression]}>
      <g className={`jameen jameen-${expression}`}>
        {/* 後ろ髪 */}
        <path
          d="M62 130 C56 58 90 20 122 20 C156 20 188 58 180 130 L188 266 C160 276 140 266 130 252 L110 252 C100 266 80 276 52 266 Z"
          fill={HAIR}
        />

        {/* 首 */}
        <path d="M104 172 L136 172 L138 220 C128 228 112 228 102 220 Z" fill={SKIN_SHADE} />

        <g transform="translate(0 -42)">
          {/* 衣装（ピンクの上衣） */}
          <path
            d="M24 380 L24 300 C28 254 66 234 96 226 L144 226 C174 234 212 254 216 300 L216 380 Z"
            fill={DEEL}
          />
          {/* 赤い立て襟 */}
          <path d="M90 210 C100 236 140 236 150 210 L156 226 C142 250 98 250 84 226 Z" fill={RED} />
          {/* 襟の刺繍 */}
          {[98, 108, 120, 132, 142].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 ? 238 : 235} r="2" fill="#e7c27a" />
          ))}
          {/* 前立て: 襟元から右下へ斜めに走る赤い合わせの縁取り。刺繍の縫い目と結びボタン付き */}
          <path
            d="M116 242 C124 262 140 282 158 306"
            fill="none"
            stroke="#7d2219"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M116 242 C124 262 140 282 158 306"
            fill="none"
            stroke={RED}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M116 242 C124 262 140 282 158 306"
            fill="none"
            stroke="#e7c27a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 3.500"
          />
          {[
            [123.4, 257],
            [133.3, 272.5],
            [144.9, 288.7],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="4.500" fill="#f3e3c3" stroke="#8b2a20" strokeWidth="1.500" />
              <circle cx={x} cy={y} r="1.500" fill="#8b2a20" />
            </g>
          ))}
        </g>

        {/* 顔 */}
        <ellipse
          cx="120"
          cy="118"
          rx="50"
          ry="56"
          fill={SKIN}
          stroke={SKIN_SHADE}
          strokeWidth="1.5"
        />

        {/* 前髪と横髪 */}
        <path
          d="M62 128 C52 54 90 22 122 22 C154 22 192 54 182 128 C176 100 154 72 122 64 C90 72 68 100 62 128 Z"
          fill={HAIR}
        />
        <path
          d="M60 100 C52 150 60 210 54 256 C72 250 86 214 98 180 C84 170 74 154 68 132 C65 118 65 108 68 98 Z"
          fill={HAIR}
        />
        <path
          d="M180 100 C188 150 180 210 186 256 C168 250 154 214 142 180 C156 170 166 154 172 132 C175 118 175 108 172 98 Z"
          fill={HAIR}
        />
        <path
          d="M96 40 C110 32 126 30 142 36"
          stroke="#3b2f2a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 白い髪飾り */}
        <path
          d="M98 40 Q122 24 146 40"
          stroke="#f7f1e4"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="122"
          cy="33"
          rx="10"
          ry="8"
          fill="#f7f1e4"
          stroke="#cbb994"
          strokeWidth="1.5"
        />

        {/* 頬 */}
        <ellipse
          cx="90"
          cy="142"
          rx="9"
          ry="5.5"
          fill="#f08f86"
          opacity={expression === 'smile' ? 0.75 : 0.45}
        />
        <ellipse
          cx="150"
          cy="142"
          rx="9"
          ry="5.5"
          fill="#f08f86"
          opacity={expression === 'smile' ? 0.75 : 0.45}
        />

        {/* 鼻 */}
        <path
          d="M120 133 q-2.5 4 1 5.500"
          stroke="#d29c7d"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        <Face expression={expression} />

        {/* 顔を隠す両手（犯罪者の写真を見たとき） */}
        <g
          style={{
            transform: hiding ? 'translateY(0)' : 'translateY(130px)',
            opacity: hiding ? 1 : 0,
            transition: 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2), opacity 0.2s',
          }}
        >
          {/* 袖 */}
          <path d="M40 270 C36 222 64 176 90 152 L116 172 C104 196 102 232 106 270 Z" fill={DEEL} />
          <path
            d="M200 270 C204 222 176 176 150 152 L124 172 C136 196 138 232 134 270 Z"
            fill={DEEL}
          />
          <path d="M82 156 L116 176 L108 190 L72 168 Z" fill={RED} />
          <path d="M158 156 L124 176 L132 190 L168 168 Z" fill={RED} />
          {/* 手のひら */}
          <g transform="rotate(-8 106 127)">
            <ellipse
              cx="106"
              cy="127"
              rx="25"
              ry="35"
              fill={SKIN}
              stroke={SKIN_SHADE}
              strokeWidth="2"
            />
            <path
              d="M96 102 L97 126 M106 98 L106 124 M116 102 L115 126"
              stroke={SKIN_SHADE}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <g transform="rotate(8 134 127)">
            <ellipse
              cx="134"
              cy="127"
              rx="25"
              ry="35"
              fill={SKIN}
              stroke={SKIN_SHADE}
              strokeWidth="2"
            />
            <path
              d="M124 102 L125 126 M134 98 L134 124 M144 102 L143 126"
              stroke={SKIN_SHADE}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

/** 表情ごとの目・眉・口。手で隠れるとき(hide)も下に表情を持っておく */
function Face({ expression }: { expression: Expression }) {
  if (expression === 'smile') {
    return (
      <g>
        <path
          d="M90 102 Q100 96 111 100"
          stroke={LINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M129 100 Q140 96 150 102"
          stroke={LINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* にっこり閉じた目 */}
        <path
          d="M91 125 Q100 113 109 125"
          stroke={LINE}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M131 125 Q140 113 149 125"
          stroke={LINE}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* 大きく開いた笑顔 */}
        <path d="M104 146 Q120 172 136 146 Q120 152 104 146 Z" fill="#8f2f2b" />
        <path d="M108 148 Q120 154 132 148 Q120 152 108 148 Z" fill="#fff" />
      </g>
    )
  }

  if (expression === 'uneasy') {
    return (
      <g>
        {/* 眉尻が下がった困り眉 */}
        <path
          d="M89 106 Q100 104 111 97"
          stroke={LINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M129 97 Q140 104 151 106"
          stroke={LINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* 写真から目をそらして右下を見る */}
        <ellipse cx="100" cy="123" rx="8.500" ry="7" fill="#fff" />
        <ellipse cx="140" cy="123" rx="8.500" ry="7" fill="#fff" />
        <circle cx="103" cy="125" r="5.500" fill={LINE} />
        <circle cx="143" cy="125" r="5.500" fill={LINE} />
        <circle cx="104.500" cy="123" r="1.600" fill="#fff" />
        <circle cx="144.500" cy="123" r="1.600" fill="#fff" />
        <path
          d="M91 118 Q100 114 109 118"
          stroke={LINE}
          strokeWidth="2.500"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M131 118 Q140 114 149 118"
          stroke={LINE}
          strokeWidth="2.500"
          fill="none"
          strokeLinecap="round"
        />
        {/* への字に波打つ口 */}
        <path
          d="M110 154 Q115 148 120 152 Q125 156 130 150"
          stroke="#b5594f"
          strokeWidth="2.500"
          fill="none"
          strokeLinecap="round"
        />
        {/* 冷や汗 */}
        <path
          d="M164 92 Q171 103 164 110 Q157 103 164 92 Z"
          fill="#bfe3f5"
          stroke="#7fb6d6"
          strokeWidth="1.500"
        />
      </g>
    )
  }

  // idle / hide: 写真を見つめる（左上の写真のほうへ視線を向ける）
  return (
    <g>
      <path
        d="M90 105 Q100 100 111 104"
        stroke={LINE}
        strokeWidth="2.500"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M129 104 Q140 100 150 105"
        stroke={LINE}
        strokeWidth="2.500"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="100" cy="122" rx="8.500" ry="8.500" fill="#fff" />
      <ellipse cx="140" cy="122" rx="8.500" ry="8.500" fill="#fff" />
      <circle cx="97.500" cy="120.500" r="6" fill={LINE} />
      <circle cx="137.500" cy="120.500" r="6" fill={LINE} />
      <circle cx="95.500" cy="118" r="1.800" fill="#fff" />
      <circle cx="135.500" cy="118" r="1.800" fill="#fff" />
      <path
        d="M91 115 Q100 111 109 115"
        stroke={LINE}
        strokeWidth="2.500"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M131 115 Q140 111 149 115"
        stroke={LINE}
        strokeWidth="2.500"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M113 151 Q120 154.500 127 151"
        stroke="#b5594f"
        strokeWidth="2.500"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  )
}
