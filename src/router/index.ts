import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:id',
      name: 'detail',
      props: true,
      component: () => import(/* webpackChunkName: "detail" */ '../views/PokemonView.vue'),
    },
    {
      path: '/team/:id',
      name: 'team',
      props: true,
      component: () => import(/* webpackChunkName: "team" */ '../views/TeamView.vue'),
    },
  ],
})

export default router
