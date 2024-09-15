import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import TDesign from 'tdesign-mobile-vue'
import '@/styles/common.less'

// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css'

const app = createApp(App)

app.use(TDesign)
app.use(createPinia())
app.use(router)

app.mount('#app')
