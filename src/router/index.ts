import { createRouter, createWebHistory } from 'vue-router'
import LayoutIndex from '@/views/layout/index.vue'
import HomeView from '@/views/layout/HomeView.vue'
import TeamView from '@/views/layout/TeamView.vue'
import UserView from '@/views/layout/UserView.vue'
import EditView from '@/views/UserEditView.vue'
import SearchView from '@/views/SearchView.vue'
import SearchResult from '@/views/SearchResultView.vue'
import UserLoginView from '@/views/UserLoginView.vue'
import UserRegisterView from '@/views/UserRegisterView.vue'
import TeamAddView from '@/views/TeamAddView.vue'
import UserChat from '@/views/UserChat.vue'
import { Toast } from 'tdesign-mobile-vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/home',
      children: [
        { path: '/home', component: HomeView },
        { path: '/team', component: TeamView },
        { path: '/user', component: UserView }
      ]
    },
    { path: '/user/search', component: SearchView },
    { path: '/user/result', component: SearchResult },
    { path: '/user/edit', component: EditView },
    { path: '/user/chat', component: UserChat },
    { path: '/team/add', component: TeamAddView },
    { path: '/login', component: UserLoginView },
    { path: '/register', component: UserRegisterView }
  ]
})

// 需要权限（登录）才能访问的页面
const authUrl = ['/user/edit', '/user/result', '/user']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const user = userStore.userInfo
  if (user && to.path === '/login') {
    next('/')
    return
  }
  // 如果访问的页面不包含在权限页面内，直接放行
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  // 否则判断是否登录
  if (user) {
    next()
  } else {
    Toast('请先登录')
    next({ path: '/login', query: { redirectUrl: from.fullPath } })
  }
})
export default router
