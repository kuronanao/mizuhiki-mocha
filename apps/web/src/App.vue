<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Locale = 'ja' | 'en'
const instagram = 'https://www.instagram.com/mak_mochataro3/'
const locale = ref<Locale>('ja')
const menuOpen = ref(false)
const slide = ref(0)
const gallerySlide = ref<Record<string, number>>({ hero: 0, bands: 0, accessories: 0, stones: 0, market: 0 })
const touchStartX = ref<Record<string, number>>({})
const pointerStartX = ref<Record<string, number>>({})
let timers: number[] = []
function image(path: string) { return `${import.meta.env.BASE_URL}${path}` }

const bandImages = Array.from({ length: 10 }, (_, index) => image(`images/band/band-${String(index + 1).padStart(2, '0')}.jpg`))
const accessoryImages = Array.from({ length: 2 }, (_, index) => image(`images/accessory/accessory-${String(index + 1).padStart(2, '0')}.jpg`))
const braceletImages = Array.from({ length: 13 }, (_, index) => image(`images/bracelet/bracelet-${String(index + 1).padStart(2, '0')}.jpg`))
const shopImages = Array.from({ length: 7 }, (_, index) => image(`images/shop/shop-${String(index + 1).padStart(2, '0')}.jpg`))
const marketImages = [shopImages[0], shopImages[1], shopImages[2], shopImages[3], shopImages[6]]
const shopPortraitImages = [shopImages[4], shopImages[5]]
const heroImages = [shopImages[0], bandImages[3], accessoryImages[1], braceletImages[0], shopImages[6]]
const galleryMap: Record<string, string[]> = {
  hero: heroImages,
  bands: bandImages,
  accessories: accessoryImages,
  stones: braceletImages,
  market: marketImages,
}

