import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/views/PaginaInicio.vue'
import PanelUsuario from '@/views/PanelUsuario.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: PaginaInicio
    },
    {
      path: '/panel-usuario',
      name: 'panel-usuario',
      component: PanelUsuario
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')

  // Si el usuario no está autenticado y trata de acceder al panel de usuario
  if (to.path === '/panel-usuario' && !token) {
    next('/') // Redirigir al inicio si no hay token
  } else {
    next()
  }
})

export default router
