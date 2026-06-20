<script setup lang="ts">
import { computed, ref } from 'vue'

const instagram = 'https://www.instagram.com/mak_mochataro3/'
const baseUrl = import.meta.env.BASE_URL
function image(path: string) { return `${import.meta.env.BASE_URL}${path}` }
const active = ref(0)
const patterns = [
  { name: 'Immersive A', ja: '結びの接写', concept: '作品の結びを画面いっぱいに見せ、色と細部へ静かに引き込む' },
  { name: 'Immersive B', ja: '季節の色面', concept: '3枚の写真を縦に分割し、色の移り変わりそのものを体験させる' },
  { name: 'Immersive C', ja: 'マルシェ空間', concept: '出店風景へ入り込むように見せ、実物に会いたい気持ちを作る' },
  { name: 'Collage A', ja: 'スクラップブック', concept: '写真・付箋・テープを重ね、手仕事の可愛らしさを強く見せる' },
  { name: 'Collage B', ja: 'ギャラリーウォール', concept: '額装した作品写真を壁に飾るように配置し、可愛さと上品さを両立する' },
  { name: 'Collage C', ja: 'カラーオーダーボード', concept: '色見本と作品カードを並べ、自分だけの組み合わせを想像させる' },
]
const current = computed(() => patterns[active.value])
</script>

