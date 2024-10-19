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
      name: 'PanelUsuario',
      component: PanelUsuario
    }
  ]
})

export default router
