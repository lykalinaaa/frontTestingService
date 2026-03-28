import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/features/ui/auth/Auth.vue'
import HomePage from '@/pages/HomePage/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        title: 'Авторизация',
        requiresAuth: false,
      },
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Главная страница',
        requiresAuth: false,
      },
    },
  ],
})

export default router