const text = {
  ja: {
    nav: ['作品', '御朱印帳バンド', 'オーダー', 'マルシェ', '体験'],
    heroLabel: '御朱印帳バンド・水引アクセサリー・天然石ブレスレット',
    heroTitle: '伝統と、\n今のカワイイを\n結ぶ。',
    heroBody: '和の上質さとモダンな感性が溶け合う、水引工房MOCHA。主力の御朱印帳バンドをはじめ、「可愛い」と「品の良さ」をどちらも楽しめる、日常に馴染む特別なひとしなを一つずつ制作しています。',
    heroPrimary: 'Instagramで最新作品を見る', heroSecondary: '作品について知る',
    overviewTitle: '日常に馴染む、\n特別なひとしな。', overviewBody: '御朱印帳を彩る。装いに和心を添える。願いをお守りのように身に着ける。和の伝統に今の感性と遊び心を結び、手にする方の毎日が少しきらめく作品をお届けします。',
    bandTitle: '神社巡りも、装いも。\n和心きらめく結び。', bandLead: '大切な御朱印帳を彩り、しっかりと束ねる。旅のお供になる、特別な御朱印帳バンドです。',
    bandBody: '基本の梅結びから、猫やウサギなどの愛らしい動物モチーフまで。御朱印帳の柄や季節、その日の気分に合わせて選べます。実用的でありながら、手に取るたび心が弾む「あなただけの結び」を見つけてください。',
    bandPoint: ['御朱印帳をやさしく留める', '季節や帳面に合わせて選べる', '豊富な結びと動物モチーフ'], productCta: 'Instagramで作品一覧を見る',
    accessoryTitle: '伝統に遊び心を。\n大人の「和っ、かわいい」。', accessoryBody: '伝統的な水引結びを、現代のファッションに合わせたピアス・イヤリング・キーホルダーへ。耳元や胸元で軽やかに揺れ、和装にも普段着にも、さりげない華やかさを添えます。',
    stoneTitle: '結ぶ、祈る、輝く。\n願いを手元に。', stoneBody: '質を見極めた天然石と、水引の梅結びを組み合わせた、お守りのようなブレスレットです。石が持つ願いや意味を大切に、美しく身に着けられる一品へ仕立てています。',
    customTitle: '世界にひとつ、\nあなたのための水引。', customBody: '好きな色、動物モチーフ、贈る相手、大切にしたい願い。MOCHAの水引は、言葉にしきれない想いまで結び、かたちにします。まだぼんやりとしたイメージも、InstagramのDMから気軽にお聞かせください。',
    customCta: 'DMでオーダーを相談する', customNote: '相談だけでも大丈夫です。内容を伺いながら、できることをご案内します。',
    customSteps: [['1', 'DMで相談', '色・用途・イメージをお聞かせください'], ['2', '内容をご提案', '組み合わせやデザインをご相談します'], ['3', '一つずつ制作', '想いを込めて丁寧にお作りします']],
    marketTitle: '心ときめく\nひとしなに、\n会いに来てください。', marketBody: '写真だけでは伝わりきらない水引の細やかさ、和の上質な色合い、天然石の輝き。マルシェでは、御朱印帳との組み合わせやアクセサリーの試着を楽しみながら、心から「かわいい」と思える一品を選べます。',
    marketCta: 'Instagramで次の出店予定を見る', marketBenefits: ['実物の色と質感を見られる', '御朱印帳に合わせて選べる', 'アクセサリーを試着できる'],
    workshopTitle: '自分の手で結ぶと、\n水引はもっと楽しい。', workshopBody: '初めての方にも楽しんでいただける、水引アクセサリー制作体験を定期的に開催しています。完成した作品は、その日にお持ち帰りいただけます。開催場所・日時・募集情報はInstagramでお知らせします。',
    workshopCta: '次のワークショップ情報を見る',
    onlineTitle: 'あなたの日常へ、\n特別なひとしなを。', onlineBody: 'マルシェへ足を運ぶことが難しい方へ、メルカリでも一部作品を販売しています。大切な誰かへの贈り物にも、自分へのご褒美にも。販売中の作品はInstagramからご確認ください。', onlineButton: 'Instagramで販売情報を見る',
    instagramTitle: '和を結び、\n心をつなぐ。', instagramBody: '新作・限定作品、世界にひとつのオーダー事例、毎月の出店予定、ワークショップ情報を更新しています。フォローして、あなたの心がきらめく次のひとしなを見つけてください。', instagramCta: 'MOCHAをInstagramでフォロー',
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
  { title: locale.value === 'ja' ? '御朱印帳バンド' : 'Goshuincho Bands', note: locale.value === 'ja' ? '旅のお供に、特別な一つを' : 'A special companion for every journey', src: bandImages[3], id: 'bands' },
  { title: locale.value === 'ja' ? '水引アクセサリー' : 'Mizuhiki Accessories', note: locale.value === 'ja' ? '伝統と今のカワイイを装いに' : 'Traditional beauty for modern style', src: accessoryImages[1], id: 'accessories' },
  { title: locale.value === 'ja' ? '天然石ブレスレット' : 'Natural Stone Bracelets', note: locale.value === 'ja' ? '願いを結ぶ、手元のお守り' : 'A wish tied into a personal talisman', src: braceletImages[0], id: 'stones' },
])
const orderImages = [image('images/order/idol_pink.jpg'), image('images/order/idol_blue.jpg'), image('images/order/idol_yellow.jpg'), image('images/order/1754044179807.jpg')]
function setLocale(next: Locale) { locale.value = next; localStorage.setItem('mocha-locale', next); document.documentElement.lang = next }
function go(id: string) { menuOpen.value = false; document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
function activeIndex(key: string) { return gallerySlide.value[key] ?? 0 }
function visibleGallery(key: string, count: number, start = activeIndex(key)) {
  const images = galleryMap[key]
  if (!images?.length) return []
  return Array.from({ length: Math.min(count, images.length) }, (_, offset) => images[(start + offset) % images.length])
}
function setGallery(key: string, index: number) {
  const images = galleryMap[key]
  if (!images?.length) return
  gallerySlide.value = { ...gallerySlide.value, [key]: (index + images.length) % images.length }
  if (key === 'hero') slide.value = gallerySlide.value[key]
}
function nextGallery(key: string, direction = 1) { setGallery(key, activeIndex(key) + direction) }
function onTouchStart(key: string, event: TouchEvent) { touchStartX.value = { ...touchStartX.value, [key]: event.touches[0]?.clientX ?? 0 } }
function onTouchEnd(key: string, event: TouchEvent) {
  const start = touchStartX.value[key]
  const end = event.changedTouches[0]?.clientX ?? start
  const distance = end - start
  if (Math.abs(distance) > 42) nextGallery(key, distance < 0 ? 1 : -1)
}
function onPointerDown(key: string, event: PointerEvent) {
  pointerStartX.value = { ...pointerStartX.value, [key]: event.clientX }
}
function onPointerUp(key: string, event: PointerEvent) {
  const start = pointerStartX.value[key]
  const distance = event.clientX - start
  if (Math.abs(distance) > 42) nextGallery(key, distance < 0 ? 1 : -1)
}
function startGalleryTimers() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timers = [
    window.setInterval(() => nextGallery('hero'), 5500),
    window.setInterval(() => nextGallery('bands'), 5200),
    window.setInterval(() => nextGallery('accessories'), 5700),
    window.setInterval(() => nextGallery('stones'), 5400),
    window.setInterval(() => nextGallery('market'), 6000),
  ]
}
onMounted(() => { if (localStorage.getItem('mocha-locale') === 'en') setLocale('en'); startGalleryTimers() })
onUnmounted(() => timers.forEach((timer) => clearInterval(timer)))
</script>

