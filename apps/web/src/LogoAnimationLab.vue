<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const patterns = [
  { id: 'classic', number: '01', title: '基本描画', note: '外周から横∞、縦∞の順で完成。' },
  { id: 'together', number: '02', title: '左右同時', note: '左右の外周と二つの∞を同時描画。' },
  { id: 'infinity-first', number: '03', title: '結びから', note: '二つの無限結びから外側へ広がる。' },
  { id: 'outside-first', number: '04', title: 'ハートから', note: 'ハート形を描いて中央で結びます。' },
  { id: 'horizontal-first', number: '05', title: '横から縦へ', note: '横向き∞のあと縦向き∞を重ねます。' },
  { id: 'vertical-first', number: '06', title: '縦から横へ', note: '縦向き∞のあと横向き∞を重ねます。' },
  { id: 'alternate', number: '07', title: '交互に描く', note: '外周と結び目を交互に組み立てます。' },
  { id: 'soft', number: '08', title: 'ゆっくり結ぶ', note: '柔らかな速度で静かに完成します。' },
  { id: 'pulse', number: '09', title: '結びの鼓動', note: '完成後、中央の∞が小さく呼吸します。' },
  { id: 'continuous', number: '10', title: '流れる線', note: '左から中央、右の雫へ流れます。' },
]
</script>

<template>
  <main class="logo-lab">
    <header class="logo-lab__header">
      <div>
        <p>MIZUHIKI STUDIO MOCHA / DOUBLE INFINITY KNOT</p>
        <h1>二つの無限結びで作るロゴ 10パターン</h1>
      </div>
      <div class="logo-lab__actions">
        <button type="button" @click="replayKey++"><span>↻</span> すべて再生</button>
        <a href="/">サイトへ戻る</a>
      </div>
    </header>

    <section :key="replayKey" class="logo-lab__grid">
      <article v-for="pattern in patterns" :key="pattern.id" class="motion-card">
        <header>
          <span>Pattern {{ pattern.number }}</span>
          <h2>{{ pattern.title }}</h2>
          <p>{{ pattern.note }}</p>
        </header>

        <div class="motion-stage" :class="`motion-stage--${pattern.id}`">
          <div class="motion-stage__halo"></div>
          <svg class="mocha-mark" viewBox="0 0 420 330" role="img" :aria-label="`${pattern.title}のロゴアニメーション`">
            <g class="outer-cords">
              <path class="cord cord--brown outer outer--brown-left" pathLength="1" d="M58 232 C94 242 118 221 118 178 L118 104 C118 62 162 51 184 82 L210 122" />
              <path class="cord cord--green outer outer--green-left" pathLength="1" d="M130 90 C119 122 144 144 173 174 L187 187" />
              <path class="cord cord--green outer outer--green-right" pathLength="1" d="M233 187 L247 174 C276 144 301 122 290 90" />
              <path class="cord cord--brown outer outer--brown-right" pathLength="1" d="M210 122 L236 82 C258 51 302 62 302 104 L302 178 C302 206 318 220 344 218" />
            </g>

            <g class="double-infinity">
              <path class="cord cord--brown infinity infinity--horizontal" pathLength="1" d="M210 172 C190 143 158 147 158 172 C158 197 190 201 210 172 C230 143 262 147 262 172 C262 197 230 201 210 172 Z" />
              <path class="infinity-gap infinity infinity--vertical-gap" pathLength="1" d="M210 172 C181 152 185 124 210 124 C235 124 239 152 210 172 C181 192 185 220 210 220 C235 220 239 192 210 172 Z" />
              <path class="cord cord--green infinity infinity--vertical" pathLength="1" d="M210 172 C181 152 185 124 210 124 C235 124 239 152 210 172 C181 192 185 220 210 220 C235 220 239 192 210 172 Z" />
              <circle class="knot-center" cx="210" cy="172" r="4" />
            </g>

            <g class="ornament">
              <circle class="bead" cx="344" cy="226" r="6" />
              <path class="cord cord--gold drop" pathLength="1" d="M344 239 C344 239 332 253 332 263 C332 276 356 276 356 263 C356 253 344 239 344 239 Z" />
            </g>

            <g class="mark-type">
              <text x="210" y="310" text-anchor="middle">水引工房MOCHA</text>
            </g>
          </svg>
          <span class="motion-stage__status">TYING...</span>
        </div>
      </article>
    </section>
  </main>
</template>
