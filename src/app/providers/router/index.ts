import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage/HomePage.vue'
import LoginPage from '@/pages/LoginPage/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: LoginPage,
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
        requiresAuth: true,
      },
    },
  ],
})

export default router
