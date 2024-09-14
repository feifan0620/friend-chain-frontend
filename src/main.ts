import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Button, Icon, NavBar, Tabbar, TabbarItem } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(NavBar)
app.use(Button)
app.use(createPinia())
app.use(router)

app.mount('#app')