<template>
  <aside class="lab-bar">
    <div class="lab-title"><b>MOCHA Layout Lab</b><span>Immersive × Collage / 6 variations</span></div>
    <div class="lab-tabs">
      <button v-for="(pattern, index) in patterns" :key="pattern.name" :class="{ active: active === index }" @click="active = index">
        <i>0{{ index + 1 }}</i><span>{{ pattern.name }}<small>{{ pattern.ja }}</small></span>
      </button>
    </div>
    <a :href="baseUrl" class="back-link">現在のLPへ戻る</a>
  </aside>
  <div class="concept-caption"><span>Pattern 0{{ active + 1 }}</span><strong>{{ current.ja }}</strong><p>{{ current.concept }}</p></div>

  <main>
    <div v-if="active === 0" class="pattern ix ix-detail">
      <header class="ix-header"><b>水引工房 MOCHA</b><span>Works &nbsp; Story &nbsp; Market</span><em>JP / EN</em></header>
      <section class="ixd-hero">
        <img :src="image('images/gallery/image1.jpg')" alt="">
        <div class="ixd-shade"></div>
        <div class="ixd-copy"><span>Mizuhiki Studio Mocha</span><h1>ひと結びに、<br>季節と願いを。</h1><p>細やかな線が重なり、美しい一つの結びになる。<br>日本の水引を、今日の色で。</p><a :href="instagram">新しい結びを見る ↗</a></div>
        <div class="ixd-lens"><img :src="image('images/gallery/image1.jpg')" alt=""><span>DETAIL / 01</span></div>
        <p class="ixd-vertical">THE BEAUTY OF<br>EVERY KNOT</p>
      </section>
      <section class="ixd-next"><div><span>OUR SIGNATURE</span><h2>近づいて見るほど、<br>好きになる。</h2><p>色の重なり、結びの立体感、小さな扇のモチーフ。接写を中心に、手仕事の繊細さを伝えるレイアウトです。</p></div><img :src="image('images/gallery/image3.jpg')" alt=""></section>
    </div>

    <div v-else-if="active === 1" class="pattern ix ix-split">
      <header class="ix-header light"><b>水引工房 MOCHA</b><span>Seasonal Colors</span><em>JP / EN</em></header>
      <section class="ixs-hero">
        <figure><img :src="image('images/gallery/image1.jpg')" alt=""><figcaption>若葉 / Early Summer</figcaption></figure>
        <figure><img :src="image('images/gallery/image2.jpg')" alt=""><figcaption>梅 / Spring</figcaption></figure>
        <figure><img :src="image('images/gallery/image3.jpg')" alt=""><figcaption>藍 / Winter</figcaption></figure>
        <div class="ixs-copy"><span>Choose Your Season</span><h1>季節を選ぶように、<br>結びを選ぶ。</h1><a :href="instagram">作品を見る</a></div>
      </section>
      <section class="ixs-strip"><p>春のやわらかな色。夏の澄んだ青。秋の深い彩り。冬の静かな白。</p><div><i></i><i></i><i></i><i></i><i></i></div><b>Colors, seasons & wishes</b></section>
    </div>

    <div v-else-if="active === 2" class="pattern ix ix-market">
      <header class="ix-header"><b>水引工房 MOCHA</b><span>Meet us at the market</span><em>JP / EN</em></header>
      <section class="ixm-hero">
        <img :src="image('images/main/1753941066765.jpg')" alt="">
        <div class="ixm-shade"></div>
        <div class="ixm-copy"><span>COME AND FIND YOUR KNOT</span><h1>写真の先の色に、<br>会いに来てください。</h1><p>見て、合わせて、試して選ぶ。<br>マルシェには、あなただけの出会いがあります。</p><a :href="instagram">次の出店予定を見る</a></div>
        <div class="ixm-cards"><img :src="image('images/gallery/image2.jpg')" alt=""><img :src="image('images/main/accessory.jpg')" alt=""><span>Touch<br>Try<br>Choose</span></div>
      </section>
      <section class="ixm-info"><b>NEXT MARKET</b><h2>作品を手に取る時間も、<br>MOCHAの大切な体験です。</h2><a :href="instagram">Instagramで最新情報を確認 →</a></section>
    </div>

    <div v-else-if="active === 3" class="pattern cx cx-scrap">
      <header class="cx-header"><b>水引工房 MOCHA</b><span>かわいい結び、集めました。</span><a :href="instagram">Instagram ↗</a></header>
      <section class="cxs-hero">
        <div class="cxs-copy"><small>MOCHA'S MIZUHIKI SCRAPBOOK</small><h1>好きな色を、<br>ぺたぺた集める。</h1><p>季節の色、動物モチーフ、お気に入りの御朱印帳。選ぶ時間も楽しめる、手作りのスクラップブック。</p><a :href="instagram">もっと作品を見る</a></div>
        <div class="scrap-photo s1"><i></i><img :src="image('images/gallery/image2.jpg')" alt=""><span>春色みつけた！</span></div>
        <div class="scrap-photo s2"><i></i><img :src="image('images/gallery/image1.jpg')" alt=""><span>青磁 × 扇</span></div>
        <div class="scrap-photo s3"><i></i><img :src="image('images/order/idol_yellow.jpg')" alt=""><span>推し色オーダー</span></div>
        <div class="cxs-stamp">結<br><small>MOCHA</small></div><p class="cxs-note n1">DMで相談できます</p><p class="cxs-note n2">次はどの色？</p>
      </section>
      <section class="cxs-news"><h2>THIS MONTH'S FAVORITES</h2><div><img :src="image('images/order/idol_pink.jpg')" alt=""><img :src="image('images/order/idol_blue.jpg')" alt=""><img :src="image('images/order/idol_green.jpg')" alt=""><img :src="image('images/order/idol_purple.jpg')" alt=""></div></section>
    </div>

    <div v-else-if="active === 4" class="pattern cx cx-wall">
      <header class="cxw-header"><div><b>Mizuhiki Studio Mocha</b><span>Small gallery of meaningful knots</span></div><nav>Works &nbsp; Story &nbsp; Market &nbsp; JP / EN</nav></header>
      <section class="cxw-hero">
        <div class="cxw-copy"><span>Welcome to our small gallery</span><h1>日々に飾る、<br>小さな結びの作品。</h1><p>可愛らしい写真の貼り合わせを、整った額装と余白で上品に仕上げたコラージュ案です。</p><a :href="instagram">Gallery on Instagram →</a></div>
        <figure class="frame f1"><img :src="image('images/gallery/image1.jpg')" alt=""><figcaption>Celadon & Fan</figcaption></figure>
        <figure class="frame f2"><img :src="image('images/gallery/image2.jpg')" alt=""><figcaption>Plum Hues</figcaption></figure>
        <figure class="frame f3"><img :src="image('images/main/accessory.jpg')" alt=""><figcaption>Mizuhiki Accessories</figcaption></figure>
        <div class="cxw-flower">✿</div>
      </section>
      <section class="cxw-bottom"><span>01 / Goshuincho Bands</span><span>02 / Accessories</span><span>03 / Natural Stones</span><span>04 / Market & Workshop</span></section>
    </div>

    <div v-else class="pattern cx cx-order">
      <header class="cxo-header"><b>MOCHA COLOR ORDER BOARD</b><span>水引工房 MOCHA</span><a :href="instagram">DM相談 ↗</a></header>
      <section class="cxo-hero">
        <div class="cxo-copy"><span>MAKE IT YOURS</span><h1>色を並べて、<br>わたしだけの結びへ。</h1><p>好きな色、御朱印帳、モチーフを組み合わせる楽しさを、オーダーボードのように見せます。</p><a :href="instagram">好きな色を相談する</a></div>
        <div class="cxo-board">
          <figure class="ticket t1"><img :src="image('images/gallery/image3.jpg')" alt=""><figcaption>01 / Choose a knot</figcaption></figure>
          <figure class="ticket t2"><img :src="image('images/gallery/image2.jpg')" alt=""><figcaption>02 / Choose a motif</figcaption></figure>
          <figure class="ticket t3"><img :src="image('images/main/band.jpg')" alt=""><figcaption>03 / Match your book</figcaption></figure>
          <div class="cxo-swatches"><b>CHOOSE COLORS</b><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="cxo-arrow">好きな組み合わせを<br>DMで教えてください ↗</div>
        </div>
      </section>
      <section class="cxo-steps"><div><b>01</b><span>色を選ぶ</span></div><div><b>02</b><span>モチーフを選ぶ</span></div><div><b>03</b><span>相談する</span></div><a :href="instagram">Instagram DM →</a></section>
    </div>
  </main>
</template>
