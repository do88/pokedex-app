import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        transition: 'screen-fade'
      }
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('@/views/PokemonDetailView.vue'),
      props: true,
      meta: {
        transition: 'screen-scan'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
})

export default router
