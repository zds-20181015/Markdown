import { createApp } from 'vue'
import App from './App.vue'

// global css
import 'normalize.css'
import './styles/scrollBar.css'
import 'element-plus/dist/index.css'
import './styles/index.scss'
// import './samples/node-api'
const app = createApp(App)

// 注册element icon
import { ElIcons, KeyOfElIcon } from './components/ElementPlus'
import { createPinia } from 'pinia'
for (const key in ElIcons) {
  app.component(key, ElIcons[key as KeyOfElIcon])
}

// pinia
const pinia = createPinia()
app.use(pinia)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