<template>
  <header class="site-header">
    <a class="wordmark logo-link" href="#" aria-label="水引工房MOCHA トップ"><img :src="image('images/mocha-logo.png')" alt="水引工房MOCHA"></a>
    <nav :class="{ open: menuOpen }"><button v-for="(item, index) in t.nav" :key="item" @click="go(sections[index])">{{ item }}</button><a class="nav-instagram" :href="instagram" target="_blank" rel="noopener">Instagram ↗</a></nav>
    <div class="header-tools"><div class="locale"><button :class="{ active: locale === 'ja' }" @click="setLocale('ja')">JP</button><span>/</span><button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button></div><button class="menu-button" :aria-expanded="menuOpen" aria-label="メニューを開く" @click="menuOpen = !menuOpen"><span></span><span></span></button></div>
  </header>
  <main>
    <section class="immersive-hero swipe-gallery" @touchstart="onTouchStart('hero', $event)" @touchend="onTouchEnd('hero', $event)" @pointerdown="onPointerDown('hero', $event)" @pointerup="onPointerUp('hero', $event)">
      <div class="hero-slides"><img v-for="(src, index) in heroImages" :key="src" :src="src" :class="{ active: activeIndex('hero') === index }" alt=""></div><div class="hero-overlay"></div>
      <div class="immersive-hero-copy"><p>{{ t.heroLabel }}</p><h1>{{ t.heroTitle }}</h1><span>{{ t.heroBody }}</span><div class="hero-actions"><a :href="instagram" target="_blank" rel="noopener">{{ t.heroPrimary }} ↗</a><button @click="go('collections')">{{ t.heroSecondary }} ↓</button></div></div>
      <div class="slide-progress"><button v-for="(_, index) in heroImages" :key="index" :class="{ active: activeIndex('hero') === index }" :aria-label="`写真 ${index + 1}`" @click="setGallery('hero', index)">0{{ index + 1 }}</button></div>
    </section>
    <section id="collections" class="collections"><div class="collection-intro"><p>Three Collections</p><h2>{{ t.overviewTitle }}</h2><span>{{ t.overviewBody }}</span></div><article v-for="item in collections" :key="item.id" role="button" tabindex="0" @click="go(item.id)" @keydown.enter="go(item.id)"><img :src="item.src" :alt="item.title"><div><b>{{ item.title }}</b><span>{{ item.note }}</span><i>→</i></div></article></section>
    <section id="bands" class="focus focus-band swipe-gallery" @touchstart="onTouchStart('bands', $event)" @touchend="onTouchEnd('bands', $event)" @pointerdown="onPointerDown('bands', $event)" @pointerup="onPointerUp('bands', $event)"><div class="focus-bg tiled-bg"><div v-for="(_, index) in bandImages" :key="index" class="tiled-set" :class="{ active: activeIndex('bands') === index }"><img v-for="src in visibleGallery('bands', 4, index)" :key="src" :src="src" alt="水引が付いた御朱印帳バンド"></div></div><div class="focus-shade"></div><div class="focus-copy left"><p>01 / Our Signature</p><h2>{{ t.bandTitle }}</h2><strong class="focus-lead">{{ t.bandLead }}</strong><span>{{ t.bandBody }}</span><ul><li v-for="point in t.bandPoint" :key="point">✓ {{ point }}</li></ul><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div><div class="gallery-ui"><button v-for="(_, index) in bandImages" :key="index" :class="{ active: activeIndex('bands') === index }" :aria-label="`御朱印帳バンド写真 ${index + 1}`" @click="setGallery('bands', index)"></button></div><div class="detail-lens"><img :src="bandImages[activeIndex('bands')]" alt="水引の結び目の詳細"><span>DETAIL / MIZUHIKI KNOT</span></div></section>
    <section id="accessories" class="focus focus-accessory swipe-gallery" @touchstart="onTouchStart('accessories', $event)" @touchend="onTouchEnd('accessories', $event)" @pointerdown="onPointerDown('accessories', $event)" @pointerup="onPointerUp('accessories', $event)"><div class="focus-bg"><img v-for="(src, index) in accessoryImages" :key="src" :src="src" :class="{ active: activeIndex('accessories') === index }" alt="水引アクセサリー"></div><div class="focus-shade right-shade"></div><div class="focus-copy right"><p>02 / Mizuhiki Accessories</p><h2>{{ t.accessoryTitle }}</h2><span>{{ t.accessoryBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div><div class="gallery-ui right-ui"><button v-for="(_, index) in accessoryImages" :key="index" :class="{ active: activeIndex('accessories') === index }" :aria-label="`水引アクセサリー写真 ${index + 1}`" @click="setGallery('accessories', index)"></button></div></section>
    <section id="stones" class="focus focus-stone swipe-gallery" @touchstart="onTouchStart('stones', $event)" @touchend="onTouchEnd('stones', $event)" @pointerdown="onPointerDown('stones', $event)" @pointerup="onPointerUp('stones', $event)"><div class="focus-bg tiled-bg"><div v-for="(_, index) in braceletImages" :key="index" class="tiled-set" :class="{ active: activeIndex('stones') === index }"><img v-for="src in visibleGallery('stones', 4, index)" :key="src" :src="src" alt="天然石ブレスレット"></div></div><div class="focus-shade"></div><div class="focus-copy left"><p>03 / Natural Stone Bracelets</p><h2>{{ t.stoneTitle }}</h2><span>{{ t.stoneBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.productCta }} ↗</a></div><div class="gallery-ui"><button v-for="(_, index) in braceletImages" :key="index" :class="{ active: activeIndex('stones') === index }" :aria-label="`天然石ブレスレット写真 ${index + 1}`" @click="setGallery('stones', index)"></button></div></section>
    <section id="custom" class="custom"><div class="custom-copy"><p>Made for You</p><h2>{{ t.customTitle }}</h2><span>{{ t.customBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.customCta }} ↗</a><small>{{ t.customNote }}</small></div><div><div class="order-gallery"><figure v-for="(src, index) in orderImages" :key="src"><img :src="src" :alt="`オーダーメイド作品 ${index + 1}`"><figcaption>Custom 0{{ index + 1 }}</figcaption></figure></div><ol class="custom-steps"><li v-for="step in t.customSteps" :key="step[0]"><b>{{ step[0] }}</b><strong>{{ step[1] }}</strong><span>{{ step[2] }}</span></li></ol></div></section>
    <section id="market" class="market-immersive swipe-gallery" @touchstart="onTouchStart('market', $event)" @touchend="onTouchEnd('market', $event)" @pointerdown="onPointerDown('market', $event)" @pointerup="onPointerUp('market', $event)"><img v-for="(src, index) in marketImages" :key="src" :src="src" :class="{ active: activeIndex('market') === index }" alt="マルシェで並ぶ水引工房MOCHAの作品"><div><p>Meet Us at the Market</p><h2>{{ t.marketTitle }}</h2><span>{{ t.marketBody }}</span><ul><li v-for="benefit in t.marketBenefits" :key="benefit">✓ {{ benefit }}</li></ul><a :href="instagram" target="_blank" rel="noopener">{{ t.marketCta }} ↗</a></div><aside><img :src="shopPortraitImages[activeIndex('market') % shopPortraitImages.length]" alt="マルシェで見られる作品"><img :src="accessoryImages[1]" alt="水引アクセサリー"><b>Touch<br>Try<br>Choose</b></aside><div class="gallery-ui market-ui"><button v-for="(_, index) in marketImages" :key="index" :class="{ active: activeIndex('market') === index }" :aria-label="`マルシェ写真 ${index + 1}`" @click="setGallery('market', index)"></button></div></section>
    <section id="workshop" class="workshop-immersive"><div class="workshop-visual"><img :src="accessoryImages[0]" alt="水引作品"><img :src="bandImages[9]" alt="水引制作体験"></div><div><p>Workshop</p><h2>{{ t.workshopTitle }}</h2><span>{{ t.workshopBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.workshopCta }} ↗</a></div></section>
    <section class="online"><div><p>Online Shop</p><h2>{{ t.onlineTitle }}</h2><span>{{ t.onlineBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.onlineButton }} ↗</a></div><div class="online-ribbons"><i></i><i></i><i></i><i></i><i></i></div></section>
    <section class="instagram-final"><div class="insta-images"><img :src="bandImages[4]" alt=""><img :src="braceletImages[6]" alt=""><img :src="shopImages[6]" alt=""></div><div class="instagram-final-copy"><p>Instagram / @mak_mochataro3</p><h2>{{ t.instagramTitle }}</h2><span>{{ t.instagramBody }}</span><a :href="instagram" target="_blank" rel="noopener">{{ t.instagramCta }} ↗</a></div></section>
  </main>
  <footer><a class="wordmark footer-logo" href="#" aria-label="水引工房MOCHA トップ"><img :src="image('images/mocha-logo.png')" alt="水引工房MOCHA"></a><a :href="instagram" target="_blank" rel="noopener">Instagram ↗</a><small>© 2026 Mizuhiki Studio Mocha</small></footer>
  <a class="mobile-instagram" :href="instagram" target="_blank" rel="noopener"><span>最新作品・出店予定を見る</span><b>Instagram ↗</b></a>
</template>
