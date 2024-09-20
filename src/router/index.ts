import { createRouter, createWebHistory } from 'vue-router'
import LayoutIndex from '@/views/layout/Index.vue'
import HomeView from '@/views/layout/HomeView.vue'
import TeamView from '@/views/layout/TeamView.vue'
import UserView from '@/views/layout/UserView.vue'
import EditView from '@/views/EditView.vue'
import SearchView from '@/views/SearchView.vue'
import SearchResult from '@/views/SearchResult.vue'
import { Dialog } from 'tdesign-mobile-vue'
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
    { path: '/search', component: SearchView },
    { path: '/result', component: SearchResult },
    { path: '/edit', component: EditView },
    { path: '/login', component: () => import('@/views/LoginView.vue') }
  ]
})

// 需要权限（登录）才能访问的页面
const authUrl = ['/edit', '/result']

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const user = userStore.userInfo
  if (user && to.path === '/login') {
    next('/')
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
    Dialog.confirm({
      title: '提示',
      content: '您还未登录，是否跳转登录页面？',
      confirmBtn: '去登录',
      cancelBtn: '再看看',
      onConfirm: () => {
        next('/login')
      },
      onCancel: () => {
        next(from)
      }
    })
  }
})
export default router
