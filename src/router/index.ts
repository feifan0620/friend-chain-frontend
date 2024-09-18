import { createRouter, createWebHistory } from 'vue-router'
import LayoutIndex from '@/views/layout/Index.vue'
import HomeView from '@/views/layout/HomeView.vue'
import TeamView from '@/views/layout/TeamView.vue'
import UserView from '@/views/layout/UserView.vue'
import EditView from '@/views/EditView.vue'
import SearchView from '@/views/SearchView.vue'
import SearchResult from '@/views/SearchResult.vue'

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

export default router
