import Vue from 'vue'
import Router from 'vue-router'
import mainAuth from '@/auth'

import Home from '@/views/Home'
import Settings from '@/views/Settings'
import Overlay from '@/views/Overlay'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        authName: mainAuth.authName
      }
    },
    {
      path: '/overlay/:login',
      name: 'overlay',
      component: Overlay,
      meta: {
        layout: 'overlay'
      }
    }// ,
    // {
    //   path: '*',
    //   component: PageNotFound,
    //   meta: {
    //     layout: 'blank'
    //   }
    // }
  ]
})

mainAuth.useRouter(router)

export default router
