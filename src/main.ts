import { createApp } from 'vue'
import App from './App.vue'

// global css
import 'normalize.css'
import 'element-plus/dist/index.css'
import './styles/scrollBar.css'
import './styles/index.scss'
// import './samples/node-api'

const app = createApp(App)

// 注册element icon
import { ElIcons, KeyOfElIcon } from './components/ElementPlus'
for (const key in ElIcons) {
  app.component(key, ElIcons[key as KeyOfElIcon])
}

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
