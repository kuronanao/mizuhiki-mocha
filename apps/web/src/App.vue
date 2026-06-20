<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Locale = 'ja' | 'en'
const instagram = 'https://www.instagram.com/mak_mochataro3/'
const locale = ref<Locale>('ja')
const menuOpen = ref(false)
const slide = ref(0)
let timer: number | undefined
function image(path: string) { return `${import.meta.env.BASE_URL}${path}` }

const heroImages = [image('images/gallery/image1.jpg'), image('images/gallery/image2.jpg'), image('images/gallery/image3.jpg'), image('images/main/1753941066765.jpg')]

const text = {
  ja: {
    nav: ['作品', '御朱印帳バンド', 'オーダー', 'マルシェ', '体験'],
    heroLabel: '御朱印帳バンド・水引アクセサリー・天然石ブレスレット',
    heroTitle: '伝統と、\n今のカワイイを結ぶ。',
    heroBody: '和の上質さとモダンな感性が溶け合う、水引工房MOCHA。主力の御朱印帳バンドをはじめ、「可愛い」と「品の良さ」をどちらも楽しめる、日常に馴染む特別なひとしなを一つずつ制作しています。',
    heroPrimary: 'Instagramで最新作品を見る', heroSecondary: '作品について知る',
    overviewTitle: '日常に馴染む、特別なひとしな。', overviewBody: '御朱印帳を彩る。装いに和心を添える。願いをお守りのように身に着ける。和の伝統に今の感性と遊び心を結び、手にする方の毎日が少しきらめく作品をお届けします。',
    bandTitle: '神社巡りも、装いも。和心きらめく結び。', bandLead: '大切な御朱印帳を彩り、しっかりと束ねる。旅のお供になる、特別な御朱印帳バンドです。',
    bandBody: '基本の梅結びから、猫やウサギなどの愛らしい動物モチーフまで。御朱印帳の柄や季節、その日の気分に合わせて選べます。実用的でありながら、手に取るたび心が弾む「あなただけの結び」を見つけてください。',
    bandPoint: ['御朱印帳をやさしく留める', '季節や帳面に合わせて選べる', '豊富な結びと動物モチーフ'], productCta: 'Instagramで作品一覧を見る',
    accessoryTitle: '伝統に遊び心を。大人の「和っ、かわいい」。', accessoryBody: '伝統的な水引結びを、現代のファッションに合わせたピアス・イヤリング・キーホルダーへ。耳元や胸元で軽やかに揺れ、和装にも普段着にも、さりげない華やかさを添えます。',
    stoneTitle: '結ぶ、祈る、輝く。願いを手元に。', stoneBody: '質を見極めた天然石と、水引の梅結びを組み合わせた、お守りのようなブレスレットです。石が持つ願いや意味を大切に、美しく身に着けられる一品へ仕立てています。',
    customTitle: '世界にひとつ、あなたのための水引。', customBody: '好きな色、動物モチーフ、贈る相手、大切にしたい願い。MOCHAの水引は、言葉にしきれない想いまで結び、かたちにします。まだぼんやりとしたイメージも、InstagramのDMから気軽にお聞かせください。',
    customCta: 'DMでオーダーを相談する', customNote: '相談だけでも大丈夫です。内容を伺いながら、できることをご案内します。',
    customSteps: [['1', 'DMで相談', '色・用途・イメージをお聞かせください'], ['2', '内容をご提案', '組み合わせやデザインをご相談します'], ['3', '一つずつ制作', '想いを込めて丁寧にお作りします']],
    marketTitle: '心ときめくひとしなに、会いに来てください。', marketBody: '写真だけでは伝わりきらない水引の細やかさ、和の上質な色合い、天然石の輝き。マルシェでは、御朱印帳との組み合わせやアクセサリーの試着を楽しみながら、心から「かわいい」と思える一品を選べます。',
    marketCta: 'Instagramで次の出店予定を見る', marketBenefits: ['実物の色と質感を見られる', '御朱印帳に合わせて選べる', 'アクセサリーを試着できる'],
    workshopTitle: '自分の手で結ぶと、水引はもっと楽しい。', workshopBody: '初めての方にも楽しんでいただける、水引アクセサリー制作体験を定期的に開催しています。完成した作品は、その日にお持ち帰りいただけます。開催場所・日時・募集情報はInstagramでお知らせします。',
    workshopCta: '次のワークショップ情報を見る',
    onlineTitle: 'あなたの日常へ、特別なひとしなを。', onlineBody: 'マルシェへ足を運ぶことが難しい方へ、メルカリでも一部作品を販売しています。大切な誰かへの贈り物にも、自分へのご褒美にも。販売中の作品はInstagramからご確認ください。', onlineButton: 'Instagramで販売情報を見る',
    instagramTitle: '和を結び、心をつなぐ。', instagramBody: '新作・限定作品、世界にひとつのオーダー事例、毎月の出店予定、ワークショップ情報を更新しています。フォローして、あなたの心がきらめく次のひとしなを見つけてください。', instagramCta: 'MOCHAをInstagramでフォロー',
  },
  en: {
    nav: ['Works', 'Goshuincho Bands', 'Custom', 'Market', 'Workshop'],
    heroLabel: 'Goshuincho bands, mizuhiki accessories and natural stone bracelets', heroTitle: 'Tying tradition\nto today’s kawaii.',
    heroBody: 'At Mizuhiki Studio MOCHA, refined Japanese tradition meets a modern, playful sensibility. Each piece is carefully handmade to bring something special into everyday life.',
    heroPrimary: 'See latest works on Instagram', heroSecondary: 'Discover our works',
    overviewTitle: 'Something special, made for everyday life.', overviewBody: 'To color a goshuincho, add Japanese charm to an outfit, or carry a wish like a talisman. Tradition, modern style and playfulness are tied into every piece.',
    bandTitle: 'A personal knot for your goshuincho journey.', bandLead: 'A practical elastic band that gently holds your goshuincho closed and adds a personal touch.', bandBody: 'Choose from plum knots, cats, rabbits and other motifs in colors made for seasons, moods and your favorite goshuincho.', bandPoint: ['Gently holds your book', 'Colors for seasons and moods', 'Many knots and animal motifs'], productCta: 'See the collection on Instagram',
    accessoryTitle: 'Tradition with playfulness. A grown-up kind of kawaii.', accessoryBody: 'Traditional mizuhiki knots become modern earrings, key rings and more. Light and graceful, they add a subtle touch of Japanese beauty to both everyday and special outfits.',
    stoneTitle: 'Tie, wish and shine. A talisman for your wrist.', stoneBody: 'Carefully selected natural stones are paired with a mizuhiki plum knot, creating a beautiful bracelet that carries meaning like a personal talisman.',
    customTitle: 'One of a kind, tied just for you.', customBody: 'Favorite colors, animal motifs, gifts and meaningful wishes. MOCHA ties even the feelings that are difficult to put into words into a piece made just for you.', customCta: 'Ask about a custom order', customNote: 'Questions are welcome. We will listen to your idea and explain what we can create.',
    customSteps: [['1', 'Send a DM', 'Tell us your colors, purpose and idea'], ['2', 'Shape the idea', 'We discuss combinations and design'], ['3', 'Made by hand', 'Your piece is carefully crafted']],
    marketTitle: 'Come meet the colors beyond the photographs.', marketBody: 'See delicate knots and the true light of natural stones, match a band to your goshuincho and try on accessories while choosing your piece.', marketCta: 'See upcoming market dates', marketBenefits: ['See true colors and textures', 'Match a band to your book', 'Try on accessories'],
    workshopTitle: 'Mizuhiki becomes more joyful when you tie it yourself.', workshopBody: 'We regularly hold beginner-friendly mizuhiki accessory workshops. Take your finished piece home the same day. Dates and application details are shared on Instagram.', workshopCta: 'See workshop information',
    onlineTitle: 'Meet our works, wherever you are.', onlineBody: 'Selected pieces are also available through Mercari. See current sales and online updates on Instagram.', onlineButton: 'See online sales updates',
    instagramTitle: 'Tying tradition, connecting hearts.', instagramBody: 'Follow us for new and limited works, one-of-a-kind custom orders, monthly market dates and workshop news. Find the next piece that makes your heart shine.', instagramCta: 'Follow MOCHA on Instagram',
  },
} as const

