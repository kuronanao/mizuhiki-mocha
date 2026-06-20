import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const isLogoAnimationLab = window.location.pathname.endsWith('/logo-animation.html')

if (isLogoAnimationLab) {
  Promise.all([
    import('./LogoAnimationLab.vue'),
    import('./logo-animation.css'),
  ]).then(([{ default: LogoAnimationLab }]) => {
    createApp(LogoAnimationLab).mount('#app')
  })
} else {
  createApp(App).mount('#app')
}
