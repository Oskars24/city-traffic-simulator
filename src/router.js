import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/Test.vue'
import Home from './views/Home.vue'
import Miejsca from './views/Miejsca.vue'
import Trasy from './views/Trasy.vue'
import Mapa from './views/Mapa.vue'
import MojPlan from './views/MojPlan.vue'
import ViewAll from './views/ViewAll.vue'
import Szczegoly from './views/Szczegoly.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/miejsca',
      name: 'miejsca',
      component: Miejsca
    },
    {
      path: '/trasy',
      name: 'trasy',
      component: Trasy
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: Mapa
    },
    {
      path: '/mojplan',
      name: 'mojplan',
      component: MojPlan
    },
    {
      path: '/:name/viewall',
      name: 'viewall',
      component: ViewAll
    },
    {
      path: '/:name/:id',
      name: 'szczegoly',
      component: Szczegoly
    },

  ]
})
