import { createApp } from 'vue'
import App from './App.vue'

// global css
import 'normalize.css'
import './styles/scrollBar.css'
import './styles/element/index.scss'
import 'element-plus/dist/index.css'
// import './samples/node-api'

const app = createApp(App)

// 注册element icon
import { ElIcons, KeyOfElIcon } from './components/ElementPlus'
for (const key in ElIcons) {
  app.component(key, ElIcons[key as KeyOfElIcon])
}

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