const t = computed(() => text[locale.value])
const sections = ['collections', 'bands', 'custom', 'market', 'workshop']
const collections = computed(() => [
  { title: locale.value === 'ja' ? '御朱印帳バンド' : 'Goshuincho Bands', note: locale.value === 'ja' ? '旅のお供に、特別な一つを' : 'A special companion for every journey', src: image('images/gallery/image1.jpg'), id: 'bands' },
  { title: locale.value === 'ja' ? '水引アクセサリー' : 'Mizuhiki Accessories', note: locale.value === 'ja' ? '伝統と今のカワイイを装いに' : 'Traditional beauty for modern style', src: image('images/main/accessory.jpg'), id: 'accessories' },
  { title: locale.value === 'ja' ? '天然石ブレスレット' : 'Natural Stone Bracelets', note: locale.value === 'ja' ? '願いを結ぶ、手元のお守り' : 'A wish tied into a personal talisman', src: image('images/main/stone.jpg'), id: 'stones' },
])
const orderImages = [image('images/order/idol_pink.jpg'), image('images/order/idol_blue.jpg'), image('images/order/idol_yellow.jpg'), image('images/order/1754044179807.jpg')]
function setLocale(next: Locale) { locale.value = next; localStorage.setItem('mocha-locale', next); document.documentElement.lang = next }
function go(id: string) { menuOpen.value = false; document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
onMounted(() => { if (localStorage.getItem('mocha-locale') === 'en') setLocale('en'); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = window.setInterval(() => slide.value = (slide.value + 1) % heroImages.length, 5500) })
onUnmounted(() => timer && clearInterval(timer))
</script>

<template>
  <header class="site-header">
    <a class="wordmark logo-link" href="#" aria-label="水引工房MOCHA トップ"><img :src="image('images/mocha-logo.png')" alt="水引工房MOCHA"></a>
    <nav :class="{ open: menuOpen }"><button v-for="(item, index) in t.nav" :key="item" @click="go(sections[index])">{{ item }}</button><a class="nav-instagram" :href="instagram" target="_blank" rel="noopener">Instagram ↗</a></nav>
    <div class="header-tools"><div class="locale"><button :class="{ active: locale === 'ja' }" @click="setLocale('ja')">JP</button><span>/</span><button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button></div><button class="menu-button" :aria-expanded="menuOpen" aria-label="メニューを開く" @click="menuOpen = !menuOpen"><span></span><span></span></button></div>
  </header>
  <main>
    <section class="immersive-hero">
      <div class="hero-slides"><img v-for="(src, index) in heroImages" :key="src" :src="src" :class="{ active: slide === index }" alt=""></div><div class="hero-overlay"></div>
      <div class="immersive-hero-copy"><p>{{ t.heroLabel }}</p><h1>{{ t.heroTitle }}</h1><span>{{ t.heroBody }}</span><div class="hero-actions"><a :href="instagram" target="_blank" rel="noopener">{{ t.heroPrimary }} ↗</a><button @click="go('collections')">{{ t.heroSecondary }} ↓</button></div></div>
      <div class="slide-progress"><button v-for="(_, index) in heroImages" :key="index" :class="{ active: slide === index }" :aria-label="`写真 ${index + 1}`" @click="slide = index">0{{ index + 1 }}</button></div>
    </section>
    <section id="collections" class="collections"><div class="collection-intro"><p>Three Collections</p><h2>{{ t.overviewTitle }}</h2><span>{{ t.overviewBody }}</span></div><article v-for="item in collections" :key="item.id" role="button" tabindex="0" @click="go(item.id)" @keydown.enter="go(item.id)"><img :src="item.src" :alt="item.title"><div><b>{{ item.title }}</b><span>{{ item.note }}</span><i>→</i></div></article></section>
    <section id="bands" class="focus focus-band"><div class="focus-bg"><img :src="image('images/gallery/image1.jpg')" alt="水引が付いた御朱印帳バンド"></div><div class="focus-shade"></div><div class="focus-copy left"><p>01 / Our Signature</p><h2>{{ t.bandTitle }}</h2><strong class="focus-lead">{{ t.bandLead }}</strong><span>{{ t.bandBody }}</span><ul><li v-for="point in t.bandPoint" :key="point">✓ {{ point }}</li></ul><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div><div class="detail-lens"><img :src="image('images/gallery/image1.jpg')" alt="水引の結び目の詳細"><span>DETAIL / MIZUHIKI KNOT</span></div></section>
    <section id="accessories" class="focus focus-accessory"><div class="focus-bg"><img :src="image('images/main/accessory.jpg')" alt="水引アクセサリー"></div><div class="focus-shade right-shade"></div><div class="focus-copy right"><p>02 / Mizuhiki Accessories</p><h2>{{ t.accessoryTitle }}</h2><span>{{ t.accessoryBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div></section>
    <section id="stones" class="focus focus-stone"><div class="focus-bg"><img :src="image('images/main/stone.jpg')" alt="天然石ブレスレット"></div><div class="focus-shade"></div><div class="focus-copy left"><p>03 / Natural Stone Bracelets</p><h2>{{ t.stoneTitle }}</h2><span>{{ t.stoneBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div></section>
    <section id="custom" class="custom"><div class="custom-copy"><p>Made for You</p><h2>{{ t.customTitle }}</h2><span>{{ t.customBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.customCta }} ↗</a><small>{{ t.customNote }}</small></div><div><div class="order-gallery"><figure v-for="(src, index) in orderImages" :key="src"><img :src="src" :alt="`オーダーメイド作品 ${index + 1}`"><figcaption>Custom 0{{ index + 1 }}</figcaption></figure></div><ol class="custom-steps"><li v-for="step in t.customSteps" :key="step[0]"><b>{{ step[0] }}</b><strong>{{ step[1] }}</strong><span>{{ step[2] }}</span></li></ol></div></section>
    <section id="market" class="market-immersive"><img :src="image('images/main/1753941066765.jpg')" alt="マルシェで並ぶ水引工房MOCHAの作品"><div><p>Meet Us at the Market</p><h2>{{ t.marketTitle }}</h2><span>{{ t.marketBody }}</span><ul><li v-for="benefit in t.marketBenefits" :key="benefit">✓ {{ benefit }}</li></ul><a :href="instagram" target="_blank" rel="noopener">{{ t.marketCta }} ↗</a></div><aside><img :src="image('images/gallery/image2.jpg')" alt="マルシェで見られる作品"><img :src="image('images/main/accessory.jpg')" alt="水引アクセサリー"><b>Touch<br>Try<br>Choose</b></aside></section>
    <section id="workshop" class="workshop-immersive"><div class="workshop-visual"><img :src="image('images/main/top.jpg')" alt="水引作品"><img :src="image('images/order/1754044179807.jpg')" alt="水引制作体験"></div><div><p>Workshop</p><h2>{{ t.workshopTitle }}</h2><span>{{ t.workshopBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.workshopCta }} ↗</a></div></section>
    <section class="online"><div><p>Online Shop</p><h2>{{ t.onlineTitle }}</h2><span>{{ t.onlineBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.onlineButton }} ↗</a></div><div class="online-ribbons"><i></i><i></i><i></i><i></i><i></i></div></section>
    <section class="instagram-final"><div class="insta-images"><img :src="image('images/gallery/image1.jpg')" alt=""><img :src="image('images/gallery/image2.jpg')" alt=""><img :src="image('images/gallery/image3.jpg')" alt=""></div><div class="instagram-final-copy"><p>Instagram / @mak_mochataro3</p><h2>{{ t.instagramTitle }}</h2><span>{{ t.instagramBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.instagramCta }} ↗</a></div></section>
  </main>
  <footer><a class="wordmark footer-logo" href="#" aria-label="水引工房MOCHA トップ"><img :src="image('images/mocha-logo.png')" alt="水引工房MOCHA"></a><a :href="instagram" target="_blank" rel="noopener">Instagram ↗</a><small>© 2026 Mizuhiki Studio Mocha</small></footer>
  <a class="mobile-instagram" :href="instagram" target="_blank" rel="noopener"><span>最新作品・出店予定を見る</span><b>Instagram ↗</b></a>
</template>
