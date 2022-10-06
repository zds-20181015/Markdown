import { createApp } from 'vue'
import App from './App.vue'

// global css
import 'normalize.css'
import './styles/scrollBar.css'
import './styles/element/index.scss'
import 'element-plus/dist/index.css'
// import './samples/node-api'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

// 注册element icon
import { ElIcons, KeyOfElIcon } from './components/ElementPlus'
import { createPinia } from 'pinia'
for (const key in ElIcons) {
  app.component(key, ElIcons[key as KeyOfElIcon])
}

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
